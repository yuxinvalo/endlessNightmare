<style scoped lang="less">
    .dream-tags{
        display: inline-block;
        margin-top: 5px;
    }

    .part-article{
        font-family: 'FZLT2';
        /*float: left;*/
    }
    .part-article h4{
        font-size: 30px;
        /*float: left;*/
    }
    .article-date{
        font-size: 12px;
        color: #999999;
        padding: 5px 0px;
        /*float: right;*/
    }
    .article-tags{
        /*float: left;*/
        padding-left: 50px;
    }
    .ivu-article ul:not([class^=ivu-]){
        padding-left: 0px;
    }
    .ivu-article {
        margin-top: 20px;
    }
    .ivu-modal-content{
        text-align: left;
    }

</style>
<template>
    <div class="part-article">
        <h3><strong>{{selected}}</strong></h3>
        <div v-for="article in articles" class="ivu-article">
            <hr>
            <div class="article-header">
            <h4>{{article.title}}</h4>
            <p class="article-date">记录时间：{{parseDate(article.dreamDate)}}</p>
            <br/>
            <div class="article-tags">
            梦境标签：
            <ul v-for="label in article.labels" class="dream-tags">
                <Tag @click.native="chooseTag">{{label}}</Tag>
            </ul>
            </div>
            </div>
            <br/>
            <div class="ivu-modal-content">
                <p>{{article.content}}</p>
            </div>
            <br/>
            <div class="article-manager">
                <ButtonGroup>
                    <Button type="ghost" @click="editArticle(article._id)">Edit</Button>
                    <Button type="ghost" @click="deleteArticle(article._id)">Delete</Button>
                </ButtonGroup>
            </div>
        </div>
    </div>
</template>

<script>
    //import {dreamsArticles} from '../data/dreamsDegree.js';
    export default {
        name: "classX",
        props:{
            selected:{
                type: String
            }
        },
        watch:{
            'selected' : function (dreamType) {
                console.log("content change: " + dreamType);
                this.dreamType = dreamType;
                this.articles = [];
                console.log("articles length is : " + this.articles.length);
                this.onChangeContent();
            }
        },
        data(){
            return{
                title: '',
                articles: [],
                dreamType : this.selected,
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
                this.getXArticles(this.dreamType[this.dreamType.length-1]);
            },
            getXArticles(type){
                console.log("TYPE : " + type);
                this.$http.get('http://localhost:3000/articles',
                    { params : { type : type }}).then(res => {
                    this.articles = res.data;
                    console.log(res.data);
                }, error => {
                    console.log(error);
                });
            },
            parseDate(date){
                return date.match(/(\S*)T/)[1];
            },
            chooseTag: function (event) {
                var tag = event.currentTarget.innerHTML.replace(/<.+?>/gim,'').replace(/(^\s*)|(\s*$)/g, "");

                for(var i = 0; i < this.articles.length; ++i){
                    var hasTag = false;
                    for(var j = 0; j < this.articles[i].labels.length; ++j){
                        console.log("i = " + i + ' | j = ' + j);
                        console.log(this.articles[i].labels[j] + " | " + tag);
                        if (this.articles[i].labels[j] === tag){
                            hasTag = true;
                        }
                    }
                    if(hasTag == false){
                        console.log("false " + i);
                        this.articles.splice(i, 1);
                    }
                }
            },
            editArticle(id){
                console.log("get article id : " + id);
                var article = null;
                for(var i = 0; i < this.articles.length; ++i){
                    if (id === this.articles[i]._id){
                        article = this.articles[i];
                    }
                }
                console.log(article);
                // HOW TO DEFINE EDITOR?
            },
            deleteArticle(id){
                console.log("DELETE article id : " + id);
                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>是否删除本篇梦境？</p>',
                    onOk: () => {
                        let managerData = {
                            "doAction": 'DELETE',
                            "articleId": id
                        }
                        console.log(managerData);
                        this.$http.post('http://localhost:3000/articles', managerData, {emulateJSON:true}).then(
                            res => {
                                console.log(" DELETE message from server : " + res.data.msg);
                                if (res.data.msg === 'success') {
                                    this.$Message.success('DELETE dream ' + id + ' successfully.');
                                    this.onChangeContent();
                                }
                            }, error => {
                                this.$Message.error("Can't delete this dream : " + error );
                            });
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });

            },
        }

    }
</script>

