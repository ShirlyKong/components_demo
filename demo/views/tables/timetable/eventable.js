import React, { Component } from 'react';
import './index.css';

import {
    getDayList,
    getDayListE,
    getResult,
    initSelected,
    addDays
} from './functions';

import Dropdown from './dropdown/index';


let date = new Date();
export default class EventTable extends Component {
    static propTypes = {
        headers: React.PropTypes.object.isRequired,
        startdate: React.PropTypes.string,
        defaultlength: React.PropTypes.number || React.PropTypes.string,
        readonly: React.PropTypes.bool,
        initdata: React.PropTypes.object,
        onChange: React.PropTypes.func,

    };
    static defaultProps = {
        startdate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(), //默认为当前日期
        defaultlength: 10,
        readonly: false,
        initdata: {},
    };
    constructor(props) {
        super(props);
        const rangeDate = this.props.rangeDate || ["2015-09-01", "2015-09-15"];
        const dayList = getDayList(rangeDate[0], rangeDate[1]);
        const eventList = this.props.events || [];
        const {
            startdate,
            defaultlength,
            readonly,
            initdata,
        } = this.props;
        this.state = {
            startdate: startdate,
            defaultlength: defaultlength,
            readonly: readonly,
            initdata: initdata, //被选中的框显示
            selected: initSelected(eventList, dayList),
            mousedown: false,
            reselected: getResult(initSelected(eventList, dayList), eventList, dayList),
            dayList: dayList,
            eventList: eventList,
        };
    }

