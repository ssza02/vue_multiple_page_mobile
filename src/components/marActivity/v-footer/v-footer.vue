<template lang="html">
  <footer>
    <span @click="type=1">活动细则</span> | <a href="/group/country.html?eId=1&&sid=hd_yuehuisanyue">加入加拿大移民交流群</a>
    <div class="shadow" v-show="type" @click="type=false">
      <div class="content rules" v-show="type==1">
        <div class="rules_title">活动细则</div>
        <div class="rules_content">
          <p>1、红包仅限办理加拿大移民（包括技术类、创业投资类）；</p>
          <p>2、技术类代金券仅限办理加拿大技术移民，最高封顶3000元；</p>
          <p>3、创业投资类代金券仅限办理加拿大创业、投资移民，最高封顶10000元；</p>
          <p>4、红包仅限于抵扣服务费全款；</p>
          <p>5、活动时间：3月26-30日，红包自领取当天起，有效期15天；</p>
          <p>6、最终解释权归活动方所有，未尽事宜请联系客服：ca-meiyi。</p>
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
    color:#fff;
    .shadow{
      background: rgba(0,0,0,0.9);
    }
    span,a{
      margin: 0 0.26rem;
      color:#fff;
      font-size: 12px;
    }
    .content{
      font-size: 18px;
      border: 1px solid #FFF;
      color:#fff;
      width: 97%;
      margin: 0 auto;
    }
    .rules{
      margin-top: 3.4rem;
      overflow: hidden;
      padding-bottom: 1.2rem;
      .rules_title{
        text-align: center;
        margin: 0.6rem 0 0.3rem 0;
      }
      .rules_content{
        text-align: left;
        font-size: 12px;
        line-height: 24px;
        padding-left: 0.2rem;
      }
    }
  }
</style>
