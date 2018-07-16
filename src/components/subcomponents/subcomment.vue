<template>
   <div>
       <!-- 提交评论区域 -->
       <div class="submitCommentStyle">
           <h4>提交评论</h4>
           <textarea ref="textAreaRef" name="" cols="10" rows="5" placeholder="请输入评论内容"></textarea>
           <mt-button type="primary" @click="postComment()" size="large">提交评论</mt-button>
       </div>

       <!-- 评论列表区域 -->
       <div class="commentListStyle">
           <h4>评论列表</h4>
           <div v-for="(item,index) in commentList" :key="index" class="commentItemStyle">
               <p class="titleStyle">{{item.content}}</p>
               <p class="commentUserAndTimeStyle">
                   <span>匿名用户</span>
                   <span>{{item.add_time | fmtDate}}</span>
               </p>
           </div>
           <mt-button @click="loadMore()" class="loadMoreStyle" plain type="danger" size="large">加载更多</mt-button>
       </div>
   </div>
</template>
   
<style scoped>
   .submitCommentStyle,.commentListStyle{
       padding: 8px;
   }

   h4{
       padding-bottom: 8px;
       border-bottom: 1px solid rgba(92,92,92,0.3);
   }

   .commentItemStyle{
       overflow-y: auto;
       height: 100px;
       border-bottom: 1px solid rgba(92,92,92,0.3);
   }

   .titleStyle{
       margin-top: 5px;
       font-size: 15px;
       color:black;
   }

   .commentUserAndTimeStyle{
       margin-top: 40px;
       color: #0094ff;
       display: flex;
       justify-content: space-between;
   }

   .loadMoreStyle{
       margin-top: 15px;
   }
</style>
   
<script>
   import common from '../../common/common.js'

   import { Toast } from 'mint-ui'

   //导入
   //import $ from 'jquery'
   
   export default {
       data() {
           return {
               pageIndex : 1,
               commentList:[],
           }
       },
       props: ['commentId'], //在子组件中通过props定义将来从父组件中接收的值
       created() {
           this.getCommentListData()
       },
       methods: {
           //获取评论列表的数据
           getCommentListData(){
               const url = `${common.apihost}api/getcomments/${this.commentId}?pageindex=${this.pageIndex}`

               this.$http.get(url).then(response=>{
                   if(this.pageIndex==1){//第一页
                        this.commentList = response.body.message
                   }else{
                       this.commentList = this.commentList.concat(response.body.message)
                   }
               })
           },
           loadMore(){//加载更多
               this.pageIndex++
               this.getCommentListData()
           },
           postComment(){//提交评论
                //1.获取textarea的值
                const commentContent = this.$refs.textAreaRef.value

                if(commentContent.trim() == '' || commentContent.trim().length==0){
                    Toast({
                        message: '请输入要评论的内容，别乱来!',
                        position: 'middle',
                        duration: 3000
                    });
                    return 
                }

                //发送网络请求
                const url = `${common.apihost}api/postcomment/${this.commentId}`
                this.$http.post(url,{content:commentContent},{emulateJSON:true}).then(response=>{
                    //清空
                    this.$refs.textAreaRef.value = ''

                    //提示
                    Toast({
                        message: response.body.message,
                        position: 'middle',
                        duration: 3000
                    });

                    //重新第一页
                    this.pageIndex = 1
                    this.getCommentListData()
                })
           }
       }
   }
</script>