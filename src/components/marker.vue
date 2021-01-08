<template>
	<div class="marker bgi color-white">
		<div class="flex" :style="this.ifPeople?'':'padding-bottom: 6px;'">
			<div></div>
			<div class="fs_20">{{name}}</div>
		</div>
		<!-- <div v-if="ifPeople"></div>
		<div class="flex fs_16" v-if="ifPeople">
			<div v-if="floor">当前楼层人数: </div>
			<div v-else>当前枢纽人数:</div>
			<div style="margin-left: 10px;">{{amount}}</div>
			<div>人</div>
		</div> -->
		<p class="delect bgi csp" @click="closeInfo"></p>
		<!-- <p class="bgi" :class="this.ifPeople?'sharp2':'sharp'"></p> -->
	</div>
</template>

<script>
	export default{
		props:{
			//上面的标题
			name:{
				type:String,
				default:'',
			},
			//人数
			amount:{
				type:[String,Number],
				default:'',
			},
			//是否有下面的文字
			ifPeople:{
				type:Boolean,
				default:true,
			},
            // 是不是楼层
            floor:{
				type:Boolean,
				default:false,
			},
		},
		data(){
			return{
				
			}
		},
		methods:{
			closeInfo(){
				this.$emit('closeInfo')
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.marker{
		background-image: url('../assets/kuang3.png');
        position: relative;
        // padding-top: 14px;
        // padding-left: 19px;
        // padding-right: 34px;
		width: 264px;
		height: 100px;
		padding-right: 4px;
		>div:first-child{
			position:absolute;
			transform: translateY(-50%);
			top:50%;
			left:23px;
			
			>div:first-child{
				width:7px;
				height:20px;
				background:rgba(52,205,255,1);
				margin-right: 10px;
				margin-bottom: 11px;
			}
			>div:nth-child(2){
				color: rgba(52, 205, 255, 1);
			}
		}
		// >div:nth-child(2){
		// 	width:231px;
		// 	height:2px;
		// 	background:rgba(93,111,140,1);
		// 	border-radius:50%;
		// 	margin-bottom: 20px;
		// }
		// >div:nth-child(3){
		// 	padding-bottom: 34px;
		// 	vertical-align: bottom;
		// 	>div:nth-child(1),>div:nth-child(3){
		// 		padding-top: 14px;
		// 	}
		// 	>div:nth-child(2){
		// 		font-size: 30px;
		// 		color: rgb(255,255,0);
		// 	}
		// }
		
		.delect{
			position: absolute;
			width: 14px;
			height: 14px;
			background-image: url(../assets/cha.png);
			top: 8px;
			right: 10px;
		}
		// .sharp{
		// 	position: absolute;
		// 	width: 20px;
		// 	height: 20px;
		// 	bottom: -12px;
		// 	left: 50%;
		// 	margin-left: -5px;
		// 	background-image: url(../assets/jian.png);
		// }
		// .sharp2{
		// 	position: absolute;
		// 	width: 28px;
		// 	height: 28px;
		// 	bottom: -12px;
		// 	left: 50%;
		// 	margin-left: -14px;
		// 	background-image: url(../assets/jian.png);
		// }
	}
</style>
