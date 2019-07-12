<template>
	<div class="profit-container">
		<img src="../../images/package/profit/title.png" class="title">
		<h4 class="p-time">发榜倒计时：1天23:59:59</h4>
		<div class="profit-tx-container">
			<ul class="profit-icon">
				<li v-for="(item,index) in 3">
					<div class="s-tx">
						<img src="">
					</div>
					<span class="icon-number"></span>
					<span class="s-text">第{{index+1}}名</span>
				</li>
			</ul>
			<div class="profit-items">
				<div class="p-header">
					<ul>
						<li>
							<h4>我的排名</h4>
							<span>128</span>
						</li>
						<li>
							<h4>累计获得锤子</h4>
							<span>128个</span>
						</li>
						<li>
							<h4>当前奖励</h4>
							<span>500万金叶+1000京东卡</span>
						</li>
					</ul>
				</div>
				<div class="p-items">
					<ul class="p-item-title">
						<li>
							<span>排名</span>
							<span>昵称</span>
							<span>累计锤子</span>
							<span>奖励</span>
						</li>
					</ul>
					<ul class="p-item-title">
						<li v-for="(item,index) in 2">
							<span><i class="icon-dot">{{index+1}}</i></span>
							<span>这里是昵称</span>
							<span>155555个</span>
							<span>500万金叶+</span>
						</li>
					</ul>
				</div>
			</div>
		</div>

	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				curIndex: 0
			}
		},
		components: {
			// getHammer: () => import('./component/getHammer')
		},
		mounted() {

		},
		methods: {
			
		}
	}
</script>
<style lang="less" scoped>
	@import './index.less';
</style>