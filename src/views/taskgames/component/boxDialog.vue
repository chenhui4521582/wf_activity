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
              <div class="btn">
                <div class="close" @click="close">
                  <img src="../img/dialog/box/enter.png" alt="">
                </div>
                <div class="go" @click="go">
                  <img src="../img/dialog/box/go.png" alt="">
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
	  default: null
	},
  },
  methods:{
    close () {
      this.$emit('closeBoxDialog')
    },
    go () {
      let channel = GLOBALS.getUrlParam('channel') || localStorage.getItem('APP_CHANNEL')
      let token = GLOBALS.getUrlParam('token') || localStorage.getItem('ACCESS_TOKEN')
      window.location.href = `https://wap.beeplay123.com/SpringOuting?channel=${channel}&token=${token}`
    }
  }
}
</script>

<style lang='less' scoped>
    * {
        box-sizing: border-box;
    }
    .shine{
        position: fixed;
        z-index: 3;
        width: 130%;
        top: 0;
        left: 50%;
        margin-left: -65%;
        animation: rotate 2s linear infinite;
    }
    .content-box{
        position: fixed;
        z-index: 4;
        width: 100%;
        height: 100%;
        left: 50%;
        margin-left: -50%;
        top:0;
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
                margin: 3.12rem auto 0;
                background: none;
                border: none;
                width: 1.82rem;
                height: 1.39rem;
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
                margin: .39rem 0 .53rem;
                font-size: .36rem;
                color: #FF6C35;
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
                width: 1.94rem;
                height: .8rem;
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

.content-box .new {
  position: absolute;
  width: 70%;
  left: 50%;
  margin-left: -35%;
  top:20%;
  .bg{
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    display: block;
    &.no-process{height: 5.3rem ;}
  }
  .new-content {
    position: absolute;
    z-index: 2;
    width: 100%;
    .icon {
      margin: .56rem auto .2rem;
      .title {
        margin: 0 auto .56rem;
        display: block;
        width: 3.64rem;
        height: .36rem;
      }
      .hb-icon{
        margin: 0 auto;
        display: block;
        width: 1.49rem;
        height: 1.49rem;
      }
    }
    .num{
      text-align: center;
      color: #fff;
    }
    .close{
      margin: .66rem auto 0;
      width: 2.4rem;
      height: .62rem;
      text-align: center;
      line-height: .62rem;
      background: #FFCF52;
      color: #A34C00;
      font-size: .26rem;
      border-radius:4px;
    }
  }

}
</style>
