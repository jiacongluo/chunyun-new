/*eslint-disable*/
import { getData } from '@/utils/core/http'

function MapBase() {
  var me = this;
  this.theHeartLayer = null;
  this.theHeartLayerT2 = null;
  this.normalRadius = 15
}
var theInnerLayer = window.theInnerLayer= null
//
// var theFloorMap = {
//     '深圳北站F1': '深圳北站1-2F',
//     '深圳北站F2': '深圳北站1-2F',
//     '广州南站B1': '广州南站B1F',
//     '广州南站1F': '广州南站1F',
//     '广州南站2F': '广州南站2F',
//     '广州南站3F': '广州南站3F',
//     // '深圳宝安国际机场F1': '深圳宝安国际机场1F',
//     // '深圳宝安国际机场F2': '深圳宝安国际机场2F',
//     // '深圳宝安国际机场F3': '深圳宝安国际机场3F',
//     // '深圳宝安国际机场F4': '深圳宝安国际机场4-5F',
//     // '深圳宝安国际机场F5': '深圳宝安国际机场4-5F',
//     '深圳宝安国际机场1F': '深圳宝安国际机场1F',
//     '深圳宝安国际机场2F': '深圳宝安国际机场2F',
//     '深圳宝安国际机场3F': '深圳宝安国际机场3F',
//     '深圳宝安国际机场4F': '深圳宝安国际机场4-5F',
//     // '深圳宝安国际机场5F': '深圳宝安国际机场4-5F',
//
//     '广州白云国际机场1F': '广州白云区机场-1F',
//     '广州白云国际机场2F': '广州白云区机场-2F',
//     '广州白云国际机场3F': '广州白云区机场-3F',
//     '广州白云国际机场4F': '广州白云区机场-4F'
//
// };

var theFloorMap = {
    '深圳北站F1': 80106,
'深圳北站F2': 80107,
'广州南站B1': 80116,
'广州南站1F': 80117,
'广州南站2F': 80118,
'广州南站3F': 80119,
// '深圳宝安国际机场F1': '深圳宝安国际机场1F',
// '深圳宝安国际机场F2': '深圳宝安国际机场2F',
// '深圳宝安国际机场F3': '深圳宝安国际机场3F',
// '深圳宝安国际机场F4': '深圳宝安国际机场4-5F',
// '深圳宝安国际机场F5': '深圳宝安国际机场4-5F',
'深圳宝安国际机场1F': 80109,
'深圳宝安国际机场2F': 80110,
'深圳宝安国际机场3F': 80111,
'深圳宝安国际机场4F': 80112,
'宝安国际机场1F': 80109,
'宝安国际机场2F': 80110,
'宝安国际机场3F': 80111,
'宝安国际机场4F': 80112,
// '深圳宝安国际机场5F': '深圳宝安国际机场4-5F',

'广州白云国际机场1F': 80120,
'广州白云国际机场F1': 80120,
'广州白云国际机场2F': 80121,
'广州白云国际机场F2': 80121,
'广州白云国际机场3F': 80122,
'广州白云国际机场F3': 80122,
'广州白云国际机场4F': 80127,
'广州白云国际机场F4': 80127

};
var theFloorNameMap = {

}
MapBase.prototype.initEvent = function () {
    this.initMapEvent();
}
// 显示楼层的地点
MapBase.IsFloorVisible = function () {
    var curPosition = window.postionName
    // var theName = ['深圳北站', '广州南站', '广州白云国际机场', '深圳宝安国际机场', '广州火车站'];
    var theName = ['深圳北站', '广州南站', '广州白云国际机场', '深圳宝安国际机场','宝安国际机场'];
    //debugger;
    for (var i = 0; i < theName.length; i++) {
        if (curPosition == theName[i]) {
            return true;
        }
    }
    return false;
};
function theComp() {
    console.log('室内图层加载完!');
    // $('#DivButton').empty();
    // debugger;
    var theBuilding = null;
    var theHideFloor = ['广州南站B2','广州南站3A','广州白云国际机场B1',
        '广州白云机场T2航站楼B1','广州白云机场T2航站楼B2','深圳宝安国际机场T3航站楼5F']; // 隐藏的楼层
    // debugger
    setInterval(function () {
        var theZoom = theMap.getZoom();
        if (theZoom < 16) {
            theBuilding = null;
            $('#DivButton').empty();
            return;
        }
        var theLastBuilding = theBuilding;
        theBuilding = theInnerLayer.getSelectedBuilding();
        // console.log(theBuilding)
        if (theBuilding != theLastBuilding) {

            if (!theBuilding) {
                console.log('未找到建筑物!');
                $('#DivButton').empty();
                return;
            }
            //找到图层了
            console.log('jiazaiwancheng@!1');
            $('#DivButton').empty();
            if(!MapBase.IsFloorVisible()){
                return;
            }
            //floor_complete
            var theFloors = theBuilding.floor_details.floor_nonas;
            var theFloorIndex = theBuilding.floor_details.floor_indexs;
            var buildingName = theBuilding.name;
            console.log(`buildingName:${buildingName}`);
            window.buildingName = buildingName
            if (buildingName === '广州白云国际机场T1航站楼') {
                theFloors = ['B1','1F','2F','3F']
            }
            if (buildingName === '广州白云机场T2航站楼') {
                // theFloors = ['1F','2F','3F','4F']
                return
            }
            outer:
                for (var i = 0; i < theFloors.length; i++) {
                    var theName = theFloors[i];
                    var theIndex = theFloorIndex[i];
                    var theFullName = buildingName + theName;
                    // debugger
                    for (var j = 0; j < theHideFloor.length; j++) {
                        var fName = theHideFloor[j];
                        // debugger
                        if(theFullName===fName) {
                            // debugger
                            continue outer
                        }
                    }
                    $('<div data-index=' + theIndex + '>' + theName + '</div>').click(function () {
                        var theCurrentIndex = $(this).data('index');
                        theInnerLayer.showFloor(theCurrentIndex,true);
                        var theCurrentBuild = theInnerLayer.getSelectedBuilding();
                        var theLnt = theCurrentBuild.lnglat;
                        // me.drawReli(theLnt.lng, theLnt.lat);  // 热力图

                    }).appendTo($('#DivButton'));
                    console.log(theFloors[i]);
                    //开始显示楼层
                    //theBuilding.showFloor();
                }

            floorBindClick();
        }
    }, 500);
}


//关闭信息窗体
function closeInfoWindow() {
    window.theMap.clearInfoWindow();
}
/**
 * 区分不用显示热力楼层
 * floorName 楼层名字
 */
function filterFloor(floorName) {
    // debugger
    // 不显示热力的楼层
    var hideReliFloorOArr = ['广州南站2F', '广州南站3A', '广州南站B2', '深圳北站-1F', '广州白云国际机场B1','深圳宝安国际机场5F','宝安国际机场5F'];
    // debugger
    var theName = window.postionName + floorName;
    for (var i = 0; i < hideReliFloorOArr.length; i++) {
        var nameItem = hideReliFloorOArr[i];
        if (nameItem === theName) {
            return false
        }
    }
    return true
}

MapBase.prototype.hideReli = function () {
    this.theHeartLayer && this.theHeartLayer.remove();
    this.theHeartLayer = null;
    // debugger;
}
MapBase.prototype.hideReli2 = function (t2=false) {
    if (this.theHeartLayer) {
        // debugger
        this.theHeartLayer.hide && this.theHeartLayer.hide()
    }
    if (t2) {
        if (this.theHeartLayerT2) {
            // debugger
            this.theHeartLayerT2.hide && this.theHeartLayerT2.hide()
        }
    }
    // debugger;
}
MapBase.prototype.showReli = function (t2=false) {
    if (this.theHeartLayer) {
        // debugger
        this.theHeartLayer.show && this.theHeartLayer.show()
    }
    if (t2) {
        if (this.theHeartLayerT2) {
            // debugger
            this.theHeartLayerT2.show && this.theHeartLayerT2.show()
        }
    }
    // debugger;
}
MapBase.prototype.removeReli = function () {
    if (this.theHeartLayer) {
        // debugger
        this.theHeartLayer.setMap(null);
    }
    // debugger;
}
MapBase.OnFloorClick = function (name) {
    // debugger;

    // hideCurLocaction();
    // var curPosDataBox = $('#cur-pos-data-box');
    // curPosDataBox.hide();
    // isHideStation = true;
    // tabBoxCur.find('.arrow.up').removeClass('dn');
    // tabBoxCur.find('.arrow.down').addClass('dn');
    closeInfoWindow();
    var isTheReliFloor = filterFloor(name);
    // debugger
    if (!isTheReliFloor) {
        mapbase.hideReli2();
        closeInfoWindow();
        return;
    }
    floorClick(name);
};
/**
 * 处理楼层点击
 * name 楼层名,例如1F
 */
