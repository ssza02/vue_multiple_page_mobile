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
    width: 100%;
    padding: 8px 0;
    background-color: #fff;
    overflow: hidden;
    .swiper-wrapper{
      display: flex;
    }
    .swiper-slide{
      flex:0 0 2.6rem;
      width: 2.6rem;
      margin:0 8px;
    }
    .swiper-container-card{
      display: inline-block;
      padding-left: 0.2rem;
      .exper_cadr_bar{
        line-height: 16px;
        font-size: 12px;
        color:#808080;
        text-align: center;
        box-shadow:0 0 1px 1px rgba(4,0,0,0.08);
        border-radius: 4px;
        overflow: hidden;
        .exper_name{
          font-size: 14px;
          line-height: 0.6rem;
          color: #000;
        }
        .expert_Briefly{
          margin-bottom: 10px;
          height: 0.64rem;
          overflow: hidden;
        }
        .expert_logo{
          width: 2.6rem;
          height: 2.7rem;
          background-size: 2.6rem 2.7rem;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
  }
</style>
