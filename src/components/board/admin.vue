<template>
    <div>
        <div class="add-main">
            <div class="add">
                <input class='add-input' v-model='new_board' type="input" name="board_content" placeholder="请输入你要添加的板块">
                <button class="btn-add" @click='addMethod'>新增一个板块</button>
            </div>
        </div>
        <ul>
        <div class="load">
            <div v-for="(board, index) in boards" class="load-cell" :key="index">
                <li>{{ board.board_content }}
                    <a class="remove-main" data-id="board._id" @click='deleteMethod(board._id)'>删除</a>
                    <!-- <a href="/board/edit?board_id=board._id" @click='editMethod(board._id)'>编辑</a> -->
                    <router-link :to="{name: 'BoardEdit', query: {board_id: board._id}}">编辑</router-link></li>
                <br>
            </div>
        </div>

        </ul>
        <router-link to="/topic">返回主页</router-link>

    </div>
</template>


<script>
import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是 board admin 页面！',
            board_link: `${domain}/board`,
            delete_link: `${domain}/board/api/delete?board_id=`,
            add_link: `${domain}/board/api/add`,
            boards: '',
            new_board: '',
        }
    },
    methods: {
        get_board() {
            // log('get_board')
            axios.get(this.board_link).then(res => {
                // log('请求 board admin 页面成功! 这是给出的响应:', res.data)
                this.boards = res.data.boards

            }).catch(res => {
                log('解析 board admin  失败')
            })
        },
        delete_board(board_id) {
            axios.get(this.delete_link + board_id).then(res => {
                // log('请求 delete_board  页面成功! 这是给出的响应:', res.data)
                this.boards = res.data

            }).catch(res => {
                log('解析delete_board 失败')
            })
        },
        add_board() {
            axios.post(this.add_link, {
                board_content: this.new_board
            }).then(res => {
                this.boards = res.data

            }).catch(res => {
                log('解析 add_board 失败')
            })
        },
        deleteMethod(board_id) {
            // log('删除按钮被点击！', board_id)
            this.delete_board(board_id)
        },
        addMethod() {
            // log('新增按钮被点击')
            this.add_board()
        },
    },
    created() {
        this.get_board()
    }
  
}
</script>

<style scoped>

</style>


