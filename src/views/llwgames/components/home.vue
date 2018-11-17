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
			                <!-- <div>
			                    <p class="login-small">
			                        <i class="close" ></i>账户登录<br>
			                        <i>奖励200金叶子</i>
			                    </p>
			                </div> -->
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

            <div class="game-wrap">
            	<div class="qb-column">
            		<ul class="zz-title">
            			<li :class="{'active': curIndex == index}" v-for="(item,index) in titleArr" @click="tabGames(index)">{{item}}</li>
            		</ul>
            		<ul class="qb_ul" v-if="curIndex == 0">
            			<li  @click="goLoginPage">
            				<div class="box">
            					<img  src="//file.beeplay123.com/cdn/9e83/8e1e/39e4/40a7/bff5/4876/434f/b2de/9e838e1e39e440a7bff54876434fb2de.png">
            					<span>热血军团</span>
            				</div>
            			</li>
            		</ul>
            		<ul class="qb_ul" v-if="curIndex == 1">
            			<li  @click="goLoginPage">
            				<div class="box">
            					<img  src="//file.beeplay123.com/group1/M00/07/00/CmcEHVs0hguAZu1SAABbmibiyL4930.png">
            					<span>逐日战神</span>
            				</div>
            			</li>
            			<li  @click="goLoginPage">
            				<div class="box">
            					<img  src="//file.beeplay123.com/group1/M00/08/80/CmcEHFs7EVSAG2MNAABVeDFYviQ990.png">
            					<span>凡人飞仙传</span>
            				</div>
            			</li>
            			<li  @click="goLoginPage">
            				<div class="box">
            					<img  src="//file.beeplay123.com/group1/M00/07/00/CmcEHVszeh2Ae294AAAg26HIVGQ095.png">
            					<span>新仙剑</span>
            				</div>
            			</li>
            		</ul>

            		<div v-if="curIndex == 2">
            			<div>
            				<div  class="more-info"><p >游戏中心</p> <p >更多游戏资讯与活动</p></div> <div data-v-36becbff="" class="game-list">
		            				<ul>
		            					<li @click="goLoginPage"><img  src="//file.beeplay123.com/group1/M00/07/00/CmcEHVs0hguAZu1SAABbmibiyL4930.png" alt="" class="game-logo"> <div  class="cont"><p  class="title">逐日战神</p> <p class="add nom">双线-162区</p> <p  class="day nom">已经开服7小时</p></div> <div  class="btn"><div data-v-36becbff="" class="bg can">开始玩</div></div>
		                				</li>
		                    			<li  @click="goLoginPage"><img  src="//file.beeplay123.com/group1/M00/07/00/CmcEHVs0hguAZu1SAABbmibiyL4930.png" alt="" class="game-logo"> <div  class="cont"><p class="title">逐日战神</p> <p  class="add nom">双线-163区</p> <p  class="day nom">11月18日 10:00 开服</p></div> <div  class="btn"><div  class="bg no-can">即将开服</div></div></li>
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
				curIndex: 0
			}
		},
		methods: {
			tabGames(index) {
				this.curIndex = index
			},
			goLoginPage() {
				alert(0)
			}
		},
		components: {
		}
	}
</script>
<style lang="less" scoped>
	@import "./css/index1.less";
	@import "./css/index2.less";
	.lb_box {
		overflow: hidden;
	}
    .lb_box img {
        width: 100%;
    }
	.game-wrap {
	    margin-top: .24rem;
	}
	.qb-column {
    background: #0f1b33;
    position: relative;
    height: 100%;
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
.game-list ul li .btn .bg.can {
    /*background-image: url(./static/img/game-go-play.3eda71f.png);*/
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
}
.more-info {
    height: .8rem;
    background-color: #141e41;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0 .58rem 0 .24rem;
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

</style>