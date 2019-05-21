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
                <div class="spec-item" >
                    <div class="item-title">规格</div>
                    <div class="item-content">
                        <span v-for="(item,index) in currentList" 
                            :key="index"
                            :class="{'item-active':selectedIndex===index}"
                            class="item-content-child">
                            {{item.purchasePrice}}元</span>
                    </div>
                </div>
                <div class="spec-item" >
                    <div class="item-title">已选</div>
                    <div class="item-content item-content-title">{{currentList[selectedIndex].name}}</div>
                </div>
                <div class="spec-item-line"></div>
                <div class="spec-item">
                    <div class="item-title">规格</div>
                    <div class="item-content">
                        <span class="item-number-title">（剩余库存充足）</span>
                        <div class="item-number-add">

                        </div>
                    </div>
                </div>
            </div>
            <!-- 详情 -->
            <div class="spec-warp">
                <div class="title">商品详情</div>
                <div class="details" v-html="currentItem.description"></div>
            </div>
        </div>
    </div>
</template>
<script>
import baseHeader from "../components/baseHeader/baseHeader"
export default {
    name:"details",
    components:{baseHeader},
    data() {
        return {
            selectedIndex:0
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
    padding-bottom: 0.9rem;
    overflow-y: scroll;
    background-color: #0f1726;
    .details-content{
        padding: 0 0.3rem;
    }
}
.banner-title{
    height: 2.7rem;
    border-top-right-radius: 0.18rem;
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
    min-height: 2.3rem;
    width: 100%;
    padding: 0.3rem 0.3rem 0.1rem 0.3rem;
    border-radius: 0.12rem;
    background-color: #141F33;
    box-sizing: border-box;
    margin-top: 0.2rem;
    .spec-item{
        display: flex;
        height: 0.42rem;
        line-height: 0.42rem;
        margin-bottom: 0.2rem;
        .item-title{
            width: 0.7rem;
            flex:0 0.7rem;
            color: #8B8B8C;
            font-size: 0.24rem;
        }
        .item-content{
            flex:1;
            display: flex;
            .item-content-child{
                width: 1.3rem;
                height: 0.42rem;
                flex: 0 1.3rem;
                margin-right: 0.42rem;
                border:0.01rem solid #595E68;
                border-radius: 0.21rem;
                font-size: 0.2rem;
                color: #ffffff;
                text-align: center;
            }
            .item-active{
                background-color: #223452;
            }
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
</style>


