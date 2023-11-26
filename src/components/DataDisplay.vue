<template>
  <ul class="uls">
    <li class="title">喵~您的总线助手</li>
    <li class="meiyou" v-if="stack.length<1">空空如也呢</li>
    <li v-for="(item,index) in stack" :key="index">{{item}}</li>
  </ul>
</template>

<script>
import Bus from './utilis/eventBus'
export default {
    data(){
        return {
            stack:[]
        }
    },
    props:{
        sync_test:String
        // watch可以监听props中的内容
    },
    created(){
        Bus.$on('sendMsg',(msg)=>{
            this.stack.push(msg)
        })
        Bus.$on('selfMsg',(msg)=>{
            this.stack.push(msg)
        })
    }
}
</script>

<style scoped lang="less">
    .uls{
        position: fixed;
        right:0px;
        top:36px;
        height: 720px;
        width: 120px;
        padding: 3px 2px;
        background-color: rgb(230,230,230);
        border: 1px solid #808080;
        border-radius: 4px;
        list-style: none;
        .title{
            @keyframes colorChange {
                0% { color: red; }
                50%{color:green;}
                100% { color: blue; }
            }
            height: 36px;
            line-height: 36px;
            animation: colorChange 3s infinite;
            background-color: rgba(255,200,200,0.4);
        }
        .meiyou{
            height: 340px;
            line-height: 340px;
            color:#808080;
            font-size: 14px;
            background-color: rgba(255,255,255,0);
        }
        li{
            border-radius:3px;
            height: 20px;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            padding: 1px 1px;
            background-color: rgba(200,200,255,0.7);
            margin-bottom: 2px;
        }
    }
</style>