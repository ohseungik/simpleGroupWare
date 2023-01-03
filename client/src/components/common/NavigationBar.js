import * as api from '../../api/api';
import "./NavigationBar.scss";
import { AppDispatch } from "../../index.js";
import React from 'react';
import { useHistory } from "react-router-dom";
import { Avatar, Menu } from 'antd';

const NavigationBar = () => {
    const {globalState, dispatch} = React.useContext(AppDispatch);
    const history = useHistory();

    const Logout = async (value) => {
        await api.Logout();

        dispatch({
            type: "LOGOUT_SUCCESS"
        });   
    }

    const items = [
      {
        icon: <img src="./img/sample-logo@4x.png" className="nav-logo"></img>,
        key: "dashboard",
        onClick: (e) => {
          dispatch({
            type: "SELECT_MENU",
            payload: "dashboard"
          });

          history.push(e.key);
        },
      },
      {
        label: "근무현황 관리",
        key: "work",
        onClick: (e) => {
          dispatch({
            type: "SELECT_MENU",
            payload: "work",
          });

          history.push(e.key);
        },
      },
      {
        label: "직원 관리",
        key: "admin",
        onClick: (e) => {
          dispatch({
            type: "SELECT_MENU",
            payload: "admin",
          });

          history.push(e.key);
        },
      },
      {
        style: { marginLeft: "auto", display: "flex", alignItems: "center" },
        icon: (
          <Avatar style={{ backgroundColor: "white" }} size="default"></Avatar>
        ),
        key: "avater",
        children: [{ label: "로그아웃", key: "logout", className: "nav-logout", onClick: () => Logout()}],
      },
    ];

    return (
        <Menu className="nav-menu" mode="horizontal" theme="dark" items={items} selectedKeys={[globalState.selectMenu]}/>
    );
}

export default NavigationBar;   