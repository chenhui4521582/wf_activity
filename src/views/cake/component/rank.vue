<template>
  <article class="rank-wrapper" ref="area">
    <div class="back" @click="back"></div>
    <div class="title"></div>
    <nav>
      <div :class="{act:currentNav === item.key}" v-for="item in navList" :key="item.key"
        @click="chooseNav(item.key)">
        {{item.name}}</div>
      <div class="line" :class="{left:currentNav === 'rank',right:currentNav === 'record'}"></div>
    </nav>
    <template v-if="currentNav === 'rank'">
      <section class="list" ref="group">
        <ul>
          <li class="title">
            <div>昵称</div>
            <div>瓜分时间</div>
            <div>瓜分金额</div>
          </li>
          <template v-if="rankList&&rankList.length">
            <li v-for="(item,index) in rankList" :key="index">
              <div>{{item.nickName}}</div>
              <div v-html="timeFilter(item.createTime)"></div>
              <div>{{item.awardsName}}</div>
            </li>
          </template>
          <template v-else>
            <li class="empty">
              <div class="no-data"></div>
              <p>
                暂无数据<br>
                去瓜分蛋糕吧
              </p>
            </li>
          </template>
        </ul>
        <template v-if="rankList&&rankList.length">
          <p v-if="!isLoading && !finished" class="load">上拉加载更多</p>
          <p class="load" v-if="isLoading || finished">{{loading}}</p>
        </template>
      </section>
    </template>
    <template v-else>
      <section class="list">
        <ul>
          <li class="title">
            <div>参与时间</div>
            <div>瓜分状态</div>
            <div>瓜分金额</div>
          </li>
          <template v-if="userRecord&&userRecord.length">
            <li v-for="(item,index) in userRecord" :key="index">
              <div v-html="timeFilter(item.createTime)"></div>
              <div :class="`status-${item.status}`">{{item.status|statusFilter}}</div>
              <div>{{item.status===1?item.awardsName:'-'}}</div>
            </li>
          </template>
          <template v-else>
            <li class="empty">
              <div class="no-data"></div>
              <p>
                暂无数据<br>
                去瓜分蛋糕吧
              </p>
            </li>
          </template>
        </ul>
      </section>
    </template>
  </article>
</template>

<script>
import { RankList, UserRecord } from '../services/api'
import _get from 'lodash.get'
export default {
  name: 'rank',
  components: {

  },
  data () {
    return {
      navList: [{ name: '瓜分榜单', key: 'rank' }, { name: '我的记录', key: 'record' }],
      rankList: [],
      userRecord: [],
      page: 0,
      pageSize: 30,
      currentNav: 'rank',
      el: {},
      isLoading: false,
      finished: false
    }
  },
  computed: {
    loading () {
      if (this.finished) return '已经到底啦'
      return '加载中...'
    }
  },
  filters: {
    statusFilter (status) {
      switch (status) {
        case 0:
          return '待瓜分'
        case 1:
        case 2:
          // return '未中奖'
          return '已瓜分'
        default:
          return '忘记瓜分'
      }
    }
  },
  mounted () {
    this.el = this.$refs.group
    this.$nextTick(() => {
      this.$refs.area.addEventListener('touchend', this.onScroll)
    })
    this.getRankList()
    GLOBALS.marchSetsPoint('A_H5PT0253003024') // H5平台-蛋糕瓜分活动-瓜分记录页加载完成
  },
  methods: {
    onScroll () {
      let bottom = this.el.getBoundingClientRect().bottom
      if (bottom - this.$refs.area.offsetHeight < 10) {
        if (!this.isLoading && this.currentNav === 'rank') {
          this.getRankList()
        }
      }
    },
    removeScroll () {
      this.$refs.area.removeEventListener('touchend', this.onScroll)
    },
    chooseNav (key) {
      if (this.currentNav === key) return
      this.currentNav = key
      switch (this.currentNav) {
        case 'rank':
          this.getRankList()
          GLOBALS.marchSetsPoint('A_H5PT0253003024') // H5平台-蛋糕瓜分活动-瓜分记录页加载完成
          break

        default:
          this.getUserRecord()
          GLOBALS.marchSetsPoint('A_H5PT0253003025') // H5平台-蛋糕瓜分活动-瓜分记录-我的记录点击
          break
      }
    },
    async getRankList () {
      this.isLoading = true
      this.page++
      const res = await RankList({ page: this.page, pageSize: this.pageSize })
      let data = _get(res, 'data', [])
      if (data.length < this.pageSize) {
        this.finished = true
        this.removeScroll()
      }
      this.rankList.push(...data)
      this.isLoading = false
    },
    async getUserRecord () {
      const res = await UserRecord()
      this.userRecord = _get(res, 'data', [])
    },
    back () {
      this.$emit('on-back')
    },
    timeFilter (time) {
      if (time) {
        return time.split(' ').join('<br>')
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bg-center (@url) {
  background: url(@url) no-repeat center top;
  background-size: 100% 100%;
}
.rank-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #350d16;
  padding: 0.46rem 0.24rem 0;
  overflow: hidden;
  color: #c8b9b8;
  .back {
    width: 0.62rem;
    height: 0.56rem;
    .bg-center("../img/back.png");
    position: absolute;
    left: 0;
    top: 0.52rem;
  }
  & > .title {
    width: 3.54rem;
    height: 0.74rem;
    .bg-center("../img/rank-record.png");
    margin: 0 auto 0.16rem;
  }
  nav {
    color: #7c582d;
    display: flex;
    width: 3.4rem;
    margin: auto;
    justify-content: space-between;
    align-items: center;
    font-size: 0.32rem;
    position: relative;
    margin-bottom: 0.26rem;
    .act {
      color: #ffa80e;
      font-weight: bold;
    }
    .line {
      position: absolute;
      background: #ff4141;
      height: 0.06rem;
      width: 0.32rem;
      border-radius: 0.03rem;
      bottom: -0.1rem;
      transition: all 0.2s;
      &.left {
        left: 0.48rem;
      }
      &.right {
        left: 2.64rem;
      }
    }
  }
  .list {
    text-align: center;
    ul {
      background: #4a1c1f;
      border-radius: 0.16rem;
      padding-bottom: 0.2rem;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.9rem;
        box-sizing: border-box;
        div {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:nth-child(2n) {
          background: #391c1e;
        }
        &:nth-child(2n-1) {
          background: #3c2123;
        }
        &.title {
          border-radius: 0.16rem 0.16rem 0 0;
          background: #4a1c1f;
          height: 0.5rem;
          color: #8d6664;
          font-size: 0.24rem;
          overflow: hidden;
        }
        .status-0 {
          color: #ff7600;
        }
        .status-3 {
          color: #ff4141;
        }
      }
      .empty {
        display: block;
        min-height: 8.1rem;
        padding-top: 2.5rem;
        font-size: 0.2rem;
        color: #7c5554;
        .no-data {
          width: 1.58rem;
          height: 1.38rem;
          .bg-center("../img/cake-opacity.png");
          margin: 0 auto 0.16rem;
        }
      }
    }
  }
}
</style>
