<template>
    <div class="pop-window">
        <div class="pop-mask" @touchmove.prevent></div>
        <div class="receive-pop" ref="receive-pop" :class="{'bigbg':title == '活动规则'}">
            <p><i @click="close"></i>{{title}}</p>
            <div class="slot" ref="slot" style="position: relative">
                <slot></slot>
            </div>
            <template v-if="isShowBtn">
                <div class="besure" @click="besure" v-html="btnName" ref="besure"></div>
            </template>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: {
            title: {
                type: String,
                default:''
            },
            btnName:{
                type: String,
                default:"确认"
            },
            isShowBtn: {
                default: true
            }
        },
        data() {
            return {
                convert: [],
                showReceivePop: false,
                awardsName: ''
            }
        },
        methods: {
            close(val) {
                if (val == 'back') {
                    this.$emit('close', true);
                }else {
                    this.$emit('close', false);
                }
            },
            besure(){
                this.$emit('besure');
            },
            getComputedStyle(ele, attr){
              return window.getComputedStyle(ele, null)[attr]
            }
        },
        mounted() {
            let top = this.title == '活动规则' ? 54*1.5 : 0
            this.$nextTick(()=>{
                this.$refs.slot.style.height=(this.$refs.besure.offsetTop-this.$refs["slot"].offsetTop+top+parseInt(this.getComputedStyle(this.$slots.default[0].elm,'height')))+'px'
            })
        }
    }
</script>
<style lang="less" scoped>
    .pop-window{z-index: 13;}
    .pop-mask {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background: #000;
      opacity: 0.5;
      filter:alpha(opacity=50);
      z-index: 10;
    }
    .fragment-coupons {
        width: 84%;
        height: 7.01rem;
        background: url(../images/fragment-bg-top.png) repeat-x;
        background-size: 100% 1.3rem;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        border: 0.02rem solid #304a92;
        border-radius: 0.08rem;
        z-index: 14;
        .pop-close {
            width: 0.68rem;
            height: 0.68rem;
            position: absolute;
            right: -0.34rem;
            top: -0.34rem;
        }
        .f-content-bg {
            background: url(../images/fragment-bg-content.png) repeat-x;
            height: 5.33rem;
            padding-top: 0.4rem;
            background-size: 100% 100%;
            .f-content {
                .f-content-title {
                    width: 3.48rem;
                    height: 0.68rem;
                    line-height: 0.68rem;
                    text-align: center;
                    background: url(//file.beeplay123.com/cdn/wap/images/knapsack/k-sprite.png) -0.1rem -0.1rem;
                    background-size: 3.72rem 2.43rem;
                    margin: 0rem auto 0.4rem;
                    font-size: 0.32rem;
                    color: #fff;
                    span {
                        color: #fedb46;
                    }
                }
                .f-items {
                    ul {
                        text-align: center;
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                    }
                    li {
                        flex: 0 0 33%;
                        margin-bottom: 0.4rem;
                        text-align: center;
                        display: inline-block;
                        .btn-fragment {
                            display: block;
                            width: 1.06rem;
                            height: 0.44rem;
                            line-height: 0.44rem;
                            text-align: center;
                            background: #193261;
                            margin: 0.27rem auto 0;
                            border-radius: 0.17rem;
                            font-size: 0.24rem;
                            color: #fff;
                            &.active {
                                background: #2a59ae;
                            }
                        }
                        .f-item-box {
                            width: 1.15rem;
                            margin: 0 auto;
                            img {
                                width: 1.15rem;
                                height: 0.58rem;
                            }
                        }
                    }
                }
            }
            .fragment-coupons-info {
                height: 0.3rem;
                line-height: 0.3rem;
                font-size: 0.2rem;
                color: #ccc;
                text-align: center;
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0.4rem;
            }
        }
    }
    .receive-pop {
        position: fixed;
        left: 50%;
        top: 2rem;
        transform: translateX(-50%);
        width: 80%;
        min-height: 4rem;
        background: #0F1726;
        text-align: center;
        z-index: 11;
        &.bigbg{width: 87%;}
        p:first-child {
            height: .8rem;
            line-height: .8rem;
            background: #141F33;
            font-size: .26rem;
            i {
                float: right;
                width: .4rem;
                height: .8rem;
                &::after {
                    content: '';
                    display: inline-block;
                    margin-top: .25rem;
                    margin-right: .2rem;
                    width: .2rem;
                    height: .2rem;
                    vertical-align: top;
                    background: url(../images/close-small.png) no-repeat;
                    background-size: 100%;
                }
            }
        }
        p:nth-of-type(2) {
            padding: .7rem 0 1.1rem;
            font-size: .24rem;
            i {
                color: #FFD338
            }
        }
        div.besure {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto .4rem;
            width: 1.8rem;
            height: .6rem !important;
            line-height: .6rem;
            background: #EE6F0B;
            border-radius: .08rem;
            font-size: .28rem;
            font-weight: bold;
        }
    }
</style>
