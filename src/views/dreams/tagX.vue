<template>
    <div>
        <ul v-for="label in labels" class="add-dream-tags">
            <Tag type="border" closable color="#003300">{{label}}</Tag>
        </ul>
        <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
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
                labelId: ''
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
                            this.labelId =  res.data[i]._id;
                        }
                    }
                    console.log("TagX----onChangeContent---tags and type : " + type + ' | ' + this.labels);
                }, error => {
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
                                placeholder: 'Please enter your a new label'
                            },
                            on: {
                                input: (val) => {
                                    this.newLabel = val;
                                }
                            }
                        })
                    }
                });
                console.log("new label : " + this.newLabel);
                this.labels.push(this.newLabel);
                let queryData = {
                    doAction: "add",
                    labelId: this.labelId,
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
                )
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