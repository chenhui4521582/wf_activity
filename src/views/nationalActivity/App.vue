<template>
  <div id="app">
    <!-- <div id="router-content"> -->
        <div class="national-wrap">
            <p class="back" @click="back" v-if="!isApp"></p>
            <div class="national-bg">
                <p>购礼包玩抽奖赢<i>iphone</i></p>
                <!-- 礼包 -->
                <div class="giftbg">
                    <div v-for="item in giftList">
                        <p class="giftimg" :class="{'gift88':item.price==88}"></p>
                        <p class="gift-detail" v-html="item.content"></p>
                        <p class="buybtn" :class="{'gray':item.buyFlag == 0}" @click="goRecharge(item)">&yen;{{item.price}}</p>
                        <p class="leftnum">每人限购{{item.limitTimes}}次</p>
                    </div>
                </div>
                <div class="lotterybg">
                    <p class="icon"></p>
                    <!-- 跑马灯 -->
                    <div class="marqueen-wrap">
                        <ul class="marqueen" :style="{top}" :class="{'no-trans':isLast}">
                            <li v-for="item in marqueenList" >
                                恭喜{{item.nickName}}中奖<i>{{item.awardsName}}</i>
                            </li>
                            <li v-for="(item,index) in marqueenList" v-if="index==0">
                                恭喜{{item.nickName}}中奖<i>{{item.awardsName}}</i>
                            </li>
                        </ul>
                    </div>
                    <!-- 九宫格抽奖 -->
                    <ul class="lottery-detail">
                        <li class="checked rotate1">
                            <span>
                                <img src="./images/awards/1.png">
                            </span>
                        </li>
                        <li class="rotate2">
                            <span>
                                <img src="./images/awards/2.png">
                            </span>
                        </li>
                        <li class="rotate3">
                            <span>
                                <img src="./images/awards/3.png">
                            </span>
                        </li>
                        <li class="rotate0">
                            <span>
                                <img src="./images/awards/0.png">
                            </span>
                        </li>
                        <li>
                            <span @click="startLottery" class="nowidth">
                                <i>抽奖</i><br>
                                <i>剩余抽奖券:{{lotteryList && lotteryList.bettingTimes}}</i>
                            </span>
                        </li>
                        <li class="rotate4">
                            <span>
                                <img src="./images/awards/4.png">
                            </span>
                        </li>
                        <li class="rotate7">
                            <span>
                                <img src="./images/awards/7.png">
                            </span>
                        </li>
                        <li class="rotate6">
                            <span>
                                <img src="./images/awards/6.png">
                            </span>
                        </li>
                        <li class="rotate5">
                            <span>
                                <img src="./images/awards/5.png">
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <transition name="fade">
                <div class="lottery-pop" v-if="showAwardspop">
                    <div class="shineing"></div>
                    <div class="lottery-bg">
                        <div class="lottery-detail">
                            <span>
                                <!-- <img :src="awardsImg"> -->
                                <img :src='imgNum'>
                            </span><br>
                            {{betting && betting.awardsName}}<br>
                            <i>请前往背包查看</i>
                        </div>
                        <p class="closebtn" @click="closePop">我知道了</p>
                    </div>
                </div>
            </transition>
            <loading v-show="showLoading"></loading>
        </div>
    <!-- </div> -->
</div>
</template>

