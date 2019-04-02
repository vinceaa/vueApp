<template>
    <div class="reply-main">
        <div class="reply-ceil">
            <div class="c-user-cover">
                <img :src="userCover">
            </div>
            <div class="reply-content">
                <label :for="`label-content${labelIndex}`">
                    <span class='reply-prompt' :style='prompt_style' v-show='if_prompt'>发表公开评论...</span>
                </label>

                <div class="test-main">
                    <!-- <pre v-html='html_data'>&nbsp;</pre> -->
                    <pre v-html='html_data' class='test_data'></pre>
                    <!-- id 接收: <span v-if='replyIdEmit'>{{replyIdEmit}}</span> -->
                    <textarea class='text-content' v-model='reply_content'
                    @focus='focusMethod' @blur='blurMethod' @input='inputMethod'
                        :id='`label-content${labelIndex}`' @keyup='keyupMethod'></textarea>
                </div>


                <div class="load-default"></div>
                <div class="loading" :style='loading_style'></div>
            </div>
            <div class="reply-btn-main" :style='btn_style'>
                <div class="reply-btn" :style='r_btn_style' @click='go_reply'>评论</div>
                <div class="cancel-btn icon-main" @click="cancelMethod($event, '.cancel-btn', ripple_lista)">
                    <div class='rippleInit' v-for="(e, index) in ripple_lista" :style='troubleStyleRibble' :key='index'></div>
                    取消
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

import {
    time,
    getPos,
    rippleMethod,
} from '../../../utils/utils'

export default {
    props: ['userCover', 'ifClear', 'replyIdEmit', 'topicIns', 'labelIndex', 'if_show_reply', 'loading_style'],
    data () {
        return {
            msg: '这是 template',
            reply_content: '',
            // loading_style: '',
            btn_style: '',
            r_btn_style: '',
            prompt_style: '',
            html_data: '&nbsp;',
            testDate: 'gagahha',
            reply_to_post_link: `${domain}/reply/api/replyto`,
            ripple_lista: [],
            troubleStyleRibble: '',
            if_prompt: true,
            domain: `${domain}`,
            
            
        }
    },
    methods: {
        focusMethod() {
            //   **
            // this.loading_style = {
            //     transform: `scale3d(1, 1, 1)`,
            //     opacity: '1',
            // }
            this.$emit('focusMethod')




            this.btn_style = {
                display: 'block',
            }
            // const current_length = $('.reply-input').val()
            // const current_length = this.reply_content

        },
        blurMethod() {
            this.$emit('blurMethod')
            

            // this.loading_style = {
            //     opacity: '0',
            //     transform: `scale3d(1, 1, 1)`,
            // }
            // setTimeout(() => {
            //     this.loading_style = {
            //         transform: `scale3d(0, 1, 1)`,
            //         opacity: '0',
            //     }
            // }, 200)
        },
        inputMethod() {
            const current_length = this.reply_content.length


            this.prompt_style = {
                display: 'none',
            }
            if (current_length > 0) {

                this.r_btn_style = {
                    opacity: '1',
                }
            } else {

                this.prompt_style = {
                    display: 'block',
                }

                this.r_btn_style = {
                    opacity: '0.5',
                }
            }
        },
        // cancelMethod() {
        //     log('取消按钮被点击')
        //     this.$emit('close_reply')
        //     this.btn_style = {
        //         // display: 'none',
        //         display: 'block',

        //     }
        //     this.reply_content = ''

        //     this.prompt_style = {
        //         display: 'block',
        //     }
        //     this.html_data = '&nbsp'
        // },

        cancelMethod(event, element, ripple_lista) {
            // log('取消按钮被点击')
            this.$emit('cancelMethod')
            this.troubleStyleRibble = rippleMethod(event, element, ripple_lista, 0, this.troubleStyleRibble)
            setTimeout(() => {
                this.$emit('close_reply')
                
                this.btn_style = {
                    // display: 'none',
                    display: 'block',

                }
                this.reply_content = ''

                this.prompt_style = {
                    display: 'block',
                }
                this.html_data = '&nbsp'

            }, 600)            

        },
        addReply() {
            // log('评论按钮被点击')
            // this.$emit('getContent', $('pre').html())
            this.$emit('getContent', this.html_data)
            
            this.reply_content = ''

            this.prompt_style = {
                display: 'block',
            }
            this.html_data = '&nbsp'
            

        },
        keyupMethod() {
            // var val = $('textarea').val()
            var val = this.reply_content
            const new_str = val.split("\n").join('<br>')
            this.html_data = new_str + '&nbsp;'
        },
        post_reply_to(reply_to_content, reply_id, topic_id, author_id) {
            // log('reply to 进行')
            axios.post(this.reply_to_post_link, {
                reply_to_content,
                reply_id,
                topic_id,
                author_id,
            }).then(res => {
                // log('reply to 成功拿得到响应:', res.data)
                const if_redirect = res.data.if_redirect
                if (if_redirect == true) {
                    this.$router.push({
                        name: 'UserLogin',
                        query: {
                            next_url: res.data.next_url,
                        }
                    })
                } else {
                    this.replys = res.data.replys
                    this.reply_content = ''
                    this.$emit('data_update')
                }
            }).catch(res => {
                log('post 回复失败')
            })
        },        
        go_reply() {
            const current_length = this.reply_content.length
            if (current_length > 0) {
                this.post_reply_to(this.html_data, this.replyIdEmit, 
                this.topicIns.topic._id, this.topicIns.get_author._id)
                this.html_data = '&nbsp'
                this.r_btn_style = {
                    opacity: '0.5',
                }
                // this.prompt_style = {
                //     display: 'block',
                // }
   
                
                setTimeout(() => {
                    this.prompt_style = {
                        display: 'block',
                    }
                }, 300)
            }
        },
    },
}
</script>

<style scoped>

@import '../../../../static/css/replyList/demo.css';
@import '../../../../static/css/replyList/markInput.css';
@import '../../../../static/css/replyList/replyActive.css';
@import '../../../../static/css/replyList/replyInput.css';
@import '../../../../static/css/replyList/ripple.css';

</style>


