<template lang="html">
  <div class="get_warp">
    <img src="./images/coupons.png" alt="" class="coupons">
    <router-link class="sumbit_btn" to="/use">立刻使用</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.get_warp {
  width: 86%;
  position: relative;
  //top: -2rem;
  margin: -2rem auto 0 auto;
  z-index: 111;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.37rem;
  box-sizing: border-box;
  &::after{
    content: "";
    position: absolute;
    width: 100%;
    height: 6.6rem;
    top: 0;
    left: 0;
    background: url(./images/f.png);
    background-size: 100% auto;
  }
  &::before{
    content: "";
    position: absolute;
    background: url(./images/man.png)no-repeat;
    background-size: 100% auto;
    left: 0.5rem;
    bottom: 1.57rem;
    width: 0.9rem;
    height: 2.2rem;
  }
  .coupons {
    display: block;
    width: 100%;
  }
  .sumbit_btn {
    display: block;
    margin-top: 0.4rem;
    width: 100%;
    font-size: 18px;
    color: #a63c35;
    background: #ffd10b;
    border-radius: 4px;
    text-align: center;
    line-height: 0.84rem;
    border: none;
    height: 0.84rem;
  }
}
</style>
