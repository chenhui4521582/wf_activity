<template>
  <div class="slot-machine">
    <div class="container">
      <div class="btns">
        <div class="back" @click="back"></div>
        <div class="openRule" @click="openRule"></div>
      </div>
      <horn :hornList="hornList"></horn>
      <animation :animationList="animationList" :userInfo="userInfo" @refersh="_getUserInfo" />
    </div>
    <div class="bg">
      <img src="./images/bg.png" alt="">
    </div>
    <slot-Machine-rule v-model="showRule" :userInfo="userInfo" />
  </div>
</template>
<script>
import Services from './services/services'
import _get from 'lodash.get'
export default {
  name: 'slotMachine',
  data: () => ({
    userInfo: {
      beginDate: '',
      endDate: '',
      nextStage: '',
      nextStageRecharge: '',
      recharge: ''
    },
    hornList: [1, 2, 3, 4, 5, 6],
    animationList: [],
    nextStage: 3,
    showRule: false
  }),
  components: {
    animation: () => import('./component/animation'),
    slotMachineRule: () => import('./component/slotMachineRule'),
    horn: () => import('./component/horn')
  },
  methods: {
    _getUserInfo () {
      Services.getUserInfo().then(res => {
        let { code, data, message } = _get(res, 'data', '')
        if (code === 200) {
          this.userInfo = _get(res, 'data.data', [])
          this.animationList = _get(res, 'data.data.playProgressList', [])
        } else {
          this.$toast.show({
            message: message,
            duration: 1500
          })
        }
      })
    },
    _getHornList () {
      Services.getHornList().then(res => {
        let { code, data, message } = _get(res, 'data', '')
        if (code === 200) {
          this.hornList = data
        } else {
          this.$toast.show({
            message: message,
            duration: 1500
          })
        }
      })
    },
    _runAnimation () { },
    /** 打开规则 **/
    openRule () {
      this.showRule = true
      GLOBALS.marchSetsPoint('A_H5PT0203002128')
    },
    /** 返回 **/
    back () {
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      GLOBALS.marchSetsPoint('A_H5PT0203002127')
    }
  },
  mounted () {
    this._getUserInfo()
    this._getHornList()
    GLOBALS.marchSetsPoint('A_H5PT0203002126')
  }
}
</script>

<style scoped type="less">
@import "../../common/css/base.css";
</style>

<style lang="less" scoped>
.slot-machine {
  position: relative;
  min-height: 100vh;
  background: #800508;
  .container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
    .btns {
      position: absolute;
      left: 0;
      top: 0;
      .back {
        width: 0.6rem;
        height: 1.3rem;
        background: url(./images/back-btn.png) no-repeat center center / 100%
          100%;
      }
      .openRule {
        width: 0.6rem;
        height: 1.3rem;
        background: url(./images/rule.png) no-repeat center center / 100% 100%;
      }
    }
  }
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    img {
      vertical-align: top;
      width: 100%;
    }
  }
}
</style>
