<template lang="html">
  <div class="envelopes_warp">
    <div class="envelopes">
      <router-link class="open_btn" :to="opened?`/type/${id}`:'/input'"></router-link>
    </div>
    <div class="content">
      <h1>不成功，全额退款！</h1>
      <p>（仅限活动期内，紧缺职业类别技术移民）</p>
    </div>
  </div>
</template>

<script>
import Lib from "assets/js/Lib";
export default {
  mounted() {
    Lib.M.baseDomFn();
  },
  data() {
    return {
      wxUser: localStorage.userInfo?JSON.parse(localStorage.userInfo):'',
      opened: false,
      id:'',
    };
  },
  created() {
    Lib.WX.is_weixin('与加拿大，约惠三月','办加拿大移民，最高减10000元！',`https://m.meiyi.ai/author.html`,'https://oss.meiyi.ai/upload/image/201803/61bef548-3046-4b05-9e4c-8c977e1ce6d5.png');
    Lib.M.baseFn();
    if(this.wxUser){
      this.checkOpenFn(this.wxUser.openId);
    }
    //this.getNotify();
  },
  methods: {
    getNotify() {
      Lib.M.ajax({
        url: "/cash_coupon_login_notify",
        type: "post",
        data: {
          //code: '061qZL1i00j5Ty1aKJ2i0hKF1i0qZL1k',//Lib.M.getUrlQuery("code")
          //state: 'wxa9bb58dc6dea6e0603a13851bb5a3166%23wechat_redire',//Lib.M.getUrlQuery("state")
          code:Lib.M.getUrlQuery("code"),
          state:Lib.M.getUrlQuery("state"),
          returnUrl:'',
        },
        success: res => {
          if (res.type == "success") {
            this.wxUser = JSON.parse(res.content);
            this.checkOpenFn(this.wxUser.openId);
          } else {
            alert(res.content);
          }
        }
      });
    },
    checkOpenFn(openId) {
      Lib.M.ajax({
        url: "/check_open",
        type: "post",
        data: {
          openId
        },
        success: res => {
          if (res.type == "success") {
            let data=JSON.parse(res.content);
            this.opened = data.opened;
            this.id=data.id;
          } else {
            alert(res.content);
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.envelopes {
  background: url(./images/open.png)no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  width: 5.84rem;
  height: 2.5rem;
  padding-top: 2rem;
  position: relative;
  .open_btn {
    display: block;
    margin: 0 auto;
    height: 1.5rem;
    width: 1.5rem;
  }
}
.content {
  margin-top: 0.3rem;
  h1 {
    color: #f8e11e;
    font-size: 18px;
    text-align: center;
    margin-bottom: 6px;
  }
  p {
    text-align: center;
    font-size: 12px;
    color: #fff;
  }
}
</style>
