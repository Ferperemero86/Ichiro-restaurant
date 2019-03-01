import React, { Component } from "react";

import { Link } from 'react-router-dom';

import Header from './header';
import Footer from './footer';


//Returns the total amount of the order
const Total = ({ cart }) => {
    const parsedCart = JSON.parse(JSON.stringify(cart));
    let total = 0;

    parsedCart.map(item => {
      total += (item.price * item.quantity)
    })

    return <div className="total"><p>Total: £{total}</p></div>
}

//Returns the quantity of items for each item in the order
const ItemsNumber = ({ item, cart }) => {
    let index = cart.findIndex(i => i.id === item.id);

        if (index !== -1) {
            return cart[index].quantity;
        } else {
            return 0
        }
}

//Returns the item elements added to the cart
const CartItems = ({ cart, addItem, removeItem, removeAllItems }) => {
    let items = [];

    Object.keys(cart).map((key) => {
        items.push(cart[key])
    })

    if (items.length > 0) {
        return items.map(item => {
            return (
                <div className="item"> 
                    <span className="item-field">     
                    <ItemsNumber
                        cart = { cart }
                        item = { item }
                    />      
                    </span>
                    <span className="item-field">{ item.name }</span>
                    <span className="item-field">£{ item.price }</span>
                    <button 
                        className="item-button" 
                        onClick={ ()=>addItem(item) }>+</button>
                    <button 
                        className="item-button" 
                        onClick={ ()=>removeItem(item) }>-</button>
                    <button 
                        className="item-button" 
                        onClick={ ()=>removeAllItems(item) }>
                            <i className="fas fa-trash"></i>
                    </button>
                </div>
            );
        }); 
    } else {
        return <div className="item"><p>Cart empty</p></div>
    }
}

//Displays the cart items and total
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state =  { cart: [], totalPrice: 0 }

        this.fetchData = this.fetchData.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.removeAllItems = this.removeAllItems.bind(this);
    }

    addItem (item) {
        const addItem = {
            addItem: item
        }

        this.fetchData(addItem);
    }
    
    removeItem (item) { 
        const removeItem = {
            removeItem: item
        }
        
        this.fetchData(removeItem); 
    }
    
    removeAllItems(item) {
        const removeAllItems = {
            removeAllItems: item
        }
        
        this.fetchData(removeAllItems);
    }
    
    //Fetches all the new cart items and updates data
    fetchData(cart) { 
      
        fetch('/cart', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        })

        .then((response) => { 
            return response.json();
        })
        .then((result) => {     
            this.setState({ cart: result.cart, totalPrice: result.totalPrice });
        }) 

    }

    //Fetches the initial cart items
    componentDidMount() {

        fetch('/cart', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json'
            },
        })
        .then((response) => { 
            return response.json();
        })
        .then((result) => {
            this.setState({ cart: result.cart, totalPrice: result.totalPrice });          
        })

        this.fetchData(); 

    }
    
    render() {
        return (
            <div id="cart-main">
                <Header /> 
                <div className="cart-body">
                    <h1 className="cart-heading">Cart</h1>
                    <CartItems 
                        cart = { this.state.cart }
                        addItem = { this.addItem }
                        removeItem = { this.removeItem }
                        removeAllItems = { this.removeAllItems }
                    />
                    <Total cart = { this.state.cart } />
                    <Link className="check-out-link" 
                          title="go to check out"
                          to="/reviewitems">Check Out</Link> 
                </div>
                <Footer />          
            </div>                     
        );
    } 
}


export default Cart;