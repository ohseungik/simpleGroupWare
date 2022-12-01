
import React from "react";
import { Route, Redirect, HashRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Join from '../components/Join';
import Login from '../components/Login';

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
        <Route path={"/"} component={() => <Redirect to={"/login"} />} />
        <Redirect from="*" to={"/"} />
      </AnimatedSwitch>
    </HashRouter>
  );
};

export default Router;

