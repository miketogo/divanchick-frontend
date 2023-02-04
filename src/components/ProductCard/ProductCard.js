import React from 'react'
import { Link } from 'react-router-dom';
import { CartIcon, PhoneIcon } from '../../assets/icons/icons';
import { getAmountByCity, MAIN_URL } from '../../assets/utils/constants';

import './ProductCard.css';





function ProductCard({ product, cart, handleToCartBtn, setCartPopupOpen, link, handleLikeBtn, favouritesProducts }) {

  function addToCart() {
    handleToCartBtn(product)
    if (cart && cart.filter((item) => {
      if (product._id === item._id) return true
      else return false
    }).length === 0) {
      setCartPopupOpen(true)
    }

  }

  const amount = getAmountByCity(product.seller_cities)

  const price = () => {

    const name = localStorage.getItem('city') ? localStorage.getItem('city') : 'Тобольск'
    let cityMap = {
      "Новый Уренгой": "63777e52c505252a8fc59c09",
      "Надым": "63777e62c505252a8fc59c0a",
      "Тобольск": "63777e74c505252a8fc59c0b",
    }
    let id = cityMap[name] ? cityMap[name] : "63777e74c505252a8fc59c0b"
    let value = product.firstc_data.price[id]
    return Number(value).toLocaleString('us')
  }

  const isInFavorite = favouritesProducts && favouritesProducts.filter((item) => {
    if (item._id === product._id) return true
    else return false
  }).length > 0


  const isInCart = cart && cart.filter((item) => {
    if (product._id === item._id) return true
    else return false
  }).length > 0

  return (

    <Link to={link} key={link} className='product-card'>
      <div className='product-card__like-container' onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleLikeBtn(product)
      }}>

        <svg className='product-card__like' width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className={`product-card__like-bg ${isInFavorite ? 'product-card__like-bg_active' : ''}`} d="M3.34327 17.0933L19 32.75L34.6567 17.0933C36.3972 15.3528 37.375 12.9922 37.375 10.5308C37.375 5.40514 33.2199 1.25 28.0942 1.25C25.6328 1.25 23.2722 2.22779 21.5317 3.96828L19 6.5L16.4683 3.96828C14.7278 2.22779 12.3672 1.25 9.90578 1.25C4.78014 1.25 0.625 5.40515 0.625 10.5308C0.625 12.9922 1.60279 15.3528 3.34327 17.0933Z" fill="var(--contrast-color)" />
          <path className={`product-card__like-stroke ${isInFavorite ? 'product-card__like-stroke_active' : ''}`} d="M19 32.75L18.6464 33.1036C18.8417 33.2988 19.1583 33.2988 19.3536 33.1036L19 32.75ZM3.34327 17.0933L2.98972 17.4468L2.98972 17.4468L3.34327 17.0933ZM16.4683 3.96828L16.1147 4.32183L16.1147 4.32183L16.4683 3.96828ZM19 6.5L18.6464 6.85355C18.8417 7.04882 19.1583 7.04882 19.3536 6.85355L19 6.5ZM21.5317 3.96828L21.1782 3.61472L21.1782 3.61472L21.5317 3.96828ZM19.3536 32.3964L3.69683 16.7397L2.98972 17.4468L18.6464 33.1036L19.3536 32.3964ZM34.3032 16.7397L18.6464 32.3964L19.3536 33.1036L35.0103 17.4468L34.3032 16.7397ZM16.1147 4.32183L18.6464 6.85355L19.3536 6.14645L16.8218 3.61472L16.1147 4.32183ZM19.3536 6.85355L21.8853 4.32183L21.1782 3.61472L18.6464 6.14645L19.3536 6.85355ZM28.0942 0.75C25.5002 0.75 23.0124 1.78047 21.1782 3.61472L21.8853 4.32183C23.532 2.67511 25.7654 1.75 28.0942 1.75V0.75ZM36.875 10.5308C36.875 12.8596 35.9499 15.093 34.3032 16.7397L35.0103 17.4468C36.8445 15.6126 37.875 13.1248 37.875 10.5308H36.875ZM37.875 10.5308C37.875 5.129 33.496 0.75 28.0942 0.75V1.75C32.9437 1.75 36.875 5.68129 36.875 10.5308H37.875ZM9.90578 1.75C12.2346 1.75 14.468 2.67512 16.1147 4.32183L16.8218 3.61472C14.9876 1.78047 12.4998 0.75 9.90578 0.75V1.75ZM1.125 10.5308C1.125 5.68129 5.05629 1.75 9.90578 1.75V0.75C4.504 0.75 0.125 5.129 0.125 10.5308H1.125ZM3.69683 16.7397C2.05011 15.093 1.125 12.8596 1.125 10.5308H0.125C0.125 13.1248 1.15547 15.6126 2.98972 17.4468L3.69683 16.7397Z" fill="#121212" />
        </svg>


      </div>

      <div className='product-card__link'>
        <img className='product-card__img' src={product.photos[0] !== 'Не указано' ? `${MAIN_URL}/get-file/${product.photos[0]}` : ''} alt={product.name} key={product._id} />
        <div className='product-card__price'>
          <p className='product-card__main-price'>{price()}&nbsp;₽</p>

        </div>
        <p className='product-card__name'>{product.name}</p>
        <p className={`product-card__amount ${amount > 0 ? '' : 'product-card__amount_zero'}`}>{amount > 0 ? `Доступно ${amount} шт.` : `Нет в наличии`}</p>
      </div>
      {amount === 0 ?
        <div className={`product-card__cart-btn`} onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          addToCart()
        }}>
          <p className='product-card__cart-btn-text'>Звонок менеджеру</p>
          {PhoneIcon({ mainClassName: 'product-card__cart-btn-icon', fillClassName: 'product-card__cart-btn-icon-fill' })}

        </div>
        :
        <div className={`product-card__cart-btn ${isInCart ? 'product-card__cart-btn_selected' : ''}`} onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          addToCart()
        }}>
          {isInCart ?
            <div className='product-card__cart-btn-icon-container'>
              <svg className='product-card__cart-btn-icon product-card__cart-btn-icon_tick' width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_968_16952)">
                  <path d="M8.46755 18.6887L8.84177 19.1111L9.216 18.6887L22.4909 3.707L23.7952 4.87004L8.84177 21.7461L1.20478 13.1272L2.50906 11.9641L8.46755 18.6887Z" fill="white" stroke="white" />
                </g>
                <defs>
                  <clipPath id="clip0_968_16952">
                    <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <svg className='product-card__cart-btn-icon product-card__cart-btn-icon_close' width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 22L23 2M3 2L23 22" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            :
            <>
              <p className='product-card__cart-btn-text'>В корзину</p>
              {CartIcon({ mainClassName: 'product-card__cart-btn-icon', strokeClassName: 'product-card__cart-btn-icon-stroke' })}
            </>}

        </div>
      }
    </Link>

  );
}

export default ProductCard;
