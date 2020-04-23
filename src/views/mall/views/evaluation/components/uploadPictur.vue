<template>
  <div class="upload">
    <div class="upload-imgs">
      <div class="upload-img" v-for="(item, index) in imgList" :key="index">
        <img :src="item.url" alt="">
      </div>
      <div class="upload-btn" v-if="showUploadBtn" @click.stop="handleClick">
        <div class="wrap">
          <div class="icon">
            <img src="../img/camara-icon.png" alt="">
          </div>
          <div class="text">添加照片<span v-if="imgList.length">{{imgList.length}}/6</span></div>
        </div>
      </div>
    </div>
    <form action="" hidden>
      <input type="file" id="uploaderFile" @change="fileChange" multiple accept='image/gif,image/jpeg,image/jpg,image/png'>
    </form>
  </div>
</template>
<script>
export default {
  name: 'upload',
  data: () => ({
    imgList: []
  }),
  computed: {
    showUploadBtn () {
      return !(this.imgList.length >= 6)
    }
  },
  methods: {
    handleClick() {
      document.getElementById('uploaderFile').click()
    },
    fileChange(e) {
      const files = e.target.files
      this.toBase64(files)
      //重置input
      e.target.value = ''
    },
    toBase64(files) {
      this.id = 0
      const _this = this
      for(let i=0; i < 6; i++) {
        const fileName = files[i].name
        const reader = new FileReader()
        reader.readAsDataURL(files[i])
        reader.onload = function () {
          _this.id += 1
          _this.imgList.push({
            id: _this.id,
            url: this.result,
            fileName
          })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.upload {
  .upload-imgs {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .upload-img {
      margin: 0 .2rem .2rem 0;
      width: 1.6rem;
      height: 1.6rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .upload-btn {
      padding: .15rem;
      width: 1.6rem;
      height: 1.6rem;
      background: #F7F7F7;
      border-radius: .16rem;
      .wrap {
        height: 100%;
        border: 1px dotted #888888;
        border-radius: .16rem;
        .icon {
          margin: .27rem auto .07rem;
          width: .48rem;
          height: .46rem;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }
        .text {
          text-align: center;
          color: #FF7800;
          font-size: .2rem;
        }
      }
    }
  }
}
</style>