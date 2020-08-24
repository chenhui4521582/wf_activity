<template>
  <div class="horn">
    <div class="horn-list">
      <div ref="hornDivWraper">
        <ul ref="hornUl" id="hornUl" :style="hornStyles">
          <li v-for="(item,index) in noticeList" :key="index" ref="hornLi" @click.stop="jumpGame(item)">
            <span v-html="item.remark"></span>
          </li>
        </ul>
        <ul id="copyHornUl" :style="copyStyles"></ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getNoticeList } from '../services/services'
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
  mounted () {
    getNoticeList().then(res => {
      this.noticeList = _get(res, 'data.data', [])
      this.noticeList.forEach(item => {
        let box = {
          1: '铜宝箱',
          2: '银宝箱',
          3: '金宝箱'
        }
        item.remark = `用户${item.nickname}打开了${box[item.level]}，抽中了${item.awardsName}`
      })
      this.wrapWidth = this.$refs.hornDivWraper && this.$refs.hornDivWraper.offsetWidth
      this.newHornLogic()
    })
  },
  methods: {
    async jumpGame (item) {
      this.$marchSetsPoint('A_H5PT0019000198', {
        target_project_id: item.type,
        task_id: item.id,
        task_name: item.url.split('/')[1]
      })

      if (!item.url) return
      jumpUrl(item)
    },
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
        let n = 1
        let len = parseInt(-(offsetWidth / liNodes.length))
        let fun = () => {
          this.hornStyles.left = x + 'px'
          this.copyStyles.left = x + parseInt(offsetWidth) + 'px'
          x--
          if (x + parseInt(offsetWidth) == 0) {
            x = 0
            n = 1
          }
          if(x == len * n) {
            clearInterval(this.hornTimer)
            setTimeout(()=> {
              n++
              this.hornTimer = setInterval(fun, 50)
            }, 2000) 
          }
        }
        this.hornTimer = setInterval(fun, 50)
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
  position: fixed;
  left: 50%;
  top: 0;
  z-index: 5;
  transform: translate(-50%, 0);
  padding: 0 .3rem 0 .8rem;
  width: 5.54rem;
  height: .7rem;
  background: url(../img/horn-bg.png) no-repeat center top;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .horn-list {
    flex: 1;
    height: .7rem;
    font-size: .22rem;
    > div {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      color: #FFFFFF;
    }
  }
}

ul {
  position: absolute;
  top: 0;
  height: .7rem;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  li {
    max-height: .7rem;
    line-height: .74rem;
    float: left;
    overflow: auto;
    white-space: nowrap;
    transition: all 1s ease 0.5s;
    overflow: hidden;
    padding-right: .4rem;
    span {
      height: 48px;
      width: 100%;
    }
  }
}
.indexB {
  height: 70px;
}
</style>