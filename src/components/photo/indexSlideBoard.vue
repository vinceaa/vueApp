<template>
    <div>
        <div class='load' v-show='ifLoad'></div>
        <!-- {{ msg }} -->
        <router-link to="/photo/type" v-show='ifAdmin'>photo board 管理</router-link>
        <router-link to="/photo/admin" v-show='ifAdmin'>photo 详情管理</router-link>
        <br>
        <br>
        <br>
        <!-- <hr> -->



        <!-- 板块测试  -->
        <div class="test-main">
            <Board :boards          =   'boards_main'
                   :bg              =   'bg_board_dicta[current_index].bg'
                   :fade_bg_left    =   'bg_board_dicta[current_index].fade_left'
                   :fade_bg_right   =   'bg_board_dicta[current_index].fade_right'
                   :ifCeil          =   'false'
                   :active_ceil     =   'active_board'
                   @change_active   =   'change_active'
                   @get_photos      =   'get_photos'
                   @change          =   'changeMethod'
                   >
            </Board>

            <Board :boards          =   'boards_ceil'
                   :bg              =   'bg_ceil_dicta[current_index].bg'
                   :fade_bg_left    =   'bg_ceil_dicta[current_index].fade_left'
                   :fade_bg_right   =   'bg_ceil_dicta[current_index].fade_right'
                   :active_ceil     =   'active_ceil'
                   :ifCeil          =   'true'
                   @change_ceil     =   'change_ceil'
                   @get_photos      =   'get_photos'
                   @change_page     =   'change_page'>
            </Board>
        </div>


        <!-- <router-link to="/photo/test">滑动测试</router-link> -->

        <!-- <v-touch @tap='tapMethod'>
            <button>测试</button>
        </v-touch> -->

    
        <!-- <div class="hotspot-main">
            <div class="hotspot-head">
                <span class="text-left">分类浏览</span>
                <a @click="tabMethod('all', 0)" :class="[actives, 'text-left']">
                    <span>全部</span>
                </a>
                <a v-for="(board, index) in pboards"  :class="[{actives: board.board_content == pboard_type}]" :key="index"  @click='tabMethod(board.board_content, 0)'>
                    <span>{{board.board_content}}</span>
                </a>
            </div>
        </div> -->

        <!-- <div class="container  main-c">
            <div class="row">
                <div v-for="(photos, index) in photo_lista" :key='index'>
                    <transition-group :name='slideDirection' tag="div">
                        <div v-show='index == group_id' :key='index' class='ceil-block'>
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-2 col-sm-3 col-xs-5 bds" v-for="(photo, index) in photos" :key="index">
                                        <router-link v-if="photo.photo"  :to="`/photo/detail/${photo.photo._id}`">
                                            <img v-if="photo.photo" :src="`http://127.0.0.1:4000/photo/cover/${photo.photo.cover_path}`" class="pic-main img-responsive img-thumbnail">
                                            <p v-if="photo.photo" class="text-left bottom-info">{{ photo.photo.photo_title }}</p>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div> -->



        <div class="container  main-c">
            <div class='search-wrap'>
                <div class='search-bar'>
                    <input class='search-input' type="input" @keyup='keyboardMethod' v-model='search_key' placeholder="search...">
                </div>
                <button class='btn btn-success btn-sm search-btn' @click='searchMethod'>
                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    搜索
                </button>
            </div>
            
            <div class="row">
                <swiper :options="swiperOption" ref="mySwiper" @slideChangeTransitionEnd='indexMethod'>
                    
                    <swiper-slide  v-for="(photos, index) in photo_lista" :key='index' :data-history="`slide${index}`">
                        <div>
                            <transition-group :name='slideDirection' tag="div">
                                <div class="container" :key='index'>
                                    <div class="row">
                                        <div class="col-md-2 col-sm-3 col-xs-5 bds" v-for="(photo, index) in photos" :key="index">
                                            <router-link v-if="photo.photo"  :to="`/photo/detail/${photo.photo._id}`">
                                                <img v-if="photo.photo" :src="`${domain}/photo/cover/${photo.photo.cover_path}`" class="pic-main img-responsive img-thumbnail">
                                                <p v-if="photo.photo" class="text-left bottom-info">{{ photo.photo.photo_title }}</p>
                                            </router-link>
                                            <div class='admin-board' v-show='ifAdmin'>
                                                <div class='admin-edit' @click='editMethod(photo.photo._id)'>编辑</div>
                                                <div class='admin-delete' @click='deleteMethod(photo.photo._id)'>删除</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition-group>
                        </div>
                    </swiper-slide>
                    
                </swiper>
                
            </div>
        </div>

        


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
                            <hr>
            <p class="text-center foot-text">3mwy</p>
    </div>
