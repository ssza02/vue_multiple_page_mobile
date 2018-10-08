<template lang="html">
    <div v-if="communityList.length" class="comment-info">
        <h1 class="comment-tabs">
            <span class="comment-title" :class="{'active':rank == 'new'}" @click.stop.prevent="rankClassify($event)">最新回答</span>
            <span class="separate">|</span>
            <span class="comment-title" :class="{'active':rank == 'sorted'}" @click.stop.prevent="rankClassify($event)">正序排列</span>
        </h1>

        <div class="list">
            <ul>
                <li v-for="(item,index1) in communityList">
                    <div class="item">
                        <div class="img-col">
                            <a :href='"/community/myCenter.html?id=" + item.user.id'>
                                <img v-if="item.user" class="img-user" :src="item.user.headPortrait" />
                                <img v-if="item.user.verify == 'expert'" class="icon-vip" src="../assets/img/vip_expert.png"/>
                                <img v-if="item.user.verify == 'activer'" class="icon-vip" src="../assets/img/vip_activer.png"/>
                            </a>
                        </div>
                        <div class="text-col">
                            <h1 class="replyer" v-if="item.user"><a :href='"/community/myCenter.html?id=" + item.user.id'>{{item.user.nickName}}</a><span class="time">{{item.replyTime}}</span>
                                <span v-if="item.floor == 1" class="floor">沙发</span>
                                <span v-else class="floor">{{item.floor}}#</span>
                            </h1>
                            <p class="content-text" v-html="replay_br(item.content)"></p>
                            <p class="operation wrapper">
                      <span v-if='item.type == "issue"' class="operation-like">
                          <span v-if="item.likesStauts" class="click-praise" @click="likeReplyClick(item.id,index1)"><img class="icon-praise" src="../assets/img/praise_blue.png"/>{{item.likes}}</span>
                          <span v-else class="click-praise" @click="likeReplyClick(item.id,index1)"><img class="icon-praise" src="../assets/img/praise_glay.png"/>{{item.likes}}</span>
                      </span>

                      <span class="operation-item">
                      <span v-if="!item.myReply" @click="report(item.id)">举报</span>
                      <span @click.stop.prevent="common(item,index1,$event)">评论</span>
                      <span v-if="manager" @click.stop.prevent="deleteComment(item.id)">删除</span>
                      <!--<span>删除</span>-->
                      </span>
                            </p>
                            <div class="comment-comment" ref="commentComment">
                                <div class="list">
                                    <ul>
                                        <li v-for="(commentItem,index2) in item.communityComments">
                                            <div class="item">
                                                <span v-if="commentItem.user" class="name"><a :href='"/community/myCenter.html?id=" + commentItem.user.id'>{{commentItem.user.nickName}}：</a></span><span class="replyText" v-html="replay_br(commentItem.content)"></span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <!--<transition name="fade">-->
                                    <!--<div class="reply" v-if="item.status">-->
                                        <!--<input type="text" :placeholder='"回复" + item.user.nickName' ref="replyText"/>-->
                                        <!--<span class="btn-list">-->
                                        <!--&lt;!&ndash;<span @click="cancelComment(index1,$event)">取消</span>&ndash;&gt;-->
                                        <!--<span class="allright" @click="issueComment(index1)">发布</span>-->
                                        <!--</span>-->
                                    <!--</div>-->
                                <!--</transition>-->
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div v-if="readMore" class="read-more">
            <a href="javascript:;" @click.stop.prevent="getReplyList(rank,pageNum,$event)"><span class="btn-more">阅读更多</span></a>
        </div>
        <div v-else class="no-more">
            <a href="javascript:;"><span class="btn-more">亲，没有更多啦...</span></a>
        </div>

    </div>

</template>

