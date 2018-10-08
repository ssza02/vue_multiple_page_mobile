<template lang="html">
  <div class="index_warp">
    <div class="coupon">
      <router-link class="open_btn" to="/input"></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>
  .index_warp{
    .coupon{
      position: relative;
      width: 65%;
      margin: 0.3rem auto 0 auto;
      background: url(./images/coupon.png) no-repeat;
      background-size: 100% auto;
      overflow: hidden;
      height: 5.55rem;
      .open_btn{
        display: block;
        width: 1.3rem;
        height: 1.3rem;
        margin: 1.43rem auto 0 auto;
      }
    }
  }
</style>
