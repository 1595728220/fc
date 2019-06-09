<template>
  <div class="order">
    <back-bar title="订单" :back="`/detail?pid=${pid}`"></back-bar>
    <div class="hinder"></div>
    <h1>订单页面</h1>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
export default {
  data() {
    return {};
  },
  computed: {
    pid() {
      return this.$store.state.productId;
    }
  },
  created() {
    this.$store.dispatch("requireUserOrderAddr").then(() => {
      this.$messagebox({
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "添加地址",
        title: "",
        message: "还没有添加收货详情，快去添加吧",
        confirmButtonHighlight: true
      }).then(action => {
        if (action === "confirm") {
          this.$router.push("/add_addr");
        } else {
          this.$router.push(`/detail?pid=${this.pid}`);
        }
      });
    });
  },
  components: {
    "back-bar": BackBar
  }
};
</script>
<style lang="scss" scoped>
.order {
  
}

</style>
