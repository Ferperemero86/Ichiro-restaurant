import React from 'react';

import facebookIcon from './../../images/footer-face-icon.png';
import facebookIconDesktop from './../../images/footer-face-icon-desktop.png'
import instagramIcon from './../../images/footer-insta-icon.png';
import instagramIconDesktop from './../../images/footer-insta-icon-desktop.png';


const SocialLinks = () => {
    return (
        <ul className="social-links-list-footer">
            <li className="list-element">
                <h3 className="heading-footer">Follow us</h3>
            </li>
            <li className="list-element">
                <a href="https://www.facebook.com/IchiroLond0n">
                    <img src={`src/images/${facebookIcon}`} className="social-icon" />
                    <img src={`src/images/${facebookIconDesktop}`} className="social-icon-desktop" />
                </a>
                <a href="https://www.instagram.com/ichirolondon/?hl=en">
                    <img src={`src/images/${instagramIcon}`} className="social-icon" />
                    <img src={`src/images/${instagramIconDesktop}`} className="social-icon-desktop" />   
                </a>
            </li>                
        </ul>
    )
}

const ContactPhone = () => {
    return (
        <ul className="contact-info-list-footer">
            <li className="list-element"><h3 className="heading-footer">Contact</h3></li>
            <li className="list-element"><p>02036328078</p></li>
            <li className="list-element"><p>07851669025</p></li>
        </ul>
    )
}

const Address = () => {
    return (
        <ul className="address-list-footer">
            <li className="list-element"><h3 className="heading-footer">Address</h3></li>
            <li className="list-element"><p>347 Nort End Road</p></li>
            <li className="list-element"><p>Fulham, London </p></li>
            <li className="list-element"><p>SW6 1NN</p></li>                    
        </ul>       
    )
}

const OpeningTimes = () => {
    return (
        <ul className="opening-times-list-footer">
        <li className="list-element"><h3 className="heading-footer">Opening times</h3></li>
        <li className="list-element"><p>Monday to Friday: 12pm - 3pm / 5pm - 10pm</p></li>
        <li className="list-element"><p>Sundays: Closed</p></li>
    </ul>
    )
}

const Footer = () => {
    return (
        <footer className="footer">
           <SocialLinks />
           <ContactPhone />
           <Address />
           <OpeningTimes />
        </footer>
    )
}


export default Footer;