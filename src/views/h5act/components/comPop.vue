<template>
  <section :class="getClassName('com_pop')" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div class="title_bg">
            <div class="title_txt" v-if="popType==1">
              我的记录
            </div>
            <div class="title_txt" v-else-if="popType==3">
              恭喜获得
            </div>
            <div class="title_txt" v-else-if="popType==4">
              您有一份奖励待领取
            </div>
            <div class="title_txt" v-else-if="popType==6">
              大家都在玩
            </div>
            <div class="title_txt" v-else-if="popType==7">
              活动规则
            </div>
          </div>
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1">
                <div class="glue" style="position: relative">
                  <div class="tabs">
                    <div class="tabs-item" v-for="(item,index) in tabs" @click="changeTab(index)"
                         :class="{selected:index==tabIndex}">{{item}}
                    </div>
                  </div>
                  <div class="bonus-record prize" :class="{empty:!record.length}" v-if="tabIndex==1">
                    <template v-if="record.length">
                      <div class="title_items">
                        <div class="title" style="flex: .6">奖励时间</div>
                        <div class="title">奖励内容</div>
                      </div>
                      <div class="content">
                        <scroll :data="record" ref="scroll">
                          <ul>
                            <li v-for="item in record">
                              <div style="flex: .6">{{item.timeStr}}</div>
                              <div>
                                {{item.awardsName}}
                              </div>
                            </li>
                          </ul>
                        </scroll>
                      </div>
                    </template>
                  </div>
                  <div class="bonus-record" :class="{empty:!allRecord.length}" v-else>
                    <template v-if="allRecord.length">
                      <div class="title_items">
                        <div class="title">时间</div>
                        <div class="title add">优惠券</div>
                        <div class="title">使用</div>
                      </div>
                      <div class="content content_flag2">
                        <scroll :data="allRecord" ref="scroll">
                          <ul>
                            <li v-for="(item,index) in allRecord" class="coupon">
                              <div>{{item.timeStr}}</div>
                              <div>{{item.couponName}}</div>
                              <div>
                                <div class="btn" :class="{touse:item.status==1,invalid:item.status==4}"
                                     @click="gotouse(item.status)">
                                  {{btnNames[item.status-1]}}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </scroll>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
              <!--领取奖品-->
              <template v-else-if="popType==3">
                <div class="prize_info"
                     :class="{e2:prizeInfoList&&prizeInfoList.list.length==2}">
                  <div class="prize_info_item" v-for="(item,index) in prizeInfoList.list"
                       :class="{empty:!item.awardsName}">
                    <div class="prize_info_img">
                      <img :src="`${require(`../images/comPop/${item.type}.png`)}`" alt="" v-if="item.type">
                    </div>
                    <div class="prize_info_name">
                      <div class="prize_info_name_item" v-if="item.awardsType">{{getAwardName(item.type)}}</div>
                      <div class="prize_info_name_item" v-if="item.awardsName">
                        {{item.awardsName.replace(getAwardName(item.type),'')}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tips">{{prizeInfoList.receive?'今日奖励已全部领取':'奖励已自动发放到账，请查收'}}</div>
                <div class="btnred" @click="close(prizeInfoList)">我知道了</div>
              </template>
              <!--提示领奖-->
              <template v-else-if="popType==4">
                <img src="../images/comPop/bag.png" alt="" style="width: 1.8rem;height: 1.76rem">
                <div class="tips">
                  <p>快去领奖页开启您的专属奖励吧~</p>
                </div>
                <div class="btnred" @click="gotoprize">去领奖</div>
              </template>
              <!--大家都在玩-->
              <template v-else-if="popType==6">
                <div class="gamelist">
                  <img :src="require(`../images/games/${item.imgpostion}.png`)" alt=""
                       v-for="(item,index) in games.slice().sort((a,b)=>a.postion-b.postion)" class="game" @click="gotogame(item)">
                </div>
                <div class="gogames" @click="gotoindex">去玩更多游戏>></div>
              </template>
              <!--规则-->
              <template v-else-if="popType==7">
                <p>活动时间：{{actInfoData.beginDate+'~'+actInfoData.endDate}}</p>
                <p>活动介绍：</p>
                <p>1、此次活动中领取的满减优惠券仅限网游大作充值使用。</p>
                <p>2、活动内含不同额度的优惠券共六张，每日领取一次，限领取后24小时内使用，次日0点后可重新领取。</p>
                <p>3、当日累计充值金额越高，得到的宝箱越多，获得奖励越大。</p>
                <p>4、领奖页奖励的领取进度每日0点更新。</p>
                <p>5、所有宝箱奖励请在获得当天24点之前领取，领奖进度已经更新或活动已经结束将不再发放。</p>
                <p>6、若有其他问题请向在线客服咨询。</p>
              </template>
            </div>
            <div class="footer"></div>
          </div>
          <div class="close" @click="close">
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import {getAwardsRecord, getCouponssRecord} from '../utils/api'

  export default {
    name: 'comPop',
    data() {
      return {
        isShowPop: false,
        record: [],
        allRecord: [],
        currentIndex: 1,
        pageSize: 100,
        /** 滚动到底部锁 **/
        scrollLock: false,
        mineData: [],
        btnNames: ['去使用', '已使用', '使用中', '已失效'],
        games: [{//一刀传世
          id: 258,
          url: 'https://37.com.cn/h5game/public/?pid=652&gid=1005903&external=1',
          postion:3,
          imgpostion:0
        }, {//屠龙破晓
          id: 234, url: 'http://sdk.djsh5.com/c/login/jiangDD.php?99aG8Y6q57sEX&external=1',
          postion:4,
          imgpostion:1
        }, {//斩月屠龙
          id: 253, url: 'https://apigameh5.37.com/enter/ddw/23?external=1',
          postion:5,
          imgpostion:2
        }, {//沙巴克传奇
          id: 252, url: 'https://sdk.djsh5.com/c/login/jiangDD.php?bHUMz7MG2r9oh&external=1',
          postion:1,
          imgpostion:3
        }, {//金币大富翁
          id: 260, url: 'https://starth5super.ewan.cn/game/?aid=14229&pid=222951&cid=1479&external=1',
          postion:2,
          imgpostion:4
        }, {//霸者雄心
          id: 278, url: 'https://sdk.djsh5.com/c/login/jiangDD.php?V2Oon7oRTKwt5&external=1',
          postion:6,
          imgpostion:5
        }],
        tabs: ['领劵记录', '领奖记录'],
        tabIndex: 0,
      }
    },
    props: {
      popType: {
        type: Number,
        default: 0
      },
      actInfoData: {
        type: Object,
        default: null
      },
      prizeInfoList: {
        type: Object,
        default: null
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      gotouse(status) {
        if (status == 1) {
          this.close()
          this.$emit('gotouse')
        }
      },
      async changeTab(index) {
        this.tabIndex = index
        if (this.tabIndex == 1) {
          if (!this.record.length) {
            let {code, data} = await getAwardsRecord()
            if (code == 200) {
              this.record = data
            }
            this.isShowPop = true
          } else {
            this.isShowPop = true
          }
        } else {
          if (!this.allRecord.length) {
            this._getAllList()
          } else {
            this.isShowPop = true
          }
        }
        this.$refs.scroll&&this.$refs.scroll.scrollTo(0,0)
      },
      async _getAllList() {
        let {code, data} = await getCouponssRecord()
        if (code == 200) {
          this.allRecord = data
          this.isShowPop = true
        }
      },
      getClassName(name) {
        return `${name} flag${this.popType}`
      },
      getAwardName(awardType) {
        switch (awardType) {
          case 'jyz':
            return '金叶子'
            break
          case 'yg':
            return '鱼干'
            break
          case 'jdk':
            return '京东券'
            break
          case 'hfq':
            return '话费券'
            break
          case 'yhq':
            return '优惠券'
            break
        }
      },
      async showPop() {
        if (![1].includes(this.popType)) {
          this.isShowPop = true
        } else {
          if (this.popType == 1) {
            if (this.tabIndex == 1) {
              if (!this.record.length) {
                let {code, data} = await getAwardsRecord()
                if (code == 200) {
                  this.record =data
                }
                this.isShowPop = true
              } else {
                this.isShowPop = true
              }
            } else {
              if (!this.allRecord.length) {
                this._getAllList()
              } else {
                this.isShowPop = true
              }
            }
          }
        }
      },
      close(data) {
        if (this.popType == 3) {
          GLOBALS.marchSetsPoint(data && data.receive ? 'A_H5PT0280003354' : 'A_H5PT0280003353')
        }
        this.$emit('close')
        this.isShowPop = false
        this.record = []
        this.allRecord = []
        this.tabIndex = 0
      },
      move(e) {
        e.preventDefault()
      },
      gotoprize() {
        this.close()
        this.$emit('gotoprize')
      },
      gotogame({url, id}) {
        GLOBALS.marchSetsPoint('A_H5PT0280003352', {
          target_project_id: id
        })
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
    },
    watch: {
      isShowPop(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.move, {passive: false})
        } else {
          document.body.style.overflow = null
          document.removeEventListener('touchmove', this.move, {passive: false})
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    left: 50%;
    top: 1rem;
    margin-left: -2.75rem;
    &.flag4 {
      top: 3rem;
    }
    .pop-mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.55);
    }
    .pop {
      position: relative;
      z-index: 10;
      .wrap {
        margin: 0 auto;
        box-sizing: border-box;
        .title_bg {
          width: 5.51rem;
          height: .93rem;
          background: rgba(139, 24, 36, 1);
          border-radius: .2rem .2rem 0 0;
          position: relative;
          .title_txt {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            font-size: .36rem;
            font-weight: bold;
            color: rgba(243, 226, 200, 1);
            text-align: center;
            line-height: .93rem;
          }
        }
        .main {
          width: 5.51rem;
          height: 6.72rem;
          background: rgba(243, 226, 200, 1);
          border-radius: 0 0 .2rem .2rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: .3rem .3rem 0;
          box-sizing: border-box;
          &.flag3 {
            height: 5rem;
          }
          &.flag6{
            height: 5.5rem;
          }
          &.flag4 {
            height: 4.8rem;
          }
          &.flag7{
            height: 6rem;
          }
          .container_compop {
            .btnred {
              width: 3.9rem;
              height: .67rem;
              font-size: .3rem;
              background: rgba(255, 52, 52, 1);
              color: rgba(255, 252, 247, 1);
              line-height: .67rem;
              text-align: center;
              border-radius: .34rem;
              margin: 0 auto;
            }
            .btnOrange {
              width: 3rem;
              height: .8rem;
              font-size: .36rem;
              background: #F8783F;
              color: rgba(255, 252, 247, 1);
              line-height: .8rem;
              text-align: center;
              border-radius: .4rem;
              margin: 0 auto;
            }
            &.flag7 {
              .glue {
                position: relative;
                height: 6rem;
                margin: auto;
                .content {
                  position: absolute;
                  top: 1rem;
                  left: 0;
                  right: 0;
                  margin: auto;
                  height: 5rem;
                }
              }
              .prize {
                .item {
                  width: 100%;
                  margin-bottom: .1rem;
                  &:nth-child(3) {
                    margin-bottom: 0;
                  }
                  p {
                    height: .75rem;
                    border-radius: .2rem .2rem 0 0;
                    background: #FF7F32;
                    font-size: .3rem;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    line-height: .75rem;
                    text-align: center;
                  }
                  .prize_info {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    padding: .12rem;
                    box-sizing: border-box;
                    border-radius: 0 0 .2rem .2rem;
                    .prize_info_item {
                      width: 1.22rem;
                      margin-bottom: .18rem;
                      margin-right: .18rem;
                      &:nth-child(1) {
                        margin-left: .28rem;
                      }
                      &:nth-child(2) {
                        margin-right: .28rem;
                      }
                      &:nth-child(5n) {
                        margin-right: 0;
                      }
                      &.empty {
                        opacity: 0;
                        width: .96rem;
                      }
                      .prize_info_img {
                        height: 1.15rem;
                        background: rgba(254, 253, 251, 1);
                        border-radius: .2rem .2rem 0 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img {
                          width: 80%;
                          margin: auto;
                        }
                      }
                      .prize_info_name {
                        height: .65rem;
                        background: rgba(255, 127, 50, 1);
                        border-radius: 0 0 .2rem .2rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        padding: .1rem 0;
                        box-sizing: border-box;
                        .prize_info_name_item {
                          font-size: .22rem;
                          font-weight: 800;
                          text-align: center;
                          &:nth-child(2) {
                            color: #FFF500;
                          }
                        }
                      }
                    }
                  }
                }
              }
              p {
                font-weight: bold;
                color: rgba(139, 24, 36, 1);
                box-sizing: border-box;
                font-size: .24rem;
                line-height: .36rem;
                &.center {
                  text-align: center;
                  text-decoration: underline;
                }
              }
            }
            &.flag1, &.flag2 {
              .glue {
                position: relative;
                height: 6rem;
                margin: auto;
                .content {
                  position: absolute;
                  top: 1rem;
                  left: 0;
                  right: 0;
                  margin: auto;
                  height: 5rem;
                }
              }
              .tabs {
                display: flex;
                width: 3.48rem;
                height: .7rem;
                font-size: .24rem;
                font-weight: bold;
                margin: 0 auto .26rem;
                .tabs-item {
                  flex: 1;
                  font-weight: bold;
                  color: rgba(248, 120, 63, 1);
                  background: rgba(248, 180, 120, 1);
                  flex: 1;
                  text-align: center;
                  line-height: .7rem;
                  &.selected {
                    background: rgba(248, 120, 63, 1);
                    color: rgba(255, 230, 179, 1);
                  }
                  &:nth-child(1) {
                    border-radius: .35rem 0 0 .35rem;
                  }
                  &:nth-child(2) {
                    border-radius: 0 .35rem .35rem 0;
                  }
                }
              }
              .gonglueitem {
                width: 100%;
                background: #FFFFFF;
                border: 2px solid rgba(255, 219, 157, 1);
                border-radius: .2rem;
                display: flex;
                color: #FF7F32;
                box-sizing: border-box;
                h4 {
                  font-size: .24rem;
                  font-weight: bold;
                  line-height: .32rem;
                }
                h2 {
                  font-size: .2rem;
                  line-height: .32rem;
                  em {
                    color: #0D7CD2;
                    text-decoration: underline;
                  }
                }
                .left {
                  width: .69rem;
                  background: #FF7F32;
                  border-radius: .2rem 0 0 .2rem;
                  display: flex;
                  align-items: center;
                  text-align: center;
                  font-size: .36rem;
                  font-weight: bold;
                  color: #FFFFFF;
                }
                .right {
                  padding: .2rem .2rem;
                  line-height: .3rem;
                  width: 3.78rem;
                  box-sizing: border-box;
                }
                margin: 0 auto .2rem;
                &:nth-child(3) {
                  margin-bottom: 0;
                }
              }
              .prize {
                .item {
                  width: 100%;
                  margin-bottom: .1rem;
                  &:nth-child(3) {
                    margin-bottom: 0;
                  }
                  p {
                    height: .75rem;
                    border-radius: .2rem .2rem 0 0;
                    background: #FF7F32;
                    font-size: .3rem;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    line-height: .75rem;
                    text-align: center;
                  }
                  .prize_info {
                    display: flex;
                    flex-wrap: wrap;
                    padding: .12rem;
                    box-sizing: border-box;
                    border-radius: 0 0 .2rem .2rem;
                    background: #79C4FE;
                    .prize_info_item {
                      width: 1.22rem;
                      margin-bottom: .1rem;
                      margin-right: .07rem;
                      &:nth-child(4n) {
                        margin-right: 0;
                      }
                      &.empty {
                        opacity: 0;
                        width: .96rem;
                      }
                      .prize_info_img {
                        height: 1.15rem;
                        background: rgba(254, 253, 251, 1);
                        border-radius: .2rem .2rem 0 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img {
                          width: 80%;
                          margin: auto;
                        }
                      }
                      .prize_info_name {
                        height: .65rem;
                        background: rgba(255, 127, 50, 1);
                        border-radius: 0 0 .2rem .2rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        padding: .1rem 0;
                        box-sizing: border-box;
                        .prize_info_name_item {
                          font-size: .22rem;
                          font-weight: 800;
                          text-align: center;
                          &:nth-child(2) {
                            color: #FFF500;
                          }
                        }
                      }
                    }
                    &.lte2 {
                      justify-content: center;
                      .prize_info_item:nth-child(1) {
                        margin-right: .58rem;
                      }
                    }
                    &.triple {
                      width: 4.5rem;
                      margin: auto;
                    }
                  }
                }
              }
              .bonus-record {
                height: 2.16rem;
                position: relative;
                margin: auto;
                font-size: .22rem;
                font-weight: bold;
                .title_items {
                  display: flex;
                  height: .36rem;
                  background: rgba(255, 127, 50, 1);
                  border-radius: .1rem .1rem 0 0;
                  .title {
                    flex: 1;
                    text-align: center;
                    height: .36rem;
                    line-height: .36rem;
                    &:nth-child(1) {
                      border-right: 2px solid rgba(255, 255, 255, 1);
                    }
                    &.add {
                      border-right: 2px solid rgba(255, 255, 255, 1);
                    }
                  }
                }
                .content {
                  position: absolute;
                  height: 4.5rem;
                  top: .34rem;
                  left: 0rem;
                  right: 0;
                  font-weight: 500;
                  color: #666666;
                  overflow: hidden;
                  background: #fff;
                  border-radius: 0 0 .1rem .1rem;
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      line-height: .36rem;
                      height: .36rem;
                      align-items: center;
                      div {
                        flex: 1;
                        text-align: center;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        .btn {
                          margin: auto;
                          width: .9rem;
                          height: .4rem;
                          background: rgba(229, 142, 66, 1);
                          border-radius: .2rem;
                          font-size: .2rem;
                          font-weight: bold;
                          color: rgba(255, 255, 255, 1);
                          line-height: .4rem;
                          text-align: center;
                          &.touse {
                            background: rgba(255, 52, 52, 1);
                          }
                          &.invalid {
                            background: rgba(188, 188, 188, 1);
                          }
                        }
                      }
                      &:nth-child(2n) {
                        background: rgba(255, 230, 179, 1);
                      }
                      &.coupon {
                        line-height: .7rem;
                        height: .7rem;
                      }
                    }
                  }
                }
                &.empty {
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  margin: auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  &:before {
                    content: '';
                    position: absolute;
                    width: 1.27rem;
                    height: 1.27rem;
                    background: url("../images/comPop/empty.png");
                    background-size: 100% 100%;
                  }
                  &:after {
                    content: '没有记录';
                    position: absolute;
                    font-size: .24rem;
                    font-weight: 500;
                    color: rgba(207, 117, 66, 1);
                    align-self: flex-end;
                  }
                }
              }
              &.flag2 {
                .bonus-record {
                  .title_items {
                    .title {
                      &:nth-child(2) {
                        border-right: 2px solid rgba(255, 255, 255, 1);
                      }
                    }
                  }
                }
              }
            }
            &.flag3 {
              .prize_info {
                margin-top: .32rem;
                display: flex;
                flex-wrap: wrap;
                padding: 0 .22rem 0 .26rem;
                box-sizing: border-box;
                justify-content: space-around;
                position: relative;
                .prize_info_item {
                  width: 1.22rem;
                  margin-bottom: .1rem;
                  &.empty {
                    opacity: 0;
                    width: .48rem;
                  }
                  .prize_info_img {
                    height: 1.15rem;
                    background: rgba(254, 253, 251, 1);
                    border-radius: .2rem .2rem 0 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                      width: 80%;
                      margin: auto;
                    }
                  }
                  .prize_info_name {
                    height: .65rem;
                    background: rgba(255, 127, 50, 1);
                    border-radius: 0 0 .2rem .2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: .1rem 0;
                    box-sizing: border-box;
                    .prize_info_name_item {
                      font-size: .22rem;
                      font-weight: 800;
                      text-align: center;
                      &:nth-child(2) {
                        color: #FFF500;
                      }
                    }
                  }
                }
                &.e2:before {
                  content: '+';
                  position: absolute;
                  left: 0;
                  right: 0;
                  top: 0;
                  bottom: 0;
                  margin: auto;
                  font-size: .36rem;
                  font-weight: bold;
                  color: #ff7f32;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
              .tips {
                margin: .62rem 0 .28rem;
                font-size: .24rem;
                font-weight: bold;
                color: rgba(160, 114, 76, 1);
                text-align: center;
                line-height: .5rem;
              }
            }
            &.flag4 {
              display: flex;
              flex-direction: column;
              align-items: center;
              .tips {
                margin: .24rem 0 .72rem;
                p {
                  font-size: .24rem;
                  font-weight: bold;
                  color: rgba(160, 114, 76, 1);
                  text-align: center;
                  line-height: .5rem;
                }
              }
            }
            &.flag5 {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              .sad {
                width: 1.28rem;
                height: 1.37rem;
              }
              p {
                font-size: .3rem;
                font-weight: bold;
                color: rgba(169, 92, 23, 1);
                line-height: .4rem;
              }
              .package {
                margin: .18rem 0;
                width: 3.68rem;
                height: 1.36rem;
                background: rgba(255, 255, 255, 1);
                border-radius: .2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: .24rem;
                font-weight: bold;
                color: rgba(131, 131, 131, 1);
                line-height: .3rem;
                img {
                  width: 1.27rem;
                  height: 1.27rem;
                  margin-right: .22rem;
                }
              }
              .btnred {
                margin-bottom: .18rem;
              }
            }
            &.flag6 {
              .gamelist {
                display: flex;
                flex-wrap: wrap;
                height: 4.2rem;
                justify-content: space-between;
                padding: 0 0.2rem;
                .game {
                  width: 1.24rem;
                  height: 1.69rem;
                }
              }
              .gogames {
                font-size: 0.4rem;
                font-weight: bold;
                color: rgba(196, 48, 39, 1);
                text-align: center;
                padding-bottom: 0.1rem;
              }
            }
          }
        }
        .close {
          width: .6rem;
          height: .6rem;
          background: url("../images/comPop/close.png") no-repeat center
            center / 100% 100%;
          position: absolute;
          bottom: -1rem;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
    }
    .scalc-enter-active {
      animation: fadeAnimation 0.3s ease-in-out;
    }
    @keyframes fadeAnimation {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  }
</style>
