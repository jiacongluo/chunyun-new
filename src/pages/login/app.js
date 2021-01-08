import Vue from 'vue'
import App from './app.vue'
import '@/utils/rem.js'
import '@/style/reset.scss'
import '@/style/common.css'
import '@/style/common2.css'
import { Button,Progress } from 'element-ui'
import * as http from '@/utils/core/http'
import * as http2 from '@/utils/core/http2'
import utils from '@/utils'
Vue.prototype.utils = utils
Vue.prototype.http = http
Vue.prototype.http2 = http2
Vue.use(Button)
Vue.use(Progress)
new Vue({
    el: '#app',
    render: h => h(App)
})
