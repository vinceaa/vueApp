<template>
    <div>
        {{  msg  }}
            <div class="input-group">
                username: {{ username }}
                password: {{ password }}
                <h3>登录界面！</h3>
                <form action="/user/login" method="post" onsubmit='return false'>
                    <!-- <input hidden type="input" name="next_url" value="next_url"> -->
                    <input class="form-control" type="input" v-model='username' placeholder="请输入用户名">
                    <br>
                    <input class="form-control" type="input" v-model='password' placeholder="请输入密码">
                    <br>
                    <button class="btn btn-info" @click='loginMethod'>登录</button>
                </form>
                <br>
            </div>
            {{ infor }}
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            msg: '这是登录的页面！',
            api_link: `${domain}/user/login`,
            index_link: `${domain}/`,
            infor: '',
            next_url: '',
            username: '',
            password: '',
            domain: `${domain}`,
            
            
        }
    },
    methods: {
        loginMethod() {
            axios.post(this.api_link, {
                username: this.username,
                password: this.password,
            }).then(res => {
                if (res.data.redirect == false) {
                    this.infor = res.data.infor
                } else {
                    // log('登录成功')
                    const name = res.data.username
                    // this.$router.push({
                    //     name: 'main',
                    // })
                    this.$router.push({
                        path: this.next_url,
                    })
                }

            }).catch(res => {
                log('数据发送失败')
            })
        }
    },
    created() {
        this.next_url = this.$route.query.next_url || '/'
        // log('this.next_url:', this.next_url)
        // log('hahah')

    }
}
</script>

<style scoped>

</style>


