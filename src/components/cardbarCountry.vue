<template lang="html">
  <div class="card_bar" ref="scroll_box">
      <div class="swiper-container-card">
        <div class="swiper-wrapper">
          <div class="swiper-slide card_slide" v-for="item in forums" @click="goExpert(item.id)">
            <div class="exper_cadr_bar">
              <div class="expert_logo" :style="{backgroundImage: 'url(' + item.pictureUrl + ')'}">
                <span class="country-name">{{item.forumName}}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name:'cardbarCountry',
    props:['forums'],
    data () {
      return {
          forumsList:this.forums,
      }
    },
    watch:{
        forums:function (val) {
        this.forumsList=val;
      }
    },
    created () {

      this.forumsList=this.forums;
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
        location.href="/community/communityHome.html?id="+eId;
      }
    }
  }
</script>

<style lang="less" scoped>
  .card_bar{
    /*padding-top: 8px;*/
    padding: 14px 0 8px;
    background-color: #fff;
    overflow: hidden;
    .swiper-wrapper{
      display: flex;
    }
    .swiper-slide{
      flex:0 0 1.46rem;;
      margin:0 8px;
    }
    .swiper-container-card{
      display: inline-block;
      padding-left: 0.3rem;
      .exper_cadr_bar{
          width:1.46rem;
          height:1.46rem;
          border-radius: 4px;
          overflow: hidden;
        .expert_logo{
          position: relative;
          width: 100%;
          height: 100%;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
          .country-name{
            position: absolute;
            display: block;
            width: 100%;
            height:0.4rem;
            left: 0;
            bottom: 0;
            line-height: 0.4rem;
            text-align: center;
            color: #fff;
            font-size: 0.26rem;;
            background:rgba(0,0,0,0.8);
          }
        }
      }
    }
  }
</style>
