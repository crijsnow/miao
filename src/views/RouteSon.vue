<template>
  <div class="son" v-mysize="'120px'" v-drag>{{color+'查询参数'+$route.query.num+'动态路由'+$route.params.words}}</div>
</template>

<script>
import Bus from '../components/utilis/eventBus.js'
export default {
    inject:['testProvide','color','testObject'],
    activated(){
      console.log('激活缓存组件')
      const query=Object.values(this.$route.query)
      Bus.$emit('route2',...query)
    },
    deactivated(){
      console.log('组件失活')
    },
    // updated(){
    //    const query=Object.values(this.$route.query)
    //   Bus.$emit('route2',...query)
    // },
    // created(){
    //   const query=Object.values(this.$route.query)
    //   Bus.$emit('route2',...query)
    // },
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