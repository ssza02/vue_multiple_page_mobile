<template>
  <div id="app">
    <div class="top_title_box">
      <span class="icon-return top_back"></span>
      <h1 class="top_title">完善个人信息</h1>
    </div>
    <div class="html_box" ref="scroll_box">
      <div class="cell-dynamic-wrapper wrapper">
        <div class="cell-dynamic">
          <ul>
            <li>
              <!--<div class="cell" @click="headEdit()" style="line-height: 1.2rem">-->
              <div class="cell" style="line-height: 1.2rem">
                <span>头像</span><span class="num"><a href="javascript:;"><img src="https://oss.meiyi.ai/upload/image/201807/9da2701f-2090-4647-988e-33728133cf6b.png"/></a></span>
              </div>
            </li>
            <li>
              <div class="cell">
                <span>昵称</span><span class="num"><input type="text" class="input-name" placeholder="请输入4-12个字符的昵称" v-model="nickName"/></span>
              </div>
            </li>
            <li>
            <div class="cell" @click="sexItemSelect()">
              <span>性别</span><span class="num"><a href="javascript:;">{{sex}}</a><i class="icon-go-ahead"></i></span>
            </div>
            </li>
            <li>
              <!--<div class="cell" @click="authorFans()">-->
              <div class="cell" @click="linkToLocation()">
                <span>所在地</span><span class="num"><a href="javascript:;">
                  {{arrLocation.toString()}}
              </a><i class="icon-go-ahead"></i></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="cell-dynamic-wrapper wrapper">
        <div class="cell-dynamic">
          <ul>
            <li>
              <div class="cell" @click="linkToImmigrantState()">
                <span>移民状态</span><span class="num"><a href="javascript:;">{{myStatus}}&nbsp;&nbsp;{{informationCountry}}</a><i class="icon-go-ahead"></i></span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--<div class="logout" @click="logout()">-->
        <!--退出当前用户-->
      <!--</div>-->
    </div>
    <div class="foot-wrapper">
      <div class="btn-submit">
        <input type="button" value="确定" @click="sumbitFn()"/>
      </div>
    </div>
    <transition name="fade">
    <div class="sex-mask" v-if="sexMask">
      <div class="set-sex">
        <div class="item " ref="male" @click="sexSelect($event)">男</div>
        <div class="item  wrapper" ref="female" @click="sexSelect($event)">女</div>
        <div class="item cancel" @click="cancel()">取消</div>
      </div>
    </div>
    </transition>

    <transition name="fade">
      <div class="head-mask" v-if="headMask">
        <div class="set-head">
          <div class="item" @click="photograph()">拍照</div>
          <div class="item wrapper" @click="selectPhoto()">从手机相册中选择</div>
          <div class="item cancel" @click="cancel()">取消</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import logo from 'assets/img/logo.png'
  //import modal from 'components/modal.vue'
  import Lib from "assets/js/Lib";
  export default {
    components: {
      //modal
    },
    mounted() {
      Lib.M.baseDomFn();
    },
    watch:{
        nickName(newVal,oldVal){
            if(newVal){
                sessionStorage.setItem('nickName', newVal);
            }
        }
    },
    data () {
      return {
        logoImg: logo,
        meiyi_user:'',
        sexMask : false,
        headMask:false,
        headImgUrl:'https://oss.meiyi.ai/upload/image/201807/9da2701f-2090-4647-988e-33728133cf6b.png',
        nickName:'',
        sex : '男',
        gender:'man',
        userInfo:'',
        myLocation:[],
        arrLocation:[],
        myStatus:'',
        informationCountry:'',
        informationStatus:'',
        myInformationCountry:''
      }
    },
    created () {
      Lib.WX.is_weixin();
      Lib.M.baseFn();
      // this.id = Lib.M.getUrlQuery('id');
      this.meiyi_user = Lib.M.isLogin();
      this.nickName = sessionStorage.getItem('nickName');
      // this.getUserInfo(this.id);
      // 所在地
      this.location = sessionStorage.getItem('location');
      this.myLocation = JSON.parse(this.location);
      // 移民状态
      this.informationStatus = sessionStorage.getItem('informationStatus');
      // 移民国家
      this.informationCountry = sessionStorage.getItem('informationCountry');

      this.myLocation.map((v,k)=>{
          this.arrLocation.push(v.name);
      });
      console.log('myLocation：'+ this.myLocation);

      if(this.informationStatus == 'want'){
         this.myStatus =  '想移民';
      }
        if(this.informationStatus == 'already'){
            this.myStatus =  '已移民';
        }
        if(this.informationStatus == 'notConsider'){
            this.myStatus =  '暂不移民';
        }
    },
    methods: {
        headEdit:function () {
            this.headMask = true;
        },
        linkToInformation:function () {
            window.location.href="/user/nickname.html"
        },
        linkToLocation:function(){
            window.location.href="/community/locations2.html"
        },
        linkToImmigrantState:function () {
            window.location.href="/community/completeImmigrantState.html"
        },
        linkToAttestation:function () {
            window.location.href="/community/attestation.html"
        },
        linkToAccountLogin:function () {
            window.location.href="/user/phone.html"
        },
        authorFocus:function(){
            window.location.href="/user/password.html"
        },
        // getUserInfo(uid){
        //     Lib.M.ajax({
        //         url:'/community/person_center',
        //         type:'post',
        //         data: {
        //             uid:uid
        //         },
        //         success:res=>{
        //             this.userInfo = res;
        //             if(this.userInfo.destinationCountry){
        //                 this.destinationCountry = this.userInfo.destinationCountry.toString();
        //             }
        //             if(this.userInfo.gender == 'man'){
        //                 this.sex = '男'
        //             }else{
        //                 this.sex = '女'
        //             }
        //
        //         }
        //     });
        // },

        sexItemSelect:function () {
            this.sexMask = true;
        },
        sexSelect:function (e) {
            this.sex = e.target.innerText;
            if(this.sex == '男'){
                this.gender = 'man';
            }
            if(this.sex == '女'){
                this.gender = 'female';
            }

            this.sexMask = false;
            // const formData = new FormData();
            // formData.append("uid", this.meiyi_user.uid);
            // formData.append("token", this.meiyi_user.token);
            // formData.append("gender", this.gender);
            // Lib.M.ajax({
            //     headers: { "Content-Type": "multipart/form-data" },
            //     url: "/revamp_info",
            //     type: "post",
            //     data2: formData,
            //     success: res => {
            //         // alert(res.content);
            //         if (res.type == "success") {
            //             // location.reload();
            //         }
            //     }
            // });
        },
        photograph:function () {
            
        },
        selectPhoto:function () {
            
        },
        cancel:function () {
            this.sexMask = false;
            this.headMask = false;
        },
        sumbitFn() {
            if (!this.nickName) {
                alert("昵称不可为空");
                return;
            }else if(!this.location){
                alert("所在地不可为空");
                return;
            }
            const formData = new FormData();
                formData.append("avatar", this.headImgUrl);
                formData.append("uid", this.meiyi_user.uid);
                formData.append("token", this.meiyi_user.token);
                formData.append("nickName", this.nickName);
                formData.append("gender", this.gender);
                formData.append("country", this.myLocation[0].name);
                if(this.myLocation[1]){
                    formData.append("province", this.myLocation[1].name);
                }else{
                    formData.append("province", '');
                }
                if(this.myLocation[2]){
                    formData.append("city", this.myLocation[2].name);
                }else{
                    formData.append("city", '');
                }
                formData.append("immigrationStatus", this.informationStatus);
                formData.append("destinationCountry", this.informationCountry);
                // if(this.information.status == 'notConsider'){
                //     // alert('暂不移民');
                //     formData.append("destinationCountry", "");
                // }else{
                //     formData.append("destinationCountry", this.sumbitCountry);
                // }

                Lib.M.ajax({
                    headers: { "Content-Type": "multipart/form-data" },
                    url: "/complete_info",
                    type: "post",
                    data2: formData,
                    success: res => {
                        console.log(res.content);
                        if (res.type == "success") {
                            location.href = "/";
                            // window.history.go(-1);
                        }
                    }
                });
        },
    }
  }
