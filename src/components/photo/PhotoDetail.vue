<template>
    <div>
        <div class="container big-pic" style="display: none">
                <button class="close">x</button>
            <div class="row">
                <div class="">
                    <div class="pop-pic carousel slide" id="myCarousel">
                    </div>
                    <a class="prev-pic carousel-control left">&lt;</a>
                    <a class="next-pic carousel-control right">&gt;</a>
                </div>
            </div>
        </div>

        <div class="container-fluid pic-main" style="top: 100px; position: relative">
            <router-link to="/photo">
                <p class="text-center">返回首页</p>
            </router-link>
            <div class="row">
                <div class="infor">
                    <img :src="`${domain}/photo/cover/${photo.cover_path}`">
                    
                    <div class="infor-text">
                        <h3>{{photo.photo_title}}</h3>
                        <br>
                        <h4>{{photo.photo_info}}</h4>

                    </div>
                </div>

            </div>

            <hr>

            <div class="container-fluid">
                <div class="row">
                    <div  @click='lookMethod(index)' v-for="(pic_path, index) in photo.pic_list" :key="index" 
                    class='pics' :style="{
                        backgroundImage: `url(${domain}/photo/cover/${pic_path})`,
                    }">
                        <span class='pic-times'>{{ spt_time }}</span>
                    
                    </div>
                    
                </div>
                    
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
            <hr>
            <p class="text-center foot-text">3mwy</p>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是相册详情的页面！',
            detail_link: `${domain}/photo/detail/`,
            photo_id: '',
            photo: '',
            spt_time: '',
            domain: `${domain}`,
            

        }
    },
    methods: {
        get_detail(link) {
            axios.get(link).then(res => {
                // log('请求 photo detail 成功! 这是给出的响应:', res.data)
                this.photo = res.data.photo
                this.spt_time = this.photo.spt_time
            }).catch(res => {
                log('请求 photo detail 失败！')
            })
        },
        lookMethod(index) {
            // log('图片被点击，应该显示大图')
            this.$router.push({
                // name: 'BigPicPreview',
                name: 'BigPicPreviewSlide',
                params: {
                    photo_id: this.photo_id,
                    index,
                }
            })
        }
    },
    created() {
        this.photo_id = this.$route.params.photo_id
        this.get_detail(this.detail_link + this.photo_id)
        // log('获取高度:', $('.container-fluid').eq(1).height())
    }
}
</script>

<style scoped>
    .pic-ceil img {
        cursor: pointer;
    }

    .pop-pic {
        /*position: absolute;*/
        /*top: 1100px;*/
        /*left: 50px;*/
        position: relative;
        /*width: 1000px;*/
        /*height: 1000px;*/
        z-index: 1;
        margin: 50px auto;
        /*overflow: hidden;*/
        /*border: 10px solid palevioletred;*/
    }

    @media (min-width: 0px) {
        .pop-pic {
            margin-top: 150px;
        }
    }

    @media (min-width: 588px) {
        .pop-pic {
            margin-top: 100px;
        }
    }


    /*@media (min-width: 768px) {*/
    /*.pop-pic {*/
    /*margin-top: 100px;*/
    /*}*/
    /*}*/


    /*@media (min-width: 992px) {*/
    /*.pop-pic {*/
    /*margin-top: 100px;*/
    /*}*/
    /*}*/

    /*@media (min-width: 1200px) {*/
    /*.pop-pic {*/
    /*margin-top: 100px;*/
    /*}*/
    /*}*/




    .close {
        font-size: 35px;
        color: white;
        opacity: 1;
        left: 300px;
        position: absolute;
    }

    .close:hover {
        color: white;
        opacity: 0.8;
    }

    .xxx {
        overflow-x: hidden;
        overflow-y: hidden;
        background-color: #2b3741;
    }

    /*.prev-pic, .next-pic{*/
        /*!*position: absolute;*!*/
        /*!*top: 50%;*!*/
        /*!*margin-top: -120px;*!*/
        /*z-index: 2;*/
        /*!*line-height: 100px;*!*/
        /*position: absolute;*/
        /*top: 0px*/
    /*}*/

    .prev-pic, .next-pic{
        font-size: 30px;
        color: #ffff00;
        line-height: 100px;
        z-index: 100;
    }


    .next-pic {
        /*position: absolute;*/
        right: 30px;
    }

    .pic-mains {
        height: 150px;
        width: 150px;
        /*border: 1px solid black;*/
        box-shadow:  1px 2px 3px grey;
        /*margin: 10px;*/
    }

    .wrap img {
        margin-bottom: 30px;
    }

    .btns a {
        color: red;
        font-size: 100px;
        line-height: 450px;
    }

    .pics {
        width: 200px;
        height: 200px;
        display: inline-block;
        background-position: center;
        background-size: cover;
        margin: 30px;
        background-repeat: no-repeat;        
        cursor: pointer;
        position: relative;
    }

    .infor img{
        width: 200px;
        float: left;
        height: 200px;
    }

    .infor {
        position: relative;
        margin-left: 30px;
        padding: 20px;
    }

    .infor-text {
        position: relative;
        left: 10px;
    }

    .infor-text h4 {
        color: grey;
    }


    @media (min-width: 374px) {
        .pics {
            width: 100px;
            height: 100px;
        }
        .container-fluid {
            margin-left: 10px;
        }
    }


    @media (min-width: 768px) {
        .pics {
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
        .pics {
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
        width: 89px;
        transform: translateX(-50%)
    }


</style>


