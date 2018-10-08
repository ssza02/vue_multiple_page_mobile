<template lang="html">
    <div>
    <div class="schedule">
      <ul>
        <li class="list"  @click.prevent="changeTag = !changeTag">
          <transition name="fade" mode="out-in">
            <!--<div v-if="changeTag" key="normal"  class="item">-->
              <!--<div class="item-title text-overflow">-->
                <!--<div class="title-text">-->
                  <!--<span class="num">3</span>-->
                  <!--<span class="name">准备材料</span>-->
                  <!--<span class="icon">进行中</span>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <div  key="activity"  class="item active">
              <div class="item-title text-overflow">
                <div class="title-text">
                  <span class="num">3</span>
                  <span class="name">准备材料</span>
                  <span class="icon">进行中</span>
                </div>
              </div>
              <div class="content">
                <ul>
                  <!--<li>-->
                    <!--<div class="item">-->
                      <!--<div class="col-title">周期：</div>-->
                      <!--<div class="col-content">1~2月（根据客户考试情况）</div>-->
                    <!--</div>-->
                  <!--</li>-->
                  <!--<li>-->
                    <!--<div class="item">-->
                      <!--<div class="col-title">办理内容：</div>-->
                      <!--<div class="col-content">客户自行到国内考点完成G类雅思考试;同时提交学历证书和成绩单完成学历认证。</div>-->
                    <!--</div>-->
                  <!--</li>-->
                  <!--<li>-->
                    <!--<div class="item">-->
                      <!--<div class="col-title">附：</div>-->
                      <!--<div class="col-content"><a href="#">材料清单</a></div>-->
                    <!--</div>-->
                  <!--</li>-->
                  <li v-for="(item,index) in samplePics">
                    <div class="item" >
                      <div class="col-title">样例：</div>
                      <div class="col-content">
                        <div class="timeline_photo" v-if="item.type=='graphImage'||item.type=='text'" :data-pswp-uid="index+1">
                          <figure v-for="photo in item.dynamicPicture">
                            <div :class="{'single':item.dynamicPicture.length==1}"><a :href="photo.pictureUrl" :data-size="photo.width+'x'+photo.height"><img style="" :src="photo.pictureUrl" :class="[{height:photo.width>=photo.height},{width:photo.width<photo.height}]"></a></div>
                            <!-- <figcaption style="display:none;">在这里可增加图片描述4</figcaption> -->
                          </figure>
                        </div>

                        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

                          <!-- Background of PhotoSwipe.
                               It's a separate element as animating opacity is faster than rgba(). -->
                          <div class="pswp__bg"></div>

                          <!-- Slides wrapper with overflow:hidden. -->
                          <div class="pswp__scroll-wrap">

                            <!-- Container that holds slides.
                                PhotoSwipe keeps only 3 of them in the DOM to save memory.
                                Don't modify these 3 pswp__item elements, data is added later on. -->
                            <div class="pswp__container">
                              <div class="pswp__item"></div>
                              <div class="pswp__item"></div>
                              <div class="pswp__item"></div>
                            </div>

                            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
                            <div class="pswp__ui pswp__ui--hidden">

                              <div class="pswp__top-bar">

                                <!--  Controls are self-explanatory. Order can be changed. -->

                                <div class="pswp__counter"></div>

                                <!-- <button class="pswp__button pswp__button--close" title="Close (Esc)"></button> -->

                                <!-- <button class="pswp__button pswp__button--share" title="Share"></button> -->

                                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                                <!-- element will get class pswp__preloader--active when preloader is running -->
                                <div class="pswp__preloader">
                                  <div class="pswp__preloader__icn">
                                    <div class="pswp__preloader__cut">
                                      <div class="pswp__preloader__donut"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                                <div class="pswp__share-tooltip"></div>
                              </div>

                              <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                              </button>

                              <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                              </button>

                              <div class="pswp__caption">
                                <div class="pswp__caption__center"></div>
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </transition>

        </li>
      </ul>
    </div>

    </div>
</template>

