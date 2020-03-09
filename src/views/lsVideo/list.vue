<template>
    <div class="wrap" @click="handleClick()">
        <div class="title" v-if="currentIndex == 2">
          {{item.amount}}一杆击中
        </div>
        <div class="title" v-if="currentIndex == 1">
          一杆{{item.ballNum}}球
        </div>
        <div class="award" v-if="currentIndex == 2">
          {{item.ratePoolAwards}}奖励
        </div>
        <div class="award" :class="{'active': currentIndex == 1}" v-if="currentIndex == 1">
          {{item.odds}}倍
        </div>
        <div class="user-info">
          <div class="avatar">
            <img v-if="item.headPortrait" :src="item.headPortrait | filter" alt="">
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
    },
    from: {
      type: String,
      default: 'platFrom'
    },
    index: {
      default: ''
    }
  },
  methods: {
    handleClick() {
      if(this.from == 'game' && parent.playLsVideo) {
        let id = this.item.id
        parent.playLsVideo(id, this.currentIndex, this.index)
      }else {
        let id = this.item.id
        let channel = localStorage.getItem('APP_CHANNEL')
        location.href = `//wap.beeplaying.com/billiards/?channel=${channel}&id=${id}&index=${this.index}&type=${this.currentIndex}&time=${Date.now()}`
      }
    }
  }
}
</script>
<style scoped lang="less">
.in-game {
  .recommend-item {
    .title {
      margin: .22rem auto 0;
      width: 1.8rem;
      height: .34rem;
      line-height: .36rem;
      text-align: center;
      color: #fff;
      font-size: .22rem;
    }
  }
  .title {
    margin: .24rem auto 0;
    width: 1.8rem;
    height: .34rem;
    line-height: .34rem;
    text-align: center;
    color: #fff;
    font-size: .22rem;
  }
}
.recommend-item {
  .title {
    margin: .22rem auto 0;
    width: 1.8rem;
    height: .34rem;
    line-height: .39rem;
    text-align: center;
    color: #fff;
    font-size: .22rem;
  }
  .award {
     line-height: .4rem;
  }
}
.title {
  margin: .24rem auto 0;
  width: 1.8rem;
  height: .34rem;
  line-height: .36rem;
  text-align: center;
  color: #fff;
  font-size: .22rem;
}

.award {
  margin: .56rem auto 0;
  width: 1.9rem;
  height: .4rem;
  line-height: .44rem;
  text-align: center;
  color: #fff;
  font-size: .22rem;
  background:rgba(246,56,89,.9);
  border-radius: .2rem;
  &.active {
    background: #DD3DF0;
  }
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
    border-radius: 50%;
    overflow: hidden;
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
    width: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .time {
    float: right;
    font-size: .18rem;
    color: #fff;
  }
}
.in-game {
  .user-info {
    margin-top: .27rem;
  }
}
</style>