function floorClick(name) {
    window.isFloor = true // 记录点击楼层
    var buildingName = window.buildingName
    var fullName = window.postionName + name;
    if (buildingName === '广州白云机场T2航站楼') {
        fullName = buildingName + name
        drawT2Reli(buildingName, fullName)
        return
    }
    var theMapID;
    console.log('楼层:', fullName);
    // debugger
    // return
    // if (nowTab === tabArr[0]) {
        theMapID = theFloorMap[fullName];
        if (!theMapID) {
            console.log('没有对应的楼层名字!');
            return
        }
        reqReliData(theMapID, true, fullName);
    // }
}
// 白云机场 T2 航班楼热力
window.drawT2Reli = function (buildingName ,fullName, user_cnt=1000) {
    var theLnglat = [113.306028,23.397649]
    var theData = [{
        postion_name: fullName,
        user_cnt: user_cnt
    }]
    var lv = ''
    for (const terminalInfoListElement of window.terminalInfoList) {
        if (terminalInfoListElement.postion_name === window.postionName) {
            // theLnglat = terminalInfoListElement.lnglat
            lv = terminalInfoListElement.lv.level
        }
    }
    var position = new AMap.LngLat(theLnglat[0], theLnglat[1]);
    let theDom = createInfoDom(theData[0], fullName)
    window.drawPositionMarker(position, theDom, false)
    mapbase.drawReli(buildingName, theData[0]['user_cnt'], fullName, lv);
}
/**
 * 请求热力数据
 * @param id 映射后的楼层名
 * @param isCLickFloor 是否点击楼层
 * @param originalName 原名
 */
function reqReliData(id, isCLickFloor, originalName) {
    // debugger
    var url = `/api/terminal/getTerminalFlow`
    var data = {
        postionID: id,
    }
    getData(url, data).then((res) => {
        var theLnglat = null
        var lv = ''
        for (const terminalInfoListElement of window.terminalInfoList) {
            if (terminalInfoListElement.postion_name === window.postionName) {
                theLnglat = terminalInfoListElement.lnglat
                lv = terminalInfoListElement.lv.level
            }
        }
        var position = new AMap.LngLat(theLnglat[0], theLnglat[1]);

        let theDom = createInfoDom(res.data[0], originalName)
        window.drawPositionMarker(position, theDom)
        mapbase.drawReli(window.postionName, res.data[0]['user_cnt'], originalName, lv);

    })
    // $.post(url, {}, function (data) {
    //     // console.log(data);
    //     // debugger
    //     if (data.isSuccess && !isEmptyObject(data.data)) {
    //         var pepNum = data.data.userCnt;
    //         var theName = data.data.postionName;
    //         var theData, infoWindow;
    //         var lnglat = pointControl.findPointPosition(curPosition).split(',').map(function (t) {
    //             return parseFloat(t)
    //         });
    //         // debugger
    //         // return
    //         if (isCLickFloor) {
    //             theData = {
    //                 name: theName,
    //                 data1: '当前楼层人数: ' + pepNum + '人',
    //                 data2: ''
    //             };
    //             infoWindow = new AMap.InfoWindow({
    //                 isCustom: true,  //使用自定义窗体
    //                 content: createInfoWindow(theData),
    //                 // content: createInfoWindow2(theData),
    //                 offset: new AMap.Pixel(11, 0),
    //                 position: new AMap.LngLat(lnglat[0], lnglat[1])
    //             });
    //             infoWindow.open(theMap);
    //         } else {
    //             // debugger
    //             theData = {
    //                 name: theName,
    //                 data1: '当前人数: ' + pepNum + '人',
    //                 data2: ''
    //             };
    //             infoWindow = new AMap.InfoWindow({
    //                 isCustom: true,  //使用自定义窗体
    //                 content: createInfoWindow(theData),
    //                 // content: createInfoWindow2(theData),
    //                 offset: new AMap.Pixel(11, 0),
    //                 position: new AMap.LngLat(lnglat[0], lnglat[1])
    //             });
    //             infoWindow.open(theMap);
    //         }
    //         mapbase.drawReli(name, pepNum, originalName);
    //         // var theZoom = thePlaceZoomObj[name] || 18;
    //         // debugger
    //         // pointControl.MoveToPoint(arg, theZoom);
    //     }
    // })
}
/**
 * 楼层切换绑定点击
 */
function floorBindClick() {
    var floors = $('#DivButton div');
    for (var i = 0; i < floors.length; i++) {
        var f = floors[i];
        $(f).on('click', function () {
            //debugger;
            if(MapBase&&MapBase.OnFloorClick){
                MapBase.OnFloorClick($(this).text());
            }
            for (var j = 0; j < floors.length; j++) {
                var f = floors[j];
                $(f).removeClass('active');
            }

            $(this).addClass('active')
        })
    }
}
/**
 * 初始化大图事件
 */
MapBase.prototype.initMapEvent = function () {
    var me = this;
    var theMap = window.theMap
    AMap.plugin(['AMap.IndoorMap', 'AMap.OverView'], function () {
        var indoorMap = new AMap.IndoorMap({alwaysShow: true});
        theMap.add(indoorMap);

        // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        // var OVOption = {
        //     isOpen: true
        // };
        // overView = new AMap.OverView(OVOption);
        // theMap.addControl(overView);
        // overView.hide()
    });
    //地图加载完成事件
    theMap.on('complete', function () {
        console.log("地图加载完成!");
        //获取
        // var ambientLight = theMap.AmbientLight;   //获取环境光
        // var directionLight = theMap.DirectionLight; //获取平行光
        //修改
        // theMap.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
        //  theMap.DirectionLight = new AMap.Lights.DirectionLight([-6, -2, 14], [1, 1, 1], 0.5);
    });
    //监听放大缩小事件
    theMap.on('zoom', function (arg) {
        var theZoom = theMap.getZoom();
        let theHeartLayerT2 = me.theHeartLayerT2
        if (theZoom <= 16) {
            me.theHeartLayer.setOptions({
                style: {
                    radius: 5,
                    // color: {
                    //     0.5: '#2c7bb6',
                    //     0.65: '#abd9e9',
                    //     0.7: '#ffffbf',
                    //     0.9: '#fde468',
                    //     1.0: '#d7767d'
                    // },
                    opacity: [0.1,0.6]
                }
            });
            me.theHeartLayer.render()
            if (theHeartLayerT2) {
                theHeartLayerT2.setOptions({
                    style: {
                        radius: 5,
                        // color: {
                        //     0.5: '#2c7bb6',
                        //     0.65: '#abd9e9',
                        //     0.7: '#ffffbf',
                        //     0.9: '#fde468',
                        //     1.0: '#d7767d'
                        // },
                        opacity: [0.1,0.6]
                    }
                });
                theHeartLayerT2.render()
            }
        }
        if (theZoom >= 17) {
            me.theHeartLayer.setOptions({
                style: {
                    radius: me.normalRadius,
                    // color: {
                    //     0.5: '#2c7bb6',
                    //     0.65: '#abd9e9',
                    //     0.7: '#ffffbf',
                    //     0.9: '#fde468',
                    //     1.0: '#d7767d'
                    // },
                    opacity: [0.1,0.7]
                }
            });
            me.theHeartLayer.render()
            if (theHeartLayerT2) {
                theHeartLayerT2.setOptions({
                    style: {
                        radius: me.normalRadius,
                        // color: {
                        //     0.5: '#2c7bb6',
                        //     0.65: '#abd9e9',
                        //     0.7: '#ffffbf',
                        //     0.9: '#fde468',
                        //     1.0: '#d7767d'
                        // },
                        opacity: [0.1,0.7]
                    }
                });
                theHeartLayerT2.render()
            }
        }
        if (theZoom >= 16) {
            me.showReli()
            if (theHeartLayerT2) {
                me.showReli(true)
            }
        } else {
            me.hideReli2()
            if (theHeartLayerT2) {
                me.hideReli2(true)
            }
        }
        // if (theZoom >= 14) {
        //     $('#container2').hide()
        // } else {
        //     // console.log(window.nowTab);
        //     // if(window.nowTab!=='高速监测') {
        //     $('#container2').show()
        //     // }
        // }
        // if (theZoom >= 12) {
        //     // console.log("显示点");
        //     // console.log()
        //     // debugger
        //     if (me.isGaoSuLuWang || me.isGaoSuLuDuan) {
        //         // debugger
        //         theMap.setFeatures(['bg', 'road','point']);
        //     }
        //     else {
        //         // debugger
        //         theMap.setFeatures(['bg', 'building', 'point', 'road']);
        //         // theMap.add(roadNet);
        //         // theMap.add(traffic);
        //         theMap.add(building);
        //     }
        //
        //     theMap.setPitch(45);
        //     theInnerLayer && theInnerLayer.setzIndex(1000);
        //     //theMap.add(satellite);
        //     //theMap.setMapStyle("normal");
        //
        // }
        // else {
        //     // console.log("隐藏点");
        //     if (me.isGaoSuLuWang || me.isGaoSuLuDuan) {
        //         theMap.setFeatures(['bg']);
        //         // console.log(1)
        //
        //     } else {
        //         // console.log(2)
        //         theMap.setFeatures(['bg']);
        //
        //     }
        //
        //     //theHeartLayer && theHeartLayer.setMap(null);
        //     this.theHeartLayer && this.theHeartLayer.remove();
        //     this.theHeartLayer = null;
        //     // theMap.setFeatures(['bg', 'building']);
        //     theMap.remove(roadNet);
        //     theMap.remove(building);
        //     // theMap.remove(traffic);
        //     theMap.setPitch(0);
        //     //theMap.setMapStyle("amap://styles/grey");
        // }
        // if (!theMakerLayer) {
        //     return;
        // }
        // if (!theMakerLayer['show']) {
        //     return;
        // }
        // if (theZoom >= 10) {
        //     theMakerLayer.hide();
        // }
        // else {
        //     theMakerLayer.show();
        // }
    });
    var theLayers = theMap.getLayers();
    for (var i = 0; i < theLayers.length; i++) {
        var theLayer = theLayers[i];
        if (theLayer.CLASS_NAME == 'AMap.IndoorMap') {
            console.log("找到室内图");
            theLayer.hideFloorBar();
            theInnerLayer = theLayer;

            theInnerLayer.off('complete');
            //theInnerLayer.off('floor_complete');
            theInnerLayer.on('click', function () {

            });

        }
    }
    theComp();
    // theInnerLayer && theInnerLayer.on('complete', function (arg) {
    //   console.log('室内图层加载完!');
    //   $('#DivButton').empty();
    //   debugger;
    //   var theBuilding = null;
    //   setInterval(function () {
    //     var theZoom = theMap.getZoom();
    //     if (theZoom < 16) {
    //       theBuilding = null;
    //       $('#DivButton').empty();
    //       return;
    //     }
    //     var theLastBuilding = theBuilding;
    //     theBuilding = theInnerLayer.getSelectedBuilding();
    //     // console.log(theBuilding)
    //     if (theBuilding != theLastBuilding) {
    //
    //       if (!theBuilding) {
    //         console.log('未找到建筑物!');
    //         $('#DivButton').empty();
    //         return;
    //       }
    //       //找到图层了
    //       console.log('jiazaiwancheng@!1');
    //       $('#DivButton').empty();
    //       if(!MapBase.IsFloorVisible()){
    //         return;
    //       }
    //       //floor_complete
    //       var theFloors = theBuilding.floor_details.floor_nonas;
    //       var theFloorIndex = theBuilding.floor_details.floor_indexs;
    //
    //       for (var i = 0; i < theFloors.length; i++) {
    //         var theName = theFloors[i];
    //         var theIndex = theFloorIndex[i];
    //         $('<div data-index=' + theIndex + '>' + theName + '</div>').click(function () {
    //           var theCurrentIndex = $(this).data('index');
    //           theInnerLayer.showFloor(theCurrentIndex,true);
    //           var theCurrentBuild = theInnerLayer.getSelectedBuilding();
    //           var theLnt = theCurrentBuild.lnglat;
    //           // me.drawReli(theLnt.lng, theLnt.lat);  // 热力图
    //
    //         }).appendTo($('#DivButton'));
    //         console.log(theFloors[i]);
    //         //开始显示楼层
    //         //theBuilding.showFloor();
    //       }
    //
    //       floorBindClick();
    //     }
    //   }, 500);
    // });
}
MapBase.prototype.removeHeartMap = function () {
    if (this.theHeartLayer) {
        this.theHeartLayer.remove();
    }
    this.theHeartLayer = null;
}
Array.prototype.min = function (compare) {
  var theMinValue = null;
  var datas=this;
  if (datas && datas.length > 0) {
    for (var i = 0; i < datas.length; i++) {
      if (theMinValue == null) {
        theMinValue = datas[i];
      }
      else{
        if(compare){
          if(compare(datas[i],theMinValue)){
            theMinValue = datas[i];
          }
          continue;
        }
        if(datas[i]<theMinValue){
          theMinValue = datas[i];
        }
      }
    }
  }
  return theMinValue;
}
Array.prototype.max = function () {
  var datas=this;
  var theMaxValue = null;
  if (datas && datas.length > 0) {
    for (var i = 0; i < datas.length; i++) {
      if (theMaxValue == null) {
        theMaxValue = datas[i];
      }
      else{
        if(datas[i]>theMaxValue){
          theMaxValue = datas[i];
        }
      }
    }
  }
  return theMaxValue;
}
Math.RandomRange=function(mindata,maxdata){
  return Math.random() * (maxdata - mindata) + mindata;
}
Math.RandomPoint=function(mindata1,maxdata1,mindata2,maxdata2){
  return [Math.RandomRange(mindata1,maxdata1),Math.RandomRange(mindata2,maxdata2)];
}
// MapBase.prototype.removeReli=function(){
//   this.theHeartLayer&&this.theHeartLayer.remove();
//   this.theHeartLayer=null;
// }

