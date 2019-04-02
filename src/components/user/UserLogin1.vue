<template>
    <div>
        <popChange :changeType='types'></popChange>        
    </div>
</template>

<script>
import popChange from '@/components/user/pop/popChange'

export default {
    components: {
        popChange,
    },
    data () {
        return {
            types: {
                name: 'login',
            },
            ifTrans: false,
            domain: `${domain}`,
            
        }
    },
    methods: {
        show() {
            // log('被点击')
            this.ifTrans = !this.ifTrans
        }
    }
}
</script>

<style scoped>
@import '../../../static/css/pop.css';


</style>


