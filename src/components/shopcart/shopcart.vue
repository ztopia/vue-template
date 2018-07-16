<template>
   <div>
       <!-- 1.0 购物车列表部分 -->
       <div class="shopCartListStyle">
           <!-- 遍历到的购物车的每一项 -->
           <div v-for="(item,index) in shopCartList" :key="item.id" class="shopCartItem">
               <!-- 开关 -->
               <mt-switch @change="staticsTotalCountAndTotalPrice()" class="switchStyle" v-model="item.isSelected"></mt-switch>
               <!-- 缩略图 -->
               <div class="thumbImageStyle">
                   <img :src="item.thumb_path" alt="">
               </div>
               <!-- 商品相关信息 -->
               <div class="goodsInfoStyle">
                   <p>{{item.title}}</p>
                   <p>
                       <span>{{item.sell_price}}</span>&nbsp;&nbsp;
                       <span>商品数量 {{item.count}}</span>
                   </p>
               </div>
               <!-- 删除按钮 -->
               <mt-button :disabled="!item.isSelected" class="deleteButtonStyle" type="danger" @click="deleteGoods(index)" size="small">删 除</mt-button>
           </div>
       </div>

       <!-- 2.0 统计相关信息部分 -->
       <div class="statisticsGoodsInfoStyle">
           <div>
               <h3>总计(不含运费)</h3>
               <p>已经勾选商品 <span>{{totalCount}}</span> 件,总价 <span>{{totalPrice}}</span> 元</p>
           </div>
           <mt-button class="payStyle" type="danger" size="normal">去结算</mt-button>
       </div>
   </div>
</template>
   
<style scoped>
    /** 购物车列表的样式 */
   .shopCartItem{
       height: 100px;
       border-bottom: 1px solid rgba(92,92,92,0.3);
       display: flex;
       align-items: center;
       justify-content: space-between;
   }

   .thumbImageStyle{
       width: 65px;
       height: 65px;
       border: 1px solid rgba(92,92,92,0.3);
       padding: 5px;
       border-radius: 5px;
       margin-left: 5px;
   }

   .thumbImageStyle img{
       width: 100%;
       height: 100%;
   }

   .goodsInfoStyle{
       flex: 1;
       margin-left: 5px;
   }

   .switchStyle{
       margin-left: 5px;
   }

   .deleteButtonStyle{
       margin-right: 5px;
   }

   .goodsInfoStyle p:first-child{
       color: #0094ff;
   }

   .goodsInfoStyle p:last-child span:first-child{
       color: red;
       font-size: 16px;
   }

   /**
   * 统计信息的样式
   */
   .statisticsGoodsInfoStyle{
       height: 100px;
       background-color: rgba(92,92,92,0.3);
       display: flex;
       align-items: center;
       justify-content: space-between;
   }

   .statisticsGoodsInfoStyle div:first-child{
       margin-left: 5px;
   }

   .statisticsGoodsInfoStyle div p span{
       color: red;
       font-size: 16px;
   }

   .payStyle{
       margin-right: 5px;
   }
</style>
   
<script>
   import common from '../../common/common.js'

   import { MessageBox } from 'mint-ui'
   
   export default {
       data() {
           return {
               shopCartList:[],//购物车数组
               totalCount:0, //总数量
               totalPrice:0//总价格
           }
       },
       created() {
          this.getShopCartData()
       },
       methods: {
           //获取购物车列表数据
           getShopCartData(){
                const goodsList = this.$store.getters.getGoodsList

                if(goodsList.length==0) return 

                //1.把我们 [{goodsId:87,count:2},{goodsId:88,count:3},{goodsId:87,count:3}]
                //编程临时的对象　var tempObj = {87:5,88:3}
                var tempObj = {}
                for(var i = 0;i<goodsList.length;i++){
                    var goods = goodsList[i]
                    if(tempObj[goods.goodsId]){//有
                        tempObj[goods.goodsId] += goods.count
                    }else{
                        tempObj[goods.goodsId] = goods.count
                    }
                }

                //2.把 var tempObj = {87:5,88:3} => var tempArray = [87,88]
                var tempArray = []
                for(var key in tempObj){
                    tempArray.push(key)
                }

                //3.[87,88] => 87,88
                const idsString = tempArray.join(',')

                //4.组装好url,发送网路请求
                const url = `${common.apihost}api/goods/getshopcarlist/${idsString}`

                this.$http.get(url).then(response=>{
                    response.body.message.forEach(item => {
                        item.count = tempObj[item.id]
                        //给我们模型添加一个属性isSelected 值是true
                        item.isSelected = true
                    });

                    this.shopCartList = response.body.message

                    //刚开始进来的统计一次
                    this.staticsTotalCountAndTotalPrice()
                })
           },
           //统计总的数量和价格
           staticsTotalCountAndTotalPrice(){
               let tempTotalCount = 0
               let tempTotalPrice = 0

               this.shopCartList.forEach(item=>{
                   if(item.isSelected){
                       tempTotalCount+=item.count
                       tempTotalPrice+=item.count * item.sell_price
                   }
               })

               this.totalCount = tempTotalCount
               this.totalPrice = tempTotalPrice
           },
           deleteGoods(index){
               MessageBox.confirm('确定删除次商品吗?').then(action => {
                   var goodsId = this.shopCartList[index].id
                   console.log(goodsId)

                   //1、根据id删除仓库中对应的商品
                   this.$store.commit('deleteGoodsById',goodsId)

                   //2.干掉对应索引的购物车列表数据
                   this.shopCartList.splice(index,1)

                   //3.重新统计
                   this.staticsTotalCountAndTotalPrice()
               },cancel=>{
                   
               });
           }
       }
   }
</script>