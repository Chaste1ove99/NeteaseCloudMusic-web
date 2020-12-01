<template>
    <div class="desc_container">
      <p v-html='desc' class="desc_wrap">{{desc}}</p>
    </div>
</template>
<script>
export default {
  name: 'AlbumDescIndex',
  props: ['desc']
}
</script>
<style lang="less" scoped>
.desc_container{
  padding-bottom: 15%;
  .desc_wrap{
    white-space: pre-wrap;
    padding: 10px;
    font-size: 14px;
  }
}
</style>
