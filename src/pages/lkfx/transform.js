import defaultData from '../../utils/defaultData'
import dateUtil from '../../utils/dateUtil'
export default {
    areaCityMap: [
        {
            "name": "广州",
            "code": "GZ",
        },
        {
            "name": "深圳",
            "code": "SZ",

        },
        {
            "name": "珠海",
            "code": "ZH",

        },
        {
            "name": "汕头",
            "code": "ST",

        },
        {
            "name": "韶关",
            "code": "SG",

        },
        {
            "name": "佛山",
            "code": "FS",

        },
        {
            "name": "江门",
            "code": "JM",

        },
        {
            "name": "湛江",
            "code": "ZJ",

        },
        {
            "name": "茂名",
            "code": "MM",

        },
        {
            "name": "肇庆",
            "code": "ZQ",

        },
        {
            "name": "惠州",
            "code": "HZ",

        },
        {
            "name": "梅州",
            "code": "MZ",

        },
        {
            "name": "汕尾",
            "code": "SW",

        },
        {
            "name": "河源",
            "code": "HY",

        },
        {
            "name": "阳江",
            "code": "YJ",

        },
        {
            "name": "清远",
            "code": "QY",

        },
        {
            "name": "东莞",
            "code": "DG",

        },
        {
            "name": "中山",
            "code": "ZS",

        },
        {
            "name": "潮州",
            "code": "CZ",

        },
        {
            "name": "揭阳",
            "code": "JY",

        },
        {
            "name": "云浮",
            "code": "YF",

        }
    ],
    initProvinceValue() {
        var theDefaultValues = defaultData.data;
        if (this.defaultValueList) {
            // return this.defaultModels;
            return;
        }
        this.defaultValueList = theDefaultValues.split(';')
            .filter(m => m)
            .map(m => {
            var theAttrs = m.split(',');
            var theModel = {};
            theModel.date = new Date(theAttrs[0]);
            theModel.name = theAttrs[1];
            theModel.number = Math.ceil(parseFloat(theAttrs[2]));
            return theModel;
        });
    },
    getProvinceValue(name, date) {
        this.initProvinceValue();
        var theRate=0.8;
        var theModels = this.defaultValueList;
        var theNameArrays = theModels.filter(m => m.name == name || m.name + "市" == name);
        date=dateUtil.formateQueryDate(new Date());
        var theCurrentDate = new Date(date+' 00:00:00');
        var theMinDate;
        var theMaxDate;
        var theMinValue;
        var theMaxValue;
        for (var i = 0; i < theNameArrays.length; i++) {
            var theCurrentItem = theNameArrays[i];
            if (theCurrentDate.getTime() == theCurrentItem.date.getTime()) {
                return theCurrentItem.number*theRate;
            }
            if (!theMinDate) {
                theMinDate = theCurrentItem.date.getTime();
                theMinValue = theCurrentItem.number;
            }
            else {
                if(theMinDate>theCurrentItem.date.getTime()){
                    theMinValue = theCurrentItem.number;
                }
                theMinDate = Math.min(theCurrentItem.date.getTime(), theMinDate);

            }
            if (!theMaxDate) {
                theMaxDate = theCurrentItem.date.getTime();
                theMaxValue = theCurrentItem.number;
            }
            else {
                if(theMaxDate<theCurrentItem.date.getTime()){
                    theMaxValue = theCurrentItem.number;
                }
                theMaxDate = Math.max(theCurrentItem.date.getTime(), theMaxDate);
            }
            // if (!theMinValue) {
            //     theMinValue = theCurrentItem.number;
            // }
            // else {
            //     theMinValue = Math.min(theCurrentItem.number, theMinValue);
            // }

            // if (!theMaxValue) {
            //     theMaxValue = theCurrentItem.number;
            // }
            // else {
            //     theMaxValue = Math.max(theCurrentItem.number, theMaxValue);
            // }

        }
        if (theCurrentDate.getTime() <= theMinDate) {
            return theMinValue*theRate;
        }
        else {
            return theMaxValue*theRate;
        }
    },
    getCityByCode(code) {
        if (!this.codeCityMap) {
            this.codeCityMap = {};
            this.areaCityMap.map(m => this.codeCityMap[m.code] = m.name);
        }
        return this.codeCityMap[code];
    },
    getCityCodeByName(name) {
        if (!this.cityCodeMap) {
            this.cityCodeMap = {};
            this.areaCityMap.map(m => this.cityCodeMap[m.name] = m.code);
        }
        return this.cityCodeMap[name] || this.cityCodeMap[name.substr(0, name.length - 1)] || name;
    },
    getCityName(name) {
        if (name && name.indexOf('市') >= 0) {
            return name.substr(0, name.length - 1);
        }
        return name;
    },
    channelMap: {
        "2": 0,
        "1": 1,
        "4": 2,
        "3": 3,
    },
    /**
     * 数据结构转换
     * @param datas
     * @param direction //1 迁入 2 迁出
     * @param type //1 境外，2 省内 3 省外
     * @param area 当前区域
     */
    transformLine(datas, direction, type, area) {
        var theTempItems = [];
        if (type == 1) {
            return this.transformWorldLine(datas, direction, area);
        }
        if (type == 2) {
            return this.transformProvinceLine(datas, direction, area);
        }
        if (type == 3) {
            return this.transformCountryLine(datas, direction, area);
        }
        return theTempItems;
    },
    /**
     * 转换全球数据
     * @param datas
     * @param direction
     * @param area
     * @returns {Array}
     */
    transformWorldLine(datas, direction, area) {
        // this.items = theData;

        var theData = datas;
        var theTempItems = [];
        var theDataMap = {};
        /*
        *  {
"id": null,
"statDate": "20190301",
"inType": "1",
"inArea": "泰国",
"inChannel": null,
"inNum": "6372.0",
"inPercentage": null
}
        * */
        theData.map(m => {
            if (!theDataMap[m.inArea || m.outArea]) {
                var theDataItem = {
                    area: m.inArea || m.outArea,
                    from: direction == 2 ? area : (m.inArea || m.outArea),
                    to: direction == 1 ? area : (m.inArea || m.outArea),
                    num: m.inNum || m.outNum,
                    channel0: 0,
                    channel1: 0,
                    channel2: 0,
                    channel3: 0,
                };
                theDataMap[m.inArea || m.outArea] = theDataItem;
                theTempItems.push(theDataItem);
            }
            var theCurrentItem = theDataMap[m.inArea || m.outArea];
            theCurrentItem['channel' + this.channelMap[m.inChannel]] = (m.inPercentage || m.outPercentage);
            //if (type == 1)
            {
                theCurrentItem['channel0'] = 1;
            }
        });
        return theTempItems;
    },
    /**
     * 转换国内数据
     * @param datas
     * @param direction
     * @param type
     * @param area
     * @returns {Array}
     */
    transformCountryLine(datas, direction, type, area) {
        // this.items = theData;

        var theData = datas;
        var theTempItems = [];
        var theDataMap = {};
        /*
        *  {
fly: 0.4305
in_num: "95732"
in_province: "河南"
railway: 0.179
road: 0
stat_date: "20190301"
water: 0.3904
}
        * */
        /*
        *  "fly": 0.4703,
        "province": "浙江",
        "road": 0.256,
        "stat_date": "20190301",
        "num": 40889,
        "railway": 0.2736,
        "water": 0
        * */
        var theCountryChannelMap = {
            "fly": 0,
            "railway": 1,
            "road": 2,
            "water": 3,
        };
        theData.map(m => {
            var theDataItem = {
                area: m.province,
                from: direction == 2 ? area : m.province,
                to: direction == 1 ? area : m.province,
                num: m.num || m.num,
                channel0: m['fly'],
                channel1: m['railway'],
                channel2: m['road'],
                channel3: m['water'],
            };
            theTempItems.push(theDataItem);
        });
        return theTempItems;
    },
    /**
     * 转换省内数据
     * @param datas
     * @returns {Array}
     */
    transformProvinceLine(datas) {
        // this.items = theData;
        var theAreaMap = this.areaMap;
        var theData = datas;
        var theTempItems = [];
        var theDataMap = {};
        /*dpercentage: null
                 fromCity: "GZ"
                 id: null
                 migChannel: "4"
                 migNum: 150067
                 opercentage: 0.3197
                 statDate: "20190301"
                 toCity: "FS"
                 * */
        theData.map(m => {
            var theGroupKey = m.statDate + m.fromCity + m.toCity;
            if (!theDataMap[theGroupKey]) {
                var theDataItem = {
                    area: this.getCityByCode(m.fromCity) + '--' + this.getCityByCode(m.toCity),
                    from: this.getCityByCode(m.fromCity),
                    to: this.getCityByCode(m.toCity),
                    num: m.migNum,
                    channel0: 0,
                    channel1: 0,
                    channel2: 0,
                    channel3: 0,
                };
                theDataMap[theGroupKey] = theDataItem;
                theTempItems.push(theDataItem);
            }
            var theCurrentItem = theDataMap[theGroupKey];
            theCurrentItem['channel' + this.channelMap[m.migChannel]] = m.opercentage;

        });
        return theTempItems;
    }
}