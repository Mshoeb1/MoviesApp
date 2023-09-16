import {Route, Switch, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import AccountRoute from './components/AccountRoute'
import HomeRoute from './components/HomeRoute'
import MovieItemDetailsRoute from './components/MovieItemDetailsRoute'
import PopularRoute from './components/PopularRoute'
import SearchRoute from './components/SearchRoute'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/account" component={AccountRoute} />
    <ProtectedRoute exact path="/popular" component={PopularRoute} />
    <ProtectedRoute exact path="/search" component={SearchRoute} />
    <ProtectedRoute
      exact
      path="/movies/:id"
      component={MovieItemDetailsRoute}
    />
    <Route path="/not-found" component={NotFoundRoute} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
