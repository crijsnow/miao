<template>
  <ul class="uls" @mouseover="mouseenter"> 
    <li :class="{'title':true,'vuexbgc':isvuex}">喵~您的数据助手</li>
    <li class="bgi" :style="{'background-position':bgps}"></li>
    <li class="meiyou" v-if="stack.length<1&&!isvuex||vuexstack.length<1">空空如也呢</li>
    <li v-for="(item,index) in isvuex?vuexstack:stack" :key="index" v-color="color" :class="{'dick':isvuex}" :data-id="index" @mouseleave="mouseleave">
      {{item}}
      <span v-if="isvuex" :class="{'showvalue':isshowvuexvalue[index]}" :data-id="index">{{vuexvalue[index]}}</span>
      </li>
    <li class="changeInterface"><button @click="input">修改</button></li>
    <li class="reflash"><button @click="clear" :disabled="isvuex">清空</button></li>
    <li v-show="showchangewin" class="shadow">
        <div class="box commen" v-if="inputY">
            <div class="img commen"></div>
            <div class="sidebox">
                <div class="text">{{isvuex?'想要修改哪个数据':'想要监听什么事件呢？'}}</div>
                <input type="text" v-model="newInterface">
                <div class="button">
                    <button @click="tovuex" v-if="!isvuex">vuex模式</button>
                    <button @click="tovuex" v-else>总线模式</button>
                    <button @click="sendchangewin">确认更改</button>
                    <button @click="showchangewin=false">取消</button>
                </div>
            </div>
            <div class="list commen" v-if="!isvuex">
              <div class="now">{{Myinterface}}</div>
              <div class="default">{{changecolor}}</div>
              <div class="default">selfMsg</div>
            </div>
            <div class="list commen" v-else-if="isvuex">
              <div class="now" v-for="(item,index) in vuexstack" :key="index">{{item}}</div>
            </div>
        </div>
        <!--  -->
        <div class="box commen" v-else-if="isvuexY">
            <div class="img commen" :class="img"></div>
            <div class="sidebox">
                <div class="text">{{isaddnewvuexstate?`vuex库中没有${newInterface},想要添加新数据吗？`:`vuex库中 ${newInterface} 当前为 '${$store.state[newInterface]}'`}}</div>
                <input type="text" v-model="newvalue">
                <div class="button">
                    <button @click="sendchangewin">确认更改</button>
                    <button @click="middleno">取消</button>
                </div>
            </div>
        </div>
        <!--  -->
        <div  class="box commen" v-else>
            <div class="img commen" :class="img"></div>
            <div class="sidebox">
                <div class="text">{{tagtext}}</div>
                <div class="button">
                    <button @click="ab">{{btntext}}</button>
                </div>
            </div>
        </div>
    </li>
  </ul>
</template>