    init() {
        const rangeDate = this.props.rangeDate || ["2015-09-01", "2015-09-15"];
        const dayList = getDayList(rangeDate[0], rangeDate[1]);
        const eventList = this.props.events || [];
        this.setState({
            selected: initSelected(eventList, dayList),
            mousedown: false,
            // reselected: getResult(initSelected(eventList, dayList), eventList, dayList),
            dayList: dayList,
            eventList: eventList,
        })
    }
    MouseDown = (j, k) => { //j表示天行数，k表示列数
        this.tdClick(j, k);
        this.setState({
            mousedown: true,
        })
    }
    MouseUp = (j, k) => { //j表示天行数，k表示列数
        this.setState({
                mousedown: false,
            })
            //选中单元格
    }
    MouseOver = (j, k) => { //j表示天行数，k表示列数
        if (this.state.mousedown) {
            this.tdClick(j, k);
        }
        //选中单元格
    }
    colClick = (k) => {
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
                // reselected: getResult(curSelected, this.state.eventList, this.state.dayList),
            })
            //选中一整列
    }
    tdClick = (j, k) => { //j表示天行数，k表示列数

        let curSelected = this.state.selected;
        curSelected[j][k] = curSelected[j][k] ? false : true;
        this.setState({
            selected: curSelected,
            // reselected: getResult(curSelected, this.state.eventList, this.state.dayList),
        })

        //选中单元格
    }
    rowClick = (j) => {
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
            // reselected: getResult(curSelected, this.state.eventList, this.state.dayList),
        })
        return false
    }
    eventClick = (id) => {
        this.props.eventClick(id);
        //跳转到详细事件
    }
    next = (num) => {
        let curStart = addDays(this.state.startdate, num);
        // console.log("xxx", curStart);
        this.setState({
            startdate: curStart,
        })
    }
    dateChange = () => {
        let ob = this.refs.dateipt;
        console.log("ssx", ob.value);
        this.setState({
            startdate: ob.value,
        })
    }
    componentDidMount = () => {
        let ob = this.refs["time-table"];
        /*        if (ob.all) {
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
                ob.onselectstart = new Function('event.returnValue=false;');*/
        this.refs.dateipt.valueAsDate = new Date();
    }
    render() {
        const {
            selected,
            reselected,
            defaultlength,
            eventList
        } = this.state;
        const headers = this.props.headers.props.children;
        var that = this;
        const dayList = getDayListE(this.state.startdate, this.state.defaultlength);
        // this.props.handleChange(this.state.reselected);
        return (
            <div className="time-table">
            <div className="toolbox">
                <button className="init" onClick={that.init.bind(that)}>重置</button>
                <input className="dateipt" ref="dateipt" type="date" name="start-date" onChange={this.dateChange.bind(this)} defaultValue={this.state.startdate}/>
                <a onClick={this.next.bind(this,(0-defaultlength))}><i className="fa fa-angle-left"></i></a>
                <a onClick={this.next.bind(this,defaultlength)}><i className="fa fa-angle-right"></i></a>
            </div>
            <table id="time-table" ref="time-table"  className="envent-table">
                <thead>
                    <tr>
                        {
                           headers.map(function(n, p) {
                            return <th key={p}>{n.props.txt}</th>;
                        })
                        }
                        {
                            dayList.map(function(s, k) {
                                return <th className="content-td" key={s.name}  onClick={that.colClick.bind(that,k)}>{s.name}</th>;
                            })
                        }
                        <th className="add-time"><a onClick={that.next.bind(that,1)}><i className="fa fa-plus-square" ></i></a></th>

                    </tr>
                </thead>
                <tbody>
                        {
                            eventList.map(function(s,j) {
                                let key=s.name;
                              return <tr key={s.name}>
                                     {/* <th key={s.name} onClick={that.eventClick.bind(that,s.id)} onContextMenu={that.rowClick.bind(that,j)}>{s.name}</th>*/}
                        {
                           headers.map(function(n, p) {
                            return <th key={p}>{n}</th>;
                        })
                        }
                                      { dayList.map(function(v, k) {
                                        let str=s.name+","+v.name;
                                        let curSelected=selected[j][k];
                                        let cn="";
                                        if(curSelected){
                                            cn="slt";
                                        }
                                        return <td key={str} className={cn} onMouseDown={that.MouseDown.bind(that,j,k)} 
                                        onMouseOver={that.MouseOver.bind(that,j,k)}
                                        onMouseUp={that.MouseUp.bind(that,j,k)}
                                         ></td>
                                      })
                                     }

                                     <td>
                                     <Dropdown triggerBar={<button>操作<i className="fa fa-angle-down"></i></button>}
                                           trigger="hover">
                                            <ul className="operations">
                                                <li>编辑</li>
                                                <li>保存</li>
                                                <li>提交</li>
                                                <li>删除</li>
                                            </ul>
                                     </Dropdown>
                                     </td>
                              </tr> ;
                        })}
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td>
                        <table>
                            <thead>
                                <tr>
                                {
                                   headers.map(function(n, p) {
                                    return <th key={p}>{n.props.txt}</th>;
                                    })
                                }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                eventList.map(function(s,j) {
                                        let key=s.name;
                                      return <tr key={s.name}>
                                             {/* <th key={s.name} onClick={that.eventClick.bind(that,s.id)} onContextMenu={that.rowClick.bind(that,j)}>{s.name}</th>*/}
                                    {
                                       headers.map(function(n, p) {
                                        return <th key={p}>{n}</th>;})
                                    }
                                   
                                    </tr>
                                })
                        }

                                    

                            </tbody>
                        </table>
                        </td>
                        <td>
                            <div>
                             <table>
                              <thead>
                               <tr>
                               {

                                dayList.map(function(s, k) {
                                    return <th className="content-td" key={s.name}  onClick={that.colClick.bind(that,k)}>{s.name}</th>;
                                 })
                               }
                               </tr>
                             </thead>
                            <tbody>
                            {eventList.map(function(s,j) {
                                        let key=s.name;
                                      return <tr key={s.name}>
                              

                             { dayList.map(function(v, k) {
                                        let str=s.name+","+v.name;
                                        let curSelected=selected[j][k];
                                        let cn="";
                                        if(curSelected){
                                            cn="slt";
                                        }
                                        return <td key={str} className={cn} onMouseDown={that.MouseDown.bind(that,j,k)} 
                                        onMouseOver={that.MouseOver.bind(that,j,k)}
                                        onMouseUp={that.MouseUp.bind(that,j,k)}
                                         >xx</td>
                                      })
                                     }
                            </tr>})
                        }
                    
                            </tbody>
                        </table>
                            </div>
                        </td>
                        <td>
                        <table>
                            <thead>
                               <tr> <th className="add-time"><a onClick={that.next.bind(that,1)}><i className="fa fa-plus-square" ></i></a>
                               </th></tr>
                            </thead>
                            <tbody>

                               {eventList.map(function(s,j) {
                                        let key=s.name;
                                      return <tr key={s.name}>
                                 <td>
                                 <Dropdown triggerBar={<button>操作<i className="fa fa-angle-down"></i></button>}
                                       trigger="hover">
                                        <ul className="operations">
                                            <li>编辑</li>
                                            <li>保存</li>
                                            <li>提交</li>
                                            <li>删除</li>
                                        </ul>
                                 </Dropdown>
                                 </td>
                                 </tr>
                                  })
                                }
                            </tbody>
                        </table>
                        </td>
                    </tr>
                </tbody>
            </table>
      </div>
        )
    };
}


export class Header extends Component {
    render() {
        const children = this.props.children;
        return <div>{children}</div>
    }

}
