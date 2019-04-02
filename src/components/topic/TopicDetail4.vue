<template>
    <div>
        <iscroll-view @scrollStart="logs">
            <div>
                <!-- <div class="test0"   @click="rippleMethod($event, '.test0')">
                    <div class='testPos' v-for="(e, index) in lista2" :style='troubleStyle' :key='index'>{{e}}</div>
                </div> -->

                <div class='load' v-show='ifLoad'></div>
                <router-link to="/topic" class="btn btn-success">返回列表</router-link>
                <div class='container' style='margin-top: 100px;'>
                    <div class='row'>
                        <div class='col-md-9 col-sm-9 col-lg-9 col-xs-9'>
                            <h3  v-if="topic.topic" class='text-left'>{{topic.topic.topic_title}}</h3>
                            <br>
                            <div class='text-left' v-if="topic.topic">发布时间：{{ topic.topic.spt_time  }}</div>
                            
                            <router-link v-if="topic.get_author" :to="`/user/${topic.get_author._id}`">
                                <div v-if="topic.get_author" class='text-left'>作者：{{  topic.get_author.username  }}</div>
                            </router-link>                   
                            <br>

                            <!-- 测试 readystate -->
                            <img src="/static/img/loading.gif"  class='loading-img' v-show='ifReady'>
                            
                            <hr>
                            <h4 v-if="topic.topic" v-html="topic.topic.topic_content" v-show='!ifReady'></h4>
                            <!-- <h4 v-if="topic.topic" v-html="topic.topic.topic_content"></h4> -->
                            <hr>
                        </div>
                        <div class='col-md-1 col-sm-1 col-lg-1 col-xs-1'></div>
                        
                    </div>
                </div>

                <div class='reply-m'>
                <!-- <i class="icon iconfont icon-cai"></i> -->
                        <replyInput :userCover='current_user_path' :ifClear='ifClear' @getContent='addReply'></replyInput>


                        <div class="reply-main">

                            <div v-if="reply.get_replyer" v-for="(reply, index) in replys" class="reply-ceil" :key="index">
                                <mainList v-if='topic.topic' @data_update='data_update' :userCover='current_user_path' :main_content="reply" 
                                :dict_content='reply.get_sub_list' :reply_id='reply.reply._id' :topicIns='topic' :labelIndex='index'></mainList>

                            </div>
                            <img src="/static/img/loading.gif"  class='loading-img' v-show='if_load_img'>
                        </div>

                        <br>
                        <!-- <hr>             -->

                </div>
                    
            </div>
            <div class='text-center' v-show='ifInfo'>下拉刷新评论列表~</div>
            <div class='text-center' v-show='ifBottom'>到底了</div>
        </iscroll-view>
    </div>
    
</template>

<script>
import axios from 'axios'
import replyInput from '@/components/topic/reply/inputCeil'
import mainList from '@/components/topic/reply/mainList'

import {group} from '../../utils/utils'

