<template lang="html">
  <div class="card_bar">
    <div class="swiper-container-card news_card" ref="scroll_box">
        <div class="swiper-slide">
          <div class="flexbox">
            <div class="exper_cadr_bar news_expert_column_data" v-for="item in expertColumnList" @click="goColunm(item.id)">
              <div class="news_expert_column_image" :style="{backgroundImage: 'url(' + item.column_thumbnail+ ')'}">
                <h3 class="img_title text-overflow">{{item.column_title}}</h3>
              </div>
              <a :href="'/expert/expert.html?eId='+item.expert.id"><div class="expert_logo" :style="{backgroundImage: 'url(' + item.expert.expertInformation.expert_small_image+ ')'}"></div></a>
              <div class="exper_detail clearfix">
                <span class="exper_name">{{item.expert.expertInformation.expert_name}}</span>
                <p><span class="expert_Briefly">{{item.expert.expertInformation.expert_brief_describ | filterString(18)}}</span><span class="text_read_box"><span class="news_expert_column_read" >{{item.column_read}}人阅读</span></span></p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Lib from "assets/js/Lib";
  import BScroll from 'better-scroll';
  export default {
    name:'cardbar',
    props:['expertColumn'],
    data () {
      return {
        expertColumnList:this.expertColumn
      }
    },
    watch:{
      expertColumn:function (val) {
        this.expertColumnList=val;
      }
    },
    filters:{
      filterString:Lib.M.filterString
    },
    created () {
       this.expertColumnList=this.expertColumn;
       this.$nextTick(() => {
          this._initScroll();
      });
    },
    methods:{
      _initScroll:function () {
        this.Scroll = new BScroll(this.$refs.scroll_box, {
          click: true,
          scrollX:true,
          scrollY:false,
        });
      },
      goColunm:function (cId) {
        location.href="/expert/expertcolumn.html?pid="+cId;
      }
    }
  }
</script>

<style lang="less">
  .flexbox{
    display: flex;
  }
  .card_bar{
    width: 100%;
    margin-right: 0.3rem;
    background-color: #fff;
    overflow: hidden;
  }
  .card_bar .swiper-container-card {
    overflow: hidden;
  }
  .card_bar .swiper-container-card .swiper-slide{
    display: inline-block;
  }
  .card_bar .swiper-container-card .swiper-slide .exper_cadr_bar{
    flex: 0 0 6.46rem;
    width: 6.46rem;
    font-size: 12px;
    position: relative;
    margin:0 0.3rem;
  }
  .card_bar .swiper-container-card .swiper-slide .exper_cadr_bar .news_expert_column_image{
    height: 3.12rem;
    width: 6.44rem;
    background-size: 6.44rem 3.12rem;
    background-repeat: no-repeat;
    position: relative;
  }
  .card_bar .swiper-container-card .swiper-slide .exper_cadr_bar .news_expert_column_image .img_title{
    position: absolute;
    bottom: 0;
    display: block;
    background: linear-gradient(rgba(255,255,255,0),rgba(0,0,0,0.5));
    height: 0.75rem;
    line-height: 0.75rem;
    text-indent: 0.4rem;
    width: 100%;
    color: #fff;
  }
  .card_bar .swiper-container-card .swiper-slide .exper_cadr_bar .exper_name{
    font-size: 14px;
    line-height: 0.8rem;
    color: #000;
  }
  .card_bar .swiper-container-card .swiper-slide .exper_cadr_bar .expert_logo{
    display: inline-block;
    width: 0.67rem;
    height: 0.67rem;
    border-radius: 100%;
    background-size: 0.67rem 0.67rem;
    background-repeat: no-repeat;
    background-position: center;
    margin: 0.4rem 0.3rem 0.4rem 0;
    vertical-align: top;
  }
  .card_bar .swiper-container-card .swiper-slide .exper_cadr_bar .exper_detail{
    display: inline-block;
    line-height: 0;
    margin-top: 0.2rem;
  }
  .card_bar .swiper-container-card .swiper-slide .exper_cadr_bar .exper_detail .exper_name{
    font-size: 14px;
    color: #262626;
  }
  .card_bar .swiper-container-card .swiper-slide .exper_cadr_bar .exper_detail .expert_Briefly{
    font-size: 11px;
    color: #808080;
  }
  .card_bar .swiper-container-card .swiper-slide .exper_cadr_bar .exper_detail .text_read_box{
    position: absolute;
    right: 0;
    font-size: 12px;
    color: #b2b2b2;
  }
</style>
