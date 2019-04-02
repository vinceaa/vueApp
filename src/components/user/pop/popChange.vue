<template>
    <div class="pop-main" v-cloak>
        <!-- <div :class="['login-init']" @click='loginMethod'>
            登录
        </div>

        <div :class="['login-init']" @click='registerMethod'>
            注册
        </div> -->
        <br>


        <div>
            <transition name='login'>
                <pop-main-compa flag='login' v-show='ifLogin' :ifclear='ifclear' @close='closeMethodLogin' @get_model='lookStatus' @goSerach="go_search_login">
                    <div slot='head-info' class="">
                        <span>登录</span>
                        <span class='warn' style='color: red; left: 55px'>{{infor_login}}</span>
                        
                    </div>
                    <div slot='btns' class='login-action'>
                        <div class="login-btn"@click='loginActive'>
                            登录
                        </div>
                    </div>
                    <div slot='btn-info'>
                        <div class="register-info">
                            <a @click='registerMethod' href="#">
                                还没有账户？创建一个账户
                            </a>
                        </div>

                    </div>
                </pop-main-compa>

            </transition>

            <transition name='login'>
            
                <pop-main-compa @checkOk='checkOk' flag='register' v-show='ifRegister' @get_model='lookStatus' @close='closeMethodRegister'  @goSerach="go_search_regist">
                    <div slot='head-info' class="">
                        <span>注册</span>
                        <span class='warn'>{{infor}}</span>
                    </div>
                    <div slot='btns' class='login-action'>
                        <!-- <div class="login-btn" @click='registerActive'> -->
                        <div class="login-btn icon-main" @click="registerActive($event, '.login-btn', ripple_lista, 0, troubleStyleRibble)">
                            <div class='rippleInit' v-for="(e, index) in ripple_lista" :style='troubleStyleRibble' :key='index'>{{e}}</div>
                            注册
                        </div>


                    </div>
                    <div slot='btn-info'>
                        <div class="register-info">
                            <a @click='loginMethod'>返回登录</a>
                        </div>
                    </div>
                    <span slot='result' class='result'  v-show='ifResult'>
                        <span>注册成功, 请返回登录</span>
                    </span>
                </pop-main-compa>
            </transition>
            


        </div>
    </div>
</template>


<script>
import axios from 'axios'


import popMain from '@/components/user/pop/popMain'
import {rippleMethod} from '../../../utils/utils'

export default {
    components: {
        'pop-main-compa': popMain,
    },
    props: ['changeType'],
    data () {
        return  {
            msg: '这是 pop main 的数据',
            // ifLogin: true,
            ifLogin: false,
            ifRegister: false,
            username: '',
            password: '',
            ifclear: '',
            login_init_active: '',
            api_link: `${domain}/user/login`,
            index_link: `${domain}/`,
            infor: '',
            next_url: '',
            infor_login: '',
            api_link_user: `${domain}/user`,
            api_link_regist: `${domain}/user/register`,
            ripple_lista: [],
            troubleStyleRibble: '',
            checkStatus: false,
            ifResult: false,
            domain: `${domain}`,
        }
    },
    methods: {
        login() {
            axios.post(this.api_link, {
                username: this.username,
                password: this.password,
            }).then(res => {
                if (res.data.redirect == false) {
                    // log('登录失败')
                    
                    this.infor_login = res.data.infor + '请重新输入！'
                } else {
                    // log('登录成功')
                    const name = res.data.username
                    this.$router.push({
                        path: this.next_url,
                    })
                }

            }).catch(res => {
                log('数据发送失败')
            })
        },
        regist() {
            axios.post(this.api_link_regist, {
                username: this.username,
                password: this.password,
            }).then(res => {
                log('注册成功, 这是给出的响应:', res.data.infor)
                // this.infor = res.data.infor + '!'
                this.ifResult = true
                this.username = ''
                this.password = ''
            }).catch(res => {
                log('数据发送失败')
            })
        },
        loginMethod() {
            this.login_init_active = true

            this.ifLogin = true
            // this.ifLogin = false
            this.ifRegister = false
        },
        registerMethod() {
            this.ifRegister = true
            this.ifLogin = false
        },
        loginActive() {
            // log('登录按钮被点击')
            this.login()
            
        },
        // registerActive() {
        //     log('注册 按钮被点击', this.username, this.password)
        //     // this.regist()
            
        // },
        registerActive(event, element, ripple_lista, activePos, troubleStyleRibble) {
            // log('注册 按钮被点击', this.username, this.password)
            this.troubleStyleRibble = rippleMethod(event, element, ripple_lista, activePos, troubleStyleRibble)
            // log('当前状态:', this.checkStatus)
            if (this.checkStatus == true) {
                this.regist()
                
            }
            
        },        

        closeMethodLogin() {
            this.ifLogin = false
            this.login_init_active = false

        },
        closeMethodRegister() {
            this.ifRegister = false
        },
        lookStatus(value) {
            // log('父组件检测到数据发生了变化', value)
            if (value.type == 'username') {
                this.username = value.datas
            } else {
                this.password = value.datas

            }
        },
        checkOk(ifOk) {
            // log('子组件传来状态:', ifOk)
            this.checkStatus = ifOk
        },
        keyboardMethod() {
            log('正在输入', event.key)
            // const key = event.key
            // if (key == 'Enter') {
            //     this.searchMethod()
            // }
        },
        go_search_regist() {
            // log('regist')
            if (this.password.length > 8) {
                this.regist()
            }
        },
        go_search_login() {
            // log('login')
            this.login()
        },

    },
    created() {
        const types = {
            'login': 'ifLogin',
            'register': 'ifRegister',
        }
        const currentType = types[this.changeType.name]
        // log('currentType:', currentType)
        this[currentType] = true
        // this.next_url = this.$route.query.next_url || '/'
        this.next_url = this.$route.query.next_url || '/topic'
    }

}
</script>


<style scoped>
@import '../../../../static/css/pop.css';
@import '../../../../static/css/replyList/ripple.css';



</style>

