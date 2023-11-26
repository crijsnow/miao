<template>
  <div class="son">{{color}}</div>
</template>

<script>
export default {
    inject:['testProvide','color'],
    created(){
        console.log(this.testProvide)
    }
}
</script>

<style>
    .son{
        height: 100px;
        width: 100px;
        background-color: rgb(10, 230, 10);
    }
</style>