<template>
  <section>
    <h2>SVG ICONS</h2>
    <p>本 demo 内置 svg icons 封装，具体用法如下：</p>
    <ol>
      <li>将 svg 文件放到 <code>@/assets/svg/</code> 目录下</li>
      <li>页面引入自定义封装组件 —— <code><pre>&lt;svg-icon icon-class="member" /&gt;</pre></code>(member 为该 svg 文件的文件名)</li>
    </ol>
    <i>在 iconfont 处获得的 svg 文件大都含冗余代码，可以去 <a href="https://www.zhangxinxu.com/sp/svgo/" target="_blank">这里</a> 在线过滤代码</i>
    <div class="icon-list">
      <span v-for="icon of iconList" :key="icon">
        <svg-icon :icon-class="icon" class="icon-demo" /> <i v-text="icon"></i>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      iconList: ['member', 'edit', '404', 'folder-open', 'home', 'lock', 'logout', 'message', 'percentage', 'table', 'telephone']
    }
  }
}
</script>

<style scoped lang="scss">
  code {
    font-family: "Source Code Pro", Consolas, monospace;
    font-size: .8em;
    line-height: 1.5;
    padding: 2px 4px;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 3px;
  }

  pre {
    display: inline-block;
  }

  .icon-list {
    margin: 2em 0px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 2em 1em;

    > span {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    svg {
      width: 2em;
      height: 2em;

    }
  }
</style>
