<template>
  <div class="evaluation">
    <Header title="评价晒单" />
    <!-- 打分 -->
    <goods-evaluation 
      :sendStars="sendStars"
      :goodsStarts="goodsStarts"
      @sendStars="receiveSendStars"
      @goodsStars="receiveGoodsStars"
    />
    <!-- 填写评价 -->
    <template>
      <div class="my-evaluation">
        <div class="title">您的评价</div>
        <div class="text"></div>
      </div>
      <div class="continue-btn" @click="goodsCommit">
        继续评价
      </div>
    </template>
    <!-- 您的评价 -->
    <template>
      <div class="my-evaluation">
        <div class="title">
          <span>您的评价</span>  
          <span>2019-12-56 15:55:36</span>
        </div>
        <textarea name="" id="" cols="30" rows="10" 
          placeholder="请描述评价内容（30字以内）" 
          v-model="myEvaluation" 
          @input="changeText"
        ></textarea>
        <!-- 上传图片 功能暂时不上 -->
        <!-- <upload-pictur /> -->
      </div>
      <div class="submit-btn" @click="goodsCommit">
        提交
      </div>
    </template>
    <!-- 评价成功 -->
    <comment-success 
      v-if="showSuccessPop" 
      @checkComment="checkComment" 
      @commitBack="commitBack"
    />
  </div>
</template>
<script>
import Services from '../../services/evaluation'
import GoodsEvaluation from './components/goodsEvaluation'
import CommentSuccess from './components/commentSuccess'
// import UploadPictur from './components/uploadPictur'
export default {
  name: 'evaluation',
  data: () => ({
    myEvaluation: '',
    sendStars: 5,
    goodsStarts: 5,
    showSuccessPop: false
  }),
  components: {
    GoodsEvaluation,
    CommentSuccess,
    // UploadPictur,
  },
  methods: {
    changeText() {
      
    },
    /** 接收发货速度评分 **/
    receiveSendStars (starts) {
      this.sendStars = starts
    },
    /** 接收商品评分 **/
    receiveGoodsStars (starts) {
      this.goodsStarts = starts
    },
    /** 提交评价 **/
    goodsCommit () {
      Services.goodsCommit({
        logId: '',
        descStars: this.goodsStarts,
        sendTimeStars: this.sendStars,
        remark: this.myEvaluation
      }).then(res => {
        // this.showSuccessPop = true
      })
    },
    /** 查看评价 **/
    checkComment () {

    },
    /** 返回 **/
    commitBack () {
      this.$router.push({
        name: 'order'
      })
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
  .submit-btn,.continue-btn {
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