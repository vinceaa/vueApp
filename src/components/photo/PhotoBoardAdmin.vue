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
                    <router-link :to="{name: 'PhotoBoardEdit', query: {board_id: board._id}}">编辑</router-link></li>
                <br>
            </div>
        </div>

        </ul>
        <!-- board_id: {{board_id}} -->
        <select v-model='board_id'>
            <option v-for="(board, index) in boards" :key='index' :value="board._id">{{board.board_content}}</option>
        </select>
        <input type="input" v-model='ceil_board'>
        <button @click='ceilMethod'>新增一个子版块做测试</button>
        <br>
        <div class='load-wrap'>
            <div v-for="(board, index) in boards" class="load-cell" :key="index">
                <a @click='chooseMethod(board._id)'>{{ board.board_content }}</a>
            </div>
        </div>

        <div class="load">
            <div v-for="(board, index) in boards_ceil" class="load-cell" :key="index">
                <li>{{ board.board_content }}：{{board.pboard_ceil_content}}
                    <a class="remove-main" data-id="board._id" @click='deleteMethod_ceil(board._id)'>删除</a>
                    <a class="remove-main" data-id="board._id" @click='editMethod(board._id, index)'>编辑</a>
                    <div class='edit-ceil' v-show='board.ifShow'>
                        <input type="input" v-model='boards_ceil[index].new_ceil'>
                        <button @click='updateMethod(board._id, boards_ceil[index].new_ceil)'>确认</button>
                    </div>
                </li>
                <br>
            </div>
        </div>


        
        <ul class="pagination pagination-sm">
            <li>
                <a @click='grpupMethod(pre_id)' aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-for="(i, index) in page_number" :class='{active: i - 1 == group_id}' :key='index'>
                <a @click='grpupMethod(i - 1)' aria-label="Previous">
                    {{i}}
                </a>
            </li>
            <li>
                <a @click='grpupMethod(next_id)' aria-label="Previous">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
        <router-link to="/photo">返回主页</router-link>
        <!-- <div v-for="(e, index) in ifList" :key='index'>
            {{e.name}}
        </div> -->

    </div>
</template>


<script>
import axios from 'axios'
import Vue from 'vue'

