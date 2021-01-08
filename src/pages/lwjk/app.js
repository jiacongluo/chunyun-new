import Vue from 'vue'
import App from './app.vue'
import '@/utils/rem.js'
import '@/style/reset.scss'
import '@/style/common.css'
import '@/style/common2.css'
import { Button,Progress,Table,TableColumn,Loading,Dropdown,DropdownMenu,DropdownItem,collapse,collapseItem} from 'element-ui'
import utils from '@/utils'
import * as http from '@/utils/core/http'
import * as http2 from '@/utils/core/http2'
import store from '@/utils/store'
Vue.prototype.utils = utils
Vue.prototype.http = http
Vue.prototype.http2 = http2
Vue.use(Button)
Vue.use(Progress)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(collapse)
Vue.use(collapseItem)
new Vue({
    el: '#app',
	store: store,
    render: h => h(App)
})
