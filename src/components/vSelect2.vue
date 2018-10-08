<template lang="html">
      <div class="select-list">
        <div class="select-title" @click="selectThemeList()" ref="selectItem">{{selects.selectTitle}}</div>
        <transition name="fade">
          <div class="select-list-background" v-if="themeList">
            <div class="select-list">
              <ul>
                <li v-for="item in selects.selectList">
                  <div class="select-item" :class="{active: selects.selectTitle==item.option}" @click="selectThemeListItem($event,item.tabId)">
                    {{item.option}}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>

</template>

<script>

  export default {
      props:[ 'selects'],
      data () {
          return {
              themeList:false,
              originalTitle:''
          }
      },
      created () {
          console.log('create');
          this.originalTitle = this.selects.selectTitle;
      },
      methods: {
          selectThemeList:function () {
              this.$emit('resetList',this.originalTitle);
              this.themeList = !this.themeList;
          },
          selectThemeListItem:function (e,tabId) {
              // console.log('分类id:'+tabId);
              this.themeList = false;
              this.selects.selectTitle = e.target.innerText;
              this.$emit('selectLabel',tabId);
              this.$emit('selecttype',e.target.innerText);

          },
          resetFn:function(){
            // this.$refs.selectItem.innerText = this.originalTitle;
              this.selects.selectTitle = this.originalTitle;
          }
      }
  }
</script>

<style lang="less" scoped>
    .select-title{
        display: block;
        width: 2rem;
        font-size: 0.28rem;
        text-align: center;
        color: #4CAAED;
    }
    .select-list-background{
        .select-list{
            display: block;
            width: 2rem;
            line-height: 1rem;
            font-size: 0.28rem;
            background: #fff;
            background:rgba(255,255,255,1);
            border-radius: 0.05rem ;
            ul li{
                .select-item{
                    width: 2rem;
                    height: 0.6rem;
                    line-height: 0.6rem;
                    font-size: 0.28rem;
                    text-align: center;
                    color: #666;
                }
                .select-item.active{
                  color: #4CAAED;
                }
            }
        }
    }
</style>
