<template>
  <div>
    <input class="weibo-text" v-model="value" >
    {{value}}

    <div @click="asd">
      a
    </div>


  </div>
</template>


<script>
export default {
  props: {},
  data() {
    return {

      value: '',
      pointer_contain: '',
      file: null,
      f: false,
      loadImage: ""
    };
  },
  methods: {
    asd(){
      this.$router.push("/a.html")
    },
    add() {
      this.$refs.file.click();
    },
    getFile(event) {
      this.file = event.target.files[0];
      const item = {
        name: this.file.name,
        size: this.file.size,
        file: this.file
      };
      this.html5Reader(this.file, item);
      this.f = item;
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },
    submitForm(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append("file", this.file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.axios
          .post("http://.../test/upload", formData, config)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              try {
                console.log(".../getImage/" + res.data);
                if (typeof this.loadImage !== "undefined") {
                  this.loadImage =
                      "http:.../getImage/" + res.data;
                }
              } catch (e) {
                console.log("捕获到异常：", e);
              }
            } else {
              console.log("失败" + 400);
            }
          });
    }

  }
};

</script>

<style scoped>
body{
  margin: 0;
}
</style>
