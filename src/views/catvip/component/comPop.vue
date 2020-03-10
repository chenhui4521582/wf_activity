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
              温馨提示
            </div>
            <div class="img" v-else-if="popType==5">
              大神们都在玩
            </div>
            <div class="img" v-else-if="popType==7">
              活动规则
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
                <img :src="require(`../images/comPop/${awardData.type}.png`)" alt="" v-if="awardData.type">
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
                  <img :src="require(`../imgs/games/${index}.png`)" alt="" v-for="(item,index) in games" class="game"
                       @click="gotogame(item,0)">
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
                <p>在本活动中支付<i>1元</i>即可参与抽券，您需要<i>手动抽取</i>，随机获得奖励池中的任一奖励； 若活动期间内您支付1元但未手动抽取奖励， 活动结束后平台会自动帮您抽取奖励，并通 过站内信告知。
                </p>
                <p class="title">3.话费券兑换金叶说明</p>
                <p>本次提供1万金叶子和2万金叶子两个档位的 兑换，活动期间每个档位<i>限兑5次</i></p>
                <p class="title">4.任务及排行榜说明</p>
                <p>任务完成后奖励限当天领取，若未领取，活 动结束后不给予补偿。 排行榜依据活动当天获得的鱼干量排名，仅<i>前50名</i>可获得猫币奖励，活动次日0点发榜， 奖励自动到账，同时会通过站内信通知</p>
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
    data() {
      return {
        isShowPop: false,
        record: [],
        toalItems: [],
        prizeInfoList: [],
        prizeInfo: ['参与奖', '三等奖', '二等奖', '一等奖', '特等奖'],
        resultInfo: ['非常抱歉', '温馨提示', '恭喜获得', '恭喜获得'],
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
        }],
        tabs: ['活动攻略', '活动奖励'],
        tabIndex: 0,
        medicineInfo: ['药丸', '酒精', '疫苗']
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
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
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
        }
      },
      async showPop() {
        this.isShowPop = true
      },
      close(data) {
        let points=['A_H5PT0252002986','A_H5PT0252002993']
        if(this.popType==3){
          points[data.popType]&& GLOBALS.marchSetsPoint(points[data.popType])
        }
        // this.$emit('close')
        this.tabIndex = 0
        this.isShowPop = false
      },
      gotoopengame() {
        GLOBALS.marchSetsPoint('A_H5PT0252002991')
        this.isShowPop = false
        this.$emit('opengame')
      },
      changeGear() {
        //GLOBALS.marchSetsPoint('A_H5PT0229002666')// H5平台-双旦活动页-摇一摇点击后幸运币充足提示弹窗-切换额度点击
        this.isShowPop = false
        this.$emit('close')
      },
      gotogame({url, id},type) {
        let points=['A_H5PT0252003004','A_H5PT0252002978','A_H5PT0252002980']
        GLOBALS.marchSetsPoint(points[type], {
          target_project_id: id
        })
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex() {
        GLOBALS.marchSetsPoint('A_H5PT0252003005')
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
      move(e) {
        e.preventDefault()
      },
      exchange(item) {
        this.isShowPop = false
        this.$emit('exchange', item)
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
      },
      tabIndex(val) {
        this.$refs.scroll4 && this.$refs.scroll4.scrollTo(0, 0)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    left: 50%;
    top:2.5rem;
    margin-left: -2.83rem;
    &.flag7{
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
          width: 5.66rem;
          height: 1.7rem;
          background: url("../images/comPop/top.png") no-repeat center
            center / 100% 100%;
          position: relative;
          .img {
            position: absolute;
            top: .7rem;
            left: 1.1rem;
            right: 1.4rem;
            margin: auto;
            font-size: .36rem;
            font-weight: bold;
            color: rgba(255, 214, 33, 1);
            text-align: center;
          }
        }
        .main {
          width: 5.66rem;
          font-size: 0.2rem;
          background: url("../images/comPop/bgline.png");
          background-size: 5.66rem .728rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: .3rem .4rem 0;
          box-sizing: border-box;
          .container_compop {
            .btnred {
              width: 3rem;
              height: .9rem;
              padding: .04rem 0 .08rem;
              box-sizing: border-box;
              background: url("../images/comPop/btn.png");
              background-size: 100% 100%;
              font-size: .3rem;
              font-weight: 400;
              color: rgba(255, 248, 239, 1);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin: .4rem auto 0;
              font-weight: bold;
            }
            &.flag7 {
              color: rgba(196, 94, 19, 1);
              box-sizing: border-box;
              font-size: .24rem;
              font-weight: 500;
              p {
                line-height: .36rem;
                &.title {
                  font-weight: bold;
                }
                i {
                  font-weight: bold;
                  color: #FF0505;
                }
              }
            }
            &.flag1 {
              font-size: .24rem;
              font-weight: 400;
              color: rgba(196, 94, 19, 1);
              p {
                line-height: .4rem;
              }
            }
            &.flag2 {
              font-size: .3rem;
              font-weight: 400;
              color: rgba(196, 94, 19, 1);
              line-height: .4rem;
            }
            &.flag3 {
              text-align: center;
              img {
                width: 40%;
              }
              .award_name {
                margin-top: .1rem;
                font-size: .38rem;
                font-weight: bold;
                color: rgba(196, 94, 19, 1);
              }
              .info {
                margin-top: .3rem;
                font-size: .24rem;
                font-weight: 500;
                color: rgba(211, 132, 77, 1);
              }
            }
            &.flag4 {
              font-size: .38rem;
              font-weight: bold;
              color: rgba(196, 94, 19, 1);
              i {
                color: #F8212C
              }
              line-height: .5rem;
              text-align: center;
            }
            &.flag5 {
              .gamelist {
                display: flex;
                flex-wrap: wrap;
                height: 4.2rem;
                justify-content: space-between;
                padding: 0 .2rem;
                .game {
                  width: 1.24rem;
                  height: 1.69rem;
                }
              }
              .gogames {
                font-size: .24rem;
                color: #C45E13;
                text-align: right;
                font-weight: bold;
                text-align: center;
                padding-bottom: .1rem;
              }
            }
            &.flag6 {
              font-size: .38rem;
              font-weight: bold;
              color: rgba(196, 94, 19, 1);
              text-align: center;
              line-height: .5rem;
              .info {
                margin-top: .3rem;
                font-size: .24rem;
                font-weight: 500;
                color: rgba(219, 152, 111, 1);
              }
              .back {
                margin: .27rem auto 0;;
                width: 3rem;
                height: .9rem;
                line-height: .9rem;
                text-align: center;
                border: 2px solid rgba(253, 177, 6, 1);
                border-radius: .45rem;
                font-size: .3rem;
                font-weight: 800;
                color: rgba(253, 175, 6, 1);
              }
              .sad {
                display: block;
                width: 1.49rem;
                height: 1.59rem;
                margin: 0 auto .2rem;
              }
            }
          }
          .footer {
            width: 5.66rem;
            height: .94rem;
            background: url("../images/comPop/bottom.png") no-repeat center
              center / 100% 100%;
            position: absolute;
            bottom: -.93rem;
            left: 0;
            margin: auto;
          }
        }
        .close {
          width: .97rem;
          height: .87rem;
          background: url("../images/comPop/close.png") no-repeat center
            center / 100% 100%;
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
