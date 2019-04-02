<template>
    <div>
        <span class='close' @click='resetMedthod'>X</span>
        <swiper :options="swiperOption" ref="mySwiper" @slideChangeTransitionEnd='indexMethod'>
            <swiper-slide v-for="(pic_path, index) in photo.pic_list" :key=index>
                <div class='swiper-zoom-container'>
                    <!-- <div class='main' :style="{
                            'background-image': `url(http://127.0.0.1:4000/photo/cover/${pic_path})`,
                        }" >
                    </div> -->
                    <img class='main' :src="`${domain}/photo/cover/${pic_path}`">
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>




        <!-- <div class="pic-preview">
            <a @click='resetMedthod'>
                返回详情
            </a>
            <button @click='prevPic'>上一张</button>
            <button @click='nextPic'>下一张</button>
        </div> -->

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
            domain: `${domain}`,
            msg: '这是大图预览的页面！',
            detail_link: `${domain}/photo/detail/`,
            photo_id: '',
            photo: '',
            pic_path: '',    
            index: '',
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar'
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                initialSlide: '',
                lazy: {
                    loadingClass: 'main',
                },
                zoom: true,
            },


        }

    },
    methods: {
        emitMethod() {
            this.$emit('removeHeader')
        },
        get_detail(link) {
            axios.get(link).then(res => {
                this.photo = res.data.photo
                this.pic_path = this.photo.pic_list[this.index]
            }).catch(res => {
                log('请求 photo detail 失败！')
            })
        },
        slidePic(direction) {
            const pic_num = this.photo.pic_list.length
            this.index = (this.index + pic_num + direction) % pic_num
            this.pic_path = this.photo.pic_list[this.index]
        },
        prevPic() {
            this.slidePic(-1)
        },
        nextPic() {
            this.slidePic(1)
        },
        resetMedthod() {
            this.$emit('reset')
            this.$router.push({
                name: 'PhotoDetail',
                params: {
                    photo_id: this.photo_id
                }
            })
        },
        indexMethod() {
            this.$router.push({
                name: 'BigPicPreviewSlide',
                params: {
                    photo_id: this.photo_id,
                    index: this.swiper.activeIndex,
                }
            })
        }
    },
    computed: {
        swiper() {
            // log('ok')
            return this.$refs.mySwiper.swiper
            
        },
    },
    created() {
        this.emitMethod()
        this.photo_id = this.$route.params.photo_id
        this.index = this.$route.params.index
        this.get_detail(this.detail_link + this.photo_id)
        this.swiperOption.initialSlide = this.index
        // log('窗口高度:', $(window).height())
    },
    updated() {
        $('.main').height($(window).height())
    }

}
</script>

<style scoped>
a {
    cursor: pointer;
}





.main {
    /* border: 1px solid coral; */
    width: 100%;
    background-size: contain;
    background-position: center;
    height: 579px;
    /* height: 300px; */
    background-repeat: no-repeat;
    background-color: #2b3741;
}

.slide-enter {
    transform: translateX(-10px);
}

.slide-enter-active {
    transition: 1s;
}

.slide-enter-to {
    transform: translateX(-100px);
}

.slide-leave {
    opacity: 0;
    transform: translateX(-10px);
}

.slide-leave-active {
    transition: 1s;
}


.slide-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}

  .swiper-container {
    background-color: #000;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;

  }
  .gallery-top {
    height: 80%!important;
    width: 100%;
  }
  .gallery-thumbs {
    height: 20%!important;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }

  .top {
      height: 600px;
  }

  .bottom {
      height: 100px;
      
  }

  .close {
      z-index: 2;
      position: absolute;
      right: 10px;
      color: cornflowerblue;
      font-size: 25px;
  }
</style>


