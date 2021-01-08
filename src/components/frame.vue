<template>
	<iframe ref='myFrame' id="myFrame" src="bxdx.html" frameborder="0"></iframe>
</template>

<script>
	export default {
		props: {
			drawInfo: {
				type: Array,

			},
			drawMethods: {
				type: Number,
				default: 0,
			}
		},
		watch: {
			drawInfo(n, o) {
			    // debugger;
				if(n.length>0){
					this.$refs.myFrame.contentWindow.postMessage({
						drawMethods: this.drawMethods,
						drawInfo: n,
					})
				}
			}
		},
		data() {
			return {
				ready: false,
				pathArr: [], //如果类型为矩形或多边形，就把坐标存到数组里面
				radius: 0, //如果为圆，这是半径
				center: [], //圆的半径
			}
		},
		created() {
			let me = this;
			// debugger;
            window.addEventListener('message', function(event) {
                var theDrawInfo=me.drawInfo;
                if (event.data == 'close') {
                    me.$parent('close');
                } else if (event.data.drawType) {
                    me.$emit('close');
                    me.$emit('draw', event.data.drawType);
                } else if (event.data == 'clean') {
                    me.$emit('clean');
                } else if (event.data == 'ready') {
                    // debugger
                    // if (theDrawInfo.length>0) {
                    //     // debugger
                    //     me.$refs.myFrame.contentWindow.postMessage({
                    //         drawMethods: me.drawMethods,
                    //         drawInfo: theDrawInfo,
                    //     })
                    // }
                }
            }, false);

		},
		mounted() {
            // var theDrawInfo=this.drawInfo;
            // console.log("theDrawInfo",JSON.stringify(theDrawInfo));

		},
		methods: {
			// sendMessage(){
			// 	let me = this
			// 	if(this.type == "圆形"){
			// 		me.$refs.myFrame.contentWindow.postMessage({
			// 			type:me.type,
			// 			center: me.center,
			// 			radius: me.radius,
			// 			city:me.city,
			// 		})
			// 	}else{
			// 		me.$refs.myFrame.contentWindow.postMessage({
			// 			type:me.type,
			// 			pathArr: me.pathArr,
			// 			city:me.city,
			// 		})
			// 		// me.$refs.myFrame.contentWindow.postMessage("主页面消息")
			// 	}
			// }
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#myFrame {
		width: 1920px;
		height: 1080px;
	}
</style>
