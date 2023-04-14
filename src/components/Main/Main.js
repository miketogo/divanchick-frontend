import React from 'react'
import { Helmet } from 'react-helmet';
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
  handleCallPopupOpen,
}) {



  return (

    <section className='main'>
      <Helmet>
        <title>Диванчик - Главная</title>
      </Helmet>
      <Banner />
      <PromotedCards />
      <Products
        handleLikeBtn={handleLikeBtn}
        favouritesProducts={favouritesProducts}
        setCartPopupOpen={setCartPopupOpen}
        cart={cart}
        handleToCartBtn={handleToCartBtn}
        type={'hits'}
        handleCallPopupOpen={handleCallPopupOpen}
      />
      <Reviews />
      <Products
        handleLikeBtn={handleLikeBtn}
        favouritesProducts={favouritesProducts}
        setCartPopupOpen={setCartPopupOpen}
        cart={cart}
        handleToCartBtn={handleToCartBtn}
        type={'new_items'}
        handleCallPopupOpen={handleCallPopupOpen}
      />
    </section>

  );
}

export default Main;
