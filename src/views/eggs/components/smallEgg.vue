<template>
	<div class="small-egg" :class="isBigStatus?'s-big-egg':''">
		<img :src="sEggrc" class="c-egg">
		<span class="s-text">200锤</span>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {}
		},
		props: {
			sColor: {
				default: ''
			},
			isBigStatus: {
				default: false
			}
		},
		computed: {
			sEggrc() {
				return require(`../pages/images/index/${this.sColor}-egg.png`)
			}
		},
		mounted() {
			console.log(this.sColor)
		}
	}
</script>
<style lang="less" scoped>
	.small-egg {
		width: 0.99rem;
		font-size: 0.2rem;
		position: relative;
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
				margin-left: -0.5rem;
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