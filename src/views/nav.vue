<template>
    <Menu @on-select="routeTo">
        <Submenu name="main">
            <template slot="title">
                <Icon type="heart-broken"></Icon>
                回到主页
            </template>
            <MenuItem name="/">主页</MenuItem>
        </Submenu>
        <Submenu name="1" >
            <template slot="title">
                <Icon type="ios-paper"></Icon>
                梦境管理
            </template>
            <MenuItem name="classA">A类梦境</MenuItem>
            <MenuItem name="classB">B类梦境</MenuItem>
            <MenuItem name="classC">C类梦境</MenuItem>
            <MenuItem name="classD">D类梦境</MenuItem>
            <MenuItem name="classE">E类梦境</MenuItem>
        </Submenu>

        <Submenu name="2">
            <template slot="title">
                <Icon type="pin"></Icon>
                标签管理
            </template>
            <MenuItem name="tagManage">所有标签</MenuItem>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                统计分析
            </template>
            <MenuGroup title="placeholder">
                <MenuItem name="3-1">placeholder</MenuItem>
                <MenuItem name="3-2">placeholder</MenuItem>
                <MenuItem name="3-3">placeholder</MenuItem>
            </MenuGroup>
            <MenuGroup title="placeholder">
                <MenuItem name="3-4">placeholder</MenuItem>
                <MenuItem name="3-5">placeholder</MenuItem>
            </MenuGroup>
        </Submenu>
    </Menu>
</template>

<script>
    import bus from './bus.js';
    export default {
        name: "navigate",
        data(){
            return{

            }
        },
        methods:{
            routeTo(name){
                bus.$emit("selectedMenu", name);
            }
        }
    }
</script>

<style scoped>

</style>