import axios from 'axios';
import moment from 'moment'
import util from './utils.js'
moment.locale('zh-cn',{
      months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
      monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
      weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
      weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
      weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
      longDateFormat: {
        LT: 'Ah点mm分',
        LTS: 'Ah点m分s秒',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MMMD日',
        LLL: 'YYYY年MMMD日Ah点mm分',
        LLLL: 'YYYY年MMMD日ddddAh点mm分',
        l: 'YYYY-MM-DD',
        ll: 'YYYY年MMMD日',
        lll: 'YYYY年MMMD日Ah点mm分',
        llll: 'YYYY年MMMD日ddddAh点mm分'
      },
      meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
      meridiemHour: function (h, meridiem) {
        let hour = h;
        if (hour === 12) {
          hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
          meridiem === '上午') {
          return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
          return hour + 12;
        } else {
          // '中午'
          return hour >= 11 ? hour : hour + 12;
        }
      },
      meridiem: function (hour, minute, isLower) {
        const hm = hour * 100 + minute;
        if (hm < 600) {
          return '凌晨';
        } else if (hm < 900) {
          return '早上';
        } else if (hm < 1130) {
          return '上午';
        } else if (hm < 1230) {
          return '中午';
        } else if (hm < 1800) {
          return '下午';
        } else {
          return '晚上';
        }
      }
})
window.moment = moment
window.GLOBALS = {
	get shopUrl() {
        localStorage.setItem('showLoadPage', false)
        let url='';
        url = '../../../payment/#/mall';
        return url;
    },
	loopTime(_this,obj) {
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		// var fixTime = 0;
		var fixTime = 24 * 60 * 60 * 1000;
		var fixMornTime = 13 * 60 * 60 * 1000;

		var nowTime = hours*60*60*1000 + minutes*60*1000 + seconds* 1000;

		var lastTime = 0;

		if(fixTime > nowTime) {
			lastTime = fixTime - nowTime;
		}else {
			lastTime = fixTime - nowTime + 24 * 60 * 60 * 1000;
		}

		var that = this;
		timer();
		var t = setInterval(timer, 1000);
		function timer() {
			if(lastTime <= 1) {
				_this.$set(obj, 'time', '');
				clearInterval(t);
				that.loopTime(_this,obj);
			}
			var hour=that.Appendzero(Math.floor((lastTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
			var minute=that.Appendzero(Math.floor((lastTime % (1000 * 60 * 60)) / (1000 * 60)));
			var second=that.Appendzero(Math.floor((lastTime % (1000 * 60)) / 1000));
			_this.$set(obj, 'time', hour+':'+minute+':'+second);
   			lastTime = lastTime - 1000;

		}
	},
	Appendzero(obj) {
		if(obj<10) return "0" +""+ obj;
	    else return obj;
	},
	buryingPoint(id) {
        axios.post('//data-api.beeplay123.com/data/api/behaviorRecord/point', {
            behaviorEventId: id
        })
	},
	async buriedPoint(event_id,event_name,game_id,game_pos){
        //操作日期
        let date = moment().format('YYYY-MM-DD');
        //操作时间
        let time = moment().format('HH:mm:ss');
        //渠道id
        let _channel = this.getUrlParam('channel') ? this.getUrlParam('channel') : localStorage.getItem('APP_CHANNEL') 
        //请求
        let userInfo = JSON.parse(localStorage.getItem('user_Info'))
        let obj =  {
            event_id: event_id,//时间id
            event_name: event_name,//事件名称
            user_id: userInfo && userInfo.userId,//用户id
            project_id: 0,//项目id
            project_name: '平台',//项目名称
            target_project_id: game_id,//游戏id
            game_position: game_pos,//游戏位置
            channel_id: _channel,//渠道id
            generate_date: date,//行为发生日期
            generate_time: time,//行为发生时间
        }
        console.log(obj);
        
        axios.post('//hadoop-data.beeplay123.com', obj)
    },
    //跳转外接游戏方法
    jumpOutsideGame (url){
        util.jumpToGame({url:url})
    },
    async thirdSetsPoint(parmas){
      //操作日期
      let date = moment().format('YYYY-MM-DD');
      //操作时间
      let time = moment().format('HH:mm:ss');
      //渠道id
      let _channel = this.getUrlParam('channel') ? this.getUrlParam('channel') : localStorage.getItem('APP_CHANNEL') 
      //请求
      let userInfo = JSON.parse(localStorage.getItem('user_Info'))
      let defaultState = {
        user_id: userInfo && userInfo.userId,//用户id
        project_id: 0,//项目id
        project_name: '平台',//项目名称
        channel_id: _channel,//渠道id
        generate_date: date,//行为发生日期
        generate_time: time,//行为发生时间
      }
      
      //请求
      return axios.post('//hadoop-data.beeplay123.com', Object.assign(defaultState,parmas))
    },
    getUrlParam: function(ename) {
        var url = window.location.href;
        var Request = new Object();
        if(url.indexOf("?") != -1) {
            var str = url.split('?')[1];
            var strs = str.split("&");
            for(var i = 0;i<strs.length;i++) {
                Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }else {
            return '';
        }
        return Request[ename];
    },

}


// 与游戏对接方法
window.WapCall = {
    openGame(url) {
        location.href = url + '?channel=' + localStorage.getItem('APP_CHANNEL') + '&token=' + localStorage.getItem('ACCESS_TOKEN');
    },
    
}