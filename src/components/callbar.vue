<template lang="html">
  <div class="callbar">
    <div id="call_meiyi" @click="showCallBox=true">
      <span class="icon-1234"></span>
      咨询
    </div>
    <transition name="fade">
      <div class="shadow" v-if="showCallBox" @click="showCallBox=!showCallBox"></div>
    </transition>
    <transition name="fade">
      <div id="call_box" class="centerbox" v-if="showCallBox">
        <div class="call_tips">
          <p>免费获得移民咨询</p>
          <a href="tel:4008-766-791" class="phone_call"><span class="icon icon-phone"></span>电话咨询</a>
          <a v-if="!source" href="https://static.meiqia.com/dist/standalone.html?eid=55423" class="chat_call"><span class="icon icon-chat"></span>在线咨询</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Lib from "assets/js/Lib.js";
  export default {
    data(){
      return{
        showCallBox:false,
        source:Lib.M.checkMiniprogram(),
      }
    },
  }
</script>

<style lang="less" scoped>
  #call_meiyi{
    position: fixed;
    right: 0;
    bottom: 1.4rem;
    width: 0.8rem;
    height: 1.3rem;
    color: #fff;
    text-align: center;
    background-color: #2399eb;
    font-size: 14px;
    border-radius:4px 0 0 4px;
    opacity: 0.8;
    padding: 2px;
    z-index: 10;
    .icon-1234{
      margin: 0.2rem 0 0.1rem 0;
      font-size: 25px;
      display:block;
      text-align: center;
    }
  }
  #call_box{
    position: fixed;
    background-color: #fff;
    padding: 0.5rem;
    z-index: 999999;
    font-size: 14px;
    width: 67.2%;
    p{
      font-size: 13px;
      opacity: 0.6;
      margin-bottom: 0.5rem;
    }
    .phone_call,.chat_call{
      display: block;
      width:100%;
      height: 38px;
      line-height: 38px;
      text-align: center;
      border: 1px solid #f0f0f0;
    }
    .phone_call{
      color: #0096E0;
      border-color: #0096E0;
      margin-bottom: 10px;
    }
    .chat_call{
      color: #0CC17A;
      border-color: #0CC17A;
    }
    .icon{
      vertical-align: middle;
      margin-right: 0.2rem;
    }
  }
</style>
