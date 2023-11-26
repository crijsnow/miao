
<template>
<!-- 结构 ,一个组件有且只能有一个根结构-->
<div>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  <div class="totalbox">
    <!-- 动态属性前要加: -->
    <TestHead :title="test_title" @chg="change"></TestHead >
    <TestBody></TestBody>
    <TestFooter></TestFooter>
  </div>
    <BusListen></BusListen>
    <BuSend></BuSend>
    <DataDisplay :sync_test.sync="selfMsg"></DataDisplay>
    尝试:<button @click="selfM">发射！</button>
    <!-- .sync修饰符本质就是:属性名和@updata="属性名的合写" -->
</div>
  
</template>

<script>
// 行为
import Bus from './components/utilis/eventBus'
import HelloWorld from './components/HelloWorld.vue'
import TestHead from './components/TestHead.vue'
import TestBody from './components/TestBody.vue'
import TestFooter from './components/TestFooter.vue'//脚手架环境中.vue后缀可以省略
import BusListen from './components/BusListen.vue'
import BuSend from './components/BuSend.vue'
import DataDisplay from './components/DataDisplay.vue'
import './style/common.css'
// import 组件对象 from '组件路径',这种就是局部注册

export default {
  // 这里可以提供data,methods,computed,watch,生命周期钩子等的配置
  // el是根实例独有的，不要随便用
  /*
      使用函数的方式返回 data 对象可以确保每个组件实例都有一个独立的数据副本，避免了数据之间的相互影响。 
      在Vue3中已经全面使用函数式的data了
   */
  name: 'App',
  components: {
    // '组件名':'组件对象'
    HelloWorld,
    TestHead:TestHead,
    TestBody,
    TestFooter,
    BusListen,
    BuSend,
    DataDisplay
  },
  data(){
    // 单向数据流:父元素的props更新，会单向的传递到所有子元素
    return {
      test_title:'测试props父传子',
      selfMsg:'测试ing'
    }
  },
  methods:{
    change(title){
      this.test_title=title
    },
    selfM(){
      Bus.$emit('selfMsg',this.selfMsg)
    }
  },
  // provide提供数据，子组件的reject接收数据，可以给所有子孙组件都接收到
  provide(){
    return {
      color:'blue',//简单数据类型是非响应式的
      testProvide:[1,2,3],//复杂数据类型是响应式的
    }
  }
}
</script>

<style>
/* 样式，如果要支持less的话，需要加装对应的包less和less-loader，然后<style lang="less"> */
/* 样式默认是全局样式，scoped下的样式是局部样式，只能作用于当前模块 */
/*
    scoped的机制：
      它会将scoped样式的标签上添加一个data-v-随机的哈希值(同一个组件用一个哈希值)
      之后给CSS样式添加一个[data-v-对应的hash]的选择器
 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.totalbox{
  overflow: hidden;
  width: 300px;
  height: 540px;
  background-color:rgb(67, 186, 236)
}
</style>
