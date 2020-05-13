<template>
  <div class="h5act" v-if="actInfo">
    <div class="h5act-container">
      <div class="back" @click="backHome">返回</div>
      <div class="rule" @click="showPop(7)">规则</div>
      <div class="myprize" @click="showPop(1)">我的记录</div>
      <div class="tabs">
        <div class="item" v-for="(item,index) in tabNames" :class="{selected:tabIndex==index}" @click="changeTab(index)">
          {{item}}
        </div>
      </div>
      <template>
        <div class="box_list" v-show="tabIndex==1">
          <div class="item" v-for="(item,index) in list"
               :style="{ background: `url(${getBackground(item)||''})`, backgroundSize: 'cover'}">
            <div class="box_container" v-if="!item.decid&&item.decid!==0">
              <div class="box" :class="{opened:item.status==2,animation:item.status==1}" @click="showTips(index,item)">
                <div class="tips" v-if="tipsIndex==index&&item.status!=2" v-html="item.awardsName.replace('+','<br>')">
                </div>
              </div>
              <div class="paynum">累充{{item.limit}}元</div>
              <div class="btn" :class="{received:item.status==2}" @click="gotoreceive(item,index)"></div>
            </div>
          </div>
        </div>
        <div class="info" v-show="tabIndex==1">
          <p>活动期间，领奖页奖励领取进度每日更新，按照自然日计算；</p>
          <p>奖励需在获得当天及时领取，逾期更新后将不再发放；</p>
          <p>点击宝箱可查看奖励。</p>
        </div>
      </template>
      <div class="discountList" v-show="tabIndex==0">
        <div class="item" v-for="(item,index) in discountArr">
          <div class="dicount">{{item.discount}}折</div>
          <div class="dicount_info">
            <div class="content">{{item.awardsName}}</div>
            <div class="tip">(仅限网游大作充值使用)</div>
          </div>
          <div class="btn" :class="{received: item.received}" @click="gotoreceive(item,index)">
            {{item.received?'已领取':'可领取'}}
          </div>
        </div>
      </div>
      <div class="info" v-show="tabIndex==0">
        <p>活动期间不同额度的优惠券共六张，每日领取一次，领取后24小时内使用；次日可重新领取。</p>
        <p> 当日使用优惠券的累充金额越高，得到的宝箱越多，获得奖励越大。</p>
      </div>
    </div>
    <comPop :popType="popType" :prizeInfoList="prizeInfoList" :actInfoData="actInfo" ref="comPop" @close="popType=0"
            @gotoprize="tabIndex=1" @gotouse="showPop(6)"></comPop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </div>
