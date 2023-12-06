<template>
  <!-- 结构 ,一个组件有且只能有一个根结构-->
  <div>
    <!-- <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
    <div class="totalbox">
      <!-- 动态属性前要加: -->
      <TestHead :title="test_title" @chg="change" ref="testhead"></TestHead>
      <TestBody></TestBody>
      <TestFooter></TestFooter>
    </div>
    <BusListen></BusListen>
    <BuSend></BuSend>
    <DataDisplay :Myinterface.sync="MyInterface" :changecolor.sync="myInterfaceColor"></DataDisplay>
    尝试:<button @click="selfM">发射！</button>
    <IsShow></IsShow>
    大小：
    <EvaluationScore v-model="max[0]" :size="'small'" :num="num[0]" @changenum="changenum0" ></EvaluationScore>
    <EvaluationScore v-model="max[1]" :size="'middle'" :num="num[1]" @changenum="changenum1" ></EvaluationScore>
    <EvaluationScore v-model="max[2]" :size="'large'" :num="num[2]" @changenum="changenum2" ></EvaluationScore>
    <CorlorfulButton type="primary" size="large" ></CorlorfulButton>
    <CorlorfulButton type="success" size="medium">medium</CorlorfulButton>
    <CorlorfulButton type="success" size="small" >small</CorlorfulButton>
    <CorlorfulButton type="danger" size="medium">
      <template #icon>
        <img src="./assets/collect.png" width="24px">
      </template>
      <template>
        名
      </template>
    </CorlorfulButton>
    <CorlorfulButton @click.native="changeColor">总线姬颜色</CorlorfulButton>
    <!-- .sync修饰符本质就是:属性名和@updata="属性名的合写"
          如果组件传值传递简单数据类型，你去修改它他就不是响应式的了，所以禁止接收方修改发送方数据
          但是如果发的是一个复杂数据类型，你去改它的属性是可以的
     -->
    <MySlot v-model="slotset">
      <template v-slot:moren>
        <!-- 可以使用v-slot:name名来将不同的内容插进对应插槽 -->
        测试插槽功能
      </template>
      <template #head>这里是head,可以使用#来简写v-slot:</template>
      <template #set="obj" >{{
        "测试数据传输" + obj.ob.name + obj.post
      }}</template>
    </MySlot>
    <div class="select">
      <router-link  to="/HumButton">路由1</router-link>
      <router-link  to="/RouteSon?num=0">路由2</router-link>
      <router-link  to="/RouteSon?num=123">设置query</router-link>
      <!-- 查询参数适合去查多个参数to="/名/?参数1=xx&参数2=xx"，而动态路由更加简洁优雅。 -->
      <router-link  to="/MyrouteTest/测试文本">动态路由</router-link>
      <!-- 这东西和a标签其实差不多，只是有额外封装好的高亮样式，可以使用router-link-active(模糊匹配,/HumButton/+其他东西也可以)
          和router-link-exact-active(精确匹配)
       -->
    </div>
    <!-- 路由出口=>匹配的组件所展示的位置 -->
    <keep-alive max="2">
      <!-- 
        keep-alive是一个抽象组件，不会渲染出来，他会缓存不活动的组件而不是销毁
          include:组件名数组，只有其中的会缓存
          exclude:组件名数组，只有其中的不会被缓存
          max：最多可以缓存多少组件实例
        被keep-alive包裹的组件会多两个生命周期：activated(组件被看到时)和deactivated(失活时)
          并且被缓存的组件不会触发destroyed，created，mounted等周期钩子
        include只支持像是link-e-active这样的精确匹配
        使用正则需要加:变成动态属性,而且正则也难以匹配动态路由和查询参数
       -->
      <router-view></router-view>
    </keep-alive>
    <BtnRoute></BtnRoute>
    <MySlot v-model="slotset">
      <template>
        {{vuexgettertest}}<br>
        <input type="text" v-model="plusnum">
        <button @click="$store.commit('numchange',plusnum)">num1change</button>
      </template>
    </MySlot>
  </div>
</template>

