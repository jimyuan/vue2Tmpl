# vue2-proj

> 这是一个网站组件化开发的模板，通过以下技术及框架来实现样式和逻辑的组件化开发、代码测试以及生产环境的部署：
> - Webpack3
> - ES6
> - Sass
> - Vue2.5+
> - Vue-Router
> - Vuex
>
> 安装及运行步骤见下方示例，详细使用见 Gitlab wiki（only internal）。

## Tips
建议安装使用 _cnpm_ 命令替代 nodejs 默认的包管理工具。
``` bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## Build Setup

``` bash
# install dependencies
# 安装依赖（仅首次运行需执行）
cnpm install

# serve with hot reload at localhost:8080
# 默认在 8080 端口开启热加载 web server
npm start

# build for production with minification
# 编译成生成环境所需代码
npm run build

# build for production and view the bundle analyzer report
# 生成编译打包分析报告
npm run build --report
```

## Additional
本项目若要完整运行，需在后台独立开启 API Server，这里写了一个简单的 Mock，供模拟测试用；Mock 项目地址：`git@github.com:czcg/proxy.git`，运行：

``` bash
# install dependencies
# 安装依赖（仅首次运行需执行）
cnpm install

# 启动 Mock Server
node mock/demo
```

## Browse
在开发状态下，当你用 `npm start` 命令启动项目时，就可以在 <http://0.0.0.0:8080/> 下浏览及调试项目了。

在执行完 `npm run build` 后，webpack 在 dist 目录下编译生成了一个生产环境下的最终代码，此时也可以利用启动的 webserver 在 <http://0.0.0.0:8080/dist> 下对编译完的代码进行查看检测。

## Prerender
预静态化设置：引入 prerender webpack plugin，可去 `config/index.js` 中设置是否开启该功能，并添加相应的路由，在编译完成后静态文件会在指定的 `dist` 目录下出现。

启用预编译注意点：
- 路由模式必须为 `history`，采用 hash 方式进行路由跳转的页面不能被预编译插件正确识别。
- 采用预编译后，生成的静态文件对 assets 的引用路径会出现问题，上线前需要先确定生产环境的 http 访问路径，修改 `config/index.js` 中的 `build.assetsPublicPath` 值。

_* 采用 history 模式后，后端 http server 也要做些相应的修改，要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面：_

nginx
```
location / {
  try_files $uri $uri/ /index.html;
}
```
Apache
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
