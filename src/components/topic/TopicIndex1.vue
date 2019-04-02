<template>
    <div>
        <!-- {{msg}} -->
        <router-link to="/board" v-show='ifAdmin'>topic board 管理</router-link>
        <div class='load' v-show='ifLoad'></div>
        <div class="container topic-main">
            <!-- <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container">
                    <div class="navbar-header">
                        <a href="#" class="navbar-brand logo"><img src="img/logo.png" alt="3mwy"></a>
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class="collapse navbar-collapse" id="navbar-collapse">
                        <ul class="nav navbar-nav navbar-right">
                            <li><a href="/index"><span class="glyphicon glyphicon-home"></span> 首页</a></li>
                            <li>
                                <router-link to="/hotspot">
                                    <span class="glyphicon glyphicon-list"></span> 资讯
                                </router-link>
                            </li>
                            <li class="active">
                                <router-link to="/topic" class='active'>
                                    <span class="glyphicon glyphicon-fire"></span> 论坛
                                </router-link>
                                
                            </li>
                            <li><a href="/photo"><span class="glyphicon glyphicon-fire"></span> 图库</a></li>
                            <li><a href="#"><span class="glyphicon glyphicon-fire"></span> 案例</a></li>
                            <li><a href="#"><span class="glyphicon glyphicon-question-sign"></span> 关于</a></li>
                        </ul>



                    </div>
                </div>
            </nav> -->

            <div class="row topic-header " style='margin-top: 74px'>
                <!-- <router-link to="/" class="btn btn-success">主页</router-link>
                
                <router-link to="/topic/write" class="btn btn-info write">发表话题</router-link>
                <br>
                <router-link to="/user/login" class="btn btn-danger login">登录</router-link> -->
                <!-- <br>
                <hr> -->
                <span class='user-info'>
                    <!-- <a @click='toUserInfor'>
                        你好，{{userCheck}}！
                    </a>
                    <a @click='logoutMethod' v-show='ifLogout'>
                        注销
                    </a>
                    <br>
                    <a href="">登录</a>   
                    <a href="">注册</a> -->
                </span>
            </div>
            <div class="row">
                <div class="topic-left col-md-8">
                    <nav style='margin: 20px 0px; padding: 0px'>
                        <span style="position: absolute">板块：</span>
                        <div class='nav-main' style="margin-left:50px;">
                            <span :class="[active_all, 'board']">
                                <!-- <a href="/topic?tab=0">全部</a> -->
                                <a class='tab-all' @click='tabMethod(0, 0, 0)'>全部</a>
                            </span>
                            <span v-for="(board, index) in boards" :class="[{actives: board._id == board_id}, 'board']" :key="index">
                                <a class='tabMethod' @click='tabMethod(board._id, 0, index + 1)'>
                                    {{board.board_content}}
                                </a>
                            </span>

                        </div>
                        <br>
                    </nav>

                    <div class="list-group">
                            <div v-for="topic in topics" class="list-group-item" :key="topic.topic._id">
                                <!-- 需要修改 profile 页面 -->
                                <a @click='avatarLink(topic.get_author._id)' class="img-a">
                                    <img :src="`${domain}/user/avatar/` + topic.get_author.path" style="width:35px; height:35px; border-radius: 5px">
                                </a>
                                <span class='views'>
                                    <span class='reply'>{{  topic.get_reply_number }}</span>
                                    /
                                    <span class='view-num'>{{  topic.topic.views  }}</span>
                                </span>
                                <span class="label label-warning">{{topic.get_board.board_content }}</span>
                                <!-- 需要修改 topic detail 页面 -->
                                <!-- <div @click='detailMethod(topic.topic._id)' class='detailMethod'>
                                    {{  topic.topic.topic_title  }}
                                </div> -->
                                <a @click='detailMethod(topic.topic._id)' class='detailMethod'>
                                    {{  topic.topic.topic_title  }}
                                </a>
                                <span class='time'>
                                    {{  topic.pass_time  }}
                                </span>
                            </div>


                            <ul class="pagination pagination-sm">
                                <li>
                                <a class='Previous' @click='tabMethod(board_id, pre_id)' aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                                </li>

                                <!-- {% for i in page_number %} -->
                                <!-- {% if i - 1 == group_id %}
                                {% set active = 'active' %} -->
                                <!-- {% else %}
                                {% set active = '' %}
                                {% endif %} -->
                                <li v-for="i in page_number" :class="{active: i - 1 == group_id }" :key='i'>
                                    <!-- <a href="/topic?tab={{  board_id  }}&group_id={{i - 1}}"> -->
                                    <a class='group-id' @click='tabMethod(board_id, i - 1)'>
                                        {{i}}
                                    </a>
                                </li>
                                <!-- {% endfor %} -->
                                <li>
                                <a class='Next' @click='tabMethod(board_id, next_id)' aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                                </li>
                            </ul>


                    </div>
                </div>


                <div class="col-md-3  col-md-offset-1">
                    <!-- <img src='http://localhost:4000/static/img/4.jpg' class='topic-right'> -->
                </div>
            </div>

        </div>
                            <hr>
            <p class="text-center foot-text">3mwy</p>

    </div>

</template>

