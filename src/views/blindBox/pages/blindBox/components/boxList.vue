<template>
  <section class="box-list-wrapper">
    <section class="box-list-container">
      <ul class="box-list"
        v-for="(items,key) in boxList"
        :key="'list'+key">
        <li class="box-item"
          v-for="(item,index) in items"
          :key="'item'+index">
          <img class="box-image"
            :src="item.color|boxImage('box')"
            alt="">
        </li>
      </ul>
    </section>
    <section class="btn-container">
      <m-button>{{userInfo.openBoxTimes?'立即开盒':'15元开一次'}}</m-button>
      <div class="change-btn"
        @click="changeAll">换一批</div>
    </section>
  </section>
</template>

<script>
import { boxGroup } from '../../../config/box'
import { BoxList, ChangeAll } from '../../../apis/box'
import { UserInfo } from '../../../apis/user'
import MButton from '../../../components/MButton'
export default {
  name: '',
  components: {
    MButton
  },
  data () {
    return {
      box: [],
      userInfo: {}
    }
  },
  computed: {
    boxList () {
      let len = this.box.length
      let n = 4 // 假设每行显示4个
      let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
      let res = []
      for (let i = 0; i < lineNum; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
        let temp = this.box.slice(i * n, i * n + n)
        res.push(temp)
      }
      return res
    }
  },
  filters: {
    boxImage (color, type) {
      let index = boxGroup.findIndex(res => res.type === Number(color))
      return boxGroup[index][type]
    }
  },
  mounted () {
    this.getBoxInfo()
  },
  methods: {
    // 获取盒子信息
    async getBoxInfo () {
      const res = await BoxList()
      const { data } = res.data
      this.box = data || []
    },
    // 换一批
    async changeAll () {
      const res = await ChangeAll()
      const { data } = res.data
      this.box = data || []
    },
    // 获取用户活动信息
    async getUserInfo () {
      const res = await UserInfo()
      const { data } = res.data
      this.box = data || {}
    }
  }
}
</script>

<style lang="less" scoped>
.box-list-wrapper {
  margin-top: -0.32rem;
  .box-list-container {
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 0.18rem;
      background: #1b1f29 url(../assets/list-bottom-bg.png) no-repeat center
        center / 100% 100%;
      font-size: 0;
    }
  }
  .box-list {
    background: url(../assets/list-bg.png) no-repeat center bottom / 100%
      0.96rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0.04rem 0 0.2rem;
    .box-item {
      min-width: 1.8rem;
      text-align: center;
      background: url(../assets/box-shadow.png) no-repeat center ~"0.4rem" / 100%
        1.12rem;
      .box-image {
        height: 1.7rem;
        width: 1.46rem;
      }
    }
  }
  .btn-container {
    position: relative;
    background: #1b1f29;
    padding: 0.16rem;
    .button {
      margin: auto;
    }
    .change-btn {
      position: absolute;
      top: calc(~"50%" - 0.21rem);
      right: 0.36rem;
      width: 1.14rem;
      box-sizing: border-box;
      color: #fff;
      border: 0.02rem solid #fff;
      line-height: 0.42rem;
      text-align: center;
      border-radius: 0.22rem;
      font-size: 0.24rem;
    }
  }
}
</style>