MapBase.prototype.CreateHeartLayer = function (name) {
    // debugger;
  if (name === '广州白云机场T2航站楼') {
      if (!this.theHeartLayerT2) {
          const layer2 = new Loca.HeatmapLayer({
              map: theMap
          });
          this.theHeartLayerT2 = layer2
      }

  } else {
      if (!this.theHeartLayer) {
          // var map = Loca.create(theMap);
          const layer = new Loca.HeatmapLayer({
              map: theMap
          });
          // this.theHeartLayer = Loca.visualLayer({
          //   container: map,
          //   type: 'heatmap',
          //     zIndex:10,
          //   // 基本热力图
          //   shape: 'normal',
          // });
          this.theHeartLayer = layer
          // this.theHeartLayer.setZIndex(zindex||1001)
      }
  }
}

/**
 * 画热力图
 * @param name 名称
 * @param data 人数
 */
MapBase.prototype.drawReli = function (name, data, originName, status) {
  console.log('开始画热力图:'+name +', originName: '+originName);
  // debugger
    var me = this
  var placeArr = {
    '深圳北站':
      [[114.027401,22.609051],[114.029644,22.61097],[114.030969,22.609622],[114.028711,22.607709]],
    // '深圳北站1-2F':
    //   [[114.027401,22.609051],[114.029644,22.61097],[114.030969,22.609622],[114.028711,22.607709]],
    '深圳北站F1':
      [[114.027401,22.609051],[114.029644,22.61097],[114.030969,22.609622],[114.028711,22.607709]],
    '深圳北站F2':
      [[114.027416,22.608908],[114.029792,22.610936],[114.03091,22.609765],[114.028504,22.607729]],
    '广州南站':
      [[113.26794,22.987108],[113.26713,22.988296],[113.270557,22.990331],[113.271209,22.989086],[113.269443,22.987991]],
    '广州南站1F':
      [[113.26828,22.986995],[113.268163,22.986952],[113.267541,22.987627],[113.267082,22.988393],[113.267195,22.988525],[113.266682,22.989209],[113.269799,22.991051],[113.270231,22.990419],[113.270411,22.990505],[113.271486,22.988975],[113.271389,22.988842],[113.271739,22.988352],[113.268652,22.986511]],
    '广州南站2F':
      [[113.26794,22.987108],[113.26713,22.988296],[113.270557,22.990331],[113.271209,22.989086],[113.269443,22.987991]],
    '广州南站3F':
      [[113.26794,22.987108],[113.26713,22.988296],[113.270557,22.990331],[113.271209,22.989086],[113.269443,22.987991]],
    '广州南站B1F':
      [[113.271222,22.989669],[113.27068,22.98948],[113.270667,22.989374],[113.269427,22.988628],[113.269025,22.988433],[113.268428,22.988095],[113.268351,22.98802],[113.268163,22.988254],[113.268315,22.988288],[113.268842,22.988592],[113.268814,22.988688],[113.270668,22.989767],[113.270588,22.989893],[113.270932,22.990064]],
    // '广州白云国际机场':
    //   [[113.301301,23.385968],[113.301723,23.387568],[113.304613,23.386954],[113.304136,23.385315]],
    '广州白云国际机场': [[113.30328,23.385591],[113.301375,23.385844],[113.301379,23.386515],[113.300948,23.386618],[113.300826,23.383974],[113.300252,23.383962],[113.300247,23.38548],[113.300391,23.386952],[113.300505,23.388481],[113.301069,23.391377],[113.301367,23.391226],[113.301616,23.39122],[113.300935,23.38719],[113.301445,23.386956],[113.301736,23.387464],[113.303139,23.387074],[113.304637,23.386858],[113.304558,23.386358],[113.305236,23.386183],[113.306637,23.390066],[113.307288,23.389942],[113.306601,23.387793],[113.305731,23.385765],[113.304164,23.382891],[113.303692,23.383354],[113.304973,23.385728],[113.304464,23.385812],[113.304118,23.385209]],
      '广州白云机场T2航站楼':[[113.303585,23.396738],[113.303703,23.397197],[113.302976,23.397358],[113.302572,23.395879],[113.302315,23.396059],[113.301979,23.396511],[113.300223,23.396887],[113.300353,23.397265],[113.302116,23.396925],[113.302635,23.397176],[113.303163,23.39931],[113.302592,23.400768],[113.301499,23.401119],[113.301572,23.401539],[113.302887,23.401224],[113.303651,23.399413],[113.309065,23.398173],[113.310683,23.399469],[113.311925,23.399145],[113.311804,23.398756],[113.310651,23.398936],[113.309344,23.397862],[113.308781,23.395751],[113.309094,23.395229],[113.310861,23.394798],[113.310729,23.394541],[113.308921,23.39496],[113.308161,23.394565],[113.308532,23.396097],[113.307904,23.396191],[113.307569,23.395809],[113.306253,23.396081],[113.305996,23.395102],[113.306821,23.394887],[113.306554,23.393801],[113.303684,23.394446],[113.30402,23.39554],[113.304699,23.395408],[113.304949,23.396382]],
      '广州白云机场T2航站楼F1':[[113.303585,23.396738],[113.303703,23.397197],[113.302976,23.397358],[113.302572,23.395879],[113.302315,23.396059],[113.301979,23.396511],[113.300223,23.396887],[113.300353,23.397265],[113.302116,23.396925],[113.302635,23.397176],[113.303163,23.39931],[113.302592,23.400768],[113.301499,23.401119],[113.301572,23.401539],[113.302887,23.401224],[113.303651,23.399413],[113.309065,23.398173],[113.310683,23.399469],[113.311925,23.399145],[113.311804,23.398756],[113.310651,23.398936],[113.309344,23.397862],[113.308781,23.395751],[113.309094,23.395229],[113.310861,23.394798],[113.310729,23.394541],[113.308921,23.39496],[113.308161,23.394565],[113.308532,23.396097],[113.307904,23.396191],[113.307569,23.395809],[113.306253,23.396081],[113.305996,23.395102],[113.306821,23.394887],[113.306554,23.393801],[113.303684,23.394446],[113.30402,23.39554],[113.304699,23.395408],[113.304949,23.396382]],
      '广州白云机场T2航站楼F2':[[113.303585,23.396738],[113.303703,23.397197],[113.302976,23.397358],[113.302572,23.395879],[113.302315,23.396059],[113.301979,23.396511],[113.300223,23.396887],[113.300353,23.397265],[113.302116,23.396925],[113.302635,23.397176],[113.303163,23.39931],[113.302592,23.400768],[113.301499,23.401119],[113.301572,23.401539],[113.302887,23.401224],[113.303651,23.399413],[113.309065,23.398173],[113.310683,23.399469],[113.311925,23.399145],[113.311804,23.398756],[113.310651,23.398936],[113.309344,23.397862],[113.308781,23.395751],[113.309094,23.395229],[113.310861,23.394798],[113.310729,23.394541],[113.308921,23.39496],[113.308161,23.394565],[113.308532,23.396097],[113.307904,23.396191],[113.307569,23.395809],[113.306253,23.396081],[113.305996,23.395102],[113.306821,23.394887],[113.306554,23.393801],[113.303684,23.394446],[113.30402,23.39554],[113.304699,23.395408],[113.304949,23.396382]],
      '广州白云机场T2航站楼F3':[[113.303585,23.396738],[113.303703,23.397197],[113.302976,23.397358],[113.302572,23.395879],[113.302315,23.396059],[113.301979,23.396511],[113.300223,23.396887],[113.300353,23.397265],[113.302116,23.396925],[113.302635,23.397176],[113.303163,23.39931],[113.302592,23.400768],[113.301499,23.401119],[113.301572,23.401539],[113.302887,23.401224],[113.303651,23.399413],[113.309065,23.398173],[113.310683,23.399469],[113.311925,23.399145],[113.311804,23.398756],[113.310651,23.398936],[113.309344,23.397862],[113.308781,23.395751],[113.309094,23.395229],[113.310861,23.394798],[113.310729,23.394541],[113.308921,23.39496],[113.308161,23.394565],[113.308532,23.396097],[113.307904,23.396191],[113.307569,23.395809],[113.306253,23.396081],[113.305996,23.395102],[113.306821,23.394887],[113.306554,23.393801],[113.303684,23.394446],[113.30402,23.39554],[113.304699,23.395408],[113.304949,23.396382]],
      '广州白云机场T2航站楼F4':[[113.303585,23.396738],[113.303703,23.397197],[113.302976,23.397358],[113.302572,23.395879],[113.302315,23.396059],[113.301979,23.396511],[113.300223,23.396887],[113.300353,23.397265],[113.302116,23.396925],[113.302635,23.397176],[113.303163,23.39931],[113.302592,23.400768],[113.301499,23.401119],[113.301572,23.401539],[113.302887,23.401224],[113.303651,23.399413],[113.309065,23.398173],[113.310683,23.399469],[113.311925,23.399145],[113.311804,23.398756],[113.310651,23.398936],[113.309344,23.397862],[113.308781,23.395751],[113.309094,23.395229],[113.310861,23.394798],[113.310729,23.394541],[113.308921,23.39496],[113.308161,23.394565],[113.308532,23.396097],[113.307904,23.396191],[113.307569,23.395809],[113.306253,23.396081],[113.305996,23.395102],[113.306821,23.394887],[113.306554,23.393801],[113.303684,23.394446],[113.30402,23.39554],[113.304699,23.395408],[113.304949,23.396382]],
    '广州白云国际机场1F':
      [[113.30328,23.385591],[113.301375,23.385844],[113.301379,23.386515],[113.300948,23.386618],[113.300826,23.383974],[113.300252,23.383962],[113.300247,23.38548],[113.300391,23.386952],[113.300505,23.388481],[113.301069,23.391377],[113.301367,23.391226],[113.301616,23.39122],[113.300935,23.38719],[113.301445,23.386956],[113.301736,23.387464],[113.303139,23.387074],[113.304637,23.386858],[113.304558,23.386358],[113.305236,23.386183],[113.306637,23.390066],[113.307288,23.389942],[113.306601,23.387793],[113.305731,23.385765],[113.304164,23.382891],[113.303692,23.383354],[113.304973,23.385728],[113.304464,23.385812],[113.304118,23.385209]],
    '广州白云国际机场2F':
      [[113.30328,23.385591],[113.301375,23.385844],[113.301379,23.386515],[113.300948,23.386618],[113.300826,23.383974],[113.300252,23.383962],[113.300247,23.38548],[113.300391,23.386952],[113.300505,23.388481],[113.301069,23.391377],[113.301367,23.391226],[113.301616,23.39122],[113.300935,23.38719],[113.301445,23.386956],[113.301736,23.387464],[113.303139,23.387074],[113.304637,23.386858],[113.304558,23.386358],[113.305236,23.386183],[113.306637,23.390066],[113.307288,23.389942],[113.306601,23.387793],[113.305731,23.385765],[113.304164,23.382891],[113.303692,23.383354],[113.304973,23.385728],[113.304464,23.385812],[113.304118,23.385209]],
    '广州白云国际机场3F':
      [[113.30328,23.385591],[113.301375,23.385844],[113.301379,23.386515],[113.300948,23.386618],[113.300826,23.383974],[113.300252,23.383962],[113.300247,23.38548],[113.300391,23.386952],[113.300505,23.388481],[113.301069,23.391377],[113.301367,23.391226],[113.301616,23.39122],[113.300935,23.38719],[113.301445,23.386956],[113.301736,23.387464],[113.303139,23.387074],[113.304637,23.386858],[113.304558,23.386358],[113.305236,23.386183],[113.306637,23.390066],[113.307288,23.389942],[113.306601,23.387793],[113.305731,23.385765],[113.304164,23.382891],[113.303692,23.383354],[113.304973,23.385728],[113.304464,23.385812],[113.304118,23.385209]],
    // '广州白云国际机场4F':
    //   [[113.30328,23.385591],[113.301375,23.385844],[113.301379,23.386515],[113.300948,23.386618],[113.300826,23.383974],[113.300252,23.383962],[113.300247,23.38548],[113.300391,23.386952],[113.300505,23.388481],[113.301069,23.391377],[113.301367,23.391226],[113.301616,23.39122],[113.300935,23.38719],[113.301445,23.386956],[113.301736,23.387464],[113.303139,23.387074],[113.304637,23.386858],[113.304558,23.386358],[113.305236,23.386183],[113.306637,23.390066],[113.307288,23.389942],[113.306601,23.387793],[113.305731,23.385765],[113.304164,23.382891],[113.303692,23.383354],[113.304973,23.385728],[113.304464,23.385812],[113.304118,23.385209]],
    '深圳宝安国际机场':
      [[113.811961,22.623893],[113.811513,22.624723],[113.812374,22.625131],[113.813637,22.625844],[113.814257,22.626182],[113.814571,22.62592],[113.814919,22.625322]],
    '宝安国际机场':
      [[113.811961,22.623893],[113.811513,22.624723],[113.812374,22.625131],[113.813637,22.625844],[113.814257,22.626182],[113.814571,22.62592],[113.814919,22.625322]],
      '金湾机场': [[113.364688,21.990982],[113.376239,22.002241],[113.373283,22.00585],[113.379503,22.011588],[113.383162,22.008434],[113.398,22.022528],[113.40123,22.019181],[113.367687,21.987576]],

    '珠海金湾机场': [[113.364688,21.990982],[113.376239,22.002241],[113.373283,22.00585],[113.379503,22.011588],[113.383162,22.008434],[113.398,22.022528],[113.40123,22.019181],[113.367687,21.987576]],
    // '深圳宝安国际机场':[[113.811934,22.623741],[113.811516,22.624528],[113.811399,22.624749],[113.812259,22.625371],[113.812065,22.626119],[113.811818,22.627034],[113.811177,22.628423],[113.811537,22.628545],[113.812854,22.626706],[113.8144,22.626297],[113.814651,22.625908],[113.815,22.625189],[113.813993,22.624684]],
    '宝安国际机场4F':[[113.811951,22.623779],[113.811538,22.624522],[113.811241,22.624599],[113.811128,22.624854],[113.811942,22.625724],[113.812063,22.626083],[113.812008,22.626458],[113.811534,22.627721],[113.811194,22.628423],[113.811547,22.628495],[113.812466,22.62705],[113.812998,22.626506],[113.813365,22.626393],[113.814527,22.626506],[113.814622,22.626257],[113.814569,22.626012],[113.815007,22.625184]],
    // '宝安国际机场5F':[[113.811455,22.624561],[113.811208,22.624669],[113.811088,22.624875],[113.81193,22.625699],[113.812188,22.625328],[113.812322,22.624961],[113.813857,22.62569],[113.813464,22.626366],[113.814459,22.626532],[113.814636,22.626245],[113.814565,22.625988]],
    // '宝安国际机场3F':[[113.814558,22.626086],[113.814537,22.626316],[113.812866,22.626263],[113.812196,22.625892],[113.811493,22.625112],[113.811276,22.624859],[113.811428,22.624627],[113.810592,22.624144],[113.810512,22.624519],[113.810963,22.62501],[113.811891,22.625846],[113.812071,22.626211],[113.81192,22.626658],[113.811647,22.627523],[113.810528,22.629548],[113.810203,22.629629],[113.808005,22.628592],[113.807815,22.628929],[113.81009,22.630119],[113.81008,22.630352],[113.808928,22.632559],[113.809213,22.63272],[113.810368,22.630711],[113.810716,22.630356],[113.812991,22.63133],[113.813167,22.631036],[113.810914,22.629913],[113.810921,22.629683],[113.812279,22.627289],[113.812931,22.626549],[113.813339,22.626404],[113.815419,22.626604],[113.815692,22.626357],[113.814778,22.626099],[113.814565,22.625988]],
    // '宝安国际机场2F':[[113.814526,22.626387],[113.812709,22.62626],[113.812706,22.625984],[113.813139,22.625577],[113.81331,22.625603],[113.813265,22.625762],[113.81436,22.626307],[113.814985,22.625192],[113.813352,22.624432],[113.811976,22.623745],[113.811439,22.624748],[113.812561,22.625284],[113.812666,22.625438],[113.81263,22.625804],[113.81238,22.626167],[113.812196,22.625892],[113.811493,22.625112],[113.811276,22.624859],[113.81094,22.624535],[113.810592,22.624144],[113.810512,22.624519],[113.810963,22.62501],[113.811891,22.625846],[113.812071,22.626211],[113.81192,22.626658],[113.811647,22.627523],[113.810528,22.629548],[113.810203,22.629629],[113.808005,22.628592],[113.807815,22.628929],[113.81009,22.630119],[113.81008,22.630352],[113.808928,22.632559],[113.809213,22.63272],[113.810368,22.630711],[113.810716,22.630356],[113.812991,22.63133],[113.813167,22.631036],[113.810914,22.629913],[113.810921,22.629683],[113.812279,22.627289],[113.812931,22.626549],[113.813339,22.626404],[113.815419,22.626604],[113.815692,22.626357],[113.815363,22.626449],[113.815019,22.62642]],
    // '宝安国际机场1F':[[113.814526,22.626387],[113.812942,22.626091],[113.812706,22.625984],[113.813053,22.625761],[113.813161,22.625823],[113.813271,22.625897],[113.813139,22.625577],[113.813224,22.62559],[113.81329,22.62589],[113.81331,22.625603],[113.813299,22.625643],[113.813287,22.625682],[113.813265,22.625762],[113.813611,22.6253],[113.813363,22.625123],[113.81354,22.624874],[113.813696,22.624912],[113.813778,22.624796],[113.814988,22.625301],[113.814985,22.625192],[113.813352,22.624432],[113.811976,22.623745],[113.811836,22.623897],[113.813265,22.624583],[113.813049,22.624987],[113.812723,22.624845],[113.81233,22.625444],[113.81263,22.625804],[113.81238,22.626167],[113.812196,22.625892],[113.811493,22.625112],[113.811276,22.624859],[113.81094,22.624535],[113.810592,22.624144],[113.810512,22.624519],[113.810963,22.62501],[113.811891,22.625846],[113.812071,22.626211],[113.81192,22.626658],[113.811647,22.627523],[113.810528,22.629548],[113.810203,22.629629],[113.808005,22.628592],[113.807815,22.628929],[113.81009,22.630119],[113.81008,22.630352],[113.808928,22.632559],[113.809213,22.63272],[113.810368,22.630711],[113.810716,22.630356],[113.812991,22.63133],[113.813167,22.631036],[113.810914,22.629913],[113.810921,22.629683],[113.812279,22.627289],[113.812931,22.626549],[113.813339,22.626404],[113.815419,22.626604],[113.815692,22.626357],[113.815363,22.626449],[113.815019,22.62642]],
    '宝安国际机场4-5F':[[113.811951,22.623779],[113.811538,22.624522],[113.811241,22.624599],[113.811128,22.624854],[113.811942,22.625724],[113.812063,22.626083],[113.812008,22.626458],[113.811534,22.627721],[113.811194,22.628423],[113.811547,22.628495],[113.812466,22.62705],[113.812998,22.626506],[113.813365,22.626393],[113.814527,22.626506],[113.814622,22.626257],[113.814569,22.626012],[113.815007,22.625184]],
    '宝安国际机场5F':[[113.81143,22.624545],[113.811223,22.624679],[113.811113,22.624842],[113.812002,22.625872],[113.813182,22.626411],[113.814494,22.626501],[113.814636,22.626248],[113.814574,22.626015]],
    '宝安国际机场3F':[[113.812556,22.625382],[113.811526,22.62486],[113.811664,22.624599],[113.811207,22.624309],[113.810643,22.623991],[113.810557,22.624154],[113.811362,22.625045],[113.811955,22.625783],[113.812033,22.626145],[113.812006,22.626496],[113.811529,22.627635],[113.810974,22.628775],[113.810444,22.629671],[113.809189,22.62915],[113.807993,22.628603],[113.807795,22.628933],[113.81001,22.629984],[113.808836,22.632601],[113.809207,22.632724],[113.810656,22.630357],[113.811822,22.630839],[113.812976,22.631369],[113.813063,22.631155],[113.813135,22.631003],[113.811992,22.630436],[113.811077,22.630025],[113.810868,22.629821],[113.811264,22.629023],[113.812046,22.627622],[113.812536,22.627007],[113.813171,22.626416],[113.814576,22.62638],[113.814462,22.626149]],
    '宝安国际机场2F':[[113.811934,22.623741],[113.811516,22.624528],[113.811399,22.624749],[113.812259,22.625371],[113.812065,22.626119],[113.811818,22.627034],[113.811177,22.628423],[113.811537,22.628545],[113.812854,22.626706],[113.8144,22.626297],[113.814651,22.625908],[113.815,22.625189],[113.813993,22.624684]],
    '宝安国际机场1F':[[113.811934,22.623741],[113.811516,22.624528],[113.811399,22.624749],[113.812259,22.625371],[113.812065,22.626119],[113.811818,22.627034],[113.811177,22.628423],[113.811537,22.628545],[113.812854,22.626706],[113.8144,22.626297],[113.814651,22.625908],[113.815,22.625189],[113.813993,22.624684]],

    '广州站':
      [[113.256631,23.148886],[113.256898,23.149427],[113.25737,23.149234],[113.259263,23.148291],[113.258991,23.147797]],
    '广州火车站':
      [[113.256631,23.148886],[113.256898,23.149427],[113.25737,23.149234],[113.259263,23.148291],[113.258991,23.147797]],
    '广州火车站1F':
      [[113.256631,23.148886],[113.256898,23.149427],[113.25737,23.149234],[113.259263,23.148291],[113.258991,23.147797]],
    '广州火车站2F':
      [[113.256631,23.148886],[113.256898,23.149427],[113.25737,23.149234],[113.259263,23.148291],[113.258991,23.147797]],
    '佛山沙堤机场':[[113.075039,23.065629],[113.081734,23.095791],[113.078043,23.095476],[113.075554,23.092475],[113.069889,23.067682]],
    '常平站':[[114.008492,22.98268],[114.004082,22.986423],[114.003406,22.985762],[114.004983,22.984369],[114.004543,22.983895],[114.005005,22.982838],[114.005745,22.981811],[114.006485,22.982413],[114.006829,22.982176],[114.006829,22.982176],[114.007172,22.982522],[114.007816,22.981949]],
    '常平东站':[[114.041081,22.961859],[114.041183,22.961972],[114.041462,22.961859],[114.041634,22.962175],[114.041231,22.962471],[114.041151,22.962866],[114.040861,22.963108],[114.040942,22.963657],[114.040818,22.963849],[114.040454,22.963755],[114.040577,22.963489],[114.040523,22.963133],[114.040062,22.962906],[114.039982,22.962832],[114.039681,22.962931],[114.039542,22.962649],[114.039837,22.962511],[114.039783,22.962392]],
    '樟木头站':[[114.067619,22.900559],[114.067903,22.900925],[114.068005,22.90087],[114.068214,22.901147],[114.070108,22.900085],[114.070398,22.900475],[114.068879,22.901592],[114.067013,22.902659],[114.066659,22.902165],[114.066685,22.901513],[114.066476,22.901246]],
    '樟木头东站':[[114.105365,22.957303],[114.106818,22.958291],[114.106539,22.958622],[114.106325,22.958563],[114.106062,22.958829],[114.10574,22.958706],[114.104635,22.95793],[114.10434,22.957634],[114.104592,22.957328],[114.105059,22.957659]],
    '惠州南站':[[114.491043,22.782297],[114.494669,22.784839],[114.493564,22.786332],[114.49321,22.786154],[114.493049,22.786352],[114.492663,22.786293],[114.492191,22.786679],[114.490935,22.785838],[114.491279,22.785413],[114.49042,22.784473],[114.490195,22.783503]],
    '小榄站':[[113.269163,22.6467],[113.269629,22.647151],[113.270123,22.646764],[113.271217,22.647908],[113.271662,22.647626],[113.272253,22.648289],[113.271587,22.648972],[113.271341,22.648967],[113.270772,22.648428],[113.270343,22.648745],[113.269898,22.648344],[113.269442,22.648656],[113.268712,22.647868],[113.269184,22.647467],[113.268776,22.646957]],
    '肇庆东站':[[112.662671,23.211162],[112.66354,23.212611],[112.664345,23.212296],[112.66545,23.214001],[112.661373,23.216023],[112.660805,23.215017],[112.660408,23.215165],[112.659088,23.212927]],
    '茂名站':[[110.931089,21.640294],[110.931089,21.641491],[110.932001,21.641341],[110.932151,21.642308],[110.928986,21.642907],[110.929104,21.644313],[110.92714,21.644293],[110.927162,21.643385],[110.926894,21.643236],[110.926701,21.642398],[110.928235,21.642029],[110.928106,21.64174],[110.927655,21.64168],[110.927666,21.640284]],
    '韶关东站':[[113.603255,24.788764],[113.605572,24.792592],[113.606141,24.795075],[113.605701,24.795251],[113.605143,24.794452],[113.604414,24.794764],[113.604178,24.794501],[113.603427,24.79489],[113.602965,24.794053],[113.604006,24.793312],[113.603791,24.792874],[113.604102,24.792679],[113.602096,24.789348]],
    '深圳坪山站':[[114.329915,22.706355],[114.329164,22.709176],[114.324518,22.708186],[114.325151,22.705326]],
    '深圳东站':[[114.11897,22.599072],[114.119345,22.59934],[114.119935,22.600597],[114.120418,22.600419],[114.121062,22.601251],[114.12118,22.601083],[114.122349,22.602281],[114.120557,22.603559],[114.120429,22.604242],[114.119366,22.604223],[114.119206,22.603212],[114.118111,22.602737],[114.118594,22.601172],[114.118497,22.600261],[114.118594,22.600082],[114.118272,22.599389]],
    '光明城站':[[113.954689,22.72994],[113.954829,22.73411],[113.953686,22.73412],[113.953638,22.731671],[113.954244,22.731632],[113.954217,22.729984]],
    '福田站':[[114.057631,22.537474],[114.057605,22.538792],[114.056762,22.538787],[114.056779,22.537469]],

    // '广州站广场':
    //   [[113.257712,23.148006],[113.257435,23.147872],[113.25721,23.147558],[113.257028,23.147511],[113.25695,23.147561],[113.256622,23.14829],[113.256618,23.14858],[113.256697,23.148751],[113.257154,23.148542],[113.258192,23.148094],[113.258907,23.147809],[113.258765,23.147579]],
    '深圳西站':[[113.907892,22.52737],[113.907261,22.527392],[113.90724,22.52857],[113.90782,22.528569],[113.907867,22.52831],[113.908066,22.52837],[113.908247,22.528336],[113.908289,22.527416]],
    '深圳站':[[114.116723,22.53082],[114.116417,22.532785],[114.117635,22.532917],[114.117728,22.532397],[114.117933,22.530966]],
    '广州北站':[[113.204512,23.376661],[113.204217,23.377545],[113.204462,23.377598],[113.204548,23.377334],[113.204734,23.376676]],
    '广州东站':[[113.325658,23.149821],[113.325512,23.149838],[113.325467,23.149706],[113.325391,23.149712],[113.325188,23.149524],[113.324994,23.149604],[113.325017,23.149786],[113.324798,23.149859],[113.324718,23.149707],[113.324605,23.149667],[113.324408,23.149498],[113.324361,23.14956],[113.324434,23.149712],[113.324517,23.149998],[113.324298,23.150079],[113.324229,23.15026],[113.324168,23.150458],[113.32393,23.150523],[113.323823,23.150425],[113.323411,23.150636],[113.323075,23.150878],[113.323168,23.151249],[113.324707,23.150709],[113.325293,23.1505],[113.325947,23.150261],[113.325783,23.149886]],
    '惠州站':[[114.416387,23.151128],[114.416159,23.151044],[114.416034,23.151343],[114.415819,23.152289],[114.416115,23.152307],[114.416378,23.152362],[114.41648,23.152259],[114.417839,23.152296],[114.417867,23.151247],[114.417499,23.151236],[114.417026,23.151194]],
    '东莞站':[[113.858974,23.087851],[113.858614,23.088312],[113.859,23.089274],[113.859268,23.089667],[113.860736,23.088485],[113.859421,23.087609]],
    '东莞东':[[114.038445,22.967052],[114.038546,22.967586],[114.039932,22.967341],[114.039801,22.966803]],
    '虎门站':[[113.67414,22.86],[113.672408,22.859826],[113.672408,22.859427],[113.672284,22.858887],[113.67192,22.858601],[113.67081,22.859676],[113.671113,22.859936],[113.67102,22.860401],[113.671248,22.860442],[113.671259,22.8609],[113.671721,22.8609],[113.671679,22.86164],[113.673488,22.86277],[113.673872,22.862094],[113.674108,22.861262],[113.675597,22.861527],[113.675687,22.860955],[113.675752,22.860168],[113.675983,22.859948],[113.675206,22.859093]],
    '潮汕站':[[116.590668,23.538403],[116.587674,23.53686],[116.586756,23.538812],[116.585115,23.53828],[116.584694,23.539267],[116.5862,23.539878],[116.586078,23.540439],[116.586408,23.540651],[116.586064,23.54192],[116.587894,23.54249],[116.588594,23.540763],[116.590433,23.541232],[116.591268,23.539178]],
    '佛山西':[[113.031569,23.078005],[113.031278,23.079144],[113.031093,23.079968],[113.033599,23.080705],[113.035848,23.08096],[113.036052,23.079898],[113.036203,23.078892]],
    '佛山西站':[[113.031569,23.078005],[113.031278,23.079144],[113.031093,23.079968],[113.033599,23.080705],[113.035848,23.08096],[113.036052,23.079898],[113.036203,23.078892]],
    '珠海站':[[113.550709,22.214759],[113.547828,22.214842],[113.547843,22.21551],[113.548416,22.215488],[113.549476,22.215445],[113.550743,22.215456]],
    // '深圳北F1':[[114.030934,22.609699],[114.028728,22.60764],[114.027344,22.609023],[114.029113,22.610725],[114.029697,22.611235],[114.030512,22.610263]],
    // '白云国际机场二号航站楼':[[113.307175,23.395893],[113.306315,23.396125],[113.30601,23.395096],[113.306876,23.394953],[113.306526,23.393817],[113.305468,23.394046],[113.305662,23.394867],[113.305011,23.394964],[113.304758,23.394154],[113.303734,23.394441],[113.304002,23.395589],[113.304689,23.39548],[113.304928,23.396389],[113.303478,23.396758],[113.303615,23.397293],[113.303889,23.398027],[113.305328,23.397661],[113.306713,23.397353],[113.308034,23.39698],[113.307785,23.395793]],
    // '白云国际机场二号航站楼F2':[[113.306846,23.394934],[113.306577,23.393805],[113.303754,23.394466],[113.304012,23.395575],[113.304815,23.395501],[113.304958,23.396366],[113.303576,23.396851],[113.302556,23.395867],[113.302337,23.395901],[113.302093,23.396513],[113.300268,23.396965],[113.300315,23.397435],[113.302586,23.397248],[113.303155,23.399242],[113.302676,23.400848],[113.301325,23.401388],[113.301481,23.401932],[113.303091,23.401489],[113.303573,23.399816],[113.306248,23.399028],[113.309022,23.398339],[113.310848,23.400094],[113.312108,23.399288],[113.311815,23.398764],[113.310647,23.398886],[113.309298,23.397868],[113.308815,23.395985],[113.309338,23.395533],[113.310847,23.395014],[113.310801,23.39446],[113.308944,23.39494],[113.308595,23.394743],[113.308222,23.394546],[113.307854,23.395796],[113.306353,23.396066],[113.306094,23.395256]],
    // '白云国际机场二号航站楼F4':[[113.30642,23.39619],[113.306326,23.396137],[113.305589,23.396209],[113.304972,23.396373],[113.304973,23.396399],[113.304955,23.396345],[113.304958,23.396366],[113.303576,23.396851],[113.302556,23.395867],[113.302337,23.395901],[113.302093,23.396513],[113.300268,23.396965],[113.300315,23.397435],[113.302586,23.397248],[113.303155,23.399242],[113.302676,23.400848],[113.301325,23.401388],[113.301481,23.401932],[113.303091,23.401489],[113.303573,23.399816],[113.306248,23.399028],[113.309022,23.398339],[113.310848,23.400094],[113.312108,23.399288],[113.311815,23.398764],[113.310647,23.398886],[113.309298,23.397868],[113.308815,23.395985],[113.309338,23.395533],[113.310847,23.395014],[113.310801,23.39446],[113.308944,23.39494],[113.308595,23.394743],[113.308222,23.394546],[113.307854,23.395796],[113.306353,23.396066],[113.306324,23.396062]],
    '深圳福田汽车客运站':[[114.012056,22.531586],[114.01135,22.531539],[114.01097,22.532948],[114.012607,22.533154],[114.014622,22.533418],[114.016163,22.531374],[114.016021,22.531244],[114.015628,22.531201],[114.014463,22.53127]],
    '福田汽车客运站CBG':[[114.012056,22.531586],[114.01135,22.531539],[114.01097,22.532948],[114.012607,22.533154],[114.014622,22.533418],[114.016163,22.531374],[114.016021,22.531244],[114.015628,22.531201],[114.014463,22.53127]],
    '深圳市龙岗汽车客运站':[[114.271617,22.724397],[114.271371,22.724243],[114.271268,22.724344],[114.271335,22.724402],[114.271316,22.724584],[114.271115,22.724852],[114.271315,22.725038],[114.271405,22.725067],[114.271582,22.724911],[114.271742,22.724695],[114.27177,22.724458]],
    '龙岗长途汽车客运站':[[114.271617,22.724397],[114.271371,22.724243],[114.271268,22.724344],[114.271335,22.724402],[114.271316,22.724584],[114.271115,22.724852],[114.271315,22.725038],[114.271405,22.725067],[114.271582,22.724911],[114.271742,22.724695],[114.27177,22.724458]],
    '深圳罗湖汽车客运站':[[114.11881,22.529349],[114.118615,22.530741],[114.11931,22.53083],[114.119498,22.529403]],
    '罗湖汽车站':[[114.11881,22.529349],[114.118615,22.530741],[114.11931,22.53083],[114.119498,22.529403]],
    '深圳汽车站':[[114.089044,22.569121],[114.089382,22.569576],[114.089748,22.569446],[114.090061,22.569246],[114.090413,22.568851],[114.089973,22.568386]],
    '广东省汽车客运站':[[113.252192,23.147864],[113.252122,23.147958],[113.251915,23.147917],[113.251787,23.148272],[113.25183,23.148599],[113.252022,23.148733],[113.25225,23.14883],[113.252576,23.148877],[113.252929,23.148857],[113.253052,23.148594],[113.253257,23.148542],[113.253378,23.148044]],
    '广州芳村汽车客运站':[[113.234959,23.07941],[113.234551,23.07947],[113.234335,23.079585],[113.23445,23.080796],[113.23574,23.080661],[113.235633,23.079386]],
    '广州汽车客运站':[[113.252371,23.146271],[113.252163,23.146292],[113.251567,23.146741],[113.251523,23.147083],[113.252182,23.147268],[113.252594,23.147351],[113.252762,23.146511]],
    '广州市汽车客运站':[[113.252371,23.146271],[113.252163,23.146292],[113.251567,23.146741],[113.251523,23.147083],[113.252182,23.147268],[113.252594,23.147351],[113.252762,23.146511]],
    '天河汽车客运站':[[113.344055,23.170426],[113.343993,23.170332],[113.343509,23.170066],[113.343344,23.17006],[113.342247,23.170455],[113.341091,23.170759],[113.341912,23.172321],[113.342622,23.171725],[113.343452,23.170966]],
    '广州市天河客运站':[[113.344055,23.170426],[113.343993,23.170332],[113.343509,23.170066],[113.343344,23.17006],[113.342247,23.170455],[113.341091,23.170759],[113.341912,23.172321],[113.342622,23.171725],[113.343452,23.170966]],
    '茂名市客运中心站':[[110.9256,21.644577],[110.925551,21.645207],[110.925256,21.645922],[110.926469,21.645917],[110.926497,21.644569]],
    '茂名客运中心站':[[110.9256,21.644577],[110.925551,21.645207],[110.925256,21.645922],[110.926469,21.645917],[110.926497,21.644569]],
    '香洲长途站':[[113.56747,22.278876],[113.567472,22.279067],[113.567062,22.279073],[113.566717,22.279257],[113.566608,22.279485],[113.566852,22.280052],[113.567197,22.279768],[113.56756,22.280146],[113.568176,22.27959],[113.567999,22.279434],[113.568411,22.279011],[113.568431,22.278837]],
    '佛山汽车站':[[113.110713,23.040922],[113.110807,23.041307],[113.110512,23.041384],[113.110601,23.041872],[113.110976,23.041762],[113.111108,23.041996],[113.111348,23.041892],[113.110948,23.040844]],
    '河源汽车总站':[[114.692065,23.737062],[114.691961,23.737223],[114.691667,23.737112],[114.6914,23.737768],[114.691487,23.737839],[114.691456,23.737963],[114.691994,23.737991],[114.692235,23.738015],[114.692768,23.737916],[114.692766,23.737712],[114.692469,23.737523],[114.692382,23.737025]],
    '中山汽车总站':[[113.341645,22.520804],[113.341517,22.522978],[113.342458,22.523098],[113.343617,22.523101],[113.34372,22.52114],[113.343574,22.520934]],
    '中山小榄客运站':[[113.257991,22.669648],[113.255691,22.671666],[113.25817,22.673003],[113.259648,22.671422],[113.259656,22.671075],[113.259405,22.670558]],
    '江门汽车客运站':[[113.065897,22.629317],[113.064133,22.629622],[113.064527,22.631424],[113.065712,22.63196],[113.066663,22.632395],[113.068051,22.629622],[113.067961,22.629371],[113.06763,22.629216]],
    '惠州汽车总站':[[114.459516,22.813094],[114.45905,22.814655],[114.460824,22.8151],[114.460972,22.815006],[114.461594,22.813795],[114.461452,22.813572]],
    '东莞汽车总站':[[113.715748,23.028943],[113.714904,23.030266],[113.714684,23.030985],[113.714479,23.032067],[113.714734,23.032638],[113.716387,23.033091],[113.717436,23.033203],[113.718278,23.03303],[113.718774,23.032776],[113.719208,23.032293],[113.719138,23.031047],[113.719563,23.029712]],
    '东莞长安车站':[[113.822488,22.8],[113.82152,22.800452],[113.821947,22.801262],[113.822428,22.801907],[113.822642,22.802044],[113.823302,22.800847]],
    '潮州汽车客运站':[[116.63459,23.664453],[116.634539,23.66529],[116.635343,23.665742],[116.636027,23.66493]],
    '清远汽车客运站':[[113.004829,23.72219],[113.002531,23.722397],[113.002687,23.724632],[113.00399,23.72448],[113.003966,23.723913],[113.004909,23.723792]],
    '湛江机场':[[110.366151,21.21142],[110.366056,21.211578],[110.36569,21.212832],[110.366198,21.212984],[110.366393,21.21243],[110.366481,21.212437],[110.366575,21.212116],[110.366519,21.212031],[110.366679,21.211528]],
    '揭阳机场':[[116.509711,23.546987],[116.514106,23.551198],[116.519517,23.547137],[116.515465,23.542488]],
    '潮汕国际机场':[[116.509711,23.546987],[116.514106,23.551198],[116.519517,23.547137],[116.515465,23.542488]],
    '湛江徐闻海安港':[[110.234299,20.266591],[110.235046,20.266973],[110.236036,20.266228],[110.2357,20.265696]],
    '梅州火车站':[[116.130252,24.25785],[116.129806,24.258697],[116.13059,24.259388],[116.130207,24.2599],[116.130792,24.260322],[116.131467,24.260389],[116.132254,24.259338],[116.131185,24.258384],[116.130696,24.258122]],
      '汕头站':[[116.753151,23.370961],[116.752786,23.373197],[116.756062,23.373319],[116.755927,23.371149],[116.755064,23.371219],[116.755028,23.370803]],
      '汕尾站':[[115.42747,22.80951],[115.427573,22.810496],[115.427247,22.810734],[115.427288,22.811491],[115.429454,22.81135],[115.429416,22.81033],[115.429772,22.81018],[115.429738,22.809336]],
      '韶关站':[[113.516991,24.748605],[113.516233,24.748092],[113.515065,24.747854],[113.513309,24.748765],[113.512983,24.749259],[113.515187,24.752146],[113.515912,24.752112],[113.517292,24.751334],[113.517601,24.750217],[113.517414,24.749377]],
      '武广清远站':[[113.131366,23.693654],[113.132181,23.696016],[113.13397,23.69546],[113.134857,23.695326],[113.135152,23.695788],[113.135458,23.695733],[113.133991,23.692],[113.132868,23.692378],[113.132991,23.693168]],
      '源潭火车站':[[113.201338,23.661531],[113.201066,23.661754],[113.201939,23.662457],[113.201611,23.663216],[113.202088,23.66353],[113.202766,23.663023],[113.202987,23.662772],[113.202375,23.662264]],
    '梁金山服务区-向东北':[[112.68436,22.449872],[112.683965,22.449723],[112.683848,22.449805],[112.683841,22.449962],[112.683984,22.450102],[112.683366,22.4507],[112.685747,22.452235],[112.686012,22.451401],[112.685979,22.451248],[112.68564,22.450971]],
    '梁金山服务区-向西南':[[112.683934,22.451992],[112.682994,22.451322],[112.682616,22.452088],[112.682327,22.451924],[112.68219,22.452402],[112.683772,22.453535],[112.684261,22.453908],[112.684448,22.453596],[112.684383,22.453498],[112.685292,22.452781]],
    '雅瑶服务区-向北':[[112.992639,22.715323],[112.992703,22.715094],[112.992626,22.714611],[112.992254,22.714393],[112.992008,22.714359],[112.990758,22.714751],[112.99108,22.716745],[112.991216,22.717447],[112.992242,22.717199],[112.992459,22.716977],[112.992468,22.716681],[112.992073,22.716081],[112.992138,22.715767]],
    '雅瑶服务区-向南':[[112.989264,22.71515],[112.989179,22.715763],[112.988781,22.716515],[112.989018,22.71754],[112.990261,22.717514],[112.990176,22.716777],[112.989914,22.715029]],
    '源潭服务区-向北':[[113.229969,23.684823],[113.229503,23.684144],[113.229141,23.683522],[113.228728,23.683365],[113.227571,23.686393],[113.229474,23.68652],[113.229974,23.685794],[113.229627,23.685391]],
    '安塘服务区-向东':[[112.18595,22.93701],[112.18523,22.937261],[112.185408,22.937505],[112.18437,22.937835],[112.184243,22.938835],[112.186713,22.938013],[112.186596,22.937639],[112.186486,22.937458]],
    '安塘服务区-向西':[[112.184137,22.939577],[112.184377,22.940136],[112.186647,22.939337],[112.186621,22.938726]],
    '莲花山服务区-向东':[[115.113359,22.945061],[115.110226,22.944595],[115.110117,22.944652],[115.109792,22.946356],[115.112965,22.946835],[115.114498,22.947237],[115.114419,22.947025],[115.114061,22.946631],[115.113757,22.946109],[115.113666,22.9453]],
    '莲花山服务区-向西':[[115.114512,22.947965],[115.114411,22.948925],[115.118324,22.950893],[115.11917,22.950369]],
    '阳江服务区-向东':[[111.955125,21.903195],[111.953901,21.90291],[111.953717,21.903611],[111.953265,21.903842],[111.955668,21.904483],[111.95567,21.904093],[111.955747,21.903676],[111.95537,21.903509],[111.955235,21.90344]],
    '阳江服务区-向西':[[111.955261,21.904852],[111.953104,21.904307],[111.952861,21.905001],[111.953428,21.905185],[111.953554,21.905501],[111.954634,21.905825],[111.954713,21.90579],[111.954984,21.905044]],
    '黎溪服务区-向东北':[[113.227406,23.976299],[113.227452,23.976196],[113.227071,23.975794],[113.22619,23.975745],[113.225806,23.97551],[113.224828,23.975519],[113.226716,23.977683],[113.227577,23.978356],[113.228103,23.977529],[113.227929,23.977282],[113.227783,23.976873]],
    '黎溪服务区-向西南':[[113.224173,23.976147],[113.224097,23.975936],[113.223758,23.976168],[113.223464,23.977158],[113.222875,23.977652],[113.223173,23.978128],[113.223733,23.978325],[113.224928,23.978384],[113.225533,23.978474],[113.226666,23.978361],[113.225723,23.977523]],
    '勒流服务区-向东':[[113.164526,22.840239],[113.163787,22.840956],[113.166061,22.841649],[113.165935,22.840662]],
    '勒流服务区-向西':[[113.163852,22.841709],[113.163838,22.842631],[113.165314,22.843089],[113.166083,22.842399]],
    '顺德服务区-向北':[[113.270698,22.917741],[113.271213,22.916846],[113.270083,22.916466],[113.26949,22.917497],[113.269486,22.917795],[113.269067,22.918051],[113.268713,22.91855],[113.268878,22.9187],[113.268995,22.918909],[113.269354,22.919043],[113.269955,22.918594]],
    '顺德服务区-向南':[[113.269277,22.914464],[113.268936,22.915007],[113.268085,22.91474],[113.267819,22.915176],[113.267489,22.916109],[113.267543,22.91632],[113.268686,22.916853],[113.269181,22.915835],[113.269808,22.914844]],
    '热水服务区-向东北':[[114.749973,23.821582],[114.749198,23.82101],[114.748132,23.822199],[114.749708,23.823412],[114.750398,23.822666]],
    '热水服务区-向西南':[[114.748726,23.823566],[114.747833,23.824629],[114.749285,23.825647],[114.750099,23.824695]],
    '石坝服务区-向东':[[114.633554,23.522092],[114.631976,23.521553],[114.631692,23.521658],[114.630643,23.522918],[114.633638,23.524076],[114.63368,23.522533],[114.633735,23.52226]],
    '石坝服务区-向西':[[114.630809,23.523656],[114.629877,23.523371],[114.62952,23.524432],[114.629996,23.525356],[114.630352,23.525199],[114.631667,23.525893],[114.632819,23.524474],[114.631848,23.524109]],
    '泰美服务区-向北':[[114.4886,23.332239],[114.48868,23.331871],[114.488635,23.331116],[114.487959,23.330527],[114.487742,23.330422],[114.487706,23.331569],[114.487688,23.332244],[114.487517,23.332842],[114.488372,23.332572]],
    '泰美服务区-向南':[[114.487057,23.331704],[114.48717,23.330448],[114.486931,23.330424],[114.486439,23.330653],[114.4862,23.330934],[114.486061,23.331759],[114.486124,23.332559],[114.487022,23.332886]],
    '龙甫服务区-向南':[[112.711789,23.37588],[112.712025,23.376461],[112.711923,23.37682],[112.711968,23.376941],[112.715064,23.376175],[112.714299,23.375271]],
    '龙甫服务区-向北':[[112.7133,23.377214],[112.712388,23.377384],[112.712312,23.377476],[112.713223,23.378357],[112.713449,23.378754],[112.713698,23.378783],[112.715142,23.378387],[112.715325,23.377118],[112.715714,23.376653],[112.715566,23.376566]],
    '电白服务区-向西':[[111.056578,21.629053],[111.056657,21.629247],[111.056541,21.62968],[111.058296,21.630073],[111.058461,21.629504]],
    '电白服务区-向东':[[111.056853,21.627977],[111.056716,21.628678],[111.058547,21.629069],[111.058633,21.628528],[111.058449,21.62828]],
    '沙埔服务区-向西':[[113.675273,23.189119],[113.675266,23.189343],[113.676182,23.189792],[113.676763,23.189769],[113.677856,23.189865],[113.678068,23.18958],[113.675685,23.188415]],
    '沙埔服务区-向东':[[113.673946,23.18683],[113.673961,23.187022],[113.676473,23.188397],[113.676928,23.187751],[113.675738,23.187103],[113.675275,23.186283],[113.674556,23.185864]],
    '广州花城服务区-向南':[[113.313542,23.502033],[113.312783,23.501768],[113.31167,23.502035],[113.31198,23.504128],[113.312975,23.504048],[113.314009,23.504811],[113.314603,23.504741],[113.313976,23.502002]],

  };

  var path;
  // var theZoom;
  this.CreateHeartLayer(name);
  var idx = 0;

  for (var key in placeArr) {
    idx++;
    // theZoom = thePlaceZoomObj[key] || 18;
    // console.log(idx);
    // console.log(key.indexOf('机场'))
    if(key.indexOf(originName||name)!==-1) {
      path = placeArr[key];
      // debugger
      break
    }
  }
  if(originName=='深圳宝安国际机场F5') {
    path = placeArr['深圳宝安国际机场5F'];
  }

  // var path = placeArr[name+floor]||placeArr[name];
  // debugger
  var value = data;
  value=value||1000;
  // if (!polygon) {
  //     console.log("未找到图形不展示");
  //     return;
  // }
  if(!path){
    console.log("未找到对应的范围");
    return;
  }
  var thePorints =path;
  var lngs = thePorints.map(function (item) {
    return item[0];
  });
  // debugger
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
  var layer = this.theHeartLayer;
    if (name === '广州白云机场T2航站楼') {
        layer = this.theHeartLayerT2
    }
  var theCurrentValue=value;
  var theShowList=[];
  var list=theValidPoints.map(function (item) {
    var theTempValue=0;
    if(theCurrentValue<=10){
      theTempValue=theCurrentValue;
    }
    else{
      theTempValue=Math.floor(Math.RandomRange(1,10));
    }
    theCurrentValue-=theTempValue;
    if(theTempValue>0){
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
    //拥挤 适中 舒适
    var theColors={
        "拥挤":"#d70d18",
        "适中":"#d7d63f",
        "舒适":"#7ad780",
    };

    var theRMap={
        "拥挤":30,
        "适中":15,
        "舒适":10,
    };
    layer.setOptions({
        style: {
            radius: theRMap[status],
            color: {
                0.5: '#2c7bb6',
                // 0.65: '#abd9e9',
                // 0.7: '#ffffbf',
                // 0.9: '#fde468',
                1.0: theColors[status]
            }
        }
    });

  layer.render();
  this.showReli()
  // theMap.setFitView(layer);
  // theMap.setZoom(theZoom)
};

MapBase.prototype.drawRawReli = function (name, data, path, status) {
    console.log('开始画热力图:'+name);
    this.CreateHeartLayer(10);
    var value = data;
    value=value||1000;
    if(!path){
        console.log("未找到对应的范围");
        return;
    }
    var thePorints =path;
    var lngs = thePorints.map(function (item) {
        return item[0];
    });
    // debugger
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
    var layer = this.theHeartLayer;

    var theCurrentValue=value;
    var theShowList=[];
    var list=theValidPoints.map(function (item) {
        var theTempValue=0;
        if(theCurrentValue<=10){
            theTempValue=theCurrentValue;
        }
        else{
            theTempValue=Math.floor(Math.RandomRange(1,10));
        }
        theCurrentValue-=theTempValue;
        if(theTempValue>0){
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
    //拥挤 适中 舒适
    var theColors={
        "拥挤":"#d70d18",
        "适中":"#d77013",
        "舒适":"#d77e85",
    };

    var theRMap={
        "拥挤":30,
        "适中":15,
        "舒适":10,
    };
    layer.setOptions({
        style: {
            radius: theRMap[status],
            color: {
                0.5: '#2c7bb6',
                0.65: '#abd9e9',
                0.7: '#ffffbf',
                0.9: '#fde468',
                1.0: theColors[status]
            }
        }
    });

    layer.render();
    this.showReli();
    // theMap.setFitView(layer);
    // theMap.setZoom(theZoom)
};
window.MapBase = MapBase;
export default MapBase
