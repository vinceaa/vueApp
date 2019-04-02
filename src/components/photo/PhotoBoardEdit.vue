<template>
    <div>
        <h4>board edit!</h4>
        <form action="/photo/type/update" method="post" onsubmit='return false'>
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
            board_update_link: `${domain}/photo/type/update`,
            board_id: '',
            board_content: '',
            domain: `${domain}`,
            
        }
    },
    methods: {
        post_update() {
            axios.post(this.board_update_link, {
                board_id: this.board_id,
                board_content: this.board_content,
            }).then(res => {

                if (res.data.error == '1') {
                    log('没有权限')
                } else {
                    this.$router.push({
                        name: 'PhotoBoardAdmin'
                    })
                }

            }).catch(res => {
                log(' update board 请求失败')
            })
        },
        updateMethod() {
            // log('修改按钮被点击')
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

