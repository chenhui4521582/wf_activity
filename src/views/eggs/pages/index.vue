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
					<li class="">
						<small-egg sColor="green"></small-egg>
					</li>
					<!-- <li>
						<small-egg sColor="green"></small-egg>
					</li>
					<li>
						<small-egg sColor="green"></small-egg>
					</li>
					<li>
						<small-egg sColor="green"></small-egg>
					</li>
					<li>
						<small-egg sColor="green"></small-egg>
					</li> -->
					<!--<li>
						<small-egg sColor="purplish"></small-egg>
					</li>
					 <li>
						<small-egg sColor="red"></small-egg>
					</li>
					<li>
						<small-egg sColor="blue"></small-egg>
					</li> -->
					<!-- <li>
						<small-egg sColor="big" isBigStatus="true"></small-egg>
					</li> -->
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
			smallEgg: () => import('../components/smallEgg')
		},
	}
</script>
<style lang="less" scoped>
	@import "./css/index.less";
</style>