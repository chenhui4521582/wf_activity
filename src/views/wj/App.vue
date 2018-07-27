<template>
  <div id="app">
    <div class="wf-container">
      <div class="wf-pop" id="wf-pop">
        <div class="header">
          <div class="h-tx">
            <img src="./images/img_photo.png" class="pic-tx pull-fl" />
            <div class="tx-box pull-fl" id="tx-box">
              <img src="./images/icon-leaf.png" class="pic-leaf" />
              <div class="leaf-num">sdfsf</div>
              <img src="./images/icon-add.png" alt="" class="icon-add" />
            </div>
          </div>
          <div class="wf-back">
            <img src="./images/icon-home.png" alt="" class="icon-home" />游戏大厅
          </div>
        </div>
        <div class="wf-title">
          <h4 class="pull-fl"><img src="./images/icon-pac.png" alt="" class="icon-pac"/>免费大礼包</h4>
          <a href="javascript:" class="pull-fr btn-useage" id="btn-useage">使用方法<em class="icon-ys icon-xl"></em></a>
        </div>
        <div class="groups">
          <div></div>
          <div>
            <div class="useage-methods">
              <span>复制礼包兑换码，在相应的游戏中找到兑换区域，输入兑换码,即可获得相应道具。</span>
            </div>
            <ul id="sUl">
              <li v-for="item in 10">
                <h4 class="g-title">这是标题
                    <a href="javascript:" class="btn-normal btn-lq btnLQ">免费领取</a>
                </h4>
                <p class="g-text">这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息这是描述信息</p>
                <div class="g-exchange">
                  <span>兑换码：<i id="foo">gpofpsdfdfdgdsf</i></span>
                  <a href="javascript:" class="btn-fz">复制兑换码</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  mounted() {
    //       
  }

}

</script>
<style lang="less" scoped>
@import '../../common/css/base.css';

.ball {
  width: 1.0rem;
  height: 1.0rem;
  background: #ccc;
  border-radius: 50%;
}

.wf-container {
  width: 100%;
  height: 100%;
  background: #eee;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

#wf-iframe {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}

a {
  text-decoration: none;
  color: #fff;
}

img {
  border: none;
}

.useage-methods {
  width: 91%;
  font-size: .2rem;
  color: #CCDDFF;

  margin: 0 auto;
  box-sizing: border-box;
  line-height: .35rem;
}

.useage-methods span {
  display: block;
  background: #1F2A4D;
  padding: .15rem .5rem .15rem .29rem;
  margin-bottom: .4rem;
}

#wf-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  transition: all 0s;
  display: none;
}

.g-exchange {
  display: flex;
  justify-content: space-between;
  font-size: 0.24rem;
}

.g-exchange a {
  color: #FF9933;
}

.g-exchange i {
  font-style: normal;
}

.wf-pop {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  background: #0F1B33;
  z-index: 10001;
  transition: right .2s;
}

.wf-pop .header {
  height: 1.08rem;
  background: linear-gradient(0deg, #132641, #183E68);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.3rem;
}

.pull-fl {
  float: left;
}

.pull-fr {
  float: right;
}

.wf-pop .h-tx {}

.wf-pop .h-tx .pic-tx {
  width: .48rem;
  height: .48rem;
  margin-right: 0.1rem;
}

.wf-pop .h-tx .tx-box {
  width: 2.16rem;
  height: .54rem;
  background: url(./images/leaf_bg.png);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
}

.wf-pop .h-tx .pic-leaf {
  width: .20rem;
  height: .20rem;
  margin: 0 .07rem 0 .13rem;
}

.wf-pop .icon-add {
  width: .41rem;
  height: .4rem;
}

.wf-pop .leaf-num {
  width: 1.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: .22rem;
  color: #FFD997;
}

.wf-pop .wf-back {
  width: 1.36rem;
  height: .54rem;
  background: url(./images/back.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  font-size: .16rem;
  color: #FFD997;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wf-pop .wf-back .icon-home {
  width: .38rem;
  height: .38rem;
  margin-right: .03rem;
}

.wf-pop .icon-pac {
  width: .18rem;
  height: .18rem;
}

.wf-pop .wf-title {
  color: #fff;
  height: .45rem;
  position: relative;
  margin: .5rem 0 .32rem 0;
}

.wf-pop .wf-title h4 {
  font-size: .34rem;
  display: flex;
  align-items: center;
}

.wf-pop .wf-title .icon-pac {
  width: .41rem;
  height: .38rem;
  margin: 0 .07rem 0 .22rem;
}

.wf-pop .wf-title .btn-useage {
  font-size: .20rem;
  color: #fff;
  display: flex;
  align-items: center;
  position: absolute;
  right: .30rem;
  bottom: .02rem;
}

.wf-pop .btn-useage .icon-ys {
  display: inline-block;
  width: .18rem;
  height: .18rem;
  margin-left: .08rem;
}

.wf-pop .btn-useage .icon-xl {
  background: url('./images/icon-xl.png') no-repeat;
  background-size: 100% 100%;
}

.wf-pop .btn-useage .icon-sl {
  background: url('./images/icon-sl.png') no-repeat;
  background-size: 100% 100%;
}

.wf-pop .groups {
  width: 100%;
  position: absolute;
  top: 2.36rem;
  bottom: 0;
  text-align: left;
  overflow: auto;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 0.2rem;
}

.wf-pop .groups li {
  width: 91%;
  background: #1F2A4D;
  color: #fff;
  margin: 0 auto .2rem;
  padding: 0 5.6%;
  box-sizing: border-box;
  padding-bottom: .2rem;
  &:last-child {
    margin: 0 auto;
  };
}

.wf-pop .groups li h4 {
  font-size: .28rem;
}

.wf-pop .groups li a.btn-normal {
  display: block;
  width: 1.35rem;
  height: .45rem;
  line-height: .45rem;
  text-align: center;
  font-size: .22rem;
  font-weight: normal;
}

.wf-pop .groups li a.btn-lq {
  background: url(./images/btn-lq.png) no-repeat;
  background-size: 100% 100%;
}

.wf-pop .groups .g-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .2rem 0 .32rem 0;
}

.wf-pop .groups .g-text {
  font-size: .22rem;
  line-height: 0.35rem;
  color: #CCDDFF;
  margin-bottom: .1rem;
}

.wf-pop .groups .g-percent {
  height: .22rem;
  background: #0F1B33;
  border-radius: .1rem;
  margin-top: .23rem;
  position: relative;
}

.wf-pop .groups .g-percent .g-percent-bg {
  min-width: 30% !important;
  height: .22rem;
  line-height: .22rem;
  font-size: 12px;
  background: #3A58B5;
  border-radius: .10rem;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
}

.wf-pop .groups .nodata {
  font-size: .22rem;
  color: #CCDDFF;
  text-align: center;
  padding-top: 20%;
}

.wf-pop .groups .nodata img {
  display: block;
  margin: 0 auto .33rem;
}

</style>
