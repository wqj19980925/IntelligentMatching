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
.bottomBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: center;
		background-color: #FFFFFF;
		height: 60px;
		padding: 10px 0;
		border-top: 1px solid #dddddd;
		z-index: 99;
		right: 0;
	}
	
	.receivListes-header {
		margin: 10px 0 0 0;
		.orhead-orbi_state {
			display: flex;
			align-items: center;
			.orhead-ord_service_states {
				padding: 0 10px;
        width: 110px;
        font-weight: 600;
        text-align: right;
			}
			.sd-module-btn {
				color: #666;
				.el-tab-order {
					display: inline-block;
          width: auto;
          height: auto;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          text-align: center;
          line-height: 34px;
          cursor: pointer;
          padding: 0 30px;
          margin-right: 10px;
          margin-bottom: 10px;
				}
				.el-tab-order.on {
					color: #409eff;
					border: 1px solid #409eff;
				}
			}
		}
  }
  // 列表按钮
  .el-button--mini, .el-button--mini.is-round{
    margin-bottom: 10px;
  }
  // 列表 头部
  // .tabelDatas{
      .el-table th{
          text-align: center;
          // background-color: #e6e9f2;
          color: #666;
      }
    // }
    // 数据展示时 去掉 margin
    .detailsd  .el-form-item--medium .el-form-item__content{
        line-height: 20px;
    }
</style>
