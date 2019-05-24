<template>
  <div class="sdk-tab-box">
    <ul class="tabs">
      <li class="tab_item" :class="{'actived':isActived === item.name}" v-for="(item,index) in tabList" :key="index" @click="changeTab(item)"><img :src="require('../images/'+item.name+(isActived === item.name?'_actived':'')+'.png')" alt="">{{item.label}}</li>
      <div class="red" v-if="unreadQuantity">{{unreadQuantity}}</div>
    </ul>
    <template v-if="isActived === 'tasks'">
      <h4 class="crush-master-task">成就任务</h4>
      <slot>
      </slot>
    </template>
    <template v-else>
      <ul class="activities" v-if="activitiesList.length>0">
        <li class="activity-item" v-for="(item,index) in activitiesList" :key="index" @click="openPop(item,index)">
          <div class="img-container" v-html="item.description"></div>
          <div class="red" v-if="!item.hasRead"></div>
        </li>
      </ul>
      <div class="noting" v-else>
        <img src="../images/noting.png" alt="">
        <span>活动敬请期待</span>
      </div>
    </template>
    <div class="mask" v-if="confirm"></div>
    <transition name="fade">
      <div class="confirm" v-if="confirm">
        <div class="title">
          温馨提示
          <div class="closed" @click="hideConfirm"></div>
        </div>
        <div class="content">
          即将离开当前游戏<br>
          是否前往参与活动?
        </div>
        <div class="btn">
          <div class="cancel-btn" @click="hideConfirm(1)">
            取消
          </div>
          <div class="confirm-btn" @click="jump">
            确定
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'recommend',
  props: {
    currentGameType: {
      default: 0
    }
  },
  data () {
    return {
      isActived: 'tasks',
      // isActived: 'activities',
      tabList: [{ label: '任务', name: 'tasks', eventId: 'A_H5PT0061001229' }, { label: '活动', name: 'activities', eventId: 'A_H5PT0061001230' }],
      activitiesList: [],
      unreadQuantity: 0,
      confirm: false,
      selectedActivity: {}
    }
  },
  methods: {
    //切换tab
    changeTab (item) {
      this.isActived = item.name
      GLOBALS.marchSetsPoint(item.eventId, { project_id: this.currentGameType }) // H5平台-游戏内SDK-活动TAB点击
      if (item.name === 'activities') {
        let url = 'https://ops-api.beeplay123.com/ops/api/sdk/operation/read'
        let self = this
        this.axios.post(url).then(response => {
          let res = response.data
          if (res.code === 200) {
            this.getDetail()
          }
        })
      }
    },
    getDetail () {
      let url = 'https://ops-api.beeplay123.com/ops/api/sdk/operation/details'
      this.axios.post(url).then(response => {
        let res = response.data && response.data.data
        if (res) {
          this.activitiesList = res.activities || []
          this.unreadQuantity = res.unreadQuantity || 0
        }
      })
    },
    openPop (item, index) {
      GLOBALS.marchSetsPoint('A_H5PT0061001231', {
        project_id: this.currentGameType,
        position_id: index + 1,
        task_id: item.id,
        task_name: item.name,
      }) // H5平台-游戏内SDK-活动TAB-广告点击
      this.selectedActivity = item
      this.confirm = true
    },
    hideConfirm (val) {
      if (val) {
        GLOBALS.marchSetsPoint('A_H5PT0061001233', { project_id: this.currentGameType }) // H5平台-游戏内SDK-活动TAB-广告点击-离开弹窗取消
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0061001234', { project_id: this.currentGameType }) // H5平台-游戏内SDK-活动TAB-广告点击-离开弹窗关闭
      }
      this.selectedActivity = {}
      this.confirm = false
    },
    jump () {
      GLOBALS.marchSetsPoint('A_H5PT0061001232', { project_id: this.currentGameType }) // H5平台-游戏内SDK-活动TAB-广告点击-离开弹窗确定
      this.confirm = false
      let linkUrl = this.selectedActivity.linkUrl
      if (linkUrl.startsWith('/') || linkUrl.includes('external=1')) {
        this.jumpToGame({ url: linkUrl })
      }
    },
    jumpToGame (item) {
      let token = localStorage.getItem('OPEN_ACCESS_TOKEN')
      let channel = localStorage.getItem('APP_CHANNEL')
      if (item && item.url.indexOf('external=1') != -1) {
        if (item.url.includes('?external=1')) {
          let url =
            this.trimStr(item.url) +
            '&channel=' +
            channel +
            '&token=' +
            token +
            '&gurl=' +
            item.url.split('?')[0] +
            '&pf=' + window.linkUrl.getBackUrlFlag(channel)
          parent.location.href = url
        } else {
          let url =
            this.trimStr(item.url) +
            '&channel=' +
            channel +
            '&token=' +
            token +
            '&gurl=' +
            base64url.encode(item.url.replace('?external=1', '').replace('&external=1', '')) +
            '&pf=' + window.linkUrl.getBackUrlFlag(channel)
          parent.location.href = url
        }
        return
      }
      if (item && item.url.indexOf('databiger-h5') != -1) {
        let url =
          this.trimStr(item.url) +
          '?channel=' +
          channel +
          '&token=' +
          localStorage.getItem('ACCESS_TOKEN')
        parent.location.href = url
        return
      }
      parent.location.href =
        item.url +
        '?channel=' +
        channel
    }
  },
  computed: {
  },
  created () {
    this.getDetail()
  }
}
</script>

