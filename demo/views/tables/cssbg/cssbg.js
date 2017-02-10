import React, { Component } from 'react';
import './cssbg.css';
export default class CssBg extends Component {
    render() {
        return (
            <div>
            <div className="vp20 txt">
             <ul>说明：
               <li>本页主要采用css background-image：linear-gradient()属性实现的各种背景图案, 以及切角效果。</li>
             </ul>
            </div>
      <h2>
            1.各式纹路背景css3写法
      </h2>
      <div className="box-body clearfix">
            <div className="box bg1"></div>
            <div className="box bg2"></div>
            <div className="box bg3"></div>
            <div className="box bg4"></div>
            <div className="box bg5"></div>
            <div className="box bg6"></div>
            <div className="box bg7"></div>
            <div className="box bg8"></div>
            <div className="box bg9"></div>
            <div className="box bg10"></div>
      </div>
      <br/><br/>
      <h2>
            2.复杂纹路css
      </h2>
      <br/>
      <div className="box-body clearfix">
            <div className="box bg21"></div>
            <div className="box bg22"></div>
            <div className="box bg23"></div>
            <div className="box bg24"></div>
            <div className="box bg25"></div>
            <div className="box bg26"></div>
            <div className="box bg27"></div>
            <div className="box bg28"></div>
      </div>
      <br/><br/>
      <h2>
            3.切角效果
      </h2>
      <div className="box-body clearfix">
          <div className="box q1"></div>
          <div className="box q2"></div>
          <div className="box q3"></div>
      </div>
      </div>

        )
    };
}
