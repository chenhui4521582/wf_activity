<template>
	<div class="profit-container">
		<div class="profit-inner-container">
			<img src="../../images/package/profit/title.png" class="title">
			<h4 class="p-time">发榜倒计时：1天23:59:59</h4>
			<div class="profit-tx-container">
				<ul class="profit-icon">
					<li v-for="(item,index) in topthreeData">
						<div class="s-tx">
							<img :src="item.profilePhoto | filter">
						</div>
						<span class="icon-number"></span>
						<span class="s-text">第{{item.rank}}名</span>
						<div class="profit-award">{{item.awardsName.split('+')[0]}}+<br/>{{item.awardsName.split('+')[1]}}</div>
					</li>
				</ul>
			</div>
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
				<div class="p-items p-items-header">
					<ul class="p-item-title">
						<li>
							<span>排名</span>
							<span>昵称</span>
							<span>累计锤子</span>
							<span>奖励</span>
						</li>
					</ul>
				</div>
				<div class="p-items p-items-content" :class=" !isOpen?'p-its1':'' ">
					<ul class="p-item-title">
						<li v-for="(item,index) in behindThreeData">
							<span><i class="icon-dot">{{item.rank}}</i></span>
							<span>{{item.nickName || '暂无昵称'}}</span>
							<span>{{item.plantFoodNum}}个</span>
							<span>{{item.awardsName.split('+')[0]}}+<br/>{{item.awardsName.split('+')[1]}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="profit-footer" v-if="isOpen">仅30名及以内有奖励</div>
			<a href="javascript:" class="btn-check-profit" v-else @click.stop="closeOpenProfit">点击展开完整榜单</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { rankList } from '../../../utils/api'
	export default {
		data() {
			return {
				curIndex: 0,
				profitData: [],
				topthreeData: [],
				behindThreeData: [],
				isOpen: false
			}
		},
		components: {
		},
		mounted() {
			this.getGameProgress() 
		},
		methods: {
			closeOpenProfit() {
				this.isOpen = true
			},
			getGameProgress() {
				rankList().then((res)=> {
					console.log('res::', res)
					if(res.code == 200) {
						this.profitData = res.data
						this.behindThreeData = this.profitData.slice(3,this.profitData.length-3)
						this.topthreeData = this.profitData.slice(0,3)
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	@import './index.less';
</style>