<template>
  <div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      localList:[]
    }
  },
  created() {
    this.$store.commit("changeProductQuery",{keywords:this.keywords})
    this.$store.dispatch("getProductList")
  },
  computed: {
    productList(){
      return this.$store.state.productList
    }
  },
  watch: {
    
  },
}
</script>
<style lang="scss" scoped>

</style>
