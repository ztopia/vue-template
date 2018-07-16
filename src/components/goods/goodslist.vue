<template>
   <div style="background-color:#fff">
        <ul class="mui-table-view mui-grid-view">
            <li v-for="item in goodsList" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                <div class="goodsItemStyle">
                    <router-link :to="'/goods/goodsinfo/'+item.id">
                        <img class="mui-media-object" :src="item.img_url">
                        <div class="mui-media-body">
                            <!-- 标题 -->
                            <p class="titleStyle">{{item.title}}</p>
                            <!-- 价格 -->
                            <p class="priceStyle">
                                <span>{{item.sell_price}}</span>&nbsp;&nbsp;
                                <del>{{item.market_price}}</del>
                            </p>
                            <!-- 提示 -->
                            <p class="tipStyle"> 
                                <span>热卖中</span>
                                <span>剩余{{item.stock_quantity}}件</span>
                            </p>
                        </div>
                    </router-link>
                
                </div>
            </li>
        </ul>    
	</div>
</template>
   
<style scoped>
    .mui-table-view.mui-grid-view{
        padding: 0px;
    }

   .mui-table-view.mui-grid-view .mui-table-view-cell{
       padding: 3px 8px;
   }

   .goodsItemStyle{
       border: 1px solid rgba(92,92,92,0.3);
       border-radius: 5px;
       box-shadow: 0px 0px 5px rgba(92,92,92,0.3);
   }

   img{
       padding: 5px;
   }

   .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
       height: 100px;
   }

    .titleStyle,.priceStyle,.tipStyle{
        margin:0px 3px;
    }

    .titleStyle{
        color: black;
        font-size: 12px;
        text-align: left;
        overflow:hidden; 
       text-overflow:ellipsis;
       display:-webkit-box;
       -webkit-box-orient:vertical;
       -webkit-line-clamp:2;
    }

    .priceStyle{
        height: 35px;
        line-height: 35px;
        text-align: left;
        background-color:#f0f0f0;
    }

    .priceStyle span:first-child{
        color: red;
        font-size: 16px;
    }

    .tipStyle{
        display: flex;
        height: 30px;
        line-height: 30px;
        background-color:#f0f0f0;
        justify-content: space-between;;
    }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               goodsList:[]
           }
       },
       created() {
           this.getGoodsListData()
       },
       methods: {
           //获取商品列表的数据
           getGoodsListData(){
               const url = `${common.apihost}api/getgoods`

               this.$http.get(url).then(response=>{
                   this.goodsList = response.body.message
               })
           }
       }
   }
</script>