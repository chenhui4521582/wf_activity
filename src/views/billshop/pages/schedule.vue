<template lang="html">
  <div>
    <div class="schedule-tab">
      <header class="head" style="display: flex">
        <img src="../images/newback.png" alt="" style="width: .3rem;height: .3rem;" @click="headclose">
        <span style="flex: 1">我的幸运盒子</span>
      </header>
      <ul class="list-header">
        <li>奖品</li>
        <li>中奖时间</li>
        <li>状态</li>
      </ul>
      <div class="list-all" v-if="receiveDatas&&receiveDatas.length">
        <ul class="list-cont">
          <li v-for="(item,index) in receiveDatas">
            <span>{{item.productName}}</span>
            <span>{{item.createDate}}</span>
            <span>
              <a href="javascript:" class="btn-default btn-receive" v-if="item.status === 2"
                 @click.stop="onItemAccept(item,index)">立即开启</a>
              <a href="javascript:" class="btn-default" v-if="item.status === 8" @click.stop="onItemAccept(item,index)">已发放</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <new-awards-pop v-if="showpop" @close="showpop=false" :flag="flag">
      <div>
        <img class="title" src="../images/congratulations-text.png" alt="">
        <img class="awards-img" src="../images/hb-icon.png" alt="">
        <p class="num">{{awardsname}}</p>
        <p class="tips">奖品已发放至我的资产</p>
      </div>
    </new-awards-pop>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        receiveDatas: [],
        showpop:false,
        awardsname:'',
        flag:0
      }
    },
    mounted() {
      this.getCatchedawards()
    },
    computed: {},
    methods: {
      async onItemAccept(item, index) {
        if(item.status === 2){
          let {data:data}=await this.axios.post('//ops-api.beeplay123.com/ops/api/blindBox/open',{
            orderId:item.id
          });
          data={"code":200,"data":{"awardsName":"4元话费碎片"},"message":null}
          if(data.code==200){
            this.awardsname=data.data.awardsName
            this.showpop=true;
          }
        }
        if(item.status === 8){
          this.flag=1;
          this.awardsname=item.remark;
          this.showpop=true;
        }
      },
      getCatchedawards() {
        this.axios.post('//ops-api.beeplay123.com/ops/api/blindBox/list').then((response) => {
          if (response.data.code == 200) {
            if (response.data.data.length > 0) {
              this.receiveDatas = response.data.data
            }
          }
        })
      },
      headclose() { // 我的奖品返回
        history.go(-1)
      }
    },
    components:{
      newAwardsPop:()=>import('../components/dialog/newAwardsPop')
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../common/css/base.css";

  .schedule-tab {
    width: 100%;
    position: fixed;
    height: 100%;
    overflow: hidden;
    background: #0f1726;
    top: 0;
    left: 0;
    color: #ffffff;
    a {
      text-decoration: none;
    }
    .head {
      font-size: 0.32rem;
      font-weight: bold;
      padding: 0.4rem;
      text-align: center;
    }
    .list-header {
      display: flex;
      padding: 0.2rem 0.2rem 0.54rem 0.3rem;
      box-sizing: border-box;
      opacity: 0.3;
      li {
        &:first-child {
          text-align: left;
          flex: 1.6;
        }
        flex: 1;
        text-align: center;
      }
    }

    .list-all {
      width: 100%;
      position: absolute;
      top: 1.7rem;
      bottom: 0.2rem;
      overflow-y: auto;
      .infinite-loading-container {
        /*opacity:0.1;*/
        .infinite-status-prompt {
          .font {
            color: #fff;
            font-size: 0.22rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .line {
            height: 0.02rem;
            background-color: #fff;
            width: 0.6rem;
            display: inline-block;
            margin: 0 0.34rem;
          }
        }
      }
    }
    .no-list {
      text-align: center;
      font-size: 0.24rem;
      line-height: 0.36rem;
      margin-top: 2.5rem;
      color: #fff;
      .go-pay {
        display: inline-block;
        width: 1.2rem;
        height: 0.46rem;
        line-height: 0.36rem;
        /*background-color: #f9a825;*/
        font-size: 0.24rem;
        color: #f9a825;
        text-align: center;
        border-radius: 0.08rem;
        margin-top: 0.16rem;
        font-weight: 700;
        opacity: 1;
      }
    }
    .list-cont {
      box-sizing: border-box;
      padding: 0 0.2rem 0 0.3rem;
      li {
        display: flex;
        text-align: center;
        /*margin-bottom: 0.5rem;*/
        margin: 0.25rem auto 0.45rem;

        height: 0.3rem;
        line-height: 0.3rem;
        span {
          flex: 1;
          &:first-child {
            flex: 1.6;
            text-align: left;
          }
          a {
            color: #fff;
          }
        }
        .btn-receive {
          color: #e39b25;
        }
      }
    }
  }

  .fx-enter {
    transform: translateX(100%);
  }

  .fx-enter-to {
    transform: translateX(0);
  }

  .fx-enter-active {
    transition: 0.2s;
  }

  .fx-leave {
    transform: translateX(0);
  }

  .fx-leave-to {
    transform: translateX(100%);
  }

  .fx-leave-active {
    transition: 0.2s;
  }
</style>
