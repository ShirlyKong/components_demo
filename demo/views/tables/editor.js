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
        return (
            <div className='oper-page' >
             <Editor id="editor1" config={configEditor}
                    onChange={that.onChange.bind(that)} 
                    content={that.state.content}
                    style={{height:200}}
                    />
      </div>
        )
    };
}