</template>

<script>
import axios from 'axios'

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Board from '@/components/photo/board/Board'
import {
    boards_main,
    boards_ceil,
    bg_board_dicta,
    bg_ceil_dicta,
} from '../../../static/js/board'

export default {
    components: {
        swiper,
        swiperSlide,
        Board,
    },
    data () {
        return {
            msg: '这是 photo 首页！',
            c_id: 2,
            index_link: `${domain}/photo`,
            delete_link: `${domain}/photo/api/delete?photo_id=`,
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
            ifAdmin: false,
            domain: `${domain}`,
            // swiperOption: {
            //     pagination: '.swiper-pagination',
            //     // paginationClickable: true,
            //     // paginationBulletRender: function (swiper, index, className) {
            //     //     return '<span class="' + className + '">' + (index + 1) + '</span>';
            //     // }
            // },
            swiperOption: {
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true,
                //     renderBullet(index, className) {
                //         return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
                //     }
                // },
                initialSlide : 1,
                // loop : true,
            },
            ifLoad: true,




            boards_main,
            boards_ceil,
            current_index: 0,
            bg_board_dicta,
            bg_ceil_dicta,
            get_ceil_board_link: `${domain}/photo/ceil/board`,
            active_board: 0,
            active_ceil: 0,
            current_board_id: 0,
            current_tab: 0,
            search_key: '',
            ifSearch: '',
            board_id: '',

            testMethod: function() {
                log('这是一个方法')
            }
            
            
        }
    },
    methods: {
        get_index(link, params={}) {
            axios.get(link, {
                params,
            }).then(res => {
                log('请求 photo 首页成功！这是给出的响应:', res.data)
                const datas = res.data
                // this.photos = datas.photoss
                this.photo_lista = datas.photos
                // log('this.photo_lista:', this.photo_lista)
                this.group_id = datas.group_id
                this.page_number = datas.page_number
                this.pre_id = datas.pre_id
                this.next_id = datas.next_id
                // log('this.next_id', this.next_id)
                // this.pboards = datas.pboards
                this.actives = datas.actives
                this.pboard_type = datas.pboard_type
                this.username = datas.username
                // log('this.username:', this.username)

                // datas.pboards.splice(0, 0, {
                //     _id: 0,
                //     board_content: '全部',
                // })
                // this.boards_main = datas.pboards
                // this.boards_ceil = datas.pboards_ceil
                datas.main_boards.splice(0, 0, {
                    _id: 0,
                    board_content: '全部',
                })
                this.boards_main = datas.main_boards
                this.boards_ceil = datas.ceil_boards
                // log('this.boards_ceil:', this.boards_ceil)
                
                const outer_width = $(this.$refs.my_dom_ceil).width()
                // log('判断父级是否能够取到子集的 ref', outer_width)
                // log('this.username', this.username)
                log('this.username:', this.username)
                if (this.username == 'vin') {
                    this.ifAdmin = true
                }
                
                $('.load').css({
                    width: `100%`,
                    
                })
                setTimeout(() => {
                    // this.ifLoad = false
                    $('.load').css({
                        opacity: `0`,
                    })
                }, 1000)
            }).catch(res => {
                log('请求 photo 首页失败！')
            })
        },
        tabMethod(tabType, group_id) {
            // this.get_index(`${this.index_link}?tab=${tabType}`)
            let tab = ''
            if (this.ifSearch == true) {
                log('搜索内分页')
                tab = 'search'
            } else {
                log('正常分页')
                tab = this.$route.query.tab || 0
            }
            const ceil = this.$route.query.ceil || 0
            this.group_id = group_id
            // log('tab, ceil', tab, ceil)
            this.$router.push({
                name: 'Photo',
                query: {
                    tab: tab,
                    ceil: ceil,
                    group_id: group_id,
                    current_board_index: this.current_index,
                    current_ceil_index: this.active_board,
                    key: this.search_key

                }
            })
            // this.index_link = `${domain}/photo?tab=${tabType}&group_id=${group_id}`
            this.index_link = `${domain}/photo/get/init?board_id=${tab}&ceil_id=${ceil}&group_id=${group_id}&key=${this.search_key}`
            
            
            if (group_id > this.group_id) {
                this.slideDirection = 'slide-left'
            } else {
                this.slideDirection = 'slide-right'
            }
            this.get_index(this.index_link)
            this.swiper.slideTo(group_id, 1000, false)
        },
        tapMethod() {
            this.swiper.slideTo(1, 1000, false)

        },
        callback() {
            // log('被点击')
        },
        indexMethod() {
            log('正在滑动')
            let tab = ''
            if (this.ifSearch == true) {
                tab = 'search'
            } else {
                tab = this.$route.query.tab || 0
            }
            const ceil = this.$route.query.ceil || 0
            this.$router.push({
                name: 'Photo',
                query: {
                    tab: tab,
                    ceil: ceil,
                    group_id: this.swiper.activeIndex,
                    current_board_index: this.current_index,
                    current_ceil_index: this.active_board,
                    key: this.search_key

                }
            })
            this.group_id = this.swiper.activeIndex
            this.index_link = `${domain}/photo/get/init?board_id=${tab}&ceil_id=${ceil}&group_id=${this.group_id}&key=${this.search_key}`
            
            this.get_index(this.index_link)

        },
        get_ceil_board(board_id) {
            this.$router.push({
                name: 'Photo',
                query: {
                    tab: board_id,
                    ceil: 0,
                    group_id: 0,
                    current_board_index: this.current_index,
                    current_ceil_index: 0,

                }
            })
            axios.get(this.get_ceil_board_link, {
                params: {
                    board_id,
                }
            }).then(res => {
                // log('请求子板块成功, 这是给出的响应:', res.data)
                const datas = res.data
                this.boards_ceil = res.data.pboards_ceil
                this.group_id = datas.group_id
                this.page_number = datas.page_number
                this.pre_id = datas.pre_id
                this.next_id = datas.next_id
            }).catch(res => {
                log('请求子板块失败')
            })
        },
        changeMethod(index, board_id) {
            // log('index', index)
            // log('父级收到 board_id', board_id)
            this.current_index = index
            this.current_board_id = board_id
            this.get_ceil_board(board_id)
        },
        get_photos(photos) {
            // log('父级收到 photos', photos)
            this.photo_lista = photos
        },
        change_page(page_number) {
            this.page_number = page_number
        },
        change_active(index) {
            // log('父级拿到 change active', index)
            this.ifSearch = false
            this.active_board = index
            this.active_ceil = 0
        },
        change_ceil(index, board_id) {
            this.$router.push({
                name: 'Photo',
                query: {
                    tab: this.current_board_id,
                    // tab: this.current_tab,
                    ceil: board_id,
                    group_id: 0,
                    current_board_index: this.current_index,
                    current_ceil_index: index,

                }
            })            
            this.active_ceil = index
        },
        editMethod(photo_id) {
            this.$router.push({
                name: 'PhotoEdit',
                query: {
                    photo_id,
                }
            })
        },
        get_refresh() {
            const tab = this.$route.query.tab || 0
            const ceil = this.$route.query.ceil || 0
            const group_id = this.group_id
            // log('tab, ceil', tab, ceil)
            this.$router.push({
                name: 'Photo',
                query: {
                    tab: tab,
                    ceil: ceil,
                    group_id: group_id,
                    current_board_index: this.current_index,
                    current_ceil_index: this.active_board,

                }
            })
            // this.index_link = `${domain}/photo?tab=${tabType}&group_id=${group_id}`
            this.index_link = `${domain}/photo/get/init?board_id=${tab}&ceil_id=${ceil}&group_id=${group_id}`
            this.get_index(this.index_link)
            
        },
        get_delete(photo_id) {
            axios.get(this.delete_link + photo_id).then(res => {
                if (res.data.error == '1') {
                    log('没有权限')
                } else {
                    this.get_refresh(this.admin_link)

                    // log("请求删除 photo 成功 ！, 这是给出的响应:", res.data)
                }
                
            }).catch(res => {
                log("请求删除 photo 失败 ！", res.data)
            })
        },
        deleteMethod(photo_id) {
            this.get_delete(photo_id)
        },
        get_search() {
            this.index_link = `${domain}/photo/get/init`
            const params = {
                board_id: 'search',
                key: this.search_key,
            }
            if (this.search_key != '') {
                this.get_index(this.index_link, params)
            }
        },
        searchMethod() {
            log('搜索按钮被点击', this.search_key)
            this.ifSearch = true
            this.get_search()
        },
        keyboardMethod(event) {
            log('正在输入', event.key)
            const key = event.key
            if (key == 'Enter') {
                this.searchMethod()
            }
        }
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
        // log('测试是否引入js:', boards_main)
        this.$emit('reset')
        this.$emit('go_header', 2)
        
        
        // const p_type = this.$route.query.tab || 'all'
        // const g_id = this.$route.query.group_id || 0
        // this.group_id = g_id
        const key = this.$route.query.key || ''
        this.search_key = key
        let tab = ''
        if (this.ifSearch == true || key != '') {
            log('搜索内分页')
            tab = 'search'
        } else {
            log('正常分页')
            tab = this.$route.query.tab || 0
        }
        this.current_board_id = tab
        const ceil = this.$route.query.ceil || 0
        const group_id = this.$route.query.group_id || 0
        this.group_id = group_id
        // log('group_id', group_id)
        this.current_index = this.$route.query.current_board_index || 0
        this.active_ceil = this.$route.query.current_ceil_index || 0
        this.active_board = this.$route.query.current_board_index || 0
        this.current_tab = tab
        // key=a

        // if (tab == 0 && ceil != 0) {
        //     this.index_link = `${domain}/photo/get/photos?status=0&ceil_id=0&group_id=${this.group_id}`
        // } else {
        //     this.index_link = `${domain}/photo/get/photos?status=1&ceil_id=${ceil}&group_id=${this.group_id}`
        // }
        this.index_link = `${domain}/photo/get/init?board_id=${tab}&ceil_id=${ceil}&group_id=${group_id}&key=${this.search_key}`
        
        

        // this.index_link = `${domain}/photo?tab=${p_type}&group_id=${this.group_id}`
        
        this.get_index(this.index_link)
        this.swiperOption.initialSlide = this.group_id
        
    },
    mounted() {
        
        // log('页面初始化，当前的下标是', this.swiper.activeIndex)
        
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

  .load {
    position: absolute;
    top: 0px;
    width: 0%;
    height: 3px;
    /* border: 1px solid black; */
    background: #4285f4;
    transition: .5s;
    opacity: 1;
    z-index: 2;
}

a {
    cursor: pointer;
}

.bds {
    /* border: 1px solid black; */
    position: relative;
}

.admin-board {
    position: absolute;
    /* border: 1px solid black; */
    display: inline-block;
    width: 100px;
    right: 0;
    top: 0;
}

.admin-edit, .admin-delete{
    /* border: 1px solid black; */
    display: inline;
    margin: 5px;
    cursor: pointer;
    position: relative;
    left: 20px;

}

.search-bar {
    position: relative;
    height: 31px;
    width: 252px;
    border: 1px solid #dce7ef;
    border-radius: 20px;
    display: inline-block;
    top: 11px;
}

.search-input {
    position: absolute;
    outline: none;
    border: none;
    left: 24px;
    top: 5px;
    color: grey;
}

.search-btn {
    display: inline-block;
}

/* .search-wrap {
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
} */

.search-wrap {
    position: relative;
    display: inline-block;
    left: 70%;
}


    @media (min-width: 0px) and (max-width: 900px) {
        .search-wrap {
            position: relative;
            display: inline-block;
            left: 0;
        }
    }

</style>


