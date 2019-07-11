<template>
	<div class="hit-percent">
		<div class="hb-task-box">
            <div class="percent-box">
                <div class="percent-number" :style="{width:wpercent}"></div>
            </div>
            <ul>
                <li v-for="item in envelopsItem" v-if="!item.dot">
                    <h2>累计充值</h2>
                    <h4>满{{item.taskOps}}元</h4>
                    <div class="hb-line"></div>
                    <div class="envelopes">{{item.awardsNum}}个</div>
                    <div class="btn btn-complete" v-if="item.taskStatus == 2">已领取</div>
                    <div class="btn btn-receive" v-if="item.taskStatus == 0"
                       @click="getjiazbonus(item)">领取</div>
                    <div class="btn btn-default" v-if="item.taskStatus == 1"
                       @click="gotocomplete">去完成</div>
                </li>
                <li class="hb-dot-box" v-else>
                    <span class="hb-dot hb-dot1"></span>
                    <span class="hb-dot"></span>
                </li>
            </ul>
        </div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				hbItems: null,
				hbTestData: [{
                    "taskId": 412,
                    "taskOps": 10,
                    "finishNum": 0,
                    "taskStatus": 2,
                    "awardsNum": 1,
                }, {
                    "taskId": 413,
                    "taskOps": 28,
                    "finishNum": 0,
                    "taskStatus": 2,
                    "awardsNum": 2,
                }, {
                    "taskId": 414,
                    "taskOps": 58,
                    "finishNum": 57,
                    "taskStatus": 2,
                    "awardsNum": 3,
                }, {
                    "taskId": 415,
                    "taskOps": 128,
                    "finishNum": 64,
                    "taskStatus": 0,
                    "awardsNum": 6,
                }, {
                    "taskId": 416,
                    "taskOps": 320,
                    "finishNum": 2,
                    "taskStatus": 2,
                    "awardsNum": 20,
                }, {
                    "taskId": 417,
                    "taskOps": 620,
                    "finishNum": 0,
                    "taskStatus": 2,
                    "awardsNum": 30,
                }, {
                    "taskId": 418,
                    "taskOps": 1200,
                    "finishNum": 1200,
                    "taskStatus": 0,
                    "awardsNum": 58,
                }, {
                    "taskId": 421,
                    "taskOps": 16961,
                    "finishNum": 2,
                    "taskStatus": 2,
                    "awardsNum": 888,
                }, {
                    "taskId": 419,
                    "taskOps": 3080,
                    "finishNum": 1540,
                    "taskStatus": 2,
                    "awardsNum": 188,
                }, {
                    "taskId": 420,
                    "taskOps": 8080,
                    "finishNum": 0,
                    "taskStatus": 2,
                    "awardsNum": 500,
                }],
			}
		},
		mounted() {
			this.getEnvelopesList()
		},
		computed: {
			envelopsItem() {
                if (!this.hbItems) {
                    return []
                }

                // 获取最大值
                let maxItem = this.hbItems&&this.hbItems.length&&this.hbItems.sort((a, b) => {
                    return a.taskOps - b.taskOps
                })[this.hbItems.length - 1]

                // 删除数组最后一位
                const data=this.hbItems.slice()
                data.pop()

                let nArr = data.filter((item) => {
                    return item.taskStatus != 2
                }).sort((a, b) => {
                    return a.taskOps - b.taskOps
                })
                let tArr = data.filter((item) => {
                    return item.taskStatus == 2
                }).sort((a, b) => {
                    return a.taskOps - b.taskOps
                })
                let result = []
                if (nArr.length > 4) {
                    result = nArr.splice(0, 4)
                    // result.push(nArr.pop())
                    // 个数大于5个的时候加个dot
                    result.splice(4, 0, {dot: true})
                    result.push(maxItem)
                    return result
                } else if (nArr.length == 4) {
                    result = nArr.splice(0, 4)
                    result.push(maxItem)
                    return result
                } else {
                    result = [...this.getList(nArr, tArr), maxItem]
                    return result
                }

            },
			wpercent() {
                if (!this.hbItems||this.hbItems.length==0) {
                    return
                }
                if (this.hbItems && this.envelopsItem) {
                    if (this.envelopsItem && this.envelopsItem[this.envelopsItem.length - 1] && this.envelopsItem[this.envelopsItem.length - 1].taskStatus != 1) {
                        return '100%'
                    } else {
                        let minUnfinished = this.hbItems.filter((item) => {
                            return item.taskStatus == 1
                        }).sort((a, b) => {
                            return a.taskOps - b.taskOps
                        })[0]
                        let idArr = [...this.envelopsItem.map(c => c.taskId)].indexOf(minUnfinished.taskId)
                        if (this.envelopsItem.length == 6) {
                            if (idArr == -1) {//在省略号里
                                console.log(parseFloat(5 * 100 / 6).toFixed(2) + '%')
                                return parseFloat(5 * 100 / 6).toFixed(2) + '%'
                            } else {
                                if (idArr == 0) {
                                    return parseFloat((idArr + minUnfinished.finishNum / (minUnfinished.taskOps)) * 100 / 12) + '%'
                                } else {
                                    return parseFloat((1 / 12 + (idArr - 1) / 6 + minUnfinished.finishNum / (minUnfinished.taskOps) / 6) * 100) + '%'
                                }
                            }
                        } else {
                            if (idArr == 0) {
                                return parseFloat((idArr + minUnfinished.finishNum / (minUnfinished.taskOps)) * 100 / 12) + '%'
                            } else {
                                return parseFloat((1 / 12 + (idArr - 1) * 5 / 24 + minUnfinished.finishNum / (minUnfinished.taskOps) * 5 / 24) * 100) + '%'
                            }
                        }
                    }
                } else {
                    return 0
                }
            },
		},
		methods: {
			// 获取红包任务列表
            getEnvelopesList() {
                this.axios.post('//platform-api.beeplay123.com/task/api/usertask/platCommonTaskByBatch', {
                    value: "SpringFestival-recharge"
                }).then((res) => {
                    if (res.data.code == 200) {
                        // this.hbItems = res.data.data
                        this.hbItems = this.hbTestData

                    }
                })
            },
			getList(newArr, completeArr, maxItem) {
                if (newArr.length < 4) {
                    var len = 4 - newArr.length;
                    return newArr.concat(completeArr.splice(completeArr.length - len, len)).sort(function (a, b) {
                        return a.taskOps - b.taskOps
                    })
                }
            },
		}
	}
