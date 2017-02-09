import * as React from 'react';

import './animationlist.css';

const hasClass=(target,cname)=>{
  return target.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')); 
};

const addClass=(target,cname)=>{
  var nameArr=cname.split(' ');
  nameArr.map((v,k)=>{
    if(!!v&&!hasClass(target,v)){
      target.className+=' '+v;
    }
  });
};

const removeClass=(target,cname)=>{
  var nameArr=cname.split(' ');
  nameArr.map((v,k)=>{
    if(!!v&&hasClass(target,v)){
      // var reg=new RegExp('(\\s|^)'+v+'(\\s|$)');
      var reg=new RegExp('(\\s|^)'+v);
      target.className=target.className.replace(reg,'');
    }
  });
};

export default class AnimationList extends React.Component {
    componentDidMount(){
      const aUl=this.refs.tree.getElementsByTagName("ul")
      for(let i = 0;i<aUl.length;i++){
        aUl[i].dataHeight = aUl[i].offsetHeight;
        aUl[i].style.height = 0 + 'px';
      }
      for(let i = 0; i < this.refs.tree.childNodes.length ;i++ ){
        this.refs.tree.childNodes[i].style.width = 50 * (this.getdeep(this.props.data) + 3) + 'px';
      }
    }
    getdeep(json) {
      let arr = [];
      arr.push(deepnum(json, 0));
      function deepnum(json, deep) {
        for (let i in json) {
          if (typeof(json[i].sub) == 'object') {
            arr.push(deepnum(json[i].sub, deep + 1));
          }
        }
        return deep;
      }
      return Math.max.apply(null,arr);
    }
    handleClick(e){
      clearTimeout(this.timer);
      const oUl = e.target.parentNode.parentNode.getElementsByTagName("ul")[0];
      if(oUl.style.height == '0px'){
        oUl.style.height = oUl.dataHeight + 'px';
        removeClass(oUl,'closeing');
        addClass(oUl,'opening');
      }else{
        removeClass(oUl,'opening')
        addClass(oUl,'closeing');
        this.timer = setTimeout(e=>(oUl.style.height = 0),400)
      }
    }
    getList(data){
      function truefalse(v){
        return typeof(v.sub) === "object"
      }
      return data.map((v,i)=><li key={i} className={truefalse(v)?"parent_li":""}>
        <div className="textbox"><span className="btn" onClick={e=>{if(truefalse(v)){this.handleClick(e)}}}>{typeof(v.sub) === "string" ? v.sub : ""}</span> <div className="text">{v.title}</div></div>
        {truefalse(v) ? <ul>{this.getList(v.sub)}</ul> : ""}
        </li>)
    }
    render() {
      const { data } = this.props;
      return (
        <div className="tree">
          <ul ref="tree" className="rootul">
            {this.getList(data)}
          </ul>
        </div>
      )
    };
}