
import {Common} from '../common/common'


import { POSITIONCLASSIFY } from '../common/common.enum';

export let model = {

        prId : null,
        number : null,  //搜索条件 调度号
        type : 1,
        date : {},
        TYPES : {
            DAY   : 1,
            MONTH : 2,
            HOUR  : 0,
            YEAR  : 3,
        },
        cabinets : [],
        getCabinets : {},

        getData : {},       //获取数据
        current : [],
        lastYear : [],
        lastMonth: [],
        when  : [],

        An : [],    //同比
        Mon: [],    //环比

    };

    //获取调度号/柜子

    model.getCabinets = function () {

        let param = {
            path : "/dwt/iems/basedata/prvar/get_ddns",
            data : {
                "prId" : this.prId,
                "pq"  : "%Ep"
            }
        };

        return Common.post(param).map(function (res) {

            if(res.code == "0"){
                let list = res.list;

                //构建调度号树所需要的数据结构

                model.cabinets = [];

                for(let i=1; i<6; i++){

                    let type = list.filter( item => item.ct == POSITIONCLASSIFY[i].value );
                    if(type.length > 0){
                        model.cabinets.push({
                            "name" : POSITIONCLASSIFY[i].content,
                            "list" : type
                        })
                    }

                }

                return true;

            }else {

                return false;

            }
        })
    };

    //获取数据

    model.getData = function () {

        let param = {
            "path" : "/dwt/edp/electric/contrast_analysis_v2",
            "data" : {
                initBeginTime: this.date[ this.type ].startDate,
                initEndTime: this.date[ this.type ].endDate,
                prId : this.prId,
                dataType : this.type,
                ddN : this.number
            }
        };

        return Common.post(param).map(function (res) {

            if(res.code == "0"){
                model.current = [];
                model.lastMonth = [];
                model.lastYear = [];
                model.yesterday = [];
                model.xAxises = [];
                model.when = [];
				model.An = [];
				model.Mon = [];
				res.list.map(function (item) {

					item.current = ( item.current >= 0 ? item.current : NaN );
					item.lastMonth = ( item.lastMonth >= 0 ? item.lastMonth : NaN );
					item.lastYear = ( item.lastYear >= 0 ? item.lastYear : NaN );
					item.yesterday = ( item.yesterday >= 0 ? item.yesterday : NaN );

                    model.current.push(item.current);
                    model.lastMonth.push(item.lastMonth);
                    model.lastYear.push(item.lastYear);
                    model.yesterday.push(item.yesterday);
                    if(model.type == 0){
                        model.when.push(item.date + '时');
                    }else {
                        model.when.push(item.date);
                    }

                    item.current = parseFloat(item.current);
                    item.lastYear = parseFloat(item.lastYear);
                    item.lastMonth = parseFloat(item.lastMonth);

                    let an = "";
                    let mon = "";

                    if(item.lastMonth && item.current){
                        mon = (((item.current/item.lastMonth)-1)*100).toFixed(2);
                    }else{
                        mon = "-"
                    }

                    if(item.lastYear && item.current){
                        an = (((item.current/item.lastYear)-1)*100).toFixed(2);
                    }else{
                        an = "-"
                    }

                    model.An.push(an); //同比   去年
                    model.Mon.push(mon); //环比 上个月

                });

                return true;
            }

            return false;
        })

    };
