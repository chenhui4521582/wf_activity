<template>
  <div class="message">
    <div ref="hornDiv" class="c-horn-text">
      <ul ref="hornUl">
        <li v-for="(item,index) in lamp" ref="hornLi">
          <div class="horn-div">
            <p>恭喜<i>{{item.nickname}}</i></p>
            <p>中<i>{{item.awardsName}}</i></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {noticeList} from '../utils/api'

  export default {
    name: 'message',
    data() {
      return {
        ylbScroll: null,
        isMove: false,
        lamp: []
      }
    },
    methods: {
      // 跑马灯滚动
      scroll() {
        this.isMove = true
        setTimeout(() => {
          this.lamp.push(this.lamp[0])
          this.lamp.shift()
          this.isMove = false
        }, 1000)
      },
      async getNoticeList() {
        const { code, data } = await noticeList()
        if (code === 200) {
          this.lamp=data
        this.getNoticeList1()
        }
      },
      init() {
        this.getNoticeList()
      },
      getNoticeList1() {
        let self = this
        this.$nextTick(() => {
          var iMax = this.lamp && this.lamp.length;
          if (this.$refs.hornUl && this.$refs.hornUl.children) {
            var oLiHeight =
              this.$refs.hornUl.children.length &&
              this.$refs.hornUl.children[0].offsetHeight;
            var oUlWidth = this.$refs.hornUl.offsetWidth;
            var oDiv = this.$refs.hornDiv;
            var oLiWidth =
              this.$refs.hornUl.children.length &&
              this.$refs.hornUl.children[0].offsetWidth;
            var speed = oLiHeight;
            var that = this;
            var oUl = that.$refs.hornUl;
            var remarked = [];
            oUl.innerHTML = oUl.innerHTML + oUl.innerHTML;
            // oUl.style.height = oUl.children.length * oLiHeight + "px";
            clearInterval(this.timer);
            remark();
            this.timer = setInterval(sliders, 3500);
            var timer1 = setTimeout(() => {
              horizontalSlider();
            }, 1000);
          }

          function sliders() {
            clearTimeout(timer1);
            if (-oUl.offsetTop >= oLiHeight * (iMax - 1)) {
              oUl.style.webkitTransition = "all 0s";
              // oUl.style.top = oLiHeight+'px';
              oUl.style.top = speed + "px";
            }
            oUl.style.top = oUl.offsetTop - speed + "px";
            oUl.style.webkitTransition = "all .5s";
            setTimeout(() => {
              horizontalSlider();
            }, 500);
          }

          function horizontalSlider() {
            var fontSize = document.children[0].style.fontSize;
            for (let i = 0; i < remarked.length; i++) {
              remarked[i].li.style.marginLeft = "";
              if (remarked[i].top == -oUl.offsetTop) {
                remarked[i].li.style.marginLeft = `${remarked[i].left /
                fontSize.substring(0, fontSize.length - 2)}rem`;
                break;
              }
            }
          }

          function remark() {
            if (oUl.children) {
              for (let i = 0; i < oUl.children.length; i++) {
                if (
                  oUl.children[i].offsetWidth > oDiv.offsetWidth &&
                  oUl.children[i].offsetWidth - oDiv.offsetWidth > 10
                ) {
                  /* oUl.children[i].style.position='absolute';
                                        oUl.children[i].style.left=`-${oUl.children[i].offsetWidth-oDiv.offsetTop}px`; */
                  remarked.push({
                    li: oUl.children[i],
                    left: oDiv.offsetWidth - oUl.children[i].offsetWidth,
                    top: oUl.children[i].offsetTop + 1
                  });
                }
              }
            }
          }
        });
      },//走马灯
    },
    mounted() {
      this.init()
    },
    destroyed() {
      clearInterval(this.ylbScroll)
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import '../../../common/css/base.css';

  .message {
    display: flex;
    align-items: center;
    width: 1.86rem;
    height: 1.72rem;
    overflow: hidden;
    position: absolute;
    top: 8rem;
    left: .06rem;
    z-index: 2;
    .c-horn-text {
      width: 100%;
      position: relative;
      height: 1.55rem;
      overflow: hidden;
      ul {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
      }
      li {
        width: 1.71rem;
        height: 0.78rem;
        transition: all 1s ease 0.5s;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .horn-div {
          width: 1.71rem;
          height: 0.7rem;
          border-radius: .4rem;
          font-size: .18rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          background: rgba(32, 14, 21, 1);
          opacity: 0.76;
          /*background: url("./images/horn.png");*/
          /*background-size: 100% 100%;*/
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            overflow: hidden;
            padding: 0 0.15rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            white-space: nowrap;
            line-height: .2rem;
            i {
              color: #FFAF72;
            }
          }
        }
      }
    }
    /*.item-move {*/
    /*height: 0.8rem;*/
    /*position: relative;*/
    /*overflow: hidden;*/
    /*transition: all 0.3s;*/
    /*ul {*/
    /*width: 100%;*/
    /*}*/
    /*li {*/
    /*height: 0.8rem;*/
    /*line-height: 0.2rem;*/
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*p {*/
    /*white-space: nowrap;*/
    /*i{*/
    /*color: #FFAF72;*/
    /*}*/
    /*}*/
    /*}*/
    /*}*/
    /*.anim {*/
    /*transition: all 1s;*/
    /*margin-top: -0.8rem;*/
    /*}*/
  }
</style>