import Vue from 'vue'


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
            replys: [],
            current_time: '',
            reply_post_link: `${domain}/reply/api`,
            reply_to_post_link: `${domain}/reply/api/replyto`,
            iflike_link: `${domain}/reply/api/iflike`,
            iflike_link_sub: `${domain}/reply/api/iflike/sub`,
            post_reply_content: '',
            ifLoad: true,
            current_user_path: '',
            userIns: '',
            ifClear: '',
            lista: [],
            rippleStyle: '',
            lista2: [],
            troubleStyle: '',
            groupIndex: 0,
            page_num: 0,
            if_load_img: false,
            group_lista: '',
            page_len: '',
            request_page_num: 0,
            user_path: '',
            domain: `${domain}`,
            ifBottom: false,
            ifInfo: true,
            ifReady: true,
            
            
        }
    },
    methods: {
        get_detail(status=0) {
            // log('正在请求')
            if (status == 0) {
                this.if_load_img = true
            }
            const detail_link = `${this.topic_detail_link}&page_num=${this.request_page_num}`
            axios.get(detail_link).then(res => {
                // log('1')
                const datas = res.data
                // log('2')
                this.topic = datas.topic
                this.replys = datas.replys
                // log('replys:', this.replys)

                this.page_len = datas.page_len
                // log('得到总页数', this.page_len)

                this.current_time = datas.current_timeuser
                // log('user ins 断点0')
                // log('3', datas)
                this.userIns = datas.userIns
                // log('userins:', this.userIns)
                if (this.userIns == null) {
                        this.user_path = 'u1.png'
                } else {
                    if (this.userIns.path != '/u1.png') {
                        // log('不为空', this.userIns.path)
                        this.user_path = this.userIns.path
                    } else {
                        // log('为空')
                        this.user_path = 'u1.png'
                    }

                }
                
                // this.current_user_path = `http://127.0.0.1:4000/user/avatar/${this.userIns.path}`
                this.current_user_path = `${domain}/user/avatar/${this.user_path}`
                // log('user ins 断点2')
                $('.load').css({
                    width: `100%`,
                    
                })
                // log('user ins 断点3')
                // 这里很奇怪，所有的 width 只能改变一次，后期的改变不起作用
                setTimeout(() => {
                    // this.ifLoad = false
                    $('.load').css({
                        opacity: `0`,
                    })
                }, 1000)
                this.if_load_img = false
                
                


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
                    // this.all_reply = res.data.replys
                    // this.group_lista = group(this.all_reply)

                    // if (this.groupIndex == this.page_num - 1) {
                    //     log('目前所在已经是最后一页了')
                    //     this.replys = this.all_reply
                    // }




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
            // log('if like method')
            axios.post(this.iflike_link, {
                reply_id,
                status, 
                topic_id,
            }).then(res => {
                // log('if like 请求成功，这是给出的响应:', res.data)
                this.replys = res.data.replys

                // this.all_reply = res.data.replys
                // this.group_lista = group(this.all_reply)

                // if (this.groupIndex == this.page_num - 1) {
                //     log('目前所在已经是最后一页了')
                //     this.replys = this.all_reply
                // }

                
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
            this.get_detail(1)
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

        rippleMethod(event, element) {
            // log('被点击')
            this.lista2.push('')
            const x = event.clientX
            const y = event.clientY
            const block = $(element)
            const [left, top, dotRadius] = this.getPos(block, x, y)
            this.troubleStyle = {
                left: `${left}px`,
                top: `${top}px`,
                width: `${dotRadius}px`,
                height: `${dotRadius}px`,
            }

            setTimeout(() => {
                $('.testPos').eq(0).remove()
            }, 1000);


        },



        getClientHeight() {
            var clientHeight=0;   
            if(document.body.clientHeight&&document.documentElement.clientHeight){   
                clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;           
            }else{   
                clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;       
            }   
            return clientHeight;   
        },
        getScrollTop() {
            var scrollTop=0;   
            scrollTop=(document.body.scrollTop>document.documentElement.scrollTop)?document.body.scrollTop:document.documentElement.scrollTop;           
            return scrollTop;   
        },

        // 这个方法有 bug, 移动端不能正确的判断是否到底部
        scrollMethod() {
            const that = this
            $(window).on('scroll', function(e) {
                const d = document.documentElement
                const top = d.scrollTop || document.body.scrollTop
                const bottom = d.clientHeight || document.body.clientHeight
                const all = d.scrollHeight
                // log('top:', top)
                // log('bottom:', bottom)
                // log('top + bottom:', top + bottom)
                // log('all:', all)
                if (top + bottom == all) {
                    log('到底了')
                    if (that.request_page_num < that.page_len - 1) {
                        that.request_page_num += 1
                        // log('that.request_page_num', that.request_page_num)
                        that.get_detail()
                    }
                }
            })
        },
        // 利用 iscroll 来解决上面的问题
        logs (iscroll) {
            const that = this
            if (that.request_page_num < that.page_len - 1) {
                that.request_page_num += 1
                // log('that.request_page_num', that.request_page_num)
                that.get_detail()
            } else {
                this.ifBottom = true
                this.ifInfo = false
            }
        },
        checkState() {
            const _this = this
            if (document.readyState == 'complete') {
                _this.ifReady = false
            } else {
                _this.ifReady = true
            }
        },
        initState() {
            log('initState', document.readyState)
            const _this = this
            document.onreadystatechange = function () {
                log('onreadystatechange', document.readyState)
                if (document.readyState == 'complete') {
                    _this.ifReady = false
                } else {
                    _this.ifReady = true
                }
            }
        }

    },
    
    created() {
        this.ifLoad = true
        $('.load').css({
            width: `30%`,
        })
        this.topic_detail_link = `${domain}/topic/detail?topic_id=${this.$route.query.topic_id}`
        this.get_detail()
        this.scrollMethod()
    },
    beforeMount() {
        this.initState()
        this.checkState()
    },
    mounted() {
        $('.panel-body img').addClass('img-responsive')
    },
    updated() {
        // log('updated')

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
@import '../../../static/css/fontCss/iconfont.css';
img {
    width: 35px;
    height: 35px;
    border-radius: 5px;
}

a {
    text-decoration: none;
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

.loading-img {
    height: 80px;
    width: 80px;
    position: absolute;
    left: 300px;
}

/* 
    todo:
    1. 展开问题
    2. 隐藏回复问题
    3. 回复区高度自适应问题

*/



.container h4 {
    line-height: 35px;
}

/* ripple  测试  */

.test {
    height: 200px;
    width: 100px;
    border: 1px solid black;
    position: relative;
}

* {
    margin: 0;
}

.testPos {
    border-radius: 50%;
    position: absolute;
    animation: rippling 0.7s;
}

@keyframes rippling {
    0% {
        background: black;
        opacity: 0.2;
    }

    50% {
        background: black;
        opacity: 0.1;
    }

    100% {
        opacity: 0;
        transform: scale3d(10, 10, 1);
    }

}

.test1 {
    height: 100px;
    width: 100px;
    border: 1px solid black;
    position: relative;
    overflow: hidden;
}

.color {
    background: blue;
}

.test0 {
    width: 200px;
    height: 200px;
    border: 1px solid black;
    overflow: hidden;
    position: relative;
    left: 700px;
    top: 400px;
}


/* // 
    iscroll
 */

 .scroll-view {
  /* -- Attention: This line is extremely important in chrome 55+! -- */
  touch-action: none;
  /* -- Attention-- */
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.scroll-view > div {
    min-height: 101%;
    position: absolute;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    width: 100%;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -o-text-size-adjust: none;
    text-size-adjust: none;
}


</style>



