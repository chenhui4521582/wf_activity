<template>
  <article class="top-btn">
    <section>
      <div class="back left" @click.stop="back()"></div>
      <div class="award right" @click.stop="openPop(2)">奖励</div>
    </section>
    <section>
      <div class="rule right" @click.stop="openPop(1)">规则</div>
    </section>
    <section>
      <ul class="level-switch left">
        <li v-for="item in levelArr" :key="item.level" :class="{selected:item.level===level}"
          @click="swtichLevel(item.level)">
          {{item.name}}</li>
      </ul>
    </section>
  </article>
</template>

<script>
export default {
  name: 'topBtn',
  components: {

  },
  data () {
    return {
      level: this.value,
      levelArr: [
        { level: 1, name: '第一大道' },
        { level: 2, name: '第二大道' },
        { level: 3, name: '第三大道' },
        { level: 4, name: '第四大道' }
      ]
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    swtichLevel (level) {
      this.level = level
      GLOBALS.marchSetsPoint('A_H5PT0297003544', { level: level }) // H5平台-猩猩点灯活动-关卡等级点击
    },
    openPop (type) {
      this.$emit('open-pop', type)
      switch (type) {
        case 1:
          GLOBALS.marchSetsPoint('A_H5PT0297003543') // H5平台-猩猩点灯活动-规则按钮点击
          break
        case 2:
          GLOBALS.marchSetsPoint('A_H5PT0297003536') // H5平台-猩猩点灯活动-奖励按钮点击
          break

        default:
          break
      }
    },
    back () {
      window.history.go(-1)
      GLOBALS.marchSetsPoint('A_H5PT0297003535') // H5平台-猩猩点灯活动-返回按钮点击
    }
  },
  watch: {
    value (val) {
      this.level = val
    },
    level (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.top-btn {
  position: fixed;
  width: 100vw;
  top: 0.16rem;
  text-align: center;
  pointer-events: none;
  section {
    &:not(:last-child) {
      overflow: hidden;
    }
    &::after {
      content: '';
      clear: both;
    }
    .left {
      float: left;
      margin-left: 0.16rem;
    }
    .right {
      float: right;
      margin-right: 0.1rem;
      border-radius: 0.24rem;
      line-height: 0.26rem;
      padding: 0.2rem 0;
      width: 0.46rem;
    }
    .back {
      width: 0.5rem;
      height: 0.5rem;
      background: url('../img/back.png') no-repeat center center;
      background-size: 100% 100%;
      pointer-events: auto;
    }
    .award {
      background: rgba(255, 255, 255, 0.57);
      margin-bottom: 0.14rem;
      pointer-events: auto;
      color: #1c1c1c;
    }
    .rule {
      background: rgba(255, 255, 255, 0.57);
      margin-bottom: 0.1rem;
      pointer-events: auto;
      color: #1c1c1c;
    }
    .level-switch {
      width: 1.16rem;
      height: 2.86rem;
      background: url('../img/switch-bg.png') no-repeat center center;
      background-size: 100% 100%;
      color: #792e10;
      box-sizing: border-box;
      padding: 0.68rem 0 0;
      font-weight: bold;
      pointer-events: auto;
      font-size: 0.22rem;
      li {
        padding: 0.1rem 0;
        white-space: nowrap;
        &.selected {
          color: #fdac48;
        }
      }
    }
  }
}
</style>
