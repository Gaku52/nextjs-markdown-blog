import fs from 'fs';

export const getStaticProps = () => {
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
  const slug = fileName.replace(/\.md$/, '');
  const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    console.log('fileContent:', fileContent);
  });
  return {
    props: {
      posts: [],
    },
  };
};

export default function Home({ posts }) {
  return <div className="my-8">コンテンツ</div>;
}