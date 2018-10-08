<template lang="html">
  <div class="input_warp">
    <div class="tips_warp">
      移民意向类别
      <span to="type" :class="{active:type===1}" @click="type=1">技术类</span>
      <span to="type" :class="{active:type===2}" @click="type=2">创业投资类</span>
      <p>温馨提示：打开的红包与你填写的移民意向类别相关，请谨慎选择</p>
    </div>
    <div class="phone_warp">
      <div class="input">
        <input type="tel" placeholder="请输入手机号码" v-model="phone">
      </div>
      <div class="input vcode">
        <input type="tel" placeholder="请输入验证码" v-model="vcode">
        <input type="button" class="code_btn" value="发送验证码" @click="getCode($event)">
      </div>
      <input type="button" value="打开红包" class="sumbit_btn" @click="sumbitFn">
    </div>
  </div>
</template>

<script>
import Lib from "assets/js/Lib";
export default {
  data() {
    return {
      phone: "",
      vcode: "",
      type: 0,
      wxUser: localStorage.userInfo?JSON.parse(localStorage.userInfo):''
    };
  },
  created() {
    this.countdown = 60;
  },
  methods: {
    sumbitFn() {
      if (!Lib.M.checkPhone(this.phone)) {
        alert('请输入正确手机号');
      } else if(this.vcode.length!=4){
        alert('请输入正确验证码');
      } else if(this.type===0){
        alert('请选择移民意向类别');
      } else {
        Lib.M.ajax({
          url: "/open_red_envelope",
          type: "post",
          data: {
            openId: this.wxUser.openId,
            infoJson: JSON.stringify(this.wxUser),
            categoryId: this.type,
            phone: this.phone,
            vcode: this.vcode
          },
          success: res => {
            if(res.type=='success'){
              this.$router.push({ path: `/type/${res.content}`});
            }else{
              alert(res.content);
            }
          }
        });
      }
    },
    settime: function(btn) {
      if (this.countdown == 0) {
        btn.disabled = false;
        btn.value = "发送验证码";
        this.countdown = 60;
      } else {
        btn.disabled = true;
        btn.value = `重新发送(${this.countdown})`;
        this.countdown--;
        setTimeout(() => {
          this.settime(btn);
        }, 1000);
      }
    },
    getCode: function(btn) {
      setTimeout(() => {
        Lib.M.ajax({
          url: "/send_cash_coupon_code",
          type: "post",
          data: {
            phone: this.phone
          },
          success: res => {
            if (res.type == "success") {
              this.settime(btn.target);
            } else {
              alert(res.content);
            }
          }
        });
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.input_warp {
  padding: 0 0.48rem;
  .phone_warp {
    overflow: hidden;
    padding: 0 0.4rem;
    .input {
      margin: 0.24rem 0;
      font-size: 12px;
      padding-left: 0.24rem;
      height: 0.8rem;
      line-height: 0.8rem;
      background: #fff;
      border-radius: 2px;
      input[type="tel"] {
        height: 100%;
        padding: 0;
        width: 100%;
        border: none;
        outline: none;
        display: block;
      }
    }
    .vcode {
      position: relative;
      input[type="tel"] {
        width: 70%;
      }
      .code_btn {
        outline: none;
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        padding: 0 0.34rem;
        text-align: center;
        background: #fff;
        border: none;
        font-size: 12px;
        color: #2399eb;
      }
    }
    .sumbit_btn {
      border: none;
      display: block;
      text-align: center;
      outline: none;
      width: 80%;
      height: 0.86rem;
      margin: 0.6rem auto 0 auto;
      line-height: 0.86rem;
      background: #3090e9;
      color: #fff;
    }
  }
  .tips_warp {
    font-weight: normal;
    font-size: 0.28rem;
    color: #fff;
    padding: 0.6rem 0.36rem;
    background: rgba(205, 86, 58, 0.69);
    border-radius: 2px;
    span {
      display: inline-block;
      width: 1.84rem;
      height: 0.56rem;
      line-height: 0.56rem;
      text-align: center;
      background: #f8e11e;
      border-radius: 2px;
      color: #d74321;
    }
    .active {
      background: #3090e9;
      color: #fff;
    }
    p {
      font-size: 0.2rem;
      margin-top: 0.2rem;
      color: #fff;
      line-height: 0.3rem;
    }
  }
}
</style>
