import * as React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';
const Base = require('./base').default;

import {
    Home,
    Func1,
    Func2,
    Func3,
    Func4,
    UI1,
    UI2,
    UI3,
    Plugin1,
    Plugin2,
    Plugin3,
    Plugin4,
    Tables,
    Datatables,
    BStables,
    Highcharts,
    Echarts,
    Recharts,
    Easypie,
    Yform,
    Log,
    ErrorPage,
    Testkxl,
    TestEditor,
} from './views';

export default (
    <Route path="/" component={Base}>

    <IndexRoute component={Home} />

    <Route path="function/function1" component={Func1} />
    <Route path="function/function2" component={Func2} />
    <Route path="function/function3" component={Func3} />
    <Route path="function/function4" component={Func4} />
  
    <Route path="ui/ui1" component={UI1} />
    <Route path="ui/ui2" component={UI2} />
    <Route path="ui/ui3" component={UI3} />
  
    <Route path="plugins/plugin1" component={Plugin1} />
    <Route path="plugins/plugin2" component={Plugin2} />
    <Route path="plugins/plugin3" component={Plugin3} />
    <Route path="plugins/plugin4" component={Plugin4} />
  
    <Route path="tables/yTables" component={Tables} />
    <Route path="tables/datatables" component={Datatables} />
    <Route path="tables/bstables" component={BStables} />
    <Route path="tables/testkxl" component={Testkxl} />
     <Route path="tables/testeditor" component={TestEditor} />
    <Route path="charts/highcharts" component={Highcharts} />
    <Route path="charts/echarts" component={Echarts} />
    <Route path="charts/recharts" component={Recharts} />
    <Route path="charts/easypie" component={Easypie} />

    <Route path="form/yform" component={Yform} />

    <Route path="/log" component={Log} />

    <Route path="/404" component={ErrorPage} />

    <Route path="*" onEnter={(params,replace)=>replace('/404')} />

  </Route>
);
