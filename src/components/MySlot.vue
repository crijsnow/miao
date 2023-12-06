<template>
  <div :class="[value]">
    <slot name="default">在这里写的是后备内容</slot>
    <slot name="head"></slot>
    <slot name="set" :ob="test" post="990"></slot>
    <button @click="changeSlot">改变插槽样式</button>
  </div>
</template>

<script>
export default {
    data(){
      return {
        test:{
          name:12,
          age:34
        },
        po:990,
      }
    },
    props:{
      value:{
        required:true,
        default:'middle'
      }
    },
    methods:{
      changeSlot(){
        this.$emit('input',this.value==='big'?'middle':'big')
      }
    }
}
</script>

<style scoped>
div {
  border: 3px solid #ac7a35;
  border-radius: 3px;
  padding: 3px, 5px;
}
.middle {
  width: 200px;
  height: 80px;
}
.big {
  width: 300px;
  height: 120px;
}
</style>