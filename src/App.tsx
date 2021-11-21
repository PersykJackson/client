import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { tokenSelector } from './app/store/reducers/auth';
import Login from './app/components/auth/Login';
import Registration from './app/components/auth/Registration';
import StreamList from './app/components/stream/StreamList';
import StreamPage from './app/components/stream/StreamPage';
import './assets/css/index.css';

const App: FC = () => {
  const token = useSelector(tokenSelector);

  return (
    <Router>
      {!token && window.location.pathname !== '/registration' && <Redirect to="/login" />}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route exact path="/streams" component={StreamList} />
        <Route path="/streams/:id" component={StreamPage} />
      </Switch>
    </Router>
  );
};

export default App;
