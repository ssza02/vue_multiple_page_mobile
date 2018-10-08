<template lang="html">
  <nav ref="scroll_box" :class="{'fixed':fixedStatus}">
    <div class="nav_card_bar">
        <div class="nav_bar">
          <div class="nav_item" v-for="(item,index) in navItem" :class="{'nav_active':navActive==item.id}" @click="navActiveFn(item.id,$event,index)" ref="navItem">
            <a href="javascript:;" class="nav_text" v-text="item.name"></a>
          </div>
        </div>
    </div>
  </nav>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name:'navcardbarObj',
    props:['navItem','navActive','fixedStatus','idName'],
    data (){
      return {
        navItemArr:null,
        navActiveChild:'',
        //navActiveIndex:'',
      }
    },
    created () {
      this.navItemArr=this.navItem;
      this.$nextTick(() => {
        this.navActiveChild=this.navActive;
        this._initScroll();
        let checkScroll=setInterval(()=>{
          this.Scroll.refresh();
          this.activeItemFocus()
          clearInterval(checkScroll);
        },500);
      });
    },
    computed:{
      activeIndex(){
        let activeItemIndex = this.navItem.findIndex((item)=>item.id==this.navActive);
        return activeItemIndex;
      }
    },
    updated(){
      this.activeItemFocus();
    },
    methods:{
      activeItemFocus(){//选中选项卡获取焦点
        this.Scroll.scrollToElement(this.$refs.navItem[this.activeIndex-2]||this.$refs.navItem[this.activeIndex-1]||this.$refs.navItem[this.activeIndex]);
      },
      navActiveFn:function (id,e,index) {
        sessionStorage.setItem(this.idName,id);
        this.navActiveChild=id;
        // alert(this.navActiveChild);
        this.$emit("listenNavActive",this.navActiveChild);
      },
      _initScroll:function () {
        this.Scroll = new BScroll(this.$refs.scroll_box, {
          click: true,
          scrollX:true,
          scrollY:false,
          bounce: false,
        });
      }
    }
  }
</script>

<style lang="less">
.nav_text{
  display: inline-block;
  //padding: 0 0.23rem;
}
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
  padding:0 0.2rem;
}
.nav_bar .nav_active a{
  font-size: 16px;
  color: #2399EB;
}
.nav_bar .nav_active a:before{
  content:" ";
  position: absolute;
  display: inline-block;
  width: 80%;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: #2399EB;
  transform: translate(-50%,-50%);
}
</style>
