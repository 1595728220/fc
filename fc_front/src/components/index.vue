<template>
<!-- http://www.aitaocui.cn/daquan/feicui/94312.html -->
    <div class="">
        <myheader></myheader>
        <div class="container mt-3 mb-3">
            <div class="banner bg-secondary row m-0">
                <div class="col-lg-10 col-sm-12"></div>
                <div class="col-lg-2 col-sm-12 d-flex flex-sm-row flex-lg-column">

                </div>
            </div>
        </div>
        <myfooter></myfooter>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                banner:{},
            }
        },
        mounted() {
            this.$axios.get("/")
        },
    }
</script>
<style>

</style>