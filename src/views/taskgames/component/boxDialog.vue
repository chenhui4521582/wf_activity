<template>
    <main>
        <div class="mask"></div>
        <div class="content-box">
          <!--每日任务  签到  弹出框-->
            <img src="../img/dialog/box/bg.png" class="bg no-process" />
            <div class="content">
              <div class="icon boxIcon">
                  <img src="../img/dialog/box/box.png" alt="">
              </div>
              <p class="num">{{awardItem.awardsName}}</p>
              <p class="explain">此宝箱可参与“踏青寻宝瓜分1个亿”活动<br>宝箱越多，奖励更多哦</p>
              <div class="btn">
                <div class="close" @click="close">
                  <img src="../img/dialog/box/enter.png" alt="">
                </div>
              </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
  props: {
	awardItem: {
	  type: Object,
	  default: null
	},
  },
  methods:{
    close () {
      this.$emit('closeBoxDialog')
	  GLOBALS.marchSetsPoint('A_H5PT0075000699')
	}
  }
}
</script>

<style lang='less' scoped>
* {
    box-sizing: border-box;
}
.mask{
  position: fixed;
  z-index: 4;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,.7);
}
.content-box{
  position: fixed;
  z-index: 5;
  width: 4.8rem;
  left: 50%;
  margin-left: -2.4rem;
  top: 0;
  .bg{
      width: 100%;
      display: block;
  }
  .content{
    position: absolute;
    width: 100%;
    top: 0;
    height: 100%;
    overflow: hidden;
    .title{
        height: 24px;
        display: block;
        margin: 0 auto;
    }
    .icon{
        width: 1.6rem;
        height: 1.6rem;
        margin: 4rem auto 0;
        background: #FFD66D;
        border: 1px solid #fff;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 70%;
            display: block;
            margin: 0 auto;
        }
      &.boxIcon {
        margin: 2.5rem auto 0;
        background: none;
        border: none;
        width: 1.456rem;
        height: 1.11rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .hb-icon{
        width: 1.09rem;
        /*height: 1.6rem;*/
        margin: 0 auto;
        display: block;
        margin-top: 10%;
    }
    .crush-wrap{
        margin: .4rem auto;
        width: 2.23rem;
        height: 2.3rem;
        text-align: center;
        background: #da4027;
        border-radius: .08rem;
        border: .01rem solid #fff;
    }
    .medeal-icon{
        width: 1.49rem;
        height: 1.98rem;
        margin: .15rem auto 0;
        display: block;
    }
    .num{
        text-align: center;
        margin: .16rem 0 .216rem;
        font-size: .288rem;
        color: #FF6C35;
    }
    .explain,.explain1 {
      text-align: center;
      color: #856A0B;
      width: 3.5rem;
      margin: .08rem auto .096rem;
      line-height: .25rem;
      font-size: .16rem;
      white-space: nowrap;
    }
    .explain1{
      margin: .1rem 0 .12rem;
    }

    .text{
        font-size: 14px;
        text-align: center;
        margin-top: 5%;
        &.progress{
            display: flex;
            justify-content: center;
            align-items: center;
            p{
                font-size: 12px;
                margin-right: 4px;
            }
            .progress-bg{
                background: #DD3317;
                width: 46%;
                position: relative;
                height: 12px;
                border-radius: 3px;
                overflow: hidden;
                .progress-bar{
                    background: #FFCF52;
                    position: absolute;
                    height: 100%;
                    left: 0;
                    width: 30%;
                }
                span{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    left: 0;
                    font-size: 11px;
                    line-height: 12px;
                    text-align: center;
                }
            }
        }
    }
    .btn {
        display: flex;
        justify-content: center;
      .close,.go{
        width: 1.55rem;
        height: .64rem;
        margin: 0 .1rem;
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
    }
  }
}

</style>
