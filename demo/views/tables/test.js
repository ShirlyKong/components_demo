import React, { Component } from 'react';
import Editor from './editor/editor';
export default class BStables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
        }
    }
    onChange(e) { //输出结果
        this.setState({
            content: e,
        })
    }
    onSave(e) {
        console.log("提交内容", e);
    }
    render() {
        //1.0 仅仅配置菜单和图片上传路径 禁用等功能
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
            <div>
                    <Editor id="editor1" config={config} 
                    onChange={this.onChange.bind(this)} 
                    onSave={this.onChange.bind(this)}
                    content={this.state.content}
                    style={{height:500}}
                    hasToolbox/>
                  </div>
        )
    };
}
