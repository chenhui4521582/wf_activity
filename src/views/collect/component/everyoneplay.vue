<template>
  <div class="mask">
    <div class="bg">
      <div class="play-title">
        <img src="../images/play/title.png" alt />
      </div>
      <!-- 中间 -->
      <div class="play-container">
        <div class="play-inner">
          <div class="play-list" v-for="(i,key) in list" :key="key">
            <img :src="i.img" />
            <div class="list-text">
              {{i.text}}
            </div>
          </div>
          <div class="play-bottom">
            <div class="play-button">
              <img src="../images/play/button.png" alt />
            </div>
            <div class="play-bottom-tips">
              小贴士：在斗地主、麻将、跑得快、枪火英雄、
              套圈中消耗金叶不计入任务中
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="congra-close" @click="closeplay">
      <img src="../images/comPop/close.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      closePlay: false,

      list: [
        { img: require(`../images/play/img.png`), text: '街机欢乐捕鱼' },
        { img: require(`../images/play/img.png`), text: '欢乐捕鱼' },
        { img: require(`../images/play/img.png`), text: '街机' },
        { img: require(`../images/play/img.png`), text: '机欢乐捕鱼' },
        { img: require(`../images/play/img.png`), text: '街欢乐捕鱼' },
        { img: require(`../images/play/img.png`), text: '街机欢乐鱼' }
      ]
    }
  },

  methods: {
    closeplay () {
      this.$emit('closeplay', this.closePlay)
    }
  }
}
</script>
<style lang="less">
.congra-close {
  position: absolute;
  //   top: 11.43rem;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  img {
    width: 0.52rem;
    height: 0.52rem;
  }
}
.play-title {
  position: relative;
  top: 2.95rem;
  display: flex;
  justify-content: center;

  img {
    width: 1.98rem;
    height: 0.38rem;
  }
}
.play-container {
  display: flex;
  justify-content: center;
}
.play-inner {
  width: 70%;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  top: 3rem;
  .play-list {
    width: 1.24rem;
    height: 1.69rem;
    float: left;
    margin-left: 0.2rem;
    margin-top: 0.2rem;

    .list-text {
      font-size: 0.2rem;
      font-weight: 800;
      color: rgba(255, 255, 255, 1);
      position: relative;
      bottom: 0.7rem;
      text-align: center;
      white-space: nowrap;
    }
    img {
      width: 1.24rem;
      height: 1.69rem;
    }
  }
  .play-bottom {
    width: 100% !important;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .play-bottom-tips {
      font-size: 0.2rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      display: inline-block;
      text-align: center;
    }
  }
  .play-button {
    display: flex;
    justify-content: center;
    img {
      width: 3.28rem;
      height: 0.98rem;
    }
  }
}
</style>