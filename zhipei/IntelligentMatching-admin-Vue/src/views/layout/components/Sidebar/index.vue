
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      ref="elMenu"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
    <div class="menu-wrapper">
      <li role="menuitem" tabindex="-1" class="el-menu-item titlt-text" style="padding-left: 20px; color: rgb(64, 158, 255); background-color: #222d3c  ;">    
        <div style="width: 15px;height: 20px;float: left;margin-left:-15px">
          <img src="../../../../assets/img/logo_title.png" alt="" srcset="" class="imgDefalue">
        </div>
        <div style="margin-left: 8px">
          <div class="title-texttop" style="">智配</div>
          <div class="title-textfotter">智能配件管理系统</div>
        </div>
      </li>
    </div>
    <sidebar-item v-for="(route,index) in permission_routers" :key="index" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data(){
    return{
      elMenu:'',
    }
  },
  created() {
    // this.permission_routers.splice(2,2);
    
    this.$store.dispatch('Setpri_id',this.$route.meta.pri_id)
    // console.log('-------',this.$store,this.$route);
  },
  watch:{
      $route() {
        //console.log('ppppp34567890',this.isactive)
        this.$store.dispatch('Setpri_id',this.$route.meta.pri_id)
        if(this.$route.meta.pri_id == 102){
        //   this.isactive = null;
        // }else{
        //   this.isactive = this.$route.path;
          this.$refs.elMenu.activeIndex = null
        }else{
          this.$refs.elMenu.activeIndex = this.$route.path;
        }
//         console.log(this.$refs.elMenu.activeIndex,';;;1111')
      },
      deep: true
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.logo-left-img{
  margin:15px 15px 5px;
  width:134px;
  height: 34px;
}
.logo-biao-img{
 margin:15px 3px 5px;;
 width:28px;
 height:34px;
}
.img-titleclass{
  width: 20px;
  height: 57px;
  margin-right: 10px;
}
.title-texttop{
  font-size:20px;
  line-height:50px;
  color:#ffff;
  // margin-top:-65px;
  margin-left: 25px;
  font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
.title-textfotter{
    font-size: 12px;
    color: rgb(255, 255, 255);
    margin-top: -35px;
    margin-left: 25px;
    margin-bottom: 15px;
    font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
</style>
