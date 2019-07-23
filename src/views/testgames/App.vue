<template>
    <div>
        <ul class="qb_ul" v-if="showlist">
            <li v-for="(item,index) in gamelistNew" :key="index">
                <div class="box">
                    <span><img :src="item.icon | filter"></span><br>
                    <span>{{item.name}}</span><br><br>
                    <br>
                    <br>
                    <button class="agent-crown-list-copy" v-clipboard:copy="createurl(item.url)">复制地址</button>
                    <br>
                    <br>
                    <br>
                    <div style="color: red;" @click="createQrc(item)">点击生成二维码</div>
                </div>
                <div :class="'home-container'+item.id" style="flex:1;width: 50%">
                    <canvas :id="'qrccode-canvas'+item.id" style="height: 164px; width: 164px;"></canvas>
                </div>
            </li>
        </ul>
        <hr v-if="showlist">
        请输入游戏地址：
        <div class="input">
            <input type="text" v-model="gameurl">
        </div>
        <span class="agent-crown-list-copy" v-clipboard:copy="createurl(gameurl)" v-if="gameurl" style="color: blue">复制地址</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span style="color: red;" @click="createQrc(item)" v-if="gameurl">点击生成二维码</span>
        <div :class="'home-container'+item.id" style="flex:1;width: 50%">
            <canvas :id="'qrccode-canvas'+item.id" style="height: 164px; width: 164px;"></canvas>
        </div>
        <hr>
    </div>
</template>

