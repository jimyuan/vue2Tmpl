# vue2-proj

这是一个网站组件化开发的模板，通过以下技术及框架来实现样式和逻辑的组件化开发、代码测试以及生产环境的部署：
- Webpack 4
- ES 6
- SCSS
- Vue 2.6+
- Vue-Router
- Vuex

## Build Setup

```bash
# install dependencies
# 安装依赖（仅首次运行需执行）
npm install

# serve with hot reload at localhost:8080
# 默认在 8080 端口开启热加载 web server
npm start

# build for production with minification
# 编译成生成环境所需代码
npm run build
```

## Additional
本项目若要完整运行，需在后台独立开启 API Server，这里写了一个简单的 Mock，供模拟测试用；Mock 项目地址：`git@github.com:jimyuan/proxy.git`，运行：

```bash
# install dependencies
# 安装依赖（仅首次运行需执行）
npm install

# 启动 Mock Server
node mock/demo
```

## Browse
在开发状态下，当你用 `npm start` 命令启动项目时，就可以在 <http://locaolhost:8080/下浏览及调试项目了。

在执行完 `npm run build` 后，框架在 dist 目录下编译生成了一个生产环境下的最终代码，此时也可以全局安装一个 http server 来预览：
```bash
npm install -g serve
# -s flag means serve it in Single-Page Application mode
# which deals with the routing problem below
serve -s dist
```
