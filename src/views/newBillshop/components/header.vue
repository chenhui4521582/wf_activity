<template>
	<div class="head">
		<div class="h-box" @click="goHistory"><img src="../images/newback.png" alt="" class="h-arrow">{{title}}</div>
    </div>
</template>
<script type="text/javascript">
	export default {
		props: {
			title: {
				default: null
			},
			accountBalance: {
				default: '0.00'
			}
		},
		mounted() {

		},
		methods: {
			goHistory() {
				GLOBALS.marchSetsPoint('A_H5PT0035000632', {
				  residual_phone: this.accountBalance
				})// H5平台-话费券商城-返回
				history.go(-1)
			}
		}
	}
</script>
<style lang="less" scoped>
	.head {
        font-size: 0.32rem;
        font-weight: bold;
        text-align: center;
        color: #fff;
        position: relative;
        padding: 0.28rem 0 0 0;
        .h-arrow {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.17rem;
        }
        .h-box {
        	height: 0.35rem;
        	display: flex;
        	align-items: center;
        }
        
    }
</style>