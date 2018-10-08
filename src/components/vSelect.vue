<template lang="html">
  <div class="select" v-model="value">
    <select class="age_select" @change="emitChange($event.target.value)">
      <option v-for="item in data" :value="item" v-text="type==='age'?item+'年':item"></option>
    </select>
    <span class="icon-Shape select_btn"></span>
    <div class="select_clone">{{value}}年</div>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Array,
      default:function(){
        return[];
      }
    },
    type:{
      type:String,
      default:''
    },
    value:'',
  },
  data(){
    return{
      
    }
  },
  methods:{
    emitChange(value){
      this.$emit('input',value)
    }
  }
};
</script>

<style lang="less" scoped>
.select {
  position: relative;
  .select_clone {
    width: 100%;
    font-size: 13px;
    color: #1e1e1e;
    border: 1px solid #eaeaea;
    border-radius: 2px;
    text-indent: 0.15rem;
    line-height: 0.5rem;
    height: 0.5rem;
    margin: 0.4rem 0;
    box-sizing: border-box;
  }
  .age_select {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    opacity: 0;
    font-size: 13px;
    color: #1e1e1e;
    border: none;
    text-indent: 0.3rem;
    height: 0.5rem;
    z-index: 111;
    outline: none;
  }
  .select_btn {
    position: absolute;
    right: 0;
    top: 0;
    height: 0.5rem;
    width: 0.6rem;
    line-height: 0.52rem;
    border-radius: 1px;
    text-align: center;
    font-size: 0.2rem;
    background: #2399eb;
    &:before {
      color: #fff;
    }
  }
}
</style>
