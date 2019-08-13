<template>
  <div id="app">
    	<router-view v-if='isRouterAlive'></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){//向后面的子孙节点注入依赖
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    //刷新方法
    //控制匹配到的路由显示隐藏，从而控制页面的再次加载
    reload:function(){
      this.isRouterAlive=false;
      //该方法会在dom更新后执行
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
