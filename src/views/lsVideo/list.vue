<template>
    <div class="wrap">
        <div class="title" v-if="currentIndex == 2">
          {{item.oddsResult}}一杆击中
        </div>
        <div class="title" v-if="currentIndex == 1">
          一杆{{X}}球
        </div>
        <div class="award">
          {{item.oddsResult}}
        </div>
        <div class="user-info">
          <div class="avatart">
            <img v-if="item.headPortrait" :src="item.headPortrait" alt="">
          </div>
          <div class="name">{{item.userName}}</div>
          <div class="time">{{item.time}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'list',
    props: {
        item: {
            type: Object,
            default: ()=> ({})
        },
        currentIndex: {
            default: ''
        }
    }
}
</script>
<style scoped lang="less">

</style>