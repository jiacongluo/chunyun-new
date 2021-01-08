import Vue from 'vue'
import App from './app.vue'
import '@/utils/rem.js'
import '@/style/reset.scss'
import '@/style/common.css'
import '@/style/common2.css'
import * as http from '@/utils/core/http'
import * as http2 from '@/utils/core/http2'
import { Button,Progress,Dropdown,DropdownMenu,DropdownItem,Dialog,Form,FormItem,Input,Select,Option,MessageBox,Message,Table,TableColumn,Loading,collapse,collapseItem} from 'element-ui'
import utils from '@/utils'
import store from './store/index.js'
Vue.use(Button)
Vue.use(Progress)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)
Vue.use(collapse)
Vue.use(collapseItem)
Vue.component(MessageBox)
Vue.prototype.http = http
Vue.prototype.http2 = http2
Vue.prototype.utils = utils
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
new Vue({
    el: '#app',
	store,
    render: h => h(App)
})
