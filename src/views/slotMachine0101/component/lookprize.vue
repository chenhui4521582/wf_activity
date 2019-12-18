<template>
    <div class="rule-mask" v-show="showRule">
        <div class="rule-bg">
            <div class="rule-bg-top">
                <img src="../images/rule-top.png" >
                <img :src="list[num].imgsrc">
                <div class="close" @click="close">
                    <img src="../images/close.png" alt="">

                </div>
                

                </div>
            <div class="prize-text">
随机获得下列奖励
                            
            </div>
            <div class="prizeimg">
  <div class="rule-bottom">
                <img src="../images/rule-bottom.png">
            </div>
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
        {imgsrc:require('../images/topprize.png'),text:'随机获得下列奖励' ,show:['../images/jdk.png','../images/hfq']},
        {imgsrc:require('../images/one.png'),text:'随机获得下列奖励' ,show:['../images/jdk.png','../images/jdk.png','../images']},
        {imgsrc:require('../images/two.png'),text:'随机获得下列奖励' ,show:''},
        {imgsrc:require('../images/three.png'),text:'随机获得下列奖励' ,show:''},
        {imgsrc:require('../images/partprize.png'),text:'随机获得下列奖励' ,show:''},
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
.rule-bg-top{
    position: absolute;
        width: 6.27rem;
    height: 3.66rem;
    top: -2rem;
    left: -0.14rem;
}
.rule-bg-top img{
    width: 6.27rem;
    height: 3.66rem;
}
.rule-bg-top img:nth-child(2){
    position: absolute;
    width: 1.73rem;
    height: 0.56rem;
    top: 2.01rem;
    left: 2.2rem;
}
.prize-text{
position: relative;
text-align: center;
// width:2.84rem;
height:0.34rem;
font-size:0.36rem;
font-family:PingFang SC;
font-weight:800;
color:rgba(255,255,255,1);
    margin: 0 auto;
    top: 1.7rem;
}
.prizeimg{
    border: 1px solid black;
    width: 90%;
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