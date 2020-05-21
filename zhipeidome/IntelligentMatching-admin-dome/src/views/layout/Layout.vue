<template>
	<div :class="classObj" class="app-wrapper">
		<div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
		<el-container style="height:100%;">
			<el-aside>
				<sidebar class="sidebar-container"/>
			</el-aside>
			<el-container>
				<el-header>
					<navbar/>
					<tags-view/>
				</el-header>
				<el-main>
					<app-main/>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
	name: 'Layout',
	components: {
		Navbar,
		Sidebar,
		AppMain,
		TagsView
	},
	mixins: [ResizeMixin],
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar
		},
		device() {
			return this.$store.state.app.device
		},
		classObj() {
			return {
				hideSidebar: !this.sidebar.opened,
				openSidebar: this.sidebar.opened,
				withoutAnimation: this.sidebar.withoutAnimation
			}
		}
	},
	methods: {
		handleClickOutside() {
			this.$store.dispatch('closeSideBar', { withoutAnimation: false })
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-aside{width:170px!important;transition: all .3s;-webkit-transition: all .3s;}
.hideSidebar .el-aside{width:36px!important;}
.el-header{height:84px!important;padding:0;}
.el-header .mainTopNavItemBox{border-bottom:1px solid #eaecef;}
.el-header .tags-view-container{overflow:hidden;border-bottom:1px solid #eaecef;box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.04);}
.el-main{padding:0;}
.app-wrapper {
	position: relative;height: 100%;width: 100%;
	&.mobile.openSidebar{position: fixed;top: 0;}
}
.drawer-bg {background: #000;opacity: 0.3;width: 100%;top: 0;height: 100%;position: absolute;z-index: 999;}

</style>
