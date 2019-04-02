<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
            <!-- slides -->
            <swiper-slide>
                <div class='div1'></div>
            </swiper-slide>
            <swiper-slide>
                <div class='div2'></div>
            </swiper-slide>
            <swiper-slide>
                <div class='div3'></div>
            </swiper-slide>
            <div class="swiper-pagination"></div>
            <!-- Optional controls -->
            <!-- <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </swiper>


    </div>
</template>

<script>

import 'swiper/dist/css/swiper.css'
 
import { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
    components: {
        swiper,
        swiperSlide
    },
    data () {
        return {
            msg: '测试一下滑动图片',
            swiperOption: {
                // autoplay: 500,
                // direction : 'vertical',
                // effect : 'flip',
                // effect : 'coverflow',
                // slidesPerView: 3,
                // centeredSlides: true,
                // effect : 'cube',
                // cube: {
                // slideShadows: true,
                // shadow: true,
                // shadowOffset: 100,
                // shadowScale: 0.6
                // }
                // preventLinksPropagation : true,
                pagination : '.swiper-pagination',
                // paginationType : 'fraction',
                paginationType : 'progress',
                
            }
        }
    },
    methods: {
        callback() {
            alert('aha')
        }
    },
    created () {
        // var mySwiper = new Swiper('.swiper-container',{
        // pagination : '.swiper-pagination',
        // //pagination : '#swiper-pagination1',
        // })
    }
}
</script>


<style scoped>
.div1 {
    height: 200px;
    width: 200px;
    background: blue;
}

.div2 {
    height: 200px;
    width: 200px;
    background: yellow;
}

.div3 {
    height: 200px;
    width: 200px;
    background: coral;
}
</style>


