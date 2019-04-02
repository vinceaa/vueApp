
<template>
    <div class="">
        <div class="ceil-main" :style='bg'>
            <div class="inner-wrap" @scroll='scrollMethod' ref='my_dom_inner'>
                <div class="inner-ceil-wrap" ref='my_dom_ceil'>
                    <span v-for='(board, index) in boards'
                    :class="['board-ceil', {board_active: index == active_ceil}]"
                    @click='choose_ceil(index, board._id)'
                    :key='index'>
                        <span v-if="board.board_content">{{board.board_content}}</span>
                        <span v-if="board.pboard_ceil_content">{{board.pboard_ceil_content}}</span>
                    </span>
                </div>
            </div>


            <div class="faden fade-right" :style='fade_bg_right' v-show='if_right_ceil'></div>
            <div class="faden fade-left" :style='fade_bg_left' v-show='if_left_ceil'></div>


            <div class="icon-left" v-show='if_left_ceil'>
                <i class='glyphicon glyphicon-menu-left' @click='moveMethod($event, -1)'></i>
            </div>
            <div class="icon-right" v-show='if_right_ceil'>
                <i class='glyphicon glyphicon-menu-right'  @click='moveMethod($event, 1)'></i>
            </div>
        </div>
    </div>
</template>



<script>

import axios from 'axios'

export default {
    props: [
            'msg1', 
            'boards', 
            'bg', 
            'fade_bg_left', 
            'fade_bg_right',
            'ifCeil',
            'active_ceil',
        ],
    data () {
        return {
            msg: '这是父组件的 msg',
            if_left_ceil: false,
            if_right_ceil: false,
            if_ceil_over: false,
            clear: '',
            // active_ceil: 0,
            get_photo_link: `${domain}/photo/get/photos`,
            left: 0,
        }
    },
    methods: {
        emit_photo_list(board_id, status) {
            // log('index board_id', board_id)
            axios.get(this.get_photo_link, {
                params: {
                    ceil_id: board_id,
                    status,
                }
            }).then(res => {
                // log('获取 photos 成功, 这是给出的响应:', res.data.photos)
                this.$emit('get_photos', res.data.photos)
                this.$emit('change_page', res.data.page_number)
            }).catch(res => {
                log('获取 photos 失败')
            })
        },
        choose_ceil(index, board_id) {

            this.$emit('change_active', index)
            // this.active_ceil = index
            this.$emit('change', index, board_id)
            if (this.ifCeil) {
                // log('是子版块s', index, board_id)
                this.emit_photo_list(board_id, 1)
                this.$emit('change_ceil', index, board_id)
            } else {
                this.left = 0
                this.emit_photo_list(board_id, 0)
            }
        },
        if_show_right() {
            const outer_width = $(this.$refs.my_dom_ceil).width()
            const inner_width = $(this.$refs.my_dom_inner).width()
            // log('判断是否超右', outer_width, inner_width)
            // log('判断是否超右', $('.inner-ceil-wrap'), $('.inner-wrap'))
            if (outer_width > inner_width) {
                // log('超出，显示右栏')
                this.if_right_ceil = true
                this.if_ceil_over = true
            } else {
                this.if_right_ceil = false
                this.if_ceil_over = false
            }
        },
        if_remove_right(left) {

            // const outer_width = $('.inner-ceil-wrap').width()
            // const inner_width = $('.inner-wrap').width()
            const outer_width = $(this.$refs.my_dom_ceil).innerWidth()
            const inner_width = $(this.$refs.my_dom_inner).innerWidth()
            // log('outer_width', outer_width)
            // log('inner_width', inner_width)
            // log('outer_width - inner_width', outer_width - inner_width)
            // log('left', left)
            if (this.if_ceil_over == true) {
                if (outer_width - inner_width <= left + 1) {
                    log('向右滚动到头了')
                    this.if_right_ceil = false
                } else {
                    this.if_right_ceil = true
                }
            }
        },
        scrollMethod(e) {
            const left = e.target.scrollLeft
            this.left = left
            this.if_remove_right(left)
            if (left > 0) {
                this.if_left_ceil = true
            } else {
                this.if_left_ceil = false
            }
        },
        moveMethod(e, status) {
            clearInterval(this.clear)
            const outer_width = $('.inner-ceil-wrap').width()
            const inner_width = $('.inner-wrap').width()
            const parent = $(e.target).closest('.ceil-main')
            var i = 0
            this.clear = setInterval(() => {
                const l = parent.children('.inner-wrap').scrollLeft()
                i += status * 1
                if (status * i < 50) {
                    parent.children('.inner-wrap').scrollLeft(l + 7 * status)
                } else {
                    clearInterval(this.clear)
                }
            }, 1)
        }
    },
    created() {
        setTimeout(() => {
            this.if_show_right()
        }, 1000)
    },
    updated() {
        setTimeout(() => {
            // this.if_show_right()
            this.if_remove_right(this.left)
            
        }, 1000)
    }
}
</script>

<style scoped>
@import '../../../../static/css/board/board.css';
</style>