export default {
    data () {
        return {
            test: {
                name: 'vin'
            },
            msg: '这是 board admin 页面！',
            board_link: `${domain}/photo/type`,
            delete_link: `${domain}/photo/type/api/delete?board_id=`,
            delete_link_ceil: `${domain}/photo/type/ceil/api/delete`,
            update_link_ceil: `${domain}/photo/type/ceil/api/update`,
            add_link: `${domain}/photo/type/api/add`,
            add_link_ceil: `${domain}/photo/type/ceil/api/add`,
            boards: '',
            boards_ceil: '',
            board_id: 1,
            ceil_board: '',
            new_board: '',
            domain: `${domain}`,
            group_id: '',
            page_number: '',
            pre_id: '',
            next_id: '',
            ceil_id: '',
            current_ceil_id: '',


            
        }
    },
    methods: {
        get_board() {
            // log('初始 get this.board_link:', this.board_link)
            axios.get(this.board_link).then(res => {
                log('get_board 给出的响应:', res.data)
                const datas = res.data
                this.boards = res.data.boards
                this.boards_ceil = res.data.boards_ceil
                // log('boards_ceil:', this.boards_ceil)
                if (this.boards_ceil != undefined) {
                    this.boards_ceil.map((e) => {
                        // log('e:', e)
                        e.ifShow = false
                    })
                }
 
                this.board_id = this.boards[0]._id
                this.group_id = datas.group_id
                this.page_number = datas.page_number
                this.pre_id = datas.pre_id
                this.next_id = datas.next_id
                this.current_ceil_id = datas.current_ceil_id

            }).catch(res => {
                log('解析 board admin  失败')
            })
        },
        delete_board(board_id) {
            axios.get(this.delete_link + board_id).then(res => {
                if (res.data.error == '1') {
                    log('没有权限')
                } else {
                    this.boards = res.data
                    log('请求 delete_board  页面成功! 这是给出的响应:', res.data)
                }

            }).catch(res => {
                log('解析delete_board 失败')
            })
        },
        delete_board_ceil(board_id) {
            axios.get(this.delete_link_ceil, {
                params: {
                    ceil_id: board_id
                }
            }).then(res => {
                if (res.data.error == '1') {
                    log('没有权限')
                } else {
                    this.get_board()
                }

            }).catch(res => {
                log('解析delete_board 失败')
            })
        },
        add_board() {
            axios.post(this.add_link, {
                board_content: this.new_board
            }).then(res => {
                if (res.data.error == '1') {
                    log('没有权限')
                } else {
                    this.boards = res.data
                }
            }).catch(res => {
                log('解析 add_board 失败')
            })
        },
        add_board_ceil() {
            axios.post(this.add_link_ceil, {
                pboard_ceil_content: this.ceil_board,
                pboard_id: this.board_id,
            }).then(res => {
                // log('新增子版块成功, 这是给出的响应:', res.data)
                if (res.data.error == '1') {
                    log('没有权限')
                } else {
                    // this.boards_ceil = res.data
                    this.get_board()
                    
                }                
            }).catch(res => {
                log('新增子版块失败')
            })
        },
        deleteMethod(board_id) {
            // log('删除按钮被点击！', board_id)
            this.delete_board(board_id)
        },
        deleteMethod_ceil(board_id) {
            this.delete_board_ceil(board_id)
        },
        editMethod(board_id, index) {
            const new_dicta = Object.assign(this.boards_ceil[index], {
                ifShow: !this.boards_ceil[index].ifShow
            })
            Vue.set(this.boards_ceil, index, new_dicta)
        },

        updateCeil(data) {
            axios.post(this.update_link_ceil, data).then(res => {
                log('update ceil 成功, 这是给出的响应:', res.data)
                this.get_board()
            }).catch(res => {
                log('update 失败')
            })
        },
        updateMethod(ceil_board_id, content) {
            log('是否加了 model:', ceil_board_id, content)
            const data = {
                ceil_id: ceil_board_id,
                pboard_ceil_content: content
            }
            this.updateCeil(data)
        },
        
        addMethod() {
            this.add_board()
        },
        ceilMethod() {
            log('子版块新增被点击', this.ceil_board, this.board_id)
            this.add_board_ceil()
        },
        chooseBoard(board_id) {
            this.$router.push({
                name: 'PhotoBoardAdmin',
                query: {
                    ceil_id: board_id
                }
            })

            this.board_link = `${domain}/photo/type?ceil_id=${board_id}`
            this.get_board()
        },
        chooseMethod(board_id) {
            // log('选择板块按钮被点击', board_id)
            this.chooseBoard(board_id)
        },
        grpupMethod(group_id) {
            // log('this.current_ceil_id:', this.current_ceil_id)
            if (this.current_ceil_id == '') {
                // log('翻页，没有分类 id')
                this.board_link = `${domain}/photo/type?group_id=${group_id}`
            } else {
                // log('翻页，有分类 id:', this.current_ceil_id)
                this.board_link = `${domain}/photo/type?ceil_id=${this.current_ceil_id}&group_id=${group_id}`
            }
            this.get_board()
        },
    },
    created() {
        this.$emit('removeHeader')
        const ceil_id = this.$route.query.ceil_id
        // log('ceil_id', ceil_id)
        if (ceil_id == '' || ceil_id == undefined) {
            this.board_link = `${domain}/photo/type`
        } else {
            this.board_link = `${domain}/photo/type?ceil_id=${ceil_id}`
        }
        log('created this.board_link', this.board_link)
        this.get_board()
    }
  
}
</script>

<style scoped>
.edit-ceil {
    display: inline;
}

a {
    cursor: pointer;
    text-decoration: none;
}

.load-wrap {
    /* border: 1px solid black; */
    position: relative;
    height: 40px;
    display: inline-block;
    margin-left: 20px;
    margin-top: 40px;
}

.load-ceil {
    position: relative;
    display: inline-block;
}

.load-ceil li {
    list-style: none;
    display: inline;
}

.load-cell {
    display: inline;
    margin-right: 20px;
}
</style>


