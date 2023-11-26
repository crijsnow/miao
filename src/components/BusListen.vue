<template>
  <div class="listen">总线接收方
    <span class="box" v-for="(item,index) in Msg" :key="index">{{item}}</span>
  </div>
</template>

<script>
import Bus from './utilis/eventBus.js'

export default {
    data(){
        return {
            Msg:[],
        }
    },
    created(){
        Bus.$on('sendMsg',(msg)=>{
            console.log(2)
            this.Msg.push(msg)
        })
    }
}
</script>

<style lang="less" scoped>
.listen{
    width: 200px;
    height: 200px;
    border: 2px solid black;
    text-align: center;
    .box{
        display: block;
        width: 150px;
        margin: 10px auto;
        line-height: 120%;
    }
}
</style>