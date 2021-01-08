/**
 * 通用配置数据
 */
export default {
    formateRgba(colorName, num) {
        // var theRgbaString = 'rgba';
        if (colorName.indexOf('#') >= 0) {
            var r = eval('0x' + colorName.substr(1, 2));
            var g = eval('0x' + colorName.substr(3, 2));//colorName.substr(3, 2);
            var b = eval('0x' + colorName.substr(5, 2)); //colorName.substr(5, 2);
            var theResult = `rgba(${r},${g},${b},${num})`;
            return theResult;
        }
    },
    getTimeChartOption(){
        var theXData = [];
        //var theTodayDate=new Date();
        for (var i = 0; i <= 24 * 12; i++) {
            theXData.push(i);
        }
        //debugger;
        /*一类图表基本设置*/
        var theOptions = {
            /*title: {
                text: '折线图堆叠'
            },*/

            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: function (point, params, dom, rect, size) {
                    // 固定在顶部
                    return [point[0], '10%'];
                },
                formatter: function (params) {
                    //debugger;
                    var theTimeValue = parseInt(params[params.length - 1].name);
                    var theHours = Math.floor(theTimeValue / 12) + "点" + (theTimeValue % 12) * 5 + '分';
                    //debugger;
                    var theColorText = "<span style=\"display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" + params[params.length - 1].color + ";\"></span>";

                    //var theDate = new Date();
                    //theDate.setTime(arg.value);
                    //return theHours;//theDate.getMonth() + 1 + "月" + theDate.getDate() + "日";
                    return theHours + '<br/>' + theColorText + params[params.length - 1].data + '万';
                }
            },
            grid: {
                left: 30,
                right: 5,
                top: 30,
                bottom: 10,
                width: 480,
                height: 175,
                containLabel: true
            },
            /*toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },*/
            xAxis: {
                type: 'category',
                // name: '(时点)',
                nameLocation: 'end',
                //interval:12,
                //splitNumber: 24,
                axisLabel: {
                    interval: 11,
                    formatter: function (value, idx) {
                        //debugger;
                        //return value;
                        if (value % (12 * 4) == 0) {
                            //console.log('x2:'+value/12);
                            //console.log('x:'+value/(60/5));
                            return value / 12;
                        }
                        else {
                            return "";
                        }
                    }
                },
                /*axisPointer: {
                    label: {
                        show: true,
                        color: '#05cffa',
                        formatter: function (arg) {
                            var theTimeValue = parseInt(arg.value);
                            var theHours = Math.floor(theTimeValue / 12) + "点" + (theTimeValue % 12) * 5 + '分';
                            //debugger;
                            //var theDate = new Date();
                            //theDate.setTime(arg.value);
                            return theHours;//theDate.getMonth() + 1 + "月" + theDate.getDate() + "日";
                        }
                    },
                    lineStyle: {
                        color: '#05cffa',
                        shadowBlur: {
                            shadowColor: '#05cffa',
                            shadowBlur: 10
                        }
                    }
                },*/
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: 'white'// '#557398'
                    }
                },
                data: theXData
            },
            yAxis: {
                type: 'value',
                // name: '(人数/万)',
                nameLocation: 'end',
                splitLine: {show: false},
                axisLine: {
                    lineStyle: {
                        color: 'white'// '#557398'
                    }
                }
            }

        };
        return theOptions;
    },
    getDefaultLineChartOption() {
        let theOption = {
            color: ['#00FFFF'],
            tooltip: {
                trigger: 'axis',
                //                    formatter:function (params, ticket, callback) { // 格式化tooltip
                //                        // debugger;
                //                        var theStr=params[0].name+"<br/>";
                //                        var theHash={};
                //                        //                         debugger;
                //                        for(var i=0;i<params.length;i++){
                //                            var theItem=params[i];
                //                            if(!theHash[theItem.seriesName]){
                //                                theHash[theItem.seriesName]=true;
                //                                theStr+= theItem.marker+theItem.seriesName+":"+theItem.value[1]+"<br/>"
                //                            }
                //                        }
                //                        return theStr;//params[0].name+"<br/>"+params[0].marker+params[0].seriesName+":"+params[0].value;
                //                    }
            },
            grid: {
                left: '4%',
                right: '12%',
                bottom: '8%',
                top: '18%',
                containLabel: true
            },

            xAxis: [
                {
                    type: 'category',
                    //                        axisPointer: {
                    //                            type: 'shadow'
                    //                        },
                    // 轴 样式
                    // name: '(时点)',
                    boundaryGap: false,
                    nameTextStyle: {
                        color: 'rgba(0,102,255,1)',//me.axisFontColor,
                        // fontSize: this.utils.calSize(14, theFontSize),
                        fontSize: 14,
                        padding: [0, 25, 0, 0]
                    },
                    axisLine: {
                        // onZero: false,
                        lineStyle: {
                            color: 'rgba(254,254,254,1)',// me.axisColor
                        }
                    },
                    axisLabel: {
                        // fontSize: this.utils.calSize(14, theFontSize),
                        fontSize: 14,
                        fontFamily: 'MicrosoftYaHei',
                        color: 'rgba(254,254,254,1)',// me.axisFontColor,
                        interval: 0

                    },
                    axisTick: { // 刻度对齐突出的线
                        alignWithLabel: true,
                        interval: 0,
                        show: false
                    },
                    data: []
                    // data: xData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    // name: '(时长/分钟)',
                    // nameGap: this.utils.calSize(10, theFontSize),
                    nameTextStyle: {
                        color: 'rgba(0,102,255,1)',//me.axisFontColor,
                        // fontSize: this.utils.calSize(14, theFontSize),
                        fontSize: 14,
                        padding: [0, 25, 0, 0]
                    },
                    // // 轴 样式
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: 'rgba(254,254,254,1)',// me.axisColor
                        }
                    },
                    axisTick: { // 刻度对齐突出的线
                        alignWithLabel: true,
                        interval: 0,
                        show: false
                    },
                    axisLabel: {
                        // fontSize: this.utils.calSize(14, theFontSize),
                        fontSize: 14,
                        fontFamily: 'MicrosoftYaHei',
                        color: 'rgba(254,254,254,1)',// me.axisFontColor,
                    },
                    splitLine: {
                        show: false,
                        // lineStyle: {
                        //     // 使用深浅的间隔色
                        //     color: [me.splitLineColor],
                        //     type: 'solid'
                        // }
                    }
                }
            ],
            series: [

            ]
        };
        return theOption;
    }
}