<style scoped lang="less">
.sdk-tab-box {
  padding: 0.3rem 0.3rem 0;
  .tabs {
    position: relative;
    margin: 0 0.68rem;
    height: 0.6rem;
    line-height: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.02rem solid #1e2e4c;
    border-radius: 0.08rem;
    overflow: hidden;
    margin-bottom: 0.3rem;
    color: #8b8b8c;
    .tab_item {
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 0.23rem;
        // vertical-align: middle;
        margin-right: 0.06rem;
      }
      &.actived {
        background-color: #141f33;
        color: #efc35c;
      }
    }
    .red {
      position: absolute;
      top: 0.1rem;
      right: 0.3rem;
      background-image: url(../images/top-red-bg.png);
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      font-size: 0.16rem;
      font-weight: bold;
      color: #fff;
      width: 0.26rem;
      height: 0.18rem;
      line-height: 0.18rem;
      text-align: center;
    }
  }
  .activities {
    .activity-item {
      position: relative;
      margin-bottom: 0.24rem;
      .img-container {
        background-color: #1b2538;
        height: 1.48rem;
        overflow: hidden;
        border-radius: 0.1rem;
      }
      .red {
        position: absolute;
        right: -0.1rem;
        top: 0;
        width: 0.18rem;
        height: 0.18rem;
        background-color: #f92a0f;
        border-radius: 50%;
        z-index: 1;
      }
    }
  }
  .noting {
    text-align: center;
    margin-top: 1.5rem;
    img {
      width: 2.76rem;
      height: 1.96rem;
    }
    span {
      margin-top: 0.18rem;
      display: flex;
      color: #2f435b;
      font-size: 0.2rem;
      font-weight: 500;
      align-items: center;
      justify-content: center;
      &::before {
        content: "";
        display: block;
        width: 0.38rem;
        height: 0.02rem;
        background-color: #2a3d53;
      }
      &::after {
        content: "";
        display: block;
        width: 0.38rem;
        height: 0.02rem;
        background-color: #2a3d53;
      }
    }
  }
  .crush-master-task {
    margin: 0.3rem 0 0;
    font-size: 0.28rem;
  }
  .mask {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
  }
  .confirm {
    padding-bottom: 0.4rem;
    position: fixed;
    width: 80%;
    left: 10%;
    top: 3.5rem;
    z-index: 10;
    background: #0f1726;
    .title {
      position: relative;
      padding: 0.28rem;
      font-size: 0.22rem;
      text-align: center;
      background: #141f33;
      .closed {
        position: absolute;
        top: 0.3rem;
        right: 0.24rem;
        width: 0.2rem;
        height: 0.2rem;
        background: url("../images/closed.png") no-repeat center center / 100%
          100%;
      }
    }
    .content {
      padding: 0.44rem 0;
      font-size: 0.2rem;
      text-align: center;
      line-height: 0.3rem;
    }
    .btn {
      display: flex;
      justify-content: center;
      font-size: 0.18rem;
      .confirm-btn,
      .cancel-btn {
        margin: 0 0.2rem;
        width: 1.5rem;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        border-radius: 0.04rem;
      }
      .confirm-btn {
        background: #ef6f0c;
      }
      .cancel-btn {
        background: #2b3a55;
      }
    }
  }
}
.fade-enter-active {
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
</style>
