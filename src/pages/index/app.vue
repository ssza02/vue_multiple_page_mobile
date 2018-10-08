
<template>
  <div id="app">
    <transition name="fade">
      <div class="title title_" v-show="topTitleStatus==1">
        <a class="icon-phone top_call" href="tel:4008-999-445"></a>
      </div>
    </transition>
    <div class="html_box" ref="scroll_box">
      <div>
        <header>
          <div class="banner">
            <swiper :options="swiperOption"  ref="mySwiper">
              <swiper-slide v-for="item in idnexSilders" :key="item.id">
                <a :href="item.link||'javascript:;'"><img :src="item.picture" alt="" width="100%" height="100%"></a>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper >
          </div>
          <div class="exper_type_bar">
            <div class="exper_type">
              <a href="/project/assess.html">
                <!--<div class="exper_type_iconbox exper_type_icon1 hot">-->
                <!--<span class="icon-pingguicon"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>-->
                <!--</div>-->
                <img class="icon-strategy" src="../../assets/img/page_blue.png"/>
                <span>评估详情</span>
              </a>
            </div>
            <div class="exper_type">
              <a href="/country/countryStrategy.html">
                <!--<div class="exper_type_iconbox exper_type_icon2">-->
                <!--<span class="icon-cityicon"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>-->
                <!--</div>-->
                <img class="icon-strategy" src="../../assets/img/position.png"/>
                <span>攻略详情</span>
              </a>
            </div>
            <div class="exper_type">
              <a href="/expert/overexpertslist.html" >
                <!--<div class="exper_type_iconbox exper_type_icon3">-->
                <!--<span class="icon-yimingicon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>-->
                <!--</div>-->
                <img class="icon-exper" src="../../assets/img/man_green.png"/>
                <span>专家列表</span>
              </a>
            </div>
            <div class="exper_type">
              <a href="/document/about.html" >
                <!--<div class="exper_type_iconbox exper_type_icon3">-->
                <!--<span class="icon-expert-video"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>-->
                <!--</div>-->
                <img class="icon-about" src="../../assets/img/about_us.png"/>
                <span>关于我们</span>
              </a>
            </div>
          </div>
          <div class="police_new_bar">
            <div class="img-police">
              <img src="../../assets/img/community/police_new.png"/>
            </div>
            <div class="scroll-police text-overflow">
              <swiper :options="swiperOption2"  ref="mySwiper2">
                <swiper-slide v-for="item in policeNews" :key="item.id"  style="height: 1rem">
                  <div class="text-overflow">
                    <a :href="item.link"><img :src="item.small_counttry_flag"/><span>{{item.title}}</span></a>
                  </div>
                </swiper-slide>
                <!--<div class="swiper-pagination" slot="pagination"></div>-->
              </swiper >

            </div>
          </div>
          <div class="title_base">
            <img class="icon-title" src="../../assets/img/expert.png"/><span class="title_name">词典</span><a class="more" href="expert/overexpertslist.html">更多 ></a>
          </div>
          <cardbar :experts.sync="experts" v-if="experts"></cardbar>
        </header>
        <section>
          <div  class="wrapper">
            <div v-if="nominate" class="recommend recommend-wrapper">
              <div class="img-wrapper">
                <img class="img-label" src="../../assets/img/community/recommend_label.png"/>
                <a v-if="nominate" :href="nominate.nominateUrl"><img class="img-recommend" :src="nominate.nominatePicture"/></a>
              </div>
            </div>
            <div class="recommend dictionary-wrapper">
              <div class="img-wrapper">
                <!--<img class="img-label" src="../../assets/img/dictionary_canada.png"/>-->
                <a href="/dictionary/dictionaryCountry.html"><img class="img-recommend" src="../../assets/img/dictionary_canada.png"/></a>
              </div>
            </div>
          </div>
          <div class="title_base">
            <img class="icon-title" src="../../assets/img/activer.png"/><span class="title_name">社区精选</span>
          </div>
          <div class="detail-info wrapper">
            <ul>
              <li v-for="(item,index) in recommendArticle" v-if="index!=0"  @click="linkToDetail(item.id,item.type)">
                <h1 class="wrapper">{{item.title}}</h1>
                <p class="count-info wrapper">
                  <span><img v-if="item.user" class="img-user" :src="item.user.headPortrait"/>{{item.user.nickName}}</span>&nbsp;&nbsp;
                  <span><img class="icon-block" src="../../assets/img/block.png"/>{{item.communityForum.forumName}}</span>
                  <!--<span class="times">{{item.createDate}}</span>-->
                </p>
                <img v-if="item.editorUrl" class="img-article" :src="item.editorUrl"/>
                <p class="content-info" v-html="item.content">

                </p>
              </li>
            </ul>
          </div>
        </section>
        <!--<div class="nomore">海外投资服务平台</div>-->
        <!-- <div id="call_meiyi">
          <span class="icon-1234"></span>
          咨询
        </div>
        <div class="shadow"></div>
        <div id="call_box" class="centerbox">
          <div class="call_tips">
            <p>免费获得移民咨询</p>
            <a href="tel:4008-766-791" class="phone_call"><span class="icon icon-phone"></span>电话咨询</a>
            <a href="https://static.meiqia.com/dist/standalone.html?eid=55423" class="chat_call"><span class="icon icon-chat"></span>在线咨询</a>
          </div>
        </div> -->
      </div>
    </div>
    <footerbar :checkNum="1"></footerbar>
    <callbar></callbar>
  </div>
