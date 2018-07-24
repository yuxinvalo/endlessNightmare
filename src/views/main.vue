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

    .main-content-dreamtype{
        margin-left: 20%;
        float: left;
        margin-right: 10%;
        position: absolute;
        top: 330px;
    }

    .footer{
        margin-top: 800px;

    }

    .ivu-tabs-tab{
        padding: 10px 100px;
    }

</style>
<template>
    <div class="main-header">
        <div class="highlight">
            <mainTop></mainTop>
        </div>
        <div v-if="selectedMenu==='/'" class="main-content">
            <add-dream></add-dream>
        </div>
        <div v-else-if="selectedMenu==='tagManage'" class="main-content-dreamtype">
            <tags-manage></tags-manage>
        </div>
        <div v-else class="main-content-dreamtype">
            <class-x v-bind:selected="selectedMenu"></class-x>
        </div>
        <div class="footer">
            Editor: Tearsyu
        </div>
    </div>
</template>

<script>
    import mainTop from './main-top.vue';
    import addDream from './addDream.vue';
    import bus from './bus.js';
    import classX from './dreams/classX.vue';
    import tagsManage from './dreams/tagsManage.vue';
    export default {
        components: {
            mainTop,
            addDream,
            classX,
            tagsManage
        },
        data() {
            return{
                selectedMenu: '/'
            }

        },
        methods:{

        },
        created(){
            bus.$on("selectedMenu", (name)=>{
                this.selectedMenu = name;
                console.log("get message: " + name)
            })
        },
        name: "main.vue"
    }
</script>

<style scoped>

</style>