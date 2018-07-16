<template>
   <div>
       <!-- 1.0 轮播子组件 -->
       <div class="lunboStyle">
           <subswipe :lunbo_url="'api/getthumimages/'+this.$route.params.goodsId" :lunbo_time="time"></subswipe>
       </div>

       <!-- 2.0 商品信息 -->
       <div class="goodsInfoStyle">
           <h4>{{goodsInfo.title}}</h4>
           <p>市场价:<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价:<span style="color:red;font-size:16px;">{{goodsInfo.sell_price}}</span></p>
           <!-- 数量选择子组件 -->
           <subnumber v-on:countChange="getChangeCount"></subnumber>
           <mt-button type="primary" size="normal">立即购买</mt-button>
           <mt-button type="danger" @click="addToShopCart()" size="normal">加入购物车</mt-button>
       </div>

       <!-- 3.0 商品参数 -->
       <div class="goodsParams">
           <h5>商品参数</h5>
           <ul>
               <li>商品货号:{{goodsInfo.goods_no}}</li>
               <li>库存情况:{{goodsInfo.stock_quantity}}件</li>
               <li>上架时间:{{goodsInfo.add_time | fmtDate}}</li>
           </ul>
       </div>

       <div class="pictureAndComment">
           <mt-button type="primary" @click="goToPictureAndText()" plain size="large">图文介绍</mt-button>
           <mt-button style="margin-top:15px;" @click="goToGoodsComment()" type="danger" plain size="large">商品评论</mt-button>
       </div>
   </div>
</template>
   
<style scoped>
   .lunboStyle,.goodsInfoStyle,.goodsParams,.pictureAndComment{
       margin: 8px;
       border-radius: 8px;
       padding: 8px;
       border:1px solid rgba(92, 92, 92, 0.3);
   }

   h4{
       border-bottom: 1px solid rgba(92, 92, 92, 0.3);
       padding-bottom: 10px;
       color: #0094ff;
       font-size: 16px;
   }

   h5{
      border-bottom: 1px solid rgba(92, 92, 92, 0.3);
      padding-bottom: 10px; 
   }

   .goodsParams ul li{
       list-style: none;
       font-size: 14px;
   }

   .goodsParams ul{
       padding: 3px;
       margin: 3px 0px;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   import bus from '../../common/commonvue.js'

   import { Toast } from 'mint-ui'

   //导入轮播子组件
   import subswipe from '../subcomponents/subswipe.vue'
   import subnumber from '../subcomponents/subnumber.vue'
   
   export default {
       data() {
           return {
               time : 1000, //轮播的间隙
               goodsInfo : {},
               goodsCount:1 //要购买的商品数量的默认值
           }
       },
       created() {
           this.getGoodsInfoData()
       },
       methods: {
           //获取商品详情数据
           getGoodsInfoData(){
               const url = `${common.apihost}api/goods/getinfo/${this.$route.params.goodsId}`

               this.$http.get(url).then(response=>{
                   this.goodsInfo = response.body.message[0]
               })
           },
           //跳转到图文介绍组件中去
           goToPictureAndText(){
               //利用编程式导航触发路由
               this.$router.push({ name: 'pictureAndText', params: { goodsId:  this.$route.params.goodsId}})
           },
           //跳转到商品评论组件中去
           goToGoodsComment(){
               // 带查询参数，变成 /register?plan=private
               this.$router.push({ path: '/goods/goodscomment', query: { goodsId: this.$route.params.goodsId }})
           },
           //子组件触发自定义事件的时候，要调用函数
           getChangeCount(count){
               this.goodsCount = count
           },
           //加入购物车
           addToShopCart(){
               //发送方，触发事件，传递数据
               //bus.$emit('badgeChange',this.goodsCount)

               //将数据存储到仓库中去
               const goods = {goodsId:this.$route.params.goodsId,count:this.goodsCount}
               //调用同步保存的方法
               this.$store.commit('addGoods',goods)
            //    setTimeout(()=>{
                      //调用异步保存的方法
            //        this.$store.dispatch('asyncAddGoods',goods)
            //    },1000)

               Toast({
                    message: '加入购物车成功',
                    position: 'middle',
                    duration: 2000
               });
           }
       },
       components:{
           subswipe:subswipe,
           subnumber:subnumber
       }
   }
</script>