<template>
    <div class="rule-mask">
        <div class="rule-bg">
            <div class="cg-bg-top">
                <img src="../images/rule-top.png" >
                <img src="../images/sorry.png">
                <div class="close" @click="close">
                    <img src="../images/close.png" alt="">

                </div>
                

                </div>
            <div class="sorry2-text">
<span>啊哦,您的游戏币不足</span>
                            
            </div>
            <div class="sorry-goplay">
                <img src="../images/sorry2-button.png"><span>返回活动首页</span>
            </div>
  <div class="rule-bottom">
                <img src="../images/rule-bottom.png">
            </div>
           
            
          
        </div>
    </div>
</template>
<script>
import ruleVue from '../../newUserPrizeClaw/components/rule.vue'
export default {
data(){
  return{
    showRule:true,
    closeprize:false,
    list:[
        {text:'特等奖'},{text:'一等奖'},{text:'二等奖'},{text:'三等奖'},{text:'四等奖'},{text:'五等奖'}
        ]
  }
},
props:['stime','num'],
methods:{
    close(){
        this.$emit('closeprize',this.closeprize)
    }
}
}
</script>
<style lang="less">
.rule-mask{
width: 100%;
    position: fixed;
    top: 0;
    height: 100%;
     z-index: 5;
    background-color: rgba(0,0,0,.5);
}
.rule-bg{
position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 5.90rem;
    height: 6.89rem;
    background: #ed2437;
    border-radius: 0.20rem;
    margin: 0 auto;
}
.cg-bg-top{
    position: absolute;
        width: 6.27rem;
    height: 3.66rem;
    top: -2rem;
    left: -0.14rem;
}
.cg-bg-top img{
    width: 6.27rem;
    height: 3.66rem;
}
.cg-bg-top img:nth-child(2){
position: absolute;
    width: 2.35rem;
    height: 0.56rem;
    top: 2.01rem;
    left: 1.89rem;

}
.sorry2-text{  
    margin: 0 auto;
    top: 2.33rem;
position: relative;
text-align: center;
height:0.77rem;
font-size:0.30rem;
font-family:PingFang SC;
font-weight:bold;
color:rgba(255,255,255,1);
line-height:0.48rem;
}
// .sorry-text span{
//     color: #fcff00;
//     font-size: 0.36rem;
//     font-weight: bold;
// }
// .prizeimg{
//     border: 1px solid black;
//     width: 90%;
// }
.sorry-goplay{
position: absolute;

    height: 0.8rem;
    top: 3rem;
    left: 50%;
    transform: translateX(-50%);
}
.sorry-goplay img{
    width: 2.74rem;
    height: 0.8rem;
}
.sorry-goplay span{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.36rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ed2437;
    left: 0.26rem;
}
.rule-bottom{
    position: relative;
    /* position: absolute; */
    /* bottom: 1rem; */
    top: 2.3rem;
    right: 0.3rem;
}
.rule-bottom img{
    width: 6.51rem;
    height: 1.18rem;
}
.close{
    background: url("../images/close-bg.png");
    background-size: 100% 100%;
    width: 0.81rem;
    height: 0.84rem;
    width: 0.81rem;
    height: 0.84rem;
    position: absolute;
    top: 1rem;
    left: 5.29rem;

    display: flex;
    align-items: center;
    justify-content: center;
}
.close img{
    width: 0.35rem;
    height: 0.34rem;
}
</style>