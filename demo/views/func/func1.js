import React,{Component} from 'react';

import {Autocomplete} from 'yrui';

var data=['1',1,'www','3e3',234,'aa','中国','武汉','wuhan','湖南','湖北','&66','@qq3'];
var title='autocomplete--支持鼠标点选和键盘上下移动回车选择';

export default class Func1 extends Component {

  render() {
    return (
      <Autocomplete data={data} title={title} />
    )
  };
}
