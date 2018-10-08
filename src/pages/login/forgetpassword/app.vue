<template>
  <div id="app">
      <header>
      <div class="top_title_box">
        <span class="icon-return back-btn top-back-icon top_back"></span><h1 class="top_title">找回密码</h1>
        <a class="icon-phone top_call" href="tel:4008-766-791"></a>
      </div>
    </header>
    <section>
      <div class="password_login">
        <div class="content">
          <div class="login_box">
            <form id="next" method="post" action="${pageContext.request.contextPath }/modifypassword">
              <div class="user_phone_bar border_bottom" >
                <span>+86</span><input type="number" v-model="phone" name="phone" placeholder="请输入手机号码" id="phone"><input type="button" class="send_code_btn" @click="getCode()" value="发送验证码">
              </div>
              <div class="user_sms_code border_bottom">
                <span>验证码</span><input type="number" v-model="vcode"name="vcode" placeholder="请输入验证码" id="vcode">
              </div>
              <a href="javascript:;" class="login_btn" id="next_btn" @click="next()">下一步</a>
            </form>
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
        vcode:'',
        phone:'',
      }
    },
    created () {
       Lib.WX.is_weixin();
       Lib.M.baseFn();
       
    },
    methods: {
      
      next:function(){
         Lib.M.ajax({
         url:`/checkForgetCode`,
         type:'post',
         data: {
         phone:this.phone,
         vcode:this.vcode,
         },
          success:(res)=>{
            if(res.type=='success'){
                 location.href=`/login/resetpassword.html?phone=${this.phone}&&code=${this.vcode}`;
            }else{
              alert(res.content);
            }
        }
        });
      },
      getCode:function(){
          if(this.phone.length==11){
              Lib.M.ajax({
              url:`/sendForgetCode`,
              type:'post',
              data: {
                phone:this.phone,
              },
              success:(res)=>{
                if(res.type=='success'){
                }else{
                  alert(res.content);
                }
          }
        });
          }else{
            alert("手机格式不正确，请重新输入！");
          }
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
