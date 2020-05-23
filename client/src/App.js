import React, { useState, useCallback } from 'react';
import {
  BrowserRouter,
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import CitiyInfo from './places/pages/CityInfo';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import history from './history';

const App = () => {
  const hasToken = !!localStorage.getItem('access_token');
  const [isLoggedIn, setIsLoggedIn] = useState(hasToken);
  const [userId, setUserId] = useState(false);

  const login = useCallback((user,token) => {
    localStorage.setItem('access_token',`Bearer ${token}`);
    setUserId(user.id);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.setItem('access_token','');
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  const routes = (
    <Switch>
      <Route path="/cities" exact>
        <CitiyInfo />
      </Route>
      <Route path="/login">
        <Auth />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <BrowserRouter>
        <Router history={history}>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
