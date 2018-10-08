<template lang="html">
  <div class="card_bar" ref="scroll_box">
    <div class="swiper-container-card">
      <div class="swiper-wrapper">
        <div class="swiper-slide card_slide" v-for="item in experts" @click="goExpert(item.uid)">
          <div class="exper_cadr_bar">
            <div class="expert_logo" :style="{backgroundImage: 'url(' + item.headUrl + ')'}"></div>
            <span class="exper_name text-overflow">{{ item.nickName }}</span>
            <p class="expert_Briefly">{{ item.description }}</p>
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
                location.href="/community/myCenter.html?id="+eId;
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
      flex:0 0 2.6rem;
      width: 2.6rem;
      margin:0 8px;
    }
    .swiper-container-card{
      display: inline-block;
      padding-left: 0.3rem;
      .exper_cadr_bar{
        line-height: 16px;
        font-size: 12px;
        color:#808080;
        text-align: center;
        box-shadow:0 0 1px 1px rgba(4,0,0,0.08);
        border-radius: 4px;
        overflow: hidden;
        .exper_name{
          display: block;
          height: 0.6rem;
          font-size: 0.3rem;
          line-height: 0.6rem;
          color: #000;
        }
        .expert_Briefly{
          margin-bottom: 0.1rem;
          height: 0.68rem;
          overflow: hidden;
        }
        .expert_logo{
          width: 2.6rem;
          height: 2.6rem;
          background-size: 2.6rem 2.7rem;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
  }
</style>