<script>
// 这里导入总线，默认是utilis文件夹下的eventBus.js总线
import Bus from './utilis/eventBus'
export default {
    data(){
        return {
            stack:[],
            bgps:`0px 0px`,
            color:'blue',
            showchangewin:false,
            newInterface:'',
            tagtext:'',
            inputY:true,
            isvuexY:false,
            img2:false,
            img3:false,
            img4:false,
            btntext:'啊吧...',
            isvuex:false,
            isshowvuexvalue:[],
            vuexstack:[],
            vuexvalue:[],
            newvalue:'',
            img:''
        }
    },
    props:{
        Myinterface:{
            type:String,
            required:false,
            default:'sendMsg'
        },
        changecolor:{
            type:String,
            required:false,
            default:'changeColor'
        }
    },
    methods:{
        clear(){
            this.stack=[]
        },
        bgpset(){
            const x= Math.floor(Math.random()*4)
            const y=Math.floor(Math.random()*2)
            this.bgps=`${144*x-1}px ${144*y-1}px`
        },
        input(){
            this.showchangewin=true
        },
        sendchangewin(){
          if(this.isvuex){
            if(this.newInterface===''){
                this.img='img2'
                this.tagtext='不许用空值哦~'
                this.inputY=false
                return
            }
            // if(this.vuexstack.findIndex(ele=>ele===this.newInterface)===-1){
            //     this.img='img2'
            //     this.tagtext='vuex里没有这个东西啊'
            //     this.inputY=false
            //     return
            // }
            if(!this.isvuexY){
              this.img='img4'
              this.inputY=false
              this.isvuexY=true
            }
            else{
              console.log(this.newvalue)
              this.$store.dispatch('asyncDataChange',{name:this.newInterface,value:this.newvalue})
              this.img='img3'
              this.btntext='好耶~'
              this.tagtext='更改完成！'
              this.isvuexY=false
            }
          }
          else{
            if(this.newInterface==='selfMsg'){
                this.img='img2'
                this.tagtext='selMsg是自用的呢，不能设置这个哦~'
                this.inputY=false
                return
            }
            else if(this.newInterface===this.changecolor){
                this.img='img2'
                this.tagtext='这个事件要用来修改颜色~'
                this.inputY=false
                return
            }
            else if(this.newInterface===''){
                this.img='img2'
                this.tagtext='不许用空值哦~'
                this.inputY=false
                return
            }
            this.img='img3'
            this.btntext='好耶~'
            this.tagtext='更改完成！'
            this.inputY=false
            this.$emit('update:Myinterface',this.newInterface)
          }
        },
        ab(){
            this.btntext='啊吧...'
            this.img=''
            this.inputY=true
            this.showchangewin=false
            this.newInterface=''
            this.newvalue=''
            this.isvuexY=false
        },
        tovuex(){
          if(!this.$store){
            this.img='img2'
            this.tagtext='这里还没装vuex吧...'
            this.inputY=false
            return
          }
          this.img='img3'
          this.btntext='好耶~'
          this.tagtext='模式切换完成！'
          this.inputY=false
          this.isvuex=!this.isvuex
        },
        commenstack(msg){
          if(msg!==''){
            this.stack.push(msg)
            }
            else this.stack.push('空字符串哦~')
            this.bgpset()
        },
        mouseenter(e){
          if(e.target.classList.contains('dick')&&e.target.tagName==='LI'){
               this.$set(this.isshowvuexvalue,e.target.dataset.id,1)
              }
        },
        mouseleave(e){
          if(e.target.classList.contains('dick')&&e.target.tagName==='LI'){
               this.$set(this.isshowvuexvalue,e.target.dataset.id,0)
              }
        },
        middleno(){
          this.showchangewin=false
          this.isvuexY=false
          this.img='img2'
          this.inputY=true
        },
    },
    computed:{
      isaddnewvuexstate(){
        return this.vuexstack.findIndex(ele=>ele===this.newInterface)===-1
      }
    },

    /* props:{
        sync_test:String
        watch可以监听props中的内容
    }, */
    // 在created钩子中对总线的事件进行监听，修改$on监听的事件就行
    // 在遇到改变数据视图不更新时 可以使用$forceUpdate强制更新视图，或者使用$set(名字,键或者下标，数据)
    created(){
        Bus.$on(`${this.Myinterface}`,(msg)=>{
          this.commenstack(msg)
        })
        Bus.$on('selfMsg',(msg)=>{
          this.commenstack(msg)
        })
        Bus.$on(`${this.changecolor}`,()=>{
            let can=[0,0,0].map(()=>Math.floor(Math.random()*256))
            const msg=`rgb(${can[0]},${can[1]},${can[2]})`
            this.color=msg
        })
        // const canvas=document.createElement('canvas')
        // const context=canvas.getContext('2d');
    },
    directives:{
        color:{
            inserted(el,binding){
                el.style.color=binding.value//binding.value就是指令的值
            },
            update(el,binding){//动态修改属性后，不会触发inserted钩子，需要update钩子更新
                 el.style.color=binding.value
            }
        },
    },watch:{
        Myinterface(newValue,oldValue){
            Bus.$off(`${oldValue}`)
            Bus.$on(`${newValue}`,(msg)=>{
                this.commenstack(msg)
                this.bgpset()
            })
        },
        '$store.state':{
          deep:true,
          immediate:true,
          handler(newValue){
            this.vuexstack=Object.keys(newValue)
            const hideflag=this.vuexstack.findIndex(ele=>ele==='hideflag')
            this.vuexstack=this.vuexstack.filter(ele=>ele!=='hideflag')
            this.vuexvalue=Object.values(newValue)
            this.vuexvalue=this.vuexvalue.filter((ele,index)=>index!==hideflag)
            this.isshowvuexvalue=this.vuexstack.map(()=>0)
          }
        }
    }
}
</script>

