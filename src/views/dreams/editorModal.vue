<template>
    <div class="tiny-editor">
        <div class="tiny-editor-header">
            <label class="tiny-editor-label">修改标题：</label>
            <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input>
            <label class="tiny-editor-add-title">修改日期：</label>
            <DatePicker v-model="dreamingDate" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        </div>

        <div class="tiny-editor-label">
            <label class="tiny-editor-label">修改类别</label>
            <Dropdown @on-click="dropListHandle" style="margin-left: 20px">
                <Button type="primary">
                    {{myDegree}} 类
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

        <mkd ref="getDreamContent"></mkd>
        <Button type="success" long @click="submitQuickDream">SUBMIT</Button>
    </div>
</template>

<script>
    import mkd from './markdownEditor.vue';
    export default {
        name: "editorModal",
        components: {mkd},

    }
</script>

<style scoped>

</style>