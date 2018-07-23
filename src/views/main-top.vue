<style scoped lang="less">
    .main-title{
        font-family: "Abyssinica SIL";
        font-size : 40px;
        margin-top: -200px;
        color: #BBBBBB;
        border: white solid 1px;
    }
    .main-title img{
        width: 100%;
    }

    .navigate{
        margin-top: 6%;
    }
    .ivu-menu{
        margin-left: 6%;

    }
</style>

<template>
    <div class="header">
        <div class="main-img">
            <a :href="main">
                <img src="../images/main_top.png"/>
            </a>
        </div>
        <div class="main-title">
            <h2>{{title}}</h2>
        </div>
        <div class="navigate">
            <navigate @selectedItem="getItem"></navigate>
        </div>
    </div>
</template>

<script>
    import navigate from './nav.vue';
    export default {
        name: "main-top",
        components: {
            navigate
        },
        data() {
            return {
                title: 'Endless Nightmare'
            }
        },
        methods: {
            getItem(name){
                console.log("selected name " + name);
                this.$emit("selectedItem", name);
            }
        }
    }
</script>

<style scoped>

</style>