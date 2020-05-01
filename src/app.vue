<template>
  <div>
    <div>{{ a }} ?</div>
    <Loading></Loading>
  </div>
</template>

<script>
import Loading from 'src/base/loading/loading.vue'

export default {
  name: 'apps',
  components: {
    Loading,
  },
  data() {
    return {
      a: 1,
    }
  },
  methods: {
    hello() {},
  },
}
</script>

<style lang="stylus" scoped>
div
  background-image:
</style>
