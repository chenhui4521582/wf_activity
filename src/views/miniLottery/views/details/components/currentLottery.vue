<template>
  <div class="current-lottery">
    <div class="title">
      <span>本期夺宝</span>
      <span class="min-buy">
        至少开奖<i>60</i>次
      </span>
    </div>
    <div class="people">
      您已经参与：<span>10</span>人次
    </div>
    <div class="my-buy">
      <div class="mycard">
        您本期夺宝号码：10002468,10002468100024681000246810002468100024681000246810002468
      </div>
      <div class="btn" @click="openModal">我的夺宝号码</div>
    </div>
    <Modal title="本期我的夺宝号码" v-model="showModal" type="2" :closeButtonShow=false @on-save="hide">
      <div class="list">
        <span v-for="(item, index) in myCard" :key="index">{{item}}</span>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'current-lottery',
  data: ()=> ({
    showModal: false,
    myCard: ['10002468、','10002468、','10002468、','10002468、','10002468、','10002468、','10002468、','10002468、','10002468、','10002468、','10002468、']
  }),
  methods: {
    hide() {
      this.showModal = false
    },
    openModal() {
      this.showModal = true
    },
  }
}
</script>
<style lang="less" scoped>
.current-lottery {
  margin-top: .2rem;
  padding: .26rem .2rem;
  background: #fff;
  border-radius: .16rem;
  .title {
    margin-bottom: .18rem;
    display: flex;
    justify-content: space-between;
    font-size: .28rem;
    font-weight: bold;
    .min-buy {
      color: #888888;
      font-size: .24rem;
      font-weight: normal;
    }
  }
  .people {
    margin-bottom: .18rem;
    color: #888888;
    font-size: .24rem;
    span {
      color: #FF4141;
    }
  }
  .my-buy {
    display: flex;
    justify-content: space-between;
    font-size: .24rem;
    color: #888888;
    .mycard {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .btn {
      margin-left: .1rem;
      color: #5186CA;
    }
  }
}
.list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  span {
    flex: .333;
    font-size: .24rem;
    color: #888888;
    line-height: .4rem;
  }
}
</style>