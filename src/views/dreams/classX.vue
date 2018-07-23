<style scoped lang="less">
    .dream-tags{
        display: inline-block;
        margin-top: 5px;
    }

    .part-article{
        font-family: 'FZLT2';
        float: left;
    }
    .part-article h4{
        font-size: 30px;
        float: left;
    }
    .article-date{
        font-size: 12px;
        color: #999999;
        padding: 5px 0px;
        float: right;
    }
    .article-tags{
        float: left;
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
            <h4>{{article.title}}</h4>
            <p class="article-date">记录时间：{{article.date}}</p>
            <div class="article-tags">
            梦境标签：
            <ul v-for="label in article.labels" class="dream-tags">
                <Tag @click.native="chooseTag">{{label}}</Tag>
            </ul>
            </div>
            <br><br>
            <div class="ivu-modal-content">
                <p>{{article.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {dreamsArticles} from '../data/dreamsDegree.js';
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
                dreamType : this.selected
            }
        },
        mounted(){
            console.log("dream type : " + dreamsArticles[0].title);
            this.onChangeContent();
        },
        methods:{
            onChangeContent(){
                if(this.dreamType === "classA"){
                    this.title = "classA";
                    for (var i =0; i < dreamsArticles.length; ++i){
                        console.log("tags: " + dreamsArticles[i].labels);
                        if(dreamsArticles[i].classification == 'A'){
                            this.articles.push(dreamsArticles[i]);
                        }
                    }
                    console.log("A article number: " + this.articles.length);

                } else if(this.dreamType === "classB"){
                    this.title = "classB"
                    for (var i =0; i < dreamsArticles.length; ++i){
                        if(dreamsArticles[i].classification == 'B'){
                            this.articles.push(dreamsArticles[i]);
                        }
                    }
                    console.log("B articles: " + this.articles.length);

                } else if(this.dreamType === "classC"){
                    this.title = "classC"
                    for (var i =0; i < dreamsArticles.length; ++i){
                        if(dreamsArticles[i].classification == 'C'){
                            this.articles.push(dreamsArticles[i]);
                        }
                    }
                    console.log("C articles: " + this.articles.length);

                } else if(this.dreamType === "classD"){
                    this.title = "classD"
                } else if(this.dreamType === "classE"){
                    this.title = "classE"
                }
            }
        }

    }
</script>

