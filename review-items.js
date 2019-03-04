import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import Header from './header';
import Footer from './footer';


const EmailStatusMessage = ({ emailSent }) => {
        if (emailSent === 'true') {
            return <Redirect to={{
                       pathname: '/emailsent',
                       state: { emailSent: 'true' }
                       }}      
                   />
        } else {
            return null;
        }
}

const EmptyCartMessage = ({ cartEmpty }) => {
    if (cartEmpty === 'true') {
        return <p className="empty-cart-message">Please Add item/s to the cart.</p>
    } else {
        return null;
    }
}

const ErrorMessages = ({ emailError, emailsMatch, phoneError, phonesMatch }) => {
    return (
        <div>
            <p className={ emailError }>Email no valid</p>
            <p className={ emailsMatch }>Emails dont match</p>
            <p className={ phoneError }>Phone no valid. Insert 11 digits.</p>
            <p className={ phonesMatch }>Phone numbers dont match</p>
        </div>
    )
}

const Form = ({ validateEmail }) => {
    return (
        <div>
            <h1 className="client-form-heading">Insert your details</h1>   
            <div className="form-element"> 
                <label className="label-form">Email</label>
                <input 
                    className="user-mail input-form" 
                    type="email" 
                    name="email"/>
            </div>
            <div className="form-element">
                <label className="label-form">Phone</label>
                <input className="user-phone input-form" 
                       type="text" 
                       name="phone"/>
            </div>
            <div className="form-element"> 
                <label className="label-form">Confirm Email</label>
                <input className="user-mail2 input-form" 
                       type="email" 
                       name="email2"/>
            </div>
            <div className="form-element">
                <label className="label-form">Confirm Phone</label>
                <input className="user-phone2 input-form" 
                       type="text" 
                       name="phone2"/>
            </div>
            <button className="client-form-button" 
                    onClick={ validateEmail }>Send</button>  
        </div>
    )
}

const ClientForm = ({ 
    emailSent, 
    emailNotSent, 
    cartEmpty, 
    emailError, 
    emailsMatch, 
    phoneError, 
    phonesMatch , 
    validateEmail }) => {

    return (
        <div className="client-form">
            <EmailStatusMessage  emailSent = { emailSent } 
                                 emailNotSent = { emailNotSent } />
            <EmptyCartMessage cartEmpty = { cartEmpty } />
            <ErrorMessages emailError = { emailError} 
                           emailsMatch = { emailsMatch } 
                           phoneError = { phoneError } 
                           phonesMatch = { phonesMatch } />
            <Form validateEmail={ validateEmail }/>
        </div>
    )
}

//Returns the quantity of each item in the order
const ItemsNumber = ({ cart, item }) => {
    let index = cart.findIndex(i => i.id === item.id);
        if(index !== -1) {
            return cart[index].quantity;
        } else {
            return 0
        }
}

//Returns total amount of pounds in the order
const Total = ({ total }) => {
    return <div className="total"><p>Total: £{ total }</p></div>
}

//Returns all the items in the order
const CartItems = ({ cart }) => {
    let items = [];
    Object.keys(cart).map((key) => {
        items.push(cart[key]);
    })
    
    if (items.length > 0) {
        return items.map(item => {
            return (
                <div className="item"> 
                    <p>
                        <span className="item-field"><ItemsNumber cart={ cart } 
                                                                  item={ item } /></span>
                        <span className="item-field">{ item.name }</span>
                        <span className="item-field">£{ item.price }</span>
                    </p>
               </div>
            );
        }); 
    } else {
        return <p className="cart-empty">Your cart is empty.</p>
    } 
}

