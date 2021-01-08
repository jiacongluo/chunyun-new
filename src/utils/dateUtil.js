import moment from 'moment'

export default {
    /**
     * 生成年数据
     * @param from 开始时间
     * @param to 结束时间
     * @param interval 间隔
     * @param value 默认值
     */
    genYearData(from, to, interval, value) {
        var theDataList = [];
        var theBeginTime = from;
        var theValue = {};

        while (theBeginTime.getTime() <= to.getTime()) {
            for (var key in value) {
                theValue[key] = value[key];
            }
            theDataList.push({date: theBeginTime, value: theValue});
            theBeginTime = this.nextDays(theBeginTime, interval || 1);
        }
        return theDataList;

    },
    /**
     * 生成天数据
     * @param from 开始时间
     * @param to 结束时间
     * @param interval 间隔
     * @param value 默认值
     */
    genDayData(from, to, interval, value) {
        var theDataList = [];
        var theBeginTime = from;
        while (theBeginTime.getTime() <= to.getTime()) {
            var theValue = {};
            for (var key in value) {
                theValue[key] = value[key];
            }
            theDataList.push({date: theBeginTime, value: theValue});
            theBeginTime = this.nextDays(theBeginTime, interval || 1);
        }
        return theDataList;
    },
    /**
     * 生成时间类型的默认值列表
     * @param from
     * @param to
     * @param interval
     * @param value
     * @returns {Array}
     */
    genDayDataOfStrType(from, to, interval, value) {
        var theDataList = [];
        var theBeginTime = from;
        while (theBeginTime.getTime() <= to.getTime()) {
            var theValue = {};
            for (var key in value) {
                theValue[key] = value[key];
            }
            theDataList.push({date: this.formateQueryDate(theBeginTime), value: theValue});
            theBeginTime = this.nextDays(theBeginTime, interval || 1);
        }
        return theDataList;
    },
    /**
     * 生成默认值并合并
     * @param from
     * @param to
     * @param interval
     * @param value
     * @param listValues
     * @param keyFun
     * @returns {*|Array}
     */
    genDayDataAndMerge(from, to, interval, value, listValues, keyFun) {
        var theDefaultList = this.genDayDataOfStrType(from, to, interval, value);
        var theValueMap = {};
        if (listValues && keyFun) {
            listValues.map(m => theValueMap[keyFun(m)] = m);
        }
        theDefaultList.map(m => {
            if (theValueMap[m.date]) {
                m.value = theValueMap[m.date];
            }
        })
        return theDefaultList;
    },
    /**
     * 解析日期数据
     * @param dateStr
     * @returns {*}
     */
    parserDate(dateStr) {
        if (!dateStr) {
            return null;
        }
        if (dateStr.indexOf('-') >= 0) {
            return new Date(dateStr);
        }
        if (dateStr.length == 8) {
            var theDateStr = dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substr(6, 2);
            return new Date(theDateStr + " 00:00:00");
        }
        return null;

    },
    /**
     * 生成小时数据
     * @param from 开始时间
     * @param to 结束时间
     * @param interval 间隔
     * @param value 默认值
     */
    genHourData(from, to, interval, value) {
        var theDataList = [];
        var theBeginTime = from;
        while (theBeginTime.getTime() <= to.getTime()) {
            var theValue = {};
            for (var key in value) {
                theValue[key] = value[key];
            }
            theDataList.push({date: theBeginTime, value: theValue});
            theBeginTime = this.nextHours(theBeginTime, interval || 1);
        }
        return theDataList;
    }
    ,
    /**
     * 生成分钟数据
     * @param from 开始时间
     * @param to 结束时间
     * @param interval 间隔
     * @param value 默认值
     */
    genMinuteData(from, to, interval, value) {
        var theDataList = [];
        var theBeginTime = from;
        while (theBeginTime.getTime() <= to.getTime()) {
            var theValue = {};
            for (var key in value) {
                theValue[key] = value[key];
            }
            theDataList.push({date: theBeginTime, value: theValue});
            theBeginTime = this.nextMinutes(theBeginTime, interval || 1);
        }
        return theDataList;
    },
    /**
     * 分钟采用时间戳进行比对
     * @param from
     * @param to
     * @param interval
     * @param value
     * @param listValues
     * @param keyFun
     * @returns {*|Array}
     */
    genMinuteDataAndMerge(from, to, interval, value, listValues, keyFun) {
        var theDefaultList = this.genMinuteData(from, to, interval, value);
        var theValueMap = {};
        if (listValues && keyFun) {
            listValues.map(m => theValueMap[keyFun(m)] = m);
        }
        theDefaultList.map(m => {
            if (theValueMap[m.date.getTime()]) {
                m.value = theValueMap[m.date];
            }
        })
        return theDefaultList;
    },
    /*
    后几年
    * */
    nextYears(date, num) {
        var theCurrentDate = new Date(date.getTime());
        theCurrentDate.setFullYear(theCurrentDate.getFullYear() + (num || 0));
        return theCurrentDate;
    }
    ,
    /*前几天*/
    beforeDays(date, num) {
        var theCurrentDate = new Date(date.getTime());
        theCurrentDate.setDate(theCurrentDate.getDate() - (num || 0));
        return theCurrentDate;
    }
    ,
    /*
    后几天
    * */
    nextDays(date, num) {
        var theCurrentDate = new Date(date.getTime());
        theCurrentDate.setDate(theCurrentDate.getDate() + (num || 0));
        return theCurrentDate;
    }
    ,
    /*前几小时*/
    beforeHours(date, num) {
        var theCurrentDate = new Date(date.getTime());
        theCurrentDate.setHours(theCurrentDate.getHours() - (num || 0));
        return theCurrentDate;
    }
    ,
    /*
    后几小时
    * */
    nextHours(date, num) {
        var theCurrentDate = new Date(date.getTime());
        theCurrentDate.setHours(theCurrentDate.getHours() + (num || 0));
        return theCurrentDate;
    }
    ,
    /*前几分钟*/
    beforeMinutes(date, num) {
        var theCurrentDate = new Date(date.getTime());
        theCurrentDate.setMinutes(theCurrentDate.getMinutes() - (num || 0));
        return theCurrentDate;
    }
    ,
    /***
     * 后几分钟
     * @param num
     * @returns {Date}
     */
    nextMinutes(date, num) {
        var theCurrentDate = new Date(date.getTime());
        theCurrentDate.setMinutes(theCurrentDate.getMinutes() + (num || 0));
        return theCurrentDate;
    }
    ,
    formateQueryDate(date) {
        var theResultStr = moment(date).format('YYYY-MM-DD');
        return theResultStr;
    },
    formateCnDate(date) {
        var theResultStr = moment(date).format('YYYY年MM月DD日');
        return theResultStr;
    }
}
