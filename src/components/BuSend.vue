<template>
<div>
  <div class="send">总线发送方
    <input type="text" v-model="Msg">
    <button @click="send(Msg)">发送</button>
  </div>
    <Grand></Grand>
    <Selects v-model="prij"></Selects>
  </div>
</template>

<script>
import Bus from './utilis/eventBus.js'
import Grand from './grandSon.vue'
import Selects from './SelectNjdj.vue'
export default {
    data(){
        return {
            Msg:'',
            prij:'水晶',
        }
    },
    methods:{
        send(msg){
            Bus.$emit('sendMsg',msg)
            // console.log(msg)
        }
    },
    components:{
        Grand:Grand,
        Selects
    },
    watch:{
        prij(newvalue){
            console.log(this.selectId)
            this.send(newvalue)
        }
    }
}
</script>

<style lang="less" scoped>
.send{
    width: 200px;
    height: 200px;
    border: 2px solid black;
    text-align: center;
}
</style>