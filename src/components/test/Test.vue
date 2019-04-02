<template>
    <div>
        这是测试页面
        {{  msg  }}
    </div>
</template>

<script>

import axios from 'axios'

const log = console.log.bind(console)

export default {
    data () {
        return {
            msg: '这是一条 msg!',
            value: '',
            // api_link: `${API_PROXY}http://0.0.0.0:4000/topic/api/test`,
            // api_link: `${API_PROXY}http://www.bing.com/HPImageArchive.aspx?format=js&idx=1&n=1`,
            // api_link: `${API_PROXY}http://localhost:4000/topic`,
            // api_link: `${API_PROXY}http://localhost:4000/topic/api/test`,
            // api_link: `http://localhost:4000/topic/api/test`,
            api_link: `${domain}/topic/api/test`,
            domain: `${domain}`,
            
            
            
        }
    },
    methods: {
        get_api_value() {
            axios.get(this.api_link).then(res => {
                // log('这是给出的响应:', res)
            }).catch(res => {
                log('解析失败')
            })
        }        
    },
    created () {
        // log('this.value 前', this.value)
        this.get_api_value()
        // log('this.value 后', this.value)
    }

}
</script>


<style scoped>

</style>


