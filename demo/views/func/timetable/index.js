import * as React from 'react';
import { Table, Input, Button } from 'antd';
import moment from 'moment';

import './index.css';

export default class TimeTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data :[],
            start:moment(props.start),
            num:0,
        }
    }
    handleChange(k,i,v){
      let data = this.state.data;
      data[k][i] = v;
      this.setState({
        data
      })
    }
    addRow(){
      let data = this.state.data;
      let headers = this.props.headers;
      let json = {};
      for(let i in headers){
        json[headers[i]] = '';
      }
      json.dataList=[];
      data.push(json);
      this.setState({
        data
      })
    }
    dateListToggle(i,d){
      let data = this.state.data;
      if(data[i].dataList.includes(d)){
          data[i].dataList.removeByValue(d);
      }else{
         data[i].dataList.push(d);
      }
      this.setState({
        data
      })
    }
    render() {
      const props = this.props;
      const data = this.state.data;
      let columns = props.headers.map(v=>({
        title:v.title,
        key:v.id,
        render:(text, record, index)=>{
          switch(v.type){
            case 'input':
            return  <Input 
                      onChange={e=>this.handleChange(index,v.id,e.target.value)}
                      value={data[record.key][v.id]}
                    />
          }
        }
      }));
      const start = this.state.start.clone();
      for(let i=0; i<10; i++){
        let starts = start.format('YYYY-MM-DD');
        start.add(1,'days');
        columns.push({
          title:starts,
          key:starts,
          render:(text, record, index)=>{
            const className =  data[index]['dataList'].includes(starts) ? 'date-selected date-s' : 'date-unselected date-s';
            return <div className={className} onClick={()=>this.dateListToggle(index,starts)}></div>
          }
        })
      }
      const dataSource = this.state.data.map((v,i)=>({key:i}));
      return (
        <div>
          <Table columns={columns} dataSource={dataSource} pagination={false}/>
          <Button onClick={e=>{this.addRow()}}>增加一行</Button>
        </div>
      )
    };
}

Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}