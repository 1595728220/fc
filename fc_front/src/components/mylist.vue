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
    // props:['classify','style','thickness','color','new_pro','recommond','min_price','max_price'],
    data(){
      return{
        product:{}
      }
    },
    mounted() {
      // console.log(this.classify,this.style,this.thickness,this.color,this.new_pro,this.recomment,this.min_price,this.max_price)
    },
  }
</script>
<style>

</style>