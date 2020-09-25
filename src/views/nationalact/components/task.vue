<template>
  <div class="task" :class="{pop:selectedIndex}">
    <div class="task_info" :class="{pop:selectedIndex}">
      <div class="decoration">
        <div class="decoration_info">最终获得{{selectedItem.bagAmount/2}}<img src="../images/star.png" alt="">领取大奖的50%</div>
      </div>
      <p class="awards_name" v-html="selectedItem.bagName.split(/['(','（']/)[0]"></p>
      <div class="total">当前累计<img src="../images/star.png" alt="">:{{selectedItem.userAmount}}</div>
      <div class="percent-box">
        <div class="percent-bar" :style="{ width: (selectedItem.userAmount / selectedItem.bagAmount) * 100 + '%' }"
             :class="{full:selectedItem.userAmount>=selectedItem.bagAmount}"></div>
        <span>{{selectedItem.userAmount}}/{{selectedItem.bagAmount}}</span>
      </div>
      <img src="../images/receive_gray.png" alt="" class="btn" v-if="!selectedItem.received">
      <div class="btn receive" v-else @click="receiveBag">
        领取奖励
      </div>
      <img src="../images/title.png" alt="" class="title">
      <div class="tips">任务数据每日0点清零刷新，请及时领取奖励</div>
    </div>
    <div class="tasks" :class="{pop:selectedIndex}" v-if="!isEnd">
      <div class="item" v-for="(item,index) in selectedItem.taskList"
           :class="{last:index==selectedItem.taskList.length-1}">
        <div class="task_content">
          <div class="task_name">{{item.name}}</div>
          <div class="precent">
            <div class="percent-box">
              <div class="percent-bar" :style="{ width: (item.progress / item.condition) * 100 + '%' }"
                   :class="{full:item.progress>=item.condition}"></div>
              <span>{{item.progress|filterPrice}}/{{item.condition|filterPrice}}</span>
            </div>
            <div class="award_name"><img src="../images/star.png" alt="">*{{item.awardsPropNum}}{{item.extendAwardsName?'+'+item.extendAwardsName:item.extendAwardsName}}
            </div>
          </div>
        </div>
        <div class="task_btn" :class="{receive:item.state==1,received:item.state==2}" @click="doTask(item)">
          {{btnNames[item.state]}}
        </div>
      </div>
    </div>
    <p class="over" v-else><img src="../images/over1.png" alt=""><span>活动已结束</span></p>
  </div>
</template>

