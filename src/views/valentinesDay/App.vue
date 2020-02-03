<template>
  <div class="valentines">
    <!-- 头部 -->
    <div class="header">
      <div class="countdown"></div>
    </div>
    <!-- 标题图片 -->
  </div>
</template>
<script>
import Loading from '@/components/common/loading'
import Popup from './popup'
import Services from './services/services'
import utils from './components/utils'
import _get from 'lodash.get'
export default {
  name: 'valentinesDay',
  data: ()=>({
    showPopup: false,
    type: 1,
    countdownTime: [00,]
  }),
  components: {
    Loading,
    Popup
  },
  computed: {
    showList() {
      return this.optimumTimeList.concat(this.highlightTimeList).length
    }
  },
  methods: {
    /** 返回 **/
    backHome() {
      window.history.go(-1)
      GLOBALS.marchSetsPoint('A_H5PT0232002703', {
        from_project_id: this.from
      })
    },
    /** 返回顶部 **/
    backTop() {
      this.isBackTop = false
    },
    _getHighlightTimeList() {
      if(this.scrollLock) {
        return false
      }
      this.scrollLock = true
      Services.highlightTimeList({
        optimumNum: 2,
        page: this.page,
        pageSize: this.pageSize,
        sortRule: 1,
        type: this.currentIndex
      }).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          let currentData = _get(res, 'data.data.highlightTimeList', [])
          if(currentData.length == 20) {
            this.scrollLock = false
          }
          this.highlightTimeList = this.highlightTimeList.concat(currentData)
          this.optimumTimeList = _get(res, 'data.data.optimumTimeList', [])
        }
      }).catch(error => {
        this.scrollLock = false
      })
    },
    /** 列表返回顶部 **/
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
      this.isBackTop = false
    },

    close() {
      if(parent && parent.closeWebView) {
        parent.closeWebView()
      }
    }
  },
  created() {
    this._getHighlightTimeList()
    this.from = utils.getUrlParams('from') || 'platFrom'
    GLOBALS.marchSetsPoint('P_H5PT0232', {
      from_project_id: this.from
    })
  }
}
</script>
<style scoped lang="less">
@import '../../common/css/base.css';
@import url('../../../static/iconfont/iconfont.css');
* {
  box-sizing: border-box;
}

</style>
