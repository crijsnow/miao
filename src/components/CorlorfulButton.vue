<template>

<button :style="typeset+sizeset">
    <slot name="icon"></slot>
    <slot name="default">确定</slot>
</button>
</template>

<script>
export default {
    data(){
        return {
            show:false
        }
    },
    props:{
        value:{
            type:String,
            default:'确定',
            required:false,
            validator(value){
                return value.length>=1&&value.length<=10
            }
        },
        type:{
            type:String,
            default:'default',
            required:false,
            validator(value){
                return value==='default'||value==='primary'||value==='danger'||value==='success'||value==='info'
            }
        },
        size:{
            type:String,
            default:'medium',
            required:false,
            validator(value){
                return value==='small'||value==='medium'||value==='large'
            }
        },
    },
    computed:{
        typeset(){
            let res=''
            if(this.type==='default') res="color: #333;'background-color: #fff;"
            else  if(this.type==='primary') res=" color: #fff;background-color: #E6A23C;"
            else  if(this.type==='success') res="  color: #fff;background-color: #67C23A;"
            else  if(this.type==='info') res="color: #fff;background-color: #409EFF;"
            else  if(this.type==='danger') res=" color: #fff;background-color: #F56C6C;"
            return res
        },
        sizeset(){
            let res=''
            if(this.size==='small') res="font-size: 12px; width:80px;height:30px;line-height:20px;"
            else if(this.size==='medium') res="font-size: 16px; width:120px;height:50px;line-height:30px;"
            else if(this.size==='large') res="font-size: 20px; width:160px;height:65px;line-height:40px;"
            return res
        }
    }
}
</script>

<style scoped lang="less">
button {
  vertical-align: middle;
}
</style>