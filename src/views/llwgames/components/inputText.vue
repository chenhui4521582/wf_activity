<template>
	<div class="group-input">
		<div class="input-box " :class="line ? 'group-line':'' ">
			<span class="group-name">{{iName}}</span>
			<input :type="type" :placeholder="iPlaceholder"
			 :maxLength="maxLength" @input="updateVal($event.target.value)"/>

			 <span class="input-btn" v-if="isShowVerification">
				<button :disabled="!fetchCodeMsg" :class="!fetchCodeMsg ? 'disabled':'' "
				class="btn-verification" v-if="iVerification" @click="getVerification">
					<i v-if="fetchCodeMsg">获取验证码</i>
					<i v-else>重新获取({{timerCodeMsg}}s)</i>
				</button>
			</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				timerCodeMsg: '',
				fetchCodeMsg: true,
			}
		},
		props: {
			line: {
				type: Boolean,
				default: true
			},
			iName: {
				type: String,
				default: ''
			},
			iText: {
				type: String,
				default: ''
			},
			iPlaceholder: {
				type: String,
				default: ''
			},
			iVerification: {
				type: Boolean,
				default: false
			},
			maxLength : {
				type: Number,
				default: null
			},
			type: {
				type: String,
				default: 'text'
			},
			isShowVerification: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
		},
		methods: {
			countDown() {
				var that = this;
				let SECONDS = 60;
				let sec =SECONDS;
				that.fetchCodeMsg = false;
			    for(let  i=0; i<=SECONDS; i++){
			       setTimeout(function(){
			           if (sec != 0) {
			             that.timerCodeMsg = sec;
			            sec--;
			         } else {
			             sec = SECONDS;
			             that.fetchCodeMsg = true;
			        }
			       }, i * 1000)
			     }
			},
			updateVal(val){
				this.$emit('getVal',val)
			},
			getVerification() {
        		this.$emit('getCode');
			}
		}
	}
</script>
<style lang="less" scoped>
	.group-input {
		/*background: #193b73;*/
	}
	.btn-verification {
		position: absolute;
		right: 0;
		top: .36/2rem;
		width: 3.8/2rem;
	 	height: 1.2/2rem;
	 	line-height: 1.2/2rem;
	 	box-sizing: border-box;
	 	font-size: 0.48/2rem;
	 	color: #5597ff;
	 	border-radius: 0.16/2rem;
	 	box-sizing: border-box;
	 	margin-right: 0.6/2rem;
	 	&.disabled {
	 		border-color: #736f95;
   			 color: #736f95;
	 	}
	 	i {
	 		font-style: normal;
	 	}
	}
	.input-box {
		position: relative;
        width: 6.3rem;
		/*height: 1.9/2rem;*/
		line-height: 1.9/2rem;
		box-sizing: border-box;
		position: relative;
		display: flex;
		align-items: center;
        border: 1px solid #bdbdbd;
        border-radius: .45rem;
        margin-bottom: .5rem;
        padding-left: .1rem;
        box-sizing: border-box;
		/*.input-box {
			position: relative;
			display: flex;
		}*/
		.group-name {
			float: left;
			/*margin-top: .3/2rem;*/
            flex: 0 0 1.3rem;
			font-size: 0.6/2rem;
			color: #000;
		}
		.input-btn {
			display: block;
			height: 100%;
			flex: 1;
			
		}
		input {
			flex:.9;
			border: none;
			outline: none;
			height: 1.8/2rem;
            line-height: 1.8/2rem;
			font-size: 0.56/2rem;
			/*background: #193b73;*/
			color: #000;
		}
	}
</style>
