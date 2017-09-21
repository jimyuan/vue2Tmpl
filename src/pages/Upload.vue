<template>
  <div>
    <h2>{{ msg }}</h2>
    <form action="" class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-xs-3 control-label">Email</label>
        <div class="col-xs-9">
          <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
        </div>
      </div>
      <div class="from-group">
        <label for="f2" class="col-xs-3 control-label">upload</label>
        <div class="col-xs-9">
          <input type="file" name="f2" id="f2" class="form-control">
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputFile" class="col-xs-3 control-label">File input</label>
        <div class="col-xs-9">
          <img :src="imgData[0]" class="thumb-pic">
          <file-upload ref="upload1" v-model="files[0]" :extensions="extensions" :accept="accept" :size="size" :data="bodyData" :post-action="postAction" @input-filter="handlePic">
            选择文件
          </file-upload>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputFile" class="col-xs-3 control-label">File input</label>
        <div class="col-xs-9">
          <img :src="imgData[1]" class="thumb-pic">
          <file-upload ref="upload2" v-model="files[1]" :extensions="extensions" :accept="accept" :size="size" :data="bodyData" :post-action="postAction" @input-filter="handlePic">
            选择文件
          </file-upload>
        </div>
      </div>
      <div class="form-group">
        <div class="col-xs-offset-3 col-xs-9">
          <button class="btn" v-show="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
export default {
  data () {
    return {
      msg: 'UPLOAD',
      imgData: [false, false],
      files: [[], []],
      accept: 'image/png,image/gif,image/jpeg,image/webp',
      size: 1024 * 1024 * 4,
      extensions: /\.(gif|jpe?g|png|webp)$/i,
      bodyData: { id: 1234 },
      postAction: './post.php'
    }
  },
  mounted () {
  },
  methods: {
    handlePic (newFile, oldFile) {
      if (newFile && !oldFile) {
        // // 过滤系疼文件 or 隐藏文件
        // if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
        //   return prevent()
        // }
        // // 过滤 php html js 文件
        // if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
        //   return prevent()
        // }
        // 创建 blob 字段
        console.log(newFile)
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
          this.imgData1 = newFile.blob
        }
      }
    }
  },
  components: {
    FileUpload
  }
}
</script>
