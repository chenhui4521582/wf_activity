<template>
  <div class="task" v-if="value">
    <div class="mask"></div>
    <div class="center">
      <div class="sign">
        <div class="item" v-for="(item, index) in sign" :key="index">
          <div class="icon">
            <img v-for="(innerItem, inderIndex) in (index + 1)" :key="inderIndex" src="../img/water-icon.png" alt="">
            <img class="number" :src="signImg(index)" alt="">
          </div>
          <div class="wrap">
            <div class="unLock" v-if="signText(index).status == 1"><img src="../img/unlock.png" alt=""></div>
            <div class="lock" v-if="signText(index).status == 0"><img src="../img/lock.png" alt=""></div>
            <div class="locked" v-if="signText(index).status == 2"><img src="../img/locked.png" alt=""></div>
            <p>{{signText(index).text}}</p>
          </div>
        </div>
        <div class="sign-btn" v-if="todayIsSign == 0" @click="_sign">
          <img src="../img/sign-btn-text.png" alt="">
        </div>
        <div class="sign-btn disable" v-if="todayIsSign == 1" @click="_sign">
          <img src="../img/signed.png" alt="">
        </div>
      </div>
      <div class="task-items">
        <div class="item" v-for="(item, index) in task" :key="index">
          <div class="icon">
            <img :src="item.icon | filter" alt="">
          </div>
          <div class="detail">
            <p class="name">{{item.taskName}} ({{item.userTaskProgress}}/{{item.taskFinshNum}})</p>
            <p class="finish">完成得{{item.taskAwardNum}}g水滴</p>
          </div>
          <div class="btn go-finish" v-if="item.taskStatus == 1" @click="goGame(item)">
            <img src="../img/btn3-text.png" alt="">
          </div>
          <div class="btn get" v-if="item.taskStatus == 0" @click="_getTaskAward(item)">
            <img src="../img/btn1-text.png" alt="">
          </div>
          <div class="btn finished" v-if="item.taskStatus == 2"> 
             <img src="../img/btn2-text.png" alt="">
          </div>
        </div>
      </div>
      <div class="awards" v-if="showAwards" ref="award">
        {{awardText}}
      </div>
      <div class="close" @click="close"></div>
    </div>
  </div>
