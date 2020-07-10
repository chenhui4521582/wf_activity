<template>
  <div class="log">
    <Header>
      <div class="log-title">
        我的钥匙 <span>(</span><span>5</span><img src="../../img/orange-key.png" alt=""> <span>)</span>
      </div>
    </Header>
    <div class="tab-bar">
      <div class="item" :class="{'active': currentIndex == 1}" @click="handclick(1)">
        获取记录 
        <span class="green">({{getNum}}</span>
        <img v-if="currentIndex == 1" src="../../img/green-key.png" alt="">
        <img v-else src="../../img/grey-key.png" alt="">
        <span class="green">) </span>
        <div class="line" v-if="currentIndex == 1"></div>
      </div>
      <div class="item" :class="{'active': currentIndex == 2}" @click="handclick(2)">
        消耗记录
        <span class="red">({{consumeNum}}</span>
        <img v-if="currentIndex == 2" src="../../img/red-key.png" alt="">
        <img v-else src="../../img/grey-key.png" alt="">
        <span class="red">) </span>
        <div class="line" v-if="currentIndex == 2"></div>
      </div>
    </div>
    <!-- 获取记录 -->
    <div class="get-list" v-show="currentIndex == 1">
      <div class="nav">
        <div class="item">获取时间</div>
        <div class="item">获取记录</div>
      </div>
      <div class="list-wrap" v-if="showGetList">
        <div class="list-item" v-for="(item, index) in getList" :key="index">
          <div class="item">{{item.createTime}}</div>
          <div class="item">
            <span>{{item.remark}}</span><span class="green">+{{item.num}}</span> <img src="../../img/green-key.png" alt="">
          </div>
        </div>
      </div>
      <div class="no-data" v-else>
        <img class="img1" src="../../img/no-data-1.png" alt="">
        <p>暂无获取记录，快去邀请好友吧！</p>
        <img class="img2" src="../../img/no-data-2.png" alt="">
      </div>
    </div>
    <!-- 消耗记录 -->
    <div class="consume-list" v-show="currentIndex == 2">
      <div class="nav">
        <div class="item">消耗时间</div>
        <div class="item">消耗事件</div>
        <div class="item">消耗数量</div>
      </div>
      <div class="list-wrap" v-if="showConsumeList">
        <div class="list-item" v-for="(item, index) in consumeList" :key="index">
          <div class="item">{{item.createTime}}</div>
          <div class="item">
            {{item.remark}}
          </div>
          <div class="item">
            {{item.num}}<img src="../../img/red-key.png" alt="">
          </div>
        </div>
      </div>
      <div class="no-data" v-else>
        <img class="img1" src="../../img/no-data-1.png" alt="">
        <p>暂无消耗记录</p>
      </div>
    </div>
    <!-- 获取更多钥匙按钮 -->
    <div class="getMoreKey" @click="openShare">
      获得更多钥匙
    </div>
    <!-- share弹出框 -->
    <Share v-model="showShare" :hfqNum="boxInfo.hfqNum"/>
  </div>
