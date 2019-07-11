<template>
	<div class="drop-down">
		<div class="pop-mask"></div>
		<div class="drop-down-content">
			<div class="d-tab">
				<ul>
					<li @click="handleTab(0)" :class="{'active':curIndex == 0}">获取锤子</li>
					<li @click="handleTab(1)" :class="{'active':curIndex == 1}">有奖排行榜</li>
				</ul>
			</div>
			<!-- 获取锤子组件 -->
			<getHammer/>
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
			getHammer: () => import('./component/getHammer')
		},
		mounted() {

		},
		methods: {
			handleTab(idx) {
				this.curIndex = idx
			}
		}
	}
</script>
<style lang="less" scoped>
	@import './css/dropDown.less';
</style>