</script>

<style lang="less">
@import "../../../assets/css/m_base.less";
.wrapper{
  margin-bottom: 0.2rem;
}
.top_title_box{
  position: absolute;
  top:0;
  width:100%;
  z-index: 100;
  padding:0;
  background: #ffffff;
  .top_title{
    color:#1A1A1A;
  }
  .top_back {
    position: absolute;
    display: inline-block;
    top: 0rem;
    left: 0rem;
    width: 1rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.4rem;
    color: #999;
  }
}

.html_box{
  position: absolute;
  top: 0.88rem;
  bottom: 1rem;
  overflow-y: auto;
}

.foot-wrapper{
  z-index: 9;
  position: fixed;
  bottom: 0rem;
  width: 100%;
  height: 1rem;
  background: #fff;

  .btn-submit{
    padding: 0.1rem 0.4rem;
    input{
      display: block;
      width: 100%;
      padding: 0.2rem;
      color: #fff;
      background: #2399eb;
      border: 0;
      border-radius: 4px;
      outline: none;
    }
  }
}

.cell-dynamic-wrapper{
  .cell-dynamic{
    ul li{
      .cell{
        font-size: 0.3rem;
        padding: 0.3rem 0.5rem;
        background: #ffffff;
        border-bottom: 0.01rem solid #F0F0F3;
        overflow: hidden;
        .tips-label{
          position: relative;
          border-radius:30px;
          background: #E53C3C;
          color: #fff;
          padding: 0 0.1rem;
          font-size: 0.21rem;
          bottom:0.02rem;
          left: 0.2rem;
        }
        .num{
          font-size:0.28rem;
          float: right;
          a{
            color: #999999;
            margin-right:0.2rem;
            img{
              width:1.2rem;
              height:1.2rem;
              border-radius: 50px;
              vertical-align: middle;
            }
          }
          i{
            color: #2399EB;
          }
        }
      }
      .input-name{
        border: 0;
        text-align: right;
      }
    }
    ul li:last-child .cell{
      border-bottom: 0;
    }
  }
}
  .sex-mask,.head-mask{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 101;
    .set-sex,.set-head{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      .item{
        height: 0.95rem;
        line-height: 0.95rem;
        background: #fff;
        text-align: center;
        color: #4FADEF;
        font-size: 0.32rem;
      }
    }
  }

.logout{
  display: block;
  width: 84%;
  border: 1px solid #E93E53;
  margin:0 auto;
  color: #E93E53;
  height: 47px;
  line-height: 47px;
  text-align: center;
  font-size: 16px;
  margin-top: 22px;
}
</style>
