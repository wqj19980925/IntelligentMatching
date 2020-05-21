<template>
  <div class="cs-container">
    <el-row class="cs-skipbtnbox">
      <el-col :span="14" class="box1s">
        <el-row class="cs-skiptit">
          <i class="el-icon-success icon_clss"></i><br/>
          <span style="color:#000;">恭喜创建溯源码成功</span><br/>
          <span style="font-size:16px;">点击下方快捷按钮, 简单, 高效</span>
        </el-row>
        <el-row class="btn-skipbnt">
          <el-col :span="8" class="cs-skibtn">
            <div>
              <el-button @click="jumpPage(1)">返回概括</el-button><br/>
              <span>了解系统概括数据</span>
            </div>
          </el-col>
          <el-col :span="8" class="cs-skibtn">
            <div>
              <el-button @click="jumpPage(2)">一键发码</el-button><br/>
              <span>点击一键发码,快速便捷</span>
            </div>
          </el-col>
          <el-col :span="8" class="cs-skibtn">
            <div>
              <el-button @click="jumpPage(3)">发码列表</el-button><br/>
              <span>前往发码列表,下载溯源码</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="cs-rwmBox" :span="6">
        <div>
          <canvas
            id="canvas"
          ></canvas>
        </div>
        <span>手机扫码查看效果</span><br/>
        <span class="openwx">打开微信扫一扫, 提前查看终端展示效果</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import VueQr from 'qrcode'
export default {
  props: ['qrcodeInfo'],
  components: { VueQr },
  data() {
    return {
      height: null
    };
  },
  created() {
    setTimeout( () => {
      var canvas = document.getElementById('canvas')
      console.log(this.qrcodeInfo)
      VueQr.toCanvas(canvas, this.qrcodeInfo , function (error) {
        if (error) console.error(
          // this.$message.error("生成二维码失败")
        )
      })
    }, 100)
  },
  mounted() {
    // this.height = document.documentElement.clientHeigh;
    // console.log(this.height)
    // document.getElementById('cs-container').style.height = ( 0.91*this.height - 200)+'px';
    
  },
  methods: {
      jumpPage(num) {
          if(num == 1){
              this.$router.push({path : '/Summarize'})
          }else if(num == 2) {
              this.$emit('poststate' , true)
          }else if(num == 3) {
              this.$router.push({path : '/CodeRegulate/CodeManageindex'})
          }
      }
  }
};
</script>

<style lang="scss" scoped>
.cs-container {
  background: #fff;
  padding: 20px;
  margin-top: 10px;
  min-height: 800px;
  .cs-skipbtnbox {
    .box1s{
      margin-top: 12%;
      .cs-skiptit {
      line-height: 40px;
      text-align: center;
      font-size: 26px;
      color: #388adf;
      .icon_clss{
        font-size: 80px;
        margin-bottom: 20px;
        color: #409EFF;
      }
    }
    .btn-skipbnt{
      margin-top:60px;
      text-align: center;
    }
    .cs-skibtn {
      text-align: center;
      height: 100px;
      div{
          width: 150px;
          height: 80px;
          text-align: center;
          line-height: 25px;
          span{
            font-size: 14px;
            margin-top: 15px;
            display: inline-block;
          }
      }
    }
    }
  }
  .cs-mobileBox{
      div{
          margin-top: 50px; 
          height: 600px;
          background: url(../assets/img/phone.png) no-repeat;
          background-size: 50%;
          background-position: center center;
          text-align: center;
          padding-top: 250px;
      }
  }
  .cs-rwmBox{
    margin-top: 12%;
    border-left: 1px solid #ccc;
    text-align: center;
    padding-bottom: 30px;
    div{
      width: 167px;
      height: 167px;
      border: 1px solid #ccc;
      margin: 0 auto;
    }
    span{
      color: #388adf;
      font-size: 14px;
      display: inline-block;
      margin-top: 15px;
    }
    .openwx{
      color: #000;
      margin-top: 25px;
    }
  }
}
</style>
