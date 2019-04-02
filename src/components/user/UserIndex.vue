<template>
    <div>
        <!-- {{  msg  }} -->
        <!-- <router-link to="/user/register">regsiter</router-link> -->
        <!-- <router-link to="/user/login">login</router-link> -->
        <!-- <router-link to="/user/logout">logout</router-link> -->
        <!-- <a class='logout' @click='logoutMethod'>logout</a> -->
        <br>
        <router-view></router-view>
        <!-- hello {{  username  }} -->
        
    </div>  
</template>
<script>
import axios from 'axios'
import store from '@/vuex/index'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

export default {
    store,
    data () {
        return {
            msg: '这是 user index 页面！',
            domain: `${domain}`,
        }
    },
    methods: {
        ...mapMutations(['get_index', 'get_logout']),
        ...mapActions(['get_logout']),
        logoutMethod() {
            this.get_logout()
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
    .logout {
        cursor: pointer;
    }
</style>


