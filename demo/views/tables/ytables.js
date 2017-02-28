import React, { Component } from 'react';

import { Ytables } from 'yrui';

import { tableData } from '../../models/models';

import { Select } from 'antd';

import EventTable, { Header } from './timetable/index';
// import EventTable, { Header } from './timetable/my';
const Option = Select.Option;

const initdata = [{
    item: ["1", "2", ["成员1"]],
    sub: true,
    datalist: ["2017-02-28", "2017-03-01"]
}, {
    item: ["1", "2", ["成员1", "成员2"]],
    sub: true,
    datalist: ["2017-03-01", "2017-03-06", "2017-03-08"]
}];

export default class Func4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: initdata || [],
        }
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
    render() {
        let that = this;
        const { data, options } = this.state;
        const headers = data.map(function(s, j) {
                return <div key={j}>
                        <Header txt="活动编号">
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
                          <EventTable
                          headers={headers}
                          readonly={true}
                          data={data} />
                      </section>
                      <br/>
                  </div>
                    {/* <Ytables yth={tableData.thead} ytb={tableData.tbody} editable={true} />*/}
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
