<template>
  <div class="get-hammer">
    <template v-if="taskProgressInfoData">
      <template
        v-for="(itemtitle,indextitle) in $moduleConfig.viruskill.dropDown.inner.info.titles">
        <h4 class="s-title"><em></em>{{itemtitle}}</h4>
        <template v-if="indextitle==0">
          <div class="task_container" v-for="(item,index) in taskProgressInfoData.taskProgress">
            <div class="item">
              <p v-if="index==0">每天完成{{item.totalNum}}个每日任务给1个号码</p>
              <p v-else-if="index==1">累计充值{{item.totalNum}}元给1个号码</p>
            </div>
            <div class="item">
              <div class="btn btn_complete" v-if="item.state==0" @click="gotocomplete(item,index)">
                去完成</div>
              <div class="btn btn-receive" v-else-if="item.state==1" @click="gain(item,index)">领取
              </div>
              <div class="btn btn-gained" v-else>已完成</div>
              <div class="btn_progress">
                {{item.finishNum>item.totalNum?item.totalNum:item.finishNum}}/{{item.totalNum}}
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="indextitle==1">
          <span class="info">{{$moduleConfig.viruskill.dropDown.inner.info.sideTitle}}</span>
          <div class="g-package"
            :style="{background:$moduleConfig.viruskill.dropDown.inner.tabs.btnDefaultStyle.background}">
            <div class="g-package-container g2">
              <hit-percent :gameBetting="taskProgressInfoData.gameProgress.gameBetting"
                :hbItems="taskProgressInfoData.gameProgress.progressList" :countTime="countTime"
                @refresh="refresh" @showPop="showPop"></hit-percent>
            </div>
            <div class="g-package-info">
              <ul class="li0">
                <li>
                  <span>已支持金叶：{{taskProgressInfoData.gameProgress.gameBetting | filterPrice}}</span>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="g-package"
            :style="{background:$moduleConfig.viruskill.dropDown.inner.tabs.btnDefaultStyle.background}">
            <div class="g-package-container g1">
              <ul>
                <li v-for="(item,index) in leaguePacksListArr" @click="gotopay(item)"
                  :style="{background:$moduleConfig.viruskill.dropDown.inner.packageBlockBg}">
                  <img :src="$moduleConfig.viruskill.dropDown.inner.packageImgs[index]" alt="">
                  <div class="item-text"
                    :style="{color:$moduleConfig.viruskill.dropDown.inner.packageBlockTextColor}">
                    {{item.content.split('+')[0]}}<br /> <span class="content"
                      :style="{color:$moduleConfig.viruskill.dropDown.inner.packageBlockBtnBg}"><em
                        :style="{background:$moduleConfig.viruskill.dropDown.inner.packageBlockBtnBg}">赠</em>{{item.content.split('+')[1]}}</span>
                  </div>
                  <a href="javascript:" class="btn-price"
                    :style="{background:$moduleConfig.viruskill.dropDown.inner.packageBlockBtnBg}">￥{{item.price}}</a>
                </li>
              </ul>
            </div>
            <div class="g-package-info">
              <ul class="li0">
                <li>已购买礼包：{{taskProgressInfoData.buyTime}}次</li>
                <!--<li><div class="line" :style="{background:$moduleConfig.viruskill.dropDown.inner.tabs.btnDefaultStyle.color}"></div>获得幸运币：{{taskProgressInfoData.buyProgress.returnNum}}个</li>-->
              </ul>
            </div>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>
<script type="text/javascript">
import { showLeaguePacksList, taskProgressInfo, taskReceive } from '../../utils/api'

