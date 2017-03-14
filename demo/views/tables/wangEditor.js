import React, {
    Component,
} from 'react';

import moment from "moment";

import Editor from './editor/editor';

export default class WangEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "serviceDescribe",
        };
    }

    onChange(e) { //输出结果
        this.setState({
            content: e,
        })
    }
    render() {
        const configEditor = {
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
            <div className='oper-page' >
            <div>
            <p>
            编辑器参数配置，请参考WangEditor文档
            </p>
            </div>
             <Editor id="editor1" config={configEditor}
                    onChange={this.onChange.bind(this)} 
                    content={this.state.content}
                    style={{height:200}}
                    />
      </div>
        )
    };
}
