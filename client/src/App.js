import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthContext from "./contexts/auth-context";
import Login from './pages/Login';
import './App.css';
import Recipes from './pages/Recipes';
import Users from './pages/Users';
import Navbar from './components/navigations/Navbar';
import LeftSideWrapper from './components/leftSideWrapper/LeftSideWrapper';

function App() {
  const [token, setToken] = useState("");
  const [adminId, setAdminId] = useState("");
  const [tokenExpiration, setTokenExpiration] = useState("");

  useEffect(() => {
    const adminInfoToken = JSON.parse(localStorage.getItem("adminInfo"));
    const adminIdLocal = JSON.parse(localStorage.getItem("adminId"));
    const tokenExp = JSON.parse(localStorage.getItem("tokenExpiration"));
    if (adminInfoToken && adminIdLocal && tokenExp) {
      setToken(adminInfoToken);
      setAdminId(adminIdLocal);
      setTokenExpiration(tokenExp);
    }
  }, []);

  const login = (token, adminId, tokenExpiration) => {
    setToken(token);
    setAdminId(adminId);
    setTokenExpiration(tokenExpiration);
  };

  const logout = () => {
    setToken("");
    setAdminId("");
    setTokenExpiration("");
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("adminId");
    localStorage.removeItem("tokenExpiration");
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          token,
          adminId,
          login,
          logout,
          tokenExpiration,
        }}
      >
        <main className="main-content">
          <Navbar />
          <div>
            {token && (
              <div className="left_side_wrapper">
                <LeftSideWrapper />
              </div>
            )}
            <Switch>
              {token && <Route path="/recipes" exact component={Recipes} />}
              {token && <Route path="/users" component={Users} />}
              {!token && <Route path="/login" component={Login} />}
            </Switch>
          </div>
        </main>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