</template>
<script>
import Share from '../../components/share'
import Services from '../../services/services'
import _get from 'lodash.get'
export default {
  name: 'log',
  data: () => ({
    currentIndex: 1,
    consumeList: [],
    getList: [],
    showShare: false,
    boxInfo: {}
  }),
  components: {
    Share
  },
  computed: {
    showGetList () {
      return this.getList.length
    },
    showConsumeList () {
      return this.consumeList.length
    },
    getNum () {
      let num = 0
      this.getList.forEach(item => {
        num += item.num
      })
      return num
    },
    consumeNum () {
      let num = 0
      this.consumeList.forEach(item => {
        num += (-item.num)
      })
      return num
    }
  },
  methods: {
    handclick (index) {
      this.currentIndex = index
    },
    _getList () {
      Services.getMyKeyLog(1).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.getList = data
        }
      })
    },
    _consumeList () {
      Services.getMyKeyLog(2).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.consumeList = data
        }
      })
    },
    /** 打开分享弹框 **/
    openShare () {
      this.showShare = true
    },
    /** 获取活动信息 **/
    _getInfo () {
      Services.getInfo().then(res => {
        const {code, data} = _get(res, 'data')
        if(code == 200) {
          this.boxInfo = data
          this.boxAward = data.boxList
        }
      })
    },
  },
  mounted () {
    this._getInfo()
    this._getList()
    this._consumeList()
  }
}
</script>
<style lang="less" scoped>
.log {
  padding: .9rem .24rem;
  min-height: 100vh;
  background: #F7F7F7;
  .log-title {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: .4rem;
      height: .4rem;
    }
    span {
      color: #FF7800;
    }
  }
  .tab-bar {
    display: flex;
    justify-content: center;
    height: .7rem;
    .item {
      position: relative;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      font-size: .32rem;
      font-weight: bold;
      color: #888888;
      &.active {
        color: #000000;
        vertical-align: middle;
        .green {
          color: #44BC64;
        }
        .red {
          color: #FF4141;
        }
      }
      img {
        width: .3rem;
        height: .3rem;
      }
      .line {
        position: absolute;
        bottom: -.1rem;
        left: 1.15rem;
        width: .32rem;
        height: .06rem;
        background: #FF4141;
        border-radius: .03rem;
      }
    }
  }
  .get-list {
    overflow: hidden;
    position: fixed;
    left: .24rem;
    right: .24rem;
    bottom: 1.2rem;
    top: 1.9rem;
    z-index: 1;
    border-radius: .16rem;
    background: #FFFAD4;
    .nav {
      display: flex;
      justify-content: center;
      align-items: center;
      height: .5rem;
      font-size: .24rem;
      color: #000000;
      background: #FFFAD4;
      .item {
        text-align: center;
        &:nth-child(1){
          width: 2.2rem;
        }
        &:nth-child(2){
          width: 4.5rem;
        }
      }
    }
    .list-item {
      height: .9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &:nth-child(odd) {
        background: #FFFDEF;
      }
      &:nth-child(even) {
        background: #FFFFFF;
      }
      .item {
        text-align: center;
        &:nth-child(1) {
          width: 2.2rem;
        }
        &:nth-child(2) {
          width: 4.5rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .green {
          margin-left: .3rem;
          color: #44BC64;
        }
        img {
          width: .29rem;
          height: .29rem;
        }
      }
    }
  }
  .consume-list {
    overflow: hidden;
    position: fixed;
    left: .24rem;
    right: .24rem;
    bottom: 1.2rem;
    top: 1.9rem;
    z-index: 1;
    border-radius: .16rem;
    background: #FFFAD4;
    .nav {
      display: flex;
      justify-content: center;
      align-items: center;
      height: .5rem;
      font-size: .24rem;
      color: #000000;
      background: #FFFAD4;
      .item {
        text-align: center;
        &:nth-child(1){
          width: 30%;
        }
        &:nth-child(2){
          width: 50%;
        }
        &:nth-child(3){
          width: 20%;
        }
      }
    }
    .list-item {
      height: .9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &:nth-child(odd) {
        background: #FFFDEF;
      }
      &:nth-child(even) {
        background: #FFFFFF;
      }
      .item {
        text-align: center;
        &:nth-child(1) {
          width: 30%;
        }
        &:nth-child(2) {
          width: 50%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:nth-child(3) {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .green {
          margin-left: .3rem;
          color: #44BC64;
        }
        img {
          width: .29rem;
          height: .29rem;
        }
      }
    }

  }
  .list-wrap {
    position: fixed;
    left: .24rem;
    right: .24rem;
    top: 2.4rem;
    bottom: 1.4rem;
    z-index: 2;
    background: #fff;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .no-data {
    position: fixed;
    left: .24rem;
    right: .24rem;
    top: 2.4rem;
    bottom: 1.9rem;
    z-index: 2;
    background: #fff;
    .img1 {
      margin: 1.5rem auto .16rem;
      display: block;
      width: 3.38rem;
      height: 2.26rem;
    }
    p {
      margin-bottom: .5rem;
      text-align: center;
      font-size: .24rem;
      color: #BBBBBB;
    }
    .img2 {
      margin: 0 auto;
      display: block;
      width: 6.32rem;
      height: 2rem;
    }
  }
  .getMoreKey {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: .9rem;
    background: #FF4141;
    font-size: .24rem;
    color: #FFFFFF;
    text-align: center;
    line-height: .92rem;
  }
}
</style>