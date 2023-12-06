import Vue from 'vue'
import VueX from 'vuex'

import testmodule from './modules/testmodule.js'

Vue.use(VueX)
const store = new VueX.Store({
    /*
        data是组件自己的数据
        state是共享的数据
     */
    strict:true,//严格模式，开启后不允许随便修改库中的内容，有益于初学者规范语法，在上线后需关闭
    state: {
        hideflag:false,
        testState: '仓库测试文本',
        num1: 9901,
        text: '文本',
    },
    // mapState，mapMutations类似，但也不同,要映射到methods
    mutations: {
        //mutations必须是同步的，便于监测数据变化，如果要写异步就要写actions
        //提供修改数据的方法,第一个参数都是state
        numchange(state, value) {
            state.num1+=parseInt(value)?parseInt(value):0
        },
        // 传参的话只能传一个，但是可以传对象
        AliceDataChange(state, obj) {
            const { name, value } = obj
            if (parseInt(value).toString().length === value.length&&parseInt(value).toString()!=='NaN') {
                state[name] = parseInt(value)
            }
            else {
                state[name] = value
            }
        },
    },
    actions: {
        // actions不能直接修改state，需要借助于已有的mutations来异步修改state
        // 在页面中使用this.$store.dispatch调用
        // 同样可使用mapActions
        // import {mapActions} from 'vuex'
        // methods:{
        //      ...mapActions(['asyncDataChange'])
        //}
        asyncDataChange(context,obj) {
            context.commit('AliceDataChange', obj)
            const blurs=!context.state.hideflag
            context.commit('AliceDataChange',{name:'hideflag',value:blurs})
        }
    },
    getters: {
        //类似于计算属性，也有mapGetters，可以展开在computed里
        // getters必须要有返回值
        testt: (state) => {
            return parseFloat(state.num1)
        }
    },
    modules: {
        //modules用来存vuex模块
        //之后可以通过$store.state.模块名.xxx来访问对应的模块内的信息，其他的方法类似
        testmodule
    }
})
export default store