<template>
    <div>
        <!-- {{ msg }} -->
        <!-- author_id: {{$route.params.author_id}} -->
            <h4>这是 {{user.username}} 的主页！</h4>
            <!-- <a href="/topic" class="btn btn-info">返回 topic 列表</a> -->
            <router-link to="/topic">返回 topic 列表</router-link>
            <h5>所创建的话题：</h5>
            <div v-for="topic in creat_topic" :key="topic.topic.id">
                <router-link :to="'/user/' + topic.get_author._id">
                    <img :src="'http://localhost:4000/user/avatar/' + topic.get_author.path" style="width:35px; height:35px; border-radius: 5px">
                </router-link>
                <router-link :to="'/topic/detail?topic_id=' + topic.topic._id">
                    {{topic.topic.topic_title}}
                </router-link>
                {{  topic.pass_time  }}
                <br>
                <hr>

            </div>
            <hr>
            <h5>所参与的话题：</h5>
            <div v-for="topic in join_topic" :key="topic.topic._id">
                <router-link :to="'/user/' + topic.get_author._id">
                    <img :src="'http://localhost:4000/user/avatar/' + topic.get_author.path" style="width:35px; height:35px; border-radius: 5px">
                </router-link>
                <router-link :to="'/topic/detail?topic_id=' + topic.topic._id">
                    {{topic.topic.topic_title}}
                </router-link>
                {{  topic.pass_time }}

            <br>
            <hr>
            </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是 user profile 页面！',
            creat_topic: ``,
            join_topic: '',
            user: '',
            current_time: '',
            profile_link: '',
            domain: `${domain}`,
        }
    },
    methods: {
        get_profile() {
            // log('准备请求', this.profile_link)
            axios.get(this.profile_link).then(res => {
                // log('请求 user profile 页面成功! 这是给出的响应:', res.data)
                const datas = res.data
                this.creat_topic = datas.creat_topic
                this.join_topic = datas.join_topic
                this.user = datas.user
                this.current_time = datas.current_time
                this.profile_link = datas.profile_link
            }).catch(res => {
                log('解析 user profile  失败')
            })
        }
    },
    created() {
        this.$emit('removeHeader')
        this.profile_link = `${domain}/user/${this.$route.params.author_id}`
        this.get_profile()
    }
}
</script>

<style scoped>

</style>


