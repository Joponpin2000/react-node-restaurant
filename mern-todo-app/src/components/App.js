import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header';
import Home from './Home';
import ProductScreen from './ProductScreen';
import Login from './Login';
import Signup from './Signup';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import NotFound from './NotFound';
import CartScreen from './Cart';
import Shipping from './Shipping';
import Payment from './Payment';
import PlaceOrder from './PlaceOrder';
import Receipt from './Receipt';
import Footer from './Footer';
import Callback from './Callback';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/shipping" component={Shipping} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/placeorder" component={PlaceOrder} />
          <Route exact path="/payment/verify/:reference?" component={Callback} />
          <Route exact path='/payment-success/:id' component={Receipt} />
          <UserRoute exact path="/user/dashboard" component={UserDashboard} />
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </Router>
    );
  }
}

export default App;