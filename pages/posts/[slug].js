import fs from 'fs';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import remarkPrism from 'remark-prism';
import { createElement, Fragment } from 'react';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import Link from 'next/link';
import { toc } from 'mdast-util-toc';

export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);

  const getToc = (options) => {
    return (node) => {
      const result = toc(node, options);
      node.children = [result.map];
    };
  };

  const result = await unified()
    .use(remarkParse)
    .use(remarkPrism, {
      plugins: ['line-numbers'],
    })
    .use(remarkToc, {
      heading: '目次',
      tight: true,
    })
    .use(getToc, {
      heading: '目次',
      tight: true,
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(customCode)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    props: {
      frontMatter: data,
      content: result.toString(),
      toc: toc.toString(),
      slug: params.slug,
    },
  };
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

function MyLink({ children, href }) {
  if (href === '') href = '/';
  return href.startsWith('/') || href.startsWith('#') ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

//imgタグをImageコンポーネントに変換する
const MyImage = ({ src, alt }) => {
  return (
    <div className="relative max-w-full h-96">
      <Image src={src} alt={alt} layout="fill" objectFit="contain" />
    </div>
  );
};

const toReactNode = (content) => {
  return unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: MyLink,
        img: MyImage,
      },
    })
    .processSync(content).result;
};

//サイドバーの目次表示
const getToc = (options) => {
  return (node) => {
    const result = toc(node, options);
    node.children = [result.map];
  };
};

//辞書登録,HelloをHello Worldに変換する
function customCode() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'p' && node.children[0].type === 'text') {
        if (node.children[0].value.startsWith('[hello]')) {
          node.children[0].value = 'Hello World';
        }
      }
    });
  };
}

const Post = ({ frontMatter, content, toc, slug }) => {
  return (
    <>
    <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
        openGraph={{
          type: 'website',
          url: `http:localhost:3000/posts/${slug}`,
          title: frontMatter.title,
          description: frontMatter.description,
          images: [
            {
              url: `https://localhost:3000/${frontMatter.image}`,
              width: 1200,
              height: 700,
              alt: frontMatter.title,
            },
          ],
        }}
    />
  <div className="prose prose-lg max-w-none">
        <div className="pt-2">
          <Image
            src={`/${frontMatter.image}`}
            width={1200}
            height={700}
            alt={frontMatter.title}
          />
        </div>
        <h1 className="mt-12">{frontMatter.title}</h1>
        <span>{frontMatter.date}</span>
      {/* これより以下に目次追加の記述 */}
      <div className="space-x-2">
      {frontMatter.categories.map((category) => (
        <span key={category}>
          <Link href={`/categories/${category}`}>
            <a>{category}</a>
          </Link>
        </span>
      ))}
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-9">{toReactNode(content)}</div>
        <div className="col-span-3">
          <div
            className="sticky top-[50px]"
            dangerouslySetInnerHTML={{ __html: toc }}
          >
          </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default Post;