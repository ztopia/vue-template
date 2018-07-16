import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)//Vue.propertype.$route Vue.propertype.$router 

//导入子组件
// import home from '../components/home/home.vue'
// import category from '../components/category/category.vue'
// import find from '../components/find/find'
// import newslist from '../components/news/newslist.vue'
// import newsinfo from '../components/news/newsinfo.vue'
// import photolist from '../components/photo/photolist.vue'
// import photoinfo from '../components/photo/photoinfo.vue'
// import goodslist from '../components/goods/goodslist.vue'
// import goodsinfo from '../components/goods/goodsinfo.vue'
// import pictureAndText from '../components/goods/pictureAndText.vue'
// import goodscomment from '../components/goods/goodscomment.vue'
// import shopcart from '../components/shopcart/shopcart.vue'

const home = () => import('../components/home/home.vue')
const category = () => import('../components/category/category.vue')
const shopcart = () => import('../components/shopcart/shopcart.vue')
const find = () => import('../components/find/find.vue')
const newslist = () => import('../components/news/newslist.vue')
const newsinfo = () => import('../components/news/newsinfo.vue')
const photolist = () => import('../components/photo/photolist.vue')
const photoinfo = () => import('../components/photo/photoinfo.vue')
const goodslist = () => import('../components/goods/goodslist.vue')
const goodsinfo = () => import('../components/goods/goodsinfo.vue')
const pictureAndText = () => import('../components/goods/pictureAndText.vue')
const goodscomment = () => import('../components/goods/goodscomment.vue')

//创建路由对象，设置路由规则
const router = new VueRouter({
    routes : [
        { path: '/', redirect:'/home' },
        { path: '/home', component: home },
        { path: '/category', component: category },
        { path: '/find', component: find },
        { path: '/shopcart', component: shopcart },
        { path: '/news/newslist', component: newslist },
        { path: '/news/newsinfo/:newsId', component: newsinfo },
        { path: '/photo/photolist', component: photolist },
        { path:'/photo/photoinfo/:photoId',component:photoinfo},
        { path: '/goods/goodslist', component: goodslist },
        { path: '/goods/goodsinfo/:goodsId', component: goodsinfo },
        { name:'pictureAndText',path:'/goods/pictureAndText', component: pictureAndText },
        { path: '/goods/goodscomment' ,component:goodscomment}
    ]
})

export default router