<script>
  import Lib from "assets/js/Lib";
  import CReport from "components/cReport";
  import CReportReply from "components/cReportReply";
  export default {
      components: {CReportReply, CReport},
      props:['meiyi_user','articleId','type','replyPostText'],
      data(){
          return{
              commentTextarea : -1,
              userInfo:'',
              // rankNew:true,  //是否为倒序（最新回复排序）
              communityList:[],
              communityLength:'11', //回复列表楼层总数
              rank:'new',
              pageNum:1,
              readMore:true,
              reportStatus:false,     //举报弹出框状态
              btnReportStatus:false,  //是否点击举报按钮
              reportReplyId:'',  //举报该条回复的id
              reportInfo:'',
              reportStatus:false,
              manager:false,
              ajaxSuccess:true,
          }
      },
    watch:{
        // communityList(newVal,oldVal){
        //     this.$nextTick(()=>{
        //         this.scrollView.refresh();
        //     });
        // }

    },
    mounted(){

    },
    created(){
        this.getUserInfo();
        this.getReplyList('new',1);
        // this.$nextTick(()=>{
        //     this._initScroll();
        // });
    },
    methods:{
        replay_br(content){
            return  content.replace(/\n|\r\n/g,"<br/>");
        },
        likeReplyClick(replyId,index){
            if(this.ajaxSuccess){
                this.ajaxSuccess = false;
                Lib.M.ajax({
                    url:'/community/reply_likes',
                    type:'post',
                    async:false,
                    data: {
                        uid:this.meiyi_user.uid,
                        token:this.meiyi_user.token,
                        communityReplyId:replyId,
                    },
                    success:res=>{
                        console.log(res);
                        if(res.type == 'success'){
                            if(res.content == '点赞成功'){
                                // alert('点赞成功');
                                this.communityList[index].likesStauts = true;
                                this.communityList[index].likes++;
                            }
                            if(res.content == '取消点赞'){
                                // alert('取消点赞');
                                this.communityList[index].likesStauts = false;
                                this.communityList[index].likes--;
                            }
                        }
                        if(res.type == 'notLogin'){
                            location.href="/login/login.html";
                        }
                        this.ajaxSuccess = true;
                    }
                });
            }

        },
        checkPermission(){
            if(this.userInfo.manager){
                this.manager = true;
            }else{
                this.manager = false;
            }
        },
        getUserInfo:function(){
            Lib.M.ajax({
                url:'/user_info',
                type:'post',
                async:false,
                data: {
                    uid:this.meiyi_user.uid,
                    token:this.meiyi_user.token,
                },
                success:(res)=>{
                    if(res.type == 'success'){
                        this.userInfo=res.content.user;
                        this.checkPermission();
                    }
                }
            });
        },
        report:function(id){
            if(this.meiyi_user.uid==0||this.meiyi_user.token==0){
                localStorage.clear();
                location.href="/login/login.html";
            }else{
                console.log("report:"+id);
                this.reportStatus = true;
                this.reportReplyId = id;
                this.$emit('reportReplyId',this.reportReplyId);
            }
        },
        checkLogin(){
            if(this.meiyi_user.uid==0||this.meiyi_user.token==0){
                localStorage.clear();
                location.href="/login/login.html";
            }
        },
        checkPermission(){
            console.log('this.userInfo.manager:' + this.userInfo);
            if(this.userInfo.manager){
                this.manager = true;
            }else{
                this.manager = false;
            }
        },
        common:function (item,index1,e) {
            // alert("offsetTop: " + e.currentTarget.offsetTop);
            // let scrollTop = e.currentTarget.offsetTop;
            //
            // setTimeout(function(){
            //     // Chrome
            //     document.body.scrollTop = scrollTop
            //     // Firefox
            //     document.documentElement.scrollTop = scrollTop
            //     // Safari
            //     window.pageYOffset = scrollTop
            // },500);
            if (!e._constructed) {
                return;
            }
            this.checkLogin();
            Lib.M.ajax({
                url:'/info_status',
                type:'post',
                async:true,
                data: {
                    uid:this.meiyi_user.uid,
                    token:this.meiyi_user.token,
                },
                success:res=>{
                    if(res.type=='success'){
                        let type = this.type;
                        let communityReplyId = this.communityList[index1].id;
                        let communityArticleId = this.articleId
                        this.$emit('emitReport',[communityReplyId,index1]);
                    }else{
                        if(res.content == '请完善个人资料'){
                            alert('完善个人信息后才能提交回复/评论');
                            location.href = '/login/completeInfos.html';
                        }
                    }
                    this.$nextTick(()=>{
                        this.scrollView.refresh();
                    });
                }
            })

            // this.communityList[index1].status = true;
        },
        deleteComment:function (id) {
            if(confirm("确定删除吗?")){
                Lib.M.ajax({
                    url:'/community/delete_reply',
                    type:'post',
                    async:false,
                    data: {
                        uid:this.meiyi_user.uid,
                        token:this.meiyi_user.token,
                        communityReplyId:id,
                    },
                    success:res=>{
                        if(res.type == 'success'){
                            location.reload();
                        }
                    }
                });
            }
        },
        //取消评论
        cancelComment:function (index1,e) {
            if (!e._constructed) {
                return;
            }
            this.communityList[index1].status = false;
        },
        // 回复评论
        issueComment:function (index1) {
            console.log('回复评论'+this.replyPostText);
                let myName = this.userInfo.nickName;
                // let replyText = this.$refs.replyText[0].value;
                let replyText = this.replyPostText;
                let objComment = {};
                objComment.user = {};
                objComment.user.nickName = myName;
                objComment.content = replyText;
                let communityReplyId = this.communityList[index1].id;  //回复该条评论的id
                console.log('objComment:'+objComment);
                this.communityList[index1].communityComments.push(objComment);
                // this.$refs.replyText[0].value = '';
                this.$emit('cancelFocus');
                this.$nextTick(()=>{
                    this.scrollView.refresh();
                });

                // if(replyText.length){
                //     Lib.M.ajax({
                //         url:'/community/add_comment',
                //         type:'post',
                //         data: {
                //             uid:this.meiyi_user.uid,
                //             token:this.meiyi_user.token,
                //             type:this.type,
                //             communityReplyId:communityReplyId,
                //             communityArticleId:this.articleId,
                //             content:replyText,
                //         },
                //         success:res=>{
                //             // this.communityList[index1].status = false;
                //         }
                //     });
                // }else{
                //     alert('评论不能为空');
                // }


        },
        rankClassify:function (e) {
            if (!e._constructed) {
                return;
            }
            if(this.rank == 'new'){
                if(e.target.innerText == '正序排列'){
                    console.log('this.rank:'+this.rank)
                    this.readMore = true;
                    this.rank = 'sorted';
                    this.getReplyList(this.rank,1);
                }
            }
            if(this.rank == 'sorted'){
                if(e.target.innerText == '最新回答'){
                    console.log('this.rank:'+this.rank)
                    this.readMore = true;
                    this.rank = 'new';
                    this.getReplyList(this.rank,1);
                }
            }
        },
        getReplyList:function(rank,page){
            if(this.type == 'post'){
                Lib.M.ajax({
                    url:'/community/sort_reply',
                    type: 'post',
                    async:false,
                    data: {
                        sorted:rank,
                        communityArticleId:this.articleId,
                        type:'post',
                        page:page,
                        limit:10,
                    },
                    success:res=>{
                        // console.log('sort_reply:'+JSON.stringify(res.content))
                        if(res.content.length < 10 ){
                            this.readMore = false;
                        }
                        if(page == 1){
                            this.communityList = res.content;
                        }else{
                            this.communityList = this.communityList.concat(res.content) ;
                        }
                        // console.log('this.communityList.length:'+this.communityList.length);
                        //沙发，3楼，4楼...
                        if(rank == 'new'){
                            if(this.communityList.length==0){
                                this.communityLength = 2;
                                this.$parent.communityLength = 2;
                            }else{
                                this.communityLength = this.communityList[0].floor + 1;
                                this.$parent.communityLength = this.communityList[0].floor + 1;
                                console.log('this.communityLength:'+this.communityLength)
                            }
                        }else if(rank == 'sorted'){
                            if(this.communityList.length==0){
                                this.communityLength = 2;
                                this.$parent.communityLength = 2;
                            }else{
                                this.communityLength = this.communityList[this.communityList.length-1].floor + 1;
                                this.$parent.communityLength = this.communityList[this.communityList.length-1].floor + 1;
                                console.log('this.communityLength:'+this.communityLength)
                            }
                        }
                        this.communityList.map((ele,index)=>{
                            this.$set(ele,'status', false);
                            //判断进入的是否为自己的个人中心
                            if(ele.user.id == this.meiyi_user.uid){
                                this.$set(ele,'myReply', true);
                            }
                        });
                        this.pageNum = page + 1;
                        this.$nextTick(()=>{
                            this.$parent.scrollView.refresh();
                        });
                    }
                });
            }else{
                Lib.M.ajax({
                    url:'/community/sort_reply',
                    type: 'post',
                    async:false,
                    data: {
                        sorted:rank,
                        communityArticleId:this.articleId,
                        type:'issue',
                        page:page,
                        limit:10,
                    },
                    success:res=>{
                        // console.log('sort_reply:'+JSON.stringify(res.content))
                        if(res.content.length < 10 ){
                            this.readMore = false;
                        }
                        if(page == 1){
                            this.communityList = res.content;
                        }else{
                            this.communityList = this.communityList.concat(res.content) ;
                        }
                        if(rank == 'new'){
                            if(this.communityList.length==0){
                                this.communityLength = 2;
                                this.$parent.communityLength = 2;
                            }else{
                                this.communityLength = this.communityList[0].floor + 1;
                                this.$parent.communityLength = this.communityList[0].floor + 1;
                                console.log('this.communityLength:'+this.communityLength)
                            }
                        }else if(rank == 'sorted'){
                            if(this.communityList.length==0){
                                this.communityLength = 2;
                                this.$parent.communityLength = 2;
                            }else{
                                this.communityLength = this.communityList[this.communityList.length-1].floor + 1;
                                this.$parent.communityLength = this.communityList[this.communityList.length-1].floor + 1;
                                console.log('this.communityLength:'+this.communityLength)
                            }
                        }
                        this.communityList.map((ele,index)=>{
                            this.$set(ele,'status', false);
                            //判断进入的是否为自己的个人中心
                            if(ele.user.id == this.meiyi_user.uid){
                                this.$set(ele,'myReply', true);
                            }
                            Lib.M.ajax({
                                url:'/community/rlike_status',
                                type:'post',
                                async:false,
                                data: {
                                    uid:this.meiyi_user.uid,
                                    communityReplyId:ele.id,
                                },
                                success:res=>{
                                    if(res.content == '未点赞'){
                                        this.$set(ele,'likesStauts', false);
                                    }
                                    if(res.content == '已点赞'){
                                        this.$set(ele,'likesStauts', true);
                                    }
                                }
                            });
                        });
                        this.pageNum = page + 1;
                        this.$nextTick(()=>{
                            this.$parent.scrollView.refresh();
                        });
                    }
                });
            }

        },

        linkToCenter:function (id) {
            location.href = '/community/myCenter.html?id=' + id;
        },
        // deleteComment:function (id) {
        //     Lib.M.ajax({
        //         url:'/community/delete_reply',
        //         type:'post',
        //         async:false,
        //         data: {
        //             uid:this.meiyi_user.uid,
        //             token:this.meiyi_user.token,
        //             communityReplyId:id,
        //         },
        //         success:res=>{
        //             location.reload();
        //         }
        //     });
        // },
        selectItem(index){
            this.chooseData.map((ele,index)=>{
                ele.status = false;
            });
            this.chooseData[index].status = true;
            this.reportInfo =  this.chooseData[index].title;
        },
        _initScroll:function () {
            var _this=this;
            this.scrollView = new Lib.BScroll(this.$refs.scroll_box, {
                click: true,
                probeType: 3,
                deceleration: 0.003,
                bounce: false,
                swipeTime:1500,
            });
            this.scrollView.refresh();
            this.scrollView.on('scroll',function(pos){
                // let wHeight=document.querySelector(".html_box").offsetHeight;
                if(pos.y<=this.maxScrollY+150&&_this.layzLoadStatus){
                    _this.layzLoadStatus=false;
                }
            });
        },
    }
  }
  
