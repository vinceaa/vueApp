import Vue from 'vue'
import Vuex from 'Vuex'
import axios from 'axios'


Vue.use(Vuex)

const log = console.log.bind(console)
// const domain = 'http://139.199.132.22:4000'
// const domain = 'http://139.199.132.22'
// const domain = 'http://127.0.0.1:4000'
const domain = 'http://139.199.132.22:3000'

const state = {
    username: '',
    index_link: `${domain}/`,
    logout_link: `${domain}/user/logout`,
    domain: `${domain}`,
    
}

const mutations = {
    get_index(state) {
        // log('vuex 中的 domain', domain)
        // console.log('mutations 进行')
        axios.get(state.index_link).then(res => {
            // log('state.index_link', state.index_link)
            // log('请求 index 成功, 这是给出的响应:', res.data)
            state.username = res.data.username
        }).catch(res => {
            log('解析失败')
        })
    },

}

const getters = {

}

const actions = {
    get_logout({commit}) {
        // log('state.logout_link', state.logout_link)
        axios.get(state.logout_link).then(res => {
            commit('get_index')
        }).catch(res => {
            log('解析失败')
        })
    },
}


export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
})