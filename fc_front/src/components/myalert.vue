<template>
  <div class="alert_area show">
      {{msg}}
  </div>
</template>
<script>
export default {
    data(){
        return {
            msg:"1"
        }
    }
}
</script>
<style>
.alert_area {
  /*150px*/
  height: 60px;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  line-height: 60px;
  /* display:none; */
  opacity: 0;
  padding: 0 10px;
  transition: opacity 0.5s linear 0s, height 0.5s linear 0s;
  z-index: 100;
}
.alert_area.show{
    opacity:1;
    height:3.75rem;
}
</style>
