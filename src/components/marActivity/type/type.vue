<template lang="html">
  <div class="type_warp" v-if="detail.cashCouponUser">
    <div class="type_title">{{detail.mySelf?'恭喜获得':'帮我的红包提个额呗'}}</div>
    <div class="cash_warp">
      <div class="cash">
        <div class="left">
          <p>{{detail.cashCouponUser.category}}</p>
          <p>代金券</p>
        </div>
        <div class="right">{{detail.cashCouponUser.voucherAmount}}元</div>
      </div>
      <p>有效期至：{{detail.cashCouponUser.expiredDate}}</p>
    </div>
    <div class="btn_warp" v-if="detail.mySelf">
      <input type="button" value="邀请好友帮我提额" class="btn white_btn" @click="share=true" >
      <input type="button" value="马上使用" class="btn blue_btn" @click="goto('/use')">
    </div>
    <div class="btn_warp" v-else>
      <input type="button" value="帮Ta提额" class="btn white_btn" @click="upCashFn" v-if="!detail.already">
      <p class="tips" v-else-if="detail.top">Ta的红包已经封顶了</p>
      <p class="tips" v-else>您已成功帮Ta提额</p>
      <input type="button" value="我也要抢红包" class="btn blue_btn" @click="goto('/')">
    </div>
    <div class="firend_warp" v-if="detail.cashCouponUser.promoteFriends.length">
      <ul class="firend_list">
        <li class="firend_header">给力好友</li>
        <li class="firend_item" v-for="item in detail.cashCouponUser.promoteFriends">
          <div class="avatar">
            <img :src="item.avatar" alt="用户头像">
          </div>
          <div class="detail">
            <p class="name">{{item.nickName}}</p>
            <p class="date">{{item.createDate}}</p>
            <span class="num">+{{item.amount}}</span>
          </div>
        </li>
      </ul> 
    </div>
    <div class="shadow" v-show="share" @click="share=!share">
      <div class="content share" >
        <div class="share_content">
          <p>点击右上角【...】</p>
          <p>选择【发送给朋友】或【分享到朋友圈】</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from "assets/js/Lib";
  export default {
    data(){
      return {
        wxUser: localStorage.userInfo?JSON.parse(localStorage.userInfo):'',
        type:this.$route.params.type,
        detail:{
          mySelf:true,
          cashCouponUser:null,
        },
        share:false,
      };
    },
    created(){
      this.getDetail();
      Lib.WX.is_weixin('我在抢“加拿大约惠”代金券，帮我提个额吧！','与加拿大约惠三月，办加拿大移民最高减10000元！',`https://m.meiyi.ai/author.html?id=${this.$route.params.id}`,this.wxUser.avatar);
    },
    methods:{
      goto(url){
        this.$router.push({path:url});
      },
      upCashFn(){
        Lib.M.ajax({
          url:'/up_cash',
          type:'post',
          data:{
            openId:this.wxUser.openId,
            infoJson:JSON.stringify(this.wxUser),
            id:this.$route.params.id,
          },
          success:res=>{
            if(res.type=='success'){
              this.detail=JSON.parse(res.content);
              this.getDetail();
            }else{
              alert(res.content);
            }
          }
        });
      },
      getDetail(){
        Lib.M.ajax({
          url:'/cash_coupon_detail',
          type:'post',
          data:{
            openId:this.wxUser.openId,
            id:this.$route.params.id,
            //openId:'oksChwG01MPaBEkZLcM5zsVM4iy4',
            //openId:'oksChwBN0JlgU_ASyBbsrFEQDzAc',
            //id:1,
          },
          success:res=>{
            console.log(res);
            if(res.type=='success'){
              this.detail=JSON.parse(res.content);
            }else{
              console.log(res.content);
            }
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .type_warp{
    padding: 0 0.48rem;
    .type_title{
      font-size: 18px;
      color:#fff;
      text-align: center;
    }
    .firend_warp{
      margin-top: 0.5rem;
      .firend_list{
        width: 5.74rem;
        margin: 0 auto;
        .firend_header{
          position: relative;
          font-size: 12px;
          color:#fff;
          text-align: center;
          &::after{
            content: "";
            position: absolute;
            width: 1.8rem;
            border-top:1px solid #fff;
            left: 0;
            top: 6px;
          }
          &::before{
            content: "";
            position: absolute;
            width: 1.8rem;
            border-top:1px solid #fff;
            right: 0;
            top: 6px;
          }
        }
        .firend_item{
          height: 1.2rem;
          padding-top: 0.28rem;
          box-sizing: border-box;
          display: -webkit-flex;
          display: flex;
          .avatar{
            font-size: 0;
            -webkit-flex: 0 0 0.86rem;
            flex: 0 0 0.86rem;
            img{
              width: 0.7rem;
              height: 0.7rem;
            }
          }
          .detail{
            -webkit-flex:1;
            flex:1;
            font-size: 12px;
            color:#F8E11E;
            position: relative;
            .date{
              font-size: 10px;
              color:#fff;
              margin-top: 0.2rem;
            }
            .num{
              position: absolute;
              width: 0.5rem;
              right: 0.4rem;
              bottom:0.4rem;
            }
          }
          &:not(:last-child){
            border-bottom: 1px dashed #fff;
          }
        }
      }
    }
    .btn_warp{
      margin-top: 0.4rem;
      font-size: 0;
      .tips{
        text-align: center;
        font-size: 16px;
        color:#fff;
        margin: 0.3rem 0;
      }
      .btn{
        text-align: center;
        width: 4.32rem;
        height: 0.86rem;
        font-size: 18px;
        border-radius: 2px;
        line-height: 0.86rem;
        display: block;
        margin: 0 auto;
        box-sizing: border-box;
      }
      .white_btn{
        background: none;
        border: 1px solid #FFF;
        color:#fff;
        margin-bottom: 0.2rem;
      }
      .blue_btn{
        background: #3090E9;
      }
    }
    .cash_warp{
      margin-top: 0.16rem;
      background:rgba(205,86,58,0.69);
      border-radius: 2px;
      padding-top: 0.2rem;
      height: 2.6rem;
      box-sizing: border-box;
      .cash{
        width: 4rem;
        height: 1.72rem;
        background: #FFF;
        position: relative;
        box-sizing: border-box;
        padding: 0.3rem 0;
        margin: 0 auto;
        display: -webkit-flex;
        display: flex;
        text-align: center;
        color:#000;
        .left{
          -webkit-flex: 1;
          flex: 1;
          border-right: 1px dashed #5A5A5A; 
          height: 100%;
          p{
            font-size: 14px;
          }
        }
        .right{
          -webkit-flex: 1;
          flex: 1;
          font-size: 24px;
          height: 100%;
          box-sizing: border-box;
          padding-top: 0.3rem;
        }
        &:after{
          content: '';
          position: absolute;
          height: 100%;
          background: url(./images/left.png)no-repeat;
          background-size: auto 100%;
          top: 0;
          left: -0.14rem;
          width: 0.14rem;
        }
        &:before{
          content: '';
          position: absolute;
          height: 100%;
          background: url(./images/right.png)no-repeat;
          background-size: auto 100%;
          top: 0;
          right: -0.14rem;
          width: 0.14rem;
        }
      }
      p{
        margin-top: 0.2rem;
        font-size: 12px;
        text-align: center;
        color:#000;
      }
    }
  }
  .shadow{
    background: rgba(0,0,0,0.9);
  }
  .content{
    font-size: 18px;
    border: 1px solid #FFF;
    color:#fff;
    width: 97%;
    margin: 0 auto;
  }
  .share{
    text-align: center;
    padding: 0.3rem;
    box-sizing: border-box;
    margin-top: 1.6rem;
    position: relative;
    &:after{
      content:"";
      position: absolute;
      top: -1rem;
      right: 0.3rem;
      width: 1.24rem;
      height: 0.56rem;
      background:url(./images/share.png) no-repeat;
      background-size: 100% 100%;
    }
    .share_content{
      font-size: 18px;
      line-height: 23px;
    }
  }
</style>
