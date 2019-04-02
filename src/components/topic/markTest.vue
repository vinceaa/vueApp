<template>
    <div>
        <!-- <div v-html="data"></div> -->
        <mavon-editor
            placeholder=' '
            defaultOpen="edit"
            :subfield='true'
            :toolbarsFlag='false'
            @change='dataMethod'
             />
        <button @click='dataMethod'>拿到数据</button>
    </div>
</template>

<script>
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

export default {
    data () {
        return {
            value: '',
            data: '',
            domain: `${domain}`,
            
        }
    },
    methods: {
        dataMethod(value, render) {
            this.data = render
        },
        clickMethod() {
            // log('被点击', $('textarea'))
        }
    },
    created() {
        $('div').on('focus', 'textarea', function(e) {
            log('获取焦点')
        })

        $('div').on('blur', 'textarea', function(e) {
            log('失去焦点')
        })

        $('div').on('input', 'textarea', function(e) {
            log('正在输入')
        })
    }
}
</script>

<style scoped>

</style>


