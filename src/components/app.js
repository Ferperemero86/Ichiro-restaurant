import React, { Component } from "react";

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home  from './main/home';
import Menu from './main/menu';
import Gallery from './main/gallery';
import ContactUs from './main/contact';
import Cart from './main/cart';
import ReviewItems from './main/review-items';
import ClientEmailStatus from './emails/client-email-status';

import Admin from './admin/admin';
import Login from './admin/login';
import AdminRessetPassword from './admin/admin-resset-password';
import TokenExpired from './admin/token-expired';



class App extends Component {

    render() {

        return (
            
            <Router>
                <Switch>
                    <Route exact path="/" component={ Home }/>
                    <Route exact path="/menu" component={ Menu } />
                    <Route exact path="/gallery" component={ Gallery } />
                    <Route exact path="/contact" component={ ContactUs } />
                    <Route exact path="/cart" component={ Cart } />
                    <Route exact path="/reviewitems" component={ ReviewItems } />
                    <Route exact path="/emailsent" component={ ClientEmailStatus } />
                    <Route exact path="/tokenexpired" component={ TokenExpired } />
                    <Route path="/admin" component={ Login(Admin) } /> 
                    <Route path="/ressetpassword/:secret/:token" component={ AdminRessetPassword } />
                </Switch>
            </Router>  
            
        );
    }
}


export default App;