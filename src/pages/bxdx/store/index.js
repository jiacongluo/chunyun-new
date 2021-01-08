import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		//白名单
		white:{},
		//黑名单
		black:{},
		//自定义名单
		selfs:{},
	},
	mutations:{
		change(state,obj){
			if(obj.i){
				if(obj.i === 1){
					state.black = obj.obj
				}else{
					state.selfs = obj.obj	
				}
			}else{
				state.white = obj.obj
			}
		},
		delect(state,i){
			if(i){
				if(i === 1){
					state.black = {}
				}else{
					state.selfs = {}	
				}
			}else{
				state.white = {}
			}
		},
		delectAll(state){
			state.white = {}
			state.black = {}
			state.selfs = {}
		},
	},
	getters:{
		getAll: state => {
			let arr = []
			arr.push(state.white)
			arr.push(state.black)
			arr.push(state.selfs)
			return arr 
		},
	},
	actions:{
	
	}
})

export default store