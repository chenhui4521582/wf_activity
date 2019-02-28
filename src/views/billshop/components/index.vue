<template>
  <div class="bill-shop">
    <headers title="话费券商城"></headers>
    <div class="s-nav">
      <ul>
        <li class="nav-item bill-left">我的话费券：<span>{{ spCon&&spCon.accountBalance || '0.00'}}</span></li>
        <li class="nav-item award-right">
          <div class="item-box" @click="goMyAward">查看我的奖品<img src="../images/award-arrow.png" class="award-arrow"></div>
        </li>
      </ul>
    </div>
    <div style="padding-top: 52%;font-size: 0.3rem;" v-if="sLoading">正在加载</div>
    <div v-else>
      <div v-if="spCon&&spCon.categoryList.length">
        <div class="s-tab">
          <ul>
            <li :class="{'active': idx == index}" v-for="(item,index) in spCon&&spCon.categoryList" @click="getNewList(item,index)">{{item.name}}</li>
          </ul>
        </div>
        <div class="sp-items">
          <scroll :data="curItem">
              <ul>
                <li v-for="(item,i) in curItem" @click="goDetail(item,$event)">
                  <div class="pic-box">
                    <img :src="item.picture | filter">
                  </div>
                  <p class="sp-info">{{item.name}}</p>
                  <a href="javascript:" class="btn">{{item.purchasePrice}}话费券可兑</a>
                </li>
              </ul>
          </scroll>
        </div>
      </div>
      <div v-else style="padding-top: 52%;font-size: 0.3rem;">暂无数据</div>
    </div>
    <!-- 赚话费 -->
    <div class="bill-container">
      <a href="javascript:" class="btn-bill" @click="goTaskPage">去赚话费券</a>
    </div>
  </div>

</template>
<script>
import Headers from './Header'
import scroll from '../../../components/scroll/scroll.vue'
export default {
  data() {
    return {
      sTitle: ['好物推荐','虚拟卡券','游戏道具','手机数码'],
      spCon: null,
      curItem: null,
      idx: 0,
      sLoading: true
    }
  },
  mounted() {
    this.getShopList()
  },
  components: {
    Headers,
    scroll
  },
  methods: {
    goMyAward() {
      switch(this.getUrlParam('from')) {
        case 'bdWap':
          parent.location.href = 'https://wap.beeplay123.com/bdWap/#/personal?openMyWard=1'
          break;
        case 'jsWap':
          parent.location.href = 'https://wap.beeplay123.com/bdWap/#/personal?openMyWard=1'
          break;
        default:
          parent.location.href = 'https://wap.beeplay123.com/wap/home/#/personal?openMyWard=1'
      }
    },
    goTaskPage() {
      switch(this.getUrlParam('from')) {
        case 'bdWap':
          parent.location.href = `https://wap.beeplay123.com/bdWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
          break;
        case 'jsWap':
          parent.location.href = `https://wap.beeplay123.com/bdWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
          break;
        default:
          parent.location.href = `https://wap.beeplay123.com/wap/home/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
      }
    },
    getNewList(item,index) {
      this.idx = index
      this.curItem = item && item.productList
    },
    goDetail(item,e) {
      if(!e._constructed) {
          return;
      }
      let href = window.location.href
      if(href.indexOf('?') != -1) {
        window.location.href = href.split('#')[0]+'&parmas='+encodeURIComponent(JSON.stringify(item))+'#/detail'
      }else {
        this.$router.push('/detail?from='+this.getUrlParam('from')+'&parmas='+encodeURIComponent(JSON.stringify(item)))  
      }
      
      // this.$router.push({
      //   path: '/detail',
      //   query: {
      //     parmas: encodeURIComponent(JSON.stringify(item))
      //   }
      // })

    },
    getShopList() {
      this.axios.post('//ops-api.beeplay123.com/ops/api/exchangeMall/main')
        .then(res => {
          this.sLoading = false
          if(res.data.code == 200) {
            this.spCon = res.data.data
            this.curItem = this.spCon && this.spCon.categoryList[0].productList
          }
        })
    },
    //获取地址栏问号后面的参数值
    getUrlParam: function (ename) {
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
        let params = Request[ename] ? Request[ename].split('#')[0] : ''
        return params;
    }
  }
}
</script>
<style lang="less" scoped>
  a {
    text-decoration: none;
    color: #fff;
  }
  .bill-shop {
    height: 100%;
    min-height: 100vh;
    background: #0F1726;
    padding: 0 0.3rem;
    color: #fff;
    font-size: 0.24rem;
    
  }
  .s-nav {
    margin: 0.31rem auto 0.4rem;
    ul {
      display: flex;
      justify-content: space-between;
    }
    li {
      &.nav-item {
        width: 47.7272%;
        height: 0.7rem;  
      }
      &.bill-left {
        background: url(../images/bill-left.png) no-repeat center top;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-size: 0.28rem;
        }
      }
      &.award-right {
        background: url(../images/award-right.png) no-repeat center top;
        background-size: 100% 100%;
        .item-box {
          height: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: space-between;  
          padding: 0 0.29rem 0 0.3rem;
        }
        .award-arrow {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
    }
  }
  .s-tab {
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background:rgba(15,23,38,1);
      border:0.02rem solid rgba(30,46,76,1);
      border-radius:0.08rem;
    }
    li {
      height: 0.56rem;
      line-height: 0.56rem;
      flex: 1;
      font-size: 0.26rem;
      font-weight: bold;
      &.active {
        background:rgba(20,31,51,1);
        border-radius:0.08rem;
        color: #E39B25;
      }
    }
  }
  .sp-items {
    /*margin-top: 0.3rem;*/
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 1.4rem;
    top: 2.9rem;
    overflow-y: scroll;
    ul {
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .sp-info {
      max-width: 100%;
      overflow: hidden;/*超出部分隐藏*/
      white-space: nowrap;/*不换行*/
      text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
    li {
      flex: 0 0 47.727%;
      height: 3.15rem;
      background:rgba(20,31,51,1);
      border-radius:0.08rem;
      margin-bottom: 0.28rem;
      text-align: center;
      font-size: 0.3rem;
      max-width: 47.727%;
      .pic-box {
        width: 1.6rem;
        height: 1.6rem;
        /*background: #798397;*/
        margin: 0.2rem auto 0.22rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .btn {
        display: block;
        width:2.55rem;
        height:0.44rem;
        line-height:0.44rem;
        border:0.02rem solid rgba(255,255,255,1);
        border-radius:0.22rem;
        margin: 0.17rem auto 0;
        font-size: 0.22rem;
        font-weight: 400;
      }
    }
  }
  .bill-container {
    width: 100%;
    height:1.43rem;
    background:rgba(24,39,67,1);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    .btn-bill {
      font-size: 0.28rem;
      font-weight: bold;
      display: block;
      width:91.67%;
      height:0.9rem;
      line-height:0.9rem;
      background:rgba(238,111,11,1);
      border-radius:0.08rem;
      margin: 0.27rem auto 0;
      text-align: center;
    }
  }
</style>
