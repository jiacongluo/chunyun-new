import TrafficView from '@/utils/traffic'
import MapBase from '@/utils/reli2'
export default function PlacePointView(theMap, points) {
    this.theMap = theMap;
    this.points = points;
    this.markes = [];
    this.listeners = null;
    this.traffic = new TrafficView(theMap)
    this.mapbase=new MapBase(theMap);
    this.mapbase.initEvent();
    /**
     * 设置当前的点数据
     */
    PlacePointView.prototype.setPointsData = function (points) {

        /**
         * coordinate_x: "116.635081"
         coordinate_xys: "[[116.63459, 23.664453], [116.634539, 23.66529], [116.635343, 23.665742], [116.636027, 23.66493]]"
         coordinate_y: "23.665183"
         postion_id: "80151"
         postion_name: "潮州汽车客运站"
         postion_type: "客运站"
         warning_high: 527
         warning_low: 263
         * **/
        this.points = points;
        this.pointsMap = {};
        this.points.map(m => this.pointsMap[m.postion_name] = m);
    };
    PlacePointView.prototype.getPlacePoints = function (pointType) {
        var thePlaces = [];
        for (var i = 0; i < this.PlacePoints.length; i++) {
            var thePlace = this.PlacePoints[i];
            if (thePlace['枢纽类别'] == pointType) {
                thePlaces.push(thePlace);
            }
        }
        return thePlaces;
    }
    PlacePointView.prototype.removePoints = function () {
        if (this.theMap && this.markes) {
            this.theMap.remove(this.markes);
            this.markes = [];
        }
    }

    PlacePointView.prototype.hideMarkers = function () {
        for (var i = 0; i < this.markes.length; i++) {
            var obj = this.markes[i];
            obj.hide();
        }
    }
    PlacePointView.prototype.showMarkers = function () {
        for (var i = 0; i < this.markes.length; i++) {
            var obj = this.markes[i];
            obj.show();
        }
    }
    PlacePointView.prototype.MoveToPointName = function (name, maxZoom) {
        var thePointData = this.pointsMap[name];
        if (thePointData) {
            this.MoveToPoint([thePointData.coordinate_x, thePointData.coordinate_y], maxZoom);
            // debugger;
            this.traffic.drawTheRectangle(JSON.parse(thePointData.coordinate_xys));


        }
    };
    PlacePointView.prototype.drawRawReli=function(name,data){
        var thePointData = this.pointsMap[name];
        var thePointStatusData=this.statusPoints.filter(m=>m.postion_name==name)[0];
        // debugger;
        this.mapbase.drawRawReli(name,data,JSON.parse(thePointData.coordinate_xys),thePointStatusData.status);
    };
    PlacePointView.prototype.MoveToPoint = function (lntlat, maxZoom) {
        console.log("开始导航到指定点!");
        var me=this;
        var theZoom = this.theMap.getZoom();
        var thePitchTimer = window.setInterval(function () {
            if (theZoom > maxZoom) {
                window.clearInterval(thePitchTimer);
                this.theMap.setPitch(45);
                // console.log("结束导航到指定点!");

                return;
            }
            this.theMap.setZoomAndCenter(theZoom++, lntlat);
            // console.log(theZoom,maxZoom)
        }, 10);
        // debugger
        this.theMap.setZoomAndCenter(maxZoom, lntlat);

    };
//结束导航到指定点
    PlacePointView.prototype.ReturnDefualt = function (defaultZoom) {
        console.log("开始导航到该蓝图!");
        var theZoom = this.theMap.getZoom();
        defaultZoom = defaultZoom || 8;  // 默认放大等级
        var lntlat;
        if (window.nowTab !== '高速监测') {
            lntlat = new AMap.LngLat(113.275824, 22.994826);
        } else {
            lntlat = new AMap.LngLat(114.231635, 22.999883);
        }
        var thePitchTimer = window.setInterval(function () {
            if (theZoom < defaultZoom || theZoom <= 1) {
                window.clearInterval(thePitchTimer);
                console.log("结束导航到该蓝图!");
                this.theMap.setPitch(0);
                return;
            }
            this.theMap.setZoomAndCenter(theZoom--, lntlat);
        }, 10);
        this.mapbase.hideReli2()
        // this.theMap.setZoomAndCenter(defaultZoom, lntlat);

    };
    /**
     * 找点的类别
     * @param pointName
     * @returns {*}
     */
    PlacePointView.prototype.getPointType = function (pointName) {
        var theName = pointName;
        var theType;
        for (var i = 0; i < this.PlacePoints.length; i++) {
            var thePlace = this.PlacePoints[i];
            if (thePlace['枢纽名称'] == theName) {
                theType = thePlace['枢纽类别']
            }
        }
        if (!theType) {
            console.warn('没有找到点的类别')
            return
        }
        return theType;
    }

    PlacePointView.prototype.showPointsByData = function (datas) {
        this.statusPoints = datas;
        this.showPoints();
    };
    /**
     * 显示地图点
     * @param pointType 当前tab类型
     * @param YJData 预警data
     */
    PlacePointView.prototype.showPoints = function () {
        this.removePoints();
        var theShowPoints = this.statusPoints || [];
        for (var i = 0; i < theShowPoints.length; i++) {
            /**
             *  {
      "peopleTotal": 222,
      "状态": "舒适",
      "postion_name": "顺德服务区-向南"
    }
             */
            var thePointStatus = theShowPoints[i];
            if (!this.pointsMap[thePointStatus.postion_name]) {
                console.log("未找到坐标信息", thePointStatus);
                continue;
            }
            var theClassMap = {
                "拥挤": "markfuwu1",
                "适中": "markfuwu2",
                "舒适": "markfuwu3",
            };
            var theStatusClassMap = {
                "拥挤": "1",
                "适中": "2",
                "舒适": "3",
            };
            var theClassName2 = theClassMap[thePointStatus['status']];
            var thePointData = this.pointsMap[thePointStatus.postion_name];
            var marker = new AMap.Marker({
                position: new AMap.LngLat(thePointData.coordinate_x, thePointData.coordinate_y),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: thePointStatus.postion_name,
                zIndex:9999,
                content: '<div class="' + theClassName2 + '"><div id="fuwu-detail" style="display: none" class="fuwu-detail"></div><div  class="fuwu-status1 fuwu-status1' + theStatusClassMap[thePointStatus['status']] + '"  style="display: none" >' + thePointStatus['status'] + '</div></div>',
                extData: thePointStatus,//加入对象信息
                // theData: theDataObj
            });
            var me = this;
            marker.on('click', function (e) {
                if (me.listeners) {
                    me.listeners(this.getExtData(), this);
                }

            })
            this.markes.push(marker);
            this.theMap.add(marker);
        }

    }
    PlacePointView.prototype.showMarkPointDetailByName = function (name,ele) {
        var theMarks = this.markes.filter(m => m.getExtData().postion_name == name);
        theMarks&&theMarks.length>0&&this.showMarkPointDetail(theMarks[0],ele);
    };
    PlacePointView.prototype.drawReli = function (bounds, data) {
        //var theAreaPath =bounds;
        //this.CreateHeartLayer();
        if (!this.heartLayer) {
            var map = Loca.create(this.theMap);
            this.heartLayer = Loca.visualLayer({
                container: map,
                type: 'heatmap',
                // 基本热力图
                shape: 'normal'
            });
        }
        value = data || 1000;
        var path = bounds;
        if (!path) {
            console.log("未找到对应的范围");
            return;
        }
        var thePorints = path;
        var lngs = thePorints.map(function (item) {
            return item[0];
        });
        var lats = thePorints.map(function (item) {
            return item[1];
        });

        var minLngs = lngs.min();
        var maxLngs = lngs.max();
        var minLats = lats.min();
        var maxLats = lats.max();


        var theValidPoints = [];
        for (var i = 0; i < 1000; i++) {
            var thePoint = Math.RandomPoint(minLngs, maxLngs, minLats, maxLats);
            if (AMap.GeometryUtil.isPointInRing(thePoint, thePorints)) {
                theValidPoints.push(thePoint);
            }
        }
        var layer = this.heartLayer;

        var theCurrentValue = value;
        var theShowList = [];
        var list = theValidPoints.map(function (item) {
            var theTempValue = 0;
            if (theCurrentValue <= 10) {
                theTempValue = theCurrentValue;
            }
            else {
                theTempValue = Math.floor(Math.RandomRange(1, 10));
            }
            theCurrentValue -= theTempValue;
            if (theTempValue > 0) {
                theShowList.push({
                    coordinate: [item[0], item[1]],
                    count: Math.floor(theTempValue)
                });
            }

        })
        layer.setData(theShowList, {
            lnglat: 'coordinate',
            value: 'count'
        });

        layer.setOptions({
            style: {
                radius: 10,
                color: {
                    0.5: '#2c7bb6',
                    0.65: '#abd9e9',
                    0.7: '#ffffbf',
                    0.9: '#fde468',
                    1.0: '#d7191c'
                }
            }
        });

        layer.render();
    },
    PlacePointView.prototype.showMarkPointDetail = function (mark,ele) {
        if (mark) {
            // debugger;
            var theStatusData = mark.getExtData();
            var theDom = mark.getContentDom();
            var theDetialEles = theDom.getElementsByClassName('fuwu-detail');
            var theInnerStatusEles = theDom.getElementsByClassName('fuwu-status');
            theDetialEles && theDetialEles.length > 0 && (theDetialEles[0].style.display = "block");
            theInnerStatusEles && theInnerStatusEles.length > 0 && (theInnerStatusEles[0].style.display = "block");
            if(theDetialEles && theDetialEles.length > 0&&ele){
                var theDetailPanel=theDetialEles[0];
                // ele.parentElement.remove(ele);
                theDetailPanel.appendChild(ele);
            }
            //detailFlow
            //this.drawReli();
        }

    };
    PlacePointView.prototype.hidePointMarkDetail = function (mark) {
        if (mark) {
            var theStatusData = mark.getExtData();
            var theDom = mark.getContentDom();
            var theDetialEles = theDom.getElementsByClassName('fuwu-detail');
            var theInnerStatusEles = theDom.getElementsByClassName('fuwu-status');
            theDetialEles && theDetialEles.length > 0 && (theDetialEles[0].style.display = "none");
            theInnerStatusEles && theInnerStatusEles.length > 0 && (theInnerStatusEles[0].style.display = "none");
            return;
        }
        this.markes.map(m => {
            var theInnerDom = m.getContentDom();
            var theInnerDetialEles = theInnerDom.getElementsByClassName('fuwu-detail');
            var theInnerStatusEles = theInnerDom.getElementsByClassName('fuwu-status');
            theInnerDetialEles && theInnerDetialEles.length > 0 && (theInnerDetialEles[0].style.display = "none");
            theInnerStatusEles && theInnerStatusEles.length > 0 && (theInnerStatusEles[0].style.display = "none");
        });
    };
    /**
     * 找点的坐标
     * @param name
     */
    PlacePointView.prototype.findPointPosition = function (name) {
        for (var i = 0; i < this.markes.length; i++) {
            var m = this.markes[i];
            var mData = m.C.extData;
            if (name === mData['枢纽名称']) {
                return mData['地址'][0].lnglat
            }
        }
    }
}