<script>
import axios from 'axios'
import popChange from '@/components/user/pop/popChange'
import store from '@/vuex/index'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

export default {
    store,
    components: {
        popChange,
    },
    data () {
        return {
            msg: '这是 topic 的 index 页面 !',
            api_link: `${domain}/topic`,
            user: '游客',
            topics: '',
            current_time: '',
            boards: '',
            board_id: '',
            active_all: '',
            group_id: '',
            page_number: '',
            pre_id: '',
            next_id: '',
            userCheck: '',
            ifLogout: '',
            ifLoad: true,
            ifAdmin: false,
            domain: `${domain}`,
            
            
        }
    },
    methods: {
        get_infor() {
            // log('请求topic首页！')
            axios.get(this.api_link).then(res => {
                // log('请求 topic 首页成功，响应:', res.data)
                const datas = res.data
                this.user = datas.user
                this.topics = datas.topics
                this.current_time = datas.current_time
                this.boards = datas.boards
                this.board_id = datas.board_id
                this.active_all = datas.active_all
                this.group_id = datas.group_id
                this.page_number = datas.page_number
                this.pre_id = datas.pre_id
                this.next_id = datas.next_id

                
                if (this.user == null) {
                    this.userCheck = '游客'
                    this.ifLogout = false
                } else {
                    this.userCheck = this.user.username
                    this.ifLogout = true
                }

                if (this.userCheck == 'vin') {
                    this.ifAdmin = true
                }
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
                log('解析错误')
            })
        },
        prev_distance(lista, current_pos) {
            let total_distance = 0
            var prev_lista = lista.slice(0, current_pos)
            var a = [1, 2, 3]
            for (var i = 0; i < prev_lista.length; i++) {
                const e = prev_lista[i]
                total_distance += $(e).outerWidth(true)
            }
            return total_distance
        },
        tabMethod(board_id, group_id, index) {
            this.api_link = `${domain}/topic?tab=${board_id}&group_id=${group_id}`
            this.api_link = `${domain}/topic?tab=${board_id}&group_id=${group_id}`
            this.$router.push({
                name: 'TopicIndex',
                query: {
                    tab: board_id,
                    group_id: group_id,
                }
            })
            this.get_infor()


        },
        avatarLink(author_id) {
            // log('avatar 被点击', author_id)
            this.$router.push({
                name: 'UserProfile',
                params: {
                    author_id,
                }
            })
        },
        detailMethod(topic_id) {
            // log('topic detail 被点击', topic_id)
            // href="/topic/detail?topic_id={{topic.topic._id}}
            this.$router.push({
                name: 'TopicDetail',
                query: {
                    topic_id,
                }
            })
        },
        test() {
            // log('test 进行！')
            return 1
        },
        ...mapMutations(['get_index', 'get_logout']),
        ...mapActions(['get_logout']),
        logoutMethod() {
            this.get_logout()
            // this.get_infor()
            this.userCheck = '游客'
            this.ifLogout = false
            
        },
        toUserInfor() {
            if (this.userCheck != '游客') {
                this.$router.push({
                    name: 'UserInfor',
                    query: {
                        userId: this.user._id
                    }
                })
            }
        },
        uploadMethod() {
            this.toUserInfor()
        }
    },
    computed: {
        ...mapState(['username', 'index_link']),
        
    },
    created() {
        this.$emit('go_header', 0)
        this.$emit('reset')
        this.ifLoad = true
        $('.load').css({
            width: `30%`,
        })
        const b_id = this.$route.query.tab || -1
        const g_id = this.$route.query.group_id || 0
        // log('bid gid:', b_id, g_id)
        this.api_link = `${domain}/topic?tab=${b_id}&group_id=${g_id}`
        this.get_infor()
        
    },
}
</script>


<style scoped>
    .actives {
        width: 50px;
        height: 20px;
        text-align: center;
        border: 1px solid beige;
        background-color: lightcoral;
        display: inline-block;
        border-radius: 4px;
    }





    .topic-right {
        height: 300px;
        border: 1px solid black;
        margin: 65px 40px 0px 0px;
        position: fixed;
    }

    .board a {
        text-decoration: none;
    }


    .time {
        position: absolute;
        right: 0px;
        margin: 10px;
    }

    .views {
        margin: 10px;
    }

    .reply {
        color: #9e78c0;
    }

    .view-num {
        font-size: 10px;
        color: #b4b4b4;
    }

    .list-group .img-a {
        text-decoration: none;
    }

    .write {
        position: absolute;
        right: 0px;
        margin-right: 90px;
    }

    .topic-main .topic-header{
        margin-top: 80px;
    }

    .tabMethod, .tab-all, .img-a, .detailMethod, .Previous, 
    .Next, .group-id{
        cursor: pointer;
    }

    .detailMethod {
        width: 150px;
        /* border: 1px solid black; */
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        top: 8px;

    }

    .underline {
        width: 52px;
        height: 4px;
        background-color: lightblue;
        margin-left: -10px;
        transform: translateX(10px);
        transition: .5s;
    }


.login {
    position: absolute;
    right: 185px;
    margin-top: -33px;
}

.user-info {
    position: absolute;
    margin-top: -16px;
    right: 11px;
}

a {
    text-decoration: none;
    cursor: pointer;
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



