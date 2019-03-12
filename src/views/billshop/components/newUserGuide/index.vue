<template>
  <main>
    <page2 @closePage2="closePage2" v-if="showPage2"></page2>
    <page3 :accountBalance="accountBalance" v-if="showPage3"></page3>
  </main>
</template>

<script>
export default {
  name: 'newUser',
  props: {
    accountBalance: String,
    required: true
  },
  data: () => ({
    showPage2: false,
    showPage3: false
  }),
  components: {
    page2: () => import('./page2'),
    page3: () => import('./page3')
  },
  methods: {
    closePage2 () {
      this.showPage2 = false;
      this.showPage3 = true
    },
    save () {
      let url = '//platform-api.beeplay123.com/wap/api/plat/newUser/set-guide-position'
      this.axios.post(url, {version: 3, position: 1001})
    },
    init () {
      let url = '//platform-api.beeplay123.com/wap/api/plat/newUser/get-guide-position'
      this.axios.post(url, {version: 3}).then(res => {
        if (res.data.data == '1001') {
          this.showPage2 = true
          //this.save()
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>


