<template>
    <div>
        <!-- {{  msg  }} -->

        <div class="container">
            <div class="row">
                <div class='col-md-8 row-left'>
                    
                    <button class="add-hotspot btn btn-success" @click='addMethod'>新增一条话题</button>
                    <input type="input" class='topic_title' v-model='topic_title' @input='inputMethod' placeholder="请输入资讯标题">
                    <br>
                    <div v-show='!ifLong'>{{warn}}</div>
                    <br>
                    <br>
                    选择板块：
                    <select v-model='board_id' class="board_id" style='display: inline-block'>
                        <option v-for="(board, index) in boards"  :key='index' :value='board._id'>{{ board.board_content}}</option>
                    </select>
                    <hr>
                    <div class="upload-main">
                        <label for="exampleInputFile" title='上传图片'>Add Pic</label>
                        <input type="file" class="add-pic-one" id="exampleInputFile" style="display: none;" multiple>
                        <button class="add-pic-one-button" @click='uploadMethod'>上传</button>
                    </div>
                    <br>


                    <div id="editor">
                    <textarea :value="input" @input="update"></textarea>
                    <div v-html="compiledMarkdown" class='compiledMarkdown'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash';
import marked from 'marked';

export default {
    data () {
        return {
            msg: '这是 topic write 的页面！',
            topic_write_link: `${domain}/topic/write`,
            topic_add_link: `${domain}/topic/api/add`,
            topic_addPic_link: `${domain}/topic/api/addpics`,
            pic_path: '',
            board_id: '',
            topic_title: '',
            input: '',
            boards: '',
            ifSelected: false,
            domain: `${domain}`,
            ifLong: false,
            warn: '标题长度必须大于0 ！',
            
        }
    },
    methods: {
        get_write() {
            axios.get(this.topic_write_link).then(res => {
                const if_redirect = res.data.if_redirect
                if (if_redirect == true) {
                    this.$router.push({
                        name: 'UserLogin',
                        query: {
                            next_url: res.data.next_url,
                        }
                    })
                } else {
                    this.boards = res.data.boards
                    this.board_id = this.boards[0]._id
                    // log('this.board_id:', this.board_id)
                }
                // log('请求 topic write 成功, 这是给出的响应:', res.data)

            }).catch(res => {
                log('请求 topic write 失败')
            })
            
            // log('prop', e('.jaja').selected = true)
            // e('.jaja').selected = true
        },
        addMethod() {
            $('.compiledMarkdown img').addClass('img-responsive')
            if (this.ifLong == true) {
                axios.post(this.topic_add_link, {
                    board_id: this.board_id,
                    topic_title: this.topic_title,
                    // topic_content: this.compiledMarkdown,
                    topic_content: $('.compiledMarkdown').html(),
                }).then(res => {
                    // log('新增请求成功！', res)
                    this.$router.push({
                        name: 'TopicIndex',
                    })
                }).catch(res => {
                    log('新增请求失败')
                })
            }

        },
        get_addpics(formData) {
            axios.post(this.topic_addPic_link, formData).then(res => {
                const datas = res.data.path_list
                datas.forEach((filename) => {
                    this.input += `![](${domain}/topic/cover/${filename})`
                })
                
            }).catch(res => {
                log('新增请求失败')
            })
        },
        uploadMethod() {
            // log('上传按钮被点击！')
            var formData = new FormData()
            var file = e('.add-pic-one')
            var multi_files = file.files
            for (let file of multi_files) {
                formData.append('file', file)
            }
            this.get_addpics(formData)
        },
        update: _.debounce(function (e) {
            this.input = e.target.value
        }, 300),
        inputMethod() {
            // log('正在输入')
            if (this.topic_title.length > 0) {
                // log('字数超过15')
                this.ifLong = true
            } else {
                this.ifLong = false
            }
        }

    },
    computed: {
        compiledMarkdown: function () {
            return marked(this.input, { sanitize: true })
        }
    },
    created() {
        this.get_write()
    }
    
}
</script>

<style scoped>
    @import '../../../static/m1/css/style.css';
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

    .upload-main {
        /* border: 1px solid black; */
        position: absolute;
        left: 350px;
        width: 250px;
        top: -10px;
    }

    label {
        cursor: pointer;
    }
    


</style>


