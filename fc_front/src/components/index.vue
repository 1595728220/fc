<template>
    <div class="">
        <myheader></myheader>
        <div class="container mt-3 mb-3">
            <h1>{{msg}}</h1>
        </div>
        <myfooter></myfooter>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                msg: "hello world"
            }
        }
    }
</script>
<style>

</style>