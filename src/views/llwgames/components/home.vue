<template>
	<div class="c-game">
		<div class="sy-game">
			<div class="c-header" @click="goLoginPage">
			        <div class="g-personal">
			            <div class="g-pic-box">
			                <div class="header head-bg">
			                    <img  src="./images/img_photo.png" class="g-pic" >
			                    <!-- 消息中心红点 -->
			                    <em class="red-dot" ></em>
			                    <span class="g-item-box message" >
			                        <em class="message-num"></em>
			                    </span>
			                </div>
			            </div>
			            <div class="g-info">
			                <h1>ID:0</h1>
			                <div class="g-info-box">
			                    <img src="./images/leaf.png" class="g-leaf">
			                    <span class="g-leaf-amount">0</span>
			                    <img src="./images/sc-icon.png" class="sc-icon">
			                </div>
			            </div>
			        </div>
			        <div class="g-items">
			            <ul>
			                <li>
			                    <div class="cz-bill">
			                        <div class="circle-bg six" ></div>
			                        <div class="feed two" >
			                        </div>
			                    </div>
			                </li>
			                <li >
			                    <div class="g-Heavy">
			                        <img src="./images/task.png" class="sub">
			                        <em class="red-dot" ></em>
			                    </div>
			                    <span class="renwu">任务</span>
			                </li>
			            </ul>
			        </div>
			    </div>

			<!--轮播图-->
            <div class="lb_box">
                <div >
                    <div @click="goLoginPage">
                            <img class="needsclick"  src="./images/lb1.jpg">
                    </div>
                </div>
            </div>
            <div  class="activity-wrap">
                <p class="slide">免费领取金叶</p> 
            </div>
            <div class="game-wrap">
            	<div class="qb-column">
            		<ul class="zz-title">
            			<li :class="{'active': curIndex == index}" v-for="(item,index) in titleArr" @click="tabGames(index)">{{item}}</li>
            		</ul>
            		<ul class="qb_ul" v-if="curIndex == 0">
            			<li  @click="goLoginPage">
            				<div class="box">
            					<img  src="../images/game/1.png">
            					<span>热血军团</span>
            				</div>
            			</li>
            		</ul>
            		<ul class="qb_ul" v-if="curIndex == 1">
            			<li  @click="goLoginPage">
            				<div class="box">
            					<img  src="../images/game/2.png">
            					<span>逐日战神</span>
            				</div>
            			</li>
            			<li  @click="goLoginPage">
            				<div class="box">
            					<img  src="../images/game/3.png">
            					<span>凡人飞仙传</span>
            				</div>
            			</li>
            			<li  @click="goLoginPage">
            				<div class="box">
            					<img  src="../images/game/4.png">
            					<span>新仙剑</span>
            				</div>
            			</li>
            		</ul>

            		<div v-if="curIndex == 2">
            			<div>
            				<div  class="more-info"><p >游戏中心</p> <p >更多游戏资讯与活动</p></div> <div data-v-36becbff="" class="game-list">
		            				<ul>
		            					<li @click="goLoginPage"><img  src="../images/game/5.png" alt="" class="game-logo"> <div  class="cont"><p  class="title">逐日战神</p> <p class="add nom">双线-162区</p> <p  class="day nom">已经开服7小时</p></div> <div  class="btn"><div data-v-36becbff="" class="bg can">开始玩</div></div>
		                				</li>
		                    			<li  @click="goLoginPage"><img  src="../images/game/5.png" alt="" class="game-logo"> <div  class="cont"><p class="title">逐日战神</p> <p  class="add nom">双线-163区</p> <p  class="day nom">11月18日 10:00 开服</p></div> <div  class="btn"><div  class="bg no-can">即将开服</div></div></li>
		                			</ul>
		                		</div>
		                	</div>
            		</div>
            	</div>

            </div>

            <div data-v-775e5488="" id="footer" class="footer"><ul><li class="active"><a href="javascript:"><div class="f-box"><i class="f-icon game-icon-big"></i></div> <span>游戏</span></a></li> 
            	<li  @click="goLoginPage"> <a href="javascript:"><div class="f-box"><i class="f-icon cat-icon"></i></div> <span>个人</span></a></li></ul></div>

		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				titleArr: ['小游戏','网游大作','新开服'],
				curIndex: 1
			}
		},
		methods: {
			tabGames(index) {
				this.curIndex = index
			},
			goLoginPage() {
				this.$router.push('/login')
			}
		},
		components: {
		}
	}
