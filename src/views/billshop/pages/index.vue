<template>
  <div class="bill-shop">
	<base-header title="话费券商城"></base-header>
	<!-- 我的话费券 -->
	<div class="phone-nav">
		<div class="nav-item bill-left">
			我的话费券：<span>{{ accountBalance }}625652.00</span>
		</div>
		<div class="nav-item award-right">
			<div class="item-box" @click="goMyAward">查看我的奖品<img src="../images/arrow-right.png" class="award-arrow"></div>
		</div>
    </div>
	<!-- 分类tab切换 -->
	<div class="tab-warp">
		<div class="item-tab" v-for="(tab,index) in tabList" 
			:key="index"
			:class="{'active': selectedIndex == index}"
			@click="getNewList(tab,index)"
		>{{tab}}</div>
	</div>
  </div>
</template>
<script>
import baseHeader from "../components/baseHeader/baseHeader"
import {billList} from "../utils/api"
import {getUrlParam} from "../utils/common"
export default {
	name:'index',
	components:{baseHeader},
	data() {
		return {
			accountBalance:'',
			rewardList:[],
			selectedIndex:0,
		}
	},
	mounted(){
		this.pageInit()
	},
	computed:{
		tabList(){
			if (this.rewardList.length>0) {
				return this.rewardList.map(item=>{
					return item.name
				})
			}
		}
	},
	methods:{
		// 页面初始化获取列表
		async pageInit(){
			const {data,code} = await billList()
			if(code===200){
				this.rewardList = data.categoryList;
				this.accountBalance =data.accountBalance
				console.log(this.rewardList)
			}
		},
		// 查看我的奖品
		async goMyAward () {
			// H5平台-话费券商城-查看我的奖品
			await GLOBALS.marchSetsPoint('A_H5PT0035000633', {  residual_phone: this.accountBalance})
			switch (getUrlParam('from')) {
				case 'bdWap':
				parent.location.href = 'https://wap.beeplay123.com/bdWap/#/personal?openMyWard=1'
				break
				case 'jsWap':
				parent.location.href = 'https://wap.beeplay123.com/bdWap/#/personal?openMyWard=1'
				break
				case 'miniWap':
				parent.location.href = 'https://wap.beeplay123.com/miniWap/#/personal?openMyWard=1'
				break
				default:
				parent.location.href = 'https://wap.beeplay123.com/wap/home/#/personal?openMyWard=1'
			}
		},
		// 标题切换
		getNewList (item, index) {
			switch (index) {
				case 0:
				GLOBALS.marchSetsPoint('A_H5PT0035000634', {
					residual_phone: this.accountBalance
				})// H5平台-话费券商城-好物推荐
				break
				case 1:
				GLOBALS.marchSetsPoint('A_H5PT0035000636', {
					residual_phone: this.accountBalance
				})// H5平台-话费券商城-手机数码
				break
				case 2:
				GLOBALS.marchSetsPoint('A_H5PT0035000635', {
					residual_phone: this.accountBalance
				})// H5平台-话费券商城-虚拟卡券
				break

				default:
				break
			}
			this.selectedIndex = index
    	},
	}
}
</script>
<style lang="less" scoped>
.bill-shop {
    height: 100%;
    min-height: 100vh;
    background: #0F1726;
    padding: 0 0.3rem;
    color: #fff;
	font-size: 0.24rem;
}
.phone-nav{
	display: flex;
	height: 1rem;
	width: 100%;
	.nav-item{
		flex: 1;
		position: relative;
	}
	.bill-left{
		line-height: 1rem;
		span{
			font-size: 0.32rem;
			font-weight: 500;
		}
	}
	.item-box{
		position: absolute;
		right: 0;
		top:0.15rem;
		box-sizing: border-box;
		width: 2.34rem;
		height: 0.7rem;
		background-color: #346ACC;
		border-radius: 0.35rem;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .24rem;
		.award-arrow{
			width: 0.3rem;
			height: 0.3rem;
		}
	}
}
.tab-warp{
	margin-top: 0.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background:rgba(15,23,38,1);
	border:0.02rem solid rgba(30,46,76,1);
	border-radius:0.08rem;
    .item-tab {
      height: 0.56rem;
      line-height: 0.56rem;
      flex: 1;
      font-size: 0.26rem;
      font-weight: bold;
      &.active {
        background:rgba(20,31,51,1);
        border-radius:0.08rem;
        color: #E39B25;
      }
    }
}
</style>

