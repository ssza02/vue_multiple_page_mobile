<template lang="html">
  <li class="question_item">
    <div class="question_title">
      {{question.orders?question.orders+'.':''}}{{question.title}} <span class="error" v-show="question.error">{{question.error}}</span>
    </div>
    <ul class="option_warp radio" v-if="question.type=='RADIO'">
      <li class="option" v-for="option in question.questionnaireQuestionOptions" @click="selectRadio(option)" :class="{selected:option.option==question.selectedOption}">
        <div class="icon_box"><span class="icon-correct select_icon"></span></div>
        <div class="select_box">
          <span class="select_text">{{option.option}}</span>
        </div>
      </li>
    </ul>
    <ul class="option_warp age" v-if="question.type=='AGE'">
      <li class="option">
        <v-select :data="ageArr" :type="'age'" :value="question.age" @input="question.age=arguments[0]"></v-select>
      </li>
    </ul>
    <ul class="option_warp language" v-if="question.type=='LANGUAGE'">
      <li class="option">
        听
        <select class="score" v-model="question.score.listen">
          <option v-for="item in listenArr" :value="item" v-text="item"></option>
        </select>
      </li>
      <li class="option">
        说
        <select class="score" v-model="question.score.speak">
          <option v-for="item in speakArr" :value="item" v-text="item"></option>
        </select>
      </li>
      <li class="option">
        读
        <select class="score" v-model="question.score.read">
          <option v-for="item in readArr" :value="item" v-text="item"></option>
        </select>
      </li>
      <li class="option">
        写
        <select class="score" v-model="question.score.write">
          <option v-for="item in writeArr" :value="item" v-text="item"></option>
        </select>
      </li>
    </ul>
    <ul class="option_warp checkbox" v-if="question.type=='CHECKBOX'">
      <li class="option" v-for="option in question.questionnaireQuestionOptions" @click="selectCheck(option)" :class="{selected:question.checkedOptions.indexOf(option)!==-1}">
        <div class="icon_box"><span class="icon-correct select_icon"></span></div>
        <div class="select_box">
          <span class="select_text">{{option.option}}</span>
        </div>
      </li>
    </ul>
    <ul class="option_warp phone" v-if="question.type=='PHONE'">
      <li class="option">
        <input type="tel" v-model="question.phone" class="input">
      </li>
    </ul>
  </li>
</template>

<script>
import vSelect from 'components/vSelect.vue'
export default {
  components:{
    vSelect,
  },
  data() {
    return {
      ageArr: this.getAgeArr(),
      listenArr:['8.5','8.0','7.5','6.0','5.5','5.0','4.5'],
      speakArr:['7.5','7.0','6.5','6.0','5.5','5.0','4.0'],
      readArr:['8.0','7.0','6.5','6.0','5.0','4.0','3.5'],
      writeArr:['7.5','7.0','6.5','6.0','5.5','5.0','4.0']
    };
  },
  props: {
    question: {
      type: Object,
      default: function() {
        return {
          
        };
      }
    }
  },
  created() {
    if(this.question.type==='AGE'){
      this.$set(this.question,'age',1989);
    }else if(this.question.type==='LANGUAGE'){
      this.$set(this.question,'score',{
        listen:'',
        speak:'',
        read:'',
        write:'',
      });
    }else if(this.question.type==='CHECKBOX'){
      this.$set(this.question,'checkedOptions',[]);
    }
    
  },
  computed:{
    
  },
  methods: {
    selectCheck(option){
      console.log(this.question.checkedOptions.indexOf(option));
      if(this.question.checkedOptions.indexOf(option)===-1){
        this.question.checkedOptions.push(option);
      }else{
        this.question.checkedOptions.splice(this.question.checkedOptions.indexOf(option),1);
      }
    },
    getAgeArr() {
      let date = new Date();
      let year = date.getFullYear();
      let ageArr = [];
      for (let i = 0; i < 78; i++) {
        let age = year - i;
        ageArr.push(age);
      }
      return ageArr;
    },
    selectRadio(option) {
      if (
        typeof this.question.selectedOption === "string"
      ) {
        this.question.selectedOption = option.option;
      } else {
        this.$set(this.question,"selectedOption",option.option
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.question_item {
  margin-top: 0.28rem;
  font-size: 13px;
  color: #1e1e1e;
  background: #ffffff;
  border-radius: 2px;
  padding: 0rem 0.34rem;
  .question_title {
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #e1e1e1;
  }
  .error {
    color: red;
  }
  .option_warp{
    overflow: hidden;
  }
  .radio {
    overflow: hidden;
    .option {
      margin: 0.3rem 0;
      display: flex;
      .icon_box {
        display: inline-block;
        position: relative;
        flex: 0 0 18px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border: 1px solid #a7a7a7;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 15px;
      }
      .select_box {
        line-height: 18px;
      }
      .select_icon {
        display: inline-block;
        font-size: 10px;
        transform: scale(0.8, 0.8);
        color: #a7a7a7;
      }
    }
    .selected {
      .icon_box {
        background-color: #2399eb;
        border: 1px solid #2399eb;
        .select_icon {
          color: #fff;
        }
      }
    }
  }
  .checkbox {
    overflow: hidden;
    .option {
      margin: 0.3rem 0;
      display: flex;
      .icon_box {
        display: inline-block;
        position: relative;
        flex: 0 0 18px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border: 1px solid #a7a7a7;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 15px;
      }
      .select_box {
        line-height: 18px;
      }
      .select_icon {
        display: inline-block;
        font-size: 10px;
        transform: scale(0.8, 0.8);
        color: #a7a7a7;
      }
    }
    .selected {
      .icon_box {
        background-color: #2399eb;
        border: 1px solid #2399eb;
        .select_icon {
          color: #fff;
        }
      }
    }
  }
  .age{
    .option{
      width: 2.56rem;
      position: relative;
    }
  }
  .language{
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 0.5rem;
    .option{
      margin-top: 0.3rem;
      flex: 0 0 50%;
      .score{
        text-indent: 0.3rem;
        background: #FFFFFF;
        border: 1px solid #EAEAEA;
        width: 2.28rem;
        height: 0.5rem;
        margin-left: 0.3rem;
      }
    }
  }
  .phone{
    .input{
      margin: 0.4rem 0;
      background: #FFFFFF;
      border: 1px solid #EAEAEA;
      border-radius: 2px;
      text-indent: 0.15rem;
      height: 0.5rem;
    }
  }
}
</style>
