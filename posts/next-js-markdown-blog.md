---
title: 'Next.jsでmarkdownブログ構築'
date: '2022-07-13'
description: 'Next.jsでmarkdownファイルを利用したブログの構築手順を解説しています。'
image: 'nextjs.png'
categories: ['react']
---

## 目次

## Next.js の準備

```js[class="line-numbers"]
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 border-b z-10 bg-white">
      <div className="max-w-4xl mx-auto flex justify-between items-center h-12">
        <Link href="/">
          <a>LOGO</a>
        </Link>
        <div>Link</div>
      </div>
    </header>
  );
};

export default Header;
```
lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris next

### プロジェクトの作成

lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris next

## ブログの構築

lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris next

### レイアウトの設定

lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris next

## Next.js の実行

lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris next

### npm run dev

Next.js を使って Markdown のブログサイトの構築を一から行なっていきます。

npx create-next-app コマンドを利用して Next.js プロジェクトの作成を行います。