import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { tokenSelector } from './app/store/reducers/auth';
import Login from './app/components/auth/Login';
import Registration from './app/components/auth/Registration';

const App: FC = () => {
  const token = useSelector(tokenSelector);

  return (
    <Router>
      {!token && window.location.pathname !== '/registration' && <Redirect to="/login" />}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route exact path="/">
          <div>Home</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
