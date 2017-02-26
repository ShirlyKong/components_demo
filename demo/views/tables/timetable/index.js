import React, { Component } from 'react';
import './index.css';
// var rangeDate = ['2015-09-01', '2015-10-02'];
import {
    getDayList,
    getResult,
    initSelected
} from './functions';

var hourList = [
    { name: "00", title: "00:00-01:00" }, { name: "01", title: "01:00-02:00" }, { name: "02", title: "02:00-03:00" }, { name: "03", title: "03:00-04:00" },
    { name: "04", title: "04:00-05:00" }, { name: "05", title: "05:00-06:00" }, { name: "06", title: "06:00-07:00" }, { name: "07", title: "07:00-08:00" },
    { name: "08", title: "08:00-09:00" }, { name: "09", title: "09:00-10:00" }, { name: "10", title: "10:00-11:00" }, { name: "11", title: "11:00-12:00" },
    { name: "12", title: "12:00-13:00" }, { name: "13", title: "13:00-14:00" }, { name: "14", title: "14:00-15:00" }, { name: "15", title: "15:00-16:00" },
    { name: "16", title: "16:00-17:00" }, { name: "17", title: "17:00-18:00" }, { name: "18", title: "18:00-19:00" }, { name: "19", title: "19:00-20:00" },
    { name: "20", title: "20:00-21:00" }, { name: "21", title: "21:00-22:00" }, { name: "22", title: "22:00-23:00" }, { name: "23", title: "23:00-次日00:00" }
];


export default class TimeTable extends Component {
    constructor(props) {
        super(props);
        const rangeDate = this.props.rangeDate || ["2015-09-01", "2015-09-15"];
        const dayList = getDayList(rangeDate[0], rangeDate[1]);
        this.state = {
            dayList: dayList,
            selected: initSelected(dayList, hourList),
            mousedown: false,
            reselected: getResult(initSelected(dayList, hourList), dayList, hourList),
        };
    }
    init() {
        const rangeDate = this.props.rangeDate || [];
        var dayList = getDayList(rangeDate[0], rangeDate[1]);
        this.setState({
            selected: initSelected(dayList, hourList),
            mousedown: false,
            reselected: getResult(initSelected(dayList, hourList), dayList, hourList),
        })
    }
    MouseDown(j, k) { //j表示天行数，k表示列数
        this.tdClick(j, k);
    }
    MouseUp(j, k) { //j表示天行数，k表示列数
        this.setState({
                mousedown: false,
            })
            //选中单元格
    }
    MouseOver(j, k) { //j表示天行数，k表示列数
        if (this.state.mousedown) {
            this.tdClick(j, k);
        }
        //选中单元格
    }
    colClick(k) {
        // console.log("xxxxx");
        let curSelected = this.state.selected;

        function allDay(num) {
            let flag = true;
            curSelected.map(function(s, j) {
                if (!curSelected[j][k]) {
                    flag = false;
                };
            })
            return flag;
        }
        if (!allDay(k)) {
            curSelected.map(function(s, j) {
                curSelected[j][k] = true;
            })
        } else {
            curSelected.map(function(s, j) {
                curSelected[j][k] = false;
            })
        }
        this.setState({
                selected: curSelected,
                reselected: getResult(curSelected, this.state.dayList, hourList),
            })
            //选中一整列
    }
    tdClick(j, k) { //j表示天行数，k表示列数

        let curSelected = this.state.selected;
        curSelected[j][k] = curSelected[j][k] ? false : true;
        this.setState({
            selected: curSelected,
            mousedown: true,
            reselected: getResult(curSelected, this.state.dayList, hourList),
        })

        //选中单元格
    }
    rowClick(j) {
        let curSelected = this.state.selected;

        function allHour(num) {
            let flag = true;
            curSelected[0].map(function(v, k) {
                if (!curSelected[j][k]) {
                    flag = false;
                };
            })
            return flag;
        }
        if (!allHour(j)) {
            curSelected[0].map(function(v, k) {
                curSelected[j][k] = true;
            })
        } else {
            curSelected[0].map(function(v, k) {
                curSelected[j][k] = false;
            })
        }
        this.setState({
            selected: curSelected,
            reselected: getResult(curSelected, dayList, hourList),
        })
    }
    componentDidMount() {
        //解决鼠标划过会选中文本的问题
        let ob = this.refs["time-table"];
        if (ob.all) {
            ob.onselectstart = function() {
                return false;
            }; //for ie
        } else {
            ob.onmousedown = function() {
                return false;
            };
            ob.onmouseup = function() {
                return true;
            };
        }
        ob.onselectstart = new Function('event.returnValue=false;');
    }
    render() {
        const { selected, reselected } = this.state;
        let dayList = this.state.dayList;
        var that = this;
        this.props.handleChange(this.state.reselected);
        return (
            <div className="time-table">
            <button className="init" onClick={that.init.bind(that)}>重置</button>
            <table ref="time-table" id="time-table">
                <thead>
                    <tr>
                        <th>日期/时间</th>
                        {
                            hourList.map(function(s, k) {
                                return <th key={s.name}  onClick={that.colClick.bind(that,k)}>{s.name}</th>;
                            })
                        }
                        <th>已选时间</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            dayList.map(function(s,j) {
                              return <tr key={s.name}>
                                      <th key={s.name} onClick={that.rowClick.bind(that,j)}>{s.name}</th>
                                      { hourList.map(function(v, k) {
                                        let str=s.name+","+v.name;
                                        let curSelected=selected[j][k];
                                        let cn="";
                                        if(curSelected){
                                            cn="slt";
                                        }
                                        return <td key={str} className={cn}  onMouseDown={that.MouseDown.bind(that,j,k)}
                                        onMouseOver={that.MouseOver.bind(that,j,k)}
                                        onMouseUp={that.MouseUp.bind(that,j,k)}
                                         ></td>
                                      })
                                     }
                                     {/*<td>{reselected[s.name]}</td>*/}
                              </tr> ;
                        })}
                </tbody>
            </table>
      </div>
        )
    };
}
