<template>
  <div>
      <!-- 头部 -->
      <mt-header fixed title="Vue Prject"></mt-header>

      <div @click="goBack()" v-show="isShowBack" class="backStyle">&lt;返回</div>

      <!-- 中间内容 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view class="routerStyle"></router-view>

      <!-- 底部TabBar -->
      <mt-tabbar fixed :class="isShowTabBar ? '' : 'hiddenTabBarStyle'">
        <mt-tab-item>
          <router-link to="/home">
            <img src="http://st.360buyimg.com/m/images/index/a-home.png">
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/category">
            <img src="http://st.360buyimg.com/m/images/index/n-catergry.png">
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/find">
            <img src="http://st.360buyimg.com/m/images/index/n-find.png">
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/shopcart">
            <img src="http://st.360buyimg.com/m/images/index/n-cart.png">
            <span v-show="!(count === 0)" class="mui-badge">{{count}}</span>
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <img src="http://st.360buyimg.com/m/images/index/n-me.png">
        </mt-tab-item>
      </mt-tabbar>
  </div>
</template>

<!-- scoped代表样式私有，只能在该组件里面起作用 -->
<style scoped>
  /* 底部TabBar的样式 */
  .mint-tabbar > .mint-tab-item.is-selected{
    background-color: #FAFAFA;
  }

  img{
    width: 65px;
    height: 50px;
  }

  /* 路由占位符的样式 */
  .routerStyle{
    padding-top: 40px;
  }

  .backStyle{
    color: white;
    font-size: 14px;
    font-weight: 900;
    position: fixed;
    left: 10px;
    top: 10px;
    z-index: 2;
  }

  /**
  * 隐藏底部的TabBar样式
  */
  .hiddenTabBarStyle{
    display: none;
  }

  .mui-badge{
    background-color: red;
    color: white;
    position: absolute;
    right: 90px;
    top: 9px;
  }
</style>

<script>
  //导入公共的bus对象
  import bus from './common/commonvue.js'

  export default{
    data(){
      return {
        isShowBack:false, //是否显示返回按钮
        isShowTabBar:true, //是否显示底部TabBar
        count : 0
      }
    },
    created(){ //只会执行一次
      this.isShowOrHidden(this.$route.path)

      //第一种方式，记录外面的this，在里面使用(词法作用域)
      // const that = this

      //使用bus监听自定义事件，实现处理函数
      // bus.$on('badgeChange',function(goodsCount){
      //   console.log("App.vue ...",goodsCount)
      //   that.count = goodsCount
      // })

      //第二种方式：箭头函数
      // bus.$on('badgeChange',(goodsCount)=>{
      //   console.log("App.vue ...",goodsCount)
      //   this.count = goodsCount
      // })

      //第三种方式：bind
      // bus.$on('badgeChange',function(goodsCount){
      //   this.count += goodsCount
      // }.bind(this))
    },
    updated(){
      //console.log("--------App.vue---------")
      this.count = this.$store.getters.getGoodsTotalCount
    },
    methods:{
      goBack(){//返回
        this.$router.go(-1)
      },
      isShowOrHidden(path){ //根据当前路径来决定，显示还是隐藏返回按钮和TabBar
        if(path!='/home'){
          this.isShowBack = true
          this.isShowTabBar = false
        }else{
          this.isShowBack = false
          this.isShowTabBar = true
        }
      }
    },
    watch:{
      $route:function(newValue,oldValue){ //当路由变化的时候调用
        this.isShowOrHidden(newValue.path)
      }
    }
  }
</script>


