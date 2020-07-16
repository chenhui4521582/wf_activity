<template>
  <div class="box-list">
    <div ref="boxListWraper">
      <ul ref="list" id="listUl" :style="listStyles">
        <li v-for="(item,index) in list" :key="index" ref="hornLi" @click.stop="jumpGame(item)">
          <div class="award-img">
            <img :src="item.img | filter" class="inner-img" alt="" />
          </div>
          <p>{{item.name}}</p>
        </li>
      </ul>
      <ul id="copyList" :style="copyStyles"></ul>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'boxList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      listStyles: {
        width: `${this.wrapWidth}px`,
        left: 0
      },
      copyStyles: {
        width: `${this.wrapWidth}px`,
        left: 0
      },
      wrapWidth: 0
    }
  },
  methods: {
    listAnimation () {
      clearInterval(this.listTimer)
      this.$nextTick(() => {
        let listUl = document.getElementById('listUl')
        let copyUl = document.getElementById('copyList'),
        liNodes = this.$refs.hornLi
        if(copyUl && listUl){
          copyUl.innerHTML = listUl.innerHTML
        }
        let offsetWidth = 0
        liNodes && liNodes.map((item, index) => {
          offsetWidth += item.offsetWidth
        })
        // 设置UL宽度
        this.listStyles.width = `${offsetWidth}px`
        this.copyStyles.width = `${offsetWidth}px`
        this.copyStyles.left = `${offsetWidth}px` //设置拷贝ul初始位置
        let x = 0
        let fun = () => {
          // console.log(offsetWidth)
          this.listStyles.left = -x + 'px'
          this.copyStyles.left = parseInt(offsetWidth) - x + 'px'
          x++
          if (x >= offsetWidth) {
            x = 0
          }
        }
        this.listTimer = setInterval(fun, 30)
      })
    }
  },

  mounted () {

  },
  watch: {
    list: {
      handler (value) {
        this.wrapWidth = this.$refs.boxListWraper && this.$refs.boxListWraper.offsetWidth
        this.listAnimation()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style scoped lang="less">
.box-list {
  position: relative;
  margin: .12rem .64rem 0;
  height: 1.83rem;
  overflow: hidden;
}
ul {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  li {
    padding: .2rem .3rem 0 0 ;
    .award-img {
      width: 1.2rem;
      height: 1.2rem;
      background: rgba(180,70,23,.14);
      border-radius: .1rem;
    }
    p {
      font-size: .2rem;
      color: #B44617;
      white-space: nowrap;
    }
  }


}

</style>