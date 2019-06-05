<template>
  <div class="immediately-buy">
    
  </div>
</template>
<script>
import Collect from "../common/collect"
export default {
  props:{
    pid:{default:""}
  },
  data() {
    return {
      
    }
  },
  components:{
    "my-collect":Collect
  },
}
</script>
<style lang="scss" scoped>
  .immediately-buy{
    position: fixed;
    bottom: 0;
    background:#fff;
    width:100%;
  }
</style>
