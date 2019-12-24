<template>
  <div class="game">
    <div class="game_img">
      <horn :horn-list="hornList"></horn>
      <div class="light" :class="{lightopen:showLight}"></div>
      <!--<div class="mask"><img src="../images/mask.png"></div>-->
      <div class="luckdraw">
        <ul>
          <li v-for="(i,key) in 5" :style="{top:awardTop[key]}" :ref="'luck'+key" :key="key"
              :class="'luckdraw'+key">
            <div v-for="i in 5">
              <div class="box" v-for="item in lotteryawardlist">
                <div>
                  <div class="box-pic">
                    <img :src="item.lotteryAwardImage|filter">
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="already">
        <div class="already_text">已消耗游戏币</div>
        <div class="line1"></div>
        <div class="num1">{{myInfo&&myInfo.useNum|filterPrice}}</div>
      </div>
      <div class="now">
        <div class="now_text">可用游戏币</div>
        <div class="line2"></div>
        <div class="num2">{{myInfo&&myInfo.remanentNum|filterPrice}}</div>
      </div>
      <div class="click" @click="gotowave">
        <img src="../images/click.png" alt/>
      </div>
      <div class="prize_information">奖励说明</div>
      <div class="prize_consume">
        <div class="pop" v-show="show">
          <div class="pop_inner">
            <div class="pop_inner1">
              <div v-for="(item,key) in actInfo.stageList.slice().reverse()" :key="key" @click="selectStage(item)">
                <img :src="imgsrc"><span>消耗{{item.consumeNum}}个游戏币</span>
              </div>
            </div>

          </div>
        </div>
        <div class="prize_consume_bg">
          <img src="../images/gamecoin.png" alt/>

          <div class="text">消耗{{actInfo.stageList[currentIndex].consumeNum}}个游戏币</div>
          <img src="../images/upward.png" @click="up"/>
        </div>
      </div>
      <div class="info">单次消耗游戏币越多,越容易中大奖哟</div>
    </div>
    <loading v-show="showLoading" :showBar="showBar"></loading>
  </div>
