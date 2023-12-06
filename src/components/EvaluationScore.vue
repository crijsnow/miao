<template>
  <ul>
    <li :style="{'font-size':sizer}" v-for="index in num" :key="index" @click="changenum(index)">❤️</li>
    <li :style="{'font-size':sizer}" v-for="index in (value-num)" :key="-index" @click="changenum(index+num)">🤍</li>
  </ul>
</template>

<script>
export default {
    data(){
        return {
            sizer:'',
        }
    },
    props:{
        value:{
            type:Number,
            default:5,
            required:true,
            validator(value){
                return value>1&&value<=10
            }
        },
        num:{
            type:Number,
            default:1,
            required:true,
            validator(value){
                return value>=1&&value<=10
            }
        },
        size:{
            type:String,
            default:'middle',
            required:false,
            validator(value){
                return value==='small'||value==='middle'||value==='large'
            }
        },
    },
    methods:{
        changenum(index){
            this.$emit('changenum',index)
        },
        
    },
    mounted(){
            let res=''
            if(this.size==='small') res= '12px'
            else if(this.size==='middle') res='16px'
            else res='20px'
            this.sizer= res
    },
    watch:{
        num(newv){
            console.log(newv)
        }
    }
}
</script>

<style scoped lang="less">
ul {
  list-style: none;
  display: flex;
}
</style>