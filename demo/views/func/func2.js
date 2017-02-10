import * as React from 'react';
import $ from 'jquery';
import { DatePicker, Modal, Button, Input, Row, Col, Checkbox, Radio, message, Popconfirm } from 'antd';
import 'fullcalendar/dist/fullcalendar.min.js';
import 'fullcalendar/dist/fullcalendar.min.css';
import './calendar.css';
export default class Func2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            action: 'add',
            start: null,
            end: null,
            title: '',
            color: "#360",
            allDay: true,
            nextId: '',
            id: null,
            isEnd: false,
            _allDay: null,
            _end: null,
            _id: null,
            _start: null,
        }
    }
    formChange(key, value) {
        this.setState({
            [key]: value
        })
    }
    reset() { //初始化数据,用来清除弹框内容
        this.setState({
            start: null,
            end: null,
            title: '',
            color: "#360",
            allDay: true,
            id: null,
            isEnd: false,
            _allDay: null,
            _end: null,
            _id: null,
            _start: null,
        })
    }
    showModal() { //显示弹框
        this.setState({ visible: true });
    }
    delete() {
        const { id } = this.state;
        const action = 'delete';

        this.calendar.fullCalendar('removeEvents', id);
        this.handleCancel();

        console.log({
            action,
            id
        }); //此处数据用来通知后台修改数据  --- 删除数据
    }
    clone() {
        const action = 'add';
        let { start, end, title, color, allDay, id, nextId } = this.state;

        this.calendar.fullCalendar('renderEvent', {
            title,
            start,
            end,
            allDay,
            color,
            id: nextId
        }, true);

        start && (start = start.format('YYYY-MM-DD HH:mm'));
        end && (end = end.format('YYYY-MM-DD HH:mm'));

        console.log({
            action,
            title,
            allDay,
            color,
            start,
            end,
            id: nextId
        }); //此处数据用来通知后台修改数据 --- 新增数据

        this.setState({
            nextId: nextId + 1
        });
        this.handleCancel();
    }
    handleOk() { //点击弹框内的OK
        let {
            action,
            start,
            end,
            title,
            color,
            allDay,
            id,
            isEnd,
            _allDay,
            _end,
            _id,
            _start,
            nextId
        } = this.state;
        if (title == '') {
            message.config({ top: 100 });
            message.error('请输入日程内容!');
            return;
        }
        if (!start) {
            message.config({ top: 100 });
            message.error('请选择开始时间!');
            return;
        }
        switch (action) {
            case 'add':
                this.calendar.fullCalendar('renderEvent', {
                    title,
                    start,
                    end,
                    allDay,
                    color,
                    id: nextId
                }, true);

                start && (start = start.format('YYYY-MM-DD HH:mm'));
                end && (end = end.format('YYYY-MM-DD HH:mm'));

                console.log({
                    action,
                    title,
                    allDay,
                    color,
                    start,
                    end,
                    id: nextId
                }); //此处数据用来通知后台修改数据 --- 新增数据

                this.setState({
                    nextId: nextId + 1
                });
                break;

            case 'edit':
                this.calendar.fullCalendar('updateEvent', {
                    start,
                    _allDay,
                    _end,
                    _id,
                    _start,
                    end,
                    title,
                    color,
                    allDay,
                    id
                });

                start && (start = start.format('YYYY-MM-DD HH:mm'));
                end && (end = end.format('YYYY-MM-DD HH:mm'));

                console.log({ action, title, allDay, color, id, start, end, });
                //此处数据用来通知后台修改数据 --- 修改数据

                break;
        }
        this.handleCancel();
    }
    handleCancel() { //点击弹框内的关闭按钮
        this.setState({ visible: false }); //关闭弹框
        this.reset(); //清除弹框内容
    }
    componentDidMount() {
        var that = this;
        const json = [{ //接收到的数据放这里
            id: '0',
            title: "吃饭1",
            start: "2017-02-08 09:00",
            end: "2017-02-08 08:00",
            allDay: false,
            color: "#360"
        }, {
            id: '1',
            title: "睡觉",
            start: "2017-02-10 00:00",
            end: "2017-02-11 00:00",
            allDay: true,
            color: "#f30"
        }];
        let nextId = Math.max.apply(null, json.map(v => v.id / 1)) + 1;
        nextId = nextId === -Infinity ? 0 : nextId;
        console.log(nextId);
        this.setState({
            nextId,
        })
        this.calendar = $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: ''
            },
            editable: true,
            dragOpacity: {
                agenda: .5,
                '': .6
            },
            isRTL: false,
            firstDay: 0,
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            buttonText: {
                prev: "<",
                next: ">",
                today: '返回今天',
                month: '月',
                week: '周',
                day: '日'
            },
            eventDrop: function(event) {
                let { title, allDay, color, id, start, end } = event;

                start && (start = start.format('YYYY-MM-DD HH:mm'));
                end && (end = end.format('YYYY-MM-DD HH:mm'));

                console.log({
                    action: 'edit',
                    title,
                    allDay,
                    color,
                    id,
                    start,
                    end
                }); //此处数据用来通知后台修改数据

            },
            eventResize: function(event) {
                let { title, allDay, color, id, start, end } = event;

                start && (start = start.format('YYYY-MM-DD HH:mm'));
                end && (end = end.format('YYYY-MM-DD HH:mm'));

                console.log({
                    action: 'edit',
                    title,
                    allDay,
                    color,
                    id,
                    start,
                    end
                }); //此处数据用来通知后台修改数据
            },
            selectable: true,
            select: function(start, end) {
                that.setState({
                    start,
                    end,
                    action: 'add',
                    isEnd: true
                })
                that.showModal();
            },
            // dayClick: function(date, allDay, jsEvent, view) { //点击某一天空白部位
            //   console.log(date); //点击的日期
            // },
            eventClick: function(calEvent, jsEvent, view) { //点击某一个事件
                const { _allDay, _end, _id, _start, start, end, title, color, allDay, id } = calEvent;
                const isEnd = !!end;
                that.setState({
                    action: 'edit',
                    _allDay,
                    _end,
                    _id,
                    _start,
                    start,
                    end,
                    title,
                    color,
                    allDay,
                    id,
                    isEnd
                });
                that.showModal();
            },
            events: json
        })
    }
    disabledEndDate = (endValue) => {
        const startValue = this.state.start;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    render() {
        const btn = [
            <Popconfirm key='del' title="您确认要删除吗？" onConfirm={e=>this.delete()} okText="是" cancelText="否">
              <Button type="danger">删除</Button>
            </Popconfirm>,
            <Button key='clone' onClick={this.clone.bind(this)}>复制</Button>,
            <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
            <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this)}>
              确定
            </Button>
        ];
        let calEvent = '';
        let footer;
        switch (this.state.action) {
            case 'add':
                calEvent = '新建事件';
                footer = [btn[2], btn[3]];
                break;
            case 'edit':
                calEvent = '编辑事件';
                footer = btn;
                break;
            default:
                calEvent = '编辑事件';
                footer = btn;
                break;
        }
        return (
            <div>
          <div id='calendar' style={{width:1000}}></div>
          <Modal title={calEvent} visible={this.state.visible}
            onCancel={this.handleCancel.bind(this)}
            footer={footer}
          >
            <Row>
              <Col span={3}>日程内容：</Col>
              <Col span={18}>
                <Input value={this.state.title}
                  onChange = {e=>this.formChange('title',e.target.value)}
                  placeholder="记录你将要做的一件事..." 
                />
              </Col>
            </Row>
            <Row>
              <Col span={3}>开始时间：</Col>
              <Col span={18}>
                <DatePicker showTime={!this.state.allDay}
                  value = {this.state.start}
                  onChange = {e=>this.formChange('start',e)}
                  format={this.state.allDay?"YYYY-MM-DD":"YYYY-MM-DD HH:mm"}
                />
              </Col>
            </Row>
            {this.state.isEnd ?
            <Row>
              <Col span={3}>结束时间：</Col>
              <Col span={18}>
                <DatePicker showTime={!this.state.allDay}
                  value = {this.state.end}
                  disabledDate={this.disabledEndDate}
                  onChange = {e=>this.formChange('end',e)}
                  format={this.state.allDay?"YYYY-MM-DD":"YYYY-MM-DD HH:mm"}
                />
              </Col>
            </Row> : ""
            }
            <Row>
              <Col span={3}>主题颜色：</Col>
              <Col span={18}>
                 <Radio.Group onChange={e=>this.formChange('color',e.target.value)} value={this.state.color}>
                    <Radio value="#360"><span style={{color:'#360',fontSize:'15px'}}>■</span></Radio>
                    <Radio value='#06c'><span style={{color:'#06c',fontSize:'15px'}}>■</span></Radio>
                    <Radio value='#f30'><span style={{color:'#f30',fontSize:'15px'}}>■</span></Radio>
                </Radio.Group>
              </Col>
            </Row>
            <Row>
              <Col span={8}><Checkbox onChange={e=>{this.formChange('allDay',e.target.checked)}} checked={this.state.allDay}>全天</Checkbox></Col>
              <Col span={8}><Checkbox onChange={e=>{this.formChange('isEnd',e.target.checked)}} checked={this.state.isEnd}>结束时间</Checkbox></Col>
            </Row>
          </Modal>
        </div>
        )
    };
}
