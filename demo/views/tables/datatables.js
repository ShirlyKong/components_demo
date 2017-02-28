import React, { Component } from 'react';
import { Select } from 'antd';
import TimeTable from './timetable/index';
import EventTable, { Header } from './timetable/index';
// import EventTable, { Header } from './timetable/my';
const Option = Select.Option;

const initdata = [{
    item: ["1", "2", ["成员1"]],
    sub: true,
    datalist: ["2017-02-28", "2017-03-01"]
}];

export default class Func4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: initdata || [],
            options: [],
        }
    }
    handleChange(e) {
        //返回选择结果
        // debugger;
        let options = [];
        this.setState({
            data: e,
            options: options,
        })
    }
    iptChange1(j, e) {
        let data = this.state.data;
        data[j].item[0] = e.target.value;
        //可根据已输入的编号值取出下拉框的内容
        let options = [{ key: '1', label: "test1" }, { key: '2', label: "test2" }];
        this.setState({
            data: data,
            options: options,
        })
    }
    iptChange2(j, e) {
        let data = this.state.data;
        data[j].item[1] = e.target.value;
        this.setState({
            data: data,
        })
    }
    selectChange(j, value) {
        // console.log(`selected ${value}`);
        let data = this.state.data;
        data[j].item[2] = value;
        this.setState({
            data: data,
        })
    }
    onRowSave(e) {
        console.log("保存信息", e);
    }
    deleteRow(e) {
        console.log("待删除的行", e);
        let data = this.state.data;
        data.remove(e);
        this.setState({
            data: data,
        })
    }
    editRow(e) {
        console.log("当前编辑的行", e);
        //当前被编辑的行的option
        this.setState({
            options: [{ key: '1', label: "成员1" }, { key: '2', label: "成员2" }],
        })
    }
    render() {
        let that = this;
        const { data, options } = this.state;
        const headers = (data.length > 0) && data.map(function(s, j) {
                return <div key={j}>
                        <Header  txt="活动编号">
                            <input type="text"  onChange={that.iptChange1.bind(that,j)} value={s.item[0]} />
                        </Header>
                        <Header txt="活动名称">
                            <input  onChange={that.iptChange2.bind(that,j)} type="text" value={s.item[1]}/>
                        </Header>
                        <Header txt="参与人员">
                        {(!!options)&&<Select defaultValue={s.item[2]} style={{ width:'100%'}} multiple onChange={that.selectChange.bind(that,j)}>
                            {         options.map(function(v, k) {
                                return  <Option key={k} value={v.label}>{v.label}</Option>
                            })}
                            </Select>
                        }
                        </Header>
                      </div>
            }) || [1].map(function(s, j) {
                return <div>
                         <Header  txt="活动编号"/>
                         <Header  txt="活动名称"/>
                         <Header  txt="参与人员"/>
                    </div>
            })
            // console.log(headers);

        return (
            <div>
                    <h1>初步版本说明</h1>
                    <div >
                        <h2>demo示例说明</h2>
                        <hr/>
                        <section>


                            <h2>事件 - 时间表</h2>
                            <EventTable headers={headers} 
                            handleChange={this.handleChange.bind(this)} 
                            readonly={false}
                            data={data} 
                            rowsave={this.onRowSave.bind(this)}
                            deleteRow={this.deleteRow.bind(this)}
                            editRow={this.editRow.bind(this)}/>
                        </section>
                        <br/>
                    </div>
                </div>
        )
    };
}
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
