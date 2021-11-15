import React, { useState } from 'react'
import { Switch, useParams, useRouteMatch } from 'react-router';
import { Route } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import ProductPage from '../ProductPage/ProductPage';
import Crumbs from '../Сrumbs/Сrumbs'
import './SubCategory.css';




function SubCategory(props) {
  const { url } = useRouteMatch();

  let { sub_category } = useParams();


  const [subCategory, setSubCategory] = useState({});
  const [filterdProducts, setFilterdProduct] = useState([]);

  React.useEffect(() => {


    setFilterdProduct(props.products.filter((product) => {
      if (product.category.link === props.category.link && product.sub_category.link === sub_category) return true
      else return false
    }))
  }, [sub_category, props.products, props.category])

  React.useEffect(() => {
    console.log(filterdProducts)
  }, [filterdProducts])

  React.useEffect(() => {
    if (props.category && props.category.sub_catigories) {
      setSubCategory(props.category.sub_catigories.filter((item, i) => {
        if (item.link === sub_category) return true
        else return false
      })[0])
    }
  }, [props.category, sub_category])



  return (
    <div className="sub-category">

      <Switch>
        <Route exact path={`${url}/`}>
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
              name: subCategory && subCategory.name && subCategory.name,
              to: `${url}`,
            },
          ]} />
          <h2 className="sub-category__name">{subCategory && subCategory.name && subCategory.name}</h2>
          <div className="sub-category__products">
            {filterdProducts && filterdProducts.map((product, i) => (
              <ProductCard link={`${url}/${product.link}`} product={product} key={`ProductCard${i}`} />
            ))}
          </div>

        </Route>
        <Route path={`${url}/:product_name`}>
          <ProductPage filterdProducts={filterdProducts} category={props.category} sub_category={subCategory} />
        </Route>
      </Switch>

    </div>
  );
}

export default SubCategory;
