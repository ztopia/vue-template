<template>
   <div>
       <!-- 1.0 标题部分 -->
       <div class="titleStyle">
           <h4>{{photoInfo.title}}</h4>
           <p>{{photoInfo.add_time | fmtDate('YYYY-MM-DD')}}&nbsp;&nbsp;{{photoInfo.click}}次浏览</p>
       </div>

       <!-- 2.0 缩略图部分 -->
       <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(item,index) in photoThumbs" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <img @click="$preview.open(index, photoThumbs)" class="preview-img" height="100" :src="item.src" alt="">
                </li>
            </ul> 
		</div>

       <!-- 3.0 内容部分 -->
       <div class="contentStyle">
           <p v-html="photoInfo.content"></p>
       </div>

       <!-- 4.0 评论子组件 -->
       <subcomment :commentId="this.$route.params.photoId"></subcomment>
   </div>
</template>
   
<style scoped>
   .titleStyle,.contentStyle{
       padding: 6px;
   }

   h4{
       font-size: 16px;
       color: #0094ff;
   }

   .mui-grid-view.mui-grid-9 .mui-table-view-cell{
       border: 0px;
   }
</style>
   
<script>
   import common from '../../common/common.js'

   //导入评论子组件
   import subcomment from '../subcomponents/subcomment.vue'
   
   export default {
       data() {
           return {
               photoInfo:{}, //图片详情数据
               photoThumbs:[] //图片的缩略图
           }
       },
       created() {
           this.getPhotoInfoData()
           this.getPhotoThumbsData()
       },
       methods: {
           //获取图片详情的数据
           getPhotoInfoData(){
               const url = `${common.apihost}api/getimageInfo/${this.$route.params.photoId}`

               this.$http.get(url).then(response=>{
                   this.photoInfo = response.body.message[0]
               })
           },
           //获取图片缩略图数据
           getPhotoThumbsData(){
               const url = `${common.apihost}api/getthumimages/${this.$route.params.photoId}`

               this.$http.get(url).then(response=>{
                   response.body.message.forEach(item => {
                       item.w = 400
                       item.h = 400
                   });
                   console.log(response.body.message)
                   this.photoThumbs = response.body.message
               })
           }
       },
       components:{
           subcomment
       }
   }
</script>