<script>
  import {
    receiveBag, receiveTask
  } from '../utils/api'

  export default {
    name: "task",
    props: {
      selectedIndex: {
        type: Number,
        default: 0
      },
      selectedItem: {
        type: Object,
        default: null
      },
      isEnd: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        btnNames: ['去完成', '领取', '已领取'],
        taskData: []
      }
    },
    methods: {
      async doTask(item) {
        if (!this.selectedIndex) {//非弹窗
          if (!this.isEnd && item.state != 2) {
            if (item.state == 0) {//去完成
              GLOBALS.marchSetsPoint('A_H5PT0334004221',{
                task_id:item.sort,
                task_name:item.name
              })
              item.type == 2 && (location.href = 'https://wap.beeplaying.com/xmWap/#/payment')
              item.type == 3 && this.$emit('showPop', 3)
            } else {//领取
              GLOBALS.marchSetsPoint('A_H5PT0334004222',{
                task_id:item.sort,
                task_name:item.name
              })
              let {code, data, message} = await receiveTask(item.sort)
              if (code == 200) {
                item.state = 2
                this.$toast.show({
                  message: '领取成功',
                  duration: 1000
                })
                this.$emit('refresh')
              } else {
                this.$toast.show({
                  message,
                  duration: 1000
                })
              }
            }
          }
        }
      },
      async receiveBag() {
        if (!this.selectedIndex) {//非弹窗
          GLOBALS.marchSetsPoint('A_H5PT0334004224',{
            task_id:this.selectedItem.bagLevel,
            task_name:this.selectedItem.bagName
          })
          let {code, data, message} = await receiveBag()
          if (code == 200) {
            this.$emit('showPop', 4, {
              bagId: data.bagLevel,
              awardsName: data.bagName
            })
            this.$emit('refresh')
          } else {
            this.$toast.show({
              message,
              duration: 1000
            })
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .task {
    padding-bottom: .44rem;
    &.pop {
      margin-left: -.2rem;
      padding-bottom: 0;
    }
    .task_info {
      width: 100%;
      height: 8.64rem;
      background: url("../images/bg1.png");
      background-size: 100% 100%;
      position: relative;
      padding-top: 5.3rem;
      box-sizing: border-box;
      .decoration {
        width: 5.81rem;
        height: 2.42rem;
        background: url("../images/decoration1.png");
        background-size: 100% 100%;
        position: absolute;
        top: .48rem;
        left: 0;
        right: 0;
        margin: auto;
        .decoration_info {
          position: absolute;
          top: 1.85rem;
          left: 1.35rem;
          font-size: .24rem;
          font-weight: 400;
          color: #B75D0B;
          display: flex;
          align-items: center;
          background: #FDE296;
          img {
            width: .27rem;
            height: .27rem;
          }
        }
      }
      &.pop {
        width: 100%;
        height: 7.36rem;
        background: url("../images/bg10.png");
        background-size: 100% 100%;
        position: relative;
        padding-top: 4.05rem;
        box-sizing: border-box;
      }
      &.pop .decoration {
        content: '';
        width: 5.28rem;
        height: 1.35rem;
        background: url("../images/decoration0.png");
        background-size: 100% 100%;
        position: absolute;
        top: .4rem;
        left: .3rem;
        .decoration_info {
          top: .7rem;
          left: 1.06rem;
        }
      }
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      .awards_name {
        font-size: .22rem;
        font-weight: bold;
        color: #FAED93;
        height: .54rem;
        display: flex;
        align-items: center;
        padding-left: .1rem;
        box-sizing: border-box;
      }
      .total {
        margin: .1rem 0;
        display: flex;
        align-items: center;
        font-size: .24rem;
        color: #8F120C;
        justify-content: center;
        font-weight: bold;
        line-height: 1;
        img {
          width: .27rem;
          height: .27rem;
        }
      }
      .percent-box {
        width: 2.38rem;
        height: .33rem;
        background: #8F120C;
        border-radius: .16rem;
        position: relative;
        font-size: .24rem;
        font-weight: 400;
        color: #FFFFFF;
        .percent-bar {
          position: absolute;
          width: 50%;
          height: 100%;
          background: #FFC043;
          border-radius: .16rem 0 0 .16rem;
          max-width: 100%;
          &.full {
            border-radius: .16rem;
          }
        }
        span {
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;
          width: 100%;
          line-height: .35rem;
        }
      }
      .btn {
        width: 2.31rem;
        height: .76rem;
        margin: .1rem auto .25rem;
        &.receive {
          width: 2.32rem;
          height: .68rem;
          background: linear-gradient(0deg, #E6FF81, #F8962D);
          box-shadow: 0 .03rem .05rem 0 rgba(143, 18, 12, 0.64);
          border-radius: .34rem;
          font-size: .36rem;
          font-weight: bold;
          color: #D92A26;
          line-height: .68rem;
          text-align: center;
        }
      }
      .title {
        width: 3.68rem;
        height: .58rem;
      }
      .tips {
        font-size: .2rem;
        font-weight: 400;
        color: #FFE0C0;
      }
    }
    .tasks {
      width: 6.51rem;
      padding: .13rem .17rem;
      background: #AC221E;
      border-radius: .16rem;
      margin: auto;
      .item {
        padding: 0 .18rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 6.17rem;
        height: 1.18rem;
        background: url("../images/task_bg.png");
        background-size: 100% 100%;
        margin: 0 auto;
        &:not(.last) {
          margin: 0 auto .2rem;
        }
        .task_content {
          .task_name {
            font-size: .3rem;
            font-weight: 400;
            color: #6D4307;
            margin-bottom: .13rem;
          }
          .precent {
            display: flex;
            .percent-box {
              width: 1.82rem;
              height: .29rem;
              background: #F1BE75;
              border-radius: .15rem;
              position: relative;
              font-size: .18rem;
              font-weight: 400;
              color: #5B1A00;
              .percent-bar {
                position: absolute;
                width: 50%;
                height: 100%;
                background: #D92A26;;
                border-radius: .15rem 0 0 .15rem;
                &.full {
                  border-radius: .15rem;
                }
              }
              span {
                position: absolute;
                left: 0;
                right: 0;
                margin: auto;
                text-align: center;
                width: 100%;
                line-height: .32rem;
              }
            }
            .award_name {
              margin-left: .14rem;
              display: flex;
              align-items: center;
              font-size: .24rem;
              font-weight: 400;
              color: #8F120C;
              img {
                width: .27rem;
                height: .26rem;
              }
            }
          }
        }
        .task_btn {
          width: 1.2rem;
          height: .6rem;
          background: #75940B;
          border-radius: .33rem;
          line-height: .6rem;
          text-align: center;
          font-size: .28rem;
          font-weight: 400;
          color: #F5CF97;
          &.receive {
            color: #F5CF97;
            background: #D92A26;
          }
          &.received {
            color: #F5CF97;
            background: #837979;
          }
        }
      }
    }
    p.over {
      text-align: center;
      margin-top: .5rem;
      font-size: .3rem;
      color: #641210;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      img {
        width: 2.02rem;
        height: 2.02rem;
        margin-bottom: .25rem;
      }
    }
  }
</style>
