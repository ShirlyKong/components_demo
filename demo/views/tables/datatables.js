import React, { Component } from 'react';
import { Select } from 'antd';
import TimeTable from './timetable/index';
import EventTable, { Header } from './timetable/eventable';
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
    iptChange() {

    }

    render() {
        let that = this;
        let rangeDate = ['2015-09-27', '2015-9-29'];
        let eventList = [{ id: '001', name: '事件1' }, { id: '002', name: '事件2' }, { id: '003', name: '事件3' }, { id: '004', name: '事件x' }, ];
        const headers = <div>
            <Header txt="活动名称">
                <button>xxxx</button>
            </Header>
            <Header txt="活动名称">
                <input onChange={that.iptChange.bind(that)} type="text" value="信息"/>
            </Header>
            <Header txt="活动编号">
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Header>
            </div>
        console.log(headers);

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
                        <EventTable rangeDate={rangeDate} headers={headers} 
                        events={eventList}  
                        handleChange={this.handleChange2} 
                        eventClick={this.eventClick}
                        readOnly={true}/>

                    </section>
                    <br/>
                    <section className="description">
                    <h3>示例代码</h3>
                        <code>
                            <pre>
                        {'    export default class Func4 extends Component {'}<br/>
                        {'        constructor(props) {'}<br/>
                        {'            super(props);'}<br/>
                        {'        }'}<br/>
                        {'        handleChange1(e) {'}<br/>
                        {'            //返回选择结果'}<br/>
                        {'            console.log("re", e);'}<br/>
                        {'         }'}<br/>
                        {'         handleChange2(e) {'}<br/>
                        {'             //返回选择结果'}<br/>
                        {'             console.log("envent re", e);'}<br/>
                        {'         }'}<br/>
                        {'         eventClick(e) {'}<br/>
                        {'             //返回所点击事件id'}<br/>
                        {'             console.log("id is", e);'}<br/>
                        {'         }'}<br/>
                        {'         render() {'}<br/>
                        {'             let rangeDate = ["2015-09-25", "2015-10-06"];'}<br/>
                        {'             let eventList = [{ id: "001", name: "事件1" }, { id: "002", name: "事件2"} '}<br/>
                        {'                           {id: "003", name: "事件3" }, { id: "004", name: "事件x" }, ];'}<br/>
                        {'            return ('}<br/>
                        {'                <div className="krow">'}<br/>
                        {'                    <div className="kcol-6">'}<br/>
                        {'                        <h2>demo示例说明</h2>'}<br/>
                        {'                        <hr/>'}<br/>
                        {'                        <div>'}<br/>
                        {'                           <h2>日期 - 小时表</h2>'}<br/>
                        {'                           <TimeTable rangeDate={rangeDate}  handleChange={this.handleChange1} />'}<br/>
                        {'                           <br/>'}<br/>
                        {'                           <h2>事件 - 时间表</h2>'}<br/>
                        {'                           <EventTable rangeDate={rangeDate}  events={eventList}  '}<br/>
                        {'                                       handleChange={this.handleChange2} '}<br/>
                        {'                                       eventClick={this.eventClick}/>'}<br/>
                        {'                      </div>'}<br/>
                        {'                    </div>'}<br/>
                        {'                </div>'}<br/>
                        {'                )}'}<br/>
                        {'             }'}

                            </pre>
                        </code>
                    </section>
                </div>
                <div>
                    <h2>设计思路及参数说明</h2>
                    <section>

                    </section>
                    <section className="description">
                        <dl>TimeTable组件参数
                            <dt>rangeDate 设置起始日期</dt>
                              <dd>类型：字符串数组</dd>
                              <dd>例如：['2015-09-25', '2015-10-06']</dd>
                            <dt>handleChange 组件选择返回结果</dt>
                              <dd>类型：函数</dd>
                              <dd>默认参数即为组件所选时间结果</dd>
                        </dl>
                        <dl>EventTable组件参数
                            <dt>rangeDate 设置起始日期</dt>
                              <dd>类型：字符串数组</dd>
                              <dd>例如：['2015-09-25', '2015-10-06']</dd>
                            <dt>events 初始事件</dt>
                              <dd>类型：对象数组</dd>
                              <dd>包含属性：id,name</dd>
                            <dt>handleChange 组件选择返回结果</dt>
                              <dd>类型：函数</dd>
                              <dd>默认参数即为组件所选时间结果</dd>
                            <dt>eventClick 事件点击事件</dt>
                              <dd>类型：函数</dd>
                              <dd>默认参数即为点击事件id</dd>
                        </dl>
                    </section>
                </div>

            </div>
        )
    };
}
