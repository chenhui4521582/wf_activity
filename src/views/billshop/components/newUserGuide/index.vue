<template>
  <main>
    <component :is="componentId" :accountBalance="accountBalance"></component>
  </main>
</template>

<script>
export default {
  name: 'newUser',
  props: {
    accountBalance: String,
    required: true
  },
  components: {
    page2: () => import('./page2'),
    page3: () => import('./page3')
  },
  computed: {
    componentId () {
      if (~~this.accountBalance > 50) {
        return 'page2'
      } else {
        return 'page3'
      }
    }
  }
}
</script>