<script>
import utils from '../../common/js/utils.js'
import AppCall from '../../common/js/AppCall.js';
import API from '../../api';
import loading from '../../components/common/loading.vue'
export default {
    name : 'app',
    data(){
        return{
            giftList : null,
            marqueenList : null,
            lotteryList : null,
            betting :null,
            activeIndex : 0,
            isLast: false,
            awardsImg :'',
            showAwardspop : false,
            showLoading : true,
            stopStep: -1,
            runT: null,
            step: 0,
            during: 2,
            isEnd :false,
            imgNum : 0,
            _appChannel : '',
            isApp : false
        }
    },
    mounted(){
        document.title = '国庆礼包'
        let _this = this;
        this.isApp = utils.getUrlParam('isapp') != ''
        if(this.isApp){
            AppCall.getUserData(function(params) {
                params = JSON.parse(params);
                if(params && params.userId !== '') {
                    if(params.userToken) {
                        window._token1 = params.userToken;
                    }else {
                        window._token1 = '';
                    }
                }else{
                    window._token1 = '';
                }
                localStorage.setItem('ACCESS_TOKEN',window._token1);
                AppCall.getProductData(function(productParams) {
                    productParams = JSON.parse(productParams);
                    if(productParams) {
                        localStorage.setItem('APP_CHANNEL',productParams.appChannel || localStorage.getItem('APP_CHANNEL'));
                        localStorage.setItem('APP_VERSION',productParams.appVersion);
                        // 300001
                        _this._appChannel =String(productParams.appChannel);
                    }
                    // 奖品列表
                    _this.getAwardsList()
                    _this.getLotteryList()
                    _this.getBannerList()
                })
            });
        }else{
            this.getAwardsList()
            this.getLotteryList()
            this.getBannerList()
        }
    },
    computed:{
        top(){
            return -this.activeIndex * (.49) + 'rem';
        }
    },
    components:{
        loading
    },
    methods:{
        getAwardsList(){
            this.axios.post(API.nationalGiftList).then((response) => {
                if(response.data.code == 200 && response.data.data) {
                    this.showLoading = false
                    this.giftList = response.data.data.leaguePacksList;
                }
            })
        },
        getBannerList(){
            this.axios.post(API.bannerList,{value : 2}).then((response) => {
                if(response.data.code == 200) {
                    this.marqueenList = response.data.data;
                    setInterval(_ => {
                        this.isLast = false
                          if(this.activeIndex < this.marqueenList.length) {
                            this.activeIndex += 1;
                          } else {
                            this.activeIndex = 1;
                            this.isLast = true
                          }
                    }, 2000);
                }
            })
        },
        getLotteryList(){
            this.axios.post(API.lotteryList,{value : 2}).then((response) => {
                if(response.data.code == 200) {
                    this.lotteryList = response.data.data;
                }
            })
        },
        getBetting(){
            this.axios.post(API.betting,{value : 2}).then((response) => {
                if(response.data.code == 200) {
                    this.betting = response.data.data;
                }
            })
        },
        goRecharge(item){
            console.log(item);
            if(item.buyFlag == 0){
                return
            }
            if(this.isApp){
                if(this._appChannel.indexOf('300001') === 0) {
					item.thirdId = item.thirdId ? item.thirdId:'';
					AppCall.gameRecharge({
						GameOrderNumber: item,
						GameRechargeMoney: item.price,
						productId: item.thirdId
					});
				}else {
					AppCall.gameRecharge({
						GameOrderNumber: item,
						GameRechargeMoney: item.price
					});
				}
            }else{
                localStorage.setItem('JDD_PARAM', JSON.stringify(item));
                localStorage.setItem('goNational', true);
                location.href = "../../wap/payment/#/payment"
            }
        },
        startLottery(){

            let that = this
            if(this.lotteryList && this.lotteryList.bettingTimes == 0){
                this.$toast.show({
                    message: '抽奖次数不足',
                    duration: 2000
                });
            }else if(!this.isEnd){
                let that = this
                this.showLoading = true
                this.axios.post(API.betting,{value : 2}).then((response) => {
                    if(response.data.code == 200) {
                        this.showLoading = false
                        this.betting = response.data.data;
                        if(this.lotteryList){
                            let that = this
                            let awardsList = this.lotteryList.awards
                            this.isEnd = true
                            for (let i in awardsList){
                                if(awardsList[i].awardsName == this.betting.awardsName){
                                    switch(this.betting.awardsName){
                                        case '10元话费':
                                            this.stopStep = 1
                                            break
                                        case 'iPhone8':
                                            this.stopStep = 2
                                            break
                                        case '100M流量':
                                            this.stopStep = 3
                                            break
                                        case '2元话费':
                                            this.stopStep = 8
                                            break
                                        case '6元话费':
                                            this.stopStep = 6
                                            break
                                        case '8元话费':
                                            this.stopStep = 5
                                            break
                                        case '88元话费':
                                            this.stopStep = 7
                                            break
                                        case '888元话费':
                                            this.stopStep = 4
                                            break
                                    }
                                }
                            }
                            that.runT=setTimeout(that.runF,100);
                        }
                    }
                })
            }
        },
        closePop(){
            this.showAwardspop=false
            location.reload()
        },
        runF(num) {
            if(this.step>=(32+this.stopStep))//设置转动多少圈
            {
                $(".rotate"+(this.step%8)).addClass('checked');
                let num = this.step%8
                this.step=this.stopStep;
                this.isShow = true;
                // this.stopStep = this.step%8
                this.imgNum = require('./images/awards/'+num+'.png')
                this.showAwardspop = true
                clearTimeout(this.runT);//停止转动
                this.stopStep = this.currentId;
                this.isEnd = false;
                return;
            }
            if(this.step>=(24+num)){ //在即将结束转动前减速
                this.during+=1;
            }else{
              if(this.during<=2){ //控制中间转速
                  this.during=2;
              }
              this.during--;
            }
            this.step++;
            $(".lottery-detail li").each(function(index, element) {
                $(this).removeClass('checked');
            });
            $(".rotate"+(this.step%8)).addClass('checked');
            this.runT=setTimeout(this.runF,this.during*100);
        },
        back(){
            location.href = "../../channel/newokooo/home"
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../common/css/base.css';
@import './index.less';

#app {
  width: 100%;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.24rem;
}
#router-content {
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  /*padding-bottom: 1.35rem;*/
}
</style>
