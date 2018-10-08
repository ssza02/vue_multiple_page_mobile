<template>
  <div id="app">
      <header>
      <div class="top_title_box">
        <span class="icon-return back-btn top-back-icon top_back"></span><h1 class="top_title">注册</h1>
        <a class="icon-phone top_call" href="tel:400-000-4567"></a>
      </div>
    </header>
    <section>
      <div class="password_login">
        <div class="content">
          <div class="login_box">
            <div class="user_phone_bar border_bottom" >
              <span>+86</span><input type="number" v-model="phone" name="phone_num" placeholder="请输入手机号码"><input type="button" class="send_code_btn" @click="getCode($event)" value="发送验证码">
            </div>
            <div class="user_sms_code border_bottom">
              <span>验证码</span><input type="number" v-model="vcode" name="check_code" placeholder="请输入验证码" id="vcode">
            </div>
            <div class="user_sms_code border_bottom">
              <span>密码</span><input type="password" v-model="password" name="password" placeholder="请输入密码" id="password"><span class="icon-eyes show_passwd"></span>
            </div>
            <a href="javascript:;" class="login_btn" id="register_btn" @click="register()">注册</a>
            <span id="agree">注册即表示同意<a @click="disclaimer()" style="color: #2399eb;">《用户使用条款》</a></span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import logo from 'assets/img/logo.png'
  //import modal from 'components/modal.vue'
  import Lib from "assets/js/Lib";
  import JSEncrypt from 'jsencrypt/bin/jsencrypt';

  export default {
    components: {
      //modal
    },
    mounted() {
      Lib.M.baseDomFn();
    },
    data () {
      return {
        logoImg: logo,
        phone:'',
        vcode:'',
        password:'',
        rsaPassword:null,
        countdown:60
      }
    },
    created () {
       Lib.WX.is_weixin();
       Lib.M.baseFn();
    },
    methods: {
      register:function(){

      },
      getCode:function(btn){
        if(this.phone.length==11){
          Lib.M.ajax({
            url:`/sendRegisterCode`,
            type:'post',
            data: {
              phone:this.phone,
            },
            success:(res)=>{
              if(res.type=='success'){
                this.settime(btn.target);
              }else{
                alert(res.content);
              }
            }
          });
        }else{
          alert("手机格式不正确，请重新输入！");
        }
      },
      settime:function (btn) {
        if (this.countdown == 0) {
          btn.disabled=false;
          btn.value="发送验证码";
          this.countdown = 60;
        } else {
          btn.disabled=true;
          btn.value=`重新发送(${this.countdown})`;
          this.countdown--;
          setTimeout( () => {
            this.settime(btn);
          },1000);
        };
      },
      disclaimer:function(){
        location.href="/user/disclaimer.html";
      },
    }
  }
</script>

<style lang="less">
@import "../../../assets/css/m_base.less";
  .index-card {
    width: 800px;
    margin: 100px auto;
  }
  header,section{
  overflow: hidden;
}
.border_bottom{
  border-bottom: 1px solid #cccccc;
}
.login_body{
  position: relative;

  padding-bottom: 2.9rem;
}
.sms_login{

}

.content .login_box{
  width: 90%;
  margin: 0 auto;
  font-size: 15px;
}
.login_box span{
  display: inline-block;
  min-width: 50px;
  margin-left: 0.15rem;
}
#phone{
  width: 3.5rem;
  -webkit-flex: none;
  flex: none;
}
.login_box input[type="text"],input[type="password"],input[type="number"]{
  outline: none;
  border: 0;
  -webkit-flex: 1;
  flex: 1;
  text-indent: 0.5rem;
/*  line-height: 0.7rem;
  height: 0.8rem;*/
}
.user_phone_bar,.user_sms_code{
  height: 1rem;
  line-height: 1rem;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  overflow: hidden;
}
.login_box .username_login_btn{
  display: block;
  margin: 0.4rem 0 1rem 0;
  text-align: center;
  font-size: 13px;
  color:#172c78;
}
.other_login{
  position: absolute;
  bottom:0;

  width: 100%;
  height: 2.9rem;
  color:#333333;
  font-size: 15px;
}
.other_login .title {
  display: flex;
  width: 90%;
  margin: 0 auto;
}
.other_login .line{
  flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid #808080;
}
.other_login .text{
  margin: 0 auto;
    font-size: 10px;
    color:#808080;
}
.other_login .qq,.wechat{
  width: 50%;
  padding-top: 0.5rem;
}
.other_login .other_btn_box .qq_text,.wechat_text{
  display: inline-block;
  width: 1rem;
  text-align: center;
}
.other_login .qq{
  float: left;
  text-align: right;
}
.other_login .wechat{
  float: right;
  text-align: left;
}
.other_login .qq_icon,.wechat_icon{
  display: block;
  margin-bottom: 10px;
}
 .qq_icon{
  font-size: 0.7rem;
  color:#3c81e3;
  margin-right: 0.55rem;
}
 .wechat_icon{
  font-size: 0.6rem;
  margin-top: 0.1rem;
  color:#60af48;
  margin-left: 0.5rem;
}
.other_login .qq_text{
  margin-right: 0.38rem;
}
.other_login .wechat_text{
  margin-left: 0.5rem;
}
.password_login{
  padding-top: 0.6rem;
}
.forget{
  color:#333333;
  margin: 20px 0 2rem 0;
  display: inline-block;
}
.login_body .top_title_box .top_title{
  font-size: 18px;
}
#agree{
  color:#808080;
  margin-top: 20px;
  display: inline-block;
  font-size: 10px;
  white-space:nowrap;
  width: auto;
}
.login_box .send_code_btn{
  color:#333333;
  font-size: 14px;
  float: right;
  border: none;
  outline: none;
  background-color: #fff;
  display: inline-block;
  height: 1rem;
  line-height: 1rem;
}
.login_box .show_passwd{
  font-size: 0.2rem;
  display: inline-block;
  float: right;
  margin-right: 0.5rem;
  height: 100%;
  text-align: right;
  line-height: 1rem;
}
.top_register_btn{
  position: absolute;
  right: 0.3rem;
}

/*澶х櫥褰曟寜閽�*/
.password_login .login_btn{
  display: block;
  width: 100%;
  margin: 0 auto;
  color: #fff;
  text-align: center;

  background-color: #2399eb;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-top: 0.6rem;
}
.content .login_btn{
  display: block;
  width: 100%;
  margin: 0 auto;
  color: #fff;
  text-align: center;

  background-color: #2399eb;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-top: 0.6rem;
}
</style>
