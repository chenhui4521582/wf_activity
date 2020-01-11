<template>
  <div class="mask">
    <div
      class="comPop-bc"
      id="cp-bc"
      :style="{background:`url(${require(`../images/comPop/${this.popType}/bc.png`)})`}"
    >
      <div class="title">
        <!-- 4字时的宽度 -->
        <img
          :src="`${require(`../images/comPop/${this.popType}/title.png`)}`"
          alt
          style="width:1.56rem;height:0.38rem;"
          v-if="popType==1||popType==0"
        />
        <img
          :src="`${require(`../images/comPop/${this.popType}/title.png`)}`"
          style="width:2.77rem;height:0.38rem"
          v-else-if="popType==2"
        />
        <img
          :src="`${require(`../images/comPop/${this.popType}/title.png`)}`"
          style="width:2.37rem;height:0.38rem"
          v-else-if="popType==3"
        />
      </div>
      <div class="inner">
        <!-- 规则页面 -->
        <template v-if="popType==0">
          <div class="inner-container">
            <p>
              <span style="color:#FFCB35;font-size:0.24rem">①活动时间</span>
              <span style="color:#FFF5ED;font-size:0.22rem;">2020年1月27日0点-2月2日24点，2月3日-4日发榜</span>
            </p>
            <p>
              <span style="color:#FFCB35;font-size:0.24rem">②每日返利</span>
              <span
                style="color:#FFF5ED;font-size:0.22rem;"
              >活动期间，每天登录活动页可免费领取昨日总消耗金叶0.1%返利金叶（明天领取金叶=今天总消耗金叶*返利比）；充值随机获福气值，每天达到10000福气值，则次日金叶返利升级10倍（返利比1%）</span>
            </p>
            <p>
              <span style="color:#FFCB35;font-size:0.24rem">③累计福气榜</span>
              <span span style="color:#FFF5ED;font-size:0.22rem;">活动期间所得福气可累计，前30名福气最高玩家可上榜赢取大奖。</span>
            </p>
            <p>
              <span style="color:#FFCB35;font-size:0.24rem">④小提示</span>
              <span
                style="color:#FFF5ED;font-size:0.22rem;"
              >• 每日返利需由玩家每天在“返利记录”页手动领取，2月4日24点前均可领取所得奖励，过时不予补偿； • 福气榜统计截止时间为2月2日24点，福气在充值后将自动累计到玩家榜单。 • 平台保留对活动条款的最终解释权，如需咨询可联系在线客服。</span>
            </p>
          </div>
        </template>
        <!-- 攻略页面 -->
        <template v-if="popType==1">
          <img src="../images/comPop/1/inner.png" alt style="width:4.18rem;height:4.50rem;" />
        </template>

        <!-- 查看福气获得记录 -->
        <template v-if="popType==2">
          <div class="inner-container">
            <div style="display: flex;
    justify-content: space-evenly;">
              <div style="display:flex">
                <span style="color:#FFF6DF;font-size:0.24rem">今日获得：</span>
                <span style="color:#FEEC21;font-size:0.24rem">500</span>
              </div>
              <div style="display:flex">
                <span style="color:#FFF6DF;font-size:0.24rem">累计获得：</span>
                <span style="color:#FEEC21;font-size:0.24rem">1000</span>
              </div>
            </div>
            <div class="inner-top">
              <div>
                <span style="color:#FFF5ED;font-size:0.22rem">获得日期</span>
              </div>
              <div>
                <span style="color:#FFF5ED;font-size:0.22rem">福气值</span>
              </div>
            </div>
            <!-- 循环福气获得记录列表 -->
            <ul class="record-inner">
              <li class="record-inner-li" v-for="(i,key) in list" :key="key">
                <div>{{i.time}}</div>
                <div>{{i.num}}</div>
              </li>
            </ul>
          </div>
        </template>

        <!-- 领取每日返利 (金叶返利记录)-->
        <template v-if="popType==3">
            <!-- 领取成功提示 -->
            <div v-if="tips" class="success-tips">
                
            </div>

          <div class="everyday-container">
            <div class="everyday-total">
              <span>累计返利金叶：</span>
              <span>100000000</span>
            </div>
            <div class="inner-top">
              <div>
                <span style="color:#FFF5ED;font-size:0.22rem">返利日期</span>
              </div>
              <div>
                <span style="color:#FFF5ED;font-size:0.22rem">返利金叶数</span>
              </div>
              <span style="width:1rem"></span>
            </div>

            <!-- 循环列表 -->
            <ul class="record-inner">
              <li v-for="(i,key) in list" :key="key">
                <div>{{i.time}}</div>
                <div>{{i.num}}</div>
                <!-- 领取按钮 -->
                <div v-show='!lingqu[key].v' @click="draw(key)"
                > 
                 </div>
                  <!-- 已领取 -->
                  <div
                    v-show="lingqu[key].v"
                    class="yilingqu"
                 
                  >
             
                  </div>
              
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
    <div class="close" @click="comPopback">
      <img src="../images/comPop/close.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lingqu:[] ,
      list: [
        { time: "2020-2-2 ", num: "100000" },
        { time: "2020-2-2 ", num: "100" },
        { time: "2020-2-2 ", num: "100000000" },
        { time: "2020-2-2 ", num: "1000" },
        { time: "2020-2-2 ", num: "1342430000" },
        { time: "2020-2-2 ", num: "1" },
        { time: "2020-2-2 ", num: "2" }
        // { time: "2020-2-2 9:00", num: "100000000" },
        // { time: "2020-2-2 9:00", num: "100000000" },
        // { time: "2020-2-2 9:00", num: "100000000" },
        // { time: "2020-2-2 9:00", num: "100000000" },
        // { time: "2020-2-2 9:00", num: "100000000" },
        // { time: "2020-2-2 9:00", num: "100000000" },
        // { time: "2020-2-2 9:00", num: "100000000" }
      ],
      close: false,
      lingqu:[],
      tips:false,
      time:'',
    };
  },
  created(){
      for(let i = 0 ; i< this.list.length;i++){
            this.lingqu.push({v:false})
      }
        
          console.log(this.lingqu)
  },
  methods: {
    draw(key) {
        this.tips=true
        this.time = setTimeout(() =>{
            this.tips=false
        },3000)
      this.lingqu[key].v= !this.lingqu[key].v ;

    },
    comPopback() {
      this.$emit("close", this.close);
      console.log("查看组件下标", this.popType);
    }
  },
  props: ["popType"]
};
</script>
<style lang="less" scoped>
// 提示图片
.success-tips{
    background: url('../images/comPop/3/tips.png');
    background-size: 100% 100%;
    width: 1.66rem;
    height: 1.92rem;
    position: absolute;
    top: 4.95rem;
    left: 2.4rem;
    z-index: 5;
}
.mask {
  width: 7.2rem;
  position: fixed;
  top: 0;
  height: 100vh;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
}

