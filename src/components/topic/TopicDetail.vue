<template>
    <div>
        <div class='load' v-show='ifLoad'></div>
        {{ msg }}
        topic id: {{  $route.query.topic_id  }}

            <h4>topic detail!</h4>
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

            <div class="reply-main">

                <div v-if="reply.get_replyer" v-for="(reply, index) in replys" class="reply-ceil" :key="index">
                    <h5>
                        <router-link v-if="reply.get_replyer" :to="`/user/${reply.get_replyer._id}`">
                            <img :src="'http://localhost:4000/user/avatar/' + reply.get_replyer.path" style="width:35px; height:35px; border-radius: 5px">
                        </router-link>
                        第 <span class="floor_number">{{index + 1}}</span> 楼 
                        <router-link  v-if="reply.get_replyer" :to="`/user/${reply.get_replyer._id}`">
                            {{  reply.get_replyer.username }}
                        </router-link>
                        说:  <span v-if="reply.reply">
                                {{  reply.reply.reply_content  }}
                            </span>                       
                            {{ reply.pass_time}}

                        <div v-if="reply.reply" class='if-like'>
                            <button class='like' @click='ifLike(1, reply.reply._id)'>赞</button> 
                            <span> {{reply.reply.like_list.length}}</span>
                            <button class='dislike' @click='ifLike(0, reply.reply._id)'>踩</button> 
                            <span >{{reply.reply.dislike_list.length}}</span>
                        </div>
                        
                        <a class="choose-reply">回复</a>
                        <hr>
                    </h5>
                    <div class="reply-to-main">
                        回复信息：
                        <div class="reply-list">
                            <!-- 失败的数据库设计 -->
                            <!-- <span v-if="reply.reply" v-for="(reply_to, index) in reply.reply.reply_to_list" :key="index">
                                {{reply_to.replyer}} ：{{reply_to.reply_to_content}}
                                <br>
                            </span> -->

                            <!-- 换了一种思路 -->
                            <span v-if="reply.reply" v-for="(sub_reply_dict, index) in reply.get_sub_list" :key="index" style="position: relative; margin-left: 500px;">
                                <img :src="`${domain}/user/avatar/${sub_reply_dict.replyerPath}`">
                                {{sub_reply_dict.replyerName}} 说 : {{sub_reply_dict.reply_content}}

                                <button class='like' @click='ifLikeSub(1, sub_reply_dict.reply_id)'>赞</button> 
                                <span v-if='sub_reply_dict.dislike_list'> {{sub_reply_dict.like_list.length}}</span>
                                <button class='dislike' @click='ifLikeSub(0, sub_reply_dict.reply_id)'>踩</button> 
                                <span v-if='sub_reply_dict.dislike_list'>{{sub_reply_dict.dislike_list.length}}</span>

                                {{ sub_reply_dict.pass_time}}
                                
                                <br>
                            </span>
                            <br>
                        </div>
                        <!-- 这里的 :value 应该改成 v-model -->
                        <!-- <input hidden class='reply_id' name='reply_id' :value="reply.reply._id"> -->
                        <input v-if="reply.get_replyer" v-model="reply[index]" class='reply_to_content' name='reply_to_content' :placeholder="`回复${  reply.get_replyer.username }`" style="margin-left: 300px;">
                        <button v-if="reply.reply" @click='innerReplyMethod(reply.reply._id, reply[index])' class="send_reply_to">发送</button>
                    </div>
                </div>
            </div>
            <br>

            <textarea class="form-control" v-model="post_reply_content" name="reply_content" cols="30" rows="10" style="width:68%"></textarea>
            <br>
            <button @click='replyMethod' class="reply-btn btn btn-default navbar-btn">回复</button>
            post_reply_content: {{  post_reply_content  }}
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是 topic detail 的页面！',
            topic: ``,
            topic_id: '',
            replys: '',
            current_time: '',
            reply_post_link: `${domain}/reply/api`,
            reply_to_post_link: `${domain}/reply/api/replyto`,
            iflike_link: `${domain}/reply/api/iflike`,
            iflike_link_sub: `${domain}/reply/api/iflike/sub`,
            post_reply_content: '',
            ifLoad: true,
            domain: `${domain}`,
            
            
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
    },
    created() {
        this.ifLoad = true
        $('.load').css({
            width: `30%`,
        })
        this.topic_detail_link = `${domain}/topic/detail?topic_id=${this.$route.query.topic_id}`
        this.get_detail()

    },
    beforeMount() {
        // log('beforeMount')
        // log('img beforeMount:', $('.panel-body img'))
    },
    mounted() {
        // log('mounted')
        // log('img:', $('.panel-body img'))
        // log('imgs:', $('img').eq(0).attr('src'))
        // log('img:', $('.panel-body img'))
        // log('imgs:', e('body'))
        $('.panel-body img').addClass('img-responsive')
    }
}
</script>

<style scoped>
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
</style>


