/* eslint-disable */
import moment from 'moment'

export default {
    /**
     * 导航到指定页面
     */
    // goToPage: function (pageName, defaultUrl, paramter) {
    //     let theParamterArray = []
    //     for (let key in paramter) {
    //         theParamterArray.push(key + '=' + paramter[key])
    //     }
    //     location.href = defaultUrl + '?' + theParamterArray.join('&')
    // },
    goToPage: function (defaultUrl, paramter) {
        if (!defaultUrl) {
            console.log('没有跳转地址')
            return
        }
        let theParamterArray = []
        for (let key in paramter) {
            theParamterArray.push(key + '=' + paramter[key])
        }
        location.href = defaultUrl + '?' + theParamterArray.join('&')
    },
    // 获得url中的参数,放在对象中,然后返回这个对象
    getUrlParams: function () {
        let args = {}
        let query = location.search.substring(1) // 获取查询串
        let pairs = query.split('&')// 在逗号处断开
        for (let i = 0; i < pairs.length; i++) {
            let pos = pairs[i].indexOf('=')// 查找name=value
            if (pos === -1) continue// 如果没有找到就跳过
            let argname = pairs[i].substring(0, pos).toLowerCase()// 提取name
            let value = pairs[i].substring(pos + 1)// 提取value
            args[argname] = decodeURIComponent(value)// 存为属性
        }
        return args
    },
    /**
     * 对象转换为查询
     * @param obj
     * @returns {*}
     */
    toQuery (obj) {
        var theItems = [];
        for (var key in obj) {
            if (obj[key] == undefined || obj[key] == null) {
                theItems.push(key + '=' + (obj[key] || ''));
            } else {
                theItems.push(key + '=' + (obj[key]));
            }
        }
        return theItems.join('&');
    },
    // 获得hash字符串参数
    getHashParams: function () {
        let args = {}
        let hashStr = location.hash
        if (hashStr.indexOf('?') === -1) { // 如果没有参数
            return null
        }
        let query = hashStr.split('?')[1] // 获取查询串
        let pairs = query.split('&') // 在逗号处断开
        for (let i = 0; i < pairs.length; i++) {
            let pos = pairs[i].indexOf('=') // 查找name=value
            if (pos === -1) continue // 如果没有找到就跳过
            let argname = pairs[i].substring(0, pos).toLowerCase() // 提取name
            let value = pairs[i].substring(pos + 1) // 提取value
            args[argname] = decodeURIComponent(value) // 存为属性
        }
        return args
    },
    // 根据id获取元素
    $id (id) {
        return document.getElementById(id)
    },

    // 根据class获取元素
    $cls (cls) {
        return document.getElementsByClassName(cls)
    },
    // 压缩图片
    compress (img) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        canvas.width = width;
        canvas.height = height;
        // 铺底色
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, width, height);

        let encoderOptions = 0.5 // 可以从 0 到 1 的区间内选择图片的质量,这里超过1M就进行压缩
        //进行压缩
        let ndata = canvas.toDataURL('image/jpeg', encoderOptions);
        console.log('*******压缩后的图片大小*******');
        // console.log(ndata)
        //            debugger
        console.log(ndata.length);
        return ndata;
    },
    IOSConfig: function () {
        let userAgent = navigator.userAgent
        if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Mac') > -1) {
            console.log('on iphone/mac')
            window.addEventListener('popstate', function (e) {
                // alert("后退");
                console.log('后退')
                self.location.reload()
            }, false)
            let state = {
                title: '',
                url: '#'
            }
            window.history.replaceState(state, '', '#')
        }
    },
    /**
     * 节流函数。
     */
    throttle: function (action, delay) {
        let timeout = null
        let lastRun = 0
        return function () {
            if (timeout) return
            let elapsed = Date.now() - lastRun
            let context = this
            let args = arguments
            let runCallback = function () {
                lastRun = Date.now()
                timeout = false
                action.apply(context, args)
            }
            if (elapsed >= delay) {
                runCallback()
            } else {
                timeout = setTimeout(runCallback, delay)
            }
        }
    },
    /**
     * 判断是否已经过指定的分钟
     * @param timeStamp 上一个时间戳(毫秒)
     * @param interval 时间间隔(分钟)
     */
    canRefresh: function (timeStamp, interval) {
        // debugger
        var curTime = new Date().valueOf()
        interval = interval * 60000
        timeStamp = timeStamp.valueOf()
        var result = curTime - timeStamp
        return result > interval
    },
    getClientHeight: function () {
        let clientHeight = 0
        // if (document.body.clientHeight && document.documentElement.clientHeight) {
        //   clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        // } else {
        //   clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        // }
        if (document.documentElement.clientHeight) {
            clientHeight = document.documentElement.clientHeight
        }
        console.log('可视区域高度:', clientHeight)
        return clientHeight
    },
    add0 (m) {
        return m < 10 ? '0' + m : m
    },
    /**
     * json转formdata
     * @param jsonData
     * @returns {*}
     */
    JsonToFormData: function (jsonData) {
        let form = new FormData()
        form.append('param', JSON.stringify(jsonData))
        return form
    },
    /**
     * 把数组里的对象转为formdata
     * @param dataArr
     */
    createFormData: function (dataArr) {
        let form = new FormData()
        for (let obj of dataArr) {
            if (!obj.value) {
                console.log(`${obj.name} 的值为 ${obj.value}`)
                obj.value = ''
                // return false
            }
            try {
                obj.value = obj.value.trim() // 去除空格
            } catch (err) {
                console.log(err)
            }
            form.append(obj.fieldName, obj.value)
        }
        return form
    },
    /**
     * 判断是空对象
     * @param obj 对象
     * @returns {boolean}
     */
    isEmptyObject: function (obj) {
        for (var key in obj) {
            return false
        }
        return true
    },
    /**
     * 判断是不是空的
     * @param param
     * @returns {boolean}
     */
    isEmpty: function (param) {
        var me = this
        var theType = typeof param
        var empty = false
        switch (theType) {
            case 'string':
                if (param === '') {
                    console.log('参数为空字符串')
                    empty = true
                }
                break
            case 'array':
                if (param.length === 0) {
                    console.log('参数为空数组')
                    empty = true
                }
                break
            case 'object':
                empty = me.isEmptyObject(param)
                break
        }
        return empty
    },
    /**
     * 检查字段 手机的值
     * @param theValue
     */
    checkPhoneNum (theValue) {
        let reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/
        return reg.test(theValue)
    },
    /**
     * 检查字段 网址的值
     * @param theValue
     */
    checkURL (theValue) {
        // let reg = /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/
        let reg = /^((https|http|ftp|rtsp|mms){1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
        return reg.test(theValue)
    },
    /**
     * 检查年龄
     * @param theValue 字符串
     */
    checkAge (theValue) {
        if (!theValue) {
            return false
        }
        let Value = eval(theValue), min = 10, max = 70
        return Value <= min || Value >= max
    },
    /**
     * 检查统一社会信用代码
     * 市面上现在有2中企业营业执照注册号(统一社会信用代码)，一种是15位(从2007年开始)，一种是18位(从2015年开始)
     * @param val
     */
    checkCreditCode (val) {
        if (typeof val !== 'string') {
            console.log(`参数类型错误: ${val}`)
            return
        }
        let reg = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/
        return reg.test(val)
    },
    /**
     * 获取经纬度
     */
    getLocation () {
        let lng, // 经度
            lat // 纬度
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    console.log('经度:', position.coords.longitude)
                    console.log('纬度:', position.coords.latitude)
                    lng = position.coords.longitude
                    lat = position.coords.latitude
                },
                function (e) {
                    console.log('获取经纬度失败')
                    throw(e.message)
                }
            )
        } else {
            console.log('该浏览器不支持获取地理位置。')
        }
        return { 'lng': lng, 'lat': lat }
    },
    /**
     * 检测html的fontsize是否已设置, 如果已设置则进行下一步 ,否则递归
     * @param cb 回调函数
     * @returns {boolean}
     */
    hasSetRem (cb) {
        let theHTML = document.getElementsByTagName('html')[0]
        let theFS = theHTML.style.fontSize
        let time1 // 定时器
        if (theFS) {
            clearTimeout(time1) // 清除定时器
            cb()
            return false
        } else {
            time1 = setTimeout(() => {
                this.hasSetRem(cb) // 递归扫描
            }, 300)
        }
    },
    /**
     * 用微信对象获取经纬度
     */
    getLocation2 () {
        try {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    // var speed = res.speed; // 速度，以米/每秒计
                    // var accuracy = res.accuracy; // 位置精度
                    return ({ 'lng': longitude, 'lat': latitude })
                }

            })
        } catch (err) {
            console.log('没有找到wx对象:', err)
            return ({ 'lng': 0, 'lat': 0 })
        }
    },
    /**
     * 用微信对象获取经纬度
     */
    //微信JS-SDK获取经纬度方法
    weichatLatAndLon (callback, error) {
        var that = this;
        var data = null
        var timestamp = new Date().getTime() + '';
        timestamp = timestamp.substring(0, 10);
        // var ranStr = randomString();

        //微信接口配置
        // wx.config({
        // debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        // appId: 'XXXXXXXXXXXXXXXXX', // 必填，公众号的唯一标识
        // timestamp: timestamp, // 必填，生成签名的时间戳
        // nonceStr: ranStr, // 必填，生成签名的随机串
        // signature: 'XXXXXXXXXXXXXXXXX',// 必填，签名，见附录1
        // jsApiList: ['checkJsApi',
        //   'getLocation'
        // ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        // });

        //参见微信JS SDK文档：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
        return new Promise(function (resolve, reject) {
            try {
                // wx.ready(function () {
                wx.getLocation({
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度
                        localStorage.setItem('latitude', latitude);
                        localStorage.setItem('longitude', longitude);
                        data = {
                            lat: latitude,
                            lng: longitude
                        };
                        console.log('获取位置成功: ', JSON.stringify(data))
                        resolve(data)
                    },
                    cancel: function () {
                        //这个地方是用户拒绝获取地理位置
                        console.log('获取位置失败: 用户拒绝')
                        data = {
                            lat: 0,
                            lng: 0
                        };
                        resolve(data)
                    },
                    fail: function (res) {
                        console.log('获取位置失败: ', JSON.stringify(res))
                        data = {
                            lat: 0,
                            lng: 0
                        };
                        resolve(data)
                    }
                });
                wx.error(function (res) {
                    console.log('获取位置失败: ', JSON.stringify(res))
                    data = {
                        lat: 0,
                        lng: 0
                    };
                    resolve(data)
                });
                // });
            } catch (err) {
                console.log('没有err对象: ', JSON.stringify(err))
                data = {
                    lat: 0,
                    lng: 0
                };
                resolve(data)
            }
        })
    },
    // 格式化时间 默认现在
    formatTime (ts = new Date()) {
        moment(ts).format('YYYY-MM-DD HH:mm:ss')
    },
    // 格式化时间 默认现在
    formatTime2 (ts = new Date()) {
        return moment(ts).format('YYYY-MM-DD')
    },
    // 数字, 位数
    formatNum (num, digit = 3) {
        if (typeof num !== 'number') {
            console.log('参数必须为number')
            return
        }
        const str = ','
        let theNum = 1
        for (let i = 0; i < digit; i++) {
            theNum += '0'
        }
        theNum = parseInt(theNum)
        num = num / theNum
        num += ''
        let arr = num.split('.')
        return arr[0] + str + arr[1]
    },
    formatNumAuto (num) {
        var theNumber = num || '0';
        if (typeof num !== 'number') {
            theNumber = parseFloat(num);
        }
        if (num >= 100000000) {
            return (Math.abs(theNumber) / 10000).toFixed(1);
        }
        return (Math.abs(theNumber) / 10000).toFixed(2);
    },
    formateRgba (colorName, num) {
        // var theRgbaString = 'rgba';
        if (colorName.indexOf('#') >= 0) {
            var r = eval('0x' + colorName.substr(1, 2));
            var g = eval('0x' + colorName.substr(3, 2));//colorName.substr(3, 2);
            var b = eval('0x' + colorName.substr(5, 2)); //colorName.substr(5, 2);
            var theResult = `rgba(${r},${g},${b},${num})`;
            return theResult;
        }
    },
    /**
     * 计算字体
     * @param size 原设计图大小
     * @param nowRemSize 当前rem对应fontsize大小
     * @param originRemSize 原rem对应fontsize大小
     */
    calSize (size, nowRemSize, originRemSize = 192) {
        return (size / originRemSize) * nowRemSize
    },
    htmlFontSize () {
        let theHTML = document.getElementsByTagName('html')[0]
        let theFS = theHTML.style.fontSize
        theFS = theFS.replace('px', '');
        return theFS
    },
    //生成从minNum到maxNum的随机数
    randomNum (minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    },
    tofixed (num, wei = 0) {
        return num.toFixed(wei)
    },
    toPercent (num, wei = 0) {
        return parseFloat(this.tofixed(num * 100, wei))
    },
    toWan (num) {
        return num
    },
    // 计算拥挤等级  人数,中等阈值,拥挤阈值
    // 大于0.8:拥挤 大于0.3小于0.8:适中 小于0.3:舒适
    calLv (num, mid=0.3, high=0.8) {
        // console.log(num)
        // debugger
        if (!num) {
            return '暂无'
        }
        if (num > high) {
            return {
                level: '拥挤',
                rank: 1
            }
        } else if (num > mid) {
            return {
                level: '适中',
                rank: 2
            }
        } else {
            return {
                level: '舒适',
                rank: 3
            }
        }
    },
    // 计算单位 万
    getWanUnit (numStr) {
        if (typeof numStr !== 'string') {
            console.log('参数类型必须是string')
            return
        }
        if (numStr.indexOf('.') === -1) {
            return ''
        } else {
            return '万'
        }
    },
    // 计算人数 大于1000要除于10000
    calWanNum (num, dgit=2) {
        // if (typeof num !== 'number') {
        //     console.log('参数类型必须是number')
        //     return
        // }
        if (num > 1000) {
            return (num / 10000).toFixed(dgit)
        }
        return num + ''
    },
    calGender: function (data) {
        var man = data.man;
        var woman = 0;
        if (man <= 0.6 * 100) {
            man = (0.6 * 100).toFixed(0);
            woman = 100 - man;
        } else {
            man = ((0.25 * (man / 100 - 0.6) + 0.6) * 100).toFixed(0);
            woman = 100 - man;
        }
        return { man: man, woman: woman }
    },
    calGender2 (data) {
        var man = data.man;
        var woman = 0;
        if (man <= 0.6 * 100 && man >= 0.5 * 100) {
            man = man.toFixed(0);
            woman = 100 - man;
        } else if (man > 0.6 * 100) {
            man = (man / 5 + 40).toFixed(0)
            woman = 100 - man;
        } else {
            man = ((100 - man)/ 5 + 40).toFixed(0)
            woman = 100 - man;

        }
        return { man: man, woman: woman }
    },

    sleep(timeout) {
        return new Promise((resolve, reject) => {
            //这里模拟异步动作，一般来说可以放置Ajax请求, 'promise1-result'为请求成功后的返回结果
            //注：Promise实例只能通过resolve 或 reject 函数来返回，并用then()或者catch()获取
            //不能在里面直接return ... 这样是获取不到Promise返回值的
            setTimeout(() => resolve('ok'), timeout)
        })
    },
    getHours (str) {
        let arr = []
        for (let i = 0; i < 24; i++) {
            arr.push(i + str)
        }
        return arr
    },
    tooltipFormatter (params, ticket, callback) { // 格式化tooltip
        // debugger;
        var theStr=params[0].seriesName +params[0].name +"小时<br/>";
        var theHash={};
        //                         debugger;
        for(var i=0;i<params.length;i++){
            var theItem=params[i];
            if(!theHash[theItem.seriesName]){
                theHash[theItem.seriesName]=true;
                theStr+= theItem.marker+'客流占比'+":"+theItem.value+"%<br/>"
            }
        }
        return theStr;//params[0].name+"<br/>"+params[0].marker+params[0].seriesName+":"+params[0].value;

    }
}
