<template>
    <div>
        <div class="container" style="top: 100px; position: relative">
            <router-link to="/hotspot">
                <p class="text-center">
                    返回首页
                </p>
            </router-link>
            <div class="row">
                <!-- <div class="col-md-2 col-sm-2 col-xs-2"></div> -->
                <div class="col-md-1 col-sm-1 col-xs-1"></div>
                
                <!-- <img :src="`http://127.0.0.1:4000/hotspot/cover/${hotspot.path}`" class='img-responsive col-md-8 col-sm-8 col-xs-8'> -->
                <!-- <div class='cover col-md-8 col-sm-8 col-xs-8' :style="{ -->
                <div class='cover col-md-10 col-sm-10 col-xs-10' :style="{
                    backgroundImage: `url(${domain}/hotspot/cover/${hotspot.path})`,
                }">
                </div>
                <div class="col-md-1 col-sm-1 col-xs-1"></div>
                <!-- <div class="col-md-2 col-xs-2 col-sm-2"></div> -->
            </div>
            <div class="row" style="margin-bottom: 150px">
                <!-- <div class="col-md-2 col-sm-2 col-xs-2"></div> -->
                <div class="col-md-1 col-sm-1 col-xs-1"></div>
                <div class="col-md-10 col-sm-10 col-xs-10">
                <!-- <div class="col-md-8 col-sm-8 col-xs-8"> -->
                    <div class="spot-header">
                        <h2 class='text-center' v-html='hotspot.hotspot_title'></h2>
                    </div>
                    <div class='text-right hot-title' v-html="hotspot.spt_time"></div>
                    <hr>
                    <div class="spot-content">
                        <h4 class='' v-html='hotspot.hotspot_content'></h4>
                    </div>
                </div>
                <div class="col-md-1 col-sm-1 col-xs-1"></div>
                <!-- <div class="col-md-2 col-xs-2 col-sm-2"></div> -->
            </div>
            <hr>
            <p class="text-center foot-text">3mwy</p>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是 hotspot detail 页面！',
            hotspot_detail_link: `${domain}/hotspot/detail/`,
            hotspot_id: '',
            hotspot: '',
            domain: `${domain}`
            
        }
    },
    methods: {
        get_hotspot(hotspot_id) {
            axios.get(this.hotspot_detail_link + hotspot_id).then(res => {
                // log('请求 hotspot 成功！ 这是给出的响应：', res.data)
                this.hotspot = res.data.hotspot
            }).catch(res => {
                log('请求 hotspot 失败！')
            })
        }
    },
    created() {
        this.hotspot_id = this.$route.params.hotspot_id
        this.get_hotspot(this.hotspot_id)
    }
}
</script>


<style scoped>
.cover {
    height: 400px;
    background-repeat: no-repeat;
    /* border: 1px solid coral; */
    background-position: center;
    background-size: contain;
}

.container h4 {
    line-height: 35px;
}
</style>

