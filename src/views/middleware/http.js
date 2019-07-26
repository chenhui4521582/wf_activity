class shareMiddleware {
    constructor () {
        this.channel = this.getUrlParams('channel')
        this.jumtUrl = {
            'wechatChannel': 'https://wap.beeplaying.com/payment/#/login?channel='+this.channel,
            'newDDWlogin': 'https://wap.beeplaying.com/loginPages/newDDWlogin.html?channel=' + this.channel,
            '100043': 'https://wap.beeplaying.com/wap/home/#/aldLogin?channel='+this.channel,
            '100061': 'https://wap.beeplaying.com/publicWap/loginPage.html#/?channel=' + this.channel,
            '110002': 'https://wap.beeplaying.com/payment/#/loginwechat?channel='+this.channel,
            '100060': 'https://wap.beeplaying.com/activities/wfgames.html?channel=' + this.channel,
            '100000': 'https://wap.beeplaying.com/payment/#/login?channel=' + this.channel,
            '100058': 'https://wap.beeplaying.com/downddw/',
            'other': 'https://wap.beeplaying.com/loginPages/failureLogon.html'
        }
    }
    getUrlParams (ename) {
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
    }
    wechatChannel () {
        let channel = ['110002', '110003', '110004'], result = false
        channel.map((el, i) => {
            if (this.channel.includes(el)) result = true
        })
        return result
    }
    specilChannel(){
        //判断特殊渠道，100000 100030(100034) 100031
        return (
            this.channel == '100000' ||
            this.channel == '100030' ||
            this.channel == '100034' ||
            this.channel == '100031'
        )
    }
    newDDWlogin () {
        return (
            this.channel == '100031' ||
            this.channel == '100030' ||
            this.channel == '110004005' ||
            this.channel == '110004004'||
            this.channel == '110004006' ||
            this.channel == '100051001' ||
            this.channel == '100051002' ||
            this.channel == '100044'
        )
    }
}
class ShareInit extends shareMiddleware {
    constructor(props) {
        super(props);
    }
    jump (url) {
        window.location.href = url
    }
    init () {
        if(this.wechatChannel()) {
            const url = this.jumtUrl.other
            this.jump(url)
            return false
        }
        if(this.newDDWlogin()) {
            const url = this.jumtUrl.newDDWlogin
            this.jump(url)
            return false
        }
        if(this.specilChannel()) {
            const url = this.jumtUrl['100000']
            this.jump(url)
            return false
        }

        let isInObject = ''
        for (let i in this.jumtUrl) {
            if(i == this.channel) {
                isInObject = i
                break
            }
        }
        if(isInObject) {
            let url = this.jumtUrl[isInObject]
            this.jump(url)
        }else {
            let url = this.jumtUrl['other']
            this.jump(url)
        }
    }
}

export default new ShareInit()
