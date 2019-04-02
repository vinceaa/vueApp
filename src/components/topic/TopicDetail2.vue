<template>
    <div>
            <div class='load' v-show='ifLoad'></div>

     
            <router-link to="/topic" class="btn btn-success">返回列表</router-link>
            <br>
            作者： 
                <router-link v-if="topic.get_author" :to="`/user/${topic.get_author._id}`">
                        <span v-if="topic.get_author">{{  topic.get_author.username  }}</span>
                </router-link>
            <br>
            发布时间： <span v-if="topic.topic">{{ topic.topic.spt_time  }}</span>
            <br>
            
            
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3 class="panel-title" v-if="topic.topic">标题：{{topic.topic.topic_title}}</h3>
                </div>
                <div class="panel-body" v-if="topic.topic" v-html="'内容：' + topic.topic.topic_content">
                </div>
            </div>
            <hr>


            <replyInput :userCover='current_user_path' :ifClear='ifClear' @getContent='addReply'></replyInput>


            <div class="reply-main">

                <div v-if="reply.get_replyer" v-for="(reply, index) in replys" class="reply-ceil" :key="index">

                    <mainList v-if='topic.topic' @data_update='data_update' :userCover='current_user_path' :main_content="reply" 
                    :dict_content='reply.get_sub_list' :topicIns='topic' :labelIndex='index'></mainList>

                </div>
            </div>
            <br>

            <hr>            


        <i class="icon iconfont icon-cai"></i>
        <i class="icon iconfont icon-ai45"></i>
            
    </div>
</template>

<script>
import axios from 'axios'
import replyInput from '@/components/topic/reply/inputCeil'
import mainList from '@/components/topic/reply/mainList'

export default {
    components: {
        replyInput,
        mainList,
    },
    data () {
        return {
            msg: '这是 topic detail 的页面！',
            topic: ``,
            topic_id: '',
            replys: '',
            current_time: '',
            reply_post_link: 'http://127.0.0.1:4000/reply/api',
            reply_to_post_link: 'http://127.0.0.1:4000/reply/api/replyto',
            iflike_link: 'http://127.0.0.1:4000/reply/api/iflike',
            iflike_link_sub: 'http://127.0.0.1:4000/reply/api/iflike/sub',
            post_reply_content: '',
            ifLoad: true,
            current_user_path: '',
            userIns: '',
            ifClear: '',
            
        }
    },
    methods: {
        get_detail() {
            axios.get(this.topic_detail_link).then(res => {
                // log('请求 topic detail 页面成功! 这是给出的响应:', res.data)
                const datas = res.data
                this.topic = datas.topic
                this.replys = datas.replys
                this.current_time = datas.current_timeuser
                this.userIns = datas.userIns
                // log('die 0', this.userIns)
                this.current_user_path = `http://localhost:4000/user/avatar/${this.userIns.path}`
                // log('die 1')
                $('.load').css({
                    width: `100%`,
                    
                })
                // 这里很奇怪，所有的 width 只能改变一次，后期的改变不起作用
                setTimeout(() => {
                    // this.ifLoad = false
                    $('.load').css({
                        opacity: `0`,
                    })
                }, 1000)
                


            }).catch(res => {
                log('解析 user profile  失败')
            })
        },
        post_reply(topic_id, author_id, reply_content) {
            axios.post(this.reply_post_link, {
                topic_id,
                author_id,
                reply_content,
            }).then(res => {
                // log('res:', res.data.if_redirect)
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
                }
            }).catch(res => {
                log('post 回复失败')
            })
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
                }
                // log('内部回复请求成功！', res.data.replys)
                // this.replys = res.data.replys
            }).catch(res => {
                log('post 回复失败')
            })
        },
        replyMethod() {
            const topic_id = this.topic.topic._id
            const author_id = this.topic.get_author._id
            const reply_content = this.post_reply_content
            this.post_reply(topic_id, author_id, reply_content)
            this.post_reply_content = ''
        },
        // innerReplyMethod(id, content) {
        //     // log('内部回复按钮被点击!', id, content)
        //     const reply_to_content = content
        //     const reply_id = id
        //     const topic_id = this.topic.topic._id
        //     this.post_reply_to(reply_to_content, reply_id, topic_id)
        // },

        innerReplyMethod(id, content) {
            // log('内部回复按钮被点击!', id, content)
            const reply_to_content = content
            const reply_id = id
            const topic_id = this.topic.topic._id
            const author_id = this.topic.get_author._id
            
            this.post_reply_to(reply_to_content, reply_id, topic_id, author_id)
        },
        ifLike(status, reply_id) {
            const topic_id = this.topic.topic._id
            // log('是否喜欢按钮被点击', status, reply_id, topic_id)
            
            axios.post(this.iflike_link, {
                reply_id,
                status, 
                topic_id,
            }).then(res => {
                // log('if like 请求成功，这是给出的响应:', res.data)
                this.replys = res.data.replys
                
            }).catch(res => {
                log('if like 请求失败')
            })
        },

        ifLikeSub(status, reply_id) {
            const topic_id = this.topic.topic._id
            axios.post(this.iflike_link_sub, {
                reply_id,
                status, 
                topic_id,
            }).then(res => {
                // log('if like 请求成功，这是给出的响应:', res.data)
                this.replys = res.data.replys
                
            }).catch(res => {
                log('if like 请求失败')
            })
        },
        addReply(reply_content) {
            // log('收到子组件发来的回复:', reply_content)
            const topic_id = this.topic.topic._id
            const author_id = this.topic.get_author._id
            // const reply_content = this.post_reply_content
            this.post_reply(topic_id, author_id, reply_content)
            this.post_reply_content = ''
        },
        data_update() {
            // log('爷爷收到更新数据的请求')
            this.get_detail()
        }
    },
    created() {
        this.ifLoad = true
        $('.load').css({
            width: `30%`,
        })
        this.topic_detail_link = `http://127.0.0.1:4000/topic/detail?topic_id=${this.$route.query.topic_id}`
        this.get_detail()

    },
    beforeMount() {
    },
    mounted() {
        $('.panel-body img').addClass('img-responsive')
    },
    updated() {
        log('updated')

        const lista = $('.reply_height')
        for (let index = 0; index < lista.length; index++) {
            const e = lista[index]
            const height = lista.eq(index).height()
            if (height < 80) {
                $('.show-more').eq(index).css({
                    display: 'none',
                })
            } else {
                $('.flag').eq(index).css({
                    overflow: 'hidden',
                    height: '80px',
                })
            }
            
        }
        
        
    }

}
</script>

<style scoped>
@import '../../../static/fonts/font1/iconfont.css';
img {
    width: 35px;
    height: 35px;
    border-radius: 5px;
}

.load {
    position: absolute;
    top: 0px;
    width: 0%;
    height: 3px;
    /* border: 1px solid black; */
    background: #4285f4;
    transition: .5s;
    opacity: 1;
    z-index: 2;
    
}

/* 
    todo:
    1. 展开问题
    2. 隐藏回复问题
    3. 回复区高度自适应问题

*/
</style>



