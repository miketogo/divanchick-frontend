import React from 'react'
import { Link } from 'react-router-dom';
import Banner from './Banner/Banner';

import './Main.css';
import Products from './Products/Products';
import PromotedCards from './PromotedCards/PromotedCards';
import Reviews from './Reviews/Reviews';



function Main({
    handleLikeBtn,
    favouritesProducts,
    setCartPopupOpen,
    cart,
    handleToCartBtn,
}) {



    return (

        <section className='main'>
            <Banner />
            <PromotedCards />
            <Products
                handleLikeBtn={handleLikeBtn}
                favouritesProducts={favouritesProducts}
                setCartPopupOpen={setCartPopupOpen}
                cart={cart}
                handleToCartBtn={handleToCartBtn}
                type={'hits'}
            />
            <Reviews />
            <Products
                handleLikeBtn={handleLikeBtn}
                favouritesProducts={favouritesProducts}
                setCartPopupOpen={setCartPopupOpen}
                cart={cart}
                handleToCartBtn={handleToCartBtn}
                type={'new_items'}
            />
        </section>

    );
}

export default Main;
