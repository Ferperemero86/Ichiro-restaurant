import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import OrderConfirmation from './pending-order-confirm';


const OrderDetails = ({ order }) => {
    
    return (
        <div className="full-order-details">
            <div className="full-order-detail">
                <span>Num. Order:</span>
                <span>{ order._id }</span>
            </div>
            <div className="full-order-detail">
                <span>Time:</span>
                <span>{ order.time }</span>
            </div>
            {
                order.order.map( item => {
                    return (
                        <div className="full-order-detail">
                            { item.quantity } { item.name } £{ item.price }
                        </div>
                    )
                })
            }
            <div className="full-order-total">
                <span>Total:</span>
                <span>£{ order.total }</span>
            </div>
        </div>
    )
}

class OrderCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ''
        }
       
      this.acceptOrder = this.acceptOrder.bind(this);
      this.rejectOrder = this.rejectOrder.bind(this);
    }
    
    rejectOrder(e) {
        e.preventDefault();
        this.setState({ status: 'rejected' });    
    }
    
    acceptOrder(e) {
        e.preventDefault();
        this.setState({ status: 'accepted' })
    }
    
    render() {
         //If status is empty, displays order details
        if(this.state.status === '') {
            return (
                <div id="full-order">
                    <h1 className="full-order-heading">Order</h1>
                       <OrderDetails
                           order ={this.props.order} /> 
                    <div className="full-order-buttons">
                        <button onClick={ this.acceptOrder } 
                                className="full-order-button">Accept</button>
                        <button onClick={ this.rejectOrder }  
                                className="full-order-button">Reject</button>
                        <Link to="/admin"
                              title="Go back" 
                              className="full-order-go-back-link">Go back</Link>
                    </div>
                </div>
            )
        }
        
        //If the order is accepted or rejected returns a order confirmation
        if(this.state.status !== '') {
            return (
               <OrderConfirmation
                   orderType={ this.props.order }
                   status={ this.state.status} 
               />
            )
        } 
    }
}

export default OrderCheck;