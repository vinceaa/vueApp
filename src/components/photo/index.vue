<template>
    <div>
        {{ msg }}haha
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

export default {
    data () {
        return {
            msg: '这是 photo 首页！',
            index_link: `${domain}/photo`,
            photos: '',
            group_id: '',
            page_number: '',
            pre_id: '',
            next_id: '',
            pboards: '',
            actives: '',
            pboard_type: '',
            domain: `${domain}`,
        }
    },
    methods: {
        get_index(link) {
            axios.get(link).then(res => {
                // log('请求 photo 首页成功！这是给出的响应:', res.data)
                const datas = res.data
                this.photos = datas.photos
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
            
            this.get_index(this.index_link)
        },
    },
    created() {
        const p_type = this.$route.query.tab || 'all'
        const g_id = this.$route.query.group_id || 0

        this.index_link = `${domain}/photo?tab=${p_type}&group_id=${g_id}`
        
        this.get_index(this.index_link)
    }
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

.bottom-info,  bottom-info1 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 10px;
    position: relative;
}

.bottom-info {
    margin-top: -31px;
    margin-left: 24px;
    width: 130px;
    position: relative;
    top: 10px;
    top: 30px;

    color: #735f92;
}

.bottom-info1 {
    margin-top: -14px;
    margin-left: 26px;
    width: 146px;
    position: relative;
    box-shadow: 1px 6px 20px grey;
    height: 28px;
    top: -9px;
    z-index: -1;
}

.box-lg, .box-small {
    box-shadow: 1px 2px 3px grey;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.box-lg {
    width: 149px;
    background-color: white;
    height: 23px;
    z-index: 1;
    /* border: 1px solid black; */
    position: relative;
}

.box-small {
    width: 142px;
    height: 25px;
    /* border: 1px solid black; */
    position: relative;
    z-index: -1;
    top: -19px;
    left: 5px;
    background-color: white;
}

.box-main {
    position: absolute;
}

a {
    cursor: pointer;
}

ul {
    position: relative;
    left: 50%;
    transform: translate(-50%)
}
</style>


