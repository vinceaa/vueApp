<template>
    <div>
        {{msg}}
        <div class="container topic-main">
            <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container">
                    <div class="navbar-header">
                        <a href="#" class="navbar-brand logo"><img src="img/logo.png" alt="3mwy"></a>
                        <!-- 这里的 data-target="#navbar-collapse" 指向下面， 当缩小时对应的 target 会自动隐藏并编程 headers -->
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



                    </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
            </nav>

            <div class="row topic-header" style='margin-top: 74px'>
                <router-link to="/" class="btn btn-success">主页</router-link>
                <router-link to="/topic/write" class="btn btn-info write">发表话题</router-link>
                <!-- <a href="/topic/write" class="btn btn-info write">发表话题</a> -->
                <br>
                <hr>
            </div>
            <div class="row">
                <div class="topic-left col-md-8">
                    <nav style='margin: 20px 0px; padding: 0px'>
                        板块：
                        <span :class="[active_all, 'board']">
                            <!-- <a href="/topic?tab=0">全部</a> -->
                            <a class='tab-all' @click='tabMethod(0)'>全部</a>
                        </span>
                        <!-- {% for board in boards %} -->

                            <!-- {% if board.id == board_id  %}
                                {% set active = 'actives' %}
                            {% else %}
                                {% set active = '' %}
                            {% endif %} -->
                            <span v-for="board in boards" :class="[{actives: board._id == board_id}, 'board']" :key="board._id">
                                <a class='tabMethod' @click='tabMethod(board._id)'>
                                    {{board.board_content}}
                                </a>
                            </span>
                        <!-- {% endfor %} -->
                        <br>
                    </nav>

                    <div class="list-group">
                            <div v-for="topic in topics" class="list-group-item" :key="topic.topic._id">
                                <!-- 需要修改 profile 页面 -->
                                <a @click='avatarLink(topic.get_author._id)' class="img-a">
                                    <img :src="'http://localhost:4000/user/avatar/' + topic.get_author.path" style="width:35px; height:35px; border-radius: 5px">
                                </a>
                                <span class='views'>
                                    <span class='reply'>{{  topic.get_reply_number }}</span>
                                    /
                                    <span class='view-num'>{{  topic.topic.views  }}</span>
                                </span>
                                <span class="label label-warning">{{topic.get_board.board_content }}</span>
                                <!-- 需要修改 topic detail 页面 -->
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
                    <img src='http://localhost:4000/static/img/4.jpg' class='topic-right'>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是 topic 的 index 页面 !',
            api_link: `http://127.0.0.1:4000/topic`,
            user: '',
            topics: '',
            current_time: '',
            boards: '',
            board_id: '',
            active_all: '',
            group_id: '',
            page_number: '',
            pre_id: '',
            next_id: '',
        }
    },
    methods: {
        get_infor() {
            axios.get(this.api_link).then(res => {
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
            }).catch(res => {
                log('解析错误')
            })
        },
        tabMethod(board_id, group_id) {
            this.api_link = `http://127.0.0.1:4000/topic?tab=${board_id}&group_id=${group_id}`
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
            
        }
    },
    created() {
        log('tab query 状态:', this.$router.query.tab)
        log('tab group_id 状态:', this.$router.query.group_id)
        this.get_infor()

    }
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
</style>


