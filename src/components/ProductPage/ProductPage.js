import React, { useState } from 'react'
import { useParams, useRouteMatch } from 'react-router';


import Crumbs from '../Сrumbs/Сrumbs'

import './ProductPage.css';




function ProductPage(props) {
  const { url } = useRouteMatch();

  let { product_name } = useParams();


  const [selectedProduct, setSelectedProduct] = useState([]);


  React.useEffect(() => {
    setSelectedProduct(props.filterdProducts.filter((product) => {
      if (product.link === product_name) return true
      else return false
    })[0])
    console.log(props.filterdProducts.filter((product) => {
      if (product.link === product_name) return true
      else return false
    }))
  }, [props.filterdProducts, product_name])




  React.useEffect(() => {
    console.log(url)
  }, [url])

  return (
    <div className="product-page">
      <Crumbs links={[
        {
          name: 'Главная',
          to: '/',
        },
        {
          name: props.category && props.category.name,
          to: `/categories/${props.category && props.category.link}`,
        },
        {
          name: props.sub_category && props.sub_category.name,
          to: `/categories/${props.category && props.category.link}/${props.sub_category && props.sub_category.link}`,
        },
        {
          name: selectedProduct && selectedProduct.name,
          to: `${url}`,
        },

      ]} />
      {selectedProduct &&
        <>
          <h2>{selectedProduct.name}</h2>

          {selectedProduct.photos && selectedProduct.photos.map((photo, i) => (
            <img src={photo !== 'Не указано' ? `${photo}`: ''}  alt={selectedProduct.name} key={photo} />
          ))}
          <p>{selectedProduct.description}</p>
        </>}

    </div>
  );
}

export default ProductPage;