export default {
  data () {
    return {
      leaguePacksListArr: [],
      pUserInfo: {},
      taskProgressInfoData: null,
      popType: 0,
      awardData: null
    }
  },
  props: {
    countTime: {
      type: Number,
      default: 0
    }
  },
  components: {
    hitPercent: () => import('./component/hitPercent/hitPercent.vue')
  },
  mounted () {
    this.taskProgressInfo()
    this.getShowLeaguePacksList()
  },
  methods: {
    gotopay (item) {
      localStorage.setItem('originDeffer', window.location.href)
      GLOBALS.marchSetsPoint('A_H5PT0248002914', {
        recharge_rmb: item.price,
        product_id: item.bizId,
        awards_name: item.name,
        product_name: item.name
      })   // 点击任意礼包
      localStorage.setItem('JDD_PARAM', JSON.stringify(item))
      localStorage.setItem('payment', JSON.stringify(item))
      location.href =
        'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
    },
    async getShowLeaguePacksList () {
      const { code, data } = await showLeaguePacksList()
      if (code === 200) {
        this.leaguePacksListArr = data.leaguePacksList
      }
    },
    async taskProgressInfo () {
      const { code, data } = await taskProgressInfo()
      if (code === 200) {
        this.taskProgressInfoData = data
      }
    },
    gotocomplete (item, index) {
      GLOBALS.marchSetsPoint('A_H5PT0248002910', {
        task_id: index + 1,
        task_name: index == 0 ? `每天完成${item.totalNum}个每日任务给1个号码` : `累计充值${item.totalNum}元给1个号码`
      })   // H5平台-元宵活动-获取幸运币-每日任务去完成点击
      if (index == 0) {
        if (window.linkUrl.getBackUrlFlag(localStorage.getItem('APP_CHANNEL')) == 'xmWap') {
          location.href = 'https://wap.beeplaying.com/xmWap/#/task'
        } else {
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', '', true, '#/taskview')
        }
      } else {
        location.href = 'https://wap.beeplaying.com/xmWap/#/payment'
      }
    },
    async gain (item, index) {
      GLOBALS.marchSetsPoint('A_H5PT0248002911', {
        task_id: index + 1,
        task_name: index == 0 ? `每天完成${item.totalNum}个每日任务给1个号码` : `累计充值${item.totalNum}元给1个号码`
      })   // 每日任务奖励领取点击
      const { code, data } = await taskReceive({ sort: index + 1 })
      if (code === 200) {
        this.refresh(data)
      }
    },
    refresh (data) {
      this.taskProgressInfo()
      this.$emit('refresh', data)
    },
    showPop (data) {
      this.$emit('showPop', data)
    }
  }
}
</script>
<style lang="less" scoped>
.get-hammer {
  padding: 1.24rem 0.38rem 0;
  height: calc(100%);
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  .s-title {
    font-size: 0.24rem;
    font-weight: bold;
    color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 0.12rem;
    em {
      display: inline-block;
      width: 0.12rem;
      height: 0.12rem;
      background: #fff;
      border-radius: 50%;
      margin-right: 0.05rem;
    }
  }
  .info {
    font-size: 0.2rem;
    font-weight: 400;
    color: #fff;
    padding-left: 0.17rem;
    line-height: 0.28rem;
  }
}

.g-package {
  width: 100%;
  background: #73380c;
  margin-bottom: 0.2rem;
  border-radius: 0.15rem;
  .g-package-container {
    background: #fff;
    margin-top: 0.19rem;
    border-radius: 0.15rem 0.15rem 0 0;
    &.g1 {
      height: 2.94rem;
    }
    &.g2 {
      height: 2.24rem;
    }
    ul {
      display: flex;
      justify-content: center;
      padding-top: 0.21rem;
      justify-content: center;
    }
    li {
      width: 1.79rem;
      height: 2.48rem;
      text-align: center;
      position: relative;
      background: rgba(234, 181, 155, 1);
      border-radius: 0.1rem;
      margin-left: 0.26rem;
      padding-top: 0.1rem;
      box-sizing: border-box;
      &:nth-child(1) {
        margin-left: 0;
      }
      img {
        width: 1.28rem;
        height: 1.26rem;
      }
    }
    .item-text {
      font-size: 0.2rem;
      color: #9a5619;
      line-height: 0.26rem;
      position: relative;
      font-weight: 500;
      .content {
        font-weight: bold;
        em {
          display: inline-block;
          font-size: 0.18rem;
          width: 0.24rem;
          height: 0.24rem;
          line-height: 0.24rem;
          text-align: center;
          border-radius: 50%;
          color: #fff;
        }
      }
    }
    .btn-price {
      display: block;
      width: 0.96rem;
      height: 0.39rem;
      line-height: 0.39rem;
      background: #e74615;
      border-radius: 0.2rem;
      font-size: 0.24rem;
      color: #ecf4ff;
      font-weight: bold;
      text-align: center;
      position: absolute;
      bottom: 0.1rem;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}

.g-package-info {
  ul {
    display: flex;
    align-items: center;
    height: 0.52rem;
    text-align: left;
    li {
      height: 0.52rem;
      line-height: 0.52rem;
      position: relative;
      font-size: 0.24rem;
      font-weight: bold;
      text-indent: 0.27rem;
      color: #fff;
      .line {
        width: 1px;
        height: 0.33rem;
        position: absolute;
        left: 0;
        top: 0.1rem;
      }
    }
    &.li0 {
      justify-content: center;
    }
    &:not(.li0) {
      li {
        flex: 1;
      }
    }
  }
}

.task_container {
  height: 1.06rem;
  background: #fff;
  box-shadow: 0px 5px 9px 0px rgba(79, 33, 26, 0.13);
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.32rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  .item {
    font-size: 0.3rem;
    p {
      font-weight: bold;
      color: #666;
      i {
        margin-top: 0.13rem;
        font-size: 0.2rem;
        color: #f2374a;
        display: block;
      }
    }
    .btn {
      font-size: 0.24rem;
      width: 1rem;
      height: 0.46rem;
      line-height: 0.46rem;
      text-align: center;
      border-radius: 0.23rem;
      color: rgba(255, 255, 255, 1);
      font-weight: bold;
      &.btn_complete {
        background: #f89f2c;
      }
      &.btn-receive {
        background: #ff4330;
      }
      &.btn-gained {
        background: #979797;
      }
    }
    .btn_progress {
      margin-top: 0.1rem;
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      text-align: center;
    }
  }
}
</style>
