<template>
  <div class="son" v-mysize="'120px'" v-drag>{{color}}</div>
</template>

<script>
export default {
    inject:['testProvide','color','testObject'],
}
</script>

<style>
.son {
  position: relative;
  height: 100px;
  width: 100px;
  background-color: rgb(10, 230, 10);
}
</style>