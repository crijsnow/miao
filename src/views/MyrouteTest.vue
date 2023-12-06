<template>
  <div>
    {{'动态路由'+$route.params.words+'查询参数'+$route.query.num}}
    <button @click="tiao">二级</button>
    <div class="set">
      <router-link to="/MyrouteTest/article">Article</router-link>
      <router-link to="/MyrouteTest/like">like</router-link>
      <router-link to="/MyrouteTest/user">user</router-link>
      <router-link to="/MyrouteTest/collect">collect</router-link>
    </div>
    <router-view></router-view>
    </div>
</template>

<script>
import Bus from '../components/utilis/eventBus.js'
export default {
  // created(){
  //   const params=Object.values(this.$route.params)
  //   Bus.$emit('route1',params)
  // },
  // updated(){
  //   const params=Object.values(this.$route.params)
  //   Bus.$emit('route1',params)
  // },
  activated(){
    const params=Object.values(this.$route.params)
    Bus.$emit('route1',params)
  },
  methods:{
    tiao(){
      this.$router.push('/MyrouteTest/LevelTwo')
    }
  }
}
</script>

<style scoped>
div {
  width: 200px;
  height: 200px;
  background-color: skyblue;
}
a {
  height: 20px;
  text-decoration: none;
  color: aqua;
  display: block;
  margin: 0px 5px;
  font-size: 12px;
}
.set {
  width: 200px;
  height: 20px;
  display: flex;
}
</style>