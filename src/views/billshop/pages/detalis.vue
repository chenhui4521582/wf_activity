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
    border-top-right-radius: 0.08rem;
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
</style>


