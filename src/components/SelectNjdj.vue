<template>

  <select name="select" :value="value" @change="prija">
    <option value="水晶">水晶</option>
    <option value="翡翠">翡翠</option>
    <option value="琥珀">琥珀</option>
  </select>

</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    props:{
        value:{
            type:String,
            default:'水晶'
        }
    },
    methods:{
        changeSelect(event){
            this.$emit('changeS',+event.target.value)//一定要注意数据类型
            // console.log(+event.target.value)
        },
        prija(e){
            this.$emit('input',e.target.value)
            console.log(e.target.value)
        }
    }
}
</script>

<style>

</style>