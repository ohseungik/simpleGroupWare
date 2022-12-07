import React from "react";
import ReactDOM from 'react-dom';
import "./index.scss";

import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';

// import 'antd/dist/antd.css';
import "moment/locale/ko";
import moment from 'moment';
import Router from './router/Router.js';

moment.locale('ko');

export const config = {
  serverURL: "http://192.168.0.195:1234"
}

const initialState = {
  selectMenu: "",
  audit: {
      login: false,
  }
};

function reducer(state, action) {
  switch(action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          selectMenu: "dashboard",
          audit: {
            login: true
          }
        };
      case 'LOGOUT_SUCCESS':
        return initialState;
        

      case 'SELECT_MENU':
        return {
          ...state,
          selectMenu: action.payload
        };
        
      default:
        return state;
  }
}

const initializer = (initialValue = initialState) => {
  return JSON.parse(localStorage.getItem('simpleGroupWare_state')) || initialValue;
}

export const AppDispatch = React.createContext(undefined);

export const App = () => {  
    const [state, dispatch] = React.useReducer(reducer, initialState, initializer);

    React.useEffect(() => {
        localStorage.setItem('simpleGroupWare_state', JSON.stringify(state));
    }, [state]);

    return (
      <AppDispatch.Provider value={{globalState:state, dispatch:dispatch}}>
        <Router/>
      </AppDispatch.Provider>
    );
}

ReactDOM.render(<ConfigProvider locale={koKR}><App/></ConfigProvider>, document.getElementById('root'));