</script>

<style lang="less" scoped>
    @import "../assets/css/m_base.less";
    @import "../assets/css/mixin.less";
    .comment-info{
        padding: 0 0.3rem 0.3rem;
        background: #fff;
        margin-bottom: 0.2rem;
        h1{
            position: relative;
            height: 1rem;
            line-height: 0.5rem;
            span{
                font-size: 0.28rem;
            }
            .separate{
                color: #EAEAEA;
            }
            .comment-title{
                color: #999;
            }
            .comment-title.active{
                color: #62BFFF;
                font-size: 0.32rem;
            }

        }
        h1.comment-tabs{
            padding-left: 0.2rem;
        }
        h1.replyer a{
            font-size:0.3rem;
            color:#1a1a1a;
            padding: 0;
        }
        .list{
            ul li{
                border-bottom: 1px solid #EFEFF3;
                .item{
                    display: flex;
                    padding: 0.1rem 0.2rem 0;
                    .img-col{
                        position: relative;
                        flex:0 0 1rem;
                        img.img-user{
                            width:0.68rem;
                            height:0.68rem;
                            border-radius:50px;
                        }
                        img.icon-vip{
                            position: absolute;
                            width: 0.3rem;
                            height: 0.3rem;
                            top: 0.6rem;
                            left: 0.4rem;
                        }
                    }
                    .text-col{
                        flex:1 0 0;
                        .time{
                            margin-left: 0.2rem;
                            color:#999999;
                            font-weight: normal;
                        }
                        .time:before{
                            position: relative;
                            content: '|';
                            top:-0.02rem;
                            color: #999999;
                            margin-right: 0.1rem;
                        }
                        .floor{
                            /*float: right;*/
                            position: absolute;
                            right: 0;
                            top: 0.26rem;
                            font-weight: normal;
                            color: #999;
                        }
                        p.content-text{
                            line-height: 0.5rem;
                            font-size: 0.3rem;
                            margin-bottom: 0.2rem;
                            color: #444;
                            word-wrap:break-word;
                            word-break:break-all;
                        }
                        p.operation{
                            overflow: hidden;
                            margin-bottom: 0.2rem;
                            color: #999999;
                            .operation-like{
                                span{
                                    font-size: 0.26rem;
                                    float: left;
                                }
                                span.click-praise{
                                    display: inline-block;
                                    width: 3rem;
                                    /*height: 0.6rem;*/
                                    font-size: 0.3rem;
                                    img.icon-praise{
                                        margin-right: 0.2rem;
                                        width: 0.26rem;

                                    }
                                }
                            }
                            .operation-item{
                                font-size: 0.26rem;
                                float: right;
                                span{
                                    margin-left: 0.1rem;
                                }

                            }
                        }
                    }
                }
            }
            ul li:last-child{
                border-bottom: 0;
            }
        }
        .read-more{
            height:0.8rem;
            line-height: 0.8rem;
            text-align: center;
            font-size:0.28rem;
            color: #999;
            background: #fff;
        }
        .no-more{
            height:0.8rem;
            line-height: 0.8rem;
            text-align: center;
            font-size:0.28rem;
            color: #999;
        }
    }
    .comment-comment{
        background: #EFEFF3;
        border-radius: 4px;
        /*padding: 0.2rem;*/
        margin-bottom: 0.2rem;
        .list{
            ul li{
                line-height: 0.5rem;
                .item{
                    span{
                        font-size:0.3rem;
                    }
                    span.name a{
                        color: #4FADEF;
                    }
                    span.replyText{
                        color: #444;
                        /*max-height: 1.5rem;*/
                        word-wrap:break-word;
                        word-break:break-all;
                    }
                }
            }
        }
        .reply{
            overflow: hidden;
            padding: 0.2rem;
            input{
                display: block;
                width: 100%;
                height: 1rem;
                border:0;
                text-indent: 5px;
                border-radius: 4px;
            }
            .btn-list{
                float: right;
                font-size: 0.2rem;
                margin-top:0.2rem;
                overflow: hidden;
                span{
                    display: inline-block;
                    padding: 0.2rem;
                    text-align: center;
                }
                span.allright{
                    background: #4FADEF;
                    color: #fff;
                    border-radius: 4px;
                }
            }
        }
    }
</style>
