<template>
    <div>

        <div class="nav-main">
            <ul>
                <li class='ceil' v-for="(e, index) in navs" :key="index">
                    <router-link :to="e.path">
                        <span :class="['inner-ceil', {active: index == active_index}]" @click='slide($event, index)'>
                            {{ e.name }}
                        </span>
                    </router-link>
                </li>
            
            </ul>
            <div class="underline" :style="{
                                        transform: `translateX(${prev}px)`,
                                        width: `${outerWidth}px`,
                                    }">
                                    
            </div>
        </div>



    </div>
</template>

<script>
export default {
    data () {
        return {
            navs: [
                {
                    path: '/topic',
                    name: '论坛',
                },
                {
                    path: '/hotspot',
                    name: '资讯热点',
                },
                {
                    path: '/photo',
                    name: '图库',
                },

            ],
            // active_index: 0,
            prev: '',
            outerWidth: '',
        }
    },
    props: ['active_index'],
    methods: {
        prev_distance(lista, current_pos) {
            let total_distance = 0
            var prev_lista = lista.slice(0, current_pos)
            var a = [1, 2, 3]
            for (var i = 0; i < prev_lista.length; i++) {
                const e = prev_lista[i]
                total_distance += $(e).outerWidth(true)
            }
            return total_distance
        },
        slide(e, index, path) {
            const lista = $('.nav-main li')
            const unerline = $('.underline')
            // this.prev = this.prev_distance(lista, index) + 10
            this.prev = this.prev_distance(lista, index) + 10
            // this.outerWidth = $(e.target).outerWidth(true) + 30
            this.outerWidth = $(".inner-ceil").eq(index).outerWidth(true) + 30
            // this.active_index = index
            this.$emit('find_index', index)
        },
        change(n) {
            // log('change 按钮被点击', n)
            this.slide(0, n - 1, 0)
        }
    },
    created() {
        // log('this.to_index', this.active_index)
        this.slide(0, this.active_index, 0)
    },
    mounted () {
        log('underline', $('.underline').width())
        $('.underline').width(100)
    },
    updated() {
        // log('header update', this.active_index)
        this.slide(0, this.active_index, 0)
    }



}
</script>

<style scoped>


    .nav-main a {
        text-decoration: none;
        /* border: 1px solid black; */
    }


    .nav-main {
        
        border-bottom: 1px solid #f6f8f9;
    }

    




    .inner-ceil {
        padding: 20px;
        color: rgb(79, 104, 122);
    }

    .active {
        color: rgb(249, 104, 84);
    }



    @media (min-width: 0px) and (max-width: 900px) {

        .nav-main {
            display: block;
            position: absolute;
            top: 10px;
            width: 100%;
        }
        ul {
            /* width: 500px; */
            /* border: 1px solid black; */
            width: 100%;
        }       
        
        .nav-main li{
            list-style: none;
            display: inline;
            margin-left: 10px;
            margin: 10px;
            padding: 0px;
            cursor: pointer;
            font-size: 15px;
            font-weight: bolder;
        } 

        .underline {
            width: 115px;
            height: 4px;
            background-color: rgb(249, 104, 84);
            margin-left: 25px;
            transform: translateX(10px);
            transition: .5s;
        }
        
    }


    @media (min-width: 900px) {

        .nav-main {
            display: block;
            position: absolute;
            top: 20px;
            padding-left: 50%;
        }
        ul {
            width: 100%;
        }
        
        .nav-main li{
            list-style: none;
            display: inline;
            margin-left: 10px;
            margin: 10px;
            padding: 10px;
            cursor: pointer;
            font-size: 20px;
            font-weight: bolder;
        }

        .underline {
            width: 115px;
            height: 4px;
            background-color: rgb(249, 104, 84);
            margin-left: 38px;
            transform: translateX(10px);
            transition: .5s;
        }
    }

</style>


