<template lang="html">
    <transition name="fade">
        <div class="pop-wrap">
                <div class="pop-bg">
                    <p>
                        <img :src="finalImg | filter">
                        <span>{{finalAwards.awardsName}}已到账</span>
                    </p>
                    <p>金叶子可在游戏中赢取丰富奖品哦</p>
                </div>
        </div>
    </transition>
</template>

<script>
export default {
    props : {
        'finalAwards' :{
            type: Object,
            default : null
        },
        'finalImg' : {
            type :String,
            default :false
        }
    }
}
</script>

<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.pop-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    z-index: 3;
    .pop-bg{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding-top: 1rem;
        width: 90%;
        height: 4rem;
        background: url('../images/giftpop.png') no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        p{
            text-align: center;
            &:first-child{
                margin-bottom: .6rem;
                font-size: .4rem;
                font-weight: bold;
                color: #b36b06;
                img{
                    margin-right: .38rem;
                    width: 1.13rem;
                    height: 1rem;
                }
            }
            &:last-child{
                font-size: .3rem;
                color: #fff;
            }
        }
    }
}
</style>
