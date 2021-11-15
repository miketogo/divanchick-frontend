import React from 'react'
import { Link } from 'react-router-dom';

import './ProductCard.css';





function ProductCard(props) {

  return (

    <Link to={props.link} key={props.link} className='product-card'>
      <img className='product-card__img' src={props.product.photos[0]} alt={props.product.name} />
      {/* <h2>{props.product.name}</h2>
      <h2>{props.product.price}</h2> */}
      <h2 className='product-card__name'>{props.product.name}</h2>
    </Link>

  );
}

export default ProductCard;
