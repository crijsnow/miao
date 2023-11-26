<template>
  <div class="footer">测试footer<HumButton></HumButton>
  <span>{{num+(+set)}}</span>
      
  </div>
</template>

<script>
export default {
    data(){
      return {
        set:'123',
        num:123
      }
    }
}
</script>

<style>
.footer{
    width: auto;
    height: 100px;
    margin: 10px 15px;
    background-color: blue;
    text-align: center;
    line-height: 100px;
    color: white;
}
</style>