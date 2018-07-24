<template>
    <Tabs @on-click='routeTo' value="tagsTab">
        <TabPane label="A类所有标签" name="ClassA">
            <tag-x v-bind:selected="selectedTag"></tag-x>
        </TabPane>
        <TabPane label="B类所有标签" name="ClassB">
            <tag-x v-bind:selected="selectedTag"></tag-x>
        </TabPane>
        <TabPane label="C类所有标签" name="ClassC">
            <tag-x v-bind:selected="selectedTag"></tag-x>
        </TabPane>
        <TabPane label="D类所有标签" name="ClassD">
            <tag-x v-bind:selected="selectedTag"></tag-x>
        </TabPane>
        <TabPane label="E类所有标签" name="ClassE">
            <tag-x v-bind:selected="selectedTag"></tag-x>
        </TabPane>
    </Tabs>
</template>

<script>
    import tagX from './tagX.vue';
    export default {
        name: "tagsManage",
        components:{tagX},
        data(){
            return{
                selectedTag: 'A'
            }
        },
        methods:{
            routeTo(name){
                this.selectedTag = name[name.length - 1];
                console.log("selected tag page: " + name);
            }
        }
    }
</script>

<style lang="less">
    .ivu-tabs-nav-scroll .ivu-tabs-nav .ivu-tabs-tab{
        padding: 10px 80px;
    }
</style>