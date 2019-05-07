<template>
    <ul class="productlist row m-0">
      <li>
        <router-link :to="'/detail/'+product.pid">

        </router-link>
      </li>
    </ul>
</template>
<script>
  export default {
    props:['mymsg'],
    data(){
      return{
        product:{}
      }
    },
    mounted() {
      console.log(this.mymsg)
      this.$axios.get("/product/list",{
        params:this.mymsg
      })
    },
  }
</script>
<style>

</style>