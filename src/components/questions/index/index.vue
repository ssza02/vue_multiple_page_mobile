<template lang="html">
  <ul class="questions_list">
    <li class="question_desc">
      为了更好地评估你的条件，请填写以下个人情况：
    </li>
    <question v-for="question in questions.questionnaireQuestions" :question="question" :key="question.orders"></question>
    <input type="button" value="完成" class="question_btn" @click="checkFn">
  </ul>	
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
        questions:[],
        id:this.$route.params.id,
        wxUser:localStorage.userInfo?JSON.parse(localStorage.userInfo):'',
      }
    },
    created(){
      Lib.WX.is_weixin("个人情况提交",undefined,`https://m.meiyi.ai/questions/author.html#/?id=${this.id}`);
      this.getQuestionDetail(this.id);
    },
    methods:{
      sumbitFn(data){
        Lib.M.ajax({
          type:'post',
          data:{
            phone:this.questions.questionnaireQuestions[this.questions.questionnaireQuestions.length-1].phone,
            id:this.id,
            jsonStr:JSON.stringify(this.getSumbitData()),
            infoJson:JSON.stringify(this.wxUser),
          },
          url:'/submit_questionnaire',
          success:res=>{
            if(res.type=="success"){
              this.$router.push({path:`/result/${res.content}`});
            }else{
              alert(res.content);
            }
          }
        });
      },
      getSumbitData(){
        let data=[];
        this.questions.questionnaireQuestions.map(question=>{
          if(question.type==='RADIO'){
            data.push({
              radioOption:question.selectedOption,
              title:question.title,
              type:question.type
            });
          }else if(question.type==='LANGUAGE'){
            data.push({
              title:question.title,
              type:question.type,
              listen:question.score.listen,
              read:question.score.read,
              speak:question.score.speak,
              write:question.score.write,
            });
          }else if(question.type==='CHECKBOX'){
            let checkboxOption=[];
            question.checkedOptions.map(option=> {
              checkboxOption.push(option.option);
            });
            data.push({
              checkboxOption,
              title:question.title,
              type:question.type
            });
          }else if(question.type==='AGE'){
            data.push({
              ageOption:question.age,
              title:question.title,
              type:question.type
            });
          }
        });
        return data;
      },
      checkFn(){
        let errorNum=0;
        this.questions.questionnaireQuestions.map(question=>{
          question.error=false;
          if(question.type==='RADIO'&&!question.selectedOption){
            question.error='（您漏了这题）';
            errorNum++;
          }else if(question.type==='LANGUAGE'&&(question.score.listen===''||question.score.read===''||question.score.speak===''||question.score.write==='')){
            question.error='（请填写所有分数）';
            errorNum++;
          }else if(question.type==='CHECKBOX'&&!question.checkedOptions.length){
            question.error='（您漏了这题）';
            errorNum++;
          }else if(question.type==='PHONE'&&!Lib.M.checkPhone(question.phone)){
            question.error='（请填写正确手机号码）';
            errorNum++;
          }
        });
        console.log(errorNum)
        if(errorNum==0){
          this.sumbitFn(this.getSumbitData());
        }
      },
      getQuestionDetail(id){
        Lib.M.ajax({
          url:`/questionnaire_detail/${id}`,
          type:'post',
          success:res=>{
            res.questionnaireQuestions.push({
              type:'PHONE',
              title:'请输入您的手机号码',
              phone:'',
            })
            this.questions=res;
            this.questions.questionnaireQuestions.map(question=>{
              this.$set(question,'error',false);
            });
            // if(res.type=='success'){
            //   this.questions=res.content;
            // }else{
            //   alert(res.content);
            // }
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
    color: #666666;
  }
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
</style>
