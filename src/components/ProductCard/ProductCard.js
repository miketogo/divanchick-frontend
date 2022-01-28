import React from 'react'
import { Link } from 'react-router-dom';

import './ProductCard.css';



// `http://51.250.18.104/api/photos/${props.product.photos[0]}`

function ProductCard(props) {

  return (

    <div className='product-card'>
      <div className='product-card__like-container'>
        <svg className='product-card__like' width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 32.75L18.5581 33.1919C18.8021 33.436 19.1979 33.436 19.4419 33.1919L19 32.75ZM3.34327 17.0933L2.90133 17.5352H2.90133L3.34327 17.0933ZM16.4683 3.96828L16.0263 4.41022V4.41022L16.4683 3.96828ZM19 6.5L18.5581 6.94194C18.8021 7.18602 19.1979 7.18602 19.4419 6.94194L19 6.5ZM21.5317 3.96828L21.0898 3.52633V3.52633L21.5317 3.96828ZM19.4419 32.3081L3.78522 16.6513L2.90133 17.5352L18.5581 33.1919L19.4419 32.3081ZM34.2148 16.6513L18.5581 32.3081L19.4419 33.1919L35.0987 17.5352L34.2148 16.6513ZM16.0263 4.41022L18.5581 6.94194L19.4419 6.05806L16.9102 3.52634L16.0263 4.41022ZM19.4419 6.94194L21.9737 4.41022L21.0898 3.52633L18.5581 6.05806L19.4419 6.94194ZM28.0942 0.625C25.467 0.625 22.9475 1.66864 21.0898 3.52633L21.9737 4.41022C23.5969 2.78694 25.7986 1.875 28.0942 1.875V0.625ZM36.75 10.5308C36.75 12.8264 35.8381 15.0281 34.2148 16.6513L35.0987 17.5352C36.9564 15.6775 38 13.158 38 10.5308H36.75ZM38 10.5308C38 5.05997 33.565 0.625 28.0942 0.625V1.875C32.8747 1.875 36.75 5.75032 36.75 10.5308H38ZM9.90578 1.875C12.2014 1.875 14.4031 2.78695 16.0263 4.41022L16.9102 3.52634C15.0525 1.66864 12.533 0.625 9.90578 0.625V1.875ZM1.25 10.5308C1.25 5.75032 5.12532 1.875 9.90578 1.875V0.625C4.43497 0.625 0 5.05997 0 10.5308H1.25ZM3.78522 16.6513C2.16194 15.0281 1.25 12.8264 1.25 10.5308H0C0 13.158 1.04364 15.6775 2.90133 17.5352L3.78522 16.6513Z" fill="#121212" />
        </svg>
      </div>

      <Link to={props.link} key={props.link} className='product-card__link'>
        <img className='product-card__img' src={props.product.photos[0] !== 'Не указано' ? `${props.product.photos[0]}` : ''} alt={props.product.name} />
        <div className='product-card__price'>
          <p className='product-card__main-price'>{props.product.discount && props.product.discount > 0 ? (props.product.price - (props.product.price / 100 * props.product.discount)) : props.product.price.toLocaleString('ru')}₽</p>
          {props.product.discount && props.product.discount > 0 ?
            <>
              <div className='product-card__discount'>
                <p className='product-card__discount-percent'>-{props.product.discount}%</p>
              </div>
              <p className='product-card__last-price'>{props.product.price}р</p>
            </> : <></>}
        </div>
        <p className='product-card__name'>{props.product.name}</p>
        <p className={`product-card__amount ${props.product.amount > 0 ? '' : 'product-card__amount_zero'}`}>{props.product.amount > 0 ? `Доступно ${props.product.amount} шт.` : `Нет в наличии`}</p>
      </Link>
      <div className='product-card__cart-btn'>
        <p className='product-card__cart-btn-text'>В корзину</p>
        <svg className='product-card__cart-btn-icon' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.04687 3.58333L2.34375 1.25H0M3.04687 3.58333L5.85938 12.9167H18.75V5.91667C18.75 4.628 17.7007 3.58333 16.4062 3.58333H3.04687ZM16.4062 18.75C15.759 18.75 15.2344 18.2277 15.2344 17.5833C15.2344 16.939 15.759 16.4167 16.4062 16.4167C17.0535 16.4167 17.5781 16.939 17.5781 17.5833C17.5781 18.2277 17.0535 18.75 16.4062 18.75ZM7.03125 17.5833C7.03125 16.939 7.55592 16.4167 8.20312 16.4167C8.85033 16.4167 9.375 16.939 9.375 17.5833C9.375 18.2277 8.85033 18.75 8.20312 18.75C7.55592 18.75 7.03125 18.2277 7.03125 17.5833Z" stroke="#9B38DC" strokeWidth="1.25" />
        </svg>

      </div>
      {/* <h2>{props.product.name}</h2>
      <h2>{props.product.price}</h2> */}
      {/* <h2 className='product-card__name'>{props.product.name}</h2> */}
    </div>

  );
}

export default ProductCard;
