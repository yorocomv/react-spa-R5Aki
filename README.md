# [Vite][ 01 ] v6 + [React][ 02 ] v19 + [React Router][ 03 ] v7

## `git clone && pnpm install` の後に実行する事 👇️

### 🖊️ 環境変数の設定

- .env.local の作成と編集
- .env.production.local の作成と編集

## Apache 2.4 への `/spa` 配置

`pnpm build` で生成した `dist` の**内容**を Apache の `/spa` ディレクトリへ配置します。`public/.htaccess` はビルド時に `dist/.htaccess` へコピーされます。

`httpd.conf` では、既に有効な `rewrite_module` に加えて次を有効にしてください。

```apache
LoadModule headers_module modules/mod_headers.so
```

`/spa` に対応する `<Directory>` で `AllowOverride FileInfo`（または `All`）を許可します。`.htaccess` は `index.html` とハッシュなしの公開ファイルを毎回再検証し、`/spa/assets/` のハッシュ付きファイルだけを長期キャッシュします。これにより、古い HTML が存在しない新旧チャンクを指す状態を防ぎます。

デプロイでは `assets` を先に削除するのではなく、新しい `dist` 一式を別ディレクトリへ配置してから `/spa` を一度に切り替えてください。切替後も、既に表示中の画面が参照する旧 `assets` は少なくともブラウザのセッションが終わるまで残すのが安全です。

[ 01 ]: https://ja.vite.dev/
[ 02 ]: https://ja.react.dev/
[ 03 ]: https://reactrouter.com/
