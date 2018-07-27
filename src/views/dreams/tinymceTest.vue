<style lang="less">
    @import '../../styles/loading.less';
</style>
<!--MB I give up!!!-->
<template>
    <div id="editor">
        <textarea :value="input" @input="update"></textarea>
        <div v-html="compiledMarkdown"></div>
    </div>
</template>

<script>
    import './lodash.js';
    import marked from './marked.js';
    export default {
        name: "tinymceTest",
        data: {
            input: '# hello'
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.input, {sanitize: true})
            }
        },
        methods: {
            update: _.debounce(function (e) {
                this.input = e.target.value
            }, 300)
        }
    }
</script>

<style>

</style>
