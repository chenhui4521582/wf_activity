<template>
  <div class="horn">
    <div class="horn-list">
      <div ref="hornDivWraper">
        <ul ref="hornUl" id="hornUl" :style="hornStyles">
          <li v-for="(item,index) in noticeList" :key="index" ref="hornLi">
            恭喜<span>{{item.nickname}}</span>解救<span>{{beautyname[item.rescueDay-1]}}</span>成功
          </li>
        </ul>
        <ul id="copyHornUl" :style="copyStyles"></ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      noticeList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        hornStyles: {
          width: `${this.wrapWidth}px`,
          left: 0
        },
        copyStyles: {
          width: `${this.wrapWidth}px`,
          left: 0
        },
        wrapWidth: 0,
        beautyname: ['千夏','风音','妃奈','沙耶','心优','空音']
      }
    },
    mounted() {
      this.wrapWidth = this.$refs.hornDivWraper && this.$refs.hornDivWraper.offsetWidth
      this.newHornLogic()
    },
    methods: {
      newHornLogic() {
        this.$nextTick(() => {
          let hornUl = document.getElementById('hornUl')
          let nodes = document.getElementById('copyHornUl')
          let liNodes = this.$refs.hornLi
          nodes.innerHTML = hornUl.innerHTML

          let offsetWidth = 0

          liNodes && liNodes.map((item, index) => {
            offsetWidth += item.offsetWidth
          })

          // 设置UL宽度
          this.hornStyles.width = `${offsetWidth}px`
          this.copyStyles.width = `${offsetWidth}px`
          this.copyStyles.left = `${offsetWidth}px` // 设置拷贝ul初始位置
          let x = 0
          let fun = () => {
            this.hornStyles.left = x + 'px'
            this.copyStyles.left = (x + parseInt(offsetWidth)) + 'px'
            x--
            if ((x + parseInt(offsetWidth)) === 0) {
              x = 0
            }
          }
          this.hornTimer = setInterval(fun, 20)
        })
      }
    },
    destroyed() {
      clearInterval(this.hornTimer)
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../common/css/base.css";

  .horn {
    height: 0.38rem;
    background: transition;
    border-radius: 0.16rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .horn-list {
      flex: 1;
      height: 0.38rem;
      font-size: 0.24rem;
      > div {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        font-weight:400;
        color:rgba(255,254,254,1);
      }
    }
  }

  ul {
    position: absolute;
    top: 0;
    height: 0.38rem;
    overflow: hidden;
    li {
      max-height: 0.38rem;
      line-height: 0.4rem;
      float: left;
      overflow: auto; // word-break: keep-all;
      white-space: nowrap; // text-overflow: ellipsis;
      transition: all 1s ease 0.5s;
      padding-right: 0.2rem;
      overflow: hidden;
      box-sizing: border-box;
      span {
        height: 0.38rem;
        width: 100%;
      }
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
        font-weight: 400;
        color: rgba(89, 67, 177, 1);
        font-size: 0.24rem;
      }
    }
  }
</style>
