<template>
  <div class="abc">
    <div>{{ a }} hah11</div>
    <Loading></Loading>
    <img src="./rightshare2x.png" alt="" />
    <div>
      <img src="" alt="" />
    </div>
    <div class="bbb">bbbb</div>
  </div>
</template>

<script>
    import Loading from '@/base/loading/loading.vue'

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

<style lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable';
    /* @import "./test.styl"; */
    
    .abc {
        left: 0;
        top: 0;
        transform: matrix(2);
        background: url(./rightshare2x.png);
    }
</style>