</template>
<script>
  import Services from '../services/services'

  export default {
    data() {
      return {
        showBar:true,
        showLoading: false,
        show: false,
        imgsrc: require(`../images/pop-gamecoin.png`),
        showLight: false,
        currentIndex: 0,
        awardTop: [],
        resArr: [1, 2, 3, 4, 5],
        awardData:null,
        lotteryawardlist: [{
          lotteryAwardImage: '/group1/M00/0C/22/CmcEHVu9a56AckjBAAAi1ETP_qI265.png',
          lotteryAwardName: '捕鱼',
          configId: 1
        }, {
          lotteryAwardImage: '/group1/M00/0C/23/CmcEHVu9c6aAalG_AAAiU--VNUY849.png',
          lotteryAwardName: '糖果',
          configId: 2
        }, {
          lotteryAwardImage: '/group1/M00/12/EF/CmcEHFvirn2AY6y6AAAeJwt7x-0418.png',
          lotteryAwardName: '桌球',
          configId: 3
        }, {
          lotteryAwardImage: '/group1/M00/0C/22/CmcEHVu9a7KAJhpWAAApTUp_MLY817.png',
          lotteryAwardName: '三国',
          configId: 4
        }, {
          lotteryAwardImage: '/group1/M00/12/91/CmcEHVv3pyqAEdoGAAC0zRpZ3KE738.png',
          lotteryAwardName: '赏金',
          configId: 5
        }],
        num: 1
      };
    },
    props: {
      myInfo: {
        type: Object,
        default: () => null
      },
      actInfo: {
        type: Object,
        default: () => null
      },
      hornList: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      getClassName(name) {
        return name
      },
      up() {
        if (this.show == false) {
          this.show = true;
        } else {
          this.show = false;
        }
      },
      gotowave() {
        this.showLoading = true
        let item = this.actInfo.stageList[this.currentIndex]
        let selectVal = item.consumeNum
        GLOBALS.marchSetsPoint('A_H5PT0229002659', {task_id: item.awardsLevel}) //H5平台-双旦活动页-摇一摇按钮点击
        let maxItems = this.actInfo.stageList.filter(item => item.consumeNum < this.myInfo.remanentNum && item.consumeNum > selectVal)
        if (this.myInfo.remanentNum < selectVal) {
          GLOBALS.marchSetsPoint('A_H5PT0229002661') //H5平台-双旦活动页-摇一摇点击后游戏币不足弹窗加载完成
          this.$emit('gotowave', {item: item, popType: 3, wavePrizeInfoType: 0})
          this.showLoading = false
        } else if (maxItems.length > 0) {//拥有的游戏币可支持比当前选中的更高的档位
          GLOBALS.marchSetsPoint('A_H5PT0229002665') //H5平台-双旦活动页-摇一摇点击后游戏币充足提示弹窗加载完成
          this.$emit('gotowave', {
            item: item,
            popType: 3,
            wavePrizeInfoType: 1,
            maxCanSelectLimit: maxItems.sort()[maxItems.length - 1]
          })
          this.showLoading = false
        } else {
          this.gotowavedirect()
        }
      },
      async gotowavedirect() {
        this.showLoading = true
        let self = this
        let {consumeNum, awardsLevel} = this.actInfo.stageList[this.currentIndex]
        if (this.myInfo.remanentNum < consumeNum) {
          GLOBALS.marchSetsPoint('A_H5PT0229002661') //H5平台-双旦活动页-摇一摇点击后游戏币不足弹窗加载完成
          this.$emit('gotowave', {item: self.actInfo.stageList[self.currentIndex], popType: 3, wavePrizeInfoType: 0})
          this.showLoading = false
        } else {
          this.showLoading = true
          try {
            let {code, data, message} = (await Services.runAnimation(awardsLevel)).data
            if (code == 200) {
              this.showBar=false
              this.awardData=data
              // if (data.iconArray.filter(item => this.resArr.includes(item)).length > 1) {
                this.num = this.num == 1 ? 2 : 1
              // }
              this.resArr = data.iconArray
              let arr = []
              data.iconArray.map((item, index) => {
                arr.push(-(this.lotteryawardlist.length * 2 * this.num * 1.73 + (this.resArr[index] - 1) * 1.73) + 'rem')
                if (arr.length == this.resArr.length) {
                  this.awardTop = arr
                  this.showLight = true
                }
              })
              this.$refs.luck4[0].addEventListener("webkitTransitionEnd", function () {
                if (!self.showBar) {
                  GLOBALS.marchSetsPoint('A_H5PT0229002663')//H5平台-双旦活动页-摇一摇点击后中奖弹窗加载完成
                  self.showLight = false
                  self.$emit('gotowave', {
                    item: self.actInfo.stageList[self.currentIndex],
                    popType: 3,
                    wavePrizeInfoType: 2,
                    awardData: {
                      awardType: self.awardData.awardsType,
                      awardName: self.awardData.awardsName,
                      levelName: self.getLevelName(self.awardData.showLevel),
                      icons: self.awardData.iconArray
                    }
                  })
                  self.showLoading = false
                  self.showBar=true
                }
              })
            } else {
              this.showLoading = false
              this.$toast.show({
                message: message,
                duration: 2000
              })
            }
          } catch (e) {
            this.showLoading = false
          }
        }
      },
      selectStage(item) {
        this.currentIndex = item.awardsLevel - 1;
        GLOBALS.marchSetsPoint('A_H5PT0229002660', {task_id: this.currentIndex}) //H5平台-双旦活动页-消耗游戏币选择按钮点击
        this.up()
      },
      getLevelName(showLevel) {
        switch (showLevel) {
          case 1:
            return '参与奖';
            break;
          case 2:
            return '三等奖';
            break;
          case 3:
            return '二等奖';
            break;
          case 4:
            return '一等奖';
            break;
          case 5:
            return '特等奖';
            break;
        }
      },
    },
    components: {
      horn: () => import('./horn'),
      loading: () => import('../../../components/common/loading'),
    },
    mounted() {
      let arr = []
      this.resArr.map((item, index) => {
        arr.push(-(this.lotteryawardlist.length * 2 * 1.73 + (this.resArr[index] - 1) * 1.73) + 'rem')
        if (arr.length == this.resArr.length) {
          this.awardTop = arr
        }
      })
    }
  };
