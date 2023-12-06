<template>
  <div>
    地址<input type="text" v-model="routeset"><br>
    携带参数<input type="text" v-model="routequery"><br>
    <button @click="route">简写查询参数跳转</button>
    <button @click="route1">path+查询参数</button>
    <button @click="route2">name+查询参数</button>
    <br>
    <button @click='route3'>动态路由简写</button>
    <button @click='route4'>path+动态路由（错误写法）</button>
    <button @click='route5'>name+动态路由</button>
    <br>
    <button @click="$router.back()">返回</button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            routeset:'',
            routequery:'',
        }
    },
    methods:{
        route(){
            // 通过路径进行路由跳转
            // this.$router.push('路由路径')
            this.$router.push(`/${this.routeset}?num=${this.routequery}`)
        },
        route1(){
            this.$router.push({
                path:`/${this.routeset}`,
                query:{
                    num:this.routequery
                }
            })
        },
        route2(){
            this.$router.push({
                name:this.routeset,
                query:{
                    num:this.routequery
                }
                // 可以使用name跳转,如果是动态路由就用params
                // path+params传不过去,要么path+query，要么path后拼接/+参数,要么name+params
            })
        },
        route3(){
            this.$router.push(`/${this.routeset}/${this.routequery}`)
        },
        route4(){
            this.$router.push({
                path:`/${this.routeset}`,
                params:{
                    words:this.routequery
                }
            })
        },
        route5(){
            this.$router.push({
                name:this.routeset,
                params:{
                    words:this.routequery
                }
            })
        }
    }
}
</script>

<style scoped>
div {
  margin-top: 60px;
}
</style>