<script>
    import Lib from "assets/js/Lib";
    import PhotoSwipe from "assets/js/photoswipe.min.js";
    import PhotoSwipeUI_Default from "assets/js/photoswipe-ui-default.min.js";
    export default {
      props:[
          'samplePics'
      ],
      data () {
          return {
              changeTag:true,

          }
      },
      mounted() {
          Lib.M.baseDomFn();
          // this.$nextTick(()=>{
              // setTimeout(()=>{
              //     this._initPhotoSwipeFromDOM(".timeline_photo");
              // },2000)
          // });
      },
      created(){


          console.log(this.samplePics)
      },
      methods:{
          linkImg(imgUrl){
            window.location.href = imgUrl;
          },
          _initPhotoSwipeFromDOM:function(gallerySelector) {
              // 解析来自DOM元素幻灯片数据（URL，标题，大小...）
              // (children of gallerySelector)
              var parseThumbnailElements = function(el) {
                  var thumbElements = el.childNodes,
                      numNodes = thumbElements.length,
                      items = [],
                      figureEl,
                      linkEl,
                      size,
                      item,
                      divEl;

                  for(let i = 0; i < numNodes; i++) {

                      figureEl = thumbElements[i]; // <figure> element

                      // 仅包括元素节点
                      if(figureEl.nodeType !== 1) {
                          continue;
                      }
                      divEl = figureEl.children[0];
                      linkEl = divEl.children[0]; // <a> element
                      size = linkEl.getAttribute('data-size').split('x');

                      // 创建幻灯片对象
                      item = {
                          src: linkEl.getAttribute('href'),
                          w: parseInt(size[0], 10),
                          h: parseInt(size[1], 10)
                      };



                      if(figureEl.children.length > 1) {
                          // <figcaption> content
                          item.title = figureEl.children[1].innerHTML;
                      }

                      if(linkEl.children.length > 0) {
                          // <img> 缩略图节点, 检索缩略图网址
                          item.msrc = linkEl.children[0].getAttribute('src');
                      }

                      item.el = figureEl; // 保存链接元素 for getThumbBoundsFn
                      items.push(item);
                  }

                  return items;
              };

              // 查找最近的父节点
              var closest = function closest(el, fn) {
                  return el && ( fn(el) ? el : closest(el.parentNode, fn) );
              };

              // 当用户点击缩略图触发
              var onThumbnailsClick = function(e) {
                  e = e || window.event;
                  e.preventDefault ? e.preventDefault() : e.returnValue = false;

                  var eTarget = e.target || e.srcElement;

                  // find root element of slide
                  var clickedListItem = closest(eTarget, function(el) {
                      return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
                  });

                  if(!clickedListItem) {
                      return;
                  }

                  // find index of clicked item by looping through all child nodes
                  // alternatively, you may define index via data- attribute
                  var clickedGallery = clickedListItem.parentNode,
                      childNodes = clickedListItem.parentNode.childNodes,
                      numChildNodes = childNodes.length,
                      nodeIndex = 0,
                      index;

                  for (var i = 0; i < numChildNodes; i++) {
                      if(childNodes[i].nodeType !== 1) {
                          continue;
                      }

                      if(childNodes[i] === clickedListItem) {
                          index = nodeIndex;
                          break;
                      }
                      nodeIndex++;
                  }



                  if(index >= 0) {
                      // open PhotoSwipe if valid index found
                      openPhotoSwipe( index, clickedGallery );
                  }
                  return false;
              };

              // parse picture index and gallery index from URL (#&pid=1&gid=2)
              var photoswipeParseHash = function() {
                  var hash = window.location.hash.substring(1),
                      params = {};

                  if(hash.length < 5) {
                      return params;
                  }

                  var vars = hash.split('&');
                  for (var i = 0; i < vars.length; i++) {
                      if(!vars[i]) {
                          continue;
                      }
                      var pair = vars[i].split('=');
                      if(pair.length < 2) {
                          continue;
                      }
                      params[pair[0]] = pair[1];
                  }

                  if(params.gid) {
                      params.gid = parseInt(params.gid, 10);
                  }

                  return params;
              };

              var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
                  var pswpElement = document.querySelectorAll('.pswp')[0],
                      gallery,
                      options,
                      items;

                  items = parseThumbnailElements(galleryElement);

                  // 这里可以定义参数
                  options = {
                      tapToClose: true,
                      imageScaleMethod:'fit',
                      barsSize: {
                          top: 100,
                          bottom: 100,
                      },
                      fullscreenEl : false,
                      // shareButtons: [
                      // {id:'wechat', label:'分享微信', url:'#'},
                      // {id:'weibo', label:'新浪微博', url:'#'},
                      // {id:'download', label:'保存图片', url:'{{raw_image_url}}', download:true}
                      // ],

                      // define gallery index (for URL)
                      galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                      getThumbBoundsFn: function(index) {
                          // See Options -> getThumbBoundsFn section of documentation for more info
                          var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                              pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                              rect = thumbnail.getBoundingClientRect();

                          return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                      }

                  };

                  // PhotoSwipe opened from URL
                  if(fromURL) {
                      if(options.galleryPIDs) {
                          // parse real index when custom PIDs are used
                          for(var j = 0; j < items.length; j++) {
                              if(items[j].pid == index) {
                                  options.index = j;
                                  break;
                              }
                          }
                      } else {
                          // in URL indexes start from 1
                          options.index = parseInt(index, 10) - 1;
                      }
                  } else {
                      options.index = parseInt(index, 10);
                  }

                  // exit if index not found
                  if( isNaN(options.index) ) {
                      return;
                  }

                  if(disableAnimation) {
                      options.showAnimationDuration = 0;
                  }

                  // Pass data to PhotoSwipe and initialize it
                  gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                  gallery.init();
              };

              // loop through all gallery elements and bind events
              var galleryElements = document.querySelectorAll( gallerySelector );

              for(var i = 0, l = galleryElements.length; i < l; i++) {
                  galleryElements[i].setAttribute('data-pswp-uid', i+1);
                  galleryElements[i].onclick = onThumbnailsClick;
              }

              // Parse URL and open gallery if it contains #&pid=3&gid=1
              var hashData = photoswipeParseHash();
              if(hashData.pid && hashData.gid) {
                  openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
              }
          },
      }
  }
