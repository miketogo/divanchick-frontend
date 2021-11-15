import React, { useState } from 'react'
import { useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
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
  }, [props.filterdProducts, product_name])




  React.useEffect(() => {
    console.log(url)
  }, [url])

  return (
    <div className="category">
      <div><Link to='/'>Главная /</Link><Link to={`/categories/${props.category && props.category.link}`}> {props.category && props.category.name} /</Link><Link to={`/categories/${props.category && props.category.link}/${props.sub_category && props.sub_category.link}`}> {props.sub_category && props.sub_category.name} /</Link><Link to={`${url}`}>{selectedProduct && selectedProduct.name}</Link></div>
      {selectedProduct &&
        <>
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          {selectedProduct.photos && selectedProduct.photos.map((photo, i) => (
            <img src={photo} alt={selectedProduct.name} key={photo} />
          ))}
        </>}

    </div>
  );
}

export default ProductPage;
