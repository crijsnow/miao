<template>
    
  <span class="add">
    <button v-on:click="data--">-</button>
    {{data}}
    <button @click="data++">+</button>
  </span>
</template>

<script>
export default {
// 再组件里直接用data对象会报错，需要使用一个函数
data(){
    return {
        data:100
    }
}
}
</script>

<style lang="less">
.add{
    height: 30px;
    width: 50px;
    border-radius: 10%;
    background-color: rgba(100,255,100,1);
    text-align: center;
    line-height: 30px;
    color: black;
    margin-left: 10px;
}
</style>