<template lang="html">
  <div id="calen"></div>
</template>

<script>
  import Calendar from "assets/js/calendar.js";
  export default {
    props:['apptDate'],
    data(){
      return {
        clickNum:0,
        calendar:{
          vueChange:0,
        },
      }
    },
    created () {
      this.$nextTick(() => {
        this._initCalendar();
        this._initDataClick(this.apptDate.data);
      });
    },
    watch:{
      calendar:{
        handler:function (newVal) {
          this._initDataClick(this.apptDate.data);
        },
        deep: true
      }
    },
    methods:{
      _initCalendar:function () {
        this.calendar=new Calendar("calen",this.apptDate.nowDays);
      },
      _initDataClick:function (date) {
        const calendarDom=document.getElementById("calendarTable");
        const tdDom=calendarDom.getElementsByTagName("td");
        const nYear=parseInt(document.getElementById("Year").innerText);
        const nMonth=parseInt(document.getElementById("Month").innerText);
        for(let i = 0; i <date.length; i++){
          const time=date[i].time.split("-");
          const dateYear=parseInt(time[0]);
          const dateMonth=parseInt(time[1]);
          const dateDay=parseInt(time[2]);
          if(date[i].state==1){
            for(let j=0;j<tdDom.length;j++){
              if(nYear==dateYear&&nMonth==dateMonth&&tdDom[j].innerText==dateDay) {
                tdDom[j].classList.add("clickTrue");
                tdDom[j].onclick=function () {
                  if(this.classList.contains("apptTrue")){
                    this.classList.remove("apptTrue");
                  }else{
                    let t=document.getElementsByClassName("apptTrue")[0];
                    if(t){
                      t.classList.remove('apptTrue');
                    }
                    this.classList.add("apptTrue");
                  }
                }
              }
            }
          }else if(date[i].state==2){
            for(let j=0;j<tdDom.length;j++){
              if(nYear==dateYear&&nMonth==dateMonth&&tdDom[j].innerText==dateDay) {
                tdDom[j].classList.add("apptFalse");
              }
            }
          }
        }
      }
    }
  }
</script>

<style lang="less">
  #calendarDiv{
    font-size: 16px;
    color: #1E1E1E;
    font-weight: normal;
    padding-bottom: 10px;
    #headId{
      height: 1rem;
      line-height: 1rem;
      .disable{
        color:#D6D6D6;
      }
    }
    #calendarTable{
      th{
        font-weight: normal;
        padding: 12px 0
      }
      td{
        color: #D6D6D6;
        padding: 20px 0;
        width: 0.3rem;
        text-align: center;
      }
      .clickTrue{
        color: #1E1E1E;
      }
      .apptFalse{
        position: relative;
        color:#fff;
        z-index: 99;
        &:after{
          content:"约满";
          font-size: 14px;
          position: absolute;
          bottom: -7px;
          display: block;
          width: 100%;
          text-align: center;
          color: #F42841
        }
        &:before{
          content: ".";
           z-index: -111;
          font-size: 0;
          position: absolute;
          left: 50%;
          top: 50%;
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #F42841;
          transform : translate(-50%,-50%);
        }
      }
      .apptTrue{
        position: relative;
        color:#fff;
        z-index: 99;
        &:after{
          content:"预约";
          font-size: 14px;
          position: absolute;
          bottom: -7px;
          display: block;
          width: 100%;
          text-align: center;
          color: #2399EB;
        }
        &:before{
          content: ".";
          z-index: -111;
          font-size: 0;
          position: absolute;
          left: 50%;
          top: 50%;
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #2399EB;
          transform : translate(-50%,-50%);
        }
      }
    }
  }
</style>