.comPop-bc {
  background-size: 100% 100% !important;
  width: 6.46rem;
  height: 9.72rem;
  margin: 0 auto;
  position: relative;
  .inner {
    width: 4.34rem;

    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-top: 3.1rem;
    .inner-container {
      width: 100%;
      height: 4.5rem;
      overflow-x: hidden;
    }

    p {
      display: grid;
      margin-top: 0.06rem;
    }
  }

  .title {
    position: relative;
    top: 2.8rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
.close {
  position: absolute;
  //   top: 11.43rem;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  img {
    width: 0.52rem;
    height: 0.52rem;
  }
}
// 查看福气记录的内容样式
.inner-top {
  display: flex;
  justify-content: space-around;
  margin-top: 0.2rem;
  position: relative;
    right: 0.2rem;

  :nth-child(1){
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../images/comPop/2/biankuang.png");
    background-size: 100% 100%;
    width: 1.558rem;
    height: 0.466rem;
  }
  :nth-child(2){
         display: flex;
    justify-content: center;
    align-items: center;
    background: url("../images/comPop/2/biankuang.png");
    background-size: 100% 100%;
    width: 1.558rem;
    height: 0.466rem;
    position: relative;
    left: 0.2rem;
  }
}
.record-inner {
    // 单调福气获得记录的样式
margin-top: 0.2rem;
    // width: 4.8rem;
    height: 3.2rem;
    overflow-x: hidden;
    margin: 0 auto;
    .record-inner-li{
    display: flex;
    height: 0.58rem;
    align-items: center;
    justify-content: center; 
    div:first-child{
        font-size: 0.2rem;
    text-align: center;
    font-weight: bold;
    color: #fff5ed;
    overflow: hidden;
    white-space: nowrap;
    width: 1.65rem;
    position: relative;
    right: 0.45rem;
    }
    }
  li {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 0.58rem;
    justify-content: space-around;
    align-items: center; 
       :nth-child(1) {
    font-size: 0.2rem;
    text-align: center;
    font-weight: bold;
    color: #fff5ed;
    overflow: hidden;
    white-space: nowrap;
    width: 1.65rem;
        position: relative;
    right: 0.1rem;
  }
  :nth-child(2){
        font-size: 0.2rem;
    text-align: center;
    font-weight: bold;
    color: #fff5ed;
    overflow: hidden;
    white-space: nowrap;
    width: 1.65rem;
    position: relative;
    left: 0.3rem;
  }
 :nth-child(3){
      background: url('../images/comPop/3/lingqu.png');
      background-size: 100% 100%;
      width: 1.72rem;
      height: 0.69rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      position: relative;
    left: 0.2rem;

  }
  .yilingqu{
      background: url('../images/comPop/3/yilingqu.png');
        background-size: 100% 100%;
        width: 1.72rem;
      height: 0.69rem;
        display: flex;
      justify-content: space-evenly;
      align-items: center;
         position: relative;
    left: 0.2rem;
  }
  }
 

}
.everyday-container {
  .everyday-total {
    display: flex;
    justify-content: center;
    margin-top: 3.2rem;
    span:first-child {
      color: #fff6df;
      font-size: 0.28rem;
      font-weight: 400;
    }
    span:last-child {
      color: #feec21;
      font-size: 0.28rem;
      font-weight: 400;
    }
  }
}
</style>