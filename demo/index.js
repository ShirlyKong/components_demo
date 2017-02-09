import * as React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';

import routes from './routes';

import 'font-awesome/css/font-awesome.css';

import 'yrui/lib/yrui.css';
import './styles/stheme.less';
import 'antd/dist/antd.min.css';

render(<Router history={hashHistory} routes={routes} />,document.getElementById('app'));
