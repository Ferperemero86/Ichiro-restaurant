import React from 'react';

import Header from '../main/header';
import Footer from '../main/footer';


//Displays an email confirmation
const ClientEmailStatus = (props) => { 
    let emailStatusContent = '';

    if (props.location.state.emailSent === 'true') {
        emailStatusContent = `Your order has been sent.Please wait for
                              your EMAIL ORDER CONFIRMATION. Thanks.`;
    } 
    if (props.location.state.emailSent === 'false') {
        emailStatusContent = `Something went wrong and your email was not send
                              Please try again or call us for taking your order.
                              Thanks a lot.`;           
    }

    return (
        <div id="client-email-status-main"> 
            <Header />
            <h1 className="client-email-heading">{ emailStatusContent }</h1> 
            <Footer />                      
        </div>                 
    );    
   
}

export default ClientEmailStatus;