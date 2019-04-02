<template>
    <div class="list-main">
        <div class="user-cover">


            <router-link v-if="main_content.get_replyer" :to="`/user/${main_content.get_replyer._id}`">
                <img :src="`${domain}/user/avatar/` + main_content.get_replyer.path" style="width:35px; height:35px; border-radius: 50%">
            </router-link>

            <!-- 这里的 to 应该修改  -->
            <router-link v-if="main_content.replyerPath" :to="`/user/${main_content.replyerId}`">
                <img :src="`${domain}/user/avatar/` + main_content.replyerPath" style="width:35px; height:35px; border-radius: 50%">
            </router-link>

            
        </div>
        <div class="user-info">
            <span class='user-name'>
                
                <router-link  v-if="main_content.get_replyer" :to="`/user/${main_content.get_replyer._id}`">
                    <span class='user-name'>{{  main_content.get_replyer.username }}</span>
                </router-link>  

                <router-link  v-if="main_content.replyerName" :to="`/user/${main_content.replyerId}`">
                    <span class='user-name'>{{  main_content.replyerName }}</span>
                </router-link>  


            </span>


            <span class='user-time' v-if='main_content.pass_time'>{{ main_content.pass_time}}</span>

            <!-- <div :class="[{'user-content-main': if_show_more}, 'flag']"> -->
            <div :class="[{'user-content-main-active': if_show_more}, 'flag']"
            :style='troubleStyle'>

                <div class='user-content'>


                    <span v-if="main_content.reply" class='reply_height' v-html="main_content.reply.reply_content"></span>  
                    <!-- <span v-if="main_content.reply" class='reply_height' v-html="main_content.reply.reply_content"></span>   -->
                    <span v-if="main_content.reply_content" ref="testRef" class='reply_height' v-html="main_content.reply_content"></span>  


                </div>
            </div>




            <div class="bottom-main">
                <div class="show-more" @click='show_more'>
                    {{showInfo}}
                </div>
                <div class="user-think">
                    <!-- 这里的事件暂时先不加 -->

                    <div class='fonts'>
            
                        <div v-if='main_content.reply' :class="['icon-main', 'goods', `${outerReply}-good`]" @click="rippleMethod($event, `.${outerReply}-good`, ripple_lista_good, 1, main_content.reply._id, 'main')">
                            <div class='rippleInit' v-for="(e, index) in ripple_lista_good" :style='troubleStyleRibble' :key='index'>{{e}}</div>
                            <i   class="icon iconfont icon-ai45"></i>
                        </div>
                        <span class='good-num' v-if='main_content.reply'>{{main_content.reply.like_list.length}}</span>

                        <div v-if='main_content.reply' :class="['icon-main', 'bads', `${outerReply}-bad`]" @click="rippleMethod($event, `.${outerReply}-bad`, ripple_lista_bad, 0, main_content.reply._id, 'main')">
                            <div class='rippleInit' v-for="(e, index) in ripple_lista_bad" :style='troubleStyleRibble' :key='index'>{{e}}</div>
                            <i   class="icon iconfont icon-cai"></i>
                        </div>
                        <span class='bad-num' v-if='main_content.reply'>{{main_content.reply.dislike_list.length}}</span>


                        <!-- 子回复  -->

                        <div v-if='main_content.reply_id'  :class="['icon-main', 'goods', `${outerReply}-good`]" @click="rippleMethod($event, `.${outerReply}-good`, ripple_lista_good_sub, 1, main_content.reply_id, 'sub')">
                            <div class='rippleInit' v-for="(e, index) in ripple_lista_good_sub" :style='troubleStyleRibble' :key='index'>{{e}}</div>
                            <!-- <i  class="icon iconfont icon-ai45" @click='ifLikeMethodSub(1, main_content.reply_id)'></i> -->
                            <i  class="icon iconfont icon-ai45"></i>
                        </div>
                        <span class='good-num' v-if='main_content.like_list'>{{main_content.like_list.length}}</span>

                        <div v-if='main_content.reply_id' :class="['icon-main', 'bads', `${outerReply}-bad`]" @click="rippleMethod($event, `.${outerReply}-bad`, ripple_lista_bad_sub, 0, main_content.reply_id, 'sub')">
                            <div class='rippleInit' v-for="(e, index) in ripple_lista_bad_sub" :style='troubleStyleRibble' :key='index'>{{e}}</div>
                            <!-- <i  class="icon iconfont icon-cai"  @click='ifLikeMethodSub(0, main_content.reply_id)'></i> -->
                            <i  class="icon iconfont icon-cai"></i>
                        </div>
                        <span class='bad-num' v-if='main_content.dislike_list'>{{main_content.dislike_list.length}}</span>

                    </div>




                    <slot name='other'></slot>

                    <!--
                    <span class='to-reply' @click='show_reply'>回复</span>
                    <input-compa @test='testMethod' @close_reply='close_reply' :test='msg' v-for='i in 1' v-show='if_show_reply'></input-compa> -->


                </div>


                <slot name='more-info'></slot>

            </div>
        </div>

    </div>
