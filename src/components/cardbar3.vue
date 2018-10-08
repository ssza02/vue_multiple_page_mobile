<template lang="html">
  <div class="card_bar" ref="scroll_box">
      <div class="swiper-container-card">
        <div class="swiper-wrapper">
          <div class="swiper-slide card_slide" v-for="item in newsdata" @click="goExpert(item.news.id)">
            <div class="exper_cadr_bar">
              <div class="expert_logo" :style="{backgroundImage: 'url(' +item.news.news_small_image+ ')'}"></div>
              <p class="expert_Briefly">{{item.news.news_title}}</p>
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
    props:['newsdata'],
    data () {
      return {
        newsList:this.newsdata,
      }
    },
    watch:{
      experts:function (val) {
        this.newsList=val;
      }
    },
    created () {
      this.newsList=this.newsdata;
      this.$nextTick(() => {
        this._initScroll();
        //this.newsList=this.experts;
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
        location.href="/news/newsdetail.html?pid="+eId;
      }
    }
  }
</script>

<style lang="less" scoped>
  .card_bar{
    padding-top: 8px;
    background-color: #fff;
    overflow: hidden;
    .swiper-wrapper{
      display: flex;
    }
    .swiper-slide{
      flex:0 0 4.52rem;
      width: 4.52rem;
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
        height: 100%;
        box-sizing: border-box;
        .expert_Briefly{
          font-size: 14px;
          color: #303E4A;
          line-height: 20px;
          text-align: left;
          padding: 0.2rem 0.24rem;

        }
        .expert_logo{
          width: 100%;
          height: 2.88rem;
          background-size: 100% 2.88rem;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
  }
</style>
