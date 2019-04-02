<template>
    <div>
        <div class="conatiner">
            <div class="row">
                {{domain}}
                <div class="col-md-8 row-left">
                    <button class="add-hotspot btn btn-success" @click='addMethod'>新增一条资讯</button>
                    <input type="input" class='hotspot_title' v-model='hotspot_title' name="hotspot_title" placeholder="请输入资讯标题">
                    <select name="hotspot_type" v-model='hotspot_type' class="hotspot_type">
                        <option value="0">普通资讯</option>
                        <option value="1">热门资讯</option>
                    </select>
                    <div class="upload-main">
                        <label for="exampleInputFile">Add Pic</label>
                        <input type="file" class="add-pic-one" id="exampleInputFile" style="display: none;">
                        <button class="add-pic-one-button" @click='uploadMethod'>上传</button>
                    </div>
                    <br>
                    <div id="editor">
                        <textarea :value="input" @input="update"></textarea>
                        <div v-html="compiledMarkdown" class='compiledMarkdown'></div>
                    </div>
                </div>

                <div class='col-md-3 row-right'>
                    <h3>资讯管理</h3>
                    <router-link to="/hotspot">
                        资讯首页
                    </router-link>

                    <hr>
                    <h4>载入所有的资讯</h4>

                    <div class='hotspot-main'>
                        <div class="hotspot-head">
                            <a @click="tagMethod('all')"><span> 全部 </span></a>
                            <a @click="tagMethod('normal')"><span> 普通资讯 </span></a>
                            <a @click="tagMethod('hot')"><span> 热门资讯 </span></a>
                        </div>
                    </div>

                    <div v-for="(hotspot, index) in hotspots" class="hotspot-ceil" :key="index">
                        <img :src="`${domain}/hotspot/cover/${hotspot.path}`" class='hot-cover  testImg img-responsive' width="25" height="25">
                        <div class='pic-right'>
                            <span class="label label-warning" v-if="hotspot.hotspot_type == 1">热门资讯</span>
                            <span class="label label-warning" v-else>普通资讯</span>
                            <router-link :to="`/hotspot/detail/${hotspot._id}`">
                                {{ hotspot.hotspot_title }}
                            </router-link>
                            <router-link :to="`/hotspot/edit?hotspot_id=${hotspot._id}`">
                                编辑
                            </router-link>
                            <a class="remove-hot" :data-id="hotspot._id" @click='deleteMethod(hotspot._id)'>
                                删除
                            </a>

                        </div>
                        <br>
                        <br>
                    </div>


                    <ul class="pagination pagination-sm">
                        <li>
                            <a @click='grpupMethod(pre_id)' aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li v-for="(i, index) in page_number" :class='{active: i - 1 == group_id}' :key='index'>
                            <a @click='grpupMethod(i - 1)' aria-label="Previous">
                                {{i}}
                            </a>
                        </li>
                        <li>
                            <a @click='grpupMethod(next_id)' aria-label="Previous">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
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
            msg: '这是 hotspot admin 页面！',
            admin_link: `${domain}/hotspot/admin`,
            submit_link: `${domain}/hotspot/api/add`,
            addPic_link: `${domain}/hotspot/api/addpic`,
            delete_link: `${domain}/hotspot/api/delete?hotspot_id=`,
            hotspots: '',
            group_id: '',
            page_number: '',
            pre_id: '',
            next_id: '',
            input: '',
            hotspot_type: '',
            hotspot_title: '',
            domain: `${domain}`
        }
    },
    methods: {
        getLink(tab, group_id) {
            return `${domain}/hotspot/admin?tab=${tab}&group_id=${group_id}`
        },
        get_admin() {
            axios.get(this.admin_link).then(res => {
                // log('请求 hotspot admin 成功， 这是给出的响应:', res.data)
                const datas = res.data
                this.hotspots = datas.hotspots
                this.group_id = datas.group_id
                this.page_number = datas.page_number
                this.pre_id = datas.pre_id
                this.next_id = datas.next_id
                this.current_type = datas.current_type
            }).catch(res => {
                log('请求 hotspot admin 失败')
            })
        },
        tagMethod(types) {
            this.current_type = types
            this.admin_link = `${domain}/hotspot/admin?tab=${types}`
            this.get_admin()
        },
        grpupMethod(group_id) {
            // log('this.current_type:', this.current_type)
            this.admin_link = `${domain}/hotspot/admin?tab=${this.current_type}&group_id=${group_id}`
            this.get_admin()
        },
        update: _.debounce(function (e) {
            this.input = e.target.value
        }, 300),
        submitChange() {
            $('.compiledMarkdown img').addClass('img-responsive')
            // log('this.input:', this.input)
            axios.post(this.submit_link, {
                hotspot_title: this.hotspot_title,
                hotspot_type: this.hotspot_type,
                hotspot_content: $('.compiledMarkdown').html(),
                markdown_content: this.input,
            }).then(res => {
                this.get_admin()
            }).catch(res => {

            })
        },
        addMethod() {
            // log('新增按钮被点击')
            this.submitChange()
        },
        add_pic(formData) {
            axios.post(this.addPic_link, formData).then(res => {
                const filename = res.data.path
                const tag = `![](${domain}/hotspot/cover/${filename})`
                this.input += tag
            }).catch(res => {
                log('上传图片失败')
            })
        },
        uploadMethod() {
            var formData = new FormData()
            var file = e('.add-pic-one')
            var multi_files = file.files
            for (let file of multi_files) {
                formData.append('file', file)
            }
            this.add_pic(formData)
        },
        get_delete(hotspot_id) {
            axios.get(this.delete_link + hotspot_id).then(res => {
                this.get_admin()
            }).catch(res => {
                log('delete 请求失败')
            })
        },
        deleteMethod(hotspot_id) {
            // log('删除按钮被点击', hotspot_id)
            this.get_delete(hotspot_id)
        }
    },
    created() {
        this.$emit('removeHeader')
        const tab = this.$route.query.tab
        const group_id = this.$route.query.group_id
        this.get_admin()

    },
    computed: {
        ...mapState(['left_content']),
        compiledMarkdown: function () {
            return marked(this.input, { sanitize: true })
        },

    },
}
</script>

<style scoped>
@import '../../../static/css/index.css';


    .actives {
        width: 50px;
        height: 20px;
        text-align: center;
        border: 1px solid beige;
        background-color: lightcoral;
        display: inline-block;
        border-radius: 4px;
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
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        padding: 0 20px;
        height: 700px;
        
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

    .hotspot-head a, .pagination a {
        cursor: pointer;
    }

    .testImg {
        position: absolute;
    }

    .pic-right {
        margin-left: 30px;
    }

    .pic-right a {
        cursor: pointer;
    }

    .upload-main {
        position: relative;
    }
</style>


