<template>
  <div id="app">

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
        logoImg: logo
      }
    },
    created () {
       Lib.WX.is_weixin();
       Lib.M.baseFn();
       this.code=Lib.M.getUrlQuery('code');
       this.state=Lib.M.getUrlQuery('state');
       console.log(this.state.slice(0,2));
       this.pluginId=this.state.slice(0,2)=='qq'?'qqLoginPlugin':'wechatLoginPlugin';
       this.returnUrl=location.href.split("?")[0];
       this.postUserInfo(this.code,this.state,this.pluginId,this.returnUrl);
       
    },
    methods: {
      
      postUserInfo(code,state,pluginId,returnUrl){
        Lib.M.ajax({
          url:'/login/plugin_notify',
          type:'post',
          data:{
            pluginId,
            code,
            state,
            returnUrl,
          },
          success:res=>{
            if(res.type=='success'){
              localStorage.meiyi_user=JSON.stringify(res.content);
              location.href="/index.html";
            }
          }
        });
      }
    }
  }
</script>

<style lang="less">
@import "../../../assets/css/m_base.less";
  .index-card {
    width: 800px;
    margin: 100px auto;
  }
</style>
