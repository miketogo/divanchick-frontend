import React, { useState } from 'react'
import { Switch, useParams, useRouteMatch } from 'react-router';
import { Route, Link } from 'react-router-dom';


import SubCategory from '../SubCategory/SubCategory';
import Crumbs from '../Сrumbs/Сrumbs'
import './Category.css';





function Category(props) {
  const { url } = useRouteMatch();

  let { category } = useParams();

  const [selectedCategory, setSelectedCategory] = useState({});


  React.useEffect(() => {
    // console.log(props.categories)
    // console.log(category)
    if(props.categories.length !== 0){
      if (props.categories.filter((item) => {
        if (item.link === category) return true
        else return false
      })[0].sub_catigories
        &&
        props.categories.filter((item) => {
          if (item.link === category) return true
          else return false
        })[0].sub_catigories.length !== 0) {
        setSelectedCategory(
          props.categories.filter((item) => {
            if (item.link === category) return true
            else return false
          })[0]
        )
      }
      else setSelectedCategory({})
    }
    
  }, [category, props.categories])

  // React.useEffect(() => {
  //   console.log(url)
  // }, [url])

  return (
    <div className="category">

      <Switch>
        <Route exact path={`${url}/`}>
          <Crumbs links={[
            {
              name: 'Главная',
              to: '/',
            },
            {
              name: selectedCategory.name,
              to: `${url}`,
            },
          ]} />
          <h2 className="category__name">{selectedCategory.name}</h2>
          <div className="category__sub-categories">
            {selectedCategory && selectedCategory.sub_catigories ? selectedCategory.sub_catigories.map((sub_category, i) => (

              <Link className="category__sub-category" to={`${url}/${sub_category.sub_category_id.link}`} key={`sub_category.name${i}`}>
                <h3 className="category__sub-category-name">{sub_category.sub_category_id.name}</h3>
                <div className="category__sub-category-gradient"></div>
                <img className="category__sub-category-img" src={sub_category.sub_category_id.photo} alt={sub_category.sub_category_id.name} />
              </Link>



            )) : <p key={'sub_category_empty'}>Пуста</p>}
          </div>

        </Route>
        <Route path={`${url}/:sub_category`}>
          <SubCategory handleLikeBtn={props.handleLikeBtn} favouritesProducts={props.favouritesProducts} handlePreloaderVisible={props.handlePreloaderVisible} setCartPopupOpen={props.setCartPopupOpen} cart={props.cart} handleToCartBtn={props.handleToCartBtn}  subcategoryPreloaderVisible={props.subcategoryPreloaderVisible} setFilterPopupOpen={props.setFilterPopupOpen} filtersUpd={props.filtersUpd} setFiltersUpd={props.setFiltersUpd} filters={props.filters} setFilterProducts={props.setFilterProducts} filterProducts={props.filterProducts} products={props.products} category={selectedCategory} />
        </Route>
      </Switch>

    </div>
  );
}

export default Category;