</script>
<style lang="less" scoped>
	.hb-task-box {
        padding: 0 0.07rem;
        ul {
            display: flex;
        }
        .percent-box {
            width: 5.86rem;
            height: 0.15rem;
            background: #fff;
            border-radius: 0.05rem;
            position: absolute;
            left: 0.3rem;
            top: 1.01rem;
            border-radius: 0.08rem;
            .percent-number {
                /*width: 40%;*/
                height: 0.15rem;
                position: absolute;
                left: 0;
                top: 0;
                background: #C93B34;
                border-radius: 0.08rem;
                &:after {
                    content: '';
                    width: 0.23rem;
                    height: 0.23rem;
                    /*background: url(./images/percent-dot.png) no-repeat;*/
                    background-size: 100% 100%;
                    position: absolute;
                    right: -0.1rem;
                    top: -0.04rem;
                }
            ;
            }
        }
        li {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            h2 {
                font-size: 0.2rem;
                font-weight: 500;
                color: rgba(239, 97, 62, 1);
                padding-top: 0.28rem;
            }
            h4 {
                font-size: 0.22rem;
                font-weight: 800;
                color: rgba(245, 49, 0, 1);
                margin: 0.1rem auto 0.05rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap
            }
            &:last-child h4 {
                max-width: 1.2rem;
            };
            .hb-line {
                width: 2px;
                height: 0.48rem;
                background: rgba(242, 171, 67, 1);
                border-radius: 1px;
            }
            &.hb-dot-box {
                flex: 0 0 .6rem;
            }
            .hb-dot {
                display: block;
                width: 0.27rem;
                height: 0.06rem;
                /*background: url(./images/dot.png) no-repeat;*/
                background-size: 100% 100%;
                &.hb-dot1 {
                    margin: 0.54rem auto 1.15rem;
                }
            }
            .envelopes {
                width: 0.59rem;
                height: 0.3rem;
                /*background: url(./images/envelopes.png) no-repeat;*/
                background-size: 100% 100%;
                margin: 0.04rem auto 0.11rem;
                font-size: 0.2rem;
                color: #fff;
                text-align: center;
                padding-top: 0.51rem;
            }
            .btn {
                display: block;
                width: 0.89rem;
                height: 0.46rem;
                font-size: 0.24rem;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                &.btn-receive {
                    /*background: url(./images/btn-receive.png) no-repeat;*/
                    background-size: 100% 100%;
                    color: rgba(255, 236, 203, 1);
                }
                &.btn-default {
                    /*background: url(./images/btn-default.png) no-repeat;*/
                    background-size: 100% 100%;
                    color: #FFECCB;
                }
                &.btn-complete {
                    font-size: 0.24rem;
                    color: #EA8C12;
                }
            }
        }
    }
</style>