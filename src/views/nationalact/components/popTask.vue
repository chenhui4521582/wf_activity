<template>
  <section :class="getClassName('popTask')" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div :class="getClassName('wrap')">
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <scroll>
                <task :selectedIndex="selectedIndex" :selectedItem="selectedItem"></task>
              </scroll>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="close" @click="close" v-if="isShowPop">
    </div>
  </section>
</template>

<script>
  export default {
    name: 'comPop',
    data() {
      return {
        isShowPop: false,
      }
    },
    props: {
      selectedItem:{
        type:Object,
        default:null
      },
      selectedIndex:{
        type:Number,
        default:0
      }
    },
    components: {
      scroll: () => import('./scroll'),
      task:()=>import('./task')
    },
    methods: {
      getClassName(name) {
        return `${name} flag${this.popType}`
      },
      async showPop() {
        this.isShowPop = true
      },
      close() {
        this.$emit('close')
        this.isShowPop = false
      },
      move(e) {
        e.preventDefault()
      }
    },
    watch: {
      isShowPop(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.move, {passive: false})
        } else {
          document.body.style.overflow = null
          document.removeEventListener('touchmove', this.move, {passive: false})
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .popTask {
    position: fixed;
    left: 50%;
    top: .5rem;
    margin-left: -3.25rem;
    .pop-mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.55);
    }
    .pop {
      position: relative;
      z-index: 10;
      border: 2px solid #FFAE66;
      background: #AC221E;
      border-radius: .4rem;
      overflow: hidden;
      .wrap {
        margin: 0 auto;
        box-sizing: border-box;
        .main {
          height: 9rem;
          width: 6.5rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: 2.2rem .2rem 0;
          box-sizing: border-box;
          .container_compop {
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 0;
            height: 9rem;
            width: 6.5rem;
          }
        }
      }
    }
    .close {
      width: .6rem;
      height: .6rem;
      background: url("../images/close.png") no-repeat center
        center / 100% 100%;
      position: absolute;
      bottom: -.8rem;
      left: 0;
      right: 0;
      margin: auto;
    }
    .scalc-enter-active {
      animation: fadeAnimation 0.3s ease-in-out;
    }
    @keyframes fadeAnimation {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  }
</style>
