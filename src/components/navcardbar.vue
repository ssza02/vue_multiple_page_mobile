<template lang="html">
  <nav ref="scroll_box" :class="{'fixed':fixedStatus}">
    <div class="nav_card_bar">
        <div class="nav_bar">
          <div class="nav_item" v-for="(item,index) in navItem" :class="{'nav_active':navActiveChild==index}" @click.stop.prevent="navActiveFn(index,$event)" ref="navItem">
            <a href="javascript:;" class="nav_text" v-text="item"></a>
          </div>
        </div>
    </div>
  </nav>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name:'navcardbar',
    props:['navItem','navActive','fixedStatus'],
    data (){
      return {
        navItemArr:null,
        navActiveChild:this.navActive,
        scroll:null,
      }
    },
    created () {
       this.$nextTick(() => {
          this._initScroll();
          this.navItemArr=this.navItem;
          let checkScroll=setInterval(()=>{
            this.scroll.refresh();
            clearInterval(checkScroll);
          },500);
      });
    },
    watch:{
        navItem:function (newVal,oldVal) {
            this.$nextTick(() => {
                this._initScroll();
            });
        }
    },
    methods:{

      navActiveFn:function (index,e) {

        if (!e._constructed) {
          return;
        }
        this.navActiveChild=index;
        this.$emit("listenNavActive",this.navActiveChild);
        let winWidth=document.documentElement.clientWidth;
        let itemWidth=e.target.clientWidth;
        let itemPosition=e.target.getBoundingClientRect();
        //console.log(winWidth);
        //console.log(itemWidth);
        //console.log(e.target.getBoundingClientRect());
        if(itemPosition.x>=winWidth-itemWidth){
          //console.log(this.$refs.navItem);
          //console.log(itemPosition.x-(winWidth-itemWidth));
          let a=itemPosition.x-(winWidth-itemWidth);//当前元素超出屏幕的数值
          let offsetX=itemWidth-a;
          this.scroll.scrollToElement(e.target,300);
          //this.scroll.scrollTo(itemWidth,0,300);
          //this.scroll.scrollTo(0-(itemPosition.x+this.scroll.x),0,300);
        }else if(itemPosition.x<=0){
          //console.log(itemWidth*index);
          //this.scroll.scrollTo(itemWidth*index,0,300);
          this.scroll.scrollToElement(e.target,300);
          this.scroll.scrollTo(itemWidth,0,300);
        }
      },
      _initScroll:function () {
        this.scroll = new BScroll(this.$refs.scroll_box, {
          click: true,
          scrollX:true,
          scrollY:false,
          bounce: false,
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .fixed{
    position: absolute;
    top: 1rem;
    min-width: 100%;
    border-bottom: 1px solid #efeff3;
    .nav_card_bar{
      position: absolute;
      top: 0;
    }
  }
  nav{
    max-height: 51px;
    background-color: #fff;
    border-bottom: 1px solid #efeff3;
    overflow: hidden;
  }
  .nav_card_bar{
    min-width: 100%;
    display: inline-block;
    font-size: 15px;
    background-color: #fff;
  }
  .nav_bar{
    display: flex;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .nav_bar .nav_item{
    white-space: nowrap;
    text-align: center;
    position: relative;
    height: 50px;
    line-height: 50px;
    flex: 1;
  }
  .nav_bar .nav_active a{
    font-size: 16px;
    color: #2399EB;
  }
  .nav_bar .nav_active a:before{
    content:" ";
    position: absolute;
    display: inline-block;
    width: 12px;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: #2399EB;
    transform: translate(-50%,-50%);
  }
  .nav_text{
    display: inline-block;
    padding: 0 0.23rem;
  }
</style>