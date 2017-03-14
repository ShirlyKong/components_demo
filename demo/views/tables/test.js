import React, { Component } from 'react';
import Editor from './editor/editor';
import ServiceFrom from './myform/myform';
import { Button } from 'antd';
import { formItems, formItems2 } from './testdata.js';
export default class BStables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
        }
    }
    sub = () => {
        console.log("ss", this.refs.sform1); //处理调用子组件的校验方法
        this.refs.sform1.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of formxxx: ', values);
            }
        });;
    }
    sub2 = () => {
        console.log("ss", this.refs.sform2); //处理调用子组件的校验方法
        this.refs.sform2.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of formxxx: ', values);
            }
        });;
    }
    render() {
        return (
            <div>
                <ServiceFrom ref="sform1" formItems={formItems}/>
                <Button onClick={this.sub.bind(this)}>提交1</Button>
                 <ServiceFrom ref="sform2" formItems={formItems2}/>
                <Button onClick={this.sub2.bind(this)}>提交2</Button>
            </div>
        )
    };
}
