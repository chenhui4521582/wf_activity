import axios from 'axios';

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
        //用户信息
        var userInfo = JSON.parse(localStorage.getItem('user_Info'));
        if(!userInfo){
            let r = await axios.post(API.UserTransInfo);
            userInfo = r.data.data;
            localStorage.setItem('user_Info',JSON.stringify(userInfo))
        };
        // let userInfo = localStorage.getItem('user_Info');
        //渠道id
        let _channel = localStorage.getItem('APP_CHANNEL') || 100001;
        //请求
        axios.post('//hadoop-data.beeplay123.com', {
            event_id: event_id,//时间id
            event_name: event_name,//事件名称
            user_id: userInfo.userId,//用户id
            project_id: 0,//项目id
            project_name: '平台',//项目名称
            target_project_id: game_id,//游戏id
            // target_project_name: game_name,//游戏名称
            game_position: game_pos,//游戏位置
            channel_id: _channel,//渠道id
            generate_date: date,//行为发生日期
            generate_time: time,//行为发生时间
            residual_gold: userInfo.amount//金叶子余额
        })
    },
	
}


// 与游戏对接方法
window.WapCall = {
    openGame(url) {
        location.href = url + '?channel=' + localStorage.getItem('APP_CHANNEL') + '&token=' + localStorage.getItem('ACCESS_TOKEN');
    },
    
}