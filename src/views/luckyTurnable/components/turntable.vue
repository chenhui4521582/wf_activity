<template>
    <div id="app">222
        <div class="turn-wrap">
            <loading v-show="showPage"></loading>

            <div class="turn-content">
                <div class="turn-bg" :class="{'turn-animate':turnAnimate}" ref="wheel">
                    <ul v-if="awardsList">
                        <li v-for="(item,index) in awardsList.awards" :style="rotate[index]">
                            <span>{{item.awardsName}}</span><br>
                            <img :src="item.awardsImage | filter">
                        </li>
                    </ul>
                </div>
                <p class="turn-btn" @click="circle"></p>
            </div>
            <turnpop v-if = "showPop" :finalAwards = "finalAwards" :finalImg="finalImg"></turnpop>
        </div>
    </div>
</template>
<script>

import utils from '../../../common/js/utils.js'
import AppCall from '../../../common/js/AppCall.js';
import API from '../../../api';
import Vue from 'vue';

export default {
     name : 'app',
    data(){
        return{
            turnAnimate :false,
            lenCloc : 0,
            isStatr : false,
            awardsList : null, // 获得的奖品
            finalAwards :null, // 奖品列表
            getFinalIndex : null,
            finalImg : null ,
            showPop: false,
            showPage : true,

        }
    },
    components:{
        'loading' : () => import('../../../components/common/loading'),
        'turnpop' : () => import('./turnpop')
    },
    computed: {
		rotate() {
			var rotateArr = [];
			var d = 1/6;
			for(var i=0; i< 6; i++) {
				rotateArr.push('transform: rotate(' + d * i + 'turn)');
			}
			return rotateArr;
		}
	},
    mounted(){
        
        document.title = '幸运转盘'
        let _this = this;

        // let channel = utils.getUrlParam('channel'),
        //     url_token = utils.getUrlParam('token')
        //     localStorage.setItem('ACCESS_TOKEN',url_token),
        //     localStorage.setItem('APP_CHANNEL',channel)
        //     localStorage.setItem('APP_VERSION','1.0.0')
        // console.log(Vue)
        // let token = localStorage.getItem('ACCESS_TOKEN') ,
        //     channel = localStorage.getItem('APP_CHANNEL') 

        // Vue.http.headers.common['Authorization'] =  token
        // Vue.http.headers.common['App-Channel'] = channel
        // Vue.http.headers.common['App-Version'] = localStorage.getItem('APP_VERSION') ? localStorage.getItem('APP_VERSION') : '';
       
       this.getAwardsList()

    },
    methods:{
        getFinalAwards(){
            this.axios.post(API.luckyBeeting).then(data => {
                let params = data.data
                if(params.code == 200){
                    // params.data={description: "188金叶子", awardsType: "188金叶子", awardsName:"88金叶子"}
                    this.finalAwards = params.data;
                    let that = this
                    for(let i=0,len=that.awardsList.awards.length;i<len;i++){
                        if(params.data.awardsName == that.awardsList.awards[i].awardsName){
                            that.getFinalIndex = i
                            that.finalImg = that.awardsList.awards[i].awardsImage
                        }
                    }
                    that.operation(that.$refs.wheel,that.getFinalIndex,function() {
                        that.isStatr = false;
                        that.showPop = true;
                        setTimeout(function(){
        					that.showPop = false
                            // AppCall.backHome()
                        },3500)
                    });
                }else{
                    this.$toast.show({
                      message: params.message,
                      duration: 3000
                    });
                }
            })

        },
        getAwardsList(){
            this.axios.post(API.luckyStatus).then(data => {
                let params = data.data
                if(params.code == 200){
                    this.showPage = false
                    // params.data ={
                    //     "awards":[
                    //         { awardsName: '88金叶子', awardsImage: '//192.168.101.241/wap/imgtemp/leafes88.png' },
                    //         { awardsName: '188金叶子' , awardsImage: '//192.168.101.241/wap/imgtemp/leafes188.png' },
                    //         { awardsName: '288金叶子' , awardsImage: '//192.168.101.241/wap/imgtemp/leafes288.png' },
                    //         { awardsName: '666金叶子' , awardsImage: '//192.168.101.241/wap/imgtemp/leafes666.png' },
                    //         { awardsName: '8888金叶子' , awardsImage: '//192.168.101.241/wap/imgtemp/leafes8888.png' },
                    //         { awardsName: '免费套圈x1' , awardsImage: '//192.168.101.241/wap/imgtemp/ferruleicon.png' }
                    //     ],
                    //     "bettingTimes":0,
                    //     "consumerAmount":null,
                    //     "enabled":3,
                    //     "distanceOpen":5000,
                    //     "description":'hahaha'
                    // }
                    this.awardsList = params.data
                }else{
                    this.$toast.show({
					  message:params.message,
					  duration: 3000
					});
                }
            })
        },
        circle(){
            let that = this
            if(that.awardsList.awards.length == 0){
                that.$toast.show({
                  message: '转盘活动未开启',
                  duration: 3000
                });
                return
            }
            // 最终奖品
            this.getFinalAwards()
        },
        operation(wheel,ran,fn) {
    		if(!this.isStatr){
                this.isStatr = true;
                this.lenCloc++;
    			let sun = 9 * 360 //最小圈数 * 360
        		if(ran >= 6) {
        			ran = 0;
        		}
        		var soBuom = parseInt(Math.floor(Math.random() * 60) -30);
        		/*    旋转度数 = 上次度数+  + 当前数字 * 60 +随机角度  = 最终旋转度数     */
        		wheel.style.transform = "rotate(" + ((this.lenCloc * sun + ran * 60) + soBuom) + "deg)";
        		setTimeout(function() {
        			if(fn) {
        				fn();
        			}
        		}, 3000);
            }
    	}
    }
}
</script>
<style lang="less" scoped>
@import '../../../common/css/base.css';

@import '../index.less';
</style>
