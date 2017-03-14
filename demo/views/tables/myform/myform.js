import React, {
    Component
} from 'react';


import { Row, Col, Form, Icon, Input, Button, Checkbox, Select, DatePicker, TimePicker, Cascader, Upload, Radio } from 'antd';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

//所有类型form

class ServiceFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of formxxx: ', values);
            }
        });
    }

    render() {
        const formItems = this.props.formItems;
        console.log("xxx", formItems);
        const { getFieldDecorator } = this.props.form;
        const itemElement = (curtype, selects, disabled, placeholder) => {
            const multiple = (!!selects) && selects.multiple || false;
            const options = (!!selects) && selects.options || [];
            disabled = disabled || false;
            placeholder = placeholder || "请输入信息";
            let type = $.trim(curtype); //去空格
            switch (type) {
                case "input":
                    return <Input disabled={disabled} placeholder={placeholder}/>
                case "select":
                    return <Select multiple={multiple} disabled={disabled} placeholder={placeholder}>
                    {
                      options.map(function(v, k) {
                        return <Option key={k} value={v}>{v}</Option>
                      })
                    }
                      </Select>
                case "rangedate":
                    return <RangePicker style={{width:'100%'}} disabled={disabled} placeholder={placeholder}/>
                case "monthpicker":
                    return <MonthPicker style={{width:'100%'}} disabled={disabled} placeholder={placeholder}/>
                case "cascader":
                    return <Cascader options={options} style={{width:'100%'}}disabled={disabled}/>
                case "datepicker":
                    return <DatePicker style={{width:'100%'}} disabled={disabled} placeholder={placeholder}/>
                case "checkbox":
                    return <CheckboxGroup options={options}  disabled={disabled}/>
                case "textarea":
                    return <Input type="textarea" rows="2" disabled={disabled} placeholder={placeholder}/>
            }
        }
        const config = {
            // lang: "en",
            uploadImgUrl: '',
            uploadParams: {
                token: 'abcdefg',
                user: 'wangfupeng1988'
            },
            uploadHeaders: {
                'Accept': 'text/x-json'
            },
        };
        return (
            <div className='oper-page'>
            <Form ref="myform" onSubmit={this.handleSubmit} className="form oper-body" style={{overflow:'hidden',}}>
            {
              formItems.map(function(s, j) {
                let config={};
                if(s.initialValue){
                 config={ rules:s.rules,
                          initialValue:s.initialValue}
                }else{
                  config={ rules:s.rules,}
                }
                console.log();
                return <Col key={j}  span={s.layout.col}>
                 <FormItem label={s.label}{...s.layout.itemlayout}>
                        {getFieldDecorator(s.id,config)(
                          itemElement(s.type,s.selects,s.disabled,s.placeholder)
                        )}
                </FormItem>
             </Col>;
              })
            }
      </Form>
      </div>
        );
    }
}

export default ServiceFrom = Form.create({})(ServiceFrom);