</template>

<script>
    import logo from 'assets/img/logo.png';
    import footerbar from 'components/footerbar';
    import cardbar from "components/cardbar";
    import Lib from "assets/js/Lib";
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import callbar from "components/callbar";
    export default {
        components: {
            //modal
            footerbar,
            cardbar,
            swiper,
            swiperSlide,
            callbar,
        },
        data () {
            return {
                logoImg: logo,
                topTitleStatus: 0,
                idnexSilders:null,
                policeNews:null,
                experts:null,
                projectList:null,
                expertColumn:null,
                news:[],
                //layzLoadPage:1,
                scroll:{},
                swiperOption:{ /*轮播图*/
                    initialSlide:1,
                    notNextTick: true,
                    autoplay: 5000,//可选选项，自动滑动
                    autoplayDisableOnInteraction : false,
                    pagination : '.swiper-pagination',
                    loop : true,
                },
                swiperOption2:{ /*轮播图*/
                    height : 100,
                    initialSlide:1,
                    notNextTick: true,
                    autoplay: 5000,//可选选项，自动滑动
                    autoplayDisableOnInteraction : false,
                    pagination : '.swiper-pagination',
                    direction:'vertical',
                    loop : true,
                },
                recommendArticle:null,
                nominate:''
            }
        },
        created () {
            sessionStorage.clear();
            Lib.WX.is_weixin();
            Lib.M.baseFn();
            this.$nextTick(() => {
                this.getSliders();
                this.getPoliceNews();
                this.getNominate();
                this.getExpert(1,999);
                this.getProjectList();
                this.getExpertColumn(1,4);
                this.getNews(1,15);
                this.getRecommendArticle();
                this._initScroll();
            });
        },
        filters:{
            titleFilter(value){
                return Lib.M.filterString(value,20);
            }
        },
        mounted(){
            this.swiper.slideTo(1,0,false);
            // alert('localStorage.meiyi_user:'+localStorage.meiyi_user);
        },
        computed:{
            swiper() {
                return this.$refs.mySwiper.swiper;
            },
        },
        methods:{
            linkToDetail:function(id,type){
                window.location.href = '/community/pageDetail.html?id=' + id + '&type=' + type;
            },
            _initScroll:function () {
                var _this=this;
                this.scroll = new Lib.BScroll(this.$refs.scroll_box, {
                    click: true,
                    probeType: 3,
                    deceleration: 0.003,
                    bounce: false,
                    swipeTime:1500,
                });
                this.scroll.on('scroll',function(pos){
                    _this.topTitleStatus=pos.y==0?0:1;
                    //document.querySelector(".title_").style.opacity=Math.abs(pos.y/100)<=1?Math.abs(pos.y/100):1;
                    // let wHeight=document.querySelector(".html_box").offsetHeight;
                    // console.log(this.maxScrollY);
                    // if(pos.y==this.maxScrollY){
                    //   _this.getNews(this.layzLoadPage,5);
                    //   console.log('懒加载');
                    //   this.refresh();
                    // }
                });
            },
            getNominate:function(){
                Lib.M.ajax({
                    url:'/nominate_project',
                    type:'post',
                    data:{
                        nominate:'nominate'
                    },
                    success:(res)=>{
                        this.nominate=res.content[0];
                        this.$nextTick(()=>{
                            this.scroll.refresh();
                        });
                    }
                });
            },
            getSliders:function () {
                Lib.M.ajax({
                    url:'index_sliders',
                    type:'get',
                    success:(res)=>{
                        this.idnexSilders=res;
                        this.$nextTick(()=>{
                            this.scroll.refresh();
                        });
                    }
                });
            },
            goSlidersSrc:(url)=>{
                location.href=url;
            },
            getPoliceNews:function(){
                Lib.M.ajax({
                    url:'/new_politys',
                    type:'post',
                    success:(res)=>{
                        this.policeNews=res.content.content;
                        this.$nextTick(()=>{
                            this.scroll.refresh();
                        });
                    }
                });
            },
            getExpert:function(page,limit){
                Lib.M.ajax({
                    url:'index_expert',
                    type:'post',
                    data: {
                        page,
                        limit,
                    },
                    success:(res)=>{
                        this.experts=res.content;
                        this.$nextTick(()=>{
                            this.scroll.refresh();
                        });
                    }
                });
            },
            getExpertColumn:function (page,limit) {
                Lib.M.ajax({
                    url:'index_expert_column',
                    type:'post',
                    data: {
                        page,
                        limit,
                    },
                    success:(res)=>{
                        this.expertColumn=res.content;
                        this.$nextTick(()=>{
                            this.scroll.refresh();
                        });
                    }
                });
            },
            getProjectList:function () {
                Lib.M.ajax({
                    url:'index_project',
                    type:'get',
                    success:(res)=>{
                        this.projectList=res;
                        this.$nextTick(()=>{
                            this.scroll.refresh();
                        });
                    }
                });
            },
            getNews:function (page,limit) {
                Lib.M.ajax({
                    url:'index_news',
                    type:'post',
                    data: {
                        page:page,
                        limit,
                    },
                    success:(res)=>{
                        this.news=res.content;
                        this.$nextTick(()=>{
                            this.scroll.refresh();
                        });
                        //懒加载
                        //this.layzLoadPage++;
                        // for(let i =0; i<res.content.length; i++){
                        //   this.news.push(res.content[i]);
                        // }
                    }
                });
            },
            getRecommendArticle:function () {
                Lib.M.ajax({
                    url:'/community/nominate_articles',
                    type:'post',
                    data: {
                        nominate:'communityTop',
                        page:1,
                        limit:6
                    },
                    success:res=>{
                        this.recommendArticle = res.content;
                        this.recommendArticle.map((v,k)=>{
                            v.content = Lib.M.removeHTMLTag(v.content.toString());
                        });
                        this.$nextTick(()=>{
                            this.scroll.refresh();
                        });
                    }
                });
            },
            goDetail(url,id){
                location.href=`${url}?pid=${id}`;
            }
        }
    }
