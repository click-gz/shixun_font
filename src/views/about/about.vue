<template>
  <div>
    <div class="main">
      <div class="stars">
        <div class="star" v-for="(item,index) in starsCount" :key="index" ref="star"></div>
      </div>

      <div class="main-title">About us</div>
      <div style="width: 100%;height: 200px;text-align: center;margin-top: 100px">

      <img :src="vlog" alt="" width="200px" height="200px" >
    </div>
      <div class="ad-info">
       海东<br>
        花卷<br>
        西八<br>
        哈撒<br>
        biubiu
      </div>

      <div class="to" style="font-size:30px ;font-weight: bold; height: 90px; color: rgb(185,80,223);text-align: center;margin-top: 100px;font-family: 华文楷体">
          <span style="margin-left: 50px;margin-right: 50px;cursor: pointer" @click="to_oth(1)">
            To Video Report
          </span>
        <span style="margin-left: 50px;margin-right: 50px;cursor: pointer" @click="to_oth(2)">
          To Article Report
        </span>
        <span style="margin-left: 50px;margin-right: 50px;cursor:pointer;" @click="to_oth(3)">
          To User Report
        </span>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  data() {
    return {
      vlog: require('@/assets/vlog.png'),
      starsCount:800,//数量
      distance:600,//间距
    }
  },
  methods:{
    to_oth(id){
      if(id===1){
        window.open("https://bi.aliyuncs.com/token3rd/dashboard/view/pc.htm?pageId=6ee1370c-1ee6-4c97-a8f9-88b3287f45e6&accessToken=ef011140de68d7ea1b13b153496e65d6")
      }else if(id===2){
          window.open("https://bi.aliyuncs.com/token3rd/dashboard/view/pc.htm?pageId=456d9b91-9138-4c50-808e-0725ff610943&accessToken=82fbefe744d29023ef5279d90ad05d32")
      }else{
          window.open("https://bi.aliyuncs.com/token3rd/dashboard/view/pc.htm?pageId=65917fdf-88f9-4f44-97fa-be32f683e357&accessToken=ced9fb9f9915093b65374b3251930caa")
      }
    }
  },
  mounted() {
    let starArr=this.$refs.star
    starArr.forEach(item=>{
      var speed = 0.2+(Math.random())
      var distance = this.distance+(Math.random()*300)
      item.style.transformOrigin=`0 0 ${distance}px`
      item.style.transform=`translate3d(0,0,-${distance}px) rotateY(${(Math.random()*360)}deg) rotateX(${(Math.random()*-50)}deg) scale(${speed},${speed})`
    })
  },
}
</script>

<style lang="scss" scoped>
body{
  margin: 0;

}
.main{
  width: 100%;
  min-width: 1200px;
  height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  filter: drop-shadow(0 0 10px white);
  position: relative;
  .main-title{
    position: absolute;
    left: 50%;
    top: 70px;
    transform: translateX(-50%);
    font-size:30px;
    color:rgba(255,255,255,1);
    &::after{
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -28px;
      width:28px;
      height:4px;
      background:rgba(244,54,63,1);
      border-radius:2px;
    }
  }
  .stars{
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: absolute;
    perspective-origin: 50% 100%;
    left: 50%;
    animation: rotate 90s infinite linear;
    bottom: -256px;
    .star{
      width: 2px;
      height: 2px;
      background: #f7f7b8;
      position: absolute;
      top: 0;
      left: 0;
      backface-visibility: hidden;
    }
    @keyframes rotate {
      0%{
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
      }
      100%{
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
      }
    }
  }
  .ad-info{
    font-family: 华文行楷;
    font-size: 35px;
    line-height: 45px;
    margin-top: 10px;
    color: rgba($color: #fff, $alpha: .8);
    text-align: center;
  }

  .dot-num{
    // position: relative;
    // height: 200px;
    // width: 100%;
    .dot{
      position: absolute;
      top: 0;
      display: inline-block;
      .dot-title {
        font-size: 40px;
        line-height: 37px;
        font-weight: bold;
        color: #f23340;
      }
      .dot-describe {
        margin-top: 10px;
        line-height: 20px;
        color: rgba($color: #fff, $alpha: .8);
        font-size: 14px;
      }
    }
  }
}

.to span:hover{
  border-bottom: 1px solid #8778d6;
}
</style>
