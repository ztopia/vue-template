//导入Vue
import Vue from 'vue'
import Mint from 'mint-ui'
import VueResource from 'vue-resource'
import moment from 'moment'
import VuePreview from 'vue-preview'
import axios from 'axios'

//使用基于Vue的中间件
Vue.use(Mint)
Vue.use(VueResource) //Vue.propertype.$http=VueResource对象
Vue.use(VuePreview)

Vue.prototype.$axios = axios

//导入项目需要用到的css
//to 上线时候把它换成style.min.css
// import 'mint-ui/lib/style.css'
// import './statics/mui/css/mui.css'
import 'mint-ui/lib/style.min.css'
import './statics/mui/css/mui.min.css'
import './statics/css/site.css'

//全局过滤器
Vue.filter('fmtDate',(input,formatString)=>{
    //最终的格式化的格式
    const lastFormatString = formatString || "YYYY-MM-DD HH:mm:ss"

    /**
     * moment后面接的参数，是你要进行过滤的原始时间
     * format后面接的参数，你最终要格式化的格式
     */
    return moment(input).format(lastFormatString)
})

//导入App.vue
import App from './App' //es5 => const App = require('./App.vue')

//导入路由对象
import router from './routers/routers.js'

//导入vuex
import store from './vuex/store.js'

//创建Vue实例，并且要讲App.vue中内容呈现在id=app的div中去
new Vue({
    el:"#app",
    router, //从而让整个应用都有路由功能
    store,
    // render:function(createElement){
    //     return createElement(App) //告诉Vue实例，项目已启动渲染就是App.vue
    // }
    render:h=> h(App) //告诉Vue实例，项目已启动渲染就是App.vue
}) 
