import React, { useState } from 'react'
import { Switch, useParams, useRouteMatch } from 'react-router';
import { Route, Link } from 'react-router-dom';
import ProductPage from '../ProductPage/ProductPage';
import './SubCategory.css';




function SubCategory(props) {
  const { url } = useRouteMatch();

  let { sub_category } = useParams();

  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const [filterdProducts, setFilterdProduct] = useState([]);

  React.useEffect(() => {
    setSelectedSubCategory(sub_category)

    setFilterdProduct(props.products.filter((product) => {
      if (product.category.link === props.category.link && product.sub_category.link === sub_category) return true
      else return false
    }))
  }, [sub_category, props.products, props.category])

  React.useEffect(() => {
    console.log(filterdProducts)
  }, [filterdProducts])

  React.useEffect(() => {
    console.log(url)
  }, [url])

  return (
    <div className="category">

      <Switch>
        <Route exact path={`${url}/`}>
          <div><Link to='/'>Главная /</Link><Link to={`/categories/${props.category && props.category.link}`}> {props.category && props.category.name} /</Link><Link to={`${url}`}> {props.category && props.category.sub_catigories && props.category.sub_catigories.filter((item, i) => {
            if (item.link === sub_category) return true
            else return false
          })[0].name} /</Link></div>
          <h3>sub-category: {selectedSubCategory}</h3>
          {filterdProducts && filterdProducts.map((product, i) => (
            <Link to={`${url}/${product.link}`} key={`${url}/${product.link}`}>
              <h2>{product.name}</h2>
              <h2>{product.price}</h2>
              <img src={product.photos[0]} alt={product.name} />
            </Link>
          ))}
        </Route>
        <Route path={`${url}/:product_name`}>
          <ProductPage filterdProducts={filterdProducts} category={props.category} sub_category={props.category && props.category.sub_catigories && props.category.sub_catigories.filter((item, i) => {
            if (item.link === sub_category) return true
            else return false
          })[0]} />
        </Route>
      </Switch>

    </div>
  );
}

export default SubCategory;