</template>
<script>
import Services from '../services/services'
import _get from 'lodash.get'
import utils from '../components/utils'
import Velocity from 'velocity-animate'
export default {
  name: 'task',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    showGuide: false,
    showAwards: false,
    userSignDay: 0,
    todayIsSign: 0,
    awardText: '',
    sign: [],
    task: []
  }),
  methods: {
    signImg (index) {
      return require(`../img/watch${index}-icon.png`)
    },
    signText (index) {
      let userSignDay = this.userSignDay
      if(this.todayIsSign == 1) {
        userSignDay = userSignDay - 1 <= 0 ? 0 : userSignDay - 1
      }
      if(index > userSignDay) {
        return {text: `第${index + 1}天`, status: 0}
      }
      if(userSignDay == index) {
        if(this.todayIsSign == 1) {
          return {text: `已领取`, status: 2}
        }
        return {text: `待领取`, status: 1}
      }
      if(index < userSignDay) {
        return {text: `已领取`, status: 2}
      }
    },
    close () {
      this.$emit('input', false)
    },
    _getTask () {
      Services.getTask().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.sign = _get(res, 'data.data.signConfigRsps', [])
          this.task = _get(res, 'data.data.userTaskInfoRspList', [])
          this.userSignDay = _get(res, 'data.data.userSignDay', 0)
          this.todayIsSign = _get(res, 'data.data.todayIsSign', 0)
        }
      })
    },
    _sign () {
      if(this.todayIsSign == 1) {
        this.$toast.show({message: '您已经签到过了'})
        return
      }
      Services.sign().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.showAwards = true
          this.$nextTick(res=> {
            let el = this.$refs.award
            this.awardText = `获得${data.changeNum}g水滴`
            Velocity(el, {opacity: 1},{ duretion: 1000})
            Velocity(el, {opacity: 0},{ duretion: 1000 , delay: 2000,complete: ()=> {this.showAwards = false}})
          })
          this.userSignDay++
          this.todayIsSign = 1
          this.$emit('updateWater', data.changeNum)
          this._getTask()
          GLOBALS.marchSetsPoint('A_H5PT0247002898')
        }else {
          this.$toast.show({message})
        }
      })
    },
    _getTaskAward(item) {
      Services.getTaskAward(item.taskId).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.showAwards = true
          this.$nextTick(res=> {
            let el = this.$refs.award
            this.awardText = `获得${data.changeNum}g水滴`
            Velocity(el, {opacity: 1},{ duretion: 1000})
            Velocity(el, {opacity: 0},{ duretion: 1000 , delay: 2000,complete: ()=> {this.showAwards = false}})
          })
          this.$emit('updateWater', data.changeNum)
          this._getTask()
          GLOBALS.marchSetsPoint('A_H5PT0247002900', {
            task_id: item.taskId,
            task_name: item.taskName
          })
        }else {
          this.$toast.show({message})
        }
      })
    },
    goGame(item) {
      GLOBALS.marchSetsPoint('A_H5PT0247002899', {
        task_id: item.taskId,
        task_name: item.taskName
      })
      utils.jumpUrl({url: item.gameUrl})
    }
  },
  watch: {
    value(newValue) {
      newValue && this._getTask()
    }
  }
}
</script>
<style scoped lang="less">
* {
  box-sizing: border-box;
}
.task {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 10;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1;
    background: rgba(0,0,0,.7);
  }
  .center {
    position: absolute;
    height: 7.62rem;
    bottom: 0;
    left: .04rem;
    right: .06rem;
    z-index: 2;
    background: url(../img/task-bg.png) no-repeat center center;
    background-size: 100% 100%; 
    .sign {
      margin-top: 1.27rem;
      padding: 0 .58rem 0 .64rem;
      display: flex;
      justify-content: flex-start;
      .item {
        margin-right: .2rem;
        .icon {
          position: relative;
          display: flex;
          justify-content: center;
          height: .7rem;
          img {
            width: .37rem;
            height: .52rem;
          }
          .number {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 0);
            width: .76rem;
            height: .31rem;
          }
        }
        .wrap {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          .unLock {
            width: .33rem;
            height: .31rem;
          }
          .lock {
            width: .25rem;
            height: .31rem;
          }
          .locked {
            width: .25rem;
            height: .31rem;
          }
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
          p {
            padding-left: .05rem;
            white-space: nowrap;
            line-height: 1;
            font-size: .24rem;
            color: #E46E29;
          }
        }
      }
      .sign-btn {
        flex-shrink: 0;
        margin-top: .2rem;
        width: 1.9rem;
        height: .82rem;
        background: url(../img/sign-btn-bg.png) no-repeat center center;
        background-size: 100% 100%; 
        img {
          margin: .15rem 0 0 .44rem;
          width: 1.11rem;
          height: .37rem;
        }
        &.disable {
          background: url(../img/btn2.png) no-repeat center center;
          background-size: 100% 100%; 
        }
      }

    }
    .task-items {
      margin-top: .13rem;
      padding: 0 .53rem 0 .59rem;
      height: 5.25rem;
      overflow-y: scroll;
      overflow-x: hidden; 
      -webkit-overflow-scrolling: touch;
      .item {
        position: relative;
        padding: .19rem 0 0 .27rem; 
        display: flex;
        justify-content: flex-start;
        height: 1.65rem;
        background: url(../img/task-item-bg.png) no-repeat center center;
        background-size: 100% 100%; 
        .icon {
          margin-right: .12rem;
          width: 1.18rem;
          height: 1.13rem;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }
        .detail {
          max-width: 2.1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 1.13rem;
          p {
            line-height: .3rem;
            // white-space: nowrap;
            // overflow: hidden;
            // text-overflow: ellipsis;
          }
          .name {
            font-size: .22rem;
            color: #9D694C;
          }
          .number {
            font-size: .22rem;
            color: #9D694C;
          }
          .finish {
            font-size: .24rem;
            color: #E46E29;
          }
        }
        .btn {
          position: absolute;
          top: .37rem;
          right: .17rem;
          width: 2.08rem;
          height: .89rem;
          &.go-finish {
            background: url(../img/btn3.png) no-repeat center center;
            background-size: 100% 100%;
            img {
              margin: .17rem 0 0 .54rem;
              width: .95rem;
              height: .39rem;
            }
          }
          &.get {
            background: url(../img/btn1.png) no-repeat center center;
            background-size: 100% 100%;
            img {
              margin: .17rem 0 0 .44rem;
              width: 1.23rem;
              height: .4rem;
            }
          }
          &.finished {
            background: url(../img/btn2.png) no-repeat center center;
            background-size: 100% 100%;
            img {
              margin: .18rem 0 0 .58rem;
              width: .94rem;
              height: .39rem;
            }
          }
        }
      }
    }

    .close {
      position: absolute;
      right: -.1rem;
      top: -.1rem;
      width: 1.01rem;
      height: 1.05rem;
      background: url(../img/close.png) no-repeat center center;
      background-size: 100% 100%; 
    }
    .awards {
      position: absolute;
      left: 50%;
      top: -1.3rem;
      transform: translate(-50%, 0);
      width: 4.34rem;
      height: 1.15rem;
      background: url(../img/award-tips.png) no-repeat center center;
      background-size: 100% 100%; 
      text-align: center;
      font-size: .3rem;
      color: #C0622B;
      line-height: 1.2rem;
      opacity: 0;
    }
    @keyframes fadeout {
      0% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
}
</style>