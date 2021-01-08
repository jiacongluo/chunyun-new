import Vue from 'vue'
import App from './app.vue'
import '@/utils/rem.js'
import '@/style/reset.scss'
import '@/style/common.css'
import '@/style/common2.css'
import { Button,Progress } from 'element-ui'
import utils from '@/utils'
Vue.prototype.utils = utils

Vue.use(Button)
Vue.use(Progress)
new Vue({
    el: '#app',
    render: h => h(App)
})
