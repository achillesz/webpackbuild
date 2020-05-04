<template>
  <div class="abc">
    <div>{{ a }} hah11</div>
    <Loading />
    <img
      src="./rightshare2x.png"
      alt=""
    >
    <div>
      <img
        src=""
        alt=""
      >
    </div>
    <div class="bbb">
      bbbb
    </div>
  </div>
</template>

<script>
    import Loading from '@/base/loading/loading.vue'
    export default {
        name: 'Apps',
        components: {
            Loading
        },
        data() {
            return {
                a: 1
            }
        },
        methods: {
            hello() {}
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "./test.styl";
    @import '~common/stylus/mixin.styl';
    .abc {
        position: absolute;
        width: ptRem(750px);
        height: toRem(48.5px);
        background-image: url(./rightshare2x.png);
        background-size: toRem(150px) toRem(48.5px);
        top: toRem(5px);
        right: toRem(20px);
    }
</style>