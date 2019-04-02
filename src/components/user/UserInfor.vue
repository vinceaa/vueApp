<template>
    <div>
        <router-link to="/topic">返回帖子列表</router-link>
        <div class='user-main'>
            <img :src="`${domain}/user/avatar/${coverPic}`">
        </div>
        <div class="upload-main">
                <button class='btn btn-success'>
            <label for="exampleInputFile">
                        上传你的头像
            </label>
                </button>
            <input type="file" class="add-pic-one" id="exampleInputFile" style="display: none;">
            <button class="btn btn-info add-pic-one-button" @click='uploadMethod'>确认</button>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是个人信息的页面！',
            user_id: '',
            userLink: `${domain}/user`,
            uploadLink: `${domain}/user/upload`,
            user: '',
            coverPic: '',
            domain: `${domain}`,
        }
    },
    methods: {
        get_user() {
            axios.get(this.userLink).then(res => {
                this.user = res.data.user
                this.coverPic = this.user.path
            }).catch(res => {
                log('请求 user 实例失败')

            })
        },
        get_upload(formData) {
            axios.post(this.uploadLink, formData).then(res => {
                // log('请求上传图片成功, 这是给出的响应:', res.data)
                // this.pic_list = res.data.path_list
                this.get_user()
                
            }).catch(res => {
                log('请求上传图片失败')
            })
        },
        uploadMethod() {
            // log('上传按钮被点击')
            var formData = new FormData()
            var file = e('.add-pic-one')
            var multi_files = file.files
            for (let file of multi_files) {
                formData.append('file', file)
            }
            this.get_upload(formData)
        }
    },
    
    created() {
        this.$emit('removeHeader')
        this.user_id = this.$route.query.userId
        this.get_user()

    }
}
</script>

<style scoped>
    img {
        width: 200px;
        height: 200px;
    }

    label {
        cursor: pointer;
    }
</style>