</template>
<script>
  import {activityInfo, getAwards, getCoupon} from './utils/api'

  export default {
    name: 'h5act',
    data: () => ({
      popType: 0,
      showBar: true,
      showLoading: false,
      actInfo: null,
      tabNames: ['领劵页', '领奖页'],
      tabIndex: 0,
      tipsIndex: 0,
      timer: null,
      prizeInfoList: null,
      //领奖页面位置信息(除宝箱)
      positionArr: [{
        position: 0,
        val: 1
      }, {
        position: 2,
        val: 3
      }, {
        position: 4,
        val: 5
      }, {
        position: 5,
        val: 0
      }, {
        position: 6,
        val: 0
      }, {
        position: 7,
        val: 0
      }, {
        position: 8,
        val: 0
      }, {
        position: 10,
        val: 13
      }, {
        position: 12,
        val: 11
      }, {
        position: 13,
        val: 0
      }, {
        position: 14,
        val: 7
      }, {
        position: 16,
        val: 0
      }, {
        position: 18,
        val: 9
      }, {
        position: 20,
        val: 15
      }, {
        position: 21,
        val: 0
      }, {
        position: 22,
        val: 0
      }, {
        position: 23,
        val: 0
      }, {
        position: 24,
        val: 0
      }, {
        position: 26,
        val: 17
      }, {
        position: 28,
        val: 19
      }, {
        position: 30,
        val: 0
      }, {
        position: 31,
        val: 0
      }, {
        position: 32,
        val: 0
      }, {
        position: 33,
        val: 0
      }, {
        position: 34,
        val: 21
      }, {
        position: 35,
        val: 0
      }, {
        position: 36,
        val: 0
      }, {
        position: 38,
        val: 23
      }],
      //宝箱数据
      boxList: [],
      //领奖页面数据（整合后的）
      list: [],
      //优惠券列表
      discountArr: []
    }),
    components: {
      comPop: () => import('./components/comPop'),
      loading: () => import('../../components/common/loading'),
    },
    computed: {
      moreprize() {
        return this.actInfo && [2, 3].includes(this.actInfo.state)
      }
    },
    methods: {
      changeTab(index){
        if(index!=this.tabIndex){
          this.tabIndex=index
          index&&GLOBALS.marchSetsPoint('A_H5PT0280003346')
        }
      },
      showTips(index, item) {
        if (item.status != 2 && this.tipsIndex != index) {
          clearTimeout(this.timer)
          this.tipsIndex = index
          this.timer = setTimeout(() => {
            this.tipsIndex = 0
          }, 3000)
        }
      },
      getList() {
        let list = this.boxList.slice()
        list[3] = this.boxList[5]
        list[4] = this.boxList[6]
        list[5] = this.boxList[4]
        list[6] = this.boxList[3]
        list[10] = this.boxList[11]
        list[11] = this.boxList[10]
        this.positionArr.forEach(item => {
          list.splice(item.position, 0, {decid: item.val})
        })
        this.list = list
      },
      getBackground(item) {
        if (item.decid) {
          return `${require(`./images/${item.decid}.png`)}`
        } else {
          if (item.decid !== 0) {
            return `${require(`./images/task_bg.png`)}`
          }
        }
      },
      move(e) {
        e.preventDefault()
      },
      //弹窗
      showPop(type) {
        this.popType = type
        let point = ''
        switch (type) {
          case 7:
            point = 'A_H5PT0280003348';
            break;//规则点击
          case 1:
            point = 'A_H5PT0280003349';
            break;//我的记录
        }
        point && GLOBALS.marchSetsPoint(point)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        }, type == 4 ? 1000 : 0)
      },
      backHome() {
        GLOBALS.marchSetsPoint('A_H5PT0280003347')
        window.location.href = "//wap.beeplaying.com/xmWap/#/"
      },
      /** 获取活动信息 **/
      async _getInfo() {
        let {code, data, message} = await activityInfo()
        if (code == 200) {
          this.actInfo = data
          this.boxList = data.stepList
          this.getList()
          this.discountArr = this.actInfo.couponList
          if (data.popup) {
            this.showPop(4)
          }
        }
      },
      init() {
        this._getInfo()
      },
      async gotoreceive(item, index) {
        if (this.tabIndex == 0) {
          if (!item.received) {
            GLOBALS.marchSetsPoint('A_H5PT0280003350',{
              awards_id:item.awardsId,
              awards_name:item.awardsName
            })
            this.showLoading=true
            //领取优惠券
            let {code, message} = await getCoupon(item.awardsId)
            if (code == 200) {
              this.$toast.show({
                message: '领取成功'
              })
              this.discountArr[index].received = true
              this.showLoading=false
            } else {
              this.$toast.show({
                message: message
              })
              this.showLoading=false
            }
          }
        } else {
          if (item.status == 1) {
            GLOBALS.marchSetsPoint('A_H5PT0280003351',{
              awards_id:item.step,
              awards_name:item.awardsName
            })
            this.showLoading=true
            let {code, data, message} = await getAwards(item.step)
            if (code == 200) {
              this.prizeInfoList = {
                list: data.awardsList,
                receive: data.receive
              }
              this.showPop(3)
              this.list[index].status=2
              this.showLoading=false
            } else {
              this.$toast.show({
                message: message
              })
              this.showLoading=false
            }
          }
        }
      }
    },
    mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0280', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      this.init()
    }
  }
