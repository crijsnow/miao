<template>
    <div class="title">{{title}}<button @click="chg" :msg="msg">chg</button>
    <!-- 不能像div一样直接给组件设置CSS样式，但是可以用v-bind -->
    <HumButton></HumButton>
    </div>
    
</template>

<script>
export default {
    // props:['title'],//这里一定要是字符串而不能是变量名
    // 子组件无法直接修改 props 中的数据,如果需要利用这里的变量计算或改变，一般是要用计算属性或者通过$emit修改父组件的变量
    /*
        props可以写成对象的写法，然后用类似于ts的语法对其进行类型校验
        props:{
            title:String如果不是对应类型会进行报错，
        } 
        或者也可以写成更严格的格式:
        props:{
            传入的变量1:{
                type:String   //类型
                required:true //是否必填
                default：默认值
                validator(value){
                    校验逻辑
                    return 是否通过校验
                }
            },
            传入的变量2:{
                .......
            },
            ......
        }
     */
    data(){
        return {
            msg:'msg'
        }
    },
    props:{
        title:{
            type:String,
            required:false,
            default:'默认title参数',
            validator(value){
                // validator只是一个常用的约定，实际上可以叫任何名字
                if(value.length>0&&value.length<=12){
                    return true
                }else{
                    console.error('传入的props title必须是1-12位')
                    return false
                }
            }
        }
    },
    methods:{
        chg(){
            this.$emit('chg','淄川付测试')
        }
    }
}
</script>

<style lang="less" scoped>
//scoped可以让样式局限到当前组件
div {
  border: 2px solid blue;
}
.set {
  display: block;
}
.title {
  overflow: hidden;
  white-space: nowrap;
  width: auto;
  height: 100;
  text-align: center;
  line-height: 100px;
  background-color: rgb(162, 135, 235);
  margin: 10px 15px;
  color: white;
}
</style>