<template>
    <div>
        <div class="reply-main" >
            <div class="reply-ceil">
                <div class="c-user-cover">
                    <img :src="userCover">
                </div>
                <div class="reply-content">
                    <label for="label-content">
                        <span class='reply-prompt1'>发表公开评论...</span>
                    </label>
                    <!-- <textarea name="name" v-model='reply_content' @keydown="keyMethod" @focus='focusMethod' @blur='blurMethod' @input='inputMethod' class='reply-input' id='label-content' style='resize: none;'></textarea> -->

                    <!-- 自一个 markdown demo -->

                    <div class="test-main">
                        <pre class='pre1'>&nbsp;</pre>
                        <textarea class='text-content1' v-model='reply_content' 
                        @focus='focusMethod'  @click='focusMethod' @blur='blurMethod'  @input='inputMethod'
                            id='label-content' @keyup='keyupMethod'></textarea>
                    </div>


                    <div class="load-default"></div>
                    <div class="loading1"></div>
                </div>
                <div class="reply-btn-main1">
                    <div class="reply-btn1" @click='addReply'>评论</div>
                    <!-- <div class="cancel-btn" @click='cancelMethod'>取消</div> -->
                    <div class="icon-main cancel-btn" @click="cancelMethod($event, '.cancel-btn', ripple_lista)">
                        <div class='rippleInit' v-for="(e, index) in ripple_lista" :style='troubleStyleRibble' :key='index'></div>
                        取消
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>


<script>
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


import {
    time,
    getPos,
    rippleMethod,
} from '../../../utils/utils'


export default {
    props: ['userCover', 'ifClear'],
    data () {
        return {
            reply_content: '',
            troubleStyleRibble: '',
            ripple_lista: [],
            labelIndex: 0,
            domain: `${domain}`,
            
        }
    },
    methods: {
        focusMethod() {
            log('focusMethod')
            $('.loading1').css({
                transform: `scale3d(1, 1, 1)`,
                opacity: '1',
            })

            $('.reply-btn-main1').css({
                display: 'block',
            })
            const current_length = $('.reply-input').val()
        },
        blurMethod() {
            log('blurMethod')
            $('.loading1').css({
                opacity: '0',
            })
            setTimeout(() => {
                $('.loading1').css({
                    transform: `scale3d(0, 1, 1)`,
                    opacity: '0',
                })
            }, 200)
        },
        inputMethod() {
            const current_length = $('.text-content1').val().length
            // log('输入的长度:', current_length)
            $('.reply-prompt1').css({
                display: 'none',
            })
            if (current_length > 0) {
                $('.reply-btn1').css({
                    opacity: '1',
                })
            } else {
                $('.reply-btn1').css({
                    opacity: '0',
                })
                $('.reply-prompt1').css({
                    display: 'block',
                })
                $('.reply-btn1').css({
                    opacity: '0.5',
                })
            }
        },
        cancelMethod(event, element, ripple_lista) {
            this.troubleStyleRibble = rippleMethod(event, element, ripple_lista, 0, this.troubleStyleRibble)
            setTimeout(() => {
                $('.reply-btn-main1').css({
                    display: 'none',
                })
                this.reply_content = ''
                $('.reply-prompt1').css({
                    display: 'block',
                })
                $('.pre1').html('&nbsp')

            }, 500)
        },        
        addReply() {
            const current_length = $('.text-content1').val().length
            if (current_length > 0) {
                this.$emit('getContent', $('.pre1').html())
                this.reply_content = ''
                $('.reply-prompt1').css({
                    display: 'block',
                })
                $('.pre1').html('&nbsp')
                $('.reply-btn1').css({
                    opacity: '0.5',
                })
            }
            
        },
        keyupMethod() {
            var val = $('textarea').val()
            const new_str = val.split("\n").join('<br>')
            $('.pre1').html(new_str + '&nbsp;')
        },
    },



}
</script>

<style scoped>

@import '../../../../static/css/replyInput.css';
@import '../../../../static/css/markInput.css';
@import '../../../../static/css/replyList/ripple.css';

</style>


