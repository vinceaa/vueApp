<template>
    <div>
        <h4>board edit!</h4>
        <form action="/board/update" method="post" onsubmit='return false'>
            {{  board_id  }}
            <input type="input" v-model='board_content'>
            <button @click='updateMethod'>修改</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是 board edit 页面！',
            board_update_link: `${domain}/board/update`,
            board_id: '',
            board_content: '',
        }
    },
    methods: {
        post_update() {
            axios.post(this.board_update_link, {
                board_id: this.board_id,
                board_content: this.board_content,
            }).then(res => {
                // log(' update board 请求成功, 这是响应', res.data)
                this.$router.push({
                    name: 'Board'
                })

            }).catch(res => {
                log(' update board 请求失败')
            })
        },
        updateMethod() {
            log('修改按钮被点击')
            this.post_update()
        }
    },
    created() {
        this.board_id = this.$route.query.board_id
    }
}
</script>

<style scoped>

</style>

