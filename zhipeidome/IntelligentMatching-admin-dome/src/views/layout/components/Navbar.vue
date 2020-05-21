<template>
	<div class="mainTopNavItemBox">
		<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="toggleSideBarBox"/>
		<breadcrumb class="currentLocationBox"/>
		<div class="rightMenuBox">
			<el-dropdown>
				<el-button type="primary" round>
					{{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-dropdown-menu class="mainDropdownMenuBox" slot="dropdown">
					<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
import { personal,messageCenter } from '@/api/system'
import { setcomId,setModule } from '@/utils/auth'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
export default {
	components: {
		Breadcrumb,
		Hamburger
	},
	data() {
		return {
			admins: '',
			showPer: true,
			commgstate: false,
			name: '',//姓名
		}
	},
	computed: {
		...mapGetters(['sidebar', 'avatar', 'device', 'infor'])
	},
	created() {
		// this.personals()
		this.name = localStorage.getItem('adm_name')
		// sessionStorage.getItem('admin_name')
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('toggleSideBar')
		},
		getmessage() {
			// const data = {}
			// data.type = 1
			// messageCenter(data)
			// .then(response => {
			//	 this.text = response.data.messages[0]
			// })
		},
		showcommg() {
			this.commgstate = true;
		},
		// personals() {
		//	 const data = {}
		//	 personal(data)
		//		 .then(response => {
		//			 // console.log(response.data)
		//			 if (response.data.code === 500) {
		//				 this.showPer = false
		//			 } else {
		//				 this.name=response.data.admin.adm_name
		//				 this.admins = '/SystemsRegulate/Personalindex'
		//			 }
		//		 })
		//		 .catch(Error => {

		//		 })
		// },
		//	person(){
			 //	 this.$router.push({path:'/SystemsRegulate/Personalindex'})
		// },
		personThis(){
			// reload() {
			
				this.$router.push({name:'Personalindex'})
			// }
		},
		goRegisterstartTheTrial() {
			this.$router.push({name:'RegisterstartTheTrial'})
		},
		logout() {
			this.$store.dispatch('LogOut').then(() => {
				sessionStorage.removeItem('admin_name')
				sessionStorage.removeItem('shop_store_name')
				localStorage.removeItem('Admin-Token')
				this.$message({
					message: '退出成功',
					type: 'success'
				})
				location.reload() 
			})
		},

	}
}
</script>
<style scoped>
.mainTopNavItemBox{height:50px;line-height:50px;border-radius:0px!important;}
.mainTopNavItemBox .toggleSideBarBox{line-height:58px;height:50px;float:left;padding:0 10px;}
.mainTopNavItemBox .currentLocationBox{float:left;}
.mainTopNavItemBox .rightMenuBox{float:right;height:100%;position:relative;padding-right:20px;}
.mainDropdownMenuBox{width:auto!important;}
</style>