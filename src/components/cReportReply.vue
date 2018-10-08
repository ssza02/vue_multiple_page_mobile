<!--举报回复-->
<template lang="html">
  <div class="select-wrapper" >
    <div class="bg-box" @click.stop="closeReport()"></div>
    <div class="report-box" v-if="submitReport">
      <div class="btn-close" @click="closeReport()"><i class="icon-wrong"></i></div>
      <h1 class="report-title">
        {{reportTitle}}
      </h1>
      <div class="btn-foot" >
        <input type="button" value="确定" class="btn-report" @click="closeReport()"/>
      </div>
    </div>
    <div class="report-box" v-else>
      <div class="btn-close" @click="closeReport()"><i class="icon-wrong"></i></div>
      <h1 class="report-title">
        举报
      </h1>
      <div class="report-list" ref="reportList">
        <ul>
          <li v-for="(item,index) in chooseData" @click="selectItem(index)">
            <div class="item"><span>{{item.name}}</span><span class="checked"><img v-if="item.status"  src="../assets/img/choose_right.png"/></span></div>
          </li>
        </ul>
      </div>
      <div class="btn-foot" >
        <input type="button" value="确定" class="btn-report" @click="sendReport(reportInfo,type)"/>
      </div>
    </div>
    <!--<select class="selectReport">-->
      <!--<option value="人身攻击、骚扰">人身攻击、骚扰</option>-->
      <!--<option value="垃圾广告信息">垃圾广告信息</option>-->
      <!--<option value="违法违规">违法违规</option>-->
      <!--<option value="政治敏感">政治敏感</option>-->
      <!--<option value="影响阅读">影响阅读</option>-->
      <!--<option value="抄袭或侵权">抄袭或侵权</option>-->
    <!--</select>-->
  </div>
</template>

<script>
  import Lib from "assets/js/Lib";
  export default {
    props:['type','reportReplyItem'],
    data(){
        return{
            meiyi_user:'',
            messageStatus:false,
            submitReport:false,
            reportTitle:'',
            chooseData:[
                {
                    title:'assault_harassment',
                    name:'人身攻击、骚扰',
                    status:true
                },
                {
                    title:'spam_message',
                    name:'垃圾广告信息',
                    status:false
                },
                {
                    title:'violation_regulations',
                    name:'违法违规',
                    status:false
                },
                {
                    title:'politically_sensitive',
                    name:'政治敏感',
                    status:false
                },
                {
                    title:'effect_read',
                    name:'影响阅读',
                    status:false
                },
                {
                    title:'infringement_plagiarism',
                    name:'抄袭或侵权',
                    status:false
                }
            ],
            reportInfo:'',
            localUrl:location.href,
        }
    },
    created(){
        this.meiyi_user = Lib.M.isLogin();
        this.selectItem(0); //默认选中举报第一个
    },
    methods:{
        selectItem(index){
            this.chooseData.map((ele,index)=>{
                ele.status = false;
            });
            this.chooseData[index].status = true;
            this.reportInfo =  this.chooseData[index].title;
        },
        //发送举报
        sendReport:function (reportInfo,type) {
            console.log("reportReplyItem:"+this.reportReplyItem);
            Lib.M.ajax({
                url:'/community/report_reply',
                type:'post',
                data: {
                    uid:this.meiyi_user.uid,
                    token:this.meiyi_user.token,
                    type:type,
                    communityReplyId:this.reportReplyItem,
                    communityReportLink:this.localUrl,
                    report:reportInfo
                },
                success:res=>{
                    // alert(res.content);
                    this.reportTitle = res.content;
                    this.submitReport = true;
                }
            });
        },
        closeReport:function () {
            this.$parent.reportStatus2 = false;
            this.submitReport = false;
        }
    }
  }
</script>

<style lang="less" scoped>
  .select-wrapper{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 101;
  }
  .bg-box{
    position: absolute;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
    z-index: 999;
  }
  .report-box{
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    width:80%;
    overflow: hidden;
    padding: 0.4rem 0;
    background: #fff;
    border-radius: 4px;
    transform: translate(-50%, -50%);
    z-index: 9999;
    .btn-close{
      position: absolute;
      top:-0.16rem;
      right: 0.3rem;
      i{
        font-size: 16px;
      }
    }
    .report-title{
      font-size: 20px;
      text-align: center;
    }
    .report-list{
      padding: 0.1rem 0.2rem;
      /*margin-top:50px;*/
      ul li{
        border-bottom: 1px solid #EAEAEA;
        .item{
          position: relative;
          font-size: 16px;
          padding: 0.3rem 0;
          .message-title{
            display: inline-block;
            width: 100px;
            text-align: left;
          }
          .btn-checkbox{
            width: 15px;
            height: 15px;
          }
          .checked{
            position: absolute;
            right: 0.1rem;
            top:0.3rem;
          }
          .message-select{
            position: relative;
            top: -4px;
            float: right;
            select{
              width: 139px;
              font-size: 16px;
              text-indent: 10px;
              border-radius: 5px;
            }
          }
        }
        .item-delete{
          cursor: pointer;
        }
        .item-delete:hover{
          color: #3a8ceb;
        }
      }
      ul li:last-child{
        border-bottom: 0px;
      }
    }
    .btn-foot{
      text-align: center;
      .btn-report{
        width:80%;
        height:40px;
        /*margin: 50px 0 30px 0;*/
        border:0;
        border-radius: 4px;
        background: #62BFFF;
        font-size: 16px;
        color: #fff;
      }
    }
  }
</style>
