<template>
    <div>
        <div class="input-main" @click.capture='setPos'>
            <label :for="label_type">
                <span @click='add_progress' :class="['input-infor',
                {'input-infor-active': input_infor_active == true}]" :aria-label='label_type'>
                    <!-- 请输入你的账号 -->
                    <slot name='placeHolder'></slot>
                </span>
            </label>

            <input :id='label_type' :type="input_type"  @keyup='keyboardMethod'  v-model='models_data' @input='dataMethod' @click='add_progress' @focus='add_progress' @blur='remove_progress' name="name" value="" class='input-ceil' >


            <div class="progress-default"></div>
            <div :class="['progress',
            {'progress-active-leave': progress_active_leave == true},
            {'progress-active': progress_active == true}]" :style="{'transformOrigin': origin_pos,}"></div>
            <slot name='submitInfo'></slot>
            <div class='progress-warning' v-show='ifWarning' :style='warning_style'></div>
            
        </div>
    </div>
</template>


<script>

export default {
    data (){
        return {
            msg: '子组件 data',
            progress_active: false,
            progress_active_leave: '',
            input_infor_active: '',
            origin_pos: '',
            models_data: '',
            input_type: '',
            ifclear: '',
            warning_style: '',
            domain: `${domain}`,
        }
    },
    props: ['data_model', 'type', 'ifclears', 'label_type', 'ifWarning'],
    methods: {
        setPos(event) {
            this.origin_pos = `${event.offsetX}px`

        },
        add_progress() {
            // log('获取焦点')
            this.progress_active = true
            this.input_infor_active = true
            this.progress_active_leave = false

            this.$emit('re_blur', this.type)
            
        },
        remove_progress() {
            // log('失去焦点')
            this.progress_active = false
            if (this.models_data.length > 0) {
                this.input_infor_active = true
            } else {
                this.input_infor_active = false
            }
            this.progress_active_leave = true
            setTimeout(() => {
                this.progress_active = false
            }, 200)

            this.$emit('check_username', this.models_data)
            this.$emit('check_password', this.models_data)
        },
        dataMethod() {
            // log('数据在发生改变 ifclear', this.ifclear)
            this.$emit('get_model', {
                datas: this.models_data,
                type: this.type
            })
        },
        keyboardMethod(event) {
            // log('正在输入', event.key)
            const key = event.key
            if (key == 'Enter') {
                this.$emit('goSerach')
            }
        }
    },
    created() {
        // log('compa created！')
        const type = {
            username: 'input',
            password: 'password',
        }
        this.input_type = type[this.type]
        if (this.ifWarning == true) {
            this.warning_style = {
                opacity: 1,
            }

        }
    },
    updated() {

        // log('compa updated！')
    }

}
</script>


<style scoped>
@import '../../../../static/css/pop.css';

</style>

