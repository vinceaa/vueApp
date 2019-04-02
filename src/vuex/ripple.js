import Vue from 'vue'
import Vuex from 'Vuex'
import axios from 'axios'


Vue.use(Vuex)

const log = console.log.bind(console)
const domain = 'http://127.0.0.1:4000'


const state = {
    username: '',
    index_link: `${domain}/`,
    logout_link: `${domain}/user/logout`,
    domain: `${domain}`,
}

const mutations = {
    get_index(state) {
        // console.log('mutations 进行')
        axios.get(state.index_link).then(res => {
            // log('请求 index 成功, 这是给出的响应:', res.data)
            state.username = res.data.username
        }).catch(res => {
            log('解析失败')
        })
    },
    getPos(state, block, x, y) {
        // log('getPos vuex getters 进行')
        // log('state:', state)
        // log('block:', block)
        // log('x:', x)
        // log('y:', y)


        // const dotRadius = block.width() * 2 / 10
        // const hOffset = dotRadius / 2
        // const wOffset = dotRadius / 2

        // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop


        // const blockLeft = block.offset().left
        // const blockTop = block.offset().top
        // const initOffsetX = x - blockLeft
        // const initOffsetY = y - blockTop
        

        // const left = initOffsetX - wOffset
        // const top = initOffsetY - hOffset + scrollTop
        // return [left, top, dotRadius]
        return 1
    },      
  

}

const getters = {

}

const actions = {
    get_logout({commit}) {
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