<template>
    <div>
        <div class='main' :style="{
                'background-image': `url(${domain}/photo/cover/${pic_path})`,
            }" :key=1>
        </div>
        <div class="pic-preview">
            <a @click='resetMedthod'>
                返回详情
            </a>
            <!-- <img :src="`http://127.0.0.1:4000/photo/cover/${pic_path}`"> -->
            <button @click='prevPic'>上一张</button>
            <button @click='nextPic'>下一张</button>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            msg: '这是大图预览的页面！',
            detail_link: `${domain}/photo/detail/`,
            photo_id: '',
            photo: '',
            pic_path: '',    
            index: '',   
            domain: `${domain}`
              
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
            // log('reset 被点击')
            this.$emit('reset')
            this.$router.push({
                name: 'PhotoDetail',
                params: {
                    photo_id: this.photo_id
                }
            })
        }
    },
    created() {
        this.emitMethod()
        this.photo_id = this.$route.params.photo_id
        this.index = this.$route.params.index
        this.get_detail(this.detail_link + this.photo_id)
    }
}
</script>

<style scoped>
a {
    cursor: pointer;
}

.main {
    border: 1px solid coral;
    background-size: contain;
    background-position: center;
    height: 700px;
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
</style>


