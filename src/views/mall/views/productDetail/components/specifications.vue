<template>
  <div class="spec-warp">
    <div class="spec-item">
      <div class="item-title">规格</div>
      <div class="item-content-spec">
        <span class="item-content-child" :class="{'item-active':currentIndex===index }"
          v-for="(item,index) in info" :key="index" @click="changeIndex(index)">
          {{item.specs}}
        </span>
      </div>
    </div>
    <div class="spec-item">
      <div class="item-title">已选</div>
      <div class="item-content item-content-title">{{currentInfo.specs}}</div>
    </div>
    <div class="spec-item number">
      <div class="item-title">数量<span>剩余库存充足</span></div>
      <Field :store-max="0" :limit-number="0" v-model="buyNumber"></Field>
    </div>
  </div>
</template>
<script>
import Field from './field.vue'
export default {
  name: 'specifications',
  components: { Field },
  props: {
    info: {
      type: Array,
      default: () => ([])
    },
    currentInfo: {
      type: Object,
      default: () => ({})
    },
    currentIndex: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      buyNumber: this.value
    }
  },
  watch: {
    value (val) {
      this.buyNumber = val
    },
    buyNumber (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    changeIndex (index) {
      this.$emit('change-index', index)
    }
  }
}
</script>
<style lang="less" scoped>
.spec-warp {
  overflow: hidden;
  margin-bottom: 0.2rem;
  width: 100%;
  padding: 0.3rem 0.2rem 0 0.2rem;
  border-radius: 0.16rem;
  background-color: #ffffff;
  box-sizing: border-box;
  .spec-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
    .item-title {
      width: 0.7rem;
      color: #888;
      font-size: 0.24rem;
    }
    .item-content-spec {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 0.42rem;
      .item-content-child {
        padding: 0 0.2rem;
        margin-right: 0.3rem;
        min-width: 1.2rem;
        height: 0.42rem;
        line-height: 0.42rem;
        background-color: #ededed;
        border-radius: 0.1rem;
        font-size: 0.24rem;
        color: #888888;
        text-align: center;
        box-sizing: border-box;
      }
      .item-active {
        background-color: #ff4141;
        color: #fff;
      }
    }
    .item-content {
      flex: 1;
      display: flex;
      .item-number-title {
        color: #acacac;
        font-size: 0.24rem;
        flex: 1;
        line-height: 0.42rem;
      }
      .item-number-add {
        display: flex;
        align-items: center;
      }
    }
    .item-content-title {
      font-size: 0.24rem;
      color: #ff4141;
    }
    &.number {
      justify-content: space-between;
      .item-title {
        width: auto;
        span {
          color: #bbb;
          font-size: 0.2rem;
          margin-left: 0.22rem;
        }
      }
    }
  }
  .spec-item-line {
    border-bottom: 2px solid #e6e6e6;
    margin-bottom: 0.2rem;
  }
  &.description-info {
    padding: 0.3rem 0.2rem;
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    i {
      color: rgba(136, 136, 136, 1);
      margin-right: 0.23rem;
    }
  }
}
</style>