import { AppDispatch } from "../index.js";
import React from "react";
import { Route, Redirect, HashRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Join from '../components/join/Join';
import Login from '../components/login/Login';
import DashBoard from '../components/dashboard/DashBoard';
import NavigationBar from "../components/common/NavigationBar";
import { Spin } from "antd";

const NavRoute = ({exact, path, component: Component}) => {
    const {globalState} = React.useContext(AppDispatch);
    const [loading, setLoading] = React.useState(false);

    return (
      <Route
        exact={exact}
        path={path}
        render={(props) => (
          <>
            {globalState.audit.login ? (
              <Spin spinning={loading}>
                {/* <NavigationBar/> */}
                <Component {...{ props, loading, setLoading}} />
              </Spin>
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            )}
          </>
        )}
      />
    );
};

const Router = () => {
  return (
    <HashRouter>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
        <NavRoute path="/dashboard" component={DashBoard}/> 
        <Route path={"/"} component={() => <Redirect to={"/login"} />} />
        <Redirect from="*" to={"/"} />
      </AnimatedSwitch>
    </HashRouter>
  );
};

export default Router;

