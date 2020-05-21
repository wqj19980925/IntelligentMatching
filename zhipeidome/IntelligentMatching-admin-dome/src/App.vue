<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  beforeDestroy() {},
  mounted() {
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
  methods: {
    beforeunloadHandler() {
    }
  }
}
</script>
<style rel="stylesheet/scss" lang='scss'>
* {box-sizing: border-box;}
#app {
  min-width: 1200px;
}
 /*滚动条整体样式*/
 input::-webkit-input-placeholder { 
/* WebKit browsers */ 
color: #c0c4cc; 
} 
*::-webkit-scrollbar {
    width: 10px;
    height:10px;
}
/*滚动条滑块*/
*::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
}
/*滚动条轨道*/
*::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
    border-radius: 10px;
    background: #ccc;
}
/*自动填空样式清除*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 99999s;
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}
</style>
