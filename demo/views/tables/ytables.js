import React,{Component} from 'react';

import {Ytables} from 'yrui';

import {tableData} from '../../models/models';

export default class Tables extends Component {

  constructor(props){
    super(props);
  };

  render() {

    return (
      <Ytables yth={tableData.thead} ytb={tableData.tbody} editable={true} />
    );
  }
}
