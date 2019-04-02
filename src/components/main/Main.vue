<template>
    <div class='main'>
        <!-- {{  msg  }} -->
        <!-- <h1>hello {{ username }} !</h1> -->
        <div class="test-main">
            <div class="nav">
                
                <span class='nav-ceil'><a @click="go('TopicIndex')">论坛</a></span>
                <span class='nav-ceil'>
                    <a @click="go('Hotspot')">时下资讯</a>
                </span>
                <span class='nav-ceil'>
                    <a @click="go('Photo')">图库</a>
                    
                </span>
            </div>
            <div class="down"></div>
            <div class="info">Hi Sneakers!</div>
        </div>
        <div class="below container">
            <div class="row">
                <div class="below-ceil col-md-6 col-sm-6">
                    <i class='glyphicon glyphicon-heart'></i>
                    球鞋爱好者们的聚集圣地
                </div>
                <div class="below-ceil col-md-6 col-sm-6">
                    <i class='glyphicon glyphicon-fire'></i>
                    汇集当下流行资讯与热点
                </div>

            </div>
            <div class="row">
                <div class="below-ceil col-md-6 col-sm-6">
                    <i class='glyphicon glyphicon-camera'></i>
                    全方位的球鞋分类与细节
                </div>
                <div class="below-ceil col-md-6 col-sm-6">
                    <i class='glyphicon glyphicon-leaf'></i>
                    畅所欲言的论坛讨论社区
                </div>
            </div>

        </div>
        
    </div>
</template>


<script>
import axios from 'axios'
// 这个在 login 页面也可以成功
axios.defaults.withCredentials = true

import store from '@/vuex/index'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'


export default {
    store,
    data () {
        return {
            msg: '这是 main 首页！',
        }
    },
    methods: {
        ...mapMutations(['get_index']),
        go(path) {
            this.$router.push({
                name: path,
            })
            const dicta = {
                'TopicIndex': 0,
                'Hotspot': 1,
                'Photo': 2,
            }
            const to_index = dicta[path]
            this.$emit('go_header', to_index)
        }
        
    },
    computed: {
        ...mapState(['username', 'index_link']),
    },
    created() {
        this.get_index()
    },

}
</script>

<style scoped>
@import "../../../static/css/index/demo.css";
</style>


