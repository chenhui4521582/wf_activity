<template>
	<div class="get-hammer">
		<h4 class="s-title"><em></em>购买礼包得锤子</h4>
		<span class="info">礼包可不限次购买，重复获取锤子</span>
		<div class="g-package">
			<div class="g-package-container g1">
				<ul>
					<li v-for="item in 3" >
						<span class="item-text">28.8万金叶子<br/>+15锤子</span>
						<a href="javascript:" class="btn-price">￥288</a>
					</li>
				</ul>	
			</div>
			<div class="g-package-info">
				<ul>
					<li>已购买礼包：4次</li>
					<li>累计锤子：720个</li>
				</ul>
			</div>
		</div>
		<h4 class="s-title"><em></em>玩游戏得锤子</h4>
		<span class="info">活动期间在游戏中（除套圈和枪火英雄）累计支持金叶子数达到一定值即可获得锤子</span>
		<div class="g-package">
			<div class="g-package-container g2">
				<hitPercent/>
			</div>
			<div class="g-package-info">
				<ul>
					<li>已购买礼包：4次</li>
					<li>累计锤子：720个</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {

			}
		},
		components: {
			hitPercent: () => import('./component/hitPercent/hitPercent.vue')
		},
		mounted() {

		},
		methods: {

		}
	}
</script>
<style lang="less" scoped>
	.get-hammer {
		padding: 0.4rem 0.38rem 0;
		.s-title {
			font-size: 0.24rem;
			color: #C07002;
			display: flex;
			align-items: center;
			margin-bottom: 0.12rem;
			em {
				display: inline-block;
				width: 0.12rem;
				height: 0.12rem;
				border-radius: 50%;
				background: #E2812A;
				margin-right: 0.05rem;
			}
		}
		.info {
			color: #C07002;
			padding-left: 0.17rem;
			line-height: 0.28rem;
		}
	}
	.g-package {
		width: 100%;
		background: #FEC041;
		margin-bottom: 0.49rem;
		.g-package-container {
			background: #FFFAF1;
			margin-top: 0.19rem;
			&.g1{
				height: 2.94rem;	
			}
			&.g2{
				height: 2.24rem;	
			}
			ul {
				display: flex;
				justify-content: center;
				padding-top: 0.21rem;
				justify-content: center;
			}
			li {
				width: 1.79rem;
				height: 2.48rem;
				text-align: center;
				position: relative;
				&:nth-child(1){
					background: url(../../images/package/i-288.png) no-repeat center top;
					background-size: 100% 100%;
				};
				&:nth-child(2){
					background: url(../../images/package/i-888.png) no-repeat center top;
					background-size: 100% 100%;
					margin: 0 0.26rem;
				};
				&:nth-child(3){
					background: url(../../images/package/i-1888.png) no-repeat center top;
					background-size: 100% 100%;
				};

			}
			.item-text {
				font-size: 0.2rem;
				color: #9A5619;
				line-height: 0.26rem;
				position: relative;
				top: 1.38rem;
			}
			.btn-price {
				display: block;
				width: 0.96rem;
				height: 0.39rem;
				line-height: 0.39rem;
				background: #FF7F32;
				border-radius: 0.2rem;
				font-size: 0.24rem;
				color: #ECF4FF;
				font-weight: bold;
				text-align: center;
				margin: 0 auto;
				position: absolute;
				bottom: 0.17rem;
				left: 50%;
				margin-left: -0.48rem;
			}
		}
	}
	.g-package-info {
		ul {
			display: flex;
			align-items: center;
			height: 0.52rem;
			text-align: left;
			li {
				flex: 1;
				height: 0.52rem;
				line-height: 0.52rem;
				position: relative;
				font-size: 0.24rem;
				color: #944D00;
				text-indent: 0.27rem;
				&:nth-child(1):before{
					content: '';
					width: 1px;
					height: 0.33rem;
					background:rgba(178,112,20,1);
					position: absolute;
					right: 0;
					top: 0.1rem;
				};
			}
		}
	}
</style>