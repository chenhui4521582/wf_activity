<template>
    <div class="details-warp">
        <div class="details-content">
            <base-header title="商品详情"></base-header>
            <!-- 头图 -->
            <div class="title-warp">
                <div class="banner-title">
                    <img :src="bannerImg | filter" alt="">
                </div>
                <div class="title-tet">
                    <div class="item">{{currentItem.name}}</div>
                    <span>{{currentItem.allConvertedQuota}}人已获取</span>
                </div>
            </div>
            <!-- 规格 -->
            <div class="spec-warp">
                <div class="spec-item" v-if="currentList.length>1" >
                    <div class="item-title">规格</div>
                    <div class="item-content-spec">
                        <template  v-for="(item,index) in currentList">
                            <span
                                v-if="item.specs"
                                :key="index"
                                :class="{'item-active':selectedIndex===index}"
                                @click="changeSpec(index)"
                                class="item-content-child">
                                {{item.specs}}</span>
                        </template>
                        
                    </div>
                </div>
                <div class="spec-item" style="margin-bottom:0.2rem">
                    <div class="item-title">已选</div>
                    <div class="item-content item-content-title">{{currentList[selectedIndex].name}}</div>
                </div>
                <div class="spec-item-line"></div>
                <div class="spec-item">
                    <div class="item-title">数量</div>
                    <div class="item-content">
                        <span class="item-number-title" v-if="allUsersTodayAvailableQuota">（剩余库存充足）</span>
                        <span class="item-number-title" v-if="!allUsersTodayAvailableQuota">（剩余库存为0）</span>
                        <div class="item-number-add">
                            <field v-model="specNumber" :store-max="currentItem.allUsersTodayAvailableQuota"></field>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 详情 -->
            <div class="spec-warp description-warp">
                <div class="title">商品详情</div>
                <div class="details" id="product_description" v-html="currentItem.description"></div>
            </div>
        </div>
        <div class="button-warp" @click="goExchange">
            <div class="save-button" :class="{'save-button-on':!allUsersTodayAvailableQuota}">
                <span v-if="allUsersTodayAvailableQuota">{{currentItem.purchasePrice*specNumber}}话费券换取</span>
                <span v-if="!allUsersTodayAvailableQuota">已售罄</span>
            </div>
          
        </div>
        <!-- 提升弹框 -->
        <dialog-mask v-model="dialogShow" :status-code="statusCode" @on-checkprize="checkprize" />
    </div>
