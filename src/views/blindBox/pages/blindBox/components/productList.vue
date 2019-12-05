<template>
  <section class="product-list-wrap">
    <div class="product">
      <div class="product-list">
        <div ref="productDivWraper">
          <ul ref="productUl"
            id="productUl"
            :style="productStyles">
            <li v-for="(item,index) in noticeList"
              :key="index"
              ref="productLi">
              <span>恭喜用户</span><span class="nickname">{{item.nickname}}</span><span>抽中了{{item.awardsName}}</span>
            </li>
          </ul>
          <ul id="copyProductUl"
            :style="copyStyles"></ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    noticeList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      productStyles: {
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
  mounted () {
    this.wrapWidth = this.$refs.productDivWraper && this.$refs.productDivWraper.offsetWidth
    this.newProductLogic()
  },
  methods: {
    newProductLogic () {
      this.$nextTick(() => {
        let productUl = document.getElementById('productUl')
        let nodes = document.getElementById('copyProductUl')
        let liNodes = this.$refs.productLi
        nodes.innerHTML = productUl.innerHTML

        let offsetWidth = 0

        liNodes && liNodes.map((item, index) => {
          offsetWidth += item.offsetWidth
        })

        // 设置UL宽度
        this.productStyles.width = `${offsetWidth}px`
        this.copyStyles.width = `${offsetWidth}px`
        this.copyStyles.left = `${offsetWidth}px` // 设置拷贝ul初始位置
        let x = 0
        let fun = () => {
          this.productStyles.left = x + 'px'
          this.copyStyles.left = (x + parseInt(offsetWidth)) + 'px'
          x--
          if ((x + parseInt(offsetWidth)) === 0) {
            x = 0
          }
        }
        this.productTimer = setInterval(fun, 20)
      })
    }
  },
  destroyed () {
    clearInterval(this.productTimer)
  }
}
</script>
<style lang="less" scoped>
.product-list-wrap {
  margin: auto;
  width: 3.8rem;
  color: #edeef1;
  height: 0.52rem;
  line-height: 0.52rem;
  background: url(../assets/top-btn-bg.png) no-repeat center bottom / 100% 100%;
}
.product {
  height: 0.52rem;
  background: transition;
  border-radius: 0.16rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .product-list {
    flex: 1;
    height: 0.52rem;
    padding: 0 0.2rem;
    font-size: 0.24rem;
    > div {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      font-weight: 500;
    }
  }
}

ul {
  position: absolute;
  top: 0;
  height: 0.52rem;
  overflow: hidden;
  li {
    max-height: 0.48rem;
    line-height: 0.52rem;
    float: left;
    overflow: auto;
    white-space: nowrap;
    transition: all 1s ease 0.5s;
    padding-right: 0.2rem;
    overflow: hidden;
    box-sizing: border-box;
    span {
      height: 0.48rem;
      width: 100%;
      font-weight: bold;
      background: linear-gradient(
        0deg,
        rgba(240, 243, 252, 1) 0%,
        rgba(228, 223, 203, 1) 98.92578125%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
