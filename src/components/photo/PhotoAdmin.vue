<template>
    <div>
        <!-- {{ msg }} -->
        <div class="container">
            <div class="row test">
                <div class="col-md-8 row-left">
                    <button class="add-hotspot btn btn-success" @click='addMethod'>新增一个相册</button>
                    <input type="input" v-model='photo_title' class='photo_title hotspot_title' placeholder="请输入相册标题">
                    <br>
                    <input type="input" v-model="photo_info" class='photo_info' placeholder="请输入相册的描述">
                    <select name="type_id" class="hotspot_type" v-model="hotspot_type">
                            <!-- <option v-for="(board, index) in pboards" :value="board._id" :key="index">{{board.board_content}}</option> -->
                            <option v-for="(board, index) in pboards" :value="board._id" :key="index">{{board.pboard_ceil_content}}</option>
                            
                    </select>
                    <div class="upload-main">
                        <label for="exampleInputFile">Add Pic</label>
                        <input type="file" class="add-pic-one" id="exampleInputFile" style="display: none;" multiple>
                        <button class="add-pic-one-button" @click='uploadMethod'>上传</button>
                    </div>
                    <br>


                    <!-- <button class='btn btn-warning' @click='goCrawl'>获取爬虫信息</button>
                    <br>
                    <br>
                    <br> -->

                    <input type="input" v-model='url1'  placeholder="请输入终止的页数">
                    <button class='btn btn-warning' @click="goCrawl(0, url1)">爬取前 n 页的相册</button>
                    <br>
                    <br>
                    <br>
                    
                    
                    <input type="input" v-model='url2' placeholder="请输入页数">
                    <button class='btn btn-warning' @click='goCrawl(1, url2)'>爬取第 n 页的相册</button>
                    <br>
                    <br>
                    <br>
                    
                    <input type="input" v-model='url3' placeholder="请输入完整链接">
                    <button class='btn btn-warning' @click='goCrawl(2, url3)'>爬取指定一个相册</button>
                    <br>
                    <br>
                    <br>

                    <select name="type_id" class="hotspot_type" @change='changeMethod(main_type)' v-model="main_type">
                            <option v-if="pboards_main" v-for="(board, index) in pboards_main" :value="board._id" :key="index">{{board.board_content}}</option>
                    </select>

                    <select name="type_id" class="hotspot_type" v-model="photo_type">
                            <option v-for="(board, index) in pboards" :value="board._id" :key="index">{{board.pboard_ceil_content}}</option>
                    </select>


                    <!-- photo_type:{{photo_type}} -->
                    <input type="input" v-model='url4' placeholder="请输入该分类下的链接">
                    <button class='btn btn-warning' @click='goCrawl(3, url4, photo_type)'>爬取某一分类的相册</button>
                    <br>
                    <br>
                    <br>
                    


                </div>


                <div class="col-md-3 row-right">
                    
                    <h3>相册管理</h3>
                    <!-- <router-link to="/photo">
                        相册首页
                    </router-link> -->

                    <a @click='toPhotoIndex'>相册首页</a>

                    <hr>
                    <h4>载入所有的相册</h4>
                    <div class="hotspot-main">
                        <div class="hotspot-head">
                            <a @click="tabMethod('all')" :class="actives">
                                <span>全部</span>
                            </a>
                            <div class='photo-board' v-for="(board, index) in pboards" :key="index">
                                <a @click='tabMethod(board.board_content)' :class="{actives: board.board_content == pboard_type}">
                                    <span>
                                        {{board.board_content}}
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div class="hotspot-ceil" v-for="(photo, index) in photos " :key="index">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img style='position: absolute;' v-if="photo.photo" :src="`${domain}/photo/cover/${photo.photo.cover_path}`" class='hot-cover img-responsive' width="25" height="25">
                                        <span style='position: absolute; margin-left: 40px;' class="label label-warning" v-if="photo.get_board">
                                            {{photo.get_board.board_content}}
                                        </span>

                                    </div>
                                    <div class="col-md-8">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <router-link :to="`/photo/detail/${photo.photo._id}`">
                                                    <p style='position: absolute; margin-left: 20px; margin-right: 60px;' class="wrap over" v-if="photo.photo">
                                                        {{ photo.photo.photo_title }}
                                                    </p>
                                                </router-link>
                                            </div>
                                            <a v-if='photo.photo' @click='editMethod(photo.photo._id)'>编辑</a>
                                            <a  v-if="photo.photo" :data-id="photo.photo._id" class="remove-hot" @click='deleteMethod(photo.photo._id)'>
                                                删除
                                            </a>
                                                
                                        </div>
                                    </div>
                                </div>

                        </div>

                        <ul class="pagination pagination-sm">
                            <li>
                                <a @click='groupMethod(pboard_type, pre_id)' aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li :class="{active: i - 1 == group_id}"  v-for="(i, index) in page_number" :key="index">
                                <a @click='groupMethod(pboard_type, i - 1)'>
                                    {{i}}
                                </a>
                            </li>
                            <li>
                                <a @click='groupMethod(pboard_type, next_id)'  aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </div>
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
            msg: '这是 photo amdmin 页面！ ',
            admin_link: `${domain}/photo/admin`,
            upload_link: `${domain}/photo/api/addpics`,
            add_link: `${domain}/photo/api/add`,
            delete_link: `${domain}/photo/api/delete?photo_id=`,
            crawl_link: `${domain}/photo/crawl`,
            get_ceil_link: `${domain}/photo/get/ceil/board`,
            photos: '',
            group_id: '',
            page_number: '',
            pre_id: '',
            next_id: '',
            pboards: '',
            actives: '',
            pboard_type: '',
            input: '',
            photo_title: '',
            photo_info: '',
            hotspot_type: '',
            pic_list: [],
            domain: `${domain}`,
            url1: '',
            url2: '',
            url3: '',
            url4: '',
            photo_type: '',
            pboards_main: '',
            main_type: '',

        }
    },
    methods: {
        get_admin(link) {
            axios.get(link).then(res => {
                // log('请求 photo admin 成功', res.data)
                const datas = res.data
                this.photos = datas.photos
                this.group_id = datas.group_id
                this.page_number = datas.page_number
                this.pre_id = datas.pre_id
                this.next_id = datas.next_id
                this.pboards = datas.pboards
                this.pboards_main = datas.pboards_main
                
                this.actives = datas.actives
                this.pboard_type = datas.pboard_type
                this.hotspot_type = datas.pboards[0]._id
                this.photo_type = datas.pboards[0]._id
                this.main_type = datas.pboards_main[0]._id
            }).catch(res => {
                log('请求 photo admin 失败')
            })
        },
        get_upload(formData) {
            // log('正在上传')
            axios.post(this.upload_link, formData).then(res => {
                log('请求上传图片成功, 这是给出的响应:', res.data)
                this.pic_list = res.data.path_list
            }).catch(res => {
                log('请求上传图片失败')
            })
        },
        get_add() {
            axios.post(this.add_link, {
                photo_title: this.photo_title,
                photo_info: this.photo_info,
                type_id: this.hotspot_type,
                pic_list: this.pic_list,
            }).then(res => {
                this.get_admin(this.admin_link)
                
            }).catch(res => {
                log('photo 新增请求失败')
            })
        },
        get_delete(photo_id) {
            axios.get(this.delete_link + photo_id).then(res => {
                if (res.data.error == '1') {
                    log('没有权限')
                } else {
                    this.get_admin(this.admin_link)
                    // log("请求删除 photo 成功 ！, 这是给出的响应:", res.data)
                }
                
            }).catch(res => {
                log("请求删除 photo 失败 ！", res.data)
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
        },
        addMethod() {
            // log('新增按钮被点击')
            this.get_add()
        },
        tabMethod(board_content) {
            this.get_admin(`${this.admin_link}?tab=${board_content}`)
        },
        groupMethod(tab, group_id) {
            this.get_admin(`${this.admin_link}?tab=${tab}&group_id=${group_id}`)
        },
        deleteMethod(photo_id) {
            this.get_delete(photo_id)
        },
        editMethod(photo_id) {
            this.$router.push({
                name: 'PhotoEdit',
                query: {
                    photo_id,
                }
            })
        },
        toPhotoIndex() {
            this.$router.push({
                name: 'Photo',
            })
        },
        crawlMethod(data) {
            axios.get(this.crawl_link, {
                params: data,
            }).then(res => {
                log('获取爬虫信息成功, 这是给出的响应:', res.data)
                this.get_admin(this.admin_link)
                    
            }).catch(res => {
                log('获取爬虫失败')
            })
        },
        goCrawl(status, url, photo_type) {
            log('获取爬虫按钮被点击')
            const data = {
                status,
                url,
                photo_type,
            }
            this.crawlMethod(data)
        },
        get_ceil_borad(main_type) {
            axios.get(this.get_ceil_link, {
                params: {
                    type: main_type
                }
            }).then(res => {
                log('请求子版块成功, 这是给出的响应:', res.data)
                this.pboards = res.data.ceil_boards
                this.photo_type = this.pboards[0]._id
                
            }).catch(res => {
                log('请求子版块失败')
            })
        },
        changeMethod(main_type) {
            log('正在选择', main_type)
            this.get_ceil_borad(main_type)
        }

    },
    computed: {

    },
    created() {
        this.$emit('removeHeader')
        this.get_admin(this.admin_link)
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

    .hotspot-head span {
        color: #000;
        margin-left: 5px;
    }

    .hotspot-head {
        margin-bottom: 8px;
    }

    .hotspot-ceil span {
        margin-right: 8px;
    }

    .wrap {
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        overflow: hidden;
        /*border: 1px solid black;*/
    }

    .bds {
        /*border: 1px solid black;*/
        /*height: 220px;*/
        /*margin: 15px;*/
        padding: 0px;
        margin: 10px;
    }

    .pic-main {
        height: 150px;
        width: 150px;
        /*border: 1px solid black;*/
        box-shadow:  1px 2px 3px grey;
        /*margin: 10px;*/
    }



    .test {
        position: relative;
        left: 0px;
    }
    
    .photo-board {
        display: inline-block;
    }

    a {
        cursor: pointer;
    }

    .upload-main {
        position: relative;
        
    }

    .over {
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        /* border: 1px solid black; */
        width: 90px;
    }

</style>