</template>
<script>
import baseHeader from "../components/baseHeader/baseHeader"
import field from '../components/field/field'
import {placeOrder} from "../utils/api"
import  dialogMask from "../components/dialog/dialog"
import {getUrlParam} from "../utils/common"
import { setTimeout, clearTimeout } from 'timers';
export default {
    name:"detailsPage",
    components:{baseHeader,field,dialogMask},
    data() {
        return {
            selectedIndex:0,
            specNumber:1,
            requestType:false,
            dialogShow:false,
            statusCode:'',
            TIME:null, 
        }
    },
    computed:{
        bannerImg(){
            const list = localStorage.getItem('BILL_DETAILS')
            return list?JSON.parse(list)[0].picture:''
        },
        currentItem(){
            const list = localStorage.getItem('BILL_DETAILS')
            return list?JSON.parse(list)[this.selectedIndex]:{}
        },
        currentList(){
            const list = localStorage.getItem('BILL_DETAILS')
            return list?JSON.parse(list):[]
        },
        allUsersTodayAvailableQuota(){
            return this.currentItem.allUsersTodayAvailableQuota&&this.currentItem.allUsersTodayAvailableQuota!=0?true:false
        }
    },
    mounted(){
        this.setDetailsImgWidth();
    },
    watch:{
        selectedIndex(to,form){
            if(to!==form){
                this.TIME = setTimeout(()=>{
                   this.setDetailsImgWidth();
                },0)
            }
        }
    },
    destroyed(){
        if(this.TIME){
            clearTimeout(this.TIME)
        }
    },
    methods:{
        // 切换规格
        changeSpec(index){
            this.selectedIndex  = index;
            this.specNumber = 1;
        },
        // 兑换话费
        async goExchange(){
            const {id,purchasePrice} = this.currentItem
            const {accountBalance} = this.$route.query
            // 话费不足
            if(this.specNumber*purchasePrice>accountBalance){
                this.dialogShow = true;
                this.statusCode = 102;
                return ;
            }
            // 库存不足
            if(!this.allUsersTodayAvailableQuota){return}
            // 防止用户疯狂点击请求接口
            if(this.requestType){return}
            this.requestType = true;
            const {data,code,message} = await placeOrder(id,this.specNumber)
            if(code===102||code===104||code===200){
                this.dialogShow = true;
            }else{
                this.$toast.show({
                    message: message,
                    duration: 1500,
                    isShowMask: true
                })
            }
            // 兑换成功后减去话费劵 --防止关闭继续点击
            if(code===200){
                const {query} = this.$route;
                query.accountBalance = this.specNumber*purchasePrice;
                this.$router.push({query})
            }
            this.statusCode = code
            this.requestType = false;
        },
        // 去领奖
        checkprize () {
            const item = this.currentItem;
            if (item.phyAwardsType && [1, 26, 32].includes(item.phyAwardsType)) {
                switch (getUrlParam('from')) {
                case 'bdWap':
                    parent.location.href = 'https://wap.beeplay123.com/bdWap/#/schedule'
                    break
                case 'jsWap':
                    parent.location.href = 'https://wap.beeplay123.com/jsWap/#/schedule'
                    break
                case 'miniWap':
                    parent.location.href = 'https://wap.beeplay123.com/miniWap/#/schedule'
                    break
                default:
                    parent.location.href = 'https://wap.beeplay123.com/wap/home/#/schedule'
                }
            } else {
                switch (getUrlParam('from')) {
                case 'bdWap':
                    parent.location.href = 'https://wap.beeplay123.com/bdWap/#/personal?openMyWard=1'
                    break
                case 'jsWap':
                    parent.location.href = 'https://wap.beeplay123.com/jsWap/#/personal?openMyWard=1'
                    break
                case 'miniWap':
                    parent.location.href = 'https://wap.beeplay123.com/miniWap/#/personal?openMyWard=1'
                    break
                default:
                    parent.location.href = 'https://wap.beeplay123.com/wap/home/#/personal?openMyWard=1'
                }
            }
        },
        setDetailsImgWidth(){
            const product_description = document.getElementById('product_description')
            const imgList = product_description.getElementsByTagName('img')
            for(let i=0;i<imgList.length;i++){
                imgList[i].style.width = "100%"
                imgList[i].style.height = "auto"
            }
        }
    }
}
</script>
<style lang="less" scoped>
.details-warp{
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    
    overflow-y: scroll;
    background-color: #0f1726;
    .details-content{
        padding: 0 0.3rem;
    }
}
.banner-title{
    height: 2.7rem;
    border-top-right-radius: 0.18rem;
    border-top-left-radius: 0.18rem;
    overflow: hidden;
    img{
        width: 100%;
    }
}
.title-tet{
    height: 1rem;
    line-height: 1rem;
    display: flex;
    padding: 0 0.3rem;
    box-sizing: border-box;
    background-color: #141F33;
    .item{
        flex:1;
    }
    div{
        font-size: 0.32rem;
        font-weight: 500;
        color: #ffffff;
    }
    span{
        text-align: right;
        color: #8B8B8C;
        font-size: 0.2rem;
    }

}
.spec-warp{
    width: 100%;
    padding: 0.3rem 0.3rem 0.1rem 0.3rem;
    border-radius: 0.12rem;
    background-color: #141F33;
    box-sizing: border-box;
    margin-top: 0.2rem;
    .spec-item{
        display: flex;
        line-height: 0.42rem;
        margin-bottom: 0.2rem;
        &:first-child{
            margin-bottom:0;
        }
        .item-title{
            width: 0.7rem;
            flex:0 0.7rem;
            color: #8B8B8C;
            font-size: 0.24rem;
        }
        .item-content-spec{
            font-size: 0;
            flex:1;
            .item-content-child{
                margin-top: 0.02rem;
                display: inline-block;
                padding: 0.11rem 0.32rem;
                height: 0.42rem;
                margin-right: 0.24rem;
                border:0.02rem solid #595E68;
                border-radius: 0.21rem;
                font-size: 0.2rem;
                color: #ffffff;
                text-align: center;
                box-sizing: border-box;
                line-height: 0.21rem;
                margin-bottom: 0.2rem;
            }
            .item-active{
                background-color: #223452;
            }
        }
        .item-content{
            flex:1;
            display: flex;
            .item-number-title{
                color: #8B8B8C;
                font-size: 0.24rem;
                flex: 1
            }
            .item-number-title{
                flex: 1
            }
        }
        .item-content-title{
            font-size: 0.24rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 0.42rem;
        }
    }
    .spec-item-line{
        border: 0.02rem dashed rgba(255,255,255,0.5);
        margin-bottom: 0.2rem;
    }
}
.description-warp{
    color: #ffffff;
    .title{
        font-size: 0.24rem;
        font-weight: 700;
        margin-bottom: 0.2rem;
    }
    .details{
        font-size: 0.22rem;
        width: 100%;
        overflow: hidden;
    }
}
.button-warp{
    height: 0.9rem;
    width: 100%;
    .save-button{
        height: 0.9rem;
        width: 100%;
        background-color: #EE6F0B;
        position: fixed;
        bottom: 0;
        left: 0;
        line-height: 0.9rem;
        text-align: center;
        font-size: 0.28rem;
        color: #ffffff;
    }
    .save-button-on{
        background-color: #808080;
    }
}

</style>


