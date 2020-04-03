<template>
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}" :class="{flag7:popType==7}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div class="title_bg">
            <div class="img" v-if="popType==1">
              鱼干说明
            </div>
            <div class="img" v-else-if="popType==2">
              猫币介绍
            </div>
            <div class="img" v-else-if="popType==3">
              恭喜获得
            </div>
            <div class="img" v-else-if="[4,6].includes(popType)">
              {{actInfoData.state===1?actInfoData.catStatus?'':actInfoData.catLevel>20?'':'':'温馨提示'}}
            </div>
            <div class="img" v-else-if="popType==5">
              大神们都在玩
            </div>
            <div class="img" v-else-if="popType==7">
              活动规则
            </div>
            <div class="img" v-else-if="popType==8">
              限购次数说明
            </div>
          </div>
          <div class="main">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1">
                <p>1.向招财猫喂食鱼干可提升等级，到达相应等级后可获得特权。</p>
                <p>2.每消耗1000金叶子，可自动获得1g鱼干，限以下游戏：欢乐竞技台球,糖果萌消消,街机欢乐捕鱼,众神风云,王者弹珠,深海探一探,
                  三国大作战,欢乐的小鸟,枪火英雄(物资争夺玩法除外),狂热斗地主(只算桌费),破晓天天麻将(只算桌费)</p>
              </template>
              <template v-else-if="popType==2">
                猫币是招财猫道具，可在招财猫的领奖页兑换金叶子、话费卡、京东卡等奖励。
                <div class="btnred" @click="close">我知道了</div>
              </template>
              <template v-else-if="popType==3">
                <img :src="require(`../images/comPop/${awardData.type}.png`)" alt=""
                  v-if="awardData.type">
                <img :src="awardData.awardsImg|filter" alt="" v-else>
                <div class="award_name">{{awardData.awardsName}}</div>
                <div class="btnred" @click="close(awardData)">收入囊中</div>
                <div class="info">{{awardData.info}}</div>
              </template>
              <!--攻略-->
              <template v-else-if="popType==4">
                <template v-if="actInfoData.state==0">
                  当前为活动预热阶段，不可参与，{{countTime}}后会员日开启
                  <div class="btnred" @click="close">我知道了</div>
                </template>
                <template v-else-if="actInfoData.state==1">
                  <template v-if="actInfoData.catStatus">
                    当前未满足参与条件，招财猫等级达<i>Lv.20</i>即可立即参与，快去喂食升级吧
                    <div class="btnred" @click="gotogame({id:0,url:'/petcat'},2)">喂食升级</div>
                  </template>
                  <template v-else>
                    当前您不可参与会员日活动哦，领取招财猫并升级至<i>Lv.20</i>，即可立即参加
                    <div class="btnred" @click="gotogame({id:0,url:'/petcat'},1)">去领养猫</div>
                  </template>
                </template>
              </template>
              <!--大家玩游戏-->
              <template v-else-if="popType==5">
                <div class="gamelist">
                  <img :src="require(`../imgs/games/${index}.png`)" alt=""
                    v-for="(item,index) in games" class="game" @click="gotogame(item,0)">
                </div>
                <div class="gogames" @click="gotoindex">去玩更多游戏>></div>
              </template>
              <!--发榜-->
              <template v-else-if="popType==6">
                <template v-if="leafItem.convert">
                  确认消耗{{leafItem.hfq*0.1}}元话费碎片<br>兑换{{leafItem.leafName}}？
                  <div class="info">本商品今日共可兑换{{leafItem.limit}}次</div>
                  <div class="btnred" @click="exchange(leafItem)">兑换</div>
                  <div class="back" @click="close">返回</div>
                </template>
                <template v-else>
                  <img src="../images/comPop/sad.png" alt="" class="sad">
                  您的话费券不足
                  <div class="btnred" @click="gotoopengame">去赚话费</div>
                  <div class="back" @click="close">返回</div>
                </template>
              </template>
              <template v-else-if="popType==7">
                <p class="title">1.参与条件</p>
                <p>猫等级达到<i>Lv.20</i>才可参与会员日各类活动。</p>
                <p class="title">2.一元抽神券说明</p>
                <p>在本活动中支付<i>1元</i>即可参与抽券，您需要<i>手动抽取</i>，随机获得奖励池中的任一奖励； 若活动期间内您支付1元但未手动抽取奖励，
                  活动结束后平台会自动帮您抽取奖励，并通过站内信告知。
                </p>
                <template
                  v-if="actInfoData&&actInfoData.leafConvertConfigList&&actInfoData.leafConvertConfigList.length">
                  <p class="title">3.话费券兑换金叶说明</p>
                  <p>
                    本次提供{{actInfoData.leafConvertConfigList.map(item=>item.leafName).join('和')}}<template
                      v-if="actInfoData.leafConvertConfigList.length>1">{{actInfoData.leafConvertConfigList.length}}个</template>档位的兑换，活动期间<template
                      v-if="actInfoData.leafConvertConfigList.length>1">每个档位</template><i>限兑{{actInfoData.leafConvertConfigList[0].limit}}次</i>
                  </p>
                </template>
                <p class="title">
                  {{actInfoData&&actInfoData.leafConvertConfigList&&actInfoData.leafConvertConfigList.length?4:3}}.任务及排行榜说明
                </p>
                <p>
                  任务完成后奖励限当天领取，若未领取，活动结束后不给予补偿。排行榜依据活动当天获得的鱼干量排名，仅<i>前50名</i>可获得猫币奖励，活动次日0点发榜，奖励自动到账，同时会通过站内信通知
                </p>
              </template>
              <!-- 限购次数说明 -->
              <template v-else-if="popType==8">
                <div>
                  <p>猫等级提升，可增加限购次数：</p>
                  <p>Lv.20及以上，限购1次</p>
                  <p>Lv.30及以上，限购2次</p>
                  <p>Lv.40及以上，限购3次</p>
                </div>
                <div class="btnred" @click="gotogame({id:0,url:'/petcat'},3)">喂食升级</div>
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
export default {
  name: 'comPop',
  data () {
    return {
      isShowPop: false,
      games: [{
        id: 12,
        url: '/crush'
      }, {
        id: 2, url: '/billiards'
      }, {
        id: 10, url: '/fish'
      }, {
        id: 13, url: '/kingdom2'
      }, {
        id: 18, url: '/square'
      }, {
        id: 21, url: '/Marbles'
      }]
    }
  },
  props: {
    popType: {
      type: Number,
      default: 0
    },
    awardData: {
      type: Object,
      default: () => null
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
    packageInfo: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    packageList () {
      return this.packageInfo.filter(item => item.price !== 1 && item.price !== 10)
    }
  },
  components: {
    scroll: () => import('./scroll')
  },
  methods: {
    getClassName (name) {
      return `${name} flag${this.popType}`
    },
    getAwardName (awardType) {
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
      }
    },
    async showPop () {
      this.isShowPop = true
    },
    close (data) {
      let points = ['A_H5PT0252002986', 'A_H5PT0252002993']
      if (this.popType == 3) {
        points[data.popType] && GLOBALS.marchSetsPoint(points[data.popType])
      }
      // this.$emit('close')
      this.isShowPop = false
    },
    gotoopengame () {
      GLOBALS.marchSetsPoint('A_H5PT0252002991')
      this.isShowPop = false
      this.$emit('opengame')
    },
    gotogame ({ url, id }, type) {
      let points = ['A_H5PT0252003004', 'A_H5PT0252002978', 'A_H5PT0252002980']
      GLOBALS.marchSetsPoint(points[type], {
        target_project_id: id
      })
      GLOBALS.jumpOutsideGame(url)
    },
    gotoindex () {
      GLOBALS.marchSetsPoint('A_H5PT0252003005')
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
    },
    move (e) {
      e.preventDefault()
    },
    exchange (item) {
      this.isShowPop = false
      this.$emit('exchange', item)
    }
  },
  watch: {
    isShowPop (value) {
      if (value) {
        document.body.style.overflow = 'hidden'
        document.addEventListener('touchmove', this.move, { passive: false })
      } else {
        document.body.style.overflow = null
        document.removeEventListener('touchmove', this.move, { passive: false })
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
  margin-left: -2.83rem;
  &.flag7 {
    top: 0.5rem;
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
        width: 5.66rem;
        height: 1.7rem;
        background: url("../images/comPop/top.png") no-repeat center center /
          100% 100%;
        position: relative;
        .img {
          position: absolute;
          top: 0.7rem;
          left: 0;
          right: 0;
          margin: auto;
          font-size: 0.36rem;
          font-weight: bold;
          color: rgba(255, 214, 33, 1);
          text-align: center;
        }
      }
      .main {
        width: 5.66rem;
        font-size: 0.2rem;
        background: url("../images/comPop/bgline.png");
        background-size: 5.66rem 0.728rem;
        color: #fff;
        position: relative;
        top: -0.1rem;
        padding: 0.3rem 0.4rem 0;
        box-sizing: border-box;
        .container_compop {
          .btnred {
            width: 3rem;
            height: 0.9rem;
            padding: 0.04rem 0 0.08rem;
            box-sizing: border-box;
            background: url("../images/comPop/btn.png");
            background-size: 100% 100%;
            font-size: 0.3rem;
            font-weight: 400;
            color: rgba(255, 248, 239, 1);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0.4rem auto 0;
            font-weight: bold;
          }
          &.flag7 {
            color: rgba(196, 94, 19, 1);
            box-sizing: border-box;
            font-size: 0.24rem;
            font-weight: 500;
            p {
              line-height: 0.36rem;
              &.title {
                font-weight: bold;
              }
              i {
                font-weight: bold;
                color: #ff0505;
              }
            }
          }
          &.flag1 {
            font-size: 0.24rem;
            font-weight: 400;
            color: rgba(196, 94, 19, 1);
            p {
              line-height: 0.4rem;
            }
          }
          &.flag2 {
            font-size: 0.3rem;
            font-weight: 400;
            color: rgba(196, 94, 19, 1);
            line-height: 0.4rem;
          }
          &.flag3 {
            text-align: center;
            img {
              width: 40%;
            }
            .award_name {
              margin-top: 0.1rem;
              font-size: 0.38rem;
              font-weight: bold;
              color: rgba(196, 94, 19, 1);
            }
            .info {
              margin-top: 0.3rem;
              font-size: 0.24rem;
              font-weight: 500;
              color: rgba(211, 132, 77, 1);
            }
          }
          &.flag4 {
            font-size: 0.38rem;
            font-weight: bold;
            color: rgba(196, 94, 19, 1);
            i {
              color: #f8212c;
            }
            line-height: 0.5rem;
            text-align: center;
          }
          &.flag5 {
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
              font-size: 0.24rem;
              color: #c45e13;
              text-align: right;
              font-weight: bold;
              text-align: center;
              padding-bottom: 0.1rem;
            }
          }
          &.flag6 {
            font-size: 0.38rem;
            font-weight: bold;
            color: rgba(196, 94, 19, 1);
            text-align: center;
            line-height: 0.5rem;
            .info {
              margin-top: 0.3rem;
              font-size: 0.24rem;
              font-weight: 500;
              color: rgba(219, 152, 111, 1);
            }
            .back {
              margin: 0.27rem auto 0;
              width: 3rem;
              height: 0.9rem;
              line-height: 0.9rem;
              text-align: center;
              border: 2px solid rgba(253, 177, 6, 1);
              border-radius: 0.45rem;
              font-size: 0.3rem;
              font-weight: 800;
              color: rgba(253, 175, 6, 1);
            }
            .sad {
              display: block;
              width: 1.49rem;
              height: 1.59rem;
              margin: 0 auto 0.2rem;
            }
          }
          &.flag8 {
            font-size: 0.24rem;
            font-weight: bold;
            color: rgba(196, 94, 19, 1);
            text-align: center;
            p {
              line-height: 0.4rem;
            }
          }
        }
        .footer {
          width: 5.66rem;
          height: 0.94rem;
          background: url("../images/comPop/bottom.png") no-repeat center center /
            100% 100%;
          position: absolute;
          bottom: -0.93rem;
          left: 0;
          margin: auto;
        }
      }
      .close {
        width: 0.97rem;
        height: 0.87rem;
        background: url("../images/comPop/close.png") no-repeat center center /
          100% 100%;
        position: absolute;
        top: 1rem;
        right: 0;
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