<script>
    import utils from '../../common/js/utils.js'
    import AppCall from '../../common/js/AppCall.js';
    import API from '../../api';
    import base64url from 'base64-url'
    import QRCode from 'qrcode';
    //渠道号100037
    export default {
        name: 'app',
        data(){
            return {
                gameslist: [{"id":1050,"name":"新仙剑","type":204,"url":"http://sdk.zhijiangames.com/wanfeng/init/game/xxjqxz?external=1","icon":"/group1/M00/00/56/CiFVy1sx2ISAYQ8jAABe9504kqs358.jpg","remark":"111","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":124,"name":"梦想飞镖","type":1,"url":"/dart/","icon":"/cdn/icon/dart.png","remark":"竞猜赢百万金叶","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"/group1/M00/01/7A/wKgKO1mxOtKATC3xAAEvA2shlII171.png","featured":0},{"id":1170,"name":"七十二变","type":210,"url":"http://d.fire2333.com/xdpt/wanfeng/index/2061/100389?external=1","icon":"/group1/M00/00/5B/CiFVy1tCxZ2AKW20AAB4Xe10WDo728.jpg","remark":"","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1178,"name":"独角兽","type":220,"url":"http://mlcdn2.hotgamehl.com/quick/index_jdd.html?external=1","icon":"/group1/M00/00/5C/CiFVy1tEJVyAK9YIAAB4Xe10WDo493.jpg","remark":"","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1179,"name":"传奇来了","type":209,"url":"http://t.djsh5.com/c/login/A7896.php?rGTaSneKdZ4yx&external=1","icon":"/group1/M00/00/5C/CiFVy1tEOnGACRPTAAFyI50aBR4578.jpg","remark":"22","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":935,"name":"斗地主","type":15,"url":"https://wap.beeplaying.com/landlord","icon":"/group1/M00/00/4A/CiFVy1r6oZiAbtE3AAAw7fv-iyE874.png","remark":"斗地主","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"/group1/M00/00/4E/CiFVy1sGWE-AashaAAAV5g-POIY479.png","featured":1},{"id":963,"name":"猫","type":0,"url":"/cat/","icon":"/group1/M00/00/4F/CiFVy1sNSpqAcR0IAAA0Xvqc76E215.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1258,"name":"大话梁山","type":232,"url":"http://sdk.zhijiangames.com/wanfeng/init/game/dhls?external=1","icon":"/group1/M00/00/63/CiFVy1tVfFWACtkeAAAgHIK7RSA200.png","remark":"","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1261,"name":"别惹小毒妃","type":233,"url":"http://games1.gamemei.cn/xiaodufei_game/wanfeng.html?external=1","icon":"/group1/M00/00/63/CiFVy1tVoIqAI8zWAAAgHIK7RSA327.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1262,"name":"我要修仙","type":215,"url":"http://www.mengdiguo.com/xx_hl_norm_channel_wf.html?external=1","icon":"/group1/M00/00/63/CiFVy1tW316ACyoqAAAjIu2gVeU065.png","remark":"","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1263,"name":"小小屠龙","type":224,"url":"http://s.zhangyu39.com/h5/playstation/index/package_id/1374?external=1","icon":"/group1/M00/00/63/CiFVy1tX2xKAaiU5AAAgHIK7RSA721.png","remark":"","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1267,"name":"大天使之剑","type":214,"url":"http://37.com.cn/h5game/public/?pid=491&gid=1002706&external=1","icon":"/group1/M00/00/64/CiFVy1tYR3yANIljAAAbj6S3ac0325.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1272,"name":"极品修真","type":223,"url":"https://jpxz.iwanpa.com/games/301044/game.html?external=1","icon":"/group1/M00/00/65/CiFVy1ta61OAdI8xAAEpSTQrppo400.png","remark":"","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1278,"name":"仙迹","type":231,"url":"http://119.147.23.193:8092/play.php/100079100829/d72d05179c48b2d5/wanfengh5sdk_xj_001?external=1","icon":"1","remark":"","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":1,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1043,"name":"侠客行","type":205,"url":"http://test.zhijiangames.com/wanfeng/init/game/xkx?external=1","icon":"/group1/M00/00/55/CiFVy1swXo-AEUk5AABe9504kqs464.jpg","remark":"21","redFlag":false,"tagList":null,"bigIcon":"/group1/M00/00/55/CiFVy1swXpOAPv6mAAKHQlTu0Y8247.jpg","bigIconDesc":"","sort":2,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":125,"name":"梦想桌球","type":2,"url":"/billiards/","icon":"/cdn/icon/bill.png","remark":"500万人人可得","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":2,"recentlyPlayed":false,"jackpotStatus":0,"corner":"/group1/M00/00/4E/CiFVy1sFMrmARh2nAAAV5g-POIY989.png","featured":0},{"id":1044,"name":"花千骨","type":206,"url":"http://zm.hqg2.961u.com/lg/c70336df7ae039a5211c4e9ee6fab8a6/?external=1","icon":"/group1/M00/00/55/CiFVy1swrkGAAYqnAAB4Xe10WDo291.jpg","remark":"111","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":3,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":126,"name":"牛牛","type":14,"url":"/taurus/","icon":"/cdn/icon/bike.png","remark":"新玩法博100倍奖励","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":3,"recentlyPlayed":false,"jackpotStatus":null,"corner":"/group1/M00/00/4E/CiFVy1sFNeCAD3KwAAAV5g-POIY077.png","featured":0},{"id":1042,"name":"传奇荣耀","type":208,"url":"http://h5yun.ledu.com/api/index/gameRedirect/1009/1000024?external=1","icon":"/group1/M00/00/55/CiFVy1srhdSAHoOJAAFyI50aBR4626.jpg","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":4,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1052,"name":"越山","type":211,"url":"http://fa.jygame.net/yssdk/channel/wanfeng/login.html?appID=1001&external=1","icon":"/group1/M00/00/56/CiFVy1syBgCAHaq6AAFyI50aBR4826.jpg","remark":"4","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":5,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":22,"name":"蜀山世界","type":0,"url":"http://www.5idhf.com/sssj_sdk/wanfeng?external=1","icon":"/group1/M00/00/3F/CiFVy1rMc3SATcp1AABKW1D4AqY133.png","remark":"123213","redFlag":false,"tagList":null,"bigIcon":"/group1/M00/00/3F/CiFVy1rMc3mADtEMAABvek5DQFg997.png","bigIconDesc":"","sort":6,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1062,"name":"传奇荣耀2","type":208,"url":"http://h5yun.ledu.com/api/index/gameRedirect?game_id=1009&platform_id=1000024&external=1","icon":"/group1/M00/00/56/CiFVy1szgVqAFm91AAiQ6yPN7mc029.jpg","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":6,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":129,"name":"多多三国","type":9,"url":"/kingdom/","icon":"/cdn/icon/kingdom.png","remark":"单注可得千万奖励","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":6,"recentlyPlayed":false,"jackpotStatus":null,"corner":"/group1/M00/00/4E/CiFVy1sGU0qAK-BDAAAV5g-POIY301.png","featured":1},{"id":1067,"name":"不思议衣橱","type":212,"url":"http://sharesdk.shishagame.com/api/beeplay123_login.php?gameId=212&external=1","icon":"/group1/M00/00/57/CiFVy1s1rAyAJkOOAAB4Xe10WDo466.jpg","remark":"11","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":7,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":93,"name":"醉玲珑","type":0,"url":"http://zll.allrace.com/zll_sdk/wanfeng?external=1","icon":"/group1/M00/00/44/CiFVy1rdTWeAG2XzAAFyI50aBR4991.jpg","remark":"醉玲珑","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":7,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":130,"name":"热血军团","type":4,"url":"/legion/","icon":"/cdn/icon/wars.png","remark":"最高加奖100%","redFlag":false,"tagList":null,"bigIcon":null,"bigIconDesc":null,"sort":7,"recentlyPlayed":false,"jackpotStatus":null,"corner":"/group1/M00/01/7A/wKgKO1mxPQyAevrGAACPm44lEAM467.jpg","featured":0},{"id":1219,"name":"清宫无间斗","type":225,"url":"http://kingh5.zhisnet.cn/platforms/GameWanFeng.html?external=1","icon":"/group1/M00/00/60/CiFVy1tNmRaAZnpgAAEpSTQrppo146.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":8,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1068,"name":"凡人","type":213,"url":"http://sdk.zhijiangames.com/wanfeng/init/game/frfxz?external=1","icon":"/group1/M00/00/57/CiFVy1s14F6AEafYAABe9504kqs861.jpg","remark":"1111","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":9,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1070,"name":"绯雨骑士团","type":207,"url":"https://lym.sanguoh5.com:9903/lianyun/wf.html?external=1","icon":"/group1/M00/00/57/CiFVy1s14v6AExJTAABmawMJUgY177.jpg","remark":"11","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":10,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":429,"name":"乐赢三张","type":11,"url":"/tcard/","icon":"/group1/M00/00/31/CiFVy1pWySOAT8YzAAAVgzT_z2s592.jpg","remark":"1","redFlag":false,"tagList":null,"bigIcon":null,"bigIconDesc":null,"sort":11,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1220,"name":"热血江湖传","type":217,"url":"http://h.miyugame.com/union?miyuId=1401&channelId=5178&cpsId=1000&external=1","icon":"/group1/M00/00/60/CiFVy1tNnRWAch1NAAEL9YXXD40328.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":11,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":992,"name":"逐日战神","type":203,"url":"http://h5.uuuo.com/channel/wf/1001?external=1","icon":"/group1/M00/00/51/CiFVy1sXV0eAJfhuAAFyI50aBR4007.jpg","remark":"11","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":11,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1169,"name":"上古诸神","type":216,"url":"http://xy-cdn-sgzsh5.suyugame.com/web/xy/wanfeng.html?external=1","icon":"/group1/M00/00/5A/CiFVy1s_cUeAGgD7AAFyI50aBR4169.jpg","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":12,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1224,"name":"行星裂痕","type":222,"url":"http://sharesdk.shishagame.com/api/beeplay123_login.php?gameId=222&external=1","icon":"/group1/M00/00/61/CiFVy1tP-EKAGDCuAAEL9YXXD40198.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":13,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1226,"name":"时光幻境","type":220,"url":"http://sdk.djsh5.com/c/login/jiangDD.php?GhIyAkIykjrLT&external=1","icon":"/group1/M00/00/62/CiFVy1tQIFGAOzAvAAAOU6jIYMw210.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":14,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1251,"name":"神奇三国","type":226,"url":"http://soeasysdk.com/soeasysr/gameini/sqsg/sqsg_wfindex.html?external=1","icon":"/group1/M00/00/62/CiFVy1tRVriAaTCJAAEpSTQrppo033.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":15,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1252,"name":"楚乔传之谍纸天眼","type":227,"url":"http://soeasysdk.com/soeasysr/gameini/dyws/dyws_wfindex.html?external=1","icon":"/group1/M00/00/62/CiFVy1tRVvyAHoE8AAAbj6S3ac0118.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":16,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1253,"name":"英雄也疯狂","type":228,"url":"http://soeasysdk.com/soeasysr/gameini/yxyfk/yxyfk_wfindex.html?external=1","icon":"/group1/M00/00/62/CiFVy1tRV0aAJ6HSAAAjIu2gVeU453.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":17,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1254,"name":"合战天下","type":229,"url":"http://soeasysdk.com/soeasysr/gameini/hztx/hztx_wfindex.html?external=1","icon":"/group1/M00/00/62/CiFVy1tRV2aAUQ-lAAAbj6S3ac0525.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":18,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0},{"id":1255,"name":"勇者必须赢","type":230,"url":"http://soeasysdk.com/soeasysr/gameini/yzbxy/yzbxy_wfindex.html?external=1","icon":"/group1/M00/00/62/CiFVy1tRV4WAdh__AAAjIu2gVeU041.png","remark":"1","redFlag":false,"tagList":null,"bigIcon":"","bigIconDesc":"","sort":19,"recentlyPlayed":false,"jackpotStatus":null,"corner":"","featured":0}],
                gameurl:'',
                gameid:0
            }
        },
        methods: {},
        methods: {
            createQrc: function (item) {
                if(!item.id){
                    this.gameid=new Date().getTime()
                }
                console.log('item.id||this.gameid',item.id||this.gameid)
                console.log('item.url',item.url)
                QRCode.toCanvas(document.getElementById('qrccode-canvas'+item.id||this.gameid),this.createurl(item.url), (error) => {
                    if (error) {
                        this.$emit('error')
                    } else {
                        this.$emit('success')
                    }
                })
            },
            createurl(url){
                return `https://wap.beeplaying.com/activities/wfgames.html?channel=100037&extgameurl=${base64url.encode(url)}`
            }
        },
        mounted(){
        },
        computed:{
            item(){
                return {
                    url:this.gameurl,
                    id:new Date().getTime()
                }
            },
            showlist(){
                return utils.getUrlParamObj('showlist')==1
            },
            gamelistNew(){
                if(utils.getUrlParamObj('gamename')){
                    return this.gameslist.filter(c=>c.name.includes(decodeURIComponent(utils.getUrlParamObj('gamename'))));
                }else{
                    return this.gameslist
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/css/base.css';

    .jc-icon {
        width: 1.15rem;
        height: 0.63rem;
        background-size: 100% 100%;
        position: absolute;
        left: 45%;
        top: 0.34rem;
        transform: translateX(-50%);
    }

    ul.qb_ul {
        -webkit-overflow-scrolling: touch;
        .newGame {
            width: 0.82rem;
            height: 0.55rem;
            position: absolute;
            left: 44%;
            top: 0.36rem;
            transform: translateX(-50%);
        }
        li {
            padding: .55rem 0 .1rem;
            margin-bottom: .1rem;
            text-align: center;
            background: #1F2A4D;
            border-radius: .05rem;
            position: relative;
            display: flex;
            &:not(:nth-of-type(3n)) {
                margin-right: .1rem
            }
            .box {
                span {
                    display: inline-block;
                    // width: 100%;
                    font-size: .24rem;
                    color: #fff;
                    text-align: center;
                    &:first-child {
                        margin-bottom: .16rem;
                        width: .96rem;
                        height: .96rem;
                        img {
                            max-width: 100%;
                            max-height: 100%;
                        }
                    }
                    &:last-child {
                        margin-top: .12rem;
                        padding: 0 .1rem;
                        box-sizing: border-box;
                        min-width: 1.6rem;
                        max-width: 100%;
                        height: .3rem;
                        line-height: .3rem;
                        font-size: .2rem;
                        color: #999;
                        border-radius: .3rem;
                        &.font-red {
                            color: #fff;
                            background: #D51114;
                        }
                    }

                }
            }
        }
    }

    .highlight {
        /*z-index: 25;*/
        position: relative
    }
    .input {
        position: relative;
        width: 6.3rem;
        height: .9rem;
        background: #ffffff;
        border: 1px solid #BDBDBD;
        border-radius: .45rem;
        display: flex;
        align-items: center;
        input {
            width: 5.5rem;
            /* height: .7rem; */
            font-size: .32rem;
            color: #424242;
            margin-left: .4rem;
            &::placeholder {
                color: rgba(189, 189, 189, 1);
            }
        }
        /*&:nth-child(1) {*/
            /*top: 4.45rem;*/
        /*}*/
        /*&:nth-child(2) {*/
            /*top: 5.65rem;*/
            /*input {*/
                /*width: 3.5rem;*/
            /*}*/
            /*.code {*/
                /*position: absolute;*/
                /*left: 4.38rem;*/
                /*height: .9rem;*/
                /*line-height: .9rem;*/
                /*font-size: .32rem;*/
            /*}*/
        /*}*/
    }
</style>
