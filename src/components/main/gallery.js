import React from 'react';

import { Link } from 'react-router-dom';

import Header from './header';
import Footer from './footer';

import photoGallery1 from './../../images/photo-gallery-1.jpg';
import photoGallery2 from './../../images/photo-gallery-2.jpg';
import photoGallery3 from './../../images/photo-gallery-3.jpg';
import photoGallery4 from './../../images/photo-gallery-4.jpg';
import photoGallery5 from './../../images/photo-gallery-5.jpg';
import photoGallery6 from './../../images/photo-gallery-6.jpg';
import photoGallery7 from './../../images/photo-gallery-7.jpg';
import photoGallery8 from './../..//images/photo-gallery-8.jpg';


const GalleryIntro = () => {
    return (
        <div className="gallery-intro">
            <p>Enjoy the visit at Ichiro Gallery.</p>
            <p>We have a wide sushi selection and we offer 
               the maximum quality for our costumers.</p>
            <p>Thank you!</p>
        </div>
    )
}

const GalleryLinks = () => {
    return (
        <div className="gallery-links">
            <div className="gallery-links-text">
                <p>Like what you see? Order your food here!</p>
            </div>
            <div className="gallery-delivery-order-link">
                <Link 
                    to="/order"
                    title="go to order for collection" 
                    className="gallery-delivery-order-link-element">Order for collection</Link>
                <a href="http://www.deliveroo.com"
                   title="go to deliveroo" 
                   className="gallery-delivery-order-link-element"> Order to takeaway</a>
            </div>
        </div>
    )
}

const GalleryImages = () => {
    return (
        <div className="gallery-images">
            <div className="gallery-image">
                <img className="gallery-image-element"
                     alt="Delicious sushi" 
                     title="Delicious sushi"  
                     src={ `src/images/${ photoGallery1 }` } />
            </div>
            <div className="gallery-image">
                <img className="gallery-image-element"
                     alt="Delicious sushi" 
                     title="Delicious sushi"  
                     src={ `src/images/${ photoGallery2 }` } />
            </div>
            <div className="gallery-image">
                <img className="gallery-image-element"
                     alt="Delicious sushi" 
                     title="Delicious sushi" 
                     src={ `src/images/${ photoGallery3 }` } />
            </div>
            <div className="gallery-image">
                <img className="gallery-image-element"
                     alt="Delicious sushi" 
                     title="Delicious sushi" 
                     src={ `src/images/${ photoGallery4}` } />
            </div>
            <div className="gallery-image">
                <img className="gallery-image-element"
                     alt="Delicious sushi" 
                     title="Delicious sushi"   
                     src={ `src/images/${ photoGallery5 }` } />
            </div>
            <div className="gallery-image">
                <img className="gallery-image-element"
                     alt="Delicious sushi" 
                     title="Delicious sushi"  
                     src={ `src/images/${ photoGallery6 }` } />
            </div>
            <div className="gallery-image">
                <img className="gallery-image-element"
                     alt="Delicious sushi" 
                     title="Delicious sushi"   
                     src={ `src/images/${ photoGallery7 }` } />
            </div>
            <div className="gallery-image">
                <img className="gallery-image-element"
                     alt="Delicious sushi" 
                     title="Delicious sushi"  
                     src={ `src/images/${ photoGallery8}` } />
            </div>
        </div>
    )
}

const Gallery = () => {
    return (
        <div id="gallery-main">
            <Header />
            <div className="gallery-body">
                <h1 className="gallery-heading">Gallery</h1>
                <GalleryIntro />
                <GalleryImages />
                <GalleryLinks />
            </div>
            <Footer />
        </div>
    )
}


export default Gallery;