import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { loadUser } from "./Redux/reducers/authReducers";
import store from "./Redux/store";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./utils/PrivateRoute";

//Setting the Header Token if it exist in the LocalStorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  //Dispatching the loadUser to get the user data and keep token in the State
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      store.dispatch(loadUser());
    }
  });

  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
