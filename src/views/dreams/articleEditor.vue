<template>
    <div class="tiny-editor">
        <div class="tiny-editor-header">
            <label class="tiny-editor-label">添加标题：</label>
            <Input v-model="title" style="width: 300px"></Input>
            <label class="tiny-editor-add-title">添加日期：</label>
            <DatePicker v-model="dreamingDate" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        </div>
        <div class="tiny-editor-label">

        </div>
        <div class="tiny-editor-label">
            <label class="tiny-editor-label">选择类别</label>
            <Dropdown @on-click="dropListHandle" style="margin-left: 20px">
                <Button type="primary">
                    {{classification}} 类
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="a">A 类</DropdownItem>
                    <DropdownItem name="b">B 类</DropdownItem>
                    <DropdownItem name="c">C 类</DropdownItem>
                    <DropdownItem name="d">D 类</DropdownItem>
                    <DropdownItem name="e">E 类</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="tiny-editor-add-tags">
            <label>添加标签：</label> <!--接受tag时候有bug， 接受5次是什么鬼-->
            <Tag v-for="tag in labels" :key="tag" :name="tag" closable @on-close="handleClose">{{tag}}</Tag>
        </div>

        <br/><br/>
        <div class="ivu-input-wrapper">
            <Input class="ivu-input" v-model="content" type="textarea" :rows="10"></Input>
        </div>

        <Alert type="error" v-if="showAlert">要写完哟....</Alert>
        <div class="button"><Button type="success" long @click="submitQuickDream">SUBMIT</Button></div>

    </div>
</template>

<script>
    export default {
        name: "articleEditor",
        props:{
            selectedId: {
                type: String
            }
        },
        data: function(){
            return {
                title: this.selectedId,
                classification: 'placeholder',
                dreamingDate: '',
                labels: ['placeholder1', 'placeholder2'],
                content: '',
                spinShow: true,
                showAlert: false,
            }
        },
        methods: {
            handleClose (event, name) {
                const index = this.myTags.indexOf(name);
                this.myTags.splice(index, 1);
                console.log("slice a tag:" + this.myTags);
            },
            submitQuickDream(){
                //I CHEAT HERE TO GET CONTENT OF MARKDOWN EDITOR :)
                var content = document.getElementsByClassName("CodeMirror cm-s-paper CodeMirror-wrap");
                this.dreamContent = content[0].innerText;
                if(this.dreamingDate != '' && this.value != '' && this.myDegree != '' && this.myTags != []){
                    console.log("submit a dream:" + this.value + " | " + new Date(this.dreamingDate).toString() + " | myDegree: " + this.myDegree + " | myTags: " + this.myTags);
                    //I can not send directly a list, so I just stringy it..
                    var myTags = '';
                    for(var i =0; i < this.myTags.length; ++i){
                        myTags += this.myTags[i].replace(/(^\s*)|(\s*$)/g, "");
                        myTags += ' ';
                    }
                    let dataTosend = {
                        "title" : this.value,
                        "dreamDate" : new Date(this.dreamingDate).toString(),
                        "classification": this.myDegree,
                        "labels" : myTags,
                        "content" : this.dreamContent
                    };
                    //WC 这里有个BUG，发送服务端的data少了时间是怎么回事？
                    console.log("data is " + JSON.stringify(data));
                    this.$http.post("http://localhost:3000/addDream", dataTosend,{emulateJSON:true}).then(res => {
                        console.log(" message from server : " + res.data.msg);
                        if(res.data.msg === 'success'){
                            this.$Message.success('Save dream successfully.');
                        }
                    }, error => {
                        this.$Message.error("Can't save this dream : " + error );
                    });
                } else {
                    console.log("submit a dream:" + this.value + " | " + this.dreamingDate + " | myDegree: " + this.myDegree + " | myTags: " + this.myTags);
                    this.showAlert = true;
                    return;
                }

            },
            dropListHandle: function(name){
                if(name === 'a'){
                    this.myDegree = 'A';
                } else if(name === 'b'){
                    this.myDegree = 'B';
                } else if(name === 'c'){
                    this.myDegree = 'C';
                }else if(name === 'd'){
                    this.myDegree = 'D';
                }else{
                    this.myDegree = 'E';
                }
            },
        },
        mounted(){
            console.log("from sub component: id " + this.selectedId);
        }
    }
</script>

<style lang="less">
    .ivu-btn-success{
        margin-top: 200px;
    }
    .tiny-editor{
        margin: 20px;
    }

</style>