</script>
<style lang="less" scoped>
	@import "./css/index1.less";
	@import "./css/index2.less";
    .sy-game {
        background: #0f1b33;
        flex: 1;
    }
	.lb_box {
		overflow: hidden;
        position: relative;
	}
    .lb_box img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
	.game-wrap {
	    margin-top: .24rem;
	}
	.qb-column {
    background: #0f1b33;
    position: relative;
    height: 100%;
}
.c-game {
    display: flex;
    min-height: 100vh;
}
.zz-title {
    height: .7rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    line-height: .7rem;
    color: #4d88ff;
    font-size: .24rem;
    border-bottom: 1px solid #2c407e;
}
.zz-title li.active {
    color: #d69e31;
}

.zz-title li {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
ul.qb_ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-overflow-scrolling: touch;
}
ul.qb_ul li:not(:nth-of-type(3n)) {
    margin-right: .1rem;
}
ul.qb_ul li .box span {
    display: inline-block;
    font-size: .24rem;
    color: #fff;
    text-align: center;
}
ul.qb_ul li {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 32.2%;
    flex: 0 0 32.2%;
    padding: .55rem 0 0;
    height: 1.8rem;
    text-align: center;
    border-radius: .05rem;
    position: relative;
}
ul.qb_ul li .box  img {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    display: block;
    margin: 0 auto 0.2rem;
}
ul.qb_ul li .box span {
	font-size: .26rem;	
}
.game-list ul li {
    height: 1.4rem;
    border-bottom: 1px solid #2c407e;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.game-list ul li .game-logo {
    width: 1rem;
    height: 1rem;
    color: #ebebed;
}
.game-list ul li .game-logo .can {
color: #ebebed;
}
.game-list ul li .cont {
    -webkit-box-flex: 2.5;
    -ms-flex: 2.5;
    flex: 2.5;
    margin-left: .31rem;
}

.game-list ul li div {
    height: 1rem;
}
.game-list ul li .cont .title {
    font-size: .24rem;
    color: #ebebed;
}
.game-list ul li .cont .nom{
    font-size: .2rem;
    color: #cdf;
    margin-top: .14rem;
}
.game-list ul li .cont .nom {
    font-size: .2rem;
    color: #cdf;
    margin-top: .14rem;
}
.game-list ul li .btn {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    text-align: center;
}

.game-list ul li .btn .bg {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: .47rem;
    width: 1.37rem;
    position: absolute;
    bottom: .05rem;
    right: 0;
    line-height: .47rem;
    font-size: .24rem;
    color: #ebebed;
}
.more-info {
    height: .8rem;
    background-color: #141e41;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0 .58rem 0 .24rem;
    color: #ebebed;
}
.more-info p:first-child {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: .3rem;
    color: #ebebed;
}
.game-list ul{
    padding: 0 .23rem;
}
.more-info p {
    line-height: .8rem;
}
.slide {
    margin: 0 auto;
    border-radius: 0!important;
    background: url(../images/game/arrow.png) no-repeat;
    background-size: 100% 100%;
}

.bg, .slide {
    color: #69f;
    font-size: .24rem;
    width: 2.1rem;
    height: .45rem;
    line-height: .45rem;
    font-weight: 700;
    text-align: center;
}
.footer {
    width: 100%;
    height: 1.04rem;
    position: fixed;
    left: 0;
    bottom: 0;
    background: url(../images/game/f-bg.png) repeat-x top;
    background-size: 100% 1.04rem;
    z-index: 5;
}
.footer li, .footer ul {
    height: 1.02rem;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
}
.footer ul {
    -ms-flex-align: end;
    align-items: flex-end;
    box-sizing: border-box;
}
.footer li {
    -ms-flex: 1;
    flex: 1;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    top: .02rem;
}

.footer li, .footer ul {
    height: 1.02rem;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
}
.footer li a {
    height: 1.02rem;
    display: block;
    width: 100%;
    height: 100%;
    font-size: .24rem;
    color: #fff;
}

a:active, a:hover, a:link, a:visited {
    background: hsla(0,0%,100%,0);
}

.footer li .f-box {
    height: .65rem;
    position: relative;
}

.footer li .f-box {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    margin-bottom: .05rem;
}
.footer li.active span {
    color: #d3ad5b;
}

.footer li span {
    font-size: .24rem;
    position: relative;
    top: -.03rem;
    color: #ccc;
}

.footer li .f-box .f-icon.game-icon-big {
    width: .44rem;
    height: .45rem;
    bottom: -.02rem;
    background: url(../images/game/split.png) -.78rem -.1rem;
    background-size: 1.99rem 1.32rem;
    position: relative;
    top: .1rem;
    left: -.01rem;
}

.footer li .f-box .f-icon.cat-icon {
    width: .45rem;
    height: .44rem;
    background: url(../images/game/split.png) -.78rem -.78rem;
    background-size: 1.99rem 1.32rem;
    position: relative;
    top: .1rem;
}
.footer li .f-box .f-icon {
    display: inline-block;
}

</style>