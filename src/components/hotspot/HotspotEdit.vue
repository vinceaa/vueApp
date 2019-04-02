<template>
    <div>
        <h4>hotspot edit!</h4>
        <router-link to="/hotspot/admin">资讯首页</router-link>
        <br>
        <img class="hotspot-cover testImg" :src="`${domain}/hotspot/cover/${hotspot.path}`" width="400px" height="300">
        <!--<form action="/hotspot/upload" method="post" enctype="multipart/form-data">-->
            <!--<input type="file" name="file" class="upload_file" multiple/>-->
            <br>

            <label for="hotcover-add">Add Cover</label>
            <input type="file" style="display: none" class="upload_file" id="hotcover-add" multiple>
            <button class="btn uploads" @click='uploadMethod'>上传资讯封面</button>
        <!--</form>-->


        <div class="titles">

        <!--<form action="/hotspot/update" method="post">-->
            <input hidden type="input" class="hotspot_id" name="hotspot_id" :value="hotspot._id" >
            <br>
            <input type="input" name="hotspot_title" class="hotspot_title" v-model="hotspot.hotspot_title" placeholder="请输入修改的资讯标题">
            <select class="hotspot_type" name="hotspot_type" v-model='hotspot_type'>
                <option value="1">热门资讯</option>
                <option value="0">普通资讯</option>
            </select>
            <br>
            <br>
            <hr>
        </div>



        <div class="container">
            <div class="row">
                <div class="upload-main upload-main-new">

                    <label for="exampleInputFile">Add Pic</label>
                    <input type="file" class="add-pic-one" id="exampleInputFile" style="display: none;" multiple>
                    <button class="add-pic-one-button" @click='uploadPic'>上传</button>
                    <button class="change" @click='changeMedthod'>修改</button>

                </div>
                <br>
                <br>

                <div id="editor">
                <textarea v-model='input' @input="update"></textarea>
                <div v-html="compiledMarkdown" class='compiledMarkdown'></div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'


import store from '@/vuex/hotsoptContent'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

import _ from 'lodash';
import marked from 'marked';

export default {
    store,
    data () {
        return {
            msg: '这是 hotspot edit 页面！',
            edit_link: `${domain}/hotspot/edit?hotspot_id=`,
            upload_cover_link: `${domain}/hotspot/api/upload`,
            upload_pic_link: `${domain}/hotspot/api/addpics`,
            submit_change: `${domain}/hotspot/api/update`,
            hotspot: '',
            input: '',
            hotspot_type: '',
            testSelect: '',
            text_content: '',
            hostspot_id: '',
            domain: `${domain}`
            
         }
    },
    methods: {
        get_edit() {
            axios.get(this.edit_link + this.$route.query.hotspot_id).then(res => {
                // log('请求 hotspot edit 成功！这是给出的响应: ', res.data)
                this.hotspot = res.data.hotspot
                this.input = this.hotspot.markdown_content
                // this.hotspot.hotspot_content 
            }).catch(res => {
                log('请求 hotspot edit 失败！ ')
            })
        },
        upload_cover(formData) {
            // log('upload_cover post 进行')
            axios.post(this.upload_cover_link, formData).then(res => {
                // log('上传封面请求成功！这是给出的响应:', res.data)
                const hotspot_path = res.data.path
                this.hotspot.path = res.data.path

            }).catch(res => {
                log('上传封面请求失败！')
            })
        },
        update: _.debounce(function (e) {
            this.input = e.target.value
        }, 300),
        uploadMethod() {
            // log('上传封面按钮被点击！')
            var formData = new FormData()
            var file = e('.upload_file')
            var multi_files = file.files
            for (let file of multi_files) {
                formData.append('file', file)
            }
            formData.append('hotspot_id', this.hotspot._id)
            this.upload_cover(formData)
            
        },
        upload_pic_post(formData) {
            // log('upload_pic post 进行')
            axios.post(this.upload_pic_link, formData).then(res => {
                // log('上传图片请求成功！这是给出的响应:', res.data)
                const datas = res.data.path_list
                datas.forEach((filename) => {
                    const current_val = this.input
                    this.input += `![](${domain}/hotspot/cover/${filename})`

                })

            }).catch(res => {
                log('上传封面请求失败！')
            })
        },
        submitChange() {
            $('.compiledMarkdown img').addClass('img-responsive')
            axios.post(this.submit_change, {
                hotspot_title: this.hotspot.hotspot_title,
                hotspot_id: this.hotspot._id,
                hotspot_type: this.hotspot_type,
                hotspot_content: $('.compiledMarkdown').html(),
                markdown_content: this.input,
            }).then(res => {
                // log('提交修改响应成功！这是给出的响应:', res.data)
                this.$router.push({
                    name: 'HotspotAdmin'
                })

                // // log('提交之前的 left content', this.left_content)
                // this.left_content.map((e) => {
                //     if (e.id == this.hostspot_id) {
                //         e.content = this.input
                //     }
                // })
                // // log('提交之后的 left content', this.left_content)


            }).catch(res => {
                log('上传封面请求失败！')
            })
        },
        changeMedthod() {
            // log('修改按钮被点击')
            this.submitChange()
        },
        uploadPic() {
            // log('上传图片按钮被点击')
            var formData = new FormData()
            var file = e('.add-pic-one')
            var multi_files = file.files
            for (let file of multi_files) {
                formData.append('file', file)
            }
            this.upload_pic_post(formData)
        }
    },
    computed: {
        ...mapState(['left_content']),
        compiledMarkdown: function () {
            return marked(this.input, { sanitize: true })
        }
    },
    created() {
        this.hostspot_id = this.$route.query.hotspot_id
        this.get_edit()
    }
}
</script>

<style scoped>
@import '../../../static/m1/css/style.css';
@import '../../../static/css/index.css';


    form .form-control {
        height: 400px;
        width: 300px;
    }

    .upload-main-new {
        position: relative;
        top: 19px;
        left: 104px;
    }

    .titles {
        position: relative;
        left: 64px;
        top: 110px;
    }

    
    html, body, #editor {
        margin: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }

    textarea, #editor div {
        display: inline-block;
        width: 49%;
        /* height: 100%; */
        height: 800px;
        vertical-align: top;
        box-sizing: border-box;
        padding: 0 20px;
    }

    textarea {
        border: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 14px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
    }

    code {
        color: #f66;
    }

    @font-face {
        font-family: 'Flamenco';
        font-style: normal;
        font-weight: 400;
        src: local('Flamenco Regular'), local('Flamenco-Regular'), url(https://fonts.gstatic.com/s/flamenco/v8/neIIzCehqYguo67ssZWBFqw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    .testImg {
        margin-left: 700px;
        margin-top: -60px;
    }
</style>


