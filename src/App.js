import React, { useEffect } from "react";
import "./App.css";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Checkout from "./Components/Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Login from "./Components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Components/Payment";

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("The user is" + user.uid);
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/checkout">
            <Nav />
            <Checkout />
          </Route>
          <Route exact path="/payment">
            <Nav />
            <Payment />
          </Route>
          <Route exact path="/">
            <Nav />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
