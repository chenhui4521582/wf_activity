<template>
  <div class="comment-success">
    <wf-header :customize="true" title="评价晒单" @on-back="back" @on-click="back"/>
    <div class="comment-success-container">
      <img src="../img/commentSuccess.png" alt="">
      <div class="comment-success-txt">评价成功</div>
      <div class="comment-success-info">坚持写评价，更多奖品等你拿</div>
    </div>
    <div class="comment-success-footer">
      <div class="item" @click="back">返回</div>
      <div class="item" @click="checkComment">查看评价</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'commentSuccess',
    methods:{
      back(){
        this.$emit('commitBack')
      },
      checkComment(){
        this.$emit('checkComment')
      }
    }
  }
</script>

<style lang="less" scoped>
  .comment-success {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 11;
    background-color: #f7f7f7;
    overflow: hidden;
    .comment-success-container {
      position: absolute;
      top: 4rem;
      left: 0;
      right: 0;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 1.5rem;
        height: 1.5rem;
        margin-bottom: .46rem;
      }
      .comment-success-txt {
        font-size: .32rem;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        margin-bottom: .09rem;
      }
      .comment-success-info {
        font-size: .24rem;
        font-weight: 400;
        color: rgba(136, 136, 136, 1);
      }
    }
    .comment-success-footer {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      bottom: 0;
      display: flex;
      .item {
        flex: 1;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .24rem;
        font-weight: 500;
        &:nth-child(1) {
          color: rgba(255, 65, 65, 1);
          background: rgba(255, 255, 255, 1);
        }
        &:nth-child(2) {
          color: rgba(255, 255, 255, 1);
          background: rgba(255, 65, 65, 1);
        }
      }
    }
  }
</style>
