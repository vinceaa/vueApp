<template>
    <div class='infor-body'>
        <div class='load' v-show='ifLoad'></div>
        
        <router-link to="/hotspot/admin" v-show='ifAdmin'>资讯管理</router-link>
        <!-- <div class="infor-header">
            <div class="infor-head-main">
                <h2>资讯</h2>
                <h5>时下流行资讯</h5>
            </div>
        </div> -->


        <!-- <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <a href="#" class="navbar-brand logo"><img src="img/logo.png" alt="3mwy"></a>
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="/index"><span class="glyphicon glyphicon-home"></span> 首页</a></li>
                        <li class='active'>
                            <router-link to="/hotspot">
                                <span class="glyphicon glyphicon-list"></span> 资讯
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/topic">
                                <span class="glyphicon glyphicon-fire"></span> 论坛
                            </router-link>
                        </li>
                        <li><a href="/photo"><span class="glyphicon glyphicon-fire"></span> 图库</a></li>
                        <li><a href="#"><span class="glyphicon glyphicon-fire"></span> 案例</a></li>
                        <li><a href="#"><span class="glyphicon glyphicon-question-sign"></span> 关于</a></li>
                    </ul>



                </div>
            </div>
        </nav> -->


        <div class="container infor-mains">
            <div class="row">
                <div class="col-md-7 bd">
                    <div v-for="(hotspot, index) in hotspots" class="row left-content content-main" :key="index">
                        <div class="col-md-5 col-sm-5 col-xs-5 bd">
                            <router-link :to="`/hotspot/detail/${hotspot._id}`">
                                <img :src="`${domain}/hotspot/cover/${hotspot.path}`" class='img-responsive hot-cover'>
                            </router-link>
                        </div>
                        <div class="col-md-7 col-sm-7 col-xs-7 bd inner-text">
                            <p class="one-line-hidden">
                                <router-link :to="`/hotspot/detail/${hotspot._id}`">
                                    <span class="haha">{{  hotspot.hotspot_title }}</span>
                                </router-link>
                            </p>
                            <div class="more-line-hidden hidden-xs">
                                <router-link :to="`/hotspot/detail/${hotspot._id}`">
                                    <span v-html='hotspot.hotspot_content'></span>
                                </router-link>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-12 spot-group">
                            <ul class="pagination pagination-sm">
                                <li>
                                    <a>
                                        <span aria-hidden="true" @click='groupMethod(pre_id)'>&laquo;</span>
                                    </a>
                                </li>
                                <li v-for="(i, index) in page_number" :class='{active: i - 1 == group_id}' :key='index'>
                                    <a  @click='groupMethod(i - 1)'>
                                        {{i}}
                                    </a>
                                </li>
                                <li>
                                    <a  @click='groupMethod(next_id)'>
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>                                
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div class="col-md-4 hidden-sm hidden-xs bd right-content content-main">
                    <div class="hots"><h4>热门资讯</h4></div>

                    <div v-for="(hotspot, index) in hotspots_hot" class="row right-side " :key='index'>

                        <div class="col-md-6 bd">
                            <router-link :to="`/hotspot/detail/${hotspot._id}`">
                                <img :src="`${domain}/hotspot/cover/${hotspot.path}`" class='img-responsive right-pic'>
                            </router-link>
                        </div>

                        <div class="col-md-6 bd side-infor">
                            <router-link :to="`/hotspot/detail/${hotspot._id}`">
                                <h4>{{  hotspot.hotspot_title }}</h4>
                            </router-link>
                            <router-link :to="`/hotspot/detail/${hotspot._id}`">
                                <span v-html='hotspot.hotspot_content'></span>
                            </router-link>
                        </div>

                    </div>


                </div>




            </div>



        </div>
        
        <!-- <div id="footer">
            <hr>
            <div class="container-fluid text-center">
                <span>3mwy | 合作事宜 | 关于我们</span>
                <br>
                <span>2017-2018 . Powered by Bootstrap.</span>
            </div>
        </div> -->
                    <hr>
            <p class="text-center foot-text">3mwy</p>
        
    </div>
</template>



<script>
import axios from 'axios'

export default {
    data () {
        return {
            msg: '这是 hotspot 首页！',
            hotspot_link: `${domain}/hotspot`,
            hotspots: '',
            hotspots_hot: '',
            group_id: '',
            page_number: '',
            pre_id: '',
            next_id: '',
            ifLoad: true,
            ifAdmin: false,
            domain: `${domain}`
            
        }
    },
    methods: {
        get_hotspot(link) {
            axios.get(link).then(res => {
                const datas = res.data
                this.hotspots = datas.hotspots
                this.hotspots_hot = datas.hotspots_hot
                this.group_id = datas.group_id
                this.page_number = datas.page_number
                this.pre_id = datas.pre_id
                this.next_id = datas.next_id
                this.username = datas.username
                // log('username:', this.username)

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
                log('hotspot 首页请求失败！')
            })
        },
        groupMethod(group_id) {
            this.hotspot_link = `${domain}/hotspot?group_id=${group_id}`
            this.$router.push({
                name: 'Hotspot',
                query: {
                    group_id: group_id,
                }
            })
            this.get_hotspot(this.hotspot_link)

        }
    },
    created() {
        this.$emit('go_header', 1)
        this.$emit('reset')
        const g_id = this.$route.query.group_id || this.group_id
        this.hotspot_link = `${domain}/hotspot?group_id=${g_id}`
        this.get_hotspot(this.hotspot_link)
    },
    mounted () {
        // $('.hot-cover').width(document.body.clientWidth / 3)
        // // log('当前的高度:', $('.hot-cover').height())
        // $(window).resize(function(e) {
        //     log('当前的高度:', $('.hot-cover').height())
        //     // console.log('尺寸正在改变')
        //     const current_width = $('.hot-cover').width()
        //     $('.hot-cover').height(current_width * 0.5)

        //     const current_width_hot = $('.right-pic').width()
        //     $('.right-pic').height(current_width_hot * 0.5)
        // })
    }

}
</script>

<style scoped>
@import '../../../static/css/index.css';
@import '../../../static/css/hotspot.css';

.pagination-sm a {
    cursor: pointer;
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
    /* z-index: 3; */
    
}


</style>


