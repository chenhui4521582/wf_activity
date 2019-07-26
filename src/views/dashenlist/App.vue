<template>
    <div id="app">
       <div class="title">
           <img src="./images/title.png">
           <span class="back-home" @click="guide('home')"></span>
       </div>
        <div class="content">
            <p class="content-title">大神攻略-我是如何只用10分钟，拿走5000元京东卡奖励的！！！</p>
            <p class="info">
                <span>大神志伟</span>
                <span>{{this.coterieList && this.coterieList.praise}}</span>
            </p>
            <p class="detail">
                最近受游戏小秘书的邀请，给大家分享下自己的游戏经验。开门见山， 一切的问题和质疑，可以看完再说。
                先说5000元京东卡哪里有，了解过游戏排行榜的同学都知道，第一名的奖励是5000元京东卡，每天有2次榜单，
                中午1点和晚上9点。这篇攻略，是我自己的经验分享，如何快速冲击第一名奖励， 且花费最少的金叶子。且看下文.... <br>
                (PS:获得5000元奖励条件排名第一并且盈利值在550万以上）
            </p>
            <img src="./images/list1.png">
            <p class="detail strong">重点，重点，重点来了，如何操作。</p>
            <p class="detail">
               我个人主要玩的是《热血三国》这款游戏， 重点在把握好三个关键因素：<br>
               <span class="slide">
                    1.打平玩法（可以获得25倍奖励）。<br>
                    2.合理使用排行榜橡皮擦。<br>
                    3.巧用追投功能。
               </span>
            </p>
            <img src="./images/game1.png">
            <p class="detail top-title">为什么要关注热血三国的打平？</p>
            <p class="detail">
                因为如果蜀魏打平是可以获得25倍的奖励的， 这是我认为最快冲击奖励榜的方法。
                假设消耗30万金叶子，获得25倍奖励，就能有720万金叶子的收益，远远超过奖励榜第一550万的要求。
                通过长期观察，个人觉得平均每30期会出现一次打平， 当然这是我发现的一个平均概率，有可能10期出，
                也可能60期都不出，随机出现，但概率是应该是固定的。<br><br>
                ( PS：我发现两边出现相同位置的英雄，会有非常高的几率打平，
                例如：关羽对战夏侯淳，黄月英对战甄姬，所以当出现2个相同阵位的英雄对战时，打平的可能性就很大了，大家可以进去观察观察）<br><br>
                可能有的同学会问，每次需要消耗这么多金叶子吗？而且要连续玩这么多期，能确保进奖励榜吗？？？ 我是通过简单的数学计算来分析的：<br>
                假设30期出一次，如果每期消耗40万金叶子，总计需要1200万金叶子， 如果中了，可以回 1000万金叶子，外加5000元排行榜奖励。如下表：
            </p>
            <ul>
                <li>
                    <span>消耗</span>
                    <span>连续玩30次 *每次40万 <br>= 1200万金叶子（价值约1万1）</span>
                </li>
                <li>
                    <span>奖励</span>
                    <span>5000元京东卡 + 40万*25倍<br>=1000万金叶子（价值约9千）</span>
                </li>
                <li>
                    <span>净盈利</span>
                    <span class="strong">3000元</span>
                </li>
            </ul>
            <p class="detail">
                也就是说， 我们每获得一次第一名，理论都可以赚3000块左右。
            </p>
            <p class="detail top-title">合理用好橡皮擦！！！</p>
            <p class="detail">
                为了保证更高的盈利值（以防其他玩家超越），我们需要在合适的时候使用橡皮擦，橡皮擦可以把负盈利值清零。
                每期的排行榜，都有3次橡皮擦机会，第一次免费，后面2次需要消耗一定的金叶子。举例，如果你消耗40万在打平上，那就可以每5局使用一次橡皮擦，
                这样可以保证在你压中平局的时候，至少也会有700多万的金叶子奖励。
            </p>
            <p class="left">
                <img src="./images/list2-1.png" >
                <img src="./images/list2-2.png">
            </p>
            <p class="detail top-title">为什么要使用追投功能？？？？</p>
            <p class="detail">
                追投20期，如果不中可以返还总金额的15% ，这绝对是送的福利，而且使用追投比较稳定，不会错过每一期。
            </p>
            <p class="left">
                <img src="./images/list3-1.png" >
                <img src="./images/list3-2.png">
            </p>
            <p class="detail last">
                最后， 这是一个胆量，智慧， 运气相结合的玩法，赢的时候不要骄傲， 输的时候要保持好心态。
                当然，游戏终究还是要适度为主，消遣娱乐为主，提醒同学切勿沉迷。
            </p>
            <p class="link" @click="goGame">
                <span>游戏<br>链接</span>
                <span>{{this.coterieList && this.coterieList.title}}></span>
            </p>
            <p class="zan" @click="zanFn('click')">
                <span class="trans" v-if="isAnimate">+1</span><br>
                <span class="thumb" :class="{'yizan':isZan}"></span><br>
                <span>{{this.coterieList && this.coterieList.praise}}</span>
            </p>
        </div>
        <div class="bottom" @click="guide('tougao')">有奖投稿</div>

    </div>
</template>

<script>
    import utils from '../../common/js/utils.js'
    import base64url from 'base64-url'
    export default {
        name: 'app',
        data(){
            return {
                isZan : false,
                isAnimate : false,
                coterieList :null
            }
        },
        methods: {
            async zanFn(val){
                GLOBALS.buriedPoint(1207001603,'H5平台-大神攻略-点赞')
                let {data:data} = await this.axios.post('//platform-api.beeplaying.com/wap/api/wap/coterie/praise', {
                    value: this.coterieList && this.coterieList.id,
                })
                if(data.code == 101){
                    this.isZan = true
                }else if(val == 'click'){
                    if(data.code == 200){
                        this.isZan = true
                        this.isAnimate = true
                        setTimeout(() => {
                            this.isAnimate = false
                        }, 2000);
                        this.getCoterieList()
                    }else{
                        this.isZan = false
                        this.$toast.show({
                            message: data.message,
                            duration: 1500
                        });
                    }
                }


            },
            async getCoterieList(){

                let {data:data} = await this.axios.post('//platform-api.beeplaying.com/wap/api/wap/coterie/list', {
                    page : 1,
                    pageSize : 5
                })
                if(data.code == 200){
                    this.coterieList = data.data.raiders
                    // 1点过赞
                    if(this.coterieList.havePraise == 1) this.isZan = true
                }
            },
            goGame(){
                GLOBALS.buriedPoint(1207001602,'H5平台-大神攻略-三国游戏跳转')

                location.href = this.coterieList.addr + '?channel=' + localStorage.getItem('APP_CHANNEL')
            },
            guide(val){
                if(val == 'home'){
                    top.location.href =window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
                }else{
                    GLOBALS.buriedPoint(1207001604,'H5平台-大神攻略-有奖投稿')
                    location.href = 'https://wap.beeplaying.com/wf_zhengjiling/'
                }
            }
        },
        mounted(){
            this.getCoterieList()

            GLOBALS.buriedPoint(1207001601,'H5平台-大神攻略加载页')
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/css/base.css';

    #app{
        position: relative;
        width: 100%;
        height: 100%;
        background: #0f1523;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .title{
        position: relative;
        width: 100%;
        height: 2.48rem;

        img{
            width: 100%;
            height: 100%;
        }
        .back-home{
            position: absolute;
            left: 0;
            top: .4rem;
            width: .8rem;
            height: .71rem;
            background: url(./images/icon_home.png);
            background-size: 100% 100%;
        }
    }
    div, p{box-sizing: border-box;}
    .content{
        width: 100%;
        padding: .3rem .26rem 0;
        .content-title{
            font-size: .4rem;
            color: #E9E7E7;
            font-weight: bold;
            line-height: .6rem;
        }
        .info{
            margin: .3rem 0 .41rem;
            color: #666;
            font-size: .22rem;
            span:last-child{
                float: right;
                &:before{
                    content: '';
                    display: inline-block;
                    margin-right: .1rem;
                    width: .19rem;
                    height: .22rem;
                    background: url(./images/icon_zan_small.png);
                    background-size: 100% 100%;
                    vertical-align: bottom;
                }
            }
        }
        .detail{
            color: #A0A0A0;
            font-size: .3rem;
            line-height: .48rem;
        }
        .strong{font-weight: bold;margin-bottom: .4rem;}
        img{
            margin: .4rem 0 .8rem;
            width: 100%;
            height: 3.42rem;
        }
        .left{
            overflow: hidden;
            img{
                float: left;
                width: 48%;
                margin-right: .1rem
            }
            img:last-child{margin-right:0;}
        }
        .top-title{
            margin: .4rem 0;
            padding-left: .33rem;
            width: 100%;
            height: .57rem;
            line-height: .57rem;
            font-weight: bold;
            color: #7F9AC0;
            font-size: .3rem;
            background: url(./images/top_title.png);
            background-size: 100% 100%;
            font-style: italic;
        }
        ul{
            margin-top: .4rem;
            li{
                display: flex;
                span{
                    height: 1.26rem;
                    color: #7F9AC0;
                    font-size: .3rem;
                    background: #152235;
                    text-align: center;
                    border-radius: .08rem;
                    border: 1px dashed transparent;
                }
                span:first-child{
                    width: 1.48rem;
                    line-height: 1.26rem;
                    margin-right: .1rem;
                    margin-bottom: .1rem;
                }
                span:last-child{
                    flex: 3;
                    padding: .25rem;
                    line-height: .4rem;
                    box-sizing: border-box;
                    vertical-align: middle;
                }

                &:last-child{span{height: .91rem;line-height: .91rem;padding: 0;}}
            }
        }
        .last{
            &:after{
                content: '';
                display: inline-block;
                width: 100%;
                border: 1px dashed #A0A0A0;
            }
        }
        .link{
            margin: .2rem 0 .7rem;
            height: .5rem;
            span{
                color: #44556F;
                &:first-child{
                    float: left;
                    font-size: .22rem;
                }
                &:last-child{
                    margin-left: .1rem;
                    float: left;
                    width: 1.82rem;
                    height: .48rem;
                    line-height: .48rem;
                    font-size: .26rem;
                    border-radius: .4rem;
                    border: 1px solid #253752;
                    text-align: center;
                }
            }
        }
        .zan{
            position: relative;
            margin: 0 auto 1.5rem;
            width: 1.6rem;
            height: 1.6rem;
            background: #152235;
            border-radius: 50%;
            color: #7F9AC0;
            font-size: .22rem;
            text-align: center;
            .thumb{
                display: inline-block;
                margin: .1rem auto;
                width: .73rem;
                height: .8rem;
                background: url(./images/icon_zan.png);
                background-size: 100% 100%;
                &.yizan{
                    background: url(./images/icon_zaned.png);
                    background-size: 100% 100%;
                }
            }
            .trans{
                position: absolute;
                right: .2rem;
                top: .2rem;
                opacity: 1;
                animation: transanimate 3s  ease
            }
        }

    }
    @keyframes transanimate {
        50%{opacity: 1;}
        100%{opacity: 0;}
    }
    .bottom{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .85rem;
        background: #253752;
        color: #8FABD1;
        font-size: .36rem;
        line-height: .85rem;
        text-align: center;
    }

</style>
