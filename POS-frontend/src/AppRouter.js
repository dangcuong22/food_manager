import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/home";
import History from "./pages/history";
import HomeAdmin from "./pages/home_admin";
import HistoryAdmin from "./pages/history_admin";
import Login from "./pages/login";
import Register from "./pages/register";
import PrivateRoute from "./components/PrivateRoute";
// import Landing from "./components/Landing";
// import { useSelector } from "react-redux";

function AppRouter() {
  // const { tokenStatus } = useSelector((state) => state.authAPI);
  return (
    <Router>
      <div>
        <PrivateRoute exact path='/' component={Home} type='private' />
        <PrivateRoute
          exact
          path='/history'
          component={History}
          type='private'
        />
        <PrivateRoute exact path='/admin' component={HomeAdmin} type='private' />
        <PrivateRoute
          exact
          path='/history-admin'
          component={HistoryAdmin}
          type='private'
        />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    </Router>
  );
}
export default AppRouter;
