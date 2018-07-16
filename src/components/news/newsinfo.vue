<template>
  <div>
      <!-- 标题部分 -->
      <div class="titleStyle">
        <h4>{{this.newsInfo.title}}</h4>
        <p>
          <span>{{this.newsInfo.add_time | fmtDate}}</span>&nbsp;&nbsp;
          <span>{{this.newsInfo.click}}次浏览</span>&nbsp;&nbsp;
          <span>分类:民生经济</span>
        </p>
      </div>
      <!-- 内容部分 -->
      <div class="contentStyle">
        <p v-html="this.newsInfo.content"></p>
      </div>

      <!-- 评论子组件 -->
      <subcomment :commentId="this.$route.params.newsId"></subcomment>
  </div>
</template>

<style scoped>
  .titleStyle,.contentStyle{
    padding: 8px;
  }

  .titleStyle{
    border-bottom: 1px solid rgba(92,92,92,0.3);
  }

  h4{
    color: #0094ff;
    font-size: 16px;
  }
</style>


<script>
  import common from '../../common/common.js'

  // import axios from 'axios'

  //导入评论子组件
  import subcomment from '../subcomponents/subcomment.vue'

  export default{
    data(){
      return {
        newsInfo:{}
      }
    },
    created(){
      this.getNewsInfoData()
    },
    methods:{
      //获取新闻详情数据
      getNewsInfoData(){
        const url = `${common.apihost}api/getnew/${this.$route.params.newsId}`
        
        this.$axios.get(url).then(response=>{
          this.newsInfo = response.data.message[0]
        })
      }
    },
    components:{
      subcomment:subcomment //属性名称是将来在template中使用的
    }
  }
</script>
