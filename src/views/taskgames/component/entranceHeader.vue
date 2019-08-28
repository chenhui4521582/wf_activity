<template>
  <div class="entrance-header">
    <div class="entrance-header-item">
      <img class="entrance-header-img" src="../images/cat_supply/biaoxianbox.png">
      <div class="entrance-header-text">保险箱</div>
    </div>
    <div class="entrance-header-item" @click="handleCatBuJi">
      <img class="entrance-header-img" src="../images/cat_supply/supplybox.png">
      <div class="entrance-header-text">补给箱</div>
    </div>
    <div class="entrance-header-item" @click="gotokf">
      <img class="entrance-header-img" src="../images/cat_supply/kf.png">
      <div class="entrance-header-text">客服</div>
    </div>
    <common-pop :title="title" @close="showOutPop=false" :btn-name="btnName" v-if="showOutPop" @besure="gaincatprize" :isShowBtn="!(catSurplusFlag==3||catSurplusFlag==4)">
      <div class="entrance-center" :class="{catFlag1:catSurplusFlag==1,catFlag34:catSurplusFlag==3||catSurplusFlag==4}">
        <div slot="text" class="text" :class="{catFlag1:catSurplusFlag==1,catFlag34:catSurplusFlag==3||catSurplusFlag==4}">
          <template v-if="catSurplusFlag==1">
            <p>您的招财猫生病了</p>
            <p>此项招财猫权益被冻结</p>
          </template>
          <template v-else-if="catSurplusFlag==2">
            <p>补给箱为招财猫Lv.86权益：</p>
            <p>每天可在补给箱领取一次金叶子，</p>
            <p> 一次最多可领5万</p>
          </template>
          <template v-else>
            <img :src="catSurplusFlag==3?`${require('../img/cat/cat_box_unopen.png')}`:`${require('../img/cat/cat_box_opened.png')}`" alt="">
            <p v-if="catSurplusFlag==3">最高<i>50000</i>金叶子，每日限领1次</p>
            <p v-if="catSurplusFlag==4">您已领取<i>{{receiveAmount}}</i>金叶子</p>
          </template>
        </div>
        <div class="btn" slot="btn" :class="{btn4:catSurplusFlag==4}"  @click="gaincatprize(catSurplusFlag)" v-if="catSurplusFlag==3||catSurplusFlag==4">
          <template v-if="catSurplusFlag==3"><span>领取补给</span></template>
          <template v-if="catSurplusFlag==4"><span>今日已领</span></template>
        </div>
        <div class="cat_surplusinfo" v-if="catSurplusFlag==3||catSurplusFlag==4">
          <div class="line"></div>
          <div class="desc">* 招财猫不同等级享不同权益,<span class="gobaoxian">去获取更多权益>></span></div>
        </div>
      </div>
    </common-pop>
    <task-award-pop v-if="isDailyReceivePop" :awardsImage="`${require('../img/cat/cat_leaf.png')}`"  :awards="receiveAwards" @close="isDailyReceivePop=false"></task-award-pop>
  </div>
