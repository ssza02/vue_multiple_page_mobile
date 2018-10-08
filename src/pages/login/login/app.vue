<template>
  <div id="app">
  	<div class="login_body">
      <header>
        <div class="top_title_box">
          <span class="icon-return back-btn top-back-icon top_back"></span><h1 class="top_title">用户登录</h1><a href="register.html" class="top_register_btn">注册</a>
        </div>
      </header>
      <section>
        <div class="sms_login" v-if="!passWordLogin">
          <div class="content">
            <div class="logo"></div>
            <div class="login_box">
                <div class="user_phone_bar border_bottom" >
                  <span>+86</span><input type="number" name="userphone" placeholder="请输入手机号码" id="phone"><input type="button" class="send_code_btn" value="发送验证码" @click="getCode($event)">
                </div>
                <div class="user_sms_code border_bottom">
                  <span>验证码</span><input type="number" name="smscode" placeholder="请输入验证码" id="vcode">
                </div>
                <a href="javascript:;" class="login_btn" id="sms_login_btn" @click="smsLoginFn()">登录</a>
                <a href="javascript:;" class="username_login_btn" @click="passWordLogin=true">账户密码登录</a>
            </div>
          </div>
        </div>
        <div class="password_login" v-if="passWordLogin">
          <div class="content">
            <div class="login_box">
                <div class="user_phone_bar border_bottom">
                  <span>账号</span><input type="number" name="username" placeholder="请输入手机号码" id="username">
                </div>
                <div class="user_sms_code border_bottom">
                  <span>密码</span><input type="password" name="password" placeholder="请输入密码" id="user_passwd">
                </div>
                <a href="javascript:;" class="login_btn" id="user_login_btn" @click="passwordLoginFn()">下一步</a>
                <a href="/login/forgetpassword.html" class="forget">忘记密码？</a>
            </div>
          </div>
        </div>
        <div class="other_login">
          <div class="title">
            <div class="text">第三方账号登录</div>
          </div>
          <div class="other_btn_box clearfix">
            <div class="qq">
              <span class="icon-qq qq_icon" @click='loginFn("qqLoginPlugin")'></span>
            </div>
            <div class="wechat" >
              <span class="icon-weixin wechat_icon" @click='loginFn("wechatLoginPlugin")'></span>
            </div>
          </div>
          <div ref="login_form"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import logo from 'assets/img/logo.png'
  import Lib from "assets/js/Lib";
  import JSEncrypt from 'jsencrypt/bin/jsencrypt';
  import bsl from 'assets/js/bsl_sdk20170302';

   export default {
      components: {

      },
      mounted() {
          Lib.M.baseDomFn();
      },
      data() {
          return {
              logoImg: logo,
              passWordLogin: false,
              rsaPassword: null,
          }
      },
      created() {
          Lib.WX.is_weixin();
          Lib.M.baseFn();
          this.countdown = 60;
          this.phone = '';
          this.sourceUrl = document.referrer.toString();  //来源页面
      },
      methods: {
          bslLogin:function (pluginId) {

          },
          settime: function (btn) {
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
              ;
          },
          getCode: function (btn) {

          },
          smsLoginFn: function () {


          },
          passwordLoginFn: function () {


          },
          loginFn:function(pluginId) {

          },
      },
  }

</script>

<style lang="less">
@import "../../../assets/css/m_base.less";
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
  .sms_login .content .logo{
    width: 1.48rem;
    height: 1.48rem;
    margin: 0.5rem auto 1.1rem;
    background-image: url(../../../assets/img/meiyi_logo.png);
    background-repeat: no-repeat;
    -webkit-background-size: 1.48rem 1.48rem;
    background-size: 1.48rem 1.48rem;
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
    //下面这些都是居中的
    // text-align: center;
    // margin: 0 auto;
    // .qq_icon{
    //   margin: 0;
    // }
  }
  .other_login .wechat{
    float: right;
    text-align: left;
  }
  .other_login .qq_icon,.wechat_icon{
    display: inline-block;
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

  /*大登录按钮*/
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
  /*大登录按钮*/
</style>
