# vue-cli + electron-builderで始めるデスクトップアプリ

## 環境構築

1. `node.js`のインストール
- バージョンが表示されればOK
```
    node -v
```

```
    npm --version
```

2. `vue-cli 3`のインストール

```
    npm install -g @vue/cli
```

- バージョンが表示されればOK

```
    vue -V
```


3. `vue`プロジェクトの作成

```
    vue create vue-example
```

4. `vue-cli-plugin-electron-builder`のインストール

```
    cd vue-example
    vue add electron-builder
```

5. electronを立ち上げる

```
    npm run electron:serve
```

「Vueへようこそ！」的なウインドウ＋開発者ツールが立ち上がれば環境構築はOKです。

## ディレクトリ構成

```
    node_modules
    public
    src
     |-- assets
     |-- components
     |-- App.vue
     |-- background.js
     `-- main.js
    .gitignore
    babel.config.js
    package-lock.json
    package.json
    README.md
```
Vueのプロジェクトと異なるところはbackground.jsだけです。

electronでは2つのプロセスで動いています。
- メインプロセス・・・アプリケーション全体を管理するプロセス。メニューや通知などはこちらで管理します。
- レンダラープロセス・・・ウインドウを管理するプロセス

メインプロセスはpackage.jsonのmainに記載のあるjsファイルがエントリーポイントになります。

electron-builderで作成するとbackground.jsがエントリーポイントになります。

```
{
  "name": "vue-example",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "electron:build": "vue-cli-service electron:build",
    "electron:serve": "vue-cli-service electron:serve",
    "postinstall": "electron-builder install-app-deps",
    "postuninstall": "electron-builder install-app-deps"
  },
  "main": "background.js",
  "dependencies": {
    "core-js": "^2.6.5",
    "vue": "^2.6.10"
  },
  (一部抜粋)
}
```

## ウィンドウの作成

vue-routerを使ってページ遷移を実装します。

```
    vue add router
```

ついでにvuetifyも入れてマテリアルデザインっぽくします。

```
    vue add vuetify
```

- router.js
- main.js
- App.vue
- Home.vue
- About.vue

## メニューのカスタム

electronで使用できるメニューは

- コンテキストメニュー（右クリックで開くメニュー）
- アプリケーションメニュー（画面の上部にあるFile、Viewなどのメニュー）

の2種類あります。

ここではアプリケーションメニューに設定メニューを作成します。

- background.js
- Settings.vue
- router.js
- main.js

合わせてMattermostのように閉じるボタンでタスクトレイに常駐するようにします。

## デスクトップ通知

メインプロセスとレンダラープロセスから通知できます。
・レンダラープロセスは　Html5 Notification APIから利用する
・メインプロセスはelectronのNotificationを利用する

background.js
Setting.vue

いずれもwindowsの場合はApplication User Model ID（？）の設定が必要
https://electronjs.org/docs/tutorial/notifications
