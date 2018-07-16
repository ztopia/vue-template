<template>
   <div style="margin-bottom:8px;">
       <div @click="subtract()" class="left">-</div>
       <div class="middle">{{count}}</div>
       <div @click="add()" class="right">+</div>
   </div>
</template>
   
<style scoped>
   .left,.middle,.right{
       display: inline-block;
       border: 1px solid rgba(92,92,92,0.3);
       width: 35px;
       height: 30px;
       line-height: 30px;
       text-align: center;
   }

   .middle{
       width: 40px;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               count:1
           }
       },
       created() {
       },
       methods: {
           //减法
           subtract(){
               if(this.count<=1) return

               this.count--

               this.notify()
           },
           //加法
           add(){
               this.count++

               this.notify()
           },
           //传值的方法
           notify(){
               //触发自定义事件，并且传值
               /**
                * 参数1：事件名称
                * 参数2：传递的值(数字，字符串，对象，数组...)
                */
               this.$emit('countChange',this.count)
           }
       }
   }
</script>