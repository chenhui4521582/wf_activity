<template>
	<div class="detail" v-if="cAward">
		<headers title="奖品兑换"></headers>
		<div class="award-container">
			<div class="pic-box">
				<img :src="cAward.picture | filter">
			</div>
			<h4 class="d-title">{{cAward.name}}</h4>
			<div class="d-text">{{cAward.purchasePrice}}元话费券<a href="javascript:" class="d-original">原价:{{cAward.marketPrice}}元</a></div>
		</div>
		<div class="xp-text">
			<h4>商品详情</h4>
			<p>{{cAward.description}}</p>
		</div>
		<div class="btn-box">
			<a href="javascript:" class="btn-submit" @click="goExchange">马上兑换</a>
		</div>

		<!-- 兑换弹窗 -->
		<div class="result-container" v-if="isFragmentStatus && exchangeStatus">
			<img src="../images/aperture.png" class="aperture">
			<div class="result-pop">
				<div v-show="exchangeStatus == 1">
					<img src="../images/pop-suc.png" class="p-status pop-suc">
					<div class="pic-box"><img :src="cAward.picture | filter"></div>
					<h4 class="r-title">{{cAward.purchasePrice}}元话费卡</h4>
					<p class="r-text">可到我的页面中查看</p>
					<a href="javascript:" class="btn-confirm" @click="close">朕收下了</a>
				</div>
				<div v-show="exchangeStatus == 2">
					<img src="../images/pop-err.png" class="pop-err">
					<div class="pic-box">
						<img :src="cAward.picture | filter">
					</div>
					<a href="javascript:" class="btn-confirm btn-jump">去逛逛别的商品</a>
					<a href="javascript:" class="btn-confirm">马上赚话费券</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Headers from './Header'
	export default {
		data() {
			return {
				cAward: null,
				isFragmentStatus: false,
				exchangeStatus: null
			}
		},
		components: {
		  Headers
		},
		beforeMount() {
		},
		mounted() {
			this.$nextTick(() => {
				this.cAward = JSON.parse(decodeURIComponent(this.getUrlParam('parmas')))
			})
		},
		methods: {
			close() {
				this.isFragmentStatus = false
			},
			//获取地址栏问号后面的参数值
		    getUrlParam: function (ename) {
		        var url = window.location.href;
		        var Request = new Object();
		        if (url.indexOf("?") != -1) {
		            var str = url.split('?')[1];
		            var strs = str.split("&");
		            for (var i = 0; i < strs.length; i++) {
		                Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		            }
		        } else {
		            return '';
		        }
		        let params = Request[ename] ? Request[ename].split('#')[0] : ''
		        return params;
		    },
		    goExchange() {
		    	this.axios.post('//ops-api.beeplay123.com/ops/api/exchangeMall/placeOrder', {
		    		productId: this.cAward.id
		    	})
		        .then(res => {
		          this.isFragmentStatus = true
		          if(res.data.code == 200) {
		            this.exchangeStatus = 1
		          }else {
		          	this.exchangeStatus = 2
		          }
		        })
		    }
		}
	}
</script>
<style lang="less" scoped>
	a {
		text-decoration: none;
	}
	.detail { 
		padding: 0 0.3rem;
		.d-title {
			font-size: 0.36rem;
			font-weight: bold;
			color: #fff;
		}
		.award-container{
        	height: 4.43rem;
        	background: url(../images/award-bg.png) no-repeat center top;
        	background-size: 100% 100%;
        	margin: 0.27rem auto 0.34rem;
        	.pic-box {
        		width:3.05rem;
				height:3.05rem;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					max-width: 100%;
					max-height: 80%;
				}
        	}
        	.d-text {
        		font-size: 0.32rem;
        		color: #EE6F0B;
        		font-weight: 500;
        		padding-top: 0.28rem;
        		display: flex;
        		align-items: center;
        		justify-content: center;
        		.d-original {
        			display: inline-block;
        			/*width: 1.33rem;*/
        			padding: 0 0.1rem;
        			height: 0.32rem;
        			line-height: 0.32rem;
        			background: #EE6F0B;
        			border-radius:0.16rem 0 0.16rem 0;
        			font-size: 0.24rem;
        			color: #0F1726;
        			text-align: center;
        			margin-left: 0.09rem;
        			text-decoration: line-through;
        		}
        	}
        }
        .xp-text {
        	text-align: left;
        	color: #fff;
        	background: #141F33;
        	padding: 0.29rem 0.3rem 0.8rem;
        	margin-bottom: 0.9rem;
        	h4 {
        		font-size: 0.32rem;
        		margin-bottom: 0.2rem;
        	}
        	p {
        		font-size: 0.24rem;
        		line-height: 0.32rem;
        	}
        }
        .btn-box {
          width: 100%;
          height:0.9rem;
          position: fixed;
          left: 0;
          bottom: 0.28rem;
        }
        .btn-submit {
          display: block;
          font-size: 0.28rem;
	      font-weight: bold;
	      display: block;
	      width:91.67%;
	      height:0.9rem;
	      line-height:0.9rem;
	      background:rgba(238,111,11,1);
	      border-radius:0.08rem;
	      margin: 0 auto;
	      text-align: center;
	      color: #fff;
        }
        .result-container {
        	width: 100%;
        	height: 100%;
        	background: rgba(0,0,0,0.6);
        	position: fixed;
        	left: 0;
        	top: 0;
        	z-index: 5;
        	font-size: 0.26rem;
        	.pic-box {
        		width: 1.48rem;
        		height: 1.48rem;
        		background: #FFD66D;
        		border:0.02rem solid rgba(255,255,255,1);
				border-radius:0.12rem;
				margin: 0 auto 0.16rem;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					max-width: 100%;
					max-height: 80%;
				}
        	}
        	.pop-suc {
        		width: 2.25rem;
        		height: 0.66rem;
        		margin: 0.4rem auto 0.42rem;
        	}
        	.pop-err {
        		width: 2.64rem;
        		height: 0.67rem;
        		margin: 0.4rem auto 0.43rem;
        	}
        }
        .result-pop {
        	width: 4.8rem;
        	height: 5.3rem;
        	background: url(../images/result-pop.png) no-repeat center top;
        	background-size: 100% 100%;
        	position: fixed;
        	left: 50%;
        	top: 50%;
        	margin-left: -2.4rem;
        	margin-top: -2.65rem;
        	z-index: 6;
        	.r-title {
        		font-size: 0.28rem;
        		color: #fff;
        		font-weight: bold;
        	}
        	.r-text {
        		font-size: 0.24rem;
        		color:rgba(255,255,255,0.5);
        		padding: 0.27rem 0 0.36rem 0;
        	}
        	.btn-confirm {
        		display: block;
        		width:2.4rem;
				height:0.62rem;
				line-height:0.62rem;
				background:rgba(255,207,82,1);
				border-radius:0.12rem;
				font-size: 0.26rem;
				font-weight: bold;
				color: #A34C00;
				text-align: center;
				margin: 0 auto;
				&.btn-jump {
					background:#FFFFFF;
					color: #A34C00;
					margin: 0.4rem auto 0.28rem;
				}
        	}
        }
        .aperture {
        	width: 100%;
        	position: fixed;
        	left: 0;
        	top: 50%;
        	margin-top: -55%;
        	z-index: 5;
        }
	}

</style>