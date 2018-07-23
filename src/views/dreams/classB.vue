<template>
    <div class="main-header">
        <div class="highlight">
            <mainTop></mainTop>
        </div>
        <div class="main-content">
            <p>CLASS B</p>
        </div>
    </div>
</template>

<script>
    import mainTop from '../main-top.vue';
    export default {
        name: "classA",
        components:{
            mainTop
        }
    }
</script>

<style scoped lang="less">
    .main-header{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    }

    .main-content{
        margin-left: 20%;
        float: left;
        margin-right: 10%;
        position: absolute;
        top: 300px;
    }
</style>