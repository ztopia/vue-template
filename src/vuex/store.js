import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)//Vue.propertype.$store

//创建仓库
const store = new Vuex.Store({
    state:{//存储的数据结构
        goodsList:[] //[{goodsId:87,count:2},{goodsId:88,count:3}]
    },
    getters:{
        getGoodsList(state){//将仓库中存储的所有商品返回回去
            return state.goodsList
        },
        getGoodsTotalCount(state){//获取仓库中总个数
            let totalCount = 0
            state.goodsList.forEach(item=>{
                totalCount+=item.count
            })

            return totalCount
        }
    },
    mutations:{//用同步的方式，往仓库中存值
        /**
         * 参数1，是固定写法，将来获取state中的数据操作
         * 参数2，传进来，要存储到仓库里面的商品
         */
        addGoods(state,goods){ //goods ===> {goodsId:87,count:3}
            state.goodsList.push(goods)
            console.log(state.goodsList)
        },
        /**
         * 根据id删除掉对应的数据
         */
        deleteGoodsById(state,goodsId){
            for(var i = state.goodsList.length-1;i>=0;i--){
                var goods = state.goodsList[i]
                if(goods.goodsId==goodsId){
                    state.goodsList.splice(i,1)
                }
            }
        }
    },
    actions:{//异步往购物车中添加数据
        asyncAddGoods(context,goods){
            context.commit('addGoods',goods)
        }
    }
})

export default store