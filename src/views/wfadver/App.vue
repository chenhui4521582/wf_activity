<template>
  <div class="pop-game-parent">
    <iframe frameborder="0" width="100%" height="100%" id="iframe" style="position: fixed;"></iframe>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        handselNew: '',
        showLoading: true,
        // tabList:['盈利榜','财富榜'],
        tabList:['盈利榜'],
        isTest: false,
        isShowPic: true,
        showHead:false,
        getHeadImg:"",
        nickName:"",
        currentTabid:0,
        showLoading:false,
        profitNext:'',
        isShowPrevProfit: false,
        popToken: ''
      }

    },
    methods: {
      close() {
        //this.$emit('isShow', false)
        // console.log('关闭')
        if(parent.closeWebView){
          parent.closeWebView()
        }
      },
      //获取地址栏问号后面的参数值新
      getUrlParamObj: function (ename) {
        var url = window.location.href;
        var Request = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.split('?')[1];
          var strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
            Request[strs[i].split("=")[0]] = strs[i].split("=")[1];
            // 对奇速贷  用户id 如MjcyOTAzOA==  这种类型
            if(strs[i].split("=").length > 2){
              Request[strs[i].split("=")[0]] = strs[i].split("=")[1] + '=='
            }
          }
        }

        return ename ? (Request[ename] ? Request[ename].split('#')[0] : '') : Request;
      },
    },
    beforeMount() {
    },
    async mounted() {
      document.getElementById('iframe').src=decodeURIComponent(this.getUrlParamObj('adurl'))
      if(parent.loadPage) {
        parent.loadPage()
      }
    },

    beforeDestroy(){

      bus.$off('getProfitNext');
    }
  }
</script>
<style lang="less">
</style>
