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
      let {}
      // this.$axios.get("/product/list",{
      //   params:{

      //   }
      // })
    },
  }
</script>
<style>

</style>