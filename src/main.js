// 导入vue核心包
import Vue from 'vue'
// 导入App.vue根组件
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import HumButton from './components/HumButton.vue'
// 提示当前环境(生产环境/开发环境)
// 写false什么都没有，写true就会在工作台提示当前处于开发环境
Vue.config.productionTip = false
// 全局注册
Vue.component('HumButton', HumButton) 

// 全局注册指令
Vue.directive('drag', {
  inserted(el) {
    // inserted会在dom元素被插入页面时触发
    // el参数是指令绑定的元素
    let translateX, translateY
    let thisX=0,thisY=0
    function move(e) {
      el.style.left = e.pageX-translateX+thisX+'px'
      el.style.top = e.pageY-translateY+thisY+'px'
    }
    function up() {
      thisX = parseInt(el.style.left?el.style.left:0)
      thisY = parseInt(el.style.top?el.style.top:0)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseup',up)
    }
    el.addEventListener('mousedown', function (e) {
      translateX = e.pageX
      translateY = e.pageY
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseup',up)
    })
  }
})
Vue.directive('mysize', {
  inserted(el, binding) {
    if (typeof binding.value === 'string') {
      el.style.width = binding.value
      el.style.height=binding.value
    }
  }
})
// Vue实例化，提供render方法，基于App.vue创建结构渲染index.html
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')//这个$mount('#app')和el:'#app',效果完全一致
/*
  普通组件的注册可以分为局部注册和全局注册
      局部注册见App.vue
      全局注册要在这里，在main.js
        import Xxx from '某地址'
        Vue.component('Xxx',Xxx)（组件名，组件对象）
    编写导入时要在代码顶部导入(规范)
 */
