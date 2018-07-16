<template>
   <div>
       <!-- 1.0 图片分类 -->
       <div class="photoCategoryStyle">
           <ul>
               <li @click="getPhotoListDataByCategoryId(0)">全部</li>
               <li @click="getPhotoListDataByCategoryId(item.id)" v-for="item in photoCategories" :key="item.id">{{item.title}}</li>
           </ul>
       </div>

       <!-- 2.0 图片列表 -->
       <div class="photoListStyle">
           <ul>
               <li v-for="item in photoList" :key="item.id">
                   <router-link :to="'/photo/photoinfo/'+item.id">
                    <img :src="item.img_url" alt="">
                    <p class="titleAndZhaiyaoStyle">
                        <span>{{item.title}}</span><br/>
                        <span>{{item.zhaiyao}}</span>
                    </p>
                   </router-link>
               </li>
           </ul>
       </div>
   </div>
</template>
   
<style scoped>
   /* 图片分类的样式 */
   .photoCategoryStyle{
       overflow-x: auto;
   }

   .photoCategoryStyle ul{
       margin: 3px 0px;
       padding: 0px 0px 15px 0px;
       white-space: nowrap;
   }

   .photoCategoryStyle ul li{
       list-style: none;
       display: inline-block;
       color: #0094ff;
       margin: 0px 3px;
   }

   /* 图片列表样式 */
   .photoListStyle ul{
       margin: 3px 0px;
       padding: 0px;
   }

   .photoListStyle ul li{
       list-style: none;
       position: relative;
       padding: 0px 2px;
   }

   img{
       /* height: 400px; */
       width: 100%;
   }

   .titleAndZhaiyaoStyle{
       position: absolute;
       left: 3px;
       bottom: 0px;
       color: white;
       background-color: rgba(0, 0, 0, 0.3);
       width: 98%;
   }

   .titleAndZhaiyaoStyle span:first-child{
       font-size: 16px;
       font-weight: 700;
   }
</style>
   
<script>
   import common from '../../common/common.js'

   import { Indicator } from 'mint-ui'
   
   export default {
       data() {
           return {
               photoCategories:[], //图片分类
               photoList:[]//图片列表
           }
       },
       created() {
           this.getPhotoCategoriesData()
           this.getPhotoListDataByCategoryId(0)
       },
       methods: {
           //获取图片分类数据
           getPhotoCategoriesData(){
               const url = `${common.apihost}api/getimgcategory`

               this.$http.get(url).then(response=>{
                   this.photoCategories = response.body.message
               })
           },
           //根据分类id去获取图片列表的数据
           getPhotoListDataByCategoryId(categoryId){
               const url = `${common.apihost}api/getimages/${categoryId}`

                Indicator.open({
                    text: '数据正在加载中...',
                    spinnerType: 'snake'
                });

               this.$http.get(url).then(response=>{
                   Indicator.close()
                   this.photoList = response.body.message
               }).catch(err=>{
                   Indicator.close()
               })
           }
       }
   }
</script>