<template>
  <transition name="scalc">
    <div class="rule" v-if="showRule">
      <div class="mask"></div>
      <div class="box">
        <div class="title">活动规则</div>
        <div class="content">
          <div class="rule-text">
            1.参与本活动即可免费获得2次抽奖机会； 充值达到相应额度可获得额外的抽奖机会；<br>
            2.每次抽奖需投资相应数量的金叶；每次
          </div>
          <div class="rule-table">
            <div class="rule-title">每次投资金叶子数</div>
            <div class="rule-list">
              <ul>
                <li v-for="(item, index) in list" :key="index">
                  <span>{{item.time}}</span>
                  <span>{{item.awardsName}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="closed" @click="hideRule"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'rule',
  props: {
	showRule: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    list: [
      {time: '第一次', awardsName: '投资128金叶'},
      {time: '第二次', awardsName: '投资158金叶'},
      {time: '第三次', awardsName: '投资888金叶'},
      {time: '第四次', awardsName: '投资1288金叶'},
      {time: '第五次', awardsName: '投资1588金叶'},
      {time: '第六次', awardsName: '投资3888金叶'},
      {time: '第七次', awardsName: '投资5888金叶'},
      {time: '第八次', awardsName: '投资8888金叶'},
      {time: '第九次', awardsName: '投资12888金叶'},
      {time: '第十次', awardsName: '投资18888金叶'}
    ]
  }),
  methods: {
	hideRule () {
	  this.$emit('hideRule')
    }
  }
}
</script>



<style scoped lang="less">
  .rule {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    .mask {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      background: rgba(0,0,0,.6);
    }
    .box{
      position: absolute;
      left: 50%;
      top: 42%;
      transform: translate(-50%, -50%);
      width: 5.7rem;
        .title{
          height: .82rem;
          line-height: .82rem;
          text-align: center;
          color: #48030D;
          font-size: .36rem;
          background: #A8232C;
          font-weight: bold;
          border-radius: 10px 10px 0 0;
        }
        .content {
          padding: .35rem;
          border-radius: 0 0 10px 10px ;
           background: #510123;
          .rule-text {
            margin-bottom: .1rem;
            font-size: .24rem;
            color: #F4E19E;
          }
          .rule-table{
            text-align: center;
            border: 1px solid #A8232C;
            .rule-title{
              font-size: .24rem;
              color: #C23D46;
              background: #46021F;
              border-bottom: 1px solid #67062F;
              height: .46rem;
              line-height: .46rem;
            }
            .rule-list{
              font-size: .18rem;
              color: #F4E19E;
              li {
                display: flex;
                justify-content: center;
                align-items: center;
                height: .4rem;
                border-bottom: 1px solid  #67062F;
                span {
                  flex: 1;
                  &:first-child {
                    flex: 1.67rem 0 0;
                    border-right: 1px solid #67062F;
                  }
                }
              }
            }
          }
        }
        .closed {
          position: absolute;
          bottom: -1rem;
          left: 50%;
          margin-left: -.3rem;
          width: .6rem;
          height: .6rem;
          background: url("../images/closed.png") no-repeat center center / 100% 100%;
        }
      }
  }
  .scalc-enter-active{
    animation: fadeAnimation .3s ease-in-out;
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
