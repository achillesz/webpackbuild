<template>
  <div class="abc">
    <div>{{ a }} ?</div>

    <Loading></Loading>
    <img src="./rightshare2x.png" alt="">
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

<style lang="stylus" scoped>
    .abc {
        background-image: url(./rightshare2x.png);
        left: 0;
        top: 0;
    }
    
    .bbb {
        background-image: url(./img/initbg.png);
    }
</style>