<template>
  <div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        search: {
          classify:"",
          style:"",
          thickness:"",
          color:"",
          minprice:0,
          maxprice:99999999,
          rexiao:false,
          xinpin:false,
          recommond:false,
          pno:1,
          size:8,
          keywords:""
        }
      }
    },
    methods: {
      route_query() {

      }
    },
    mounted() {},
    watch: {
      $route() {
        console.log(this.$route.query)
      }
    },
  }
</script>
<style>

</style>