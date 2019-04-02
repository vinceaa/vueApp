<template>
    <div>
        <div class="test-main">
            <div class="login-ceil">
                <!-- <span>登录</span> -->
                <span class="close-btn" @click='closeMethod'>
                </span>
                <slot name='head-info'></slot>
                <compa @get_model      = 'lookStatus' 
                       @re_blur        = 're_blur'
                       @check_username = 'check_username'
                       :ifWarning      = 'ifWarning_username'
                       @goSerach       = 'emit_search'
                 type='username'  :label_type="`username-lable${flag}`">
                    <span slot='placeHolder' class='input-info-main'>请输入你的账号</span>
                    <span class='submitInfo' slot='submitInfo' v-show='ifWarning_username'>{{submitInfo_username}}</span>
                </compa>


                <compa @get_model      = 'lookStatus'
                       @check_password = 'check_password'
                       @re_blur        = 're_blur'
                       :ifWarning      = 'ifWarning_password'
                       @goSerach       = 'emit_search'
                
                    type='password' :label_type="`password-lable${flag}`">
                    <span slot='placeHolder' class='input-info-main'>请输入你的密码</span>
                    <span class='submitInfo' slot='submitInfo' v-show='ifWarning_password'>{{submitInfo_password}}</span>
                </compa>

                <slot name='btns'></slot>
                <slot name='btn-info'></slot>
                <slot name='result'></slot>


            </div>

        </div>
    </div>
</template>


<script>
import inputPop from '@/components/user/pop/inputPop'
import axios from 'axios'
import {
    check_username,
    check_blank,
} from '../../../utils/utils'

export default {
    components: {
        compa: inputPop,
    },
    props: ['ifclear', 'flag'],
    data () {
        return {
            rename_link: `${domain}/user/register/ifRename`,
            username: '',
            password: '',
            models_data: '',
            type: '',
            // submitInfo: '用户名不能为空',
            ifWarning_username: false,
            ifWarning_password: false,
            submitInfo_username: '',
            submitInfo_password: '',
            // ifResult: false,
            domain: `${domain}`,
        }
    },
    methods: {
        testMethod() {
            // log('test')
        },
        lookStatus(value) {
            this.$emit('get_model', {
                datas: value.datas,
                type: value.type
            })
        },
        closeMethod() {
            // this.ifclear = true
            // this.$emit('close')
            this.$router.push({
                name: 'TopicIndex'
            })
        },
        check_rename(username) {
            axios.post(this.rename_link, {
                username,
            }).then(res => {
                // log('请求 rename 成功, 这是给出的响应:', res.data)
                const ifRename = res.data.ifRename
                if (ifRename == false && this.flag == 'register') {
                    this.ifWarning_username = true
                    this.submitInfo_username = '用户名已存在'
                }
            }).catch(res => {
                // log('请求 rename 失败')
            })
            
        },
        check_username(username) {
            // log('失去焦点，应该检查用户名的合法性', username, username.length)
            // log('检查是否有非法字符:', check_username(username))
            // log('正在检查用户名', this.rename_link)
            this.check_rename(username)

            const ifLegal = check_username(username)
            if (username.length == 0 && this.flag == 'register') {
                // log('为 0')
                this.ifWarning_username = true
                this.submitInfo_username = '用户名不能为空'

            } else if(username.length < 3 && this.flag == 'register') {
                this.ifWarning_username = true
                this.submitInfo_username = '用户名长度必须大于3'
            } else if(ifLegal == false && this.flag == 'register') {
                this.ifWarning_username = true
                this.submitInfo_username = '用户名中不允许包含字符'
            } else {
                this.ifWarning_username = false
            }
        },
        check_password(password) {
            const ifBlank = check_blank(password)
            if (password.length == 0 && this.flag == 'register') {
                // log('为 0')
                this.ifWarning_password = true
                this.submitInfo_password = '密码不能为空'
            } else if (password.length < 8 && this.flag == 'register') {
                // log('< 8')
                this.ifWarning_password = true
                this.submitInfo_password = '密码长度必须大于8位'
            } else if (ifBlank == true && this.flag == 'register') {
                // log('空格')
                this.ifWarning_password = true
                this.submitInfo_password = '密码中不能包含空格'
            } else {
                this.ifWarning_password = false
            }
            // log('失去焦点，应该检查密码的合法性', this.ifWarning_password)
            this.$emit('checkOk', !this.ifWarning_username && !this.ifWarning_password)
        },
        re_blur(type) {
            if (type == 'username') {
                this.ifWarning_username = false
            } else {
                this.ifWarning_password = false
            }
        },
        emit_search() {
            this.$emit('goSerach')
            // log('第一层 emit search')
        }
  

    },

}
</script>


<style scoped>
@import '../../../../static/css/pop.css';

</style>

