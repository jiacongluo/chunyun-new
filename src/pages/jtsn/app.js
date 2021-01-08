import Vue from 'vue'
import App from './app.vue'
import '@/utils/rem.js'
import '@/style/reset.scss'
import '@/style/common.css'
import '@/style/common2.css'
import { Button,Progress,Carousel,CarouselItem } from 'element-ui'
import utils from '@/utils'
import store from '@/utils/store'

Vue.prototype.utils = utils
Vue.use(Button)
Vue.use(Progress)
Vue.use(Carousel)
Vue.use(CarouselItem)
new Vue({
    el: '#app',
    store: store,
    render: h => h(App)
})
