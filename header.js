import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import ichiroLogo from './../../images/ichiro-logo.jpg';
import facebookIcon from './../../images/facebook-icon.png';
import instagramIcon from './../../images/instagram-icon.png';
import ichiroDesktopLogo from './../../images/ichiro-desktop-logo.png';


const MobileHeaderNav = () => {

    const closeNav = () => {

        const headerElement = document.querySelector('#header-main');
        headerElement.classList.remove('header-main-display');

        const navElement = document.querySelector('.header-nav');
        navElement.classList.remove('header-nav-display');

        const bars = document.querySelector('.bars');
        const socialMedia = document.querySelector('.social-media');
        const basket = document.querySelector('.basket');

        bars.classList.remove('hidden');
        socialMedia.classList.remove('hidden');
        basket.classList.remove('hidden');
    }

    return (
        <nav className="header-nav">
            <ul className="header-nav-list">
                <li className="close-menu">
                    <i className="fas fa-times bars-icon" 
                       onClick={ closeNav }></i>
                </li>
                <li className="list-element">
                    <Link className="list-element-link"
                          title="Go to Home page" 
                          to="/">Home</Link>
                </li>
                <li className="list-element">
                    <Link className="list-element-link"
                          title="Go to Menu page"  
                          to="/menu">Menu</Link>
                </li>
                <li className="list-element">
                    <Link className="list-element-link"
                          title="Go to Gallery page"  
                          to="/gallery">Gallery</Link>
                </li>
                <li className="list-element">
                    <Link className="list-element-link"
                          title="Go to Contact page"  
                          to="/contact">Contact</Link>
                </li>
                <li className="list-element">
                    <Link className="list-element-link"
                          title="Go to Cart page"  
                          to="/cart">
                        <i className="fas fa-shopping-basket"></i></Link>
                </li>
            </ul>
        </nav>
    )
}

const MobileHeader = ({ cartItemsNumber }) => {
    const showNav = () => {

        const headerElement = document.querySelector('#header-main');
        headerElement.classList.add('header-main-display');

        const navElement = document.querySelector('.header-nav');
        navElement.classList.add('header-nav-display');

        const bars = document.querySelector('.bars');
        const socialMedia = document.querySelector('.social-media');
        const basket = document.querySelector('.basket');

        bars.classList.add('hidden');
        socialMedia.classList.add('hidden');
        basket.classList.add('hidden');
    }
    
    //Hides Main Logo and sets the nav in fixed position
    window.onscroll = function() {scrollFunction()};

    const scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

            if (document.querySelector(".logo") !== null) {
                document.querySelector(".logo").style.display = "fixed";
                document.querySelector(".header").style.position = "fixed";
            }
            
        } else {
            if (document.querySelector(".logo") !== null) {
                document.querySelector(".logo").style.display = "block";
                document.querySelector(".header").style.position = "static";
            }
        }
    }

    return (
        <header className="header"> 
            <img src={`src/images/${ichiroLogo}`} className="logo" />
            <div className="bars">
                <i className="fas fa-bars bars-icon" 
                   onClick={ showNav }></i>
            </div>
            <div className="social-media">
                <a href="https://www.facebook.com/IchiroLond0n">
                    <img src={`src/images/${facebookIcon}`} className="header-social-icon" />
                </a>
                <a href="https://www.instagram.com/ichirolondon/?hl=en">
                    <img src={`src/images/${instagramIcon}`} className="header-social-icon" />
                </a>
            </div>
            <div className="basket">
                <Link to="/cart"
                      title="Go to Cart page" 
                      className="basket-link">
                      <i className="fas fa-shopping-basket"></i> 
                      <span className="cart-items-number"><p className="number">{ cartItemsNumber }</p></span>
                </Link> 
            </div>
            <MobileHeaderNav />
        </header>
    )
}

const DesktopHeaderNav = ({ cartItemsNumber }) => {

    return (
        <nav className="header-nav-desktop">
            <ul className="header-nav-list-desktop">
                <li className="list-element-desktop">
                    <Link to="/"
                          title="Go to Home page" 
                          className="list-element-link-desktop">Home</Link>
                </li>
                <li className="list-element-desktop">
                    <Link to="/menu"
                          title="Go to Menu page"  
                          className="list-element-link-desktop">Menu</Link>
                </li>
                <li className="list-element-desktop">
                    <Link to="/gallery"
                          title="Go to Gallery page"  
                          className="list-element-link-desktop">Gallery</Link>
                </li>
                <li className="list-element-desktop">
                    <Link to="/contact"
                          title="Go to Contact page"  
                          className="list-element-link-desktop">Contact</Link>
                </li>
                <li className="list-element-desktop">
                    <Link to="/cart"
                          title="Go to Cart page"  
                          className="basket-link-desktop">
                        <i className="fas fa-shopping-basket"></i>
                        <span><p className="number">{ cartItemsNumber }</p></span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

const DesktopHeader = ({ cartItemsNumber }) => {
    return (
        <header className="header-desktop">
            <div className="logo-desktop">
                <img src={`src/images/${ichiroDesktopLogo}`} className="logo-desktop-image" />
            </div>
            <div className="social-icons-desktop">
                <a href="https://www.facebook.com/IchiroLond0n">
                    
                </a>
                <a href="https://www.instagram.com/ichirolondon/?hl=en">
                    
                </a>  
            </div>
            <DesktopHeaderNav cartItemsNumber={ cartItemsNumber } />
        </header>
    )
}

class Header extends Component {
    constructor(props) {
        super(props);

        this.state= {
            cartItems: '',
            itemsNumber: 0
        }
    }
    
    //Fetches the cart items from the server every second
    //Keeps the cart items updated instantly
    componentDidMount() {
        fetch('/header', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        })       
        .then((response) => {
            return response.json()
        })
        .then((response) => {   
            const parsedCart = JSON.parse(JSON.stringify(response.cart));
            this.setState({ cartItems: parsedCart });    
        })
    }

    //Loops through the cartItems and returns  the total number of items
    itemsNumber() {
        let totalItems = 0;

        if( this.props.itemsNumber >= 0) {
            totalItems = this.props.itemsNumber;
            return totalItems;
        } else {
            if (this.state.cartItems) {
                this.state.cartItems.map((item) => {
                    totalItems += item.quantity;
                })
                return totalItems
    
            } else {
                return  0;
            }
        }
    }

    render() {
        return ( 
            <div id="header-main">
                <MobileHeader cartItemsNumber={ this.itemsNumber() } />
                <DesktopHeader cartItemsNumber={ this.itemsNumber() } />
            </div> 
        )
    }
}


export default Header;