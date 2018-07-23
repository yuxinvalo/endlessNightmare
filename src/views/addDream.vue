<template>
    <div id="collapse" class="dream-header">
        <div class="add-dream-part" v-for="(dream, index) in dreams" :key="'dream-degree' + (dreams.length - index)">
            <h3># {{ dream.title }}</h3>
            <p>{{ dream.presentation }}</p>
            <ul v-for="label in dream.labels" class="add-dream-tags">
                <Tag @click.native="chooseTag">{{label}}</Tag>
            </ul>
        </div>
        <Collapse class="ivu-collapse" v-model="value1" accordion>
            <Panel name="1" @click="fatherClick">
                便捷添加梦境
                <div v-show="value1[0]==='1'"  @click.stop="childClick">
                    <tiny-editor v-bind:get-tag="chosenTag"></tiny-editor>
                </div>
            </Panel>
        </Collapse>
    </div>
</template>

<script>
    import {dreams} from "./data/dreamsDegree.js";
    import UploadList from "iview/src/components/upload/upload-list";
    import tinyEditor from "./tinyEditor.vue";

    export default {
        name: "addDream",
        components: {UploadList, tinyEditor},

        data() {
            return {
                dreams: '',
                value1: '0',
                chosenTag: ''
            }

        },
        methods: {
            fatherClick: function(event){
                var currEl = event.currentTarget;
                var el = event.target;
                if(currEl == el){
                    console.log("the same");
                } else {
                    console.log("differed");
                }
            },
            childClick: function(event){
                var currEl = event.currentTarget;
                var el = event.target;
                if(currEl == el){
                    console.log("ch the same");
                } else {
                    console.log("ch differed");
                }
            },
            chooseTag: function (event) {
                var tag = event.currentTarget.innerHTML.replace(/<.+?>/gim,'');
                this.chosenTag = tag;
                console.log("tag event: " + event.currentTarget.innerHTML + " chosenTag = " + this.chosenTag);
            }
        },
        mounted(){
            console.log("add dream and get info from server : ");
            this.$http.get('http://localhost:3000/classification', {}).then(res => {
                this.dreams = res.data;
                console.log(res.data);
            }, error => {
                console.log(error);
            });

        }

    }
</script>

<style lang="less">

    #collapse .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
        height: 100%
    }
    .add-dream-tags{
        display: inline;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .add-dream-part{
        margin-top: 30px;
        padding-bottom:  10px;
    }
    .dream-header{
        text-align: left;
    }
    .dream-header h3{
        font-size: 20px;
    }
    #collapse .ivu-collapse{
        margin-top: 50px;
    }
</style>