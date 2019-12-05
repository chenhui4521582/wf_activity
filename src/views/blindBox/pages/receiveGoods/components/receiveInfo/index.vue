<template>
  <Dialog :show="show"
    :close="true"
    @onClose="$emit('onClose')"
    title="填写收货信息">
    <section v-if="isMounted"
      class="post-info-dialog">
      <p class="post-info-dialog__p">请填写以下信息用于发放奖品</p>
      <MInput class="my-input"
        @onChange="setName"
        :default="updatePostInfo && updatePostInfo.name"
        placeholder="请输入您的真实姓名" />
      <MInput class="my-input"
        @onChange="setMobile"
        :default="updatePostInfo && updatePostInfo.mobile"
        type="number"
        placeholder="请输入您的手机号" />
      <MTextarea class="my-input"
        @onChange="setAddress"
        :default="updatePostInfo && updatePostInfo.address"
        placeholder="请输入您的邮寄地址" />
    </section>
    <section class="post-info-dialog__section">
      <div slot="footer"
        :class="{'primary':isConfirm}"
        @click="confirm"
        class="post-info-dialog__div">提交</div>
    </section>
  </Dialog>
</template>

<script>
import Dialog from '../../../../components/dialog'
import MInput from '../../../../components/MInput'
import MTextarea from '../../../../components/MTextarea'
import { EditPostInfo } from '../../../../apis/user'

export default {
  data () {
    return {
      isMounted: false,
      updatePostInfo: null,
      rules: [
        {
          type: 'mobile',
          regex: /^[1][3-9]\d{9}$/,
          name: '请填写正确手机号码'
        },
        {
          type: 'name',
          regex: /\S/,
          name: '请填写姓名'
        },
        {
          type: 'address',
          regex: /\S/,
          name: '请填写邮寄地址'
        }
      ]
    }
  },
  mounted () {
    this.updatePostInfo = Object.assign({}, this.receive)
    this.isMounted = true
  },
  computed: {
    isConfirm () {
      if (this.updatePostInfo && this.updatePostInfo.name && this.updatePostInfo.mobile && this.updatePostInfo.address) return true
      return false
    }
  },
  methods: {
    setName (value) {
      this.updatePostInfo.name = value
    },
    setMobile (value) {
      this.updatePostInfo.mobile = value
    },
    setAddress (value) {
      this.updatePostInfo.address = value
    },
    async confirm () {
      for (let res of Object.entries(this.updatePostInfo)) {
        const item = this.rules.find(config => config.type === res[0])
        if (!item) continue
        if (!res[1] || !item.regex.test(res[1])) {
          this.$toast.show({
            message: item.name,
            duration: 1000
          })
          return
        }
      }
      await EditPostInfo(this.updatePostInfo)
      this.$emit('onConfirm', this.updatePostInfo)
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    receive: {
      type: Object,
      default: {
        address: null,
        mobile: null,
        name: null
      }
    }
  },
  components: {
    Dialog,
    MInput,
    MTextarea
  }
}
</script>

<style lang="less" scoped>
.post-info-dialog {
  font-size: 0.24rem;
  color: #000;
  padding: 0 0.3rem;
  .my-input {
    margin-bottom: 0.2rem;
  }
  &__p {
    padding: 0.2rem 0;
  }
  &__section {
    text-align: center;
    color: #ffffff;
    padding: 0 0.3rem 0.3rem;
    .post-info-dialog__div {
      line-height: 0.7rem;
      border-radius: 0.16rem;
      background: rgba(209, 172, 66, 0.5);
      &.primary {
        background: rgba(209, 172, 66, 1);
      }
    }
  }
}
</style>
