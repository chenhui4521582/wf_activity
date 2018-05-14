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
	}
}


// 与游戏对接方法
window.WapCall = {
    openGame(url) {
        location.href = url + '?channel=' + localStorage.getItem('APP_CHANNEL') + '&token=' + localStorage.getItem('ACCESS_TOKEN');
    },
    
}