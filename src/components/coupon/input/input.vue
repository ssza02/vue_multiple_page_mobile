<template lang="html">
  <div class="input_warp">
    <div class="input">
      <input type="tel"placeholder="手机号" v-model="phone" class="vcode">
      <input type="button" value="获取验证码" class="vcode_btn" @click="getCode($event)">
    </div>
    <div class="input">
      <input type="tel"placeholder="验证码" v-model="vcode">
    </div>
    <input type="button" value="打开红包" class="sumbit_btn" @click="sumbitFn">
  </div>
</template>

<script>
import Lib from "assets/js/Lib";
export default {
  data() {
    return {
      phone: "",
      vcode: "",
      countdown: 60
    };
  },
  methods: {
    openFn() {
      Lib.M.ajax({
        url: "/blockchain/open_red_envelope",
        type: "post",
        data: {
          phone: this.phone,
          vcode: this.vcode
        },
        success: res => {
          if (res.type == "success") {
            this.$router.push({ path: `/get` });
          } else {
            alert(res.content);
          }
        }
      });
    },
    sumbitFn() {
      if (!Lib.M.checkPhone(this.phone)) {
        alert("请输入正确手机号");
      } else if (this.vcode.length != 4) {
        alert("请输入正确验证码");
      } else {
        this.openFn();
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
          url: "/blockchain/send_code",
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
  width: 73%;
  margin: 0 auto;
  .input {
    position: relative;
    display: flex;
    background: #fff;
    border-radius: 4px;
    height: 0.9rem;
    margin-bottom: 0.4rem;
    input {
      position: relative;
      outline: none;
      background: none;
      height: 100%;
      border: none;
      flex: 1;
    }
    input[type="tel"] {
      text-indent: 0.2rem;
    }
    .vcode {
      width: auto;
      flex: 0 0 60%;
    }
    .vcode_btn {
      position: absolute;
      top: 0;
      right: 0;
      color: #a63c35;
      box-sizing: border-box;
    }
  }
}
.sumbit_btn {
  margin-top: 0.4rem;
  width: 100%;
  font-size: 18px;
  color: #a63c35;
  background: #ffd10b;
  border-radius: 4px;
  text-align: center;
  border: none;
  height: 0.84rem;
}
</style>
