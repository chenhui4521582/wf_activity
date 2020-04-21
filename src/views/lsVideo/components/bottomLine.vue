<template>
    <div class="buttom-line">
        <div class="line"></div>
        <p :style="{'color': color}">{{message}}</p>
        <div class="line"></div>
    </div>
</template>
<script>
export default {
    name:'bottomLine',
    props:{
        message:{
            type:String,
            default:"不要再拉了，我是有底线的"
        },
        color: {
            type: String,
            default: '#fff'
        }
    }
}
</script>

<style lang="less" scoped>
.buttom-line{
    height: .4rem;
    line-height: .4rem;
    box-sizing: border-box;
    display: flex;
    p{
        width: 3rem;
        line-height: .4rem;
        font-size: .22rem;
        color: #fff;
        flex: 0 3rem;
        text-align: center;
    }
    .line{
        flex: 1;
        width: .88rem;
        height: 1px;
        background-color: #E0E0E0;
        margin-top: .19rem;
    }
}
</style>

