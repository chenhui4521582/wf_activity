<template>
	<div class="eggs-container">
		<div class="header1">
			<img src="./images/index/header-title.png" class="header-title">
			<h4 class="e-time">截止时间：7月7日23:59:59</h4>
			<img src="./images/index/back.png" class="e-back">
		</div>
		<div class="header2"></div>
		<div class="header3">
			<a href="javascript:" class="btn-hit">消耗锤子砸彩蛋</a>
			<div class="e-items">
				<ul>
					<li :class="getLiClass(index)" v-for="(item,index) in styleItemsArr">
						<small-egg 
							:sColor="item.sColor" 
							:isTipsNumber="item.isTipsNumber"
							:isBigStatus="item.isBigStatus"
							hammersNumber="100"
						>
						</small-egg>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				styleItemsArr: [
					{
						sColor: "green",
						isTipsNumber: "2"
					},
					{
						sColor: "green"
					},
					{
						sColor: "green"
					},
					{
						sColor: "green"
					},
					{
						sColor: "green"
					},
					{
						sColor: "blue"
					},
					{
						sColor: "blue",
						isTipsNumber: "1"
					},
					{
						sColor: "blue"
					},
					{
						sColor: "blue"
					},
					{
						sColor: "purplish"
					},
					{
						sColor: "purplish",
						isTipsNumber: "3"
					},
					{
						sColor: "purplish"
					},
					{
						sColor: "red"
					},
					{
						sColor: "red"
					},
					{
						sColor: "big",
						isBigStatus: true
					}
				]
			}
		},
		components: {
			smallEgg: () => import('../components/smallEgg')
		},
		methods: {
			getLiClass(index) {
				return  `e-item${index+1}`
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "./css/index.less";
</style>