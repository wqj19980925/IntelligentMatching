<template>
    
</template>
<script>
import {
  getToken
} from '@/utils/auth'
export default {
   data() {
       return {

       }
   },
   created() {
       const baseUrl = process.env.BASE_API;
       const str = baseUrl.replace("/public", "");
       window.location.href = str + 'Report/index.html?token=' + getToken()
   }
}
</script>
