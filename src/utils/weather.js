export  default {
    IconMap:{
        "暴雨":1,
        "打雷":2,
        "大暴雨":3,
        "大雨":4,
        "多云":5,
        "雷阵雨":6,
        "阵雨":16,
        "霾":7,
        "晴":8,
        "晴天":9,
        "雾":10,
        "小雨":11,
        "阴":12,
        "阴天":13,
        "雨夹雪":14,
        "中雨":15,
    },
    getIcon(name){
        var theIconName= this.IconMap[name];
        return "weather-"+theIconName;
    }
}