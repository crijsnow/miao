const state = {
    testModule:'测试vuex仓库模块文本'
}
const mutations = {}
const actions = {}
const getters = {}
export default {
    namespaced:true,//开启命名空间，这样之后使用mapState之类的映射可以这样写：...mapState('模块名'，['xxx'])
    state,
    mutations,
    actions,
    getters,
}