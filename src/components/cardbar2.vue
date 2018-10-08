<template lang="html">
  <div class="card_bar" ref="scroll_box">
      <div class="swiper-container-card">
        <div class="swiper-wrapper">
          <div class="swiper-slide card_slide" v-for="item in experts" @click="goExpert(item.expert.expertInformation.id)">
            <div class="exper_cadr_bar">
              <div class="expert_logo" :style="{backgroundImage: 'url(' + item.expert.expertInformation.expert_medium_image + ')'}"></div>
              <span class="exper_name">{{ item.expert.expertInformation.expert_name }}</span>
              <p class="expert_Briefly">{{ item.expert.expertInformation.expert_brief_describ }}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name:'cardbar',
    props:['experts'],
    data () {
      return {
        expertList:this.experts,
      }
    },
    watch:{
      experts:function (val) {
        this.expertList=val;
      }
    },
    created () {
      this.expertList=this.experts;
      this.$nextTick(() => {
        this._initScroll();
        //this.expertList=this.experts;
      });
    },
    methods:{
      _initScroll:function () {
        this.Scroll = new BScroll(this.$refs.scroll_box, {
          click: true,
          scrollX:true,
          scrollY:false,
          preventDefault: false,
        });
      },
      goExpert:function (eId) {
        location.href="/expert/expert.html?eId="+eId;
      }
    }
  }
</script>

<style lang="less" scoped>
  .card_bar{
    padding: 8px 0;
    background-color: #fff;
    overflow: hidden;
    .swiper-wrapper{
      display: flex;
    }
    .swiper-slide{
      flex:0 0 3rem;
      width: 3rem;
      margin:0 8px;
    }
    .swiper-container-card{
      display: inline-block;
      .exper_cadr_bar{
        line-height: 16px;
        font-size: 12px;
        color:#808080;
        border: 1px solid #E1E1E1;
        box-shadow: 0 0 3px 0 rgba(204,204,204,0.50);
        border-radius: 2px;
        padding:0.4rem 0.28rem;
        height: 100%;
        box-sizing: border-box;
        .exper_name{
          line-height: 0.6rem;
          font-size: 15px;
          color: #303E4A;
          text-align: center;
          display: block;
        }
        .expert_Briefly{
          font-size: 11px;
          color: #303E4A;
          line-height: 16px;
          text-align: left;
        }
        .expert_logo{
          width: 74px;
          height: 74px;
          margin: 0 auto;
          background-size: 74px 74px;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 50%;
        }
      }
    }
  }
</style>
