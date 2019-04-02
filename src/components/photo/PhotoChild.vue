<template>
    <div>
        测试：    {{ msg }}
        页面: {{tabType}} {{groupId}}
        <div class="container">
            <div class="row">
                <div v-for="(photos, index) in photo_lista" :key='index'>
                    <transition-group :name='slideDirection'>
                        <div v-show='index == group_id' :key='index' class='ceil-block'>
                            <div class="container main-c">
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
    </div>
</template>


<script>
import axios from 'axios'

export default {
    props: ['tabType', 'groupId'],
    data () {
        return {
            msg: '这是 photo 的子组件',
            index_link: `${domain}/photo`,
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
                // this.photos = datas.photos
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
    },
    created() {
        log('tabType groupId', this.tabType, this.groupId)
        const p_type = this.$route.query.tab || 'all'
        const g_id = this.$route.query.group_id || 0
        this.group_id = g_id

        // this.index_link = `http://127.0.0.1:4000/photo?tab=${p_type}&group_id=${this.group_id}`
        this.index_link = `${domain}/photo?tab=${this.tabType}&group_id=${this.groupId}`
        
        this.get_index(this.index_link)
    },
    updated() {
        // log('updated', this.tabType, this.groupId)
        // this.index_link = `http://127.0.0.1:4000/photo?tab=${this.tabType}&group_id=${this.groupId}`
        
        // this.get_index(this.index_link)

    }
}
</script>

<style scoped>

</style>


