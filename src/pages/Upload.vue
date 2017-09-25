<template>
  <div class="container">
    <h2>{{ msg }}</h2>
    <form action="" class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-xs-3 control-label">Email</label>
        <div class="col-xs-9">
          <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
        </div>
      </div>
      <div class="form-group">
        <label class="col-xs-3 control-label">正面</label>
        <div class="col-xs-9">
          <img :src="imgData" class="thumb-pic">
          <input type="file" name="f1" id="f1" class="form-control" @change="selectFile($event, 'sfzFront')">
        </div>
      </div>
      <div class="form-group">
        <label class="col-xs-3 control-label">反面</label>
        <div class="col-xs-9">
          <img :src="imgData" class="thumb-pic">
          <input type="file" name="f2" id="f2" class="form-control" @change="selectFile($event, 'sfzBack')">
        </div>
      </div>
      <div class="form-group">
        <file-upload ref="upload" v-model="files"
          :extensions="upOpt.extensions"
          :accept="upOpt.accept"
          :size="upOpt.size"
          :post-action="upOpt.postAction"
          :multiple="upOpt.multiple"
          :data="bodyData"
          @input-filter="handlePic"></file-upload>
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
      imgData: false,
      files: [],
      upOpt: {
        accept: 'image/png,image/gif,image/jpeg,image/webp',
        size: 1024 * 1024 * 4,
        extensions: /\.(gif|jpe?g|png|webp)$/i,
        postAction: './post.php',
        multiple: true
      },
      bodyData: { id: 1234 },
      fileQuery: []
    }
  },
  mounted () {
  },
  methods: {
    selectFile (e, matter) {
      const newFile = e.target.files[0]
      let URL = window.URL || window.webkitURL

      this.fileQuery.push(matter)
      this.$refs.upload.addInputFile(e.target)
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile)
        this.imgData = newFile.blob
      }
    },
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
        // newFile.blob = ''
        // let URL = window.URL || window.webkitURL
        // if (URL && URL.createObjectURL) {
        //   newFile.blob = URL.createObjectURL(newFile.file)
        //   this.imgData = newFile.blob
        // }
      }
    }
  },
  components: {
    FileUpload
  }
}
</script>
