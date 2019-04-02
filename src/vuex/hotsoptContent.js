import Vue from 'vue'
import Vuex from 'Vuex'
import axios from 'axios'


Vue.use(Vuex)

const log = console.log.bind(console)

const state = {
    left_content: [

    ],
}




export default new Vuex.Store({
    state,
})