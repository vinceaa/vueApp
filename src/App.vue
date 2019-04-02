<template>
  <div id="app">
    <div v-show='ifShow'>
      <Header :active_index='toIndex' @find_index='find_index'></Header>
      <!-- <router-link to="/">index</router-link>
      <router-link to="/user">user</router-link>
      <router-link to="/topic">topic</router-link>
      <router-link to="/board">board</router-link>
      <router-link to="/hotspot">hotspot</router-link>
      <router-link to="/photo">photo</router-link> -->
    </div>
    <router-view @removeHeader='removeMethod' @reset='resetMethod' @go_header='go_header'/>
  </div>
</template>

<script>
import Header from '@/components/header/Header'

export default {
    name: 'App',
    components: {
        Header,
    },
    data() {
        return {
          msg: '测试一下哈',
          ifShow: true,
          toIndex: 0,
        }
    },
    methods: {
      removeMethod() {
        // log('removeMethod 进行')
        this.ifShow = false
      },
      resetMethod() {
        this.ifShow = true
      },
      go_header(index) {
        this.toIndex = index
        // log('父组件收到 headers index', this.toIndex)
      },
      find_index(index) {
        this.toIndex = index
      }
    }
}
</script>

<style>
    /* #app {
      margin-top: 300px;
    } */

    html, body {
        height: 100%;
        width: 100%;
    }
    
    #app {
      height: 100%;
      width: 100%;
    }
</style>
