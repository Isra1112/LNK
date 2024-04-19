import React, { Fragment } from 'react';
import CalendarViews from "./views/calendar/CalenderComponent";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { jwtDecode } from "jwt-decode";
import {HashRouter as Router, Navigate , Route, Routes} from 'react-router-dom';
import LoginViews from './views/login/loginComponent';
import './App.css';


class App extends React.Component {
  // moment.locale("en-GB");
  // BigCalendar.momentLocalizer(moment);
  // const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

  routeGuard = (Component) => {
    const token = localStorage.getItem('token');
    if (token) {
      const { exp } = jwtDecode (token)
      const expirationTime = (exp * 1000) - 60000
      if (Date.now() >= expirationTime) {
        return <Navigate  to="/login"></Navigate >
      }
      else {
        return <Component />
      }

    } else {
      return <Navigate  to="/login"></Navigate >
    }
  };

    render() {
      return (
        <Fragment>
          <Router>
            <Routes>
              <Route exact path="/"
                // render={() => {
                //   return this.routeGuard(<LoginComponent />)
                // }}
                element={this.routeGuard(CalendarViews)}
                ></Route>
              <Route path="/login" element={<LoginViews />}
              ></Route>
            </Routes>
          </Router>
        </Fragment>
      )
    }
  
}



export default App;
