<template>
    <div>
        {{  msg  }}
            <h4>用户界面！</h4>

            <div class="input-group">
                username: {{ username }}
                password: {{ password }}
                <form action="/user/register" method="post" onsubmit='return false'>
                    <input type="input" class="form-control" v-model='username' name='username' placeholder="请输入用户名">
                    <br>
                    <input type="input" class="form-control" v-model='password' name='password' placeholder="请输入密码">
                    <br>
                    <button class="btn btn-info" @click='registMethod'>注册</button>
                </form>
                {{ infor }}
                <br>
                <router-link to="/user/login">返回登录</router-link>
            </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是 user register 页面',
            api_link: `${domain}/user`,
            api_link_regist: `${domain}/user/register`,
            infor: '',
            username: '',
            password: '',
            infor: '',
            domain: `${domain}`,
            
        }
    },
    methods: {
        get_infor() {
            axios.get(this.api_link).then(res => {
                // log('这是给出的响应:', res)
            }).catch(res => {
                log('解析错误')
            })
        },
        registMethod() {
            // log('registMethod 进行！')
            axios.post(this.api_link_regist, {
                username: this.username,
                password: this.password,
            }).then(res => {
                // log('发送成功, 这是给出的响应:', res.data.infor)
                this.infor = res.data.infor
                this.username = ''
                this.password = ''
            }).catch(res => {
                log('数据发送失败')
            })
        }
    },
    created() {
        // log('hahah')
        this.get_infor()

    }
}

</script>

<style scoped>

</style>


