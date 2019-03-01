import React, { Component } from "react";

import Header from './header';
import Footer from './footer';


//Returns the quantity of a specific item
const ItemsNumber = ({ cart, item }) => {
   
    let index = cart.findIndex(i => i.id === item.id);
    if (index !== -1) {
        return <span className="item-quantity">{ cart[index].quantity }</span>
    } else {
        return <span className="item-quantity">0</span>
    }
}

const Item = ({ items, cart, addItem, removeItem }) => {
    return items.map(item => {  
        return (
            <div className="menu-item">
                <ul className="menu-item-list">
                    <li className="item-list-field menu-item-name">
                        <span>{ item.name }</span>
                    </li>
                    <li className="item-list-field menu-item-description">
                       <span>{ item.description }</span> 
                    </li>
                    <li className="item-list-field menu-item-price">
                        <span>£{ item.price }</span>
                    </li>
                    <li className="item-list-field menu-item-buttons">
                           { item.outStock !== 'true' && <button 
                                                             className="menu-item-button" 
                                                             onClick={ ()=>removeItem(item) }>-</button> }
                           { item.outStock === 'true' && <button 
                                                             className="menu-item-button hidden" 
                                                             onClick={ ()=>removeItem(item) } 
                                                             disabled>- </button> }
                        <span className="items-number">{ item.outStock !== 'true' && <ItemsNumber 
                                                             cart = { cart } 
                                                             item = { item }/> }</span>
                        { item.outStock !== 'true' && <button 
                                                          className="menu-item-button" 
                                                          onClick={ ()=>addItem(item) }>+</button> }                              
                        { item.outStock === 'true' && <button className="menu-item-button hidden" 
                                                              onClick={ ()=>addItem(item) } 
                                                              disabled>+ </button> }             
                    </li>
                    <li className="item-list-field">
                        { item.outStock === 'true' && <span className="item-out-stock">Unavailable</span> }
                    </li>
                </ul>  
            </div>        
        )      
    })
}

//Displays all the menu items
const MenuItems = ({ items, cart, addItem, removeItem }) => {
    if (Object.keys(items).length > 0) {
        
        return Object.keys(items).map((key) => {
            return (
                <div className="menu-section">
                    <h3 className="menu-section-heading">{ key }</h3>
                    <Item 
                        items={ items[key] }
                        cart={ cart }
                        addItem={ addItem }
                        removeItem={ removeItem }
                    />
                </div>
            )
        })
    } else {
        return null;
    }
}

//Returns the list of items that the client order
const MenuItemsList = ({ cart, itemsList, removeItem, addItem }) => {
   
    let items = {};

    //Loops through the cart items and stores them in items array
    Object.keys(itemsList).map((key) => {
       
        if (!items[itemsList[key].type]) {
            items[itemsList[key].type] = [];
        }
        if (items[itemsList[key].type]) {
            items[itemsList[key].type].push(itemsList[key]);
        }
    })

    return (
        <div className="menu-order-type">
        <MenuItems 
            items={ items }
            cart={ cart }
            addItem={ addItem }
            removeItem={ removeItem }
        />
        </div>
    )
}

//Displays all the products
class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            cart: [], 
            itemsList: '' 
        }

        this.fetchData = this.fetchData.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
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

    //Updates the items in the client's cart
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
            this.setState({ cart: result.cart })            
        })
           
    }
    
    //Fetches all the initial items for order
    componentDidMount() {

        fetch('/products', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {   
            this.setState({ itemsList: response });    
        })

        this.fetchData()    
        
    }

    render() { 
        return (      
            <div id="menu-main">
                <Header />
                <div className="menu-body"> 
                    <h1 className="menu-heading">Menu List</h1>
                    <MenuItemsList
                        cart = { this.state.cart }
                        itemsList = { this.state.itemsList }
                        page = { this.props.page }
                        removeItem = { this.removeItem }
                        addItem = { this.addItem }  
                    />
                </div>
                <Footer />         
            </div>  
        );
    }
}


export default Menu;
