<template>
<div>
  <div class="send">总线发送方
    <input type="text" v-model="Msg">
    <button @click="send(Msg)">发送</button>
    <button @click="Msg=prij">使Msg=prij</button>
  </div>
    <Grand ></Grand>
    <Selects v-model="prij" ref="select"></Selects>
    <div ref="test"><button @click="showtestRef">测试ref</button></div>
    
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
        },
        showtestRef(){
            console.log(this.$refs.test)
        }
    },
    components:{
        Grand:Grand,
        Selects
    },
    watch:{
        prij(newvalue){
            this.send(newvalue)
        }
    },
    mounted(){
        // 虽说不建议用$on来监听原生事件，但是也不是说不行
        this.$refs.select.$on('input',function () {
            console.log('this.$on监听成功')
        })
    }
}
</script>

<style lang="less" scoped>
.send {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  text-align: center;
}
</style>