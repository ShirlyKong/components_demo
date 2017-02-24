import React, { Component } from 'react';
import './index.css';
/*
思考：
*/
function getPosition(ob) {
    let style = {};
    let left = 0;
    let top = ob.offsetHeight;
    let width = ob.offsetWidth + 10;
    style = { top: top, left: left, width: width };
    return style;
}
export default class Dropdown extends Component {
    static defaultProps = {
        trigger: "hover",
        className: "",
        disabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            listshow: false,
            style: { top: 0, left: 0, width: 0 },
        }
    }
    handleClick() {
        console.log("执行点击事件");
        let ob = this.refs.triggerbar;
        this.setState({
            listshow: this.state.listshow ? false : true,
            style: getPosition(ob),
        })
    }
    mouseOver() {
        console.log("执行鼠标划过事件");
        let ob = this.refs.triggerbar;
        this.setState({
            listshow: true,
            style: getPosition(ob),
        })

    }
    mouseOut() {
        this.setState({
            listshow: false,
        })
    }

    render() {
        const children = this.props.children;
        const { triggerBar, trigger, disabled } = this.props;
        return (
            <div className={'dropdown '+this.props.className} style={{zIndex:(this.state.listshow?"9":"")}}
                 onMouseOver={!disabled&&(!!(trigger==="hover")&&this.mouseOver.bind(this))}
                 onMouseOut={!disabled&&(!!(trigger==="hover")&&this.mouseOut.bind(this))}>
                <div className={"drop-trigger "+(disabled?"disabled":"")} ref="triggerbar"
                     onClick={!disabled&&(!!(trigger==="click")&&this.handleClick.bind(this))}
                     >
                    {triggerBar}
                </div>
                <div className={"drop-box "+(this.state.listshow?"open":"")} 
                        style={{top:this.state.style.top,left:this.state.style.left,minWidth:this.state.style.width}}>
                        {children}
                </div>
            </div>
        )
    };
}

export class Menuli extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openIndex: null,
        };
    }
    mouseOver(i) {
        this.setState({
            openIndex: i,
        })

    }
    mouseOut() {
        let ob = this.refs.curCname;
        this.setState({
            openIndex: null,
        })
    }
    render() {
        let that = this;
        const menulist = this.props.menulist || [];
        return <ul className="menuli">
            {menulist.map(function(s, i) {
                if(s.submenu){
                    let curCname="";
                    let ref="";
                    if(that.state.openIndex===i){
                        curCname="open";
                        ref="curUl";
                    }
                    return <li key={i} onMouseOver={that.mouseOver.bind(that,i)} onMouseOut={that.mouseOut.bind(that,i)}>
                        <span>{s.title}<i className="fa fa-angle-right"></i></span>
                        <ul ref={ref} className={curCname} >
                        {s.submenu.map(function(v, j) {
                            return <li key={j}><a href={v.url}>{v.title}</a></li>;
                        })}
                        </ul>
                    </li>
                }
                return <li key={i}><a href={s.url}>{s.title}</a></li>;
            })}
        </ul>
    }
}
