<template>
  <div class="evaluation">
    <Header title="评价晒单" />
    <!-- 打分 -->
    <goods-evaluation />
    <!-- 您的评价 -->
    <div class="my-evaluation">
      <div class="title">您的评价</div>
      <textarea name="" id="" cols="30" rows="10" 
        placeholder="请描述评价内容（30字以内）" 
        v-model="myEvaluation" 
        @input="changeText"
      ></textarea>
      <!-- 上传图片 -->
      <upload-pictur />
    </div>
    <div class="submit-btn">
      提交
    </div>
  </div>
</template>
<script>
import GoodsEvaluation from './components/goodsEvaluation'
import UploadPictur from './components/uploadPictur'
export default {
  name: 'evaluation',
  data: () => ({
    myEvaluation: ''
  }),
  components: {
    GoodsEvaluation,
    UploadPictur,
  },
  methods: {
    changeText() {
      
    }
  }
}
</script>
<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.evaluation {
  min-height: 100vh;
  background: #F7F7F7;
  padding: 1.1rem .24rem .9rem;
  .my-evaluation {
    padding: .2rem;
    background: #fff;
    border-radius: .16rem;
    .title {
      margin-bottom: .16rem;
      color: #888888;
      font-size: .24rem;
      line-height: .36rem;
    }
    textarea {
      margin-bottom: .2rem;
      padding: .2rem;
      width: 100%;
      height: 1.6rem;
      resize: none;
      background: #F7F7F7;
      border-radius: .16rem;
      border: none;
    }
  }
  .submit-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: .9rem;
    background: #FF4141;
    line-height: .9rem;
    text-align: center;
    font-size: .24rem;
    color: #fff;
  }
}
</style>