</script>

<style lang="less" scoped>


  .schedule{
    ul li{
      /*position: relative;*/
      margin-bottom: 0.3rem;
      .item{
        /*position: absolute;*/
        /*top:0;*/
        /*left: 0;*/
        /*width: 100%;*/
        font-size: 0.3rem;
        color: #999;
        border: 1px solid transparent;
        background: #fff;
        .item-title{
          padding: 0.3rem 0.4rem;
          border-radius: 4px;
          overflow: hidden;
          .title-text{

            .num{
              color: #fff;
              display: inline-block;
              text-align: center;
              width: 0.3rem;
              height: 0.3rem;
              border-radius: 50px;
              background: #999;
            }
            .name{

            }
            .icon{
              font-size: 0.28rem;
              float: right;
            }
          }

        }
      }
      .item.active{
        color: #2399EB;
        .item-title{
          .title-text{
            height: 0.6rem;
            border-bottom: 1px solid #EFEFF3;
            .num{
              background: #2399EB;
            }
          }
        }
        .content{
          .item{
            display: flex;
            line-height: 0.4rem;
            .col-title{
              flex: 0 0 1.6rem;
              text-align: right;
            }
            .col-content{
              flex: 1 1 auto;
              a:link,a:visited{
                color: #2399EB;
                text-decoration: underline;
              }
            }
          }
        }
      }

    }
  }
  .timeline_photo{
    overflow: hidden;
    margin-bottom: 20px;
    div{
      width: 30%;
      overflow: hidden;
      float: left;
      margin-top: 5px;
      margin-right: 5px;
      height: 1.6rem;
      .width{
        width: 100%;
      }
      .height{
        height: 100%;
      }
    }
    .single{
      width: auto;
      //height: auto;
      height: auto;
      max-height: 10rem;
      max-width:100%;
      overflow: hidden;
      float: left;
      margin-top: 0;
      margin-right: 0;
      img{
        width: 60%;
        height: auto
      }
    }
    figure {
      margin-before: 0;
      margin-after: 0;
      margin-start: 0;
      margin-end: 0;
    }
  }
  .single{
    width: auto;
    //height: auto;
    height: auto;
    max-height: 10rem;
    max-width:100%;
    overflow: hidden;
    float: left;
    margin-top: 0;
    margin-right: 0;
    img{
      width: 60%;
      height: auto
    }
  }
</style>
