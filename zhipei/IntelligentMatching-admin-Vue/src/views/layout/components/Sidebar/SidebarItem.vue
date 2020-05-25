<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :img-url="onlyOneChild.pri_img||item.pri_img" :title="generateTitle(onlyOneChild.meta.title)" />
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :img-url="item.pri_img" :title="generateTitle(item.meta.title)" />
      </template>
      <template v-for="child in item.children">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu" />

        <!-- <app-link v-else :to="resolvePath(child.path)" :key="child.name"> -->
          <template v-else>
            <div @click="onLinks(child)">
              <el-menu-item :index="resolvePath(child.path)" v-if="child.pri_show == 1">
                <item :img-url="child.pri_img" :title="generateTitle(child.meta.title)" />
              </el-menu-item>
            </div>
          </template>
          
        <!-- </app-link> -->
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import {requestSignin} from "@/api/commonAction"
export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null,
    }
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    onLinks(child){
      if(child.type == 2){
        this.$router.push({path:'/'+child.parent_name+'/'+child.path})
      }else{
        console.log(child)
        let datadd = {};
        datadd.pri_id = child.meta.pri_id;
        console.log(datadd)
        requestSignin(datadd).then(success=>{
          console.log(success)
          if(success.data.code == 200){
            window.location.href = 'http://'+success.data.data.url;
          }else{
            this.$message({
              message:success.data.data,
              type:'error'
            })
          }
        }).catch(err=>{
          this.$message({
            message:'系统错误,跳转失败！',
            type:'error'
          })
        })
      }
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    generateTitle
  }
}
</script>
