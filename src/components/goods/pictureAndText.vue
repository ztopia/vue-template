<template>
   <div>
       <!-- 标题 -->
       <div class="titleStyle">
           <h4>{{pictureAndTextInfo.title}}</h4>
       </div>

       <!-- 内容 -->
       <div class="contentStyle">
           <p v-html="pictureAndTextInfo.content"></p>
       </div>
   </div>
</template>
   
<style scoped>
   .titleStyle, .contentStyle{
       padding: 5px;
   }

   h4{
       color: #0094ff;
       font-size: 16px;
       border-bottom: 1px solid rgba(92, 92, 92, 0.3);
       padding-bottom: 5px;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               pictureAndTextInfo : {}
           }
       },
       created() {
           console.log(this.$route)
           this.getPictureAndTextInfoData()
       },
       methods: {
           getPictureAndTextInfoData(){
               const url = `${common.apihost}api/goods/getdesc/${this.$route.params.goodsId}`

               this.$http.get(url).then(response=>{
                   this.pictureAndTextInfo = response.body.message[0]
               })
           }
       }
   }
</script>