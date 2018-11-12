<template>
	<div class="page-header">
		<div class="page-back">
			<a :href="linkHref">
				<img src="../images/h-back.png" class="h-back" style="transform: rotate(180deg)">
			</a>
		</div>{{text}}
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			text: {
				type: String,
				default: ''
			},
			linkHref: {
				type: String,
				default: 'javascript:'
			}
		}
	}
</script>
<style lang="less">
	.page-header {
		width: 100%;
		height: 1.76/2rem;
		line-height: 1.76/2rem;
		position: relative;
		text-align: center;
		font-size: 0.68/2rem;
		color: #000;
		.page-back {
			width: 1.24/2rem;
			height: 1.76/2rem;
			position: absolute;
			left: 0;
			top: 0;
		}
		.h-back {
			width: 0.4/2rem;
			height: 0.68/2rem;
			float: right;
			margin-top: 0.54/2rem;
		}
	}
</style>
