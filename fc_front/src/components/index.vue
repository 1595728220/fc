<template>
    <div>
        <myheader></myheader>
        <div class="container">
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