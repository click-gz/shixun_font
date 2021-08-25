<template>
<div style="margin-top: 10px;">
  <el-carousel :interval="8000" type="card" height="400px">
    <el-carousel-item v-for="item in banners" :key="item">

      <img :src="item" alt="" style="height: 100%;width: 100%">
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
export default {
  name: "Banner",
  //此处的banners数据来自于父组件Home.vue，父组件的传值必须要通过props获取
  props: {
    banners: {
      type: Array,
      //必须的值
      required: true
    }
  },
  methods:{
  }
}
</script>

<style scoped>

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;

}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