</script>
<style lang="less" scoped>
  .game {
    position: absolute;
    top: 2.21rem;
    left: 0.1rem;
  }

  .game_img {
    width: 7.09rem;
    height: 6.4rem;
    background: url("../images/game.png");
    background-size: 100% 100%;
  }

  .prize_information {
    position: absolute;
    left: 3rem;
    top: 5.69rem;
    color: #dd6300;
    // width:1.17rem;
    height: 0.29rem;
    font-size: 0.3rem;
    font-family: PingFang SC;
    font-weight: 800;
    color: rgba(221, 99, 0, 1);
    line-height: 0.32rem;
  }

  .click {
    position: absolute;
    top: 4.58rem;
    right: 0.86rem;
  }

  .click img {
    width: 2.38rem;
    height: 0.83rem;
  }

  .prize_consume {
    position: absolute;
    width: 2.9rem;
    height: 0.54rem;
    top: 4.69rem;
    left: 0.55rem;
  }

  .prize_consume_bg {
    width: 2.9rem;
    height: 0.54rem;
    background: url("../images/consume.png");
    background-size: 100% 100%;
  }

  .prize_consume_bg img:first-child {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    top: 0.07rem;
    left: 0.07rem;
  }

  .prize_consume_bg img:last-child {
    width: 0.48rem;
    height: 0.48rem;
    position: absolute;
    top: 0.02rem;
    // bottom: 0.03rem;
    left: 2.4rem;
  }

  .info {
    position: absolute;
    top: 5.3rem;
    left: 0.31rem;
    // width: 3.39rem;
    height: 0.21rem;
    font-size: 0.2rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 126, 0, 1);
    line-height: 0.14rem;
  }

  .text {
    position: absolute;
    left: 0.57rem;
    top: 0.17rem;
    display: flex;
    align-items: center;
    // width:1.69rem;
    height: 0.22rem;
    font-size: 0.22rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 0.14rem;
  }

  .already {
    width: 2.72rem;
    height: 0.34rem;
    background: rgba(221, 99, 0, 1);
    border: 1px solid rgba(255, 229, 8, 1);
    box-shadow: 0rem 0rem 0.05rem 0rem rgba(221, 99, 0, 0.99);
    border-radius: 0.17rem;
    position: absolute;
    top: 4.15rem;
    left: 0.67rem;
  }

  .already_text {
    height: 100%;
    font-size: 0.22rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 233, 130, 1);
    position: absolute;
    left: 0.1rem;
    line-height: 0.36rem;
  }

  .line1 {
    position: absolute;
    left: 1.5rem;
    width: 1px;
    height: 0.34rem;
    background: rgba(247, 179, 77, 1);
    border-radius: 0.17rem;
  }

  .num1 {
    width: 1.2rem;
    height: 100%;
    font-size: 0.22rem;
    font-weight: bold;
    color: #ffe982;
    line-height: 0.34rem;
    position: absolute;
    left: 1.5rem;
    text-align: center;
    line-height: .36rem;
  }

  .now {
    position: absolute;
    top: 4.15rem;
    left: 3.65rem;
    width: 2.72rem;
    height: 0.34rem;
    background: rgba(242, 55, 74, 1);
    border: 0.01rem solid rgba(255, 228, 8, 1);
    box-shadow: 0px 0px 0.05rem 0px rgba(242, 55, 74, 0.99);
    border-radius: 0.17rem;
  }

  .now_text {
    height: 100%;
    font-size: 0.22rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 252, 175, 1);
    line-height: 0.36rem;
    position: absolute;
    left: 0.1rem;
  }

  .line2 {
    width: 1px;
    height: 0.34rem;
    background: rgba(248, 108, 112, 1);
    border-radius: 0.17rem;
    position: absolute;
    left: 1.25rem;
  }

  .num2 {
    width: 1.45rem;
    height: 100%;
    font-size: 0.22rem;
    font-weight: bold;
    color: #fffcaf;
    line-height: 0.34rem;
    position: absolute;
    left: 1.25rem;
    line-height: .36rem;
    text-align: center;
  }

  .light {
    width: 5.72rem;
    height: 2.58rem;
    position: absolute;
    top: 1.37rem;
    left: 50%;
    transform: translateX(-50%);
    background: url('../images/light1.png') no-repeat center center / 100% 100%;
    &.lightopen {
      animation: changeBg 1s infinite ease;
    }
  }

  .light img {
    width: 5.72rem;
    height: 2.58rem;
  }

  /*.mask {*/
  /*position: absolute;*/
  /*top: 1.78rem;*/
  /*left: 50%;*/
  /*transform: translateX(-50%);*/
  /*}*/
  .luckdraw {
    width: 5.85rem;
    height: 1.75rem;
    background: url(../images/mask.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    top: 1.78rem;
    left: 50%;
    transform: translateX(-50%);
    .box {
      font-size: 0.2rem;
      color: #5c193a;
    }
    .box-pic img {
      width: 0.74rem;
    }
    ul {
      height: 1.73rem;
      overflow: hidden;
    }
    li {
      width: 1.2rem;
      height: 1.73rem;
      float: left;
      font-size: 0.24rem;
      color: #001551;
      text-align: center;
      position: relative;
      top: -2.5rem;
      transition: all 3s;
      -webkit-transition: all 3s;
      &.luckdraw0 {
        width: 1.1rem;
      }
      &.luckdraw1 {
        transition-delay: 0.1s;
      }
      &.luckdraw2 {
        transition-delay: 0.2s;
      }
      &.luckdraw3 {
        transition-delay: 0.3s;
      }
      &.luckdraw4 {
        transition-delay: 0.4s;
        width: 1.1rem;
      }
      .box {
        width: 100%;
        height: 1.73rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }

  .mask img {
    width: 5.85rem;
    height: 1.73rem;
  }

  .pop {
    background: url("../images/pop.png");
    background-size: 100% 100%;
    width: 2.71rem;
    height: 3.01rem;
    position: absolute;
    top: -2.97rem;
    left: 0.12rem;
    z-index: 1;
  }

  .pop_inner {
    width: 2.3rem;
    height: 2.5rem;
    align-items: center;
    // display: flex;
    align-items: center;
    position: absolute;
    top: 0.15rem;

    margin: 0 auto;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
  }

  .pop_inner1 {
    // height: 0.24rem;
    width: 100% !important;

    font-size: 0.22rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    // line-height:14px;
  }

  .pop_inner1 div {
    border-bottom: 1px solid #FA7481;
    padding-top: 0.12rem;
    padding-bottom: 0.1rem;
    height: 0.4rem;

    display: flex;
    align-items: center;
  }

  .pop_inner1 img {
    width: 0.24rem;
    height: 0.24rem;
    position: absolute;
    left: 0.1rem;
  }

  .pop_inner span {
    position: absolute;
    white-space: nowrap;
    /* width: 0.24rem; */
    height: 0.24rem;
    left: 0.45rem;
  }

  .pop_inner1 div:last-child {
    border-bottom: 0px;
  }

  @keyframes changeBg {
    0% {
      background: url('../images/light1.png') no-repeat center center / 100%
      100%;
    }

    100% {
      background: url('../images/light2.png') no-repeat center center / 100%
      100%;
    }
  }
</style>
