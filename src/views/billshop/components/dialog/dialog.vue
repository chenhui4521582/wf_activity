<template>
    <div class="dialog-warp" v-if="dialogShow">
        <div class="mask-warp"></div>
        <div class="content-warp">
            <div class="title-warp"></div>
        </div>
    </div>
</template>
<<script>
export default {
    name:'dialog',
    data() {
        return {
            dialogShow:this.value
        }
    },
    props:{
       value:{
           type:Boolean,
           default:true
       }
    },
    watch: {
        value(val){
            this.dialogShow = val
        },
        dialogShow(val){
            this.$emit('input',val)
        }
    },
}
</script>
<style lang="less" scoped>
.mask-warp{
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top:0;
    left: 0;
    z-index: 9;
}
.content-warp{
    min-height: 5.7rem;
    width: 6rem;
    position: absolute;
    top:50%;
    left: 50%;
    margin-left: -3rem;
    margin-top: -2.85rem;
    background-color: #0F1726;
    z-index: 10;
    border-radius: 0.08rem;
    overflow: hidden;
}
.title-warp{
    position: relative;
    
}
</style>

