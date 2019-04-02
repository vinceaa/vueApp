<template>
    <div>
        {{ msg }}

        <!-- transition 版本的 slide  -->
        <router-link to="/photo/test">滑动测试</router-link>
        <v-touch @tap='tapMethod'>
            <button>测试</button>
        </v-touch>
        <router-link to="/photo/type">photo board 管理</router-link>
        <router-link to="/photo/admin">photo 详情管理</router-link>
        <hr>

    
        <div class="hotspot-main">
            <div class="hotspot-head">
                <span class="text-left">分类浏览</span>
                <a @click="tabMethod('all', 0)" :class="[actives, 'text-left']">
                    <span>全部</span>
                </a>
                <a v-for="(board, index) in pboards"  :class="[{actives: board.board_content == pboard_type}]" :key="index"  @click='tabMethod(board.board_content, 0)'>
                    <span>{{board.board_content}}</span>
                </a>
            </div>
        </div>

        <div class="container  main-c">
            <div class="row">
                <div v-for="(photos, index) in photo_lista" :key='index'>
                    <transition-group :name='slideDirection' tag="div">
                        <div v-show='index == group_id' :key='index' class='ceil-block'>
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-2 col-sm-3 col-xs-5 bds" v-for="(photo, index) in photos" :key="index">
                                        <router-link v-if="photo.photo"  :to="`/photo/detail/${photo.photo._id}`">
                                            <img v-if="photo.photo" :src="`${domain}/photo/cover/${photo.photo.cover_path}`" class="pic-main img-responsive img-thumbnail">
                                            <p v-if="photo.photo" class="text-left bottom-info">{{ photo.photo.photo_title }}</p>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>



        <!-- <div class="container  main-c">
            <div class="row">
                <swiper :options="swiperOption" ref="mySwiper" @slideChangeTransitionEnd='indexMethod'>
                    
                    <swiper-slide  v-for="(photos, index) in photo_lista" :key='index' :data-history="`slide${index}`">
                        <div>
                            <transition-group :name='slideDirection' tag="div">
                                <div class="container" :key='index'>
                                    <div class="row">
                                        <div class="col-md-2 col-sm-3 col-xs-5 bds" v-for="(photo, index) in photos" :key="index">
                                            <router-link v-if="photo.photo"  :to="`/photo/detail/${photo.photo._id}`">
                                                <img v-if="photo.photo" :src="`http://127.0.0.1:4000/photo/cover/${photo.photo.cover_path}`" class="pic-main img-responsive img-thumbnail">
                                                <p v-if="photo.photo" class="text-left bottom-info">{{ photo.photo.photo_title }}</p>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </transition-group>
                        </div>
                    </swiper-slide>
                    
                </swiper>
                
            </div>
        </div> -->

        


        <ul class="pagination pagination-sm">
            <li>
                <a @click='tabMethod(pboard_type, pre_id)' aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li v-for="(i, index) in page_number" :key="index" :class='{active: i - 1 == group_id}'>
                <a @click='tabMethod(pboard_type, i - 1)'>
                    {{i}}
                </a>
            </li>
            <li>
                <a @click='tabMethod(pboard_type, next_id)' aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    components: {
        swiper,
        swiperSlide
    },
    data () {
        return {
            msg: '这是 photo 首页！',
            c_id: 2,
            index_link: `${domain}/photo`,
            // photos: '',
            photo_lista: '',
            group_id: 0,
            page_number: '',
            pre_id: '',
            next_id: '',
            pboards: '',
            actives: '',
            pboard_type: '',
            sreen_width: '',
            slideDirection: '',
            domain: `${domain}`,

        }
    },
    methods: {
        get_index(link) {
            axios.get(link).then(res => {
                // log('请求 photo 首页成功！这是给出的响应:', res.data)
                const datas = res.data
                // this.photos = datas.photoss
                this.photo_lista = datas.photos
                this.group_id = datas.group_id
                this.page_number = datas.page_number
                this.pre_id = datas.pre_id
                this.next_id = datas.next_id
                this.pboards = datas.pboards
                this.actives = datas.actives
                this.pboard_type = datas.pboard_type
                
                
            }).catch(res => {
                log('请求 photo 首页失败！')
            })
        },
        tabMethod(tabType, group_id) {
            // this.get_index(`${this.index_link}?tab=${tabType}`)
            this.$router.push({
                name: 'Photo',
                query: {
                    tab: tabType,
                    group_id: group_id,
                }
            })
            this.index_link = `${domain}/photo?tab=${tabType}&group_id=${group_id}`
            
            if (group_id > this.group_id) {
                this.slideDirection = 'slide-left'
            } else {
                this.slideDirection = 'slide-right'
            }
            this.get_index(this.index_link)
        },
        tapMethod() {
            log('被点击', this.swiper.slideTo(1, 1000, false))

        },
        callback() {
            // log('被点击')
        },

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      getIndex() {
          return this.c_id
      }
    },
    created() {
        const p_type = this.$route.query.tab || 'all'
        const g_id = this.$route.query.group_id || 0
        this.group_id = g_id

        this.index_link = `${domain}/photo?tab=${p_type}&group_id=${this.group_id}`
        
        this.get_index(this.index_link)
        this.swiperOption.initialSlide = this.group_id
        
    },
    mounted() {
        log('页面初始化，当前的下标是', this.swiper.activeIndex)
        
    },
    updated() {
        // log('update')
        // const h = $('.main-c').height()
        // log('当前父级的 h', h)
        // $('.pagination').css({
        //     top: `${h}px`
        // })
        // ss
    },

}
</script>

<style scoped>
/* @import '../../../static/css/index.css'; */
@import '../../../static/css/photoIndex.css';
 .swiper-pagination-bullet-custom {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    background: rgba(0,0,0,0.2);
  }
  .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
    color: #fff;
    background: #007aff;
  }
  .swiper-pagination {
      position: relative;
      /* top: 20px; */
      height: 20px;
      /* border:1px solid black; */
  }
</style>


