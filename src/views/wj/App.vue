<template>
  <div id="app">
    <div class="wf-container">
      <div class="wf-pop" id="wf-pop">
        <div class="header">
          <div class="h-tx">
            <img :src="userInfo.head | filter" class="pic-tx pull-fl" v-if="userInfo&&userInfo.head"/>
            <img src="./images/img_photo.png" class="pic-tx pull-fl" v-else/>
            <div class="tx-box pull-fl" id="tx-box">
              <img src="./images/icon-leaf.png" class="pic-leaf" />
              <div class="leaf-num">{{userInfo&&userInfo.amount}}</div>
            </div>
          </div>
          <div class="wf-back" v-if="!isHideMenu" @click.stop="goMenu">
            <img src="./images/icon-home.png" alt="" class="icon-home" />游戏大厅
          </div>
        </div>
        <div class="wf-title">
          <h4 class="pull-fl"><img src="./images/icon-pac.png" alt="" class="icon-pac"/>免费大礼包</h4>
          <a href="javascript:" class="pull-fr btn-useage" id="btn-useage" @click="handleTabUse">使用方法<em class="icon-ys" :class="isTabUse ? 'icon-sl':'icon-xl' "></em></a>
        </div>
        <div class="groups">
          <div>
            <div class="useage-methods" :class="isTabUse ? 'useage-tips':'' ">
              <span>复制礼包兑换码，在相应的游戏中找到兑换区域，输入兑换码,即可获得相应道具。</span>
            </div>
            
            <ul id="sUl" v-if="cdkArr && cdkArr.length">
              <li v-for="item in cdkArr">
                <div v-if="item.IF_GET">
                  <h4 class="g-title">{{item.gameCdkeyRsp.name}}</h4>
                  <p class="g-text">{{item.gameCdkeyRsp.description}}</p>
                  <div class="g-exchange">
                    <span>兑换码：<i>{{item.gameCdkeyRsp.cdKey}}</i></span>
                    <a href="javascript:" class="btn-fz"
                      v-clipboard:copy=item.gameCdkeyRsp.cdKey
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                    >复制兑换码</a>
                  </div>
                </div>
                <div v-else>
                  <h4 class="g-title">{{item.gameCdkeyRsp.name}}
                    <a href="javascript:" class="btn-normal btn-lq btnLQ" @click="getAward(item)" v-if="item.gameCdkeyRsp.remainNum*100 > 0">免费领取</a>
                    <a href="javascript:" class="btn-normal btn-gq btnLQ" v-else>已领完</a>
                  </h4>
                  <p class="g-text">{{item.gameCdkeyRsp.description}}</p>
                  <div class="g-percent">
                    <div class="g-percent-bg" :style="{width: item.gameCdkeyRsp.remainNum*100+'%'}">{{item.gameCdkeyRsp.remainNum*100}}%剩余</div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="nodata-box" v-else>
              <img src="./images/nodata.png" class="nodata">
              <p>礼包正在路上，下次再来看看吧~</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        userInfo: null,
        cdkArr: null,
        isTabUse: false,
        curlink: null,
        hideBackArr: ['100037','100033001'],
        curChannel: null,
        curToken: null,
        sdkBdWap: ['100039','100040','100041','100042','100045','100046',
            '100001','100022','100023','100026','100028','100027','100029','100035','100036','100038', '100006','100049']
      }
  },
  mounted() {
    

    this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL'):this.getUrlParam('channel')
    this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN'):this.getUrlParam('token')

    

    let cururl = window.location.href
    // this.curlink = cururl.indexOf('?') != -1 ? cururl.split('?wf_cur_link=')[1] : cururl
    this.curlink = this.getUrlParam('wf_cur_link')
    // console.log('this.curlink:::', this.curlink)
    if(this.curChannel && this.curChannel.indexOf('100') != -1) {
      this.getUserInfo()
      this.getCdkeyStatus()
    }
    
  },
  computed: {
    isHideMenu() {
      return this.hideBackArr.includes(this.curChannel)
    }
  },
  methods: {
    //获取地址栏问号后面的参数值
    getUrlParam: function (ename) {
        // var url = document.referrer;
        var url = window.location.href;
        var Request = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.split('?')[1];
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        } else {
            return '';
        }
        return Request[ename];
    },
    goMenu() {
      localStorage.removeItem('gurlSDK')
      if(this.sdkBdWap.includes(this.curChannel)){
        top.location.href = 'https://wap.beeplay123.com/bdWap?channel='+this.curChannel
      }else {
        top.location.href = 'https://wap.beeplay123.com/wap/home?channel='+this.curChannel
      }
    },
    onCopy() {
      this.$toast.show({
        message: '复制成功！',
        duration: 1500
      });
    },
    onError() {
      this.$toast.show({
        message: '复制失败！',
        duration: 1500
      });
    },
    getAward(item) {
      this.axios.post('//ops-api.beeplay123.com/ops/api/cdkey/getAwards', {
        value: item.gameCdkeyRsp.batchId
      },{
            headers: {
                'App-Channel': this.curChannel,
                'Authorization': this.curToken
            }
        }).then((res)=> {
        if(res.data.code == 200) {
          this.$toast.show({
            message: '领取成功',
            duration: 1500
          })
          this.getCdkeyStatus()
        }
      })
    },
    handleTabUse() {
      this.isTabUse = !this.isTabUse
    },
    getUserInfo() {
      this.axios.post('//uic-api.beeplay123.com/uic/api/user/login/transInfo',{},{
            headers: {
                'App-Channel': this.curChannel,
                'Authorization': this.curToken
            }
        })
        .then((res)=> {
          if(res.data.code == 200) {
            this.userInfo = res.data.data
          }
        })
    },
    getCdkeyStatus() {
      this.axios.post('//ops-api.beeplay123.com/ops/api/cdkey/status', {
        value: this.curlink
        // value: 'http://www.5idhf.com/sssj'
      },{
            headers: {
                'App-Channel': this.curChannel,
                'Authorization': this.curToken
            }
        }).then((res)=> {
        if(res.data.code == 200) {
          this.cdkArr = res.data.data
        }
      })
    }
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

