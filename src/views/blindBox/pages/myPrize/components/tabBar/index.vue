<template>
  <article class="wrapper">
    <section class="container">
      <div class="bar"
        v-for="(item,index) in tabBar"
        @click="changeTab(item,index)"
        :key="item.label">
        <span class="bar__span"
          :class="{'active':index===active}">
          {{item.label}}
        </span>
      </div>
    </section>
    <section class="content">
      <Goods v-for="(item,index) in goodsList"
        :key="index"
        :goods="item">
        <p class="goods-time"
          slot="left">开盒时间：{{item.time}}</p>
      </Goods>
      <Default :title="`您没有${tabBar[active].label}的盲盒奖品哦~`"
        @onConfirm="$router.push({name:'Index'})" />
    </section>
  </article>
</template>

<script>
import Goods from '../../../../components/goods'
import Default from '../../../../components/default'

export default {
  data () {
    return {
      active: 0,
      goodsList: [
        {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        },
        {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        }, {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        }, {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        }, {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        }, {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        }
      ],
      tabBar: [
        {
          label: '未领取'
        },
        {
          label: '待发货'
        },
        {
          label: '已发货'
        }
      ]
    }
  },
  methods: {
    /**
     * @des 切换tab
     */
    changeTab (item, index) {
      this.active = index
    }
  },
  components: {
    Default,
    Goods
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    padding-top: 0.31rem;
    background: rgb(238, 238, 238);
    overflow: scroll;
    .goods-time {
      margin-top: 0.09rem;
    }
  }
  .container {
    font-size: 0.24rem;
    color: #333;
    text-align: center;
    display: flex;
    .bar {
      flex: 1;
      padding: 0.16rem 0 0.2rem;
      &__span {
        position: relative;
        &.active {
          color: #d1ac42;
          &::after {
            content: "";
            width: 100%;
            height: 0.04rem;
            background: #d1ac42;
            border-radius: 0.02rem;
            bottom: -0.24rem;
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
}
</style>
