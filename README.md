# Ticket Backend

[Ticket NFT](https://github.com/takeiyuto/tickets) のバックエンドです。

## 前提条件

1. このレポジトリの親ディレクトリに、`blockchain` という名称で [Ticket NFT のコントラクト](https://github.com/takeiyuto/ticket-contract)のプロジェクトがあること。また、コントラクトはコンパイルされて、デプロイ済みであること。詳細は、[徹底解説 NFTの理論と実践](https://www.ohmsha.co.jp/book/9784274230608/)の第8章2節を参照してください。

2. このレポジトリの親ディレクトリに、`frontend` という名称で [Ticket NFT のフロントエンド](https://github.com/takeiyuto/ticket-frontend)のプロジェクトがあること。また、ソースコードがコンパイル済みであること。詳細は、[徹底解説 NFTの理論と実践](https://www.ohmsha.co.jp/book/9784274230608/)の第8章3節を参照してください。

## 動作方法

1. このレポジトリをクローンし、ライブラリをダウンロードします。
```bash
git clone https://github.com/takeiyuto/ticket-backend.git backend
cd backend
yarn
```

2. コントラクトの型情報を生成します。
```bash
yarn type
```

3. [server.ts](./server.ts) の 7 行目にある以下のような `address` 定数に、既にデプロイしてある Ticket NFT コントラクトのアドレスを記述します。
```ts
const address = "0x...CONTRACT_ADDRESS...";
```

4. コンパイルした後、バックエンドを起動します。
```bash
yarn build
yarn serve
```

5. MetaMask などのソフトウェア ウォレットが入ったブラウザで、http://127.0.0.1:8080/ を開きます。

6. バックエンドは Ctrl + C で終了できます。

## ライセンス表示

このサンプル コードは、[MIT License](LICENSE)で提供しています。

# 参照

[徹底解説 NFTの理論と実践](https://www.ohmsha.co.jp/book/9784274230608/)の第8章4節を参照してください。[本書の Web サイト](https://takeiyuto.github.io/nft-book)も参考にしてください。
