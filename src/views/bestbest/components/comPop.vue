<template>
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}" :class="{flag7:popType==7}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div class="title_bg">
            <div class="title_txt" v-if="popType==1">
              我的奖励
            </div>
            <div class="title_txt" v-else-if="popType==2">
              大家手气
            </div>
            <div class="title_txt" v-else-if="popType==3">
              恭喜您
            </div>
            <div class="title_txt" v-else-if="popType==4">
              温馨提示
            </div>
            <div class="title_txt" v-else-if="popType==5">
              很抱歉
            </div>
            <div class="title_txt" v-else-if="popType==6">
              我的签面
            </div>
            <div class="title_txt" v-else-if="popType==7">
              活动规则
            </div>
          </div>
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1">
                <div class="bonus-record" :class="{empty:!record.length}">
                  <template v-if="record.length">
                    <div class="title_items">
                      <div class="title">奖励时间</div>
                      <div class="title">奖励内容</div>
                    </div>
                    <div class="content">
                      <scroll :data="record">
                        <ul>
                          <li v-for="item in record">
                            <div>{{item.createTime}}</div>
                            <div>
                              {{item.awardsName}}
                            </div>
                          </li>
                        </ul>
                      </scroll>
                    </div>
                  </template>
                </div>
              </template>
              <template v-else-if="popType==2">
                <div class="bonus-record" :class="{empty:!allRecord.length}">
                  <template v-if="allRecord.length">
                    <div class="title_items">
                      <div class="title">排名</div>
                      <div class="title">用户ID</div>
                      <div class="title">奖励内容</div>
                    </div>
                    <div class="content content_flag2">
                      <scroll :data="allRecord" ref="scroll" :listenScroll="true" :probeType="3"
                              @scroll="scroll">
                        <ul>
                          <li v-for="(item,index) in allRecord">
                            <div>{{index+1}}</div>
                            <div>{{item.nickName}}</div>
                            <div>
                              {{item.awardsName}}
                            </div>
                          </li>
                        </ul>
                      </scroll>
                    </div>
                  </template>
                </div>
              </template>
              <template v-else-if="popType==3">
                <p>成功领取<i>{{awardData.awardsName.replace(getAwardName(awardData.awardsType),'')}}</i>{{getAwardName(awardData.awardsType)}}
                </p>
                <div class="prize_info_item">
                  <div class="prize_info_img">
                    <img :src="`${require(`../images/compop/${awardData.awardsType}.png`)}`" alt="">
                  </div>
                  <div class="prize_info_name">
                    <div class="prize_info_name_item" v-if="awardData.awardsType">
                      {{getAwardName(awardData.awardsType)}}
                    </div>
                    <div class="prize_info_name_item" v-if="awardData.awardsName">
                      {{awardData.awardsName.replace(getAwardName(awardData.awardsType),'')}}
                    </div>
                  </div>
                </div>
                <div class="btnred" @click="close(awardData)">收入囊中</div>
              </template>
              <!--提示付费-->
              <template v-else-if="popType==4">
                <div class="tips">
                  <p>任意付费即可参与抽签！</p>
                  <p>悄悄地说，单笔付费金额越高</p>
                  <p>抽中上上签的机会越大哦~</p>
                </div>
                <div class="btnred" @click="gotomall">去看看</div>
              </template>
              <!--大家玩游戏-->
              <template v-else-if="popType==5">
                <img src="../images/compop/sad.png" alt="" class="sad">
                <p>您尚未达到抽签要求...</p>
                <p>您可以通过购买6元礼包</p>
                <p>获取抽签资格</p>
                <div class="package">
                  <img src="../images/compop/package.png" alt="" class="package">
                  <div class="awardname">抽奖机会<br>+6000金叶子</div>
                </div>
                <div class="btnred" @click="gotopay">立即购买</div>
                <div class="btnOrange" @click="close">放弃巨款</div>
              </template>
              <!--发榜-->
              <template v-else-if="popType==6">
                <div class="content">
                  <scroll ref="scroll6" :data="mineData">
                    <div class="tasks">
                      <template v-for="item in 100">
                        <div class="task-item" v-for="item in mineData">
                          <div class="item">
                            <div class="date">{{item.date}}</div>
                            <div class="bestname">{{item.bestname}}</div>
                          </div>
                          <p>{{item.taskname}}</p>
                          <div class="btn"
                               :class="{btnComplete:item.status==0,btnGain:item.status==1,btnGained:item.status==2}" @click="gototask(item)">
                            {{btnNames[item.status]}}
                          </div>
                        </div>
                      </template>
                    </div>
                  </scroll>
                </div>
              </template>
              <template v-else-if="popType==7">
                <p>活动时间：x年x月x日-x年x月x日,一共5天</p>
                <p>活动介绍：</p>
                <p>1、活动1-4天，玩家每日首次任意付费，可获得1次抽签机会；任意付费后，可以购买礼包获得更多抽签机会，每日最多可以抽签4次。</p>
                <p>2、活动第5天抽签高额奖励上上签，最高可得150元奖励。参与每日抽签3天及以上，即可免费获得抽签机会；参与每日抽签不足3天，可以购买礼包获得抽签机会；参与每日抽签不足1天，则无抽签机会。</p>
                <p>3、签面由上上签、上签和中签组成，抽中不同的签会有不同的奖励和或者任务。抽到奖励的签，可以直接领取；抽到任务的签，完成简单任务后即可领取奖励。</p>
                <p>4、抽中签内的奖励或任务仅当日有效，逾期将不能领取或完成。</p>
                <p>5、抽签奖励包含不同面额的话费券、京东卡以及高额满减优惠券。</p>
                <p>如有其他问题请向客服咨询。</p>
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
  import {getAllRecords} from '../utils/api'

  export default {
    name: 'comPop',
    data() {
      return {
        isShowPop: false,
        tabs: ["活动规则", "奖励预览"],
        tabIndex: 0,
        record: [],
        allRecord: [],
        currentIndex: 1,
        pageSize: 100,
        /** 滚动到底部锁 **/
        scrollLock: false,
        mineData: [],
        btnNames: ['去完成', '可领取', '已获得']
      }
    },
    props: {
      popType: {
        type: Number,
        default: 0
      },
      awardData: {
        type: Object,
        default: () => {
          return {
            awardsType: 'jdk',
            awardsName: '1000元京东券'
          }
        }
      },
      leafItem: {
        type: Object,
        default: null
      },
      countTime: {
        type: String,
        default: ''
      },
      actInfoData: {
        type: Object,
        default: null
      },
      prizeInfoList: {
        type: Array,
        default: () => [{
          awardsType: 'jdk',
          awardsName: '100京东券'
        }, {
          awardsType: 'hfq',
          awardsName: '100话费券'
        }, {
          awardsType: 'yhq',
          awardsName: '100-45优惠券'
        }, {
          awardsType: 'jdk',
          awardsName: '100京东券'
        }, {
          awardsType: 'hfq',
          awardsName: '100话费券'
        }]

      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      /** 列表滚动到底部重新获取数据 **/
      scroll(pos) {
        let height = document.querySelector('.content_flag2 ul').clientHeight
        let boxHeight = document.querySelector('.content_flag2').clientHeight
        let endPosition = height - boxHeight
        if (Math.abs(Math.round(pos.y)) > endPosition) {
          /** 添加滚动锁数据没有回来不允许加载数据**/
          if (this.scrollLock) {
            return false
          }
          this.scrollLock = true
          setTimeout(() => {
            // 向列表添加数据
            this.currentIndex++
            this._getAllList()
          }, 100)
        }
      },
      async _getAllList() {
        let {code, data} = await getAllRecords({pageSize: this.pageSize, page: this.currentIndex})
        if (code == 200) {
          this.allRecord = [...this.allRecord, ...data.rankingList]
          /** 解除滚动限制 **/
          if (data.rankingList.length == this.pageSize) {
            this.scrollLock = false
          } else {
            this.scrollLock = true
          }
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
        if (![1, 2, 6].includes(this.popType)) {
          this.popType==4&&GLOBALS.marchSetsPoint('A_H5PT0274003249');
          this.isShowPop = true
        } else {
          if (this.popType == 1) {
            // let {code, data} = (await Services.gameReceiveRecord()).data
            // if (code == 200) {
            //   this.toalItems = [{
            //     awardsType: 'hfq',
            //     name: '话费券',
            //     value: data.hfqAmount
            //   }, {
            //     awardsType: 'jdk',
            //     name: '京东券',
            //     value: data.jdkAmount
            //   }, {
            //     awardsType: 'jyz',
            //     name: '金叶',
            //     value: data.jyzAmount
            //   }, {
            //     awardsType: 'yg',
            //     name: '鱼干',
            //     value: data.ygAmount
            //   }]
            this.record = []
            this.isShowPop = true
            // }
          } else if (this.popType == 2) {
            this._getAllList()
          } else {
            this.mineData = [{
              date: '4月9日',
              bestname: '上上签',
              taskname: '88元话费券+去竞技台球 中体验5局(0/5)',
              status: 1,
              url: ''
            }]
            this.isShowPop = true
          }
        }
      },
      close(data) {
        let points = ['A_H5PT0252002986', 'A_H5PT0252002993']
        if (this.popType == 3) {
          points[data.popType] && GLOBALS.marchSetsPoint(points[data.popType])
        }
        this.$emit('close')
        this.isShowPop = false
        this.tabIndex = 0
        this.scrollLock = false
        this.currentIndex = 1
        this.allRecord = []
      },
      move(e) {
        e.preventDefault()
      },
      exchange(item) {
        this.isShowPop = false
        this.$emit('exchange', item)
      },
      gotomall() {
        GLOBALS.marchSetsPoint('A_H5PT0274003250')
        location.href = 'https://wap.beeplaying.com/xmWap/#/payment'
      },
      gototask(item){
        if(item.status==0){
          item.url&&GLOBALS.jumpOutsideGame(item.url)
        }
        if(item.status==1){
          this.$emit('openprize',{
            awardsType: 'jdk',
            awardsName: '1000元京东券'
          })
        }
      }
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
    top: 2.5rem;
    margin-left: -2.75rem;
    &.flag7 {
      top: .5rem;
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
          &.flag7 {
            height: 8rem;
          }
          &.flag4 {
            height: 4.8rem;
          }
          .container_compop {
            .btnred {
              width: 3rem;
              height: .8rem;
              font-size: .36rem;
              background: rgba(255, 52, 52, 1);
              color: rgba(255, 252, 247, 1);
              line-height: .8rem;
              text-align: center;
              border-radius: .4rem;
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
              .tabs {
                display: flex;
                height: .7rem;
                font-size: .24rem;
                font-weight: bold;
                margin: auto;
                .tabs-item {
                  flex: 1;
                  font-weight: bold;
                  color: rgba(243, 226, 200, 1);
                  background: #F8783F;
                  flex: 1;
                  text-align: center;
                  line-height: .76rem;
                  &.selected {
                    background: #F8B478;
                    color: #F8783F;
                  }
                  &:nth-child(1) {
                    border-radius: .35rem 0 0 .35rem;
                  }
                  &:nth-child(2) {
                    border-radius: 0 .35rem .35rem 0;
                  }
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
                  }
                }
                .content {
                  position: absolute;
                  height: 5.8rem;
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
                      }
                      &:nth-child(2n) {
                        background: rgba(255, 230, 179, 1);
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
                    background: url("../images/compop/empty.png");
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
              p {
                font-size: .36rem;
                font-weight: bold;
                color: rgba(169, 92, 23, 1);
                margin: .6rem 0;
                text-align: center;
                i {
                  color: #FF3434;
                }
              }
              .prize_info_item {
                width: 1.22rem;
                margin: 0 auto .7rem;
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
            &.flag4 {
              .tips {
                margin: .6rem 0;
                p {
                  font-size: .36rem;
                  font-weight: bold;
                  color: rgba(169, 92, 23, 1);
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
              .content {
                position: absolute;
                height: 6.2rem;
                top: .34rem;
                left: 0rem;
                right: 0;
                font-weight: 500;
                color: #666666;
                overflow: hidden;
                border-radius: 0 0 .1rem .1rem;
                .tasks {
                  .task-item {
                    width: 5.07rem;
                    height: .79rem;
                    background: url("../images/compop/mineTaskBg.png");
                    background-size: 100% 100%;
                    display: flex;
                    align-items: center;
                    margin: 0 auto;
                    padding: 0 .15rem;
                    box-sizing: border-box;
                    margin-bottom: .2rem;
                    .item {
                      width: 1.65rem;
                      padding-bottom: .14rem;
                      box-sizing: border-box;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-around;
                      align-items: center;
                      .date{
                        width:1rem;
                        height:.24rem;
                        line-height: .24rem;
                        text-align: center;
                        background:rgba(246,228,189,1);
                        border-radius:.12rem;
                        font-size:.18rem;
                        font-weight:bold;
                        color:rgba(255,127,50,1);
                        margin-bottom: .06rem;
                      }
                      .bestname{
                        font-size:.24rem;
                        font-weight:bold;
                        color:rgba(255,248,238,1);
                      }
                    }
                    p {
                      padding: 0 .02rem;
                      box-sizing: border-box;
                      font-size: .2rem;
                      font-weight: bold;
                      color: rgba(153, 153, 153, 1);
                    }
                    .btn {
                      width: 1rem;
                      height: .44rem;
                      font-size: .2rem;
                      font-weight: bold;
                      color: rgba(255, 255, 255, 1);
                      text-align: center;
                      line-height: .44rem;
                      border-radius: .22rem;
                      &.btnComplete {
                        background: rgba(255, 52, 52, 1);
                      }
                      &.btnGain {
                        background: rgba(51, 188, 122, 1);
                      }
                      &.btnGained {
                        background: rgba(174, 174, 174, 1);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .close {
          width: .6rem;
          height: .6rem;
          background: url("../images/compop/close.png") no-repeat center
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
