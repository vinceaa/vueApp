<template>
    <div>
        <div class="input-compa" v-cloak>
            <reply-main style='width: 70%; padding-top: 0; padding-bottom: 0;' outerReply='outer-reply' :labelIndex='labelIndex' :main_content='main_content' :topicIns='topicIns' @data_update='data_update'>
                <!-- 这里的 template 只是为了让这个标签不是 div -->
                <template slot='other'>
                    <!-- <span v-if='topicIns.topic'>topicID: {{topicIns.topic._id}}</span> -->
                    <div class='to-reply icon-main' @click="show_reply($event, '.to-reply')">
                        <div class='rippleInit' v-for="(e, index) in ripple_lista" :style='troubleStyleRibble' :key='index'>{{e}}</div>
                        回复
                    </div>
                    <input-compa v-if='main_content.reply' @data_update='data_update' @close_reply='close_reply' :replyIdEmit='main_content.reply._id'
                    :topicIns='topicIns' :userCover='userCover' 
                    :loading_style  =   'loading_style'
                    @focusMethod    =   'focusMethod'
                    @blurMethod     =   'blurMethod'
                    @cancelMethod   =   'cancelMethod'
                    :labelIndex='labelIndex' :if_show_reply='if_show_reply' v-show='if_show_reply'></input-compa>

                </template>

                <div slot='more-info'>
                    <div class="look-more" @click='show_more_reply' v-show='dict_content.length > 0'>
                        <!-- 查看所有{{dict_content.length}}条回复 -->
                        <span v-text='info'></span>
                    </div>
                    <div class="more-replys" v-show='if_show_more_reply'>
                        <!-- <reply-main style='padding: 10px; width: 100%' ref="mainRef" v-if='dict_content' v-for="(sub_reply_dict, index) in dict_content" :key='index' 
                        :main_content='sub_reply_dict' @data_update='data_update' outerReply='inner-reply' :labelIndex='index' :topicIns='topicIns'>
                            <div slot='more-info'></div>
                        </reply-main> -->


                        <img src="/static/img/loading.gif"  class='loading-img' v-show='if_load_img'>
                        <reply-main style='padding: 10px; width: 100%' ref="mainRef" v-if='dict_content' v-for="(sub_reply_dict, index) in request_sublist" :key='index' 
                        :main_content='sub_reply_dict' @data_update='data_update' outerReply='inner-reply' :labelIndex='index' :topicIns='topicIns'>
                        
                            <div slot='more-info'></div>
                        </reply-main>
                    </div>
                </div>
            </reply-main>
        </div>
    </div>
</template>

<script>
import mainList from '@/components/topic/reply/mainList'
import replyMain from '@/components/topic/reply/replyMain'
import inputCompa from '@/components/topic/reply/inputCompa'

import {
    rippleMethod,
} from '../../../utils/utils'

import axios from 'axios'


export default {
    components: {
        'reply-main': replyMain,
        'input-compa': inputCompa,
    },
    // props: ['main_content', 'ceil_content'],
    props: [
        'main_content', 
        'ceil_content', 
        'dict_content', 
        'topicIns', 
        'labelIndex', 
        'userCover',
        'reply_id',
    ],
    data () {
        return {
            if_show_more_reply: false,
            if_show_reply: false,
            flex_width: {},
            should_show_info: false,
            info: '查看所有 1 条回复',
            troubleStyleRibble: '',
            ripple_lista: [],
            loading_style: '',
            request_sublist: '',
            sublist_link: `${domain}/reply/api/sublist`,
            if_load_img: true,
            if_request: true,
            domain: `${domain}`,
            


        }
    },
    methods: {
        get_sublist(reply_id) {
            axios.post(this.sublist_link, {
                reply_id,
            }).then(res => {
                // log('请求 sublist 成功, 这是给出的响应:', res.data.sublist)
                // log('sub_reply_dict:', this.dict_content)
                this.request_sublist = res.data.sublist
                this.if_load_img = false
            }).catch(res => {
                log('请求 sublist 失败')
            })
        },
        show_more_reply() {
            // log('查看更多回复按钮被点击', this.reply_id, this.sublist_link)
            if (this.if_request == true) {
                this.if_load_img = true
                this.get_sublist(this.reply_id)
                this.if_request = false
            }
            
            // this.get_sublist(this.reply_id)
            
            if (this.info != '隐藏回复') {
                this.info = '隐藏回复'
            } else {
                this.info = `查看所有 ${this.dict_content.length} 条回复`
            }
            this.ifShowTrouble = !this.ifShowTrouble
            this.if_show_more_reply = !this.if_show_more_reply
        },
        show_reply(event, element) {
            this.troubleStyleRibble = rippleMethod(event, element, this.ripple_lista, 0, this.troubleStyleRibble)
            this.blurMethod()
            setTimeout(() => {
                this.if_show_reply = true
            }, 400)
            setTimeout(() => {
                this.focusMethod()
                
            }, 450)
            
        },
        close_reply() {
            // log('应该关闭回复')
            this.if_show_reply = false
        },
        data_update() {
            // log('数据应该更新')
            this.get_sublist(this.reply_id)
            this.$emit('data_update')
        },
        focusMethod() {
            this.loading_style = {
                transform: `scale3d(1, 1, 1)`,
                opacity: '1',
            }
        },
        blurMethod() {
            this.loading_style = {
                opacity: '0',
                transform: `scale3d(1, 1, 1)`,
            }
            setTimeout(() => {
                this.loading_style = {
                    transform: `scale3d(0, 1, 1)`,
                    opacity: '0',
                }
            }, 200)
        },
        cancelMethod() {
            this.blurMethod()
        }
    },
    updated() {
        if (this.if_show_more_reply == true) {
            const lista = this.$refs.mainRef
            // log('lista:', lista)
            if (lista != undefined) {
                const l = lista.length
                for (let i = 0; i < lista.length; i++) {
                    // log('循环列表')
                    const e = lista[i]
                    const showInfo = $(e.$el).children('.user-info').children('.bottom-main').children('.show-more')
                    const content = $(e.$el).children('.user-info').children('.flag')
                    const height = content.height()
                    if (height > 80) {
                        // log('高度大于 80 ')
                        showInfo.show()
                        content.css({
                            height: `80px`,
                            overflow: 'hidden',
                        })
                    } else {
                        // log('高度小于 80 ')
                        showInfo.hide()
                        content.css({
                            height: ``,
                            overflow: '',
                        })
                    }
                }

            }
        }

    },
    mouted() {
        // log('main list mouted')
        // log('main list ref:', this.$refs)
    },
    created() {
        // log('main list created', this.$refs.mainRef)
        this.info = `查看所有 ${this.dict_content.length} 条回复`
    }
}
</script>

<style scoped>

@import '../../../../static/css/replyList/demo.css';
@import '../../../../static/css/replyList/markInput.css';
@import '../../../../static/css/replyList/replyActive.css';
@import '../../../../static/css/replyList/replyInput.css';
@import '../../../../static/css/replyList/ripple.css';







</style>


