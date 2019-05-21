<template>
    <div class="tab-warp">
        <div class="tab-list">
            <div v-for="(item,index) in tabList" 
                :key="index"
                @click="tabChange(index)"
                :class="{'item-active':tabSelected===index}"
                class="item">
                <img class="red-point" v-if="isShowRedPoint[index]" src="../images/tab/red-point.png" alt="">
                <img :src="tabSelected===index?item.selectImg:item.img" alt="">
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'taskTab',
    data() {
        return {
            tabList:[
                {name:'大师成就',img:require('../images/tab/master.png'),selectImg:require('../images/tab/master-select.png')},
                {name:'王者成就',img:require('../images/tab/king.png'),selectImg:require('../images/tab/king-select.png')},
            ],
            tabSelected:this.value
        }
    },
    props:{
        value:{
            type:Number,
            default:0
        },
        isShowRedPoint:{
            type:Array,
            default:()=>{return []},
        }
    },
    computed:{
        platSource () {
            return GLOBALS.getUrlParam('from')
        },
    },
    methods:{
        // tab 切换
        async tabChange(index){
            if(index===0){
                localStorage.TAB_TASK_INDEX = ''
                await GLOBALS.marchSetsPoint('A_H5PT0122001170', {
                    entrance: this.platSource
                })// H5平台-成就大厅-大师任务TAB
            }else if(index===1){
                localStorage.TAB_TASK_INDEX = 1
                await GLOBALS.marchSetsPoint('A_H5PT0122001171', {
                    entrance: this.platSource
                })//H5平台-成就大厅-王者任务TAB
            }
            this.tabSelected = index
        }
    },
    watch:{
        value(val){
            this.tabSelected = val
        },
        tabSelected(val){
            this.$emit('input',val)
        }
    }
}
</script>
<style lang="less" scoped>
.tab-warp{
    padding: 0 .3rem;
    box-sizing: border-box;
    .tab-list{
        border:0.01rem solid rgba(143, 151, 218, 0.68);
        width: 100%;
        height: 0.6rem;
        border-radius: 0.08rem;
        display: flex;
        overflow: hidden;
    }
    .item{
        flex: 1;
        color: #E5EAFF;
        font-size: 0.26rem;
        display: flex;
        justify-content: center;
        align-items:center;
        font-weight: 700;
        position: relative;
        img{
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.1rem
        }
        .red-point{
            position: absolute;
            top:0.02rem;
            width: 0.4rem;
            height: 0.17rem;
            right: 0.38rem;
        }
    }
    .item-active{
        background-color: #2B334F;
        color: #FEDFAC;
    }
}
</style>


