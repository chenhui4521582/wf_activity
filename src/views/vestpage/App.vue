<template>
  <section id="app" class="vestpage" :class="{nodetail:!currentItem}">
    <commentDetail v-if="currentItem" :item="currentItem" @back="back"></commentDetail>
    <template v-else>
      <wfHeader :title="title" :showBack="showBack"></wfHeader>
      <div class="vestpage_container">
        <scroll ref="scroll">
          <div class="content">
            <template v-if="tabIndex==0">
              <div class="content_item" v-for="(item,index) in list" @click="showDetail(item)">
                <div class="title">{{item.title}}</div>
                <img :src="item.small|filter" alt="" v-if="item.small">
                <div class="articlecontent">{{item.content}}</div>
                <div class="userinfo">
                  <div class="item">
                    <img :src="(item.headImg||avatar)|filter" alt="" class="avatar">
                    <div>
                      <div class="name">{{item.nickName}}</div>
                      <div class="time">{{item.createTime}}</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="item_item">
                      <img src="./img/comment.png" alt=""><span>{{item.commentCount||'评论'}}</span>
                    </div>
                    <div class="item_item">
                      <img src="./img/like.png" alt=""><span>{{item.praiseCount||'点赞'}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else="tabIndex==1">
              <div class="content_item_package" v-for="(item,index) in packageList">
                <div class="package_info">
                  <img :src="item.icon|filter" alt="" v-if="item.icon">
                  <div class="item">
                    <div class="name">{{item.name}}</div>
                    <div class="info">{{item.remark}}</div>
                  </div>
                </div>
                <div class="package_list">
                  <div class="package_list_item" v-for="(package,packageIndex) in item.list">
                    <div>
                      <div class="name">{{package.name}}</div>
                      <div class="info">{{package.description}}</div>
                    </div>
                    <div class="btn" :class="{received:package.status==1,over:package.status==2}"
                         @click="receive(package)">
                      {{package.status==0?'领取':(package.status==1?'已领取':'已领完')}}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </scroll>
      </div>
      <div class="footer">
        <div class="item" v-for="(item,index) in footerList" @click="setIndex(index)">
          <img :src="tabIndex == index ? item.activeBg : item.defaultBg" alt=""/>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </template>
    <modal v-model="showModel" title="领取成功" type="2" :closeButtonShow="false" saveText="知道了" :closeIcon2Show="true"
           @on-save="showModel=false">
      <div class="package_code">
        礼包兑换码:<i>{{code}}</i> 已复制,可进入游戏内兑换领取
      </div>
    </modal>
    <loading v-show="showLoading"></loading>
  </section>
</template>

<script>
  import {getPostsList, getGamePacks, getAwards} from './utils/api'

  export default {
    name: 'vestpage',
    components: {
      wfHeader: () => import('./components/wfHeader'),
      scroll: () => import('./components/scroll'),
      modal: () => import('./components/modal'),
      commentDetail: () => import('./components/commentDetail'),
      loading: () => import('../../components/common/loading'),
    },
    data() {
      return {
        title:'热门帖子',
        showBack:false,
        showLoading: false,
        avatar: '/cdn/common/images/common/img_photo.png',
        currentItem:null,
        showModel: false,
        tabIndex: 0,
        footerList: [
          {
            name: '游戏社区',
            defaultBg: require('./img/game_default.png'),
            activeBg: require('./img/game_active.png')
          },
          {
            name: '游戏礼包',
            defaultBg: require('./img/package_default.png'),
            activeBg: require('./img/package_active.png')
          }
        ],
        list: [],
        packageList: [],
        code: ''//游戏激活码
      }
    },
    mounted() {
      this.getPostsList()
      GLOBALS.marchSetsPoint('P_H5PT0284', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })// H5平台-马甲包游戏社区-页面加载完成
    },
    methods: {
      back() {
        this.currentItem = null
        this.getPostsList()
      },
      showDetail(item) {
        GLOBALS.marchSetsPoint('A_H5PT0284003404', {
          awards_id: item.id,
          awards_name: item.title
        })// H5平台-马甲包游戏社区-帖子列表点击
        this.currentItem = item
      },
      async setIndex(index) {
        if (index != this.tabIndex) {
          this.tabIndex = index;
          this.title=index?'游戏礼包':'热门帖子'
          index==0&&(await this.getPostsList())
          index==1&&(await this.getGamePacks())
          this.$refs.scroll.scrollTo(0, 0)
          if (index == 1) {
            GLOBALS.marchSetsPoint('A_H5PT0284003406')// H5平台-马甲包游戏礼包-页面加载完成
          }
        }
      },
      async receive(item) {
        if (item.status == 0) {//可领取
          GLOBALS.marchSetsPoint('A_H5PT0284003407', {
            awards_id: item.batchId,
            awards_name: item.description
          })// H5平台-马甲包游戏礼包-领取点击
          this.showLoading = true
          let {code, data, message} = await getAwards({
            value: item.batchId
          })
          if (code == 200) {
            this.code = data;
            GLOBALS.marchSetsPoint('A_H5PT0284003408')// H5平台-马甲包游戏礼包-领取点击
            this.$copyText(this.code).then(res => {
              this.showModel = true
            }, err => {
              this.showModel = true
            }).catch(e => {
              this.showModel = true
            })
            this.showLoading = false
            this.getGamePacks()
          } else {
            this.showLoading = false
            this.$toast.show({
              message: message
            })
          }
        }
      },
      async getPostsList() {
        let {code, data} = await getPostsList()
        if (code == 200) {
          this.list = data
        }
      },
      async getGamePacks() {
        let {code, data} = await getGamePacks()
        if (code == 200) {
          this.packageList = data
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../../common/css/base.css";
  @import url('./iconfont/iconfont.css');

  .vestpage {
    height: 100vh;
    &.nodetail {
      position: relative;
      .vestpage_container {
        position: absolute;
        left: 0;
        right: 0;
        top: 1rem;
        bottom: 1rem;
        margin: auto;
        background: rgba(247, 247, 247, 1);
        .content {
          padding: .2rem .24rem;
          .content_item {
            background: rgba(255, 255, 255, 1);
            padding: .26rem .21rem .23rem;
            border-radius: .16rem;
            margin-bottom: .2rem;
            .title {
              font-size: .32rem;
              font-weight: bold;
              line-height: .48rem;
              color: rgba(0, 0, 0, 1);
              margin-bottom: .1rem;
            }
            .articlecontent {
              font-size: .24rem;
              font-weight: 500;
              height: .36rem;
              color: rgba(136, 136, 136, 1);
              word-break: keep-all;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            img {
              width: 6.3rem;
              margin-bottom: .1rem;
            }
            .userinfo {
              margin-top: .22rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .item {
                &:nth-of-type(1) {
                  display: flex;
                  .avatar {
                    width: .72rem;
                    height: .72rem;
                    margin-right: .15rem;
                  }
                  .name {
                    font-size: .24rem;
                    font-weight: 500;
                    line-height: .36rem;
                    color: rgba(0, 0, 0, 1);
                    margin-bottom: .02rem;
                  }
                  .time {
                    font-size: .24rem;
                    font-weight: 400;
                    line-height: .36rem;
                    color: rgba(187, 187, 187, 1);
                  }
                }
                &:nth-of-type(2) {
                  font-size: .24rem;
                  font-weight: 400;
                  line-height: .36rem;
                  color: rgba(187, 187, 187, 1);
                  width: 2rem;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .item_item {
                    display: flex;
                    /*align-items: center;*/
                    &:nth-child(1) {
                      img {
                        height: .3rem;
                        width: .325rem;
                        margin-right: .09rem;
                      }
                    }
                    &:nth-child(2) {
                      img {
                        height: .3rem;
                        width: .28rem;
                        margin-right: .04rem;
                      }
                    }
                  }
                }
              }
            }
          }
          .content_item_package {
            background: rgba(255, 255, 255, 1);
            padding: 0 .21rem .08rem;
            border-radius: .16rem;
            margin-bottom: .2rem;
            .package_info {
              display: flex;
              height: 1.42rem;
              align-items: center;
              img {
                width: .8rem;
                height: .8rem;
                margin-right: .13rem;
              }
              .name {
                font-size: .28rem;
                font-weight: bold;
                color: rgba(0, 0, 0, 1);
              }
              .info {
                margin-top: .09rem;
                font-size: .2rem;
                font-weight: 500;
                color: rgba(136, 136, 136, 1);
              }
            }
            .package_list {
              .package_list_item {
                height: 1.2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid rgba(238, 238, 238, 1);
                .name {
                  font-size: .24rem;
                  font-weight: 400;
                  color: rgba(0, 0, 0, 1);
                }
                .info {
                  margin-top: .02rem;
                  font-size: .2rem;
                  font-weight: 500;
                  color: rgba(136, 136, 136, 1);
                }
                .btn {
                  width: 1.1rem;
                  height: .42rem;
                  background: rgba(255, 120, 0, 1);
                  border-radius: .1rem;
                  font-size: .24rem;
                  font-weight: 500;
                  line-height: .42rem;
                  text-align: center;
                  color: rgba(255, 255, 255, 1);
                  &.received {
                    background: rgba(240, 240, 240, 1);
                    color: rgba(255, 120, 0, 1);
                  }
                  &.over {
                    background: rgba(240, 240, 240, 1);
                    color: rgba(187, 187, 187, 1);
                  }
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
        justify-content: space-around;
        .item {
          flex: 1;
          text-align: center;
          font-size: .18rem;
          font-weight: 500;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(0, 0, 0, 1);
          img {
            width: .54rem;
            height: .54rem;
          }
        }
      }
      .package_code {
        font-size: .24rem;
        font-weight: 400;
        line-height: 36px;
        color: rgba(136, 136, 136, 1);
        text-align: center;
        i {
          color: #FF7800;
        }
      }
    }
  }
</style>
