<template>
  <div>
    <div>
        显示并聚焦隐藏的输入框：
    <button @click="dicks">dicks!~~</button>
    </div>
    <div v-if="isShow" class="dd">
        <input type="text" class="inset" ref="input" placeholder="写点什么吧~">
        <button @click="isShow=false">x</button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            isShow:false
        }
    },
    methods:{
        dicks(){
            this.isShow=!this.isShow
            this.$nextTick(()=>{
                //这里由于在isShow修改之后，DOM元素重绘，这个过程是异步的，若同步地直接写this.$refs会啥都找不到
                // this.$nextTick(回调函数)的意思是在DOM更新完成后立刻调用该回调函数
                this.$refs.input.focus()
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .dd{
        position: absolute;
        left: 30px;
        bottom: 60px;
        height: 60px;
        width: 300px;
        background-color: #808080;
        .inset{
             position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            height: 30px;
            width: 240px;
            font-size: 16px;
        }
    }
</style>