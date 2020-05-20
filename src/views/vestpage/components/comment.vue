<template>
  <section class="comment">
    <wfHeader title="发表评论" :customize="customize" @on-click="back"></wfHeader>
    <div class="publish" :class="{active:commenttxt.length}" @click="publish">发布</div>
    <div class="comment_container" @click="onFocus">
      <div><textarea v-model.trim="commenttxt" placeholder="说出你的看法" maxlength="120" ref="textarea"
                     :style="{height:height}"></textarea></div>
      <div class="percent">{{commenttxt.length}}/120</div>
    </div>
    <loading v-show="showLoading"></loading>
  </section>
</template>

<script>
  import {commitComment} from '../utils/api'

  export default {
    name: 'commentDetail',
    components: {
      wfHeader: () => import('./wfHeader'),
      loading: () => import('../../../components/common/loading')
    },
    props: {
      id: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        commenttxt: '',
        customize: true,
        showLoading: false,
        height: '.7rem'
      }
    },
    methods: {
      onFocus() {
        this.$refs.textarea.focus()
      },
      back() {
        this.$emit('back')
      },
      async publish() {
        if (this.commenttxt.length) {
          this.showLoading = true
          let {code, message} = await commitComment({
            content: this.commenttxt,
            coterieId: this.id
          })
          if (code == 200) {
            this.$toast.show({
              message: '评论成功'
            })
            this.showLoading = false
            this.$emit('close')
          } else {
            this.$toast.show({
              message: message
            })
            this.showLoading = false
          }
        }
      }
    },
    watch: {
      commenttxt() {
        this.height = this.$refs.textarea.scrollHeight + 'px'
      }
    },
    mounted(){
      GLOBALS.marchSetsPoint('A_H5PT0284003405')// H5平台-马甲包游戏社区-帖子评论输入页面加载完成
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../common/css/base.css";
  @import url('../iconfont/iconfont.css');

  .comment {
    height: 100vh;
    position: relative;
    background: rgba(247, 247, 247, 1);
    .publish {
      position: fixed;
      top: 0;
      font-size: .24rem;
      font-weight: 500;
      color: rgba(255, 65, 65, 0.5);
      right: .53rem;
      height: 1rem;
      line-height: 1rem;
      z-index: 10;
      &.active {
        color: rgba(255, 65, 65, 1);
      }
    }
    .comment_container {
      position: fixed;
      top: 1.2rem;
      width: 6.72rem;
      height: 6rem;
      margin: 0 .24rem;
      border-radius: .16rem;
      -webkit-text-size-adjust: none;
      background: #fff;
      padding: .22rem;
      box-sizing: border-box;
      textarea {
        font-size: .24rem;
        color: rgba(0, 0, 0, 1);
        caret-color: rgba(0, 0, 0, 1);
        width: 100%;
        border: none;
        outline: 0;
        -webkit-user-select: auto !important;
        -khtml-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        -o-user-select: auto !important;
        user-select: auto !important;
        -webkit-appearance: none !important;
        overflow: hidden;
      }
      .percent {
        position: absolute;
        left: .42rem;
        bottom: .22rem;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(187, 187, 187, 1);
      }
    }
  }

  textarea::-webkit-input-placeholder { /* WebKit browsers */
    font-size: .24rem;
    font-weight: 400;
    color: rgba(187, 187, 187, 1);
  }
</style>

