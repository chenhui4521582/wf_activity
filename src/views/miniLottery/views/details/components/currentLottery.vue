<template>
  <div class="current-lottery" v-if="!isAwards && (status == 0 || status == 3)">
    <div class="title" v-if="status == 0">
      <span>本期夺宝</span>
      <span class="min-buy">
        至少开奖<i>{{details.limitTotalAmount || 0}}</i>次
      </span>
    </div>
    <div class="title no" v-if="status == 3">
      <span class="name">本期夺宝<i>暂未开始</i></span>
      <span class="min-buy">
        至少开奖<i>{{details.limitTotalAmount || 0}}</i>次
      </span>
    </div>
    
    <div class="people" v-if="status == 0">
      您已经参与：<span>{{bettingCodesLength}}</span>次
    </div>
    <div class="my-buy" v-if="bettingCodesLength">
      <div class="mycard">
        您本期夺宝号码：
        <span v-for="(item, index) in bettingCodes" :key="index">{{item}}、</span>
      </div>
      <div class="btn" @click="openModal">我的夺宝号码</div>
    </div>
    <Modal title="本期我的夺宝号码" v-model="showModal" type="2" :closeButtonShow=false @on-save="hide">
      <div class="list">
        <span v-for="(item, index) in bettingCodes" :key="index">{{item}}、</span>
      </div>
    </Modal>
  </div>
</template>
<script>
import _get from 'lodash.get'
export default {
  name: 'current-lottery',
  props: {
    details: {
      type: Object,
      default: ()=> ({})
    },
    isAwards: {
      type: Boolean,
      default: false
    }

  },
  data: ()=> ({
    showModal: false
  }),
  computed: {
    bettingCodesLength() {
      return this.bettingCodes.length || 0
    },
    bettingCodes() {
      let bettingCodes = _get(this.details, 'currentUserInfo.bettingCodes', [])
      if(bettingCodes) {
        return bettingCodes
      }else {
        return []
      }
    },
    status() {
      return _get(this.details, 'currentPeriodStatus')
    }
  },
  methods: {
    hide() {
      this.showModal = false
    },
    openModal() {
      this.showModal = true
      GLOBALS.marchSetsPoint('A_H5PT0202002085', {
        task_id: this.details.currentPeriodStatus,
        task_name: this.details.currentPeriodStatus
      })
    }
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
    align-items: center;
    font-size: .28rem;
    font-weight: bold;
    .min-buy {
      color: #888888;
      font-size: .24rem;
      font-weight: normal;
    }
    &.no {
      margin-bottom: 0;
      .name {
        i {
          color: #FF4141;
        }
      }
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
  min-height: 1rem;
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