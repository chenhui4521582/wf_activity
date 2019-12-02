<template>
  <section class="box-list">
    <ul v-for="(items,key) in boxList"
      :key="'list'+key">
      <li v-for="(item,index) in items"
        :key="'item'+index">
        <img :src="boxGroup[boxGroupIndex(item.color)].box"
          alt="">
      </li>
    </ul>
  </section>
</template>

<script>
import { boxList } from '../../../apis/box'
import { boxGroup } from '../../../config/box'
export default {
  name: '',
  components: {

  },
  data () {
    return {
      box: [],
      boxGroup
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
  mounted () {
    this.getBoxInfo()
  },
  methods: {
    async getBoxInfo () {
      const res = await boxList()
      const { data } = res.data
      this.box = data || []
    },
    boxGroupIndex (color) {
      return this.boxGroup.findIndex(res => res.type === Number(color))
    }

  }
}
</script>

<style lang="less" scoped>
.box-list {
  background: #f0ead1;
  ul {
    li {
    }
  }
}
</style>
