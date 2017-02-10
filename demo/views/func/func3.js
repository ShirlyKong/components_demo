import * as React from 'react';
import $ from 'jquery';
import {
  DatePicker,
  Modal,
  Button,
  Input,
  Row,
  Col,
  Checkbox,
  Radio,
  message,
  Popconfirm
} from 'antd';
import 'fullcalendar/dist/fullcalendar.min.js';
import 'fullcalendar/dist/locale/zh-cn';
import 'fullcalendar/dist/fullcalendar.min.css';
import './jquery-ui.min.js';
import './calendar.css';
export default class Func3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      action: 'add',
      start: null,
      end: null,
      title: '',
      color: "#360",
      allDay: false,
      content: '',
      id: null,
      isEnd: false,
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
      content: '',
      title: '',
      color: "#360",
      allDay: false,
      id: null,
      isEnd: false,
    })
  }
  showModal() { //显示弹框
    this.setState({
      visible: true
    });
  }
  delete() {
    const {
      id
    } = this.state;
    this.handleCancel();
    $.ajax({
      url: 'http://10.92.20.4/fullcal/demo/test.php',
      type: 'post',
      cache: false,
      data: {
        action: 'delete',
        id
      },
      success: function(data) {
        if(data == 0){
              message.error('操作失败!');
            }
        $('#calendar').fullCalendar('refetchEvents');
      }
    })
  }
  clone() {
    const action = 'add';
    let {
      start,
      end,
      title,
      color,
      allDay,
      id,
      content,
      isEnd
    } = this.state;
    start = start && (start = start.format('YYYY-MM-DD HH:mm'));
    end = isEnd ? end = end.format('YYYY-MM-DD HH:mm') : null;
    let postdata = {
      action,
      title,
      allDay,
      color,
      start,
      end,
      content
    }; //此处数据用来通知后台修改数据 --- 新增数据
    $.ajax({
      url: 'http://10.92.20.4/fullcal/demo/test.php',
      type: 'post',
      data: postdata,
      cache: false,
      success: function(data) {
        if(data == 0){
              message.error('操作失败!');
            }
        $('#calendar').fullCalendar('refetchEvents');
      }
    })
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
      content
    } = this.state;
    if (/^\s*$/.test(title)) {
      message.config({
        top: 100
      });
      message.error('请输入日程内容!');
      return;
    }
    if (!start) {
      message.config({
        top: 100
      });
      message.error('请选择开始时间!');
      return;
    }
    switch (action) {
      case 'add':
        start = start && (start = start.format('YYYY-MM-DD HH:mm'));
        end = isEnd ? end = end.format('YYYY-MM-DD HH:mm') : null;
        let postdata = {
          action,
          title,
          allDay,
          color,
          start,
          end,
          content
        }; //此处数据用来通知后台修改数据 --- 新增数据
        $.ajax({
          url: 'http://10.92.20.4/fullcal/demo/test.php',
          type: 'post',
          cache: false,
          data: postdata,
          success: function(data) {
            if(data == 0){
              message.error('操作失败!');
            }

            $('#calendar').fullCalendar('refetchEvents');
          }
        })

        break;

      case 'edit':
        start = start && (start = start.format('YYYY-MM-DD HH:mm'));
        end = isEnd ? end = end.format('YYYY-MM-DD HH:mm') : null;
        postdata = {
          action,
          title,
          allDay,
          color,
          start,
          end,
          content,
          id
        }; //此处数据用来通知后台修改数据 --- 新增数据
        $.ajax({
          url: 'http://10.92.20.4/fullcal/demo/test.php',
          type: 'post',
          cache: false,
          data: postdata,
          success: function(data) {
            if(data == 0){
              message.error('操作失败!');
            }
            $('#calendar').fullCalendar('refetchEvents');
          }
        })
        break;
    }
    this.handleCancel();
  }
  handleCancel() { //点击弹框内的关闭按钮
    this.setState({
      visible: false
    }); //关闭弹框
    this.reset(); //清除弹框内容
  }
  componentDidMount() {
    var that = this;
    $('#external-events .fc-event').each(function() {

      // store data so the calendar knows to render an event upon drop
      $(this).data('event', {
        title: $.trim($(this).text()), // use the element's text as the event title
        stick: true, // maintain when user navigates (see docs on the renderEvent method)
      });

      $(this).draggable({
        zIndex: 999,
        revert: true,
        revertDuration: 0
      });
    });

    this.calendar = $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'list'
      },
      editable: true,
      dragOpacity: {
        agenda: .5,
        '': .6
      },
      droppable: true,

      buttonText: {
        today: '返回今天',
      },
      drop: function(starttime) {
        const that = this;
        if ($('#drop-remove').is(':checked')) {
          $(that).remove();
        }
        const title = $(this).text();
        const start = starttime.format('YYYY-MM-DD HH:mm');
        const end = null;
        const allDay = true;
        const color = '#3a87ad';
        var postdata = {
          action: 'add',
          title,
          allDay,
          color,
          start,
          end,
          content: ''
        }; //此处数据用来通知后台修改数据 --- 新增数据
        $.ajax({
          url: 'http://10.92.20.4/fullcal/demo/test.php',
          type: 'post',
          data: postdata,
          cache: false,
          success: function(data) {
            if(data == 0){
              message.error('操作失败!');
            }
            $('#calendar').fullCalendar('refetchEvents');
            if ($('#drop-remove').is(':checked')) {
              $(that).remove();
            }
          }
        })
      },
      eventReceive(e) {
        that.calendar.fullCalendar('removeEvents', e.id);
      },
      eventDrop: function(event) {
        let {
          title,
          allDay,
          color,
          id,
          start,
          end,
          content,
          isEnd
        } = event;

        start = start && (start = start.format('YYYY-MM-DD HH:mm'));
        end = isEnd ? end = end.format('YYYY-MM-DD HH:mm') : null;
        var postdata = {
          action: 'edit',
          title,
          allDay,
          color,
          start,
          end,
          content,
          id
        }; //此处数据用来通知后台修改数据 --- 新增数据
        $.ajax({
          url: 'http://10.92.20.4/fullcal/demo/test.php',
          type: 'post',
          cache: false,
          data: postdata,
          success: function(data) {
            if(data == 0){
              message.error('操作失败!');
            }
            $('#calendar').fullCalendar('refetchEvents');
          }
        })
      },
      eventResize: function(event) {
        let {
          title,
          allDay,
          color,
          id,
          start,
          end,
          content,
          isEnd
        } = event;
        start = start && (start = start.format('YYYY-MM-DD HH:mm'));
        end = isEnd ? end = end.format('YYYY-MM-DD HH:mm') : null;
        var postdata = {
          action: 'edit',
          title,
          allDay,
          color,
          start,
          end,
          content,
          id
        }; //此处数据用来通知后台修改数据 --- 新增数据
        $.ajax({
          url: 'http://10.92.20.4/fullcal/demo/test.php',
          type: 'post',
          cache: false,
          data: postdata,
          success: function(data) {
            if(data == 0){
              message.error('操作失败!');
            }
            $('#calendar').fullCalendar('refetchEvents');
          }
        })
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
        const {
          start,
          end,
          title,
          color,
          allDay,
          id,
          content
        } = calEvent;
        const isEnd = !!end;
        that.setState({
          action: 'check',
          start,
          end,
          title,
          color,
          allDay,
          id,
          isEnd,
          content
        });
        that.showModal();
      },
      events: 'http://10.92.20.4/fullcal/demo/json.php'
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
    const {
      action
    } = this.state;
    const btn = [
      <Button key='clone' onClick={this.clone.bind(this)}>复制</Button>,
      <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
      <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this)}>
              确定
            </Button>
    ];
    let calEvent = '';
    let footer;
    switch (action) {
      case 'add':
        calEvent = '新建事件';
        footer = [btn[1], btn[2]];
        break;
      case 'edit':
        calEvent = '编辑事件';
        footer = btn;
        break;
      case 'check':
        calEvent = '查看事件';
        footer = [<Popconfirm key='del' title="您确认要删除吗？" onConfirm={e=>this.delete()} okText="是" cancelText="否">
              <Button type="danger">删除</Button></Popconfirm>,
              <Button key='check' onClick={e=>this.setState({action:'edit'})}>编辑</Button>];
        break;
      default:
        calEvent = '编辑事件';
        footer = btn;
        break;
    }
    return (
      <div>

          <div id='external-events'>
            <h4>Draggable Events</h4>
              <div className='fc-event'>My Event 1</div>
              <div className='fc-event'>My Event 2</div>
              <div className='fc-event'>My Event 3</div>
              <div className='fc-event'>My Event 4</div>
              <div className='fc-event'>My Event 5</div>
            <p>
              <label><input type='checkbox' id='drop-remove' />
              拖拽后删除</label>
            </p>
          </div>

          <div id='calendar' ></div>
          <Modal title={calEvent} visible={this.state.visible}
            onCancel={this.handleCancel.bind(this)}
            footer={footer}
          >
            <Row>
              <Col span={3}>日程标题：</Col>
              <Col span={18}>
                {
                action == 'check'?
                <div className="">{this.state.title}</div>
                :
                <Input value={this.state.title}
                  onChange = {e=>this.formChange('title',e.target.value)}
                  placeholder="记录你将要做的一件事..." 
                />
                }

              </Col>
            </Row>
            <Row>
              <Col span={3}>日程内容：</Col>
              <Col span={18}>
                {
                action == 'check'?
                <div className="">{this.state.content}</div>
                :
                <Input type='textarea' value={this.state.content}
                  onChange = {e=>this.formChange('content',e.target.value)}
                  placeholder="" 
                />
                }

              </Col>
            </Row>
            <Row>
              <Col span={3}>开始时间：</Col>
              <Col span={18}>
               {
                action == 'check'?
                <div className="">{((start,allDay)=>{
                                  if(!start){
                                    return '';
                                  }else{
                                    if(allDay){
                                      return start.format('YYYY-MM-DD') + '全天';
                                    }else{
                                      return start.format('YYYY-MM-DD HH:mm');
                                    }
                                  }
                                })(this.state.start,this.state.allDay)}</div>
                :
                <DatePicker showTime={!this.state.allDay}
                  value = {this.state.start}
                  onChange = {e=>this.formChange('start',e)}
                  format={this.state.allDay?"YYYY-MM-DD":"YYYY-MM-DD HH:mm"}
                />
                }
              </Col>
            </Row>
            {this.state.isEnd ?
            <Row>
              <Col span={3}>结束时间：</Col>
              <Col span={18}>
               {
                action == 'check'?
                <div className="">{((start,allDay)=>{
                                  if(!start){
                                    return '';
                                  }else{
                                    if(allDay){
                                      return start.format('YYYY-MM-DD') + '全天';
                                    }else{
                                      return start.format('YYYY-MM-DD HH:mm');
                                    }
                                  }
                                })(this.state.end,this.state.allDay)}</div>
                :
                <DatePicker showTime={!this.state.allDay}
                  value = {this.state.end}
                  disabledDate={this.disabledEndDate}
                  onChange = {e=>this.formChange('end',e)}
                  format={this.state.allDay?"YYYY-MM-DD":"YYYY-MM-DD HH:mm"}
                />
              }
              </Col>
            </Row> : ""
            }
            {
            action == 'check'? '':[
            <Row key='color'>
              <Col span={3}>主题颜色：</Col>
              <Col span={18}>
                 <Radio.Group onChange={e=>this.formChange('color',e.target.value)} value={this.state.color}>
                    <Radio value="#360"><span style={{color:'#360',fontSize:'15px'}}>■</span></Radio>
                    <Radio value='#06c'><span style={{color:'#06c',fontSize:'15px'}}>■</span></Radio>
                    <Radio value='#3a87ad'><span style={{color:'#3a87ad',fontSize:'15px'}}>■</span></Radio>
                    <Radio value='#f30'><span style={{color:'#f30',fontSize:'15px'}}>■</span></Radio>
                </Radio.Group>
              </Col>
            </Row>,
            <Row key='select'>
              <Col span={8}><Checkbox onChange={e=>{this.formChange('allDay',e.target.checked)}} checked={this.state.allDay}>全天</Checkbox></Col>
              <Col span={8}><Checkbox onChange={e=>{this.formChange('isEnd',e.target.checked);this.state.isEnd === false && this.formChange('end',null)}} checked={this.state.isEnd}>结束时间</Checkbox></Col>
            </Row>
            ]}
          </Modal>
        </div>
    )
  };
}