import React, { Component } from 'react';

import { Link, Route } from "react-router-dom";

import PendingOrders from './pending-orders';
import ConfirmedOrders from './confirmed-orders';
import AdminProfile from './profile';
import Stock from './stock';

import ichiroDesktopLogo from './../../images/ichiro-desktop-logo.png';


const NewOrdersMessage = ({ closeNewOrderMessage, newOrders }) => {
  if(newOrders > 0) {
    return (
        <div className="new-orders-message new-orders-fadein">
            <i class="fas fa-times close-icon" onClick={ closeNewOrderMessage }></i>
            <p className="orders-message-text">{ `You have ${ newOrders } Orders` }</p>
        </div>
    )
  } else {
      return (
          <div>
              <h1 className="admin-title">Admin Area</h1>
              <div className="new-orders-message">
              { `You have ${ newOrders } Orders` }
              </div>
          </div>
      )
  }
}

//Displays new orders sent by the customer
class NewOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newOrders: 0
        }
    }

    //Fetches new orders from server
    componentDidMount() {
        setInterval(() => {
          fetch('/neworders', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
          })
          .then((response) => {
            return response.json()
          })
          .then((response) => {   
            this.setState({ newOrders: response });    
          })
        },1000)
    }
    
    closeNewOrderMessage() {
        const message = document.querySelector('.new-orders-fadein');
        message.classList.remove('new-orders-fadein');
    }

    render() {
        return <NewOrdersMessage 
                   closeNewOrderMessage={ this.closeNewOrderMessage } 
                   newOrders={ this.state.newOrders }
               />
    }
}

const AdminNav = ({ match }) => {
    return (
        <ul className="admin-header-links-list">
            <li className="links-list-element">
                <Link to={`${match.url}/pending`} 
                      className="admin-header-nav-link"
                      title="Go to Pending orders page">Pending O</Link>
            </li>
            <li className="links-list-element">
                <Link to={`${match.url}/accepted`} 
                      className="admin-header-nav-link"
                      title="Go to accepted orders page">Accepted O</Link>
            </li>
            <li className="links-list-element">
                <Link to={`${match.url}/rejected`} 
                      className="admin-header-nav-link"
                      title="Go to rejected orders page">Rejected O</Link>
            </li>   
            <li className="links-list-element">
                <Link to={`${match.url}/stock`}
                      title="Go to Stock page" 
                      className="admin-header-nav-link">Stock</Link>
            </li>   
            <li className="links-list-element">
                <Link to={`${match.url}/profile`} 
                      className="admin-header-nav-link"
                      title="Go to profile page">Profile</Link>
            </li>       
        </ul> 
    )
}

const NestedComponent= ({ match }) => {
  return(
    <div id="admin-nested-component">
        { match.params.selection === 'pending' && <PendingOrders /> }
        { match.params.selection === 'accepted' && <ConfirmedOrders orders='acceptedorders' /> }
        { match.params.selection === 'rejected' && <ConfirmedOrders orders='rejectedorders' /> }
        { match.params.selection === 'stock' && <Stock /> }
        { match.params.selection === 'profile' && <AdminProfile /> }    
    </div>
  )  
}

const Admin = ({ match }) => {
    return (
    <div id="admin-main">
        <div className="admin-logo">
            <img className="logo-desktop-image" 
                 src={ `src/images/${ ichiroDesktopLogo }` }
                 title="Ichiro logo" 
                 alt="Ichiro-logo"/>
        </div>
        <nav className="admin-header-nav">
            <AdminNav match={ match } />
            <NewOrders />
        </nav>
        <h1 className="admin-heading">ADMIN AREA</h1>
        <Route  path={`${ match.url }/:selection` } component={ NestedComponent } />   
    </div>
  )
};


export default Admin;