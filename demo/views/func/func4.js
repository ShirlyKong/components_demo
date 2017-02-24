import * as React from 'react';

import TimeTable from './timetable';

export default class Func4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
      const headers = [{title:'活动名称1',id:'name1',type:'input'},{title:'活动名称2',id:'name2',type:'input'},{title:'活动名称2',id:'name3',type:'input'},{title:'活动名称6',id:'name6',type:'input'}];
      return (
        <div>
          <TimeTable headers={headers} start='2017-02-24'/>
        </div>
      )
    };
}