//Validates forms and displays all the items in the order
class ReviewItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            emailError:'hide-error',
            emailsMatch: 'hide-error',
            phoneError: 'hide-error',
            phonesMatch: 'hide-error',
            cartEmpty: 'false',
            orderAccepted: '',
            emailSent: '',
            total: 0
        };

        this.validateEmail = this.validateEmail.bind(this);
    }

    //Validates inputs form
    validateEmail(e) {
        e.preventDefault();

        const mailExpression =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const phoneExpression = /^(([ ]{1,5})?[0-9]{11}([ ]{1,5})?)$/;

        const mailValue = document.querySelector('.user-mail').value;
        const mailValue2 = document.querySelector('.user-mail2').value;
        const phoneValue = document.querySelector('.user-phone').value;
        const phoneValue2 = document.querySelector('.user-phone2').value;

        if ( ( mailValue.match(mailExpression )) && ( phoneValue.match(phoneExpression) ) ) {
            if( ( mailValue === mailValue2 ) && ( phoneValue === phoneValue2 ) ) {
                this.setState({ 
                    emailError: 'hide-error', 
                    phoneError: 'hide-error', 
                    emailsMatch: 'hide-error', 
                    phonesMatch: 'hide-error' 
                });
    
                const userData = {
                    mailValue,
                    phoneValue,
                    mailValue2,
                    phoneValue2 
                }

                fetch('/sendmail', {
                method: 'post',
                headers: {
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
                })
                .then((response) => { 
                    return response.json();
                })
                .then((result) => {  
                    //Email status
                    if (result.emailSent === 'true') {
                        this.setState({ emailSent: 'true'});
                    }
                    if (result.emailSent === 'false') {
                        this.setState({ emailSent: 'false'});
                    }

                    //Cart status
                    if (result.cartEmpty === 'true') {
                        this.setState({ cartEmpty: 'true'})
                    }   

                    //Form error messages
                    if ( (result.emailError === 'true') && (result.phoneError === 'true') ) {
                        this.setState({ emailError: 'show-error', phoneError: 'show-error'  });
                    }       
                    if ( (result.emailError === 'false') && (result.phoneError === 'false') ) {
                        this.setState({ emailError: 'hide-error', phoneError: 'hide-error' });
                    }  
                    if ( (result.emailError === 'true') && (result.phoneError === 'false') ) {
                        this.setState({ emailError: 'show-error', phoneError: 'hide-error' });
                    }   
                    if ( (result.emailError === 'false') && (result.phoneError === 'true') ) {
                        this.setState({ emailError: 'hide-error', phoneError: 'show-error' });
                    }
                    if ( (result.emailsMatch === 'false') && (result.phonesMatch === 'false') ) {
                        this.setState({ emailsMatch: 'show-error', phonesMatch: 'show-error' }); 
                    }
                    if ( (result.emailsMatch === 'false') && (result.phonesMatch === 'true') ) {
                        this.setState({ emailsMatch: 'show-error', phonesMatch: 'hide-error' }); 
                    }
                    if ( (result.emailsMatch === 'true') && (result.phonesMatch === 'false')) {
                        this.setState({ emailsMatch: 'hide-error', phonesMatch: 'show-error' });
                    }
                    if (result.emailNotSent === 'true') {
                        this.setState({ emailNotSent: 'true' });
                    }
                })

            //If phone and email inputs value are right but they are not well confirmated
            //Show details confirmation errors and hide phone and value error messages
            } else {
                this.setState({ emailError: 'hide-error', phoneError: 'hide-error' });
                
                if( (mailValue !== mailValue2 ) && (phoneValue !== phoneValue2) ) {
                    this.setState({ phonesMatch: 'show-error', emailsMatch: 'show-error' });

                } else {
                    if (mailValue !== mailValue2) {
                        this.setState({ emailsMatch: 'show-error' });
                    }
                    if (mailValue === mailValue2) {
                        this.setState({ emailsMatch: 'hide-error' });
                    }
                    if (phoneValue !== phoneValue2) {
                        this.setState({ phonesMatch: 'show-error' });
                    }
                    if (phoneValue === phoneValue2) {
                        this.setState({ phonesMatch: 'hide-error' });
                    }
                }       
            }

        //If phone and email values are not right handles errors
        } else {
            if( !mailValue.match(mailExpression) ) {
                this.setState({ emailError: 'show-error',  phoneError: 'hide-error' });
            }
            if( !phoneValue.match(phoneExpression) ) {
                this.setState({ phoneError: 'show-error', emailError: 'hide-error' });
            } 
            if((!mailValue.match(mailExpression) )&& !phoneValue.match(phoneExpression) ) {
                this.setState({ phoneError: 'show-error', emailError: 'show-error' });
            }
        }
    }

    ///Fetches all the items and the total in the order
    componentDidMount() {

        fetch('/reviewitems', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json'
            },
        })
        .then((response) => { 
            return response.json();
        })
        .then((result) => {   
            this.setState({ cart: result.cart, total: result.total })               
        })

    }

    render() {
        return (
            <div id="review-items-main">
                <Header />
                <div className="review-items-body">
                    <h1 className="review-items-heading">Review Items</h1>
                    <CartItems cart={ this.state.cart } />
                    <Total total={ this.state.total }/>
                    <ClientForm 
                        emailsMatch ={ this.state.emailsMatch } 
                        emailError={ this.state.emailError }
                        phoneError={ this.state.phoneError }
                        phonesMatch={ this.state.phonesMatch }
                        cartEmpty={ this.state.cartEmpty }
                        orderAccepted={ this.state.orderAccepted }
                        emailSent={ this.state.emailSent }
                        validateEmail={ this.validateEmail }
                    />      
                </div>
                <Footer />
            </div>         
        );
    }
}


export default ReviewItems;