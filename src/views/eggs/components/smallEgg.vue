<template>
	<div class="small-egg" :class="isBigStatus?'s-big-egg':''">
		<img :src="sEggrc" class="c-egg">
		<span class="s-text">200锤</span>
		<a href="javascript:" class="fear-tips" v-if="isTipsNumber == 1"></a>
		<a href="javascript:" class="hit-me-tips" v-if="isTipsNumber == 2"></a>
		<a href="javascript:" class="klz-tips" v-if="isTipsNumber == 3"></a>
		
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {}
		},
		props: {
			sColor: {	//图标颜色
				default: ''
			},
			isBigStatus: { //是否是大图标
				default: false
			},
			isTipsNumber: { //tips类型
				default: 0
			},
			hammersNumber: {  //锤子数量
				default: 0
			}
		},
		computed: {
			sEggrc() {
				return require(`../pages/images/index/${this.sColor}-egg.png`)
			}
		},
		mounted() {
		}
	}
</script>
<style lang="less" scoped>
	.small-egg {
		width: 0.99rem;
		font-size: 0.2rem;
		position: relative;
		.fear-tips,.hit-me-tips,.klz-tips {
			width: 1.04rem;
		    height: 0.79rem;
		    position: absolute;
		    top: -0.68rem;
		}
		.fear-tips {
			background: url(../pages/images/index/fear-tips.png) no-repeat center top;
			background-size: 100% 100%;
			left: -0.5rem;
		}
		.hit-me-tips {
			background: url(../pages/images/index/hit-me-tips.png) no-repeat center top;
			background-size: 100% 100%;
			left: -0.5rem;
		}
		.klz-tips {
			background: url(../pages/images/index/klz-tips.png) no-repeat center top;
			background-size: 100% 100%;
			right: -0.35rem;
		}
		&.s-big-egg {
			width: 1.41rem;
			height: 1.34rem;
			.c-egg{
				width: 1.41rem;
				height: 1.34rem;
			}
			.s-text {
				width: 1.01rem;
				height: 0.49rem;
				line-height: 0.49rem;
				border-radius: 0.24rem;
				font-size: 0.32rem;
				margin-left: -0.47rem;
			}		
		}
	}
	.c-egg {
		width: 0.99rem;
		height: 0.89rem;

	}
	.s-text {
		display: block;
		width: 0.62rem;
		height: 0.3rem;
		background:rgba(248,185,24,1);
		border-radius:0.15rem;
		font-size:0.2rem;
		font-weight:bold;
		color:rgba(154,80,21,1);
		text-align: center;
		position: absolute;
		left: 50%;
		bottom: 0;
		margin-left: -0.28rem;
	}
</style>