</script>

<style lang="less">
  @import "../../assets/css/m_base.less";
  @import "../../assets/css/mixin.less";
  .wrapper{
    margin-bottom: 0.2rem;
  }
  html,body {
    margin: 0;
    padding:0;
    height: 100%;
  }
  /*base*/
  .html_box{
    position: absolute;
    top: 0;
    bottom: 1rem;
    // min-height:100%;
    // height: auto !important;
    // height: 100%; IE6不识别min-height
    // position: relative;
    // padding-bottom: 1rem;
    background-color: #efeff3;
    overflow: hidden;
  }
  /*base*/
  /*asd*/
  .title{
    position: absolute;
    top: 0;
    height: 1rem;
    width: 100%;
    text-align: center;
    font-size: 0;
    line-height: 1rem;
    z-index: 100;
    border-bottom: 1px solid #f0f0f0;
  }
  .title .logo{
    width: 0.82rem;
    height: 0.38rem;
    vertical-align:middle;
  }
  .banner{
    height: 3.8rem;
    width: 100%;
    background-color: #bbb;
    overflow: hidden;
    position: relative;
    .swiper-container{
      height: 100%;
      .swiper-slide{
        height: 100%;
        cursor: pointer;
        img{

        }
      }
    }
  }
  .exper_type_bar{
    display: flex;
    justify-content: space-between;
    align-items:center;
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid #f0f0f0;
    .exper_type{
      flex: 1;
      margin:0 0.2rem;
      font-size: 13px;
      text-align: center;
      a:link,a:visited,a:hover,a:active{
        color: #000;
      }
      img.icon-about,img.icon-exper,img.icon-strategy,img.icon-assess{
        display: block;
        width: 0.8rem;
        height: 0.8rem;
        margin: 0 auto 0.26rem;
      }
      .exper_type_iconbox{
        display: block;
        margin: 0 auto 0.1rem auto;
        width: 1rem;
        height: 0.94rem;
        line-height: 0.94rem;
        text-align: center;
        span{
          font-size: 0.85rem;
        }
      }
    }
  }
  section{
    width: 100%;
    overflow: hidden;
    font-size: 13px;
    color: #808080;
    .main{
      background-color: #fff;
      padding-left: 0.3rem;
      .main_row{
        height: 1.8rem;
        border-bottom: 1px solid #f0f0f0;
        padding-top: 0.3rem;
        &:first-child{
          border-top: none;
          padding-top: 0;
        }
        .content_box{
          width: 100%;
          height: 1.6rem;
          .img_box{
            float: left;
            margin-right:0.3rem;
            width: 2.5rem;
            height: 100%;
            -webkit-background-size: 2.5rem 100%;
            background-size: 2.5rem 100%;
            background-position: center;
            background-repeat: no-repeat;
          }
          .text_box{
            position: relative;
            float: left;
            width: 4rem;
            font-size: 13px;
            color: #808080;
            overflow: hidden;
            height: 100%;
            .text_title{
              font-size: 15px;
              color: #333333;
              display: inline-block;
              width: 100%;
              font-weight: normal;
              line-height: 17px;
            }
            .text_name{
              color:#333333;
              line-height: 0.5rem;
              margin-right: 0.2rem;
            }
            .text_read_box{
              display: inline-block;
              float: right;
              margin-top: 5px;
            }
          }
        }
      }
    }
    .recommend{
      padding: 0.4rem 0.4rem 0;
      background: #fff;
      .img-wrapper{
        position: relative;
        .img-label{
          position: absolute;
          left: -0.4rem;
          top:0;
          width:2rem;
        }
        .img-recommend{
          width: 100%;
          height: 3rem;
          border-radius: 4px;
        }
      }
    }
    .recommend:last-child{
      padding: 0.4rem;
    }
    .detail-info{
      padding: 0.1rem 0.3rem;
      background: #fff;
      ul li{
        border-bottom: 1px solid #EFEFF3;
        margin-bottom: 0.1rem;
        padding-bottom: 0.2rem;
        margin-bottom: 0.3rem;
      }
      ul li:last-child{
        padding-bottom: 0;
        margin-bottom: 0;
        border-bottom: 0;
      }
      h1{
        max-height: 0.8rem;
        line-height: 0.4rem;
        font-size:0.34rem;
        margin-bottom: 0.2rem;
        color: #000;
        overflow: hidden;
      }
      p.count-info{
        font-size:0.26rem;
        color: #999;
        overflow: hidden;
        line-height: 0.5rem;
        .times{
          float: right;
        }
      }
      img.img-user{
        position: relative;
        top:0.06rem;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50px;
        margin-right: 0.1rem;
      }
      img.icon-block{
        width: 0.22rem;
        height: 0.22rem;
        margin-right: 0.1rem;
      }
      img.img-article{
        width: 100%;
        height:2.6rem;
        border-radius: 4px;
      }
      img.icon-eye{
        position: relative;
        width:0.33rem;
        height:0.22rem;
        margin-right: 0.1rem;
      }
      img.icon-comment{
        position: relative;
        top:0.04rem;
        width:0.24rem;
        height:0.27rem;
        margin-right: 0.1rem;
      }
      p.content-info{
        height: 1rem;
        line-height: 0.48rem;
        font-size:0.3rem;
        color: #444;
        .text_over(2);
        /*overflow: hidden;*/
      }
    }
  }
  .banner .swiper-pagination-bullet{width:0.3rem;height:0.06rem;display:inline-block;border-radius:4px;background:#fff;opacity:.2;position: relative;top:10px;}
  .banner .swiper-pagination-bullet-active{
    opacity: 1;
  }
  .title_base{
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.3rem;
    font-size: 15px;
    color: #333333;
    font-weight: bold;
    margin-top: 0.2rem;
    background-color: #fff;
    overflow: hidden;
    .title_name{
      font-size: 0.26rem;
      font-weight: normal;
      color: #999;
    }
  }
  .icon-title{
    position: relative;
    top: 0.08rem;
    width: 0.36rem;
    height: 0.36rem;
    margin-right: 0.1rem;
  }
  .title-icon{
    background-color:#2399eb;
    width: 0.1rem;
    height: 13px;
    margin-right: 0.2rem;
    display: inline-block;
  }
  .title,.banner,.exper_type_bar{
    background-color: #fff;
  }
  .police_new_bar{
    position: relative;
    display: flex;
    height: 1rem;
    line-height: 1rem;
    background: #fff;
    .img-police{
      flex: 0 0 1.6rem;
      img{
        position: absolute;
        top:0.36rem;
        left: 0.4rem;
        width: 1.02rem;
        height: 0.25rem;
      }
    }
    .scroll-police{
      flex: 1 1 auto;
      color:#333;
      font-size: 0.26rem;
      img{
        position: absolute;
        top:0.34rem;
        width: 0.3rem;
        height: 0.3rem;
      }
      span{
        margin-left: 0.6rem;
      }
    }
  }
  /*.more{
    font-size: 14px;
    color:#808080;
    display: inline-block;
    float: right;
    font-weight: normal;
  }
  .more i{
    font-size: 12px;
  }*/
  .home_news .img_box{
    float: left;
    margin:0 0.3rem;
    width: 2.14rem;
    height: 100%;
    -webkit-background-size: 2.5rem 100%;
    background-size: 2.5rem 100%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 4px;
  }
  .home_project{
    background-color: #fff;
    width: 100%;
  }
  .home_project_data{
    display: flex;
    flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .r_project{
    width: 3.3rem;
    display: inline-block;
    overflow: hidden;
    margin-left: 0.3rem;
    min-height: 190px;
    .home_project_recommend_image{
      width: 100%;
      height: 2.46rem;
      background-size: cover;
      margin-bottom: 0.25rem;
    }
  }
  .home_project_recommend_project{
    color: #333333;
    font-size: 14px;
    display: block;
    line-height: 16px;
  }
  .home_project_recommend_advantage{
    font-size: 12px;
    color: #808080;
    display: block;
    line-height:16px;
    margin: 0.1rem 0;
  }

  .image_row{
    padding:0.3rem 0.3rem 0.3rem 0;
    border-top: 1px solid #f0f0f0;
    &:first-child{
      border-top: none;
      padding-top: 0;
    }
    .big_image{
      margin: 0 auto;
      width: 6.9rem;
      height: 3rem;
      -webkit-background-size: 6.9rem 3rem;
      background-size: 6.9rem 3rem;
    }
    .news_title{
      font-size: 15px;
      color: #333333;
      margin: 0.25rem 0;
    }
    .detail_box{
      position: relative;
      width: 100%;
      font-size: 12px;
      color: #b2b2b2;
      .read{
        position: absolute;
        right: 0;
      }
    }
  }
  .text-overflow{
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .text_bar{
    position: absolute;
    bottom: 0;
    font-size: 11px;
    width: 100%;
    .text_honor{
      .text_over(2);
    }
  }
  .nomore{
    text-align: center;
    background-color: #fff;
    font-size: 10px;
    padding: 10px;
    color: #808080;
    margin-top: 0.2rem;
    height: 16px;
    line-height: 16px;
    color: #cecece;
  }
  .hot{
    position: relative;
    &::after{
      content:"";
      position: absolute;
      top: -5px;
      right: -10px;
      width: 24px;
      height: 16px;
      background-image: url(../../assets/img/hot@2x.png);
      background-size: 100% 100%;
    }
  }
</style>
