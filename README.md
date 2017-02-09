# yrui-demo

#### yrui是一套基于react的UI模版，使用typescript编写、webpack构建。

### [前端知识点总结](https://github.com/ahyiru/react-ui-demo/blob/master/doc/%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E7%82%B9.md)

### 安装 `$ npm i yrui`.

## 运行demo

1. Clone this repo:
`
$ git clone https://github.com/ahyiru/yrui-demo.git
`

2. Install dependenices:
`
$ npm i
`

3. Start the project:
`
$ npm start 		//默认端口8080
`

4. 打开浏览器，访问: [http://localhost:8080/](http://localhost:8080/)


## 样式配置

### 栅格

	<div class="ycol-6">
		1~12等分
	</div>
	
### 显示隐藏

	<div class="y-show">
		y-hide,y-show
	</div>
	
### 左右浮动

	<div class="y-left">
		y-left,y-right
	</div>

### 块级内联

	<div class="y-block">
		y-block,y-inline
	</div>

### visibility

	<div class="y-clearfloat">
		y-clearfloat
	</div>
	
### 清除浮动

	<div class="y-left">
		y-left,y-right
	</div>
	
### badge

	<div class="y-badge">
		y-badge
	</div>

### button

	<div class="ybtn ybtn-info ybtn-sm">
		颜色：ybtn ybtn-default、ybtn-info、ybtn-success、ybtn-warning、ybtn-danger
		大小：ybtn ybtn-sm、ybtn-lg
		块级：ybtn ybtn-block
	</div>
	
### input

	<div class="y-input">
		y-input
	</div>
	
### switch

	<div class="y-switch">
		y-switch
	</div>

### panel

	<div class="y-panel">
		y-panel
	</div>
	
### lists

	<div class="y-lists">
		<div class="y-list-title">
		
		</div>
		<div class="y-list">
			<div class="y-list-left">
			
			</div>
			<div class="y-list-middle">
			
			</div>
			<div class="y-list-right">
			
			</div>
		</div>
	</div>
	
### colors

	.purple{color:#af5cc1 !important;}
	.green{color:#27c24c !important;}
	.red{color:#f05050 !important;}
	.yellow{color:#fad733 !important;}
	.blue{color:#23b7e5 !important;}
	.orange{color:#ff7f50 !important;}
	.gray{color:#666 !important;}
	.primary{color:#7266ba !important;}
	.success{color:#45b6af !important;}
	.danger{color:#f3565d !important;}
	.warning{color:#dfba49 !important;}
	.info{color:#24cbe5 !important;}
	.tip{color:#ff9655 !important;}
	.default{color:#999 !important;}

### animation

	左边淡入：fade-in-left;
	右边淡入：fade-in-right;
	上边淡入：fade-in-up;
	下边淡入：fade-in-down;


## 页面配置

### main页面

	<div>
   	  <Yheader />
   	  <Yaside sideBarMenu={menu} />
  	  <main>
       <section className="y-main">
         <div className="y-container">
           <YpageHeader data={data} hidePagetitle={true} />
           <div className="y-pagecontent">
             <div>{children}</div>
           </div>
         </div>  
         <YbackTop />
       </section>
 	  </main>
 	  <Ynotify notify={notify} />
    </div>

- hidePagetitle设置是否显示主页面标题，true为显示，false隐藏。

### 头部

	<header>
	  <div className="y-header">
	    <section className="y-brand">
	      <a href="javascript:;" className="brand"> 
	        <span><b>React</b> UI Demo</span>   
	      </a>
	    </section>
	    <Ynav className="y-nav" dropList={dropList} hideRightTogbar={true} login={login} />
	  </div>
	</header>

    const dropList={
      searchFlag:true,
      leftList:[{
        name:'theme',
        icon:'fa fa-cog',
        animate:'fade-in-up',
        open:'',
        items:['头部','LOGO','侧边栏','选中']
	   }],
	   rightList:[{
		  name:'msg',
		  icon:'fa fa-envelope',
    	  animate:'fade-in-left',
  		  msg:'3',
		  open:'',
	 	  items:[{
	       pic:'m1',
	       h4:'你有一条新信息',
	       p:'请注意查收 '
	     },{
	       pic:'m2',
	       h4:'你有一条新信息',
	       p:'请注意查收 '
	     },{
	       pic:'m3',
	       h4:'你有一条新信息',
	       p:'请注意查收 '
	     }]
	   },{
	     name:'tips',
	     icon:'fa fa-bell',
	     animate:'fade-in-up',
	     msg:'5',
	     open:'',
	     items:[{
	       pic:'t1',
	       h4:'你的系统有更新',
	       p:'请升级到最新版本'
	     },{
	       pic:'t2',
	       h4:'你的系统有更新',
	       p:'请升级到最新版本'
	     },{
	       pic:'t3',
	       h4:'你的系统有更新',
	       p:'请升级到最新版本'
	     }]
	   }]
	 }


- searchFlag设置是否显示搜索框，true为显示，false隐藏。

- hideRightTogbar设置是否显示右侧边栏切换按钮，true为显示，false隐藏。

- login为false时为已登录状态，头部右侧显示用户信息；未登录时login为登录注册路由，头部右侧显示登录、注册按钮。

- leftList是左边菜单，rightList为右边菜单。

- icon是显示图标。用户自定义图标：require('../styles/images/usr.jpg')，'fa fa-user'：font-awesome图标。

- animate设置下拉菜单显示方式。有`fade-in-left`、`fade-in-right`、`fade-in-top`、`fade-in-bottom`四种。

- items为下拉菜单内容。


### 侧边栏

	<aside>
   	  <YsideBar menu={this.props.sideBarMenu} userInfo={false} />
   	  <YrightBar tabs={rightbarTabs} tabList={rightbarTabLists} />
   	</aside>

- userInfo设置侧边栏显示用户信息与否，默认不显示，显示则设置userInfo为：

		let userInfo={
		  logo:require('../../styles/images/usr.jpg'),
		  name:'test',
		  email:'test@test.com'
		};
		
#### 左侧

	const sidebarMenu=[{
	  url:'/#/',
	  title:'主页',
	  leftIcon:'fa fa-home',
	  rightIcon:'fa fa-angle-right',
	  open:''
	},{
	  url:'javascript:;',
	  title:'UI设计',
	  leftIcon:'fa fa-picture-o',
	  rightIcon:'fa fa-angle-right',
	  open:'',
	  subMenu:[{
	    url:'/ui/ui1',
	    icon:'fa fa-arrow-right',
	    title:'UI设计1'
	  },{
	    url:'/ui/ui2',
	    icon:'fa fa-arrow-right',
	    title:'UI设计2'
	  },{
	    url:'/ui/ui3',
	    icon:'fa fa-arrow-right',
	    title:'UI设计3'
	  }]
	}];
	
- url为路由路径。
- subMenu设置二级菜单。

### 右侧

	const rightbarTabs=[{
	  id:'0',
	  name:'tab1',
	  tabIcon:'fa fa-weibo',
	  active:''
	},{
	  id:'1',
	  name:'tab2',
	  tabIcon:'fa fa-weixin',
	  active:''
	}]
	
- 右侧边栏是一个tab页面，可自己填充内容。如:

		const rightbarTabLists=[{
		  num:'l1',
		  pic:'l1',
		  h4:'右侧边栏是一个tab页面',
		  p:'可自己填充内容',
		  rightIcon:'fa fa-hand-o-left'
		},{
		  num:'l2',
		  pic:'l2',
		  h4:'我想起那天夕阳下的奔跑',
		  p:'那是我们逝去的青春',
		  rightIcon:'fa fa-hand-o-left'
		}]
		
### echarts

`<Yecharts option={this.state.option} style={{height: 300}} onEvents={onEvents} />`

- option 设置图表数据，见 [echarts API](http://echarts.baidu.com/api.html#echarts)。
- onEvents设置事件。如:

		let onEvents={
	      'click': this.onChartClick,
	      'legendselectchanged': this.onChartLegendselectchanged
	    };

### tables

`<Ytables yth={tableData.thead} ytb={tableData.tbody} editable={true} />`

- yth设置表头，ytb设置表格内容。二者都为数组。
- editable设置表格是否可编辑。true为可编辑，false不可编辑。

### autocomplete

###### 支持鼠标点选和键盘上下移动回车选择

`<Autocomplete data={data} title={title} />`

- title设置标题。
- data设置设置提示内容。

#### horizontal menu

添加横向菜单。在body上加上`class="horizontal"`即可。

#### 持续更新中...


![2016](https://raw.githubusercontent.com/ahyiru/react-ui-demo/master/doc/2016.png)