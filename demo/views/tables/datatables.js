import React, { Component } from 'react';
import { Select } from 'antd';
import TimeTable from './timetable/index';
import EventTable, { Header } from './timetable/my';
// import EventTable, { Header } from './timetable/my';
const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}
export default class Func4 extends Component {
    constructor(props) {
        super(props);
    }
    handleChange1(e) {
        //返回选择结果
        console.log("re", e);
    }
    handleChange2(e) {
        //返回选择结果
        console.log("envent re", e);
    }
    eventClick(e) {
        //返回所点击事件id
        console.log("id is", e);
    }
    iptChange1() {

    }
    iptChange2() {

    }

    render() {
        let that = this;
        const data = [{
            item: [1, 2, 3],
            sub: false,
            datalist: ["2017-02-28", "2017-03-01"]
        }];
        const headers = <div>
            <Header  txt="活动编号">
                <input type="text" onChange={that.iptChange1.bind(that)} value="" />
            </Header>
            <Header txt="活动名称">
                <input onChange={that.iptChange2.bind(that)} type="text" value=""/>
            </Header>
            <Header txt="参与人员">
        {/*这里用数组处理有则显示下拉框,初始状态应该为空*/}
                <Select defaultValue="1" style={{ width: 120 }} onChange={handleChange}>

                  <Option value="1"></Option>
                  <Option value="2">xx1</Option>
                  <Option value="3">xx2</Option>
                  <Option value="disabled" disabled>xx3</Option>
                </Select>
            </Header>
            </div>
            // console.log(headers);

        return (
            <div>
            <h1>初步版本说明</h1>
                <div >
                    <h2>demo示例说明</h2>
                    <hr/>
                    <section>
{/*                        <h2>日期 - 小时表</h2>
                        <TimeTable rangeDate={rangeDate}  handleChange={this.handleChange1} />
                        <br/>*/}
                        <h2>事件 - 时间表</h2>
                        <EventTable headers={headers} 
                        handleChange={this.handleChange2} 
                        readonly={false}/>
                    </section>
                    <br/>
                    {/*<EventTable headers={headers} 
                        data={data}
                        handleChange={this.handleChange2} 
                        readonly={true}/>*/}
                </div>


            </div>
        )
    };
}
