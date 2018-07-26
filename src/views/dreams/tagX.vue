<template>
    <div>
        <div class="ivu-article">
            <p>{{presentation}}</p>
            <br/>
            <br/>
        </div>
        <Tag v-for="label in labels" :key="label" :name="label" class="add-dream-tags"
             type="border" closable color="#003300" @on-close="deleteTag" @click.native="editTag">{{label}}</Tag>
        <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>

        <Alert type="error" show-icon v-show="ifConnection">
            An error prompt
            <span slot="desc">
            I can't communicate with server, please check the server state.
        </span>
        </Alert>
    </div>
</template>

<script>
    export default {
        name: "TagX",
        props:{
            selected:{
                type: String
            }
        },
        data(){
            return{
                selectedType : "A",
                labels:[],
                presentation: '',
                newLabel: '',
                classId: '',
                ifConnection: false,
            }
        },
        watch:{
            'selected' : function (tagType) {
                console.log("content change: " + tagType);
                this.selectedType = tagType;
                this.labels = [];
                this.presentation = '';
                this.onChangeContent();
            }
        },
        created(){
            this.onChangeContent();
        },
        mounted(){
            this.onChangeContent();
        },
        methods:{
            onChangeContent(){
                var type = this.selectedType[this.selectedType.length - 1];
                console.log("type : " + type + " selectedType " + this.selectedType);
                this.$http.get('http://localhost:3000/classification', {}).then(res => {
                    for(var i = 0; i < res.data.length; ++i){
                        if(type === res.data[i].title[0]){
                            this.labels = res.data[i].labels;
                            this.presentation = res.data[i].presentation;
                            this.classId =  res.data[i]._id;
                        }
                    }
                    console.log("TagX----onChangeContent---tags and type : " + type + ' | ' + this.labels);
                }, error => {
                    this.ifConnection = true;
                    console.log(error);
                });
            },

            //Add label method
            handleAdd () {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.newLabel,
                                autofocus: true,
                                placeholder: 'Please enter your new label'
                            },
                            on: {
                                input: (val) => {
                                    if(!val){
                                        this.$Message.info('不能为空值!');
                                        return;
                                    }
                                    this.newLabel = val;
                                }
                            }
                        })
                    },
                    onOk: () => {
                        console.log("new label : " + this.newLabel);
                        this.labels.push(this.newLabel);
                        let queryData = {
                            doAction: "add",
                            classId: this.classId,
                            label: this.newLabel
                        }
                        console.log("add query : " + queryData);
                        this.$http.post("http://localhost:3000/classification", queryData, {emulateJSON:true}).then(
                            res => {
                                console.log("message from server : " + res.data.msg);
                                if(res.data.msg === 'success'){
                                    this.$Message.success('Save label successfully.');
                                }
                            }, error => {
                                this.$Message.error("Can't save this label : " + error );
                            }
                        );
                    },
                });

            },
            deleteTag (event, name) {
                var chosenTag = name;
                console.log("tag : " + chosenTag);
                const content = "<p>正在删除 ‘</p>" + chosenTag +"’ 标签， 点击确定删除。";
                this.$Modal.confirm({
                    title: "删除标签",
                    content: content,
                    onOk: () =>{
                        let queryData = {
                            doAction: "delete",
                            classId: this.classId,
                            label: chosenTag
                        }
                        this.$http.post("http://localhost:3000/classification", queryData, {emulateJSON:true}).then(
                            res => {
                                console.log("message from server : " + res.data.msg);
                                if(res.data.msg === 'success'){
                                    this.$Message.success('Delete label successfully.');
                                    this.labels.splice(this.labels.indexOf(name), 1);
                                }
                            }, error => {
                                this.$Message.error("Can't delete this label : " + error );
                            }
                        );
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            },
            editTag(event, name){
                var chosenTag = event.target.innerText;
                console.log("update name: " + name + " | " + chosenTag);
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.newLabel,
                                autofocus: true,
                                placeholder: 'Please enter your new label'
                            },
                            on: {
                                input: (val) => {
                                    if(!val){
                                        this.$Message.info('不能为空值!');
                                        return;
                                    }
                                    this.newLabel = val;
                                }
                            }
                        })
                    },
                    onOk: () => {
                        console.log("new label : " + this.newLabel);
                        this.labels.push(this.newLabel);
                        let queryData = {
                            doAction: "update",
                            classId: this.classId,
                            label: chosenTag,
                            newLabel: this.newLabel
                        }
                        console.log("add query : " + queryData);
                        this.$http.post("http://localhost:3000/classification", queryData, {emulateJSON:true}).then(
                            res => {
                                console.log("message from server : " + res.data.msg);
                                if(res.data.msg === 'success'){
                                    this.$Message.success('Update label successfully.');
                                    this.labels[this.labels.indexOf(chosenTag)] = this.newLabel;
                                }
                            }, error => {
                                this.$Message.error("Can't update this label : " + error );
                            }
                        );
                    },
                })
            },
            //I want to assign a random color to each tag, but the "color" property can't resolve a method = =/
            //Well just digging a hole here...
            getColor(){
                var colorPool = [
                    "#660066",
                    "#663366",
                    "#006666",
                    "#993366",
                    "#333333",
                    "#006633",
                    "#B7B7B7",
                    "#666699",
                    "#cc3333",
                    "#003300"
                ];

                var random = Math.round(Math.random() * colorPool.length);
                return colorPool[random];
            }
        }
    }
</script>

<style scoped>

</style>