/*#wf-iframe {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}*/

a {
  text-decoration: none;
  color: #fff;
}

img {
  border: none;
}

.useage-methods {
  width: 91%;
  font-size: .24rem;
  color: #CCDDFF;
  margin: 0 auto;
  box-sizing: border-box;
  line-height: .35rem;
  &.useage-tips {
    height: 0;
    overflow: hidden;  
  }
  
}

.useage-methods span {
  display: block;
  background: #1F2A4D;
  padding: .15rem .5rem .15rem .29rem;
  margin-bottom: .4rem;
}

/*#wf-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0s;
  display: none;
}*/

.g-exchange {
  display: flex;
  justify-content: space-between;
  font-size: 0.24rem;
}
.g-exchange span {
  display: inline-block;
  max-width: 3.0rem;
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis; 
}
.g-exchange a {
  color: #FF9933;
}

.g-exchange i {
  font-style: normal;
  font-size: 0.22rem;
}

.wf-pop {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  background: #0F1B33;
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
  background: url(./images/leaf-bg.png) no-repeat;
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
  width: 1.1rem;
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
  font-size: .24rem;
  color: #fff;
  display: flex;
  align-items: center;
  position: absolute;
  right: .30rem;
  bottom: .06rem;
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
.wf-pop .groups li a.btn-gq {
  background: url(./images/btn-gq.png) no-repeat;
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

.wf-pop .groups .nodata-box {
  text-align: center;
  p {
    font-size: 0.24rem;
    color: #CCDDFF;
    padding-top: 0.3rem
  }
}

.wf-pop .groups .nodata {
  font-size: .22rem;
  color: #CCDDFF;
  text-align: center;
  padding-top: 10%;

}

.wf-pop .groups .nodata img {
  display: block;
  margin: 0 auto .33rem;
}

</style>
