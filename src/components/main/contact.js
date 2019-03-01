import React from 'react';

import Header from './header';
import Footer from './footer';

import facebookIcon from './../../images/facebook-icon.png';
import instagramIcon from './../../images/instagram-icon.png';
import iChiroMapImage from './../../images/ichiro-map.png';


const SocialLinks = () => {
    return (
        <ul className="contact-social-links-list contact-list">
            <li className="contact-us-social-links-heading contact-list-heading"><h3>Follow us</h3></li>
            <li className="social-links-element-list contact-list-element">
                <a href="https://www.facebook.com/IchiroLond0n">
                    <img src={`src/images/${facebookIcon}`} />
                </a>
                <a href="https://www.instagram.com/ichirolondon/?hl=en">
                    <img src={`src/images/${instagramIcon}`} />
                </a>
            </li>                
        </ul>
    )
}

const ContactInfo = () => {
    return (
        <ul className="contact-info-list contact-list">
            <li className="contact-us-info-heading contact-list-heading"><h3>Contact</h3></li>
            <li className="contact-info-element contact-list-element"><p>02036328078</p></li>
            <li className="contact-info-element contact-list-element"><p>07851669025</p></li>
        </ul>
    )
}

const Address = () => {
    return (
        <ul className="contact-address-list contact-list">
            <li className="contact-us-address-list-heading contact-list-heading"><h3>Address</h3></li>
            <li className="address-element-list contact-list-element"><p>347 Nort End Road</p></li>
            <li className="address-element-list contact-list-element"><p>Fulham, London</p></li>
            <li className="address-element-list contact-list-element"><p>SW6 1NN</p></li>                    
        </ul>       
    )
}

const AddressMapImage = () => {
    return (
        <div className="address-map-image">
            <img className="map-image" 
                 src={ `src/images/${ iChiroMapImage }` } 
                 title="ichiro address map image"
                 alt="ichiro address map image"/>
        </div>
    )
}

const OpeningTimes = () => {
    return (
        <ul className="contact-opening-times-list contact-list">
        <li className="contact-us-opening-times-heading contact-list-heading"><h3>Ichiro opening times</h3></li>
        <li className="opening-times-element-list contact-list-element"><p>Monday to Friday: 12pm - 3pm / 5pm - 10pm</p></li>
        <li className="opening-times-element-list contact-list-element"><p>Sunday: Closed</p></li>
    </ul>
    )
}

const ContactUs = () => {
    return (
        <div id="contact-main">
            <Header />
            <div className="contact-body">
                <h1 className="contact-heading">Contact Us</h1>
                <div className="contact-section">
                    <SocialLinks />
                    <Address />
                </div>
                <div className="contact-section">
                    <ContactInfo />
                    <OpeningTimes />
                </div>
                <AddressMapImage /> 
            </div>
            <Footer />
        </div>
    )
}


export default ContactUs;