<script>
// 行为
import Bus from "./components/utilis/eventBus"
// import HelloWorld from './components/HelloWorld.vue'
import TestHead from "./components/TestHead.vue"
import TestBody from "./components/TestBody.vue"
import TestFooter from "./components/TestFooter.vue" //脚手架环境中.vue后缀可以省略
import BusListen from "./components/BusListen.vue"
import BuSend from "./components/BuSend.vue"
import DataDisplay from "./components/DataDisplay.vue"
import IsShow from "./components/IsShow.vue"
import EvaluationScore from "./components/EvaluationScore.vue"
import CorlorfulButton from "./components/CorlorfulButton.vue"
import MySlot from "./components/MySlot.vue"
import BtnRoute from './components/BtnRoute.vue'

import "./style/common.css"
import {mapState} from 'vuex'
// import 组件对象 from '组件路径',这种就是局部注册

export default {
  // 这里可以提供data,methods,computed,watch,生命周期钩子等的配置
  // el是根实例独有的，不要随便用
  /*
      使用函数的方式返回 data 对象可以确保每个组件实例都有一个独立的数据副本，避免了数据之间的相互影响。 
      在Vue3中已经全面使用函数式的data了
   */
  name: "App",
  components: {
    // '组件名':'组件对象'
    // HelloWorld,
    TestHead: TestHead,
    TestBody,
    TestFooter,
    BusListen,
    BuSend,
    DataDisplay,
    IsShow,
    EvaluationScore,
    CorlorfulButton,
    MySlot,
    BtnRoute,
  },
  data() {
    // 单向数据流:父元素的props更新，会单向的传递到所有子元素
    return {
      test_title: "测试props父传子",
      selfMsg: "测试ing",
      max: [5, 5, 5, 10, 6, 5],
      num: [1, 1, 1, 1, 1, 1],
      show: false,
      slotset:'middle',
      MyInterface:'sendMsg',
      myInterfaceColor:'changeColor',
      getdata:{},
      plusnum:'',
    };
  },
  methods: {
    change(title) {
      this.test_title = title;
    },
    selfM() {
      Bus.$emit("selfMsg", this.selfMsg);
    },
    changenum0(value) {
      this.$set(this.num, 0, value); //对于复杂数据类型，需要使用this.$set传值，否则可能无法正常检测
      // this.num[0]=value
      console.log(this.num);
    },
    changenum1(value) {
      this.$set(this.num, 1, value); //对于复杂数据类型，需要使用this.$set传值，否则可能无法正常检测
      // this.num[0]=value
      console.log(this.num);
    },
    changenum2(value) {
      this.$set(this.num, 2, value); //对于复杂数据类型，需要使用this.$set传值，否则可能无法正常检测
      // this.num[0]=value
      console.log(this.num);
    },
    changeColor() {
      Bus.$emit("changeColor");
    },
  },
  // provide提供数据，子组件的reject接收数据，可以给所有子孙组件都接收到
  computed:{
    ...mapState(['testState','num1']),
    vuexgettertest(){
      return this.$store.getters.testt
    }
  },
  provide() {
    return {
      testObject:{ 
        ass:'luck'
         },
      color: "blue", //简单数据类型是非响应式的
      testProvide: [1, 2, 3], //复杂数据类型是响应式的
    };
  },
  directives:{
    getd:{
      inserted(el,binding){
        this.getdata=binding.value
        console.log(this.getdata)
      }
    }
  },
  mounted(){
    console.log(this.$refs.testhead.msg)
  }
};
</script>

<style scoped lang="less">
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
.totalbox {
  overflow: hidden;
  width: 300px;
  height: 540px;
  background-color: rgb(67, 186, 236);
}
.select {
  display: flex;
  background-color: #2c3e50;
  border: 2px solid aqua;
  width: 400px;
  height: 50px;
  justify-content: space-between;
  a {
    width: 100px;
    border: 2px solid aqua;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: white;
    text-decoration: none;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .link-e-active {
    background-color: rgba(225, 67, 236, 0.4);
  }
}
</style>