</script>
<style scoped lang="less">
  @import '../../common/css/base.css';

  * {
    box-sizing: border-box;
  }

  .h5act {
    min-height: 100vh;
    background: #F8B368;
    .h5act-container {
      width: 100%;
      height: 9.26rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: relative;
      padding: 1.97rem 0 0;
      box-sizing: border-box;
      .back, .rule {
        width: .41rem;
        height: .67rem;
        background: rgba(177, 41, 5, 1);
        border-radius: 0 .1rem .1rem 0;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(255, 252, 213, 1);
        position: absolute;
        left: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        line-height: .24rem;
        text-align: center;
        &.back {
          top: .13rem
        }
        &.rule {
          top: .96rem
        }
      }
      .myprize {
        width: .44rem;
        height: 1.17rem;
        background: rgba(177, 41, 5, 1);
        border-radius: .1rem 0 0 .1rem;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(255, 252, 213, 1);
        position: absolute;
        top: .13rem;
        right: 0rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        line-height: .24rem;
        text-align: center;
      }
      .tabs {
        display: flex;
        justify-content: center;
        margin-bottom: .44rem;
        .item {
          width: 1.91rem;
          height: .73rem;
          background: url("./images/tab.png");
          background-size: 100% 100%;
          font-size: .3rem;
          font-weight: bold;
          color: rgba(229, 47, 35, 1);
          text-align: center;
          line-height: .7rem;
          &.selected {
            color: rgba(252, 227, 143, 1);
            background: url("./images/tab-active.png");
            background-size: 100% 100%;
          }
          &:nth-child(1) {
            margin-right: .17rem;
          }
        }
      }
      .box_list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 .64rem .15rem;
        box-sizing: border-box;
        background: #F8B368;
        .item {
          width: 1.15rem;
          height: 1.13rem;
          .box_container {
            height: 100%;
            position: relative;
            .box {
              position: absolute;
              left: 0;
              right: 0;
              bottom: .6rem;
              margin: auto;
              width: .98rem;
              height: .96rem;
              background: url("./images/boxopen0.png");
              background-size: 100% 100%;
              &:not(.opened).animation {
                animation: huxi 3s infinite ease-in-out;
              }
              &.opened {
                width: .96rem;
                height: 1.2rem;
                background: url("./images/boxopen1.png");
                background-size: 100% 100%;
              }
              .tips {
                width: 1.48rem;
                height: .74rem;
                padding-bottom: .1rem;
                box-sizing: border-box;
                background: url("./images/tips.png");
                background-size: 100% 100%;
                position: absolute;
                top: -.6rem;
                left: -.25rem;
                margin: auto;
                font-size: .2rem;
                font-weight: bold;
                color: rgba(255, 101, 82, 1);
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
            .paynum {
              width: 100%;
              font-size: .18rem;
              font-weight: bold;
              color: rgba(243, 226, 200, 1);
              position: absolute;
              bottom: .46rem;
              text-align: center;
            }
            .btn {
              width: 1.13rem;
              height: .48rem;
              background: url("./images/gotoreceive.png");
              background-size: 100% 100%;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
              &.received {
                background: url("./images/received.png");
                background-size: 100% 100%;
              }
            }
          }
        }
      }
      .discountList {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #F8B368;
        .item {
          width: 6.23rem;
          height: 1.95rem;
          background: url("./images/prize/prizebg.png");
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 .2rem 0 .42rem;
          box-sizing: border-box;
          .dicount {
            /*width: .5rem;*/
            font-size: .36rem;
            font-weight: bold;
            color: rgba(196, 112, 25, 1);
            margin-right: .3rem;
            transform: rotate(-90deg);
          }
          .dicount_info {
            .content {
              font-size: .44rem;
              font-weight: bold;
              color: rgba(245, 87, 78, 1);
            }
            .tip {
              margin-top: .15rem;
              font-size: .2rem;
              font-weight: 400;
              color: rgba(186, 146, 58, 1);
            }
          }
          .btn {
            width: 1.5rem;
            height: .74rem;
            line-height: .74rem;
            text-align: center;
            font-size: .26rem;
            font-weight: 400;
            color: rgba(253, 216, 132, 1);
            background: url("./images/prize/gotoreceive.png");
            background-size: 100% 100%;
            &.received {
              color:rgba(242,232,200,1);
              background: url("./images/prize/received.png");
              background-size: 100% 100%;
            }
          }
        }
      }
      .info {
        padding: .2rem;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(228, 106, 51, 1);
        line-height: .36rem;
        background: rgba(253, 204, 133, 1);
      }
    }
  }

  @keyframes huxi {
    0% {
      transform: scale(0.9);
    }
    10% {
      transform: scale(1);
    }
    20% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1);
    }
    40% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1);
    }
    80% {
      transform: scale(0.9);
    }
    90% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.9);
    }
  }
</style>
