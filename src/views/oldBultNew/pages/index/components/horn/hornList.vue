<template>
  <div class="horn" v-if="showHorn">
    <div class="horn-icon">
      <img src="../../assets/tips-icon.png" alt="" />
    </div>
    <div class="horn-list">
      <div ref="hornDivWraper">
        <ul ref="hornUl" id="hornUl" :style="hornStyles">
          <li v-for="(item, index) in noticeList" :key="index" ref="hornLi">
            用户{{item.nickname}}累计邀请了{{item.num}}位好友，累计赚了{{item.amount}}金叶
          </li>
        </ul>
        <ul id="copyHornUl" :style="copyStyles"></ul>
      </div>
    </div>
  </div>
</template>
<script>
import {getNoticeList} from '../../../../apis/index'
import _get from 'lodash.get'
export default {
  data () {
    return {
      noticeList: [],
      hornStyles: {
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
  computed: {
    showHorn () {
      return this.noticeList.length
    }
  },
  mounted () {
    getNoticeList().then(res => {
      this.noticeList = _get(res, 'data', [])
      this.wrapWidth = this.$refs.hornDivWraper && this.$refs.hornDivWraper.offsetWidth
      this.newHornLogic()
    })
  },
  methods: {
    newHornLogic () {
      this.$nextTick(() => {
        let hornUl = document.getElementById('hornUl')
        let nodes = document.getElementById('copyHornUl'),
        liNodes = this.$refs.hornLi
        if(nodes && hornUl){
          nodes.innerHTML = hornUl.innerHTML
        }
        let offsetWidth = 0
        liNodes &&
          liNodes.map((item, index) => {
            offsetWidth += item.offsetWidth
          })
        // 设置UL宽度
        this.hornStyles.width = `${offsetWidth}px`
        this.copyStyles.width = `${offsetWidth}px`
        this.copyStyles.left = `${offsetWidth}px` //设置拷贝ul初始位置
        let x = 0
        let fun = () => {
          this.hornStyles.left = x + 'px'
          this.copyStyles.left = x + parseInt(offsetWidth) + 'px'
          x--
          if (x + parseInt(offsetWidth) == 0) {
            x = 0
          }
        }
        this.hornTimer = setInterval(fun, 20)
      })
    }
  },
  destroyed () {
    clearInterval(this.hornTimer)
  }
}
</script>
<style lang="less" scoped>
.horn {
  position: absolute;
  left: .2rem;
  top: .14rem;
  padding: 0 .2rem;
  width: 5.25rem;
  height: .46rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background:rgba(255,255,255,.8);
  border-radius: .23rem;
  .horn-icon {
    width: .26rem;
    height: .26rem;
    img {
      max-width: 100%;
      vertical-align: top;
    }
  }
  .horn-list {
    flex: 1;
    height: .46rem;
    padding: 0 0 0 .17rem;
    font-size: .24rem;
    > div {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      color: #000000;
    }
  }
}

ul {
  position: absolute;
  top: 0;
  height: .48rem;
  overflow: hidden;
  margin: 0;
  padding: 0;
  li {
    max-height: .48rem;
    line-height: .5rem;
    float: left;
    overflow: auto; 
    white-space: nowrap;
    padding-right: .20rem;
    overflow: hidden;
    color: #E93232;
  }
}
</style>
<style lang="less">
#hornUl,
#copyHornUl {
  li {
    .cat {
      position: relative;
      color: #ff7800;
      font-weight: bold;
      font-size: .24rem;
    }
  }
}
</style>
