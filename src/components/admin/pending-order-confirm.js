import React, { Component } from 'react';

import { Link} from 'react-router-dom';


//Returns the email status
const EmailSent = ({ status }) => {
    if (status === 'accepted') {
        return (
            <div className="confirmation-email-main"> 
                <h1 className="confirmation-email-heading">Order Accepted email sent to the client!</h1>
                <Link to='/admin'
                       title="Go back" 
                      className="confirmation-email-go-back-link">Go to Main Page</Link>                         
            </div>                     
        );
    } else {
        return (
            <div className="order-confirmation-email-main"> 
                <h1 className="order-confirmation-email-heading">Order Rejected email sent t the client!</h1> 
                <Link to='/admin' 
                      title="Goto Main Page"
                      className="order-confirmation-email-go-back-link">Go to Main Page</Link>                             
            </div>                     
        );
    }     
}

//Returns a email error
const EmailNotSent = () => {
    return (
        <div className="confirmation-email-error"> 
            <h1 className="confirmation-email-error-header">ERROR! Something went wrong and the email confirmation was
                                                            not sent to the client. Please call the customer to 
                                                            confirm the order and the Developer to fix this problem.
                                                            Thanks.</h1>
            <Link to='/admin'
                  title="Go to Main page">Go to Main Page</Link>                           
        </div>                     
    );   
}

const Confirmation = ({ status, emailSent, orderType, acceptOrder, rejectOrder }) => {
    let orderStatus = '';
    let orderTypeFunction = '';
  
    if (emailSent === '') {
        status === 'accepted' ? orderStatus = 'accept' : orderStatus = 'reject';
        status === 'accepted' ? orderTypeFunction = acceptOrder : orderTypeFunction = rejectOrder;

        return (
            <div className="confirm-order-main">
                <h1 className="confirm-order-heading">Order Confirmation</h1>
                <h1 className="confirm-order-heading">Are you sure you want to { orderStatus } this order ?</h1>
                <button onClick={ (e) => orderTypeFunction(e, orderType) } 
                        className="confirm-order-button">Accept</button>
                <Link to="/admin"
                      title="Go back" 
                      className="confirm-order-go-back-link">Go back</Link>
            </div>
        )
    }

    if (emailSent === 'true') {
        return (
            <EmailSent status= 'accepted' />
        )           
    }

    if (emailSent === 'false') {
        return (
            <EmailNotSent status= 'rejected'/>
        )           
    }
}

//Handles the user's order
class OrderConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSent: ''
        }

        this.acceptOrder = this.acceptOrder.bind(this);
        this.rejectOrder = this.rejectOrder.bind(this);
    }
    
    //Accepts order and fetches email status
    acceptOrder(e,acceptedOrder) {
        e.preventDefault();    
        const order = {
            acceptedOrder: acceptedOrder
        }
        fetch('/acceptedorder', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })  
        .then((response) => { 
            return response.json();
        })
        .then((result) => {
            this.setState({ emailSent: result})            
        }) 
    }

    //Rejects order and fetches email status
    rejectOrder(e,rejectedOrder) {
        e.preventDefault();    
        const order = {
            rejectedOrder: rejectedOrder
        }
        fetch('/rejectedorder', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })  
        .then((response) => { 
            return response.json();
        })
        .then((result) => {
            this.setState({ emailSent: result})             
        }) 
    }

    render() {
        return (
            <Confirmation 
                status={ this.props.status } 
                emailSent={ this.state.emailSent } 
                orderType={ this.props.orderType }
                acceptOrder={ this.acceptOrder }
                rejectOrder={ this.rejectOrder }
            />
        )
    }
}


export default OrderConfirmation;