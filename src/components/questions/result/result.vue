<template lang="html">
  <div class="questions_list">
    <div class="question_item">
      <div class="question_title">
        {{result.questionnaireAnswer.phone}}的个人情况
      </div>
      <ul class="result_list">
        <li class="result_item" v-for="(item,index) in result.questionnaireAnswer.questionnaireAnswerOptions">
          <div class="result" v-if="item.type=='CHECKBOX'">
            <div class="left">{{index+1}}.{{item.title}}：</div>
            <div class="right">
              <p v-for="(text,index) in item.checkboxOption" class="content">{{index+1}}.{{text}}</p>
            </div>
          </div>
          <div class="result" v-else-if="item.type=='LANGUAGE'">
            <p>{{index+1}}.{{item.title}}：<span class="content">{{'听：'+item.listen}}{{' 说：'+item.speak}}{{' 读：'+item.read}}{{' 写：'+item.write}}</span></p>
          </div>
          <div class="result" v-else-if="item.type=='AGE'">
            <p>{{index+1}}.{{item.title}}：<span class="content">{{item.ageOption}}年</span></p>
          </div>
          <div class="result" v-else>
            <p>{{index+1}}.{{item.title}}：<span class="content">{{item.radioOption}}</span></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="shadow" v-if="result.mask">
      <img src="./images/tips.png" alt="" class="tips" >
    </div>
  </div>
</template>

<script>
import Lib from "assets/js/Lib";
import question from 'components/questions/question/question'
  export default {
    components:{
      question,
    },
    data(){
      return{
        result:{},
        wxUser:localStorage.userInfo?JSON.parse(localStorage.userInfo):'',
      }
    },
    created(){
      Lib.WX.is_weixin();
      this.getDetail(this.$route.params.resultId);
    },
    methods:{
      getDetail(id){
        Lib.M.ajax({
          url:`/questionnaire_result_detail`,
          type:'post',
          data:{
            id,
            infoJson: JSON.stringify(this.wxUser),
          },
          success:res=>{
            if(res.type=='success'){
              this.result=res.content;
              Lib.WX.is_weixin('评估结果',`${this.result.questionnaireAnswer.phone}的个人情况`,`https://m.meiyi.ai/questions/author.html#/?resultId=${this.$route.params.resultId}`);
            }else{
              alert('无权查看此页面');
              location.href='/';
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .questions_list {
    height: 100%;
    padding: 0.28rem 0.24rem 0.28rem 0.24rem;
    margin: 0 auto;
    max-width: 768px;
    .question_desc {
      font-size: 15px;
      color: #666;
    }
    .question_title {
      height: 0.8rem;
      line-height: 0.8rem;
      border-bottom: 1px solid #e1e1e1;
    }
    .question_item {
      font-size: 13px;
      color: #1e1e1e;
      background: #ffffff;
      border-radius: 2px;
      padding: 0rem 0.34rem;
    }
    .question_btn {
      display: block;
      background: #2399eb;
      border-radius: 4px;
      border: none;
      color: #fff;
      width: 100%;
      height: 0.92rem;
      line-height: 0.92rem;
      font-size: 18px;
      padding: 0;
      margin-top: 0.3rem;
    }
    .result_list{
      padding-bottom: 0.3rem;
      .result_item{
        margin-top: 0.3rem;
        .result{
          font-size: 13px;
          display: flex;
          color:#666;
          .content{
            color:#000;
          }
        }
      }
    }
  }
  .tips{
    width: 90%;
    display: block;
    margin: 0.2rem auto;
  }
</style>
