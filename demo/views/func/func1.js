import React,{Component} from 'react';

import AnimationList from './animationlist/animationlist';

export default class Func1 extends Component {

  render() {
    return <AnimationList data={data} />
  }
}
const data = [{
  title: '初查受理',
  sub: [{
    title: '指定承办人',
    sub: [{
      title: '完成',
      sub: '张能涉嫌贪污'
    }, {
      title: '完成',
      sub: '张能涉嫌贪污'
    }, {
      title: '指定承办人',
      sub: [{
        title: '完成',
        sub: '张能涉嫌贪污'
      }, {
        title: '指定承办人',
        sub: [{
          title: '完成',
          sub: '张能涉嫌贪污'
        }, {
          title: '完成',
          sub: '张能涉嫌贪污'
        }, {
          title: '指定承办人',
          sub: [{
            title: '完成',
            sub: '张能涉嫌贪污'
          }, {
            title: '完成',
            sub: '张能涉嫌贪污'
          }]
        }]
      }]
    }]
  }, {
    title: '指定承办人',
    sub: [{
      title: '完成',
      sub: '张能涉嫌贪污'
    }, {
      title: '完成',
      sub: '张能涉嫌贪污'
    }]
  }]
}, {
  title: '初查受理',
  sub: [{
    title: '指定承办人',
    sub: [{
      title: '完成',
      sub: '张能涉嫌贪污'
    }, {
      title: '完成',
      sub: '张能涉嫌贪污'
    }, {
      title: '完成',
      sub: '张能涉嫌贪污'
    }]
  }]
}];