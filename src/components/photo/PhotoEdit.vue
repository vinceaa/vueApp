<template>
    <div>
        {{ msg }}
        
        <h4>hotspot edit!</h4>
        <router-link to="/photo/admin">
            相册管理
        </router-link>
        <br>
        <img class="photo-cover" :src="`${domain}/photo/cover/${photo.cover_path}`" width="400px" height="300">

        <label for="add-cover">Add Cover</label>
        <input type="file" class="upload_file" id="add-cover" style="display: none;" multiple>
        <br>
        <button class="btn uploads" @click='uploadMethod'>上传资讯封面</button>
        <br>
        <input type="input" class="photo_title" name="photo_title" v-model="photo.photo_title"  placeholder="请输入修改的资讯标题">
        <br>
        <input type="input" class='photo_info photo_info' name="photo_info" v-model="photo.photo_info" placeholder="请输入相册的描述">
        <select name="type_new" v-model="pboard_id" class="hotspot_type" style="top:0px; left:0px;position: relative">
            <option v-for="(pboard, index) in pboards" :value="pboard._id" :key="index">{{pboard.pboard_ceil_content}}</option>
        </select>
        <div class="titles">
            <br>
            <hr>
        </div>
        <div class="container">
            <div class="row">
                <div class="upload-main upload-main-new">
                    <label for="exampleInputFile">Add Pic</label>
                    <input type="file" class="add-pic-one" id="exampleInputFile" style="display: none;" multiple>
                    <button class="add-pic-one-button" @click='addPicMethod'>上传</button>
                    <button class="change" @click='submitMethod'>修改</button>
                </div>
                <br>
                
             
            </div>
        </div>
        <div class="container-fluid">
            <div class="row" >
                <div class="pic-list" :style="{
                                        backgroundImage: `url(${domain}/photo/cover/${pic})`,
                                    }" v-for="(pic, index) in photo.pic_list" :key='index'>
                    <button class='btn btn-success pic-btn' @click='deleteMehod(index)'>删除</button>
                    <span class='pic-times' v-if="c_time">{{ c_time }}</span>
                </div>
            </div>

        </div>
        <div class="container">
            <div class="row">
                <!-- <div class='test col-md-6 col-sm-6 col-xs-6'></div>
                <div class='test col-md-6 col-sm-6 col-xs-6'></div>
                <div class='test col-md-6 col-sm-6 col-xs-6'></div>
                <div class='test col-md-6 col-sm-6 col-xs-6'></div>
                <div class='test col-md-6 col-sm-6 col-xs-6'></div>
                <div class='test col-md-6 col-sm-6 col-xs-6'></div> -->
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是 photo edit 的页面!',
            edit_link: `${domain}/photo/edit?hotspot_id=`,
            photo_id: '',
            photo: '',
            pboards: '',
            upload_link: `${domain}/photo/api/upload`,
            add_pic_link: `${domain}/photo/api/addpics/add`,
            pboard_id: '',
            submit_link: `${domain}/photo/api/update`,
            photo_title: '',
            c_time: '',
            domain: `${domain}`,
            
        }
    },
    methods: {
        get_edit(link) {
            axios.get(link).then(res => {
                this.photo = res.data.photo
                this.pboards = res.data.pboards
                // log('请求成功 this.photo:', this.photo)
                
            }).catch(res => {
                log('请求 edit 响应失败!')
            })
        },
        get_upload(formData) {
            axios.post(this.upload_link, formData).then(res => {
                this.get_edit(this.edit_link + this.photo_id)
            }).catch(res => {
                log('上传图片响应请求失败!')
            })
        },
        get_add_pic(formData) {
            axios.post(this.add_pic_link, formData).then(res => {
                // log('添加图片响应成功, 这是给出的响应:', res.data)
                this.get_edit(this.edit_link + this.photo_id)
                const d = new Date()
                this.c_time = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
                // log('c time:', this.c_time)
                
            }).catch(res => {
                log('上传图片响应请求失败!')
            })
        },
        get_delete_photo(link) {
            // log('正在删除')
            axios.get(link).then(res => {
                this.get_edit(this.edit_link + this.photo_id)
                
            }).catch(res => {
                log("delete photo 请求失败")
            })
        },
        uploadMethod() {
            // log('上传按钮被点击！')
            var formData = new FormData()
            var file = e('.upload_file')
            var multi_files = file.files
            for (let file of multi_files) {
                formData.append('file', file)
            }
            formData.append('type_id', this.photo_id)
            
            this.get_upload(formData)
        },
        addPicMethod() {
            // log('add pic 被点击')
            var formData = new FormData()
            var file = e('.add-pic-one')
            var multi_files = file.files
            for (let file of multi_files) {
                formData.append('file', file)
            }
            formData.append('photo_id', this.photo_id)
            
            this.get_add_pic(formData)
        },
        deleteMehod(index) {
            // log('删除按钮被点击', index)
            const delete_photo_l = this.delete_pic_link(this.photo_id, index)
            this.get_delete_photo(delete_photo_l)
        },
        delete_pic_link(photo_id, delete_index) {
            const link =  `${domain}/photo/api/photo/delete?photo_id=${photo_id}&delete_index=${delete_index}`
            return link
        },
        get_submit() {
            axios.post(this.submit_link, {
                photo_title: this.photo.photo_title,
                photo_info: this.photo.photo_info,
                type_id: this.photo_id,
                type_new: this.pboard_id,
            }).then(res => {
                this.$router.push({
                    name: 'PhotoAdmin'
                })
            }).catch(res => {
                log("提交请求失败！")
            })
        },
        submitMethod() {
            log('提交按钮被点击')
            this.get_submit()
        }

    },
    created() {
        this.photo_id = this.$route.query.photo_id
        this.get_edit(this.edit_link + this.photo_id)
    }
}
</script>

<style scoped>
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
        left: -198px;
        top: 97px;
    }


    .pic-list {
        position: relative;
        width: 300px;
        height: 300px;
        /* border: 1px solid coral; */
        display: inline-block;
        margin: 30px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .pic-ceil {
        /* border: 1px solid black; */
        padding: 30px;
        display: block;
    }

    .pic-btn {
        position: absolute;
        right: 0;
        bottom: -40px;
    }

    .test {
        width: 300px;
        height: 300px;
        background: coral;
        float: left;
        margin: 10px;
    }


    @media (min-width: 374px) {
        .pic-list {
            width: 120px;
            height: 120px;
        }
    }


    @media (min-width: 768px) {
        .pic-list {
            width: 200px;
            height: 200px;
        }
    }

    /* @media (min-width: 992px) {
        .pic-list {
            width: 250px;
            height: 250px;
        }   
    } */

    @media (min-width: 1200px) {
        .pic-list {
            width: 230px;
            height: 230px;
        }        
    }

    .pic-times {
        position: absolute;
        font-size: 17px;
        color: slategrey;
        bottom: -35px;
        left: 50%;
        transform: translateX(-50%)
    }

    
</style>


