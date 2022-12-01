import React from "react";
import ReactDOM from 'react-dom';

import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';

// import 'antd/dist/antd.css';
import "moment/locale/ko";
import moment from 'moment';

import Router from './router/Router.js';

moment.locale('ko');

export const App = () => {  
    return (
      <>
        <Router />
      </>
    );
}

ReactDOM.render(<ConfigProvider locale={koKR}><App/></ConfigProvider>, document.getElementById('root'));
