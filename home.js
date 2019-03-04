import React from 'react';

import { Link } from 'react-router-dom';

import Header from './header';
import Footer from './footer';

import homePhoto2 from './../../images/home-photo-2.jpg';
import chefBalong from './../../images/chef-balong.jpg';
import deliveroo from './../../images/deliveroo.png';
import mainImage from './../../images/home-main.jpg';
import desktopMainImage from './../../images/desktop-home-main.jpg';
import firstGalleryImage from './../../images/first.jpg';
import secondGalleryImage from './../../images/second.jpg';
import thirdGalleryImage from './../../images/third.jpg';
import ichiroCollection from './../../images/ichiro-collection.png';



const MainImage = () => {
    return (
        <div className="main-image">
            <img  className="main-image-element"
                  alt="Delicious sushi" 
                  title="Delicious sushi" 
                  src={ `src/images/${ mainImage }` }/> 
            <img  className="main-image-element-desktop"
                  alt="Delicious sushi" 
                  title="Delicious sushi"  
                  src={ `src/images/${ desktopMainImage }` } /> 
        </div>
    )
}

const WelcomeText = () => {
    return (
        <div className="welcome-text">
            <h1 className="welcome-heading">Welcome to Ichiro</h1>

            <div className="welcome-photo">
                <img className="welcome-photo-image"
                     alt="Chef Balong" 
                     title="Chef Balong"  
                     src={ `src/images/${ chefBalong }` } /> 
            </div>
            <div className="welcome-paragraph">
                <p className="welcome-paragraph-text">Welcome to one of the best sushi restaurants in London.
                                                      Located in a wonderfull and convinient area like Hammersmith, 
                                                      its chef Balong offers maximum quality and dedication to the 
                                                      customers like no one in the city.</p>
            </div>
            <div className="welcome-photo">
                <img className="welcome-photo-image"
                     alt="Delicious sushi image" 
                     title="Delicious sushi image"  
                     src={ `src/images/${ homePhoto2 }` } /> 
            </div>
            <div className="welcome-paragraph">
                <p className="welcome-paragraph-text">Our menu is plenty of choices and the prices are reasonable.
                                                      We are family friendly and we offer an amazing enviroment that
                                                      will make you enjoy your day for sure!</p>
            </div>
        </div>
    )
}

const OrderLinks = () => {
    return (
        <div className="order-links">
            <div className="order-link">
                <h3 className="order-link-heading">Order for collection</h3>
                <Link to="/menu"
                      title="Go to Menu"><img src={ `src/images/${ ichiroCollection }` }
                                              alt="Ichiro logo" 
                                              title="Ichiro logo"  
                                              className="order-link-image" /></Link>
            </div>
            <div className="order-link">
                <h3 className="order-link-heading">Order to take away</h3>
                <a href="http://www.deliveroo.com"
                   totle="Go to  Deliveroo"><img src={ `src/images/${ deliveroo }` }
                                                        alt="Deliveroo logo" 
                                                        title="Delveroo logo"  
                                                        className="order-link-image" /></a>
            </div>
        </div>
    )
}

const HomeGallery = () => {
    return (
        <div className="home-gallery">
            <div className="home-gallery-image">
                <img  className="home-gallery-image-element" 
                      alt="Delicious sushi" 
                      title="Delicious sushi" 
                      src={`src/images/${ firstGalleryImage }` } /> 
            </div>
            <div className="home-gallery-image">
                <img  className="home-gallery-image-element"
                      alt="Delicious sushi" 
                      title="Delicious sushi"  
                      src={ `src/images/${ secondGalleryImage }` } 
                /> 
            </div>
            <div className="home-gallery-image">
                <img  className="home-gallery-image-element"
                      alt="Delicious sushi" 
                      title="Delicious sushi"  
                      src={ `src/images/${ thirdGalleryImage }` } 
                /> 
            </div>
            <div className="home-gallery-links">
               <Link className="home-gallery-link"
                     title="Go to gallery" 
                     to="/gallery">Gallery</Link>
               <Link className="home-gallery-link"
                     title="Go to Menu"
                     to="/menu">Menu</Link>
            </div>
        </div>
    )
}

//Returns the Home page
const Home = () => {
    return (
        <div id="main-home"> 
            <Header />
            <MainImage />
            <div className="home-body-wrapp">
                <WelcomeText />
                <HomeGallery />
                <OrderLinks />
                <Footer />
            </div>
        </div>
    );
}


export default Home;