<style scoped lang="less">
.uls {
  position: fixed;
  right: 1px;
  top: 36px;
  height: 720px;
  width: 120px;
  padding: 1px 1px;
  // 重点！！！
  border-image-source: url("../assets/border3.png");
  border-image-slice: 5 4 fill;
  border-image-repeat: round round;
  border-image-width: 3px;
  border-image-outset: 1px;
  //
  border-radius: 4px;
  list-style: none;
  .bgi {
    position: absolute;
    bottom: 2px;
    right: 125px;
    width: 140px;
    height: 140px;
    background-image: url("../assets/Alice.png");
    background-color: rgba(255, 255, 255, 0);
  }
  .title {
    @keyframes colorChange {
      0% {
        color: red;
      }
      40% {
        color: green;
      }
      80% {
        color: blue;
      }
      100% {
        color: red;
      }
    }
    height: 36px;
    line-height: 36px;
    animation: colorChange 3s infinite;
    background-color: rgba(255, 200, 200, 0.4);
  }
  .meiyou {
    height: 340px;
    line-height: 340px;
    color: rgb(150, 174, 240, 0.6);
    font-size: 14px;
    background-color: rgba(255, 255, 255, 0);
  }
  li {
    border-radius: 3px;
    height: 20px;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    padding: 1px 1px;
    background-color: rgba(200, 200, 255, 0.7);
    margin-bottom: 2px;
  }
  .reflash {
    position: absolute;
    bottom: 1px;
    right: 2px;
    background-color: rgba(255, 255, 255, 0);
    button {
      transition: 200ms;
      border-radius: 2px;
      display: block;
      height: 20px;
      width: 55px;
      font-size: 12px;
      line-height: 20px;
      border: none;
      background-color: rgba(200, 200, 255, 0.6);
      &:hover {
        background-color: rgba(255, 200, 200, 0.8);
        cursor: pointer;
      }
    }
  }
  .changeInterface {
    position: absolute;
    bottom: 1px;
    left: 4px;
    background-color: rgba(255, 255, 255, 0);
    button {
      transition: 200ms;
      border-radius: 2px;
      display: block;
      height: 20px;
      width: 55px;
      font-size: 12px;
      line-height: 20px;
      border: none;
      background-color: rgba(159, 255, 202, 0.6);
      &:hover {
        background-color: rgba(180, 186, 255, 0.8);
        cursor: pointer;
      }
    }
  }
  .shadow {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100rem;
    height: 100rem;
    background-color: rgba(190, 190, 190, 0.5);
    .box {
      position: fixed;
      display: flex;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      width: 444px;
      height: 147px;
      z-index: 100;
      transition: 200ms;
      .img {
        width: 144px;
        height: 144px;
        background-image: url("../assets/Alice2.png");
        transform: translate(-2px, -1px);
      }
      .img2 {
        background-position: 144px 0px;
      }
      .img3 {
        background-position: 432px 144px;
      }
      .img4 {
        background-position: 144px 144px;
      }
      .sidebox {
        padding: 8px 4px;
        .text {
          color: aqua;
          font-size: 16px;
          margin: 10px;
          text-align: left;
        }
        input {
          width: 240px;
          height: 20px;
          border: 2px solid aqua;
          border-radius: 8px;
        }
        .button {
          display: flex;
          position: absolute;
          justify-content: space-around;
          align-items: center;
          right: 10px;
          bottom: 5px;
          width: 290px;
          height: 40px;
          button {
            width: 80px;
            height: 28px;
            color: aqua;
            background-color: rgba(11, 79, 98, 1);
          }
        }
      }
      .list {
        position: absolute;
        right: -76px;
        top: -3px;
        width: 60px;
        height: 135px;
        padding: 6px 4px;
        font-size: 10px;
        z-index: 0;
        overflow: hidden;
        .now {
          color: aqua;
          cursor: default;
        }
        .default {
          color: #808080;
          cursor: default;
        }
      }
    }
  }
  .commen {
    background-color: rgba(11, 79, 98, 1);
    border: 3px solid rgb(103, 204, 232);
    border-radius: 12px;
  }
  .vuexbgc {
    background-color: skyblue;
  }
  .dick {
    transition: 200ms;
    position: relative;
    &:hover {
      cursor: pointer;
      background-color: rgba(255, 200, 200, 0.8);
    }
    span {
      display: none;
      position: absolute;
      top: 0px;
      left: 0px;
      border-radius: 3px;
      width: 120px;
      min-height: 20px;
      max-height: 400px;
      font-size: 12px;
      line-height: 18px;
      padding: 2px 8px;
      text-align: center;
      overflow-wrap: break-word;
      // overflow-wrap用来实现文本过长时的自动换行
      background-color: rgba(11, 79, 98, 1);
      color: rgb(103, 204, 232);
      border: 2px solid rgb(103, 204, 232);
      opacity: 0;
      overflow: auto;
      //添加滑轮
      &::-webkit-scrollbar {
        width: 4px; /* 滚动条宽度 */
      }

      &::-webkit-scrollbar-thumb {
        background-color: aqua; /* 滚动条滑块颜色 */
      }

      &::-webkit-scrollbar-track {
        background-color: aquamarine; /* 滚动条背景颜色 */
      }
    }
    .showvalue {
      display: block;
      left: 0px;
      transform: translateX(-101%);
      opacity: 0.8;
      z-index: 40;
    }
  }
}
</style>