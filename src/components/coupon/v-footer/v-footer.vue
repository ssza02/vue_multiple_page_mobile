<template lang="html">
  <footer>
    <span @click="type=1" class="link">活动细则</span> | <span class="link" @click="type=2">加入移民交流群</span>
    <div class="shadow" v-show="type!=0" @click.stop.prevent="type=0">
      <div class="content rules_warp" @click.stop.prevent="" v-show="type==1">
        <span class="icon-wrong close_btn" @click.stop.prevent="type=0"></span>
        <div class="rules">
          <div class="rules_title">活动细则</div>
          <div class="rules_content">
            <p>1、投资移民代金券仅限办理投资创业类移民，有效期至2018.6.30；</p>
            <p>2、技术移民代金券仅限办理技术类移民，有效期至2018.4.30；</p>
            <p>3、红包仅限于抵扣服务费全款；</p>
            <p>4、最终解释权归活动方所有，未尽事宜请联系客服：dameiyier。</p>
          </div>
        </div>
      </div>
      <div class="content qrcode_warp" @click.stop.prevent="" v-show="type==2">
        <span class="icon-wrong close_btn" @click.stop.prevent="type=0"></span>
        <div class="qrcode" >
          <img src="./images/qrcode2.png" alt="" class="qrcode">
          <p>长按二维码加入</p>
          <p>移民交流群</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    data(){
      return {
        type:0,
      }
    }
  }
</script>

<style lang="less" scoped>
  footer{
    font-size: 12px;
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: 0.44rem;
    color: #A63C35;
    .shadow{
      background: rgba(0,0,0,0.5);
      transform: all .3s ease;
    }
    .link{
      margin: 0 0.26rem;
      font-size: 13px;
    }
    .content{
      font-size: 13px;
      width: 78%;
      margin: 0 auto;
      background: #FDBD84;
      border-radius: 4px;
      margin-top: 3.4rem;
      overflow: hidden;
      padding-bottom: 1.2rem;
      position: relative;
      .close_btn{
        position: absolute;
        top: 0.3rem;
        right: 0.3rem;
        font-size: 15px;
        color:#82241E;
      }
    }
    .rules_title{
      text-align: center;
      font-size: 18px;
      color: #ED3D35;
      margin: 0.47rem 0 0.3rem 0;
    }
    .rules_content{
      text-align: left;
      font-size: 12px;
      line-height: 20px;
      padding:0 0.3rem;
    }
    .qrcode_warp{
      width: 62%;
      text-align: center;
      line-height: 20px;
      font-size: 14px;
      padding-bottom: 0.35rem;
      .qrcode{
        width: 3.28rem;
        display: block;
        margin: 0.83rem auto 0.23rem auto;
      }
    }
  }
</style>
