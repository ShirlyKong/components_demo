import React,{Component} from 'react';

import {YpageHeader,YbackTop,Ynotify,Ytools,YsideBar,YrightBar,Ynav} from 'yrui';

import {sidebarMenu,notifyList,rightbarTabs,rightbarTabLists,dropList} from './models/models';

var getCurrent=Ytools.getCurrent;
var getBreadcrumb=Ytools.getBreadcrumb;
var addClass=Ytools.addClass;

if(navigator.cookieEnabled){
  let theme=localStorage.getItem('theme')||'';
  addClass(document.body,theme);
  let collapse=localStorage.getItem('collapse')||'';
  addClass(document.body,collapse);
}
else{
  console.log('你处于隐私模式!');
}

export default class Yframe extends Component {
	constructor(props){
    super(props);
    this.str=location.hash.match(/#(\S+)\?/)||location.hash.match(/#(\S+)/);

    let menu=getCurrent(sidebarMenu,this.str);
    let breadcrumb=getBreadcrumb(sidebarMenu,this.str);
    this.state=({
      menu:menu,
      breadcrumb:breadcrumb,
      notify:notifyList
    });

    window.addEventListener('hashchange',this.hashChg,false);
  };

  //hashchange
  hashChg=()=>{
    document.documentElement.scrollTop?(document.documentElement.scrollTop=0):(document.body.scrollTop=0);
    let str=location.hash.match(/#(\S+)\?/)||location.hash.match(/#(\S+)/);
    let menu=getCurrent(sidebarMenu,str);
    let breadcrumb=getBreadcrumb(sidebarMenu,str);
    this.setState({
      menu:menu,
      breadcrumb:breadcrumb
    });
  }

  componentWillUnmount=()=>{
    window.removeEventListener('hashchange',this.hashChg,false);
  };

  render() {
  	const {children}=this.props;
  	const {breadcrumb,menu,notify}=this.state;
    return (
      <div>
        <header>
          <div className="y-header">
            <section className="y-brand">
              <a href="javascript:;" className="brand"> 
                <span><b>React</b> UI Demo</span>   
              </a>
            </section>
            <Ynav className="y-nav" dropList={dropList} />
          </div>
        </header>
        <aside>
          <YsideBar menu={menu} />
          <YrightBar tabs={rightbarTabs} tabList={rightbarTabLists} />
        </aside>

        <main>
	        <section className="y-main">
	          <div className="y-container">
	            
              <YpageHeader breadcrumb={breadcrumb} hidePagetitle={false} />

	            <div className="y-pagecontent">
	              <div>{children}</div>
	            </div>

	          </div>
	          
	          <YbackTop />

	        </section>
	      </main>

        <Ynotify notify={notify} />
      </div>
    );
  }
}
