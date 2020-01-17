<template>
    <div class="wrap">
        <div class="title" v-if="currentIndex == 2">
          {{item.amount}}一杆击中
        </div>
        <div class="title" v-if="currentIndex == 1">
          一杆{{item.ballNum}}球
        </div>
        <div class="award" v-if="currentIndex == 2">
          {{item.ratePoolAwards}}万奖励
        </div>
        <div class="award" v-if="currentIndex == 1">
          {{item.oddsResult}}万奖励
        </div>
        <div class="user-info">
          <div class="avatar">
            <img v-if="item.headPortrait" :src="item.headPortrait" alt="">
            <img v-else src="./img/img_photo.png" alt="">
          </div>
          <div class="name">{{item.userName}}</div>
          <div class="time">{{item.createTime | formatTime('y-m-d')}}</div>
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
.title {
  margin: .24rem auto 0;
  width: 1.8rem;
  height: .32rem;
  line-height: .32rem;
  text-align: center;
  color: #fff;
  font-size: .22rem;
}
.award {
  margin: .56rem auto 0;
  width: 1.9rem;
  height: .4rem;
  line-height: .4rem;
  text-align: center;
  color: #fff;
  font-size: .22rem;
  background:rgba(246,56,89,.9);
  border-radius: .2rem;
}
.user-info {
  margin-top: .43rem;
  padding: 0 .17rem;
  height: .48rem;
  line-height: .48rem;
  overflow: hidden;
  white-space: nowrap;
  .avatar{
    margin: .06rem .1rem 0 0;
    float: left;
    width: .36rem;
    height: .36rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
  .name {
    float: left;
    font-size: .2rem;
    font-weight: bold;
    color: #fff;
  }
  .time {
    float: right;
    font-size: .18rem;
    color: #fff;
  }
}
</style>