</template>


<script>
import axios from 'axios'

import {
    getBlock,
} from '../../../utils/utils'


export default {
    data () {
        return {
            msg: '这是组件主体',
            if_show_reply: false,
            // if_show_more: true,
            if_show_more: false,
            if_show_more_reply: false,
            iflike_link: `${domain}/reply/api/iflike`,
            iflike_link_sub: `${domain}/reply/api/iflike/sub`,
            troubleStyle: '',
            ifTrouble: true,
            ripple_lista_good: [],
            ripple_lista_bad: [],
            ripple_lista_good_sub: [],
            ripple_lista_bad_sub: [],
            troubleStyleRibble: '',
            showInfo: '展开',
            domain: `${domain}`,
            
            
            

        }
    },
    props: ['main_content', 'topicIns', 'labelIndex', 'outerReply'],
    methods: {
        testMethod() {
        },
        show_more() {
            // log('应该展开评论内容')
            this.ifTrouble = !this.ifTrouble
            // this.if_show_more = !this.if_show_more
            if (this.ifTrouble == false) {
                this.troubleStyle = {
                    overflow: '',
                    height: '',
                }
                this.showInfo = '收起'
            } else {
                this.troubleStyle = {
                    overflow: 'hidden',
                    height: '80px',
                }
                this.showInfo = '展开'
            }

        },
        show_reply() {
            // log('应该展示回栏')
            this.if_show_reply = true
        },
        close_reply() {
            // log('应该关闭回复')
            this.if_show_reply = false
        },
        show_more_reply() {
            // log('显示更多回复按钮被点击11', this.if_show_more_reply)
            // this.if_show_more_reply = !this.if_show_more_reply
            // this.$emit = ('show', this.if_show_more_reply)
            this.$emit = ('testShow')
        },
        testMethod(n) {
            // log('test method 收到发送', n)
        },
        ifLikeMethod(status, reply_id) {
            // log('ifLikeMethod')
            const topic_id = this.topicIns.topic._id
            axios.post(this.iflike_link, {
                reply_id,
                status, 
                topic_id,
            }).then(res => {
                // log('api post 成功, 这是给出的响应', res.data.if_redirect)

                const if_redirect = res.data.if_redirect
                if (if_redirect == true) {
                    this.$router.push({
                        name: 'UserLogin',
                        query: {
                            next_url: res.data.next_url,
                        }
                    })
                } else {
                    this.$emit('data_update')
                    
                }



                
            }).catch(res => {
                log('if like 请求失败')
            })            
        },
        ifLikeMethodSub(status, reply_id) {
            // log('子集赞踩点击', status, reply_id)
            const topic_id = this.topicIns.topic._id
            
            axios.post(this.iflike_link_sub, {
                reply_id,
                status, 
                topic_id,
            }).then(res => {
                // log('if like 请求成功，这是给出的响应:', res.data)
                
                const if_redirect = res.data.if_redirect
                if (if_redirect == true) {
                    this.$router.push({
                        name: 'UserLogin',
                        query: {
                            next_url: res.data.next_url,
                        }
                    })
                } else {
                    this.$emit('data_update')
                }
                
            }).catch(res => {
                log('if like 请求失败')
            })

        },
        getPos(block, x, y) {
            // const dotRadius = this.$refs.block.offsetWidth * 2 / 10
            const dotRadius = block.width() * 2 / 10
            const hOffset = dotRadius / 2
            const wOffset = dotRadius / 2

            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop


            const blockLeft = block.offset().left
            const blockTop = block.offset().top
            const initOffsetX = x - blockLeft
            const initOffsetY = y - blockTop
            

            const left = initOffsetX - wOffset
            const top = initOffsetY - hOffset + scrollTop
            return [left, top, dotRadius]
        },
        rippleMethod(event, element, ripple_lista, status, reply_id, type) {
            if (type == 'main') {
                this.ifLikeMethod(status, reply_id)
            } else {
                this.ifLikeMethodSub(status, reply_id)
            }
            ripple_lista.push('')
            const x = event.clientX
            const y = event.clientY
            const block = getBlock(event)
            const [left, top, dotRadius] = this.getPos(block, x, y)
            this.troubleStyleRibble = {
                left: `${left}px`,
                top: `${top}px`,
                width: `${dotRadius}px`,
                height: `${dotRadius}px`,
                // 这里貌似不能动态调节 animation
                // animation: 'rippling 0.7s',
            }

            setTimeout(() => {
                $('.rippleInit').eq(0).remove()
            }, 1000);


        }
    },
}
</script>

<style scoped>
@import '../../../../static/css/replyList/demo.css';
/* @import '../../../../static/css/replyList/ripple.css'; */
@import '../../../../static/css/replyList/markInput.css';
@import '../../../../static/css/replyList/replyActive.css';
@import '../../../../static/css/replyList/replyInput.css';
@import '../../../../static/css/replyList/ripple.css';
</style>



