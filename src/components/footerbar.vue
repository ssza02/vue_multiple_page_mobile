<template lang="html">
  <div class="footer_box">
    <div class="flex_nav">
      <div class="nav_item"  :class="{'checked':checkNum==1}" @click="goFn('/index.html')">
        <div class="nav_icon">
          <span class="icon-home" v-if="checkNum!=1"></span>
           <span class="icon-home-selected" v-if="checkNum==1"></span>
        </div>
        <span class="nav_text_home">首页</span>
      </div>
      <div class="nav_item"  :class="{'checked':checkNum==2}" @click="goFn('/country/country.html')">
        <div class="nav_icon">
          <span class="icon-expert" v-if="checkNum!=2"></span>
          <span class="icon-expert-selected" v-if="checkNum==2"></span>
        </div>
        <span class="nav_text_expert">国家项目</span>
      </div>
      <div class="nav_item" :class="{'checked':checkNum==3}" @click="goFn('/community/community.html')">
        <div class="nav_icon">
          <span class="" v-if="checkNum!=3"><img class="icon-information-emp" src="../assets/img/icon-information.png"/></span>
          <span class="" v-if="checkNum==3"><img class="icon-information-full" src="../assets/img/icon-information-selected.png"/></span>
        </div>
        <span class="nav_text_news">社区</span>
      </div>
      <div class="nav_item" :class="{'checked':checkNum==4}" @click="goFn('/login/login.html')">
        <div class="nav_icon">
          <span class="icon-mine" v-if="checkNum!=4"></span>
          <span class="icon-mine-selected" v-if="checkNum==4"></span>
        </div>
        <span class="nav_text_me">我</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Lib from "assets/js/Lib";
  export default {
    name:"footerbar",
    data() {
      return{
        meiyi_user:null,
      }
    },
    created(){
      this.meiyi_user = Lib.M.isLogin();
    },
    methods: {
      goFn:function (url) {
        location.href=url;
      },
      goFn2:function (url) {
        if(this.meiyi_user.uid == 0 || this.meiyi_user.token == 0){
           location.href = '/login/login.html';
        }else{
           location.href=url;
        }

      }
    },
    props: ['checkNum'],//传的数字代表当前选中是第几个。
  }
</script>

<style lang="less">
  .footer_box{
    position: absolute;
    // margin-top: -1rem;
    bottom: 0;
    width: 100%;
    height: 1rem;
    min-height: 50px;
    clear:both;
    border-top: 1px solid #f0f0f0;
    background-color: #fff;
    z-index: 1000;
    .flex_nav{
      display: flex;
      width: 100%;
      height: 100%;
      font-size: 0;
      margin: 0 auto;
      .nav_item{
        justify-content: space-between;
        width: 1.87rem;
        text-align: center;
        font-size: 11px;
      }
      .nav_icon{
        width: 100%;
        height: 0.5rem;
        text-align: center;
        padding-top: 10px;
        span{
          font-size: 0.4rem;
          vertical-align: middle;
          img.icon-information-emp,img.icon-information-full{
            width: 0.38rem;
            height: 0.36rem;
          }
        }
        .iconfont{
          font-size: 0.5rem;
        }
      }
      .checked{
        color: #2399eb;
      }
    }
  }
</style>