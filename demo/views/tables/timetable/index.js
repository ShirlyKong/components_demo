import React, { Component } from 'react';
import './index.css';
import Dropdown from './dropdown/index';
import moment from 'moment';
let date = moment(new Date()).format("YYYY-MM-DD");
export default class EventTable extends Component {
    static propTypes = {
        headers: React.PropTypes.array.isRequired,
        startdate: React.PropTypes.string,
        length: React.PropTypes.number || React.PropTypes.string,
        readonly: React.PropTypes.bool,
        data: React.PropTypes.array,
        onChange: React.PropTypes.func,

    };
    static defaultProps = {
        startdate: date, //默认为当前日期
        length: 10,
        readonly: false,
        data: [],
    };
    constructor(props) {
        super(props);
        this.state = {
            startdate: props.startdate,
            length: props.length,
            readonly: props.readonly,
            data: props.data, //被选中的框显示
            mousedown: false,
        };
    }
    MouseDown = (j, k, v) => { //j表示天行数，k表示列数
        this.tdClick(j, k, v);
        this.setState({
            mousedown: true,
        })
    }
    MouseUp = (j, k, v) => { //j表示天行数，k表示列数
        this.setState({
                mousedown: false,
            })
            //选中单元格
    }
    MouseOver = (j, k, v) => { //j表示天行数，k表示列数
        if (this.state.mousedown) {
            this.tdClick(j, k, v);
        }
        //取消默认事件
    }

    tdClick = (j, k, v) => { //j表示天行数，k表示列数
        let data = this.state.data;
        // console.log("daodi", data[j], v);
        data[j].datalist.hasItem(v) ? data[j].datalist.remove(v) : data[j].datalist.push(v)
        this.setState({
            data: data,
        })

        //选中单元格
    }
    next = (num) => {
        let date = this.state.startdate;
        let curstart = moment(date).add(num, 'days').format("YYYY-MM-DD");
        this.setState({
            startdate: curstart,
        })
    }
    addRow = () => {
        let data = this.state.data;
        let headers = this.props.headers;
        let item = [];
        headers[0].props.children.map(function(s, j) {
                return item.push([]);
            })
            // debugger;
        data.push({
            item: item,
            sub: false,
            datalist: []
        });
        this.setState({ data: data });
        this.props.handleChange(this.state.data);
    }
    inserRow = (j) => {

        let data = this.state.data;
        let headers = this.props.headers;
        let item = [];
        headers[0].props.children.map(function(s, j) {
            return item.push([]);
        });
        let element = {
            item: item,
            sub: false,
            datalist: []
        };
        data.insert(j + 1, element);
        this.setState({ data: data });
        this.props.handleChange(this.state.data);
    }


    deleteRow = (j) => {
        let data = this.state.data;
        this.props.deleteRow(data[j]);
    }

    dateChange = () => {
        let ob = this.refs.dateipt;
        this.setState({
            startdate: ob.value,
        })
    }
    rowedit = (j) => {
        let data = this.state.data;
        data[j].sub = false;
        this.setState({
            data: data,
        })
        this.props.editRow(data[j]);
    }
    rowsave = (j) => {
        let data = this.state.data;
        data[j].sub = true;
        this.setState({
                data: data,
            })
            //异步提交当前行信息
        this.props.rowsave(data[j]);
    }
    componentDidMount = () => {
        let ob = this.refs["time-table"];
        document.onmouseup = this.MouseUp.bind(this);
        (!!this.props.handleChange) && this.props.handleChange(this.state.data);
    }

    componentWillUnmount() {
        document.onmouseup = null;
    }

    render() {
        let that = this;
        let arr = this.props.headers;
        const headers = this.props.headers[0].props.children;

        const {
            startdate,
            length,
            readonly,
            data,
        } = this.state;
        let daylist = [];
        let date = moment(startdate);
        for (let i = 0; i < length; i++) {
            daylist.push(date.format("YYYY-MM-DD"));
            date.add(1, "days")
        }
        // console.log("sss", readonly, this.props.readonly);

        return (
            <div className="time-table">
            <div className="toolbox">
                <input className="dateipt" ref="dateipt" type="date" name="start-date" onChange={this.dateChange.bind(this)} value={this.state.startdate}/>
                <a onClick={this.next.bind(this,(0-length))}><i className="fa fa-angle-left"></i></a>
                <a onClick={this.next.bind(this,length)}><i className="fa fa-angle-right"></i></a>
            </div>



            <table id="time-table" ref="time-table"  className="envent-table">
                <thead>
                    <tr>
                        {
                           headers.map(function(n, p) {
                            return <th key={p} >{n.props.txt}</th>;
                            })
                        }
                        {
                            daylist.map(function(s, k) {
                                return <th className="content-td" key={k}>{s}</th>;
                            })
                        }
                        <th className="add-time">
                         <a onClick={that.next.bind(that,-1)}>
                           <i className="fa fa-angle-left" ></i>
                         </a>
                         <a onClick={that.next.bind(that,1)}>
                          <i className="fa fa-angle-right" ></i>
                         </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                   {
                    (data.length>0)&&data.map(function(s,j) {
                        return  <tr key={j}>
                                {   arr[j].props.children.map(function(v, k) {
                                        return <th key={k}>{(!readonly&&!s.sub)?(v):s.item[k].toString()}</th>;
                                           })
                                }
                                {   daylist.map(function(v, k) {
                                        let cn="";
                                        if(s.datalist.hasItem(v)){
                                            cn="slt";
                                        }
                                        return <td key={k} className={cn}
                                                onMouseDown={(!readonly&&!s.sub)&&that.MouseDown.bind(that,j,k,v)}
                                                onMouseOver={(!readonly&&!s.sub)&&that.MouseOver.bind(that,j,k,v)}>
                                                </td>
                                            })
                                }

                                         <th>
                                      {(!readonly)&&<Dropdown triggerBar={<button>操作<i className="fa fa-angle-down"></i></button>}
                                               trigger="hover">
                                            <ul className="operations">
                                                <li onClick={that.rowedit.bind(that,j)}>编辑</li>
                                                <li onClick={that.rowsave.bind(that,j)}>提交</li>
                                                <li onClick={that.inserRow.bind(that,j)}>插入</li>
                                                <li onClick={that.deleteRow.bind(that,j)}>删除</li>
                                            </ul>
                                         </Dropdown>
                                     }
                                        </th>
                                </tr>
                            })
                        }
                        {(!readonly)&&<tr>
                            {headers.map(function(n, p) {
                                        return (0===p)?
                                            <th key={p}>
                                                <a onClick={that.addRow.bind(that)}>
                                                   <i className="fa fa-plus-square"></i>
                                                </a>
                                            </th>:<th key={p}></th>
                                })
                            }
                            {daylist.map(function(v, k) {
                                    return <td key={k}></td>
                                })
                            }
                                <td></td>
                        </tr>
                        }
                </tbody>
            </table>


      </div>
        )
    };
}


export class Header extends Component {

    render() {
        const children = this.props.children;
        return <div ref="ipt">{children}</div>
    }

}


Array.prototype.S = String.fromCharCode(2);
Array.prototype.hasItem = function(e) {
    var r = new RegExp(this.S + e + this.S);
    return (r.test(this.S + this.join(this.S) + this.S));
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
}