</template>
<script>
  export default {
    name: "entranceHeader",
    data(){
      return {
        url: '',
        catSurplusFlag:0,//1 权益被冻结 2权益未开启 3 要求领取补给 4 补给已领 5 补给领取成功
        title:'温馨提示',
        bgHeight:316,//catSurplusFlag(1、2 弹窗高度316 3、4 弹窗高度528 5 弹窗高度356)
        bgColor:'',//catSurplusFlag(5 弹窗背景红色)
        award: {},
        gainleafamount:0,
        showOutPop:false,
        isDailyReceivePop:false,
        receiveAwards:{},
        receiveAmount:0,
        catSupplyInfo:[]
      }
    },
    props:{
      showtip:{
        type:Boolean,
        default:false
      }
    },
    components:{
      commonPop: () => import('./commonPop'),
    },
    methods:{
      async gotokf () {
        this.$emit('gotokf')
      },
      async handleCatBuJi(){//招财猫补给箱
        let {data:data}=await this.axios.post('http://10.33.80.62:8080/wf_petcat_api_war/petcat/api/privilege/receiveStatus')
        if(data.code==200||data.code==203){//203 表示用户没猫 状态对应 权益未开启
          if(data.code==200){
            this.catSupplyInfo=data.data.receiveStatusInfos.filter(item=>item.type==1)
            this.catSurplusFlag=this.getCatSurplusFlag(this.catSupplyInfo)
            // this.catSurplusFlag=3 测试代码
          }else{
            this.catSurplusFlag=2
          }
          if(this.catSurplusFlag){
            this.bgColor='black'
            if(this.catSurplusFlag==1){
              this.title='权益被冻结'
              this.btnName='去招财猫解封权益'
            }else if(this.catSurplusFlag==2){
              this.title='权益未开启'
              this.btnName='去招财猫开启权益'
            }else{
              // this.title=`幸运补给箱Lv.${catSupplyInfo[0].level}`
              this.title=`幸运补给箱`
              this.bgHeight=500
              if(this.catSurplusFlag==3){
                this.btnName='领取补给'
              }else{
                this.receiveAmount=this.catSupplyInfo.receiveAmount
                this.btnName='今日已领'
              }
            }
            this.showOutPop = true
          }
        }else{

        }
      },
      async gaincatprize(){//招财猫领取补给
        let catSurplusFlag=this.catSurplusFlag
        if(catSurplusFlag==4) return
        this.showOutPop=false
        if(catSurplusFlag==1||catSurplusFlag==2){
          parent.location.href=``
        }else if(catSurplusFlag==3){
          let {data:data}=await this.axios.post('http://10.33.80.62:8080/wf_petcat_api_war/petcat/api/privilege/receiveStatus',{receiveType:1})
          if(data.code==200){
            this.bgHeight=356
            this.title='领取补给成功'
            this.bgColor='red'
            this.receiveAwards.awardsName=`${data.data.amount}金叶子`
            this.isDailyReceivePop=true
          }
        }else{
          this.showOutPop=false
        }
      },
      getCatSurplusFlag(catSupplyInfo){
        //1 权益被冻结 2权益未开启 3 要求领取补给 4 补给已领 5 补给领取成功
        if(!catSupplyInfo.length){
          return 0
        }else{
          let data=catSupplyInfo[0]
          if(data.isExist){
            if(data.frozenStatus){
              return 2
            }else{
              if(data.receiveStatus){
                return 4
              }else{
                return 3
              }
            }
          }else{
            return 2
          }
        }
      }
    }
  }
</script>

<style lang='less' scoped>
  .entrance-header {
    padding-left: .2rem;
    width: 1.6rem;
    height: .8rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .entrance-header-item{
      font-size: .16rem;
      font-weight:400;
      color:rgba(239,196,90,1);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: .6rem;
      .entrance-header-img{
        width: .4rem;
        height: .4rem;
      }
      &:nth-child(3){
        color:rgba(88,114,163,1)
      }
    }
  }
  .entrance-center{
    &:not(.catFlag34){
      height: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .text{
      height: 140*0.01rem;
      text-align: center;
      //color: #1F1F1F;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 40*0.01rem;
      &.catFlag1{
        height: 120*0.01rem;
        font-size: 24*0.01rem;
      }
      &.catFlag34{
        height: 214*0.01rem;
      }
      &.catFlag5{
        height: 180*0.01rem;
      }
      img{
        width: 190*0.01rem;
        height: 140*0.01rem;
        margin-bottom: 17*0.01rem;
        &.btn5{
          width: 157*0.01rem;
          height: 120*0.01rem;
        }
      }
      p{
        i{
          color: #E39B25;
        }
      }
    }
    .btn{
      width:1.8rem;
      height:.6rem;
      line-height:.6rem;
      background:rgba(239,111,12,1);
      border-radius:.1rem;
      margin: auto;
      &.btn4{
        background:rgba(54,58,64,1);
        font-weight:bold;
        color:rgba(116,116,116,1);
      }
    }
    .cat_surplusinfo{
      font-size:20*0.01rem;
      font-weight:400;
      color:#8B8B8C;
      line-height:30*0.01rem;
      padding: 0.31rem 0.1rem 0.31rem;
      .line{
        width:4.38rem;
        height:1px;
        background:rgba(255,255,255,.2);
        margin: 0 auto.18rem;
      }
      .gobaoxian{
        color: #E39B25;
        text-decoration: underline;
      }
    }
  }
</style>
