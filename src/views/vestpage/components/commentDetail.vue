<template>
  <section class="commentDetail">
    <comment v-if="showComment" :id="item.id" @close="refreshDetail" @back="showComment=false"></comment>
    <template v-else>
      <wfHeader title="帖子详情" :customize="customize" @on-click="back"></wfHeader>
      <div class="container">
        <div class="content">
          <div class="content_item">
            <div class="userinfo">
              <img :src="(detail&&detail.headImg||avatar)|filter" alt="" class="avatar">
              <div>
                <div class="name">{{detail&&detail.nickName}}</div>
                <div class="time">{{detail&&detail.createTime}}</div>
              </div>
            </div>
          </div>
          <div class="content_item">
            <div class="title">{{detail&&detail.title}}</div>
            <img :src="detail&&detail.original|filter" alt="" v-if="detail&&detail.original">
            <div class="articlecontent" v-html="detail&&detail.detail"></div>
          </div>
          <div class="content_item_comment">
            <div class="comment_info">
              全部评论 <i>({{ detail&&detail.commentCount||'暂无评论'}})</i>
            </div>
            <div class="comment_list">
              <div class="comment_list_item" :class="{last:index==detail&&detail.commentList.length-1}"
                   v-for="(item,index) in  detail&&detail.commentList">
                <div class="name">
                  <div class="item">
                    <img :src="(item.headImg||avatar)|filter" alt="">{{item.nickName}}
                  </div>
                  <div class="time">
                    {{item.createTime}}
                  </div>
                </div>
                <div class="info" v-html="item.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="saysth" @click="showCommentPage">点击说点什么</div>
        <div class="item" :class="{active:detail&&detail.praise}">
          <img src="../img/like_default.png" alt="" v-if="!(detail&&detail.praise)" @click="praise">
          <img src="../img/like_active.png" alt="" v-else>
          <div>{{detail&&detail.praiseCount||'点赞'}}</div>
        </div>
      </div>
    </template>
    <loading v-show="showLoading"></loading>
  </section>
</template>

<script>
  import {getDetailById, commitPraise} from '../utils/api'

  export default {
    name: 'commentDetail',
    components: {
      wfHeader: () => import('./wfHeader'),
      scroll: () => import('./scroll'),
      comment: () => import('./comment'),
      loading: () => import('../../../components/common/loading')
    },
    props: {
      item: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        avatar: '/cdn/common/images/common/img_photo.png',
        detail: null,
        customize: true,
        showComment: false,
        showLoading: false
      }
    },
    mounted() {
      this.getDetailById()
      GLOBALS.marchSetsPoint('A_H5PT0284003409', {
        awards_id: this.item.id,
        awards_name: this.item.title
      })// H5平台-马甲包游戏社区-帖子详情页面加载完成
    },
    methods: {
      back() {
        this.$emit('back')
      },
      async getDetailById() {
        let {code, data} = await getDetailById(this.item.id)
        if (code == 200) {
          this.detail = data
        }
      },
      async praise() {
        if (!(this.detail && this.detail.praise)) {
          GLOBALS.marchSetsPoint('A_H5PT0284003410', {
            awards_id: this.item.id,
            awards_name: this.item.title
          })// H5平台-马甲包游戏社区-帖子详情页面-点赞点击
          this.showLoading = true
          let {code, message} = await commitPraise({
            value: this.item.id
          })
          if (code == 200) {
            this.getDetailById()
            this.showLoading = false
          } else {
            this.$toast.show({
              message: message
            })
            this.showLoading = false
          }
        }
      },
      refreshDetail() {
        this.showComment = false
        this.getDetailById()
      },
      showCommentPage() {
        GLOBALS.marchSetsPoint('A_H5PT0284003411', {
          awards_id: this.item.id,
          awards_name: this.item.title
        })// H5平台-马甲包游戏社区-帖子详情页面-评论点击
        this.showComment = true
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../common/css/base.css";
  @import url('../iconfont/iconfont.css');

  .commentDetail {
    height: 100vh;
    position: relative;
    word-break: break-all;
    background: rgba(247, 247, 247, 1);
    .container {
      padding: 1rem 0;
      background: rgba(247, 247, 247, 1);
      .content {
        padding: .2rem .24rem;
        .content_item {
          background: rgba(255, 255, 255, 1);
          padding: .26rem .21rem .23rem;
          border-radius: .16rem;
          margin-bottom: .2rem;
          .title {
            font-size: .4rem;
            font-weight: bold;
            line-height: .48rem;
            color: rgba(0, 0, 0, 1);
            margin-bottom: .1rem;
          }
          .articlecontent {
            font-size: .28rem;
            font-weight: 500;
            line-height: .42rem;
            color: rgba(0, 0, 0, 1);
          }
          img {
            width: 6.3rem;
            margin-bottom: .1rem;
          }
          .userinfo {
            display: flex;
            align-items: center;
            .avatar {
              width: .72rem;
              height: .72rem;
              margin-right: .15rem;
            }
            .name {
              font-size: .28rem;
              font-weight: bold;
              color: rgba(0, 0, 0, 1);
              margin-bottom: .02rem;
            }
            .time {
              font-size: .24rem;
              font-weight: 400;
              color: rgba(187, 187, 187, 1);
            }
          }
        }
        .content_item_comment {
          background: rgba(255, 255, 255, 1);
          padding: .22rem .21rem;
          border-radius: .16rem;
          margin-bottom: .2rem;
          .comment_info {
            font-size: .32rem;
            font-weight: bold;
            line-height: .48rem;
            color: rgba(0, 0, 0, 1);
            i {
              font-size: .28rem;
              font-weight: bold;
              line-height: .42rem;
              color: rgba(136, 136, 136, 1);
            }
          }
          .comment_list {
            .comment_list_item {
              margin-top: .22rem;
              .name {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: .24rem;
                font-weight: 400;
                line-height: .36rem;
                color: rgba(136, 136, 136, 1);
                img {
                  width: .3rem;
                  height: .3rem;
                  margin-right: .1rem;
                }
                .time {
                  color: rgba(187, 187, 187, 1);
                }
                .item {
                  display: flex;
                  align-items: center;
                }
              }
              .info {
                margin-top: .12rem;
                font-size: .24rem;
                font-weight: 400;
                line-height: .36rem;
                color: rgba(0, 0, 0, 1);
              }
            }
          }
        }
      }
    }
    .footer {
      position: fixed;
      left: 0;
      right: 0;
      margin: auto;
      bottom: 0;
      height: 1rem;
      background: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: .17rem;
      padding-right: .4rem;
      box-sizing: border-box;
      .saysth {
        width: 5.7rem;
        height: .7rem;
        line-height: .7rem;
        padding-left: .4rem;
        box-sizing: border-box;
        background: rgba(247, 247, 247, 1);
        border-radius: .35rem;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(187, 187, 187, 1);
      }
      .item {
        img {
          width: .37rem;
          height: .4rem;
        }
        text-align: center;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(187, 187, 187, 1);
        &.active {
          color: rgba(255, 65, 65, 1);
        }
      }
    }
  }
</style>

