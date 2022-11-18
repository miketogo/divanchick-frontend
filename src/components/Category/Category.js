import React, { useEffect, useState } from 'react'
import { Switch, useParams, useRouteMatch } from 'react-router';
import { Route, Link } from 'react-router-dom';
import mainApi from '../../assets/api/MainApi';
import { MAIN_URL } from '../../assets/utils/constants';


import SubCategory from '../SubCategory/SubCategory';
import Crumbs from '../Сrumbs/Сrumbs'
import './Category.css';





function Category(props) {
  const { url } = useRouteMatch();

  let { category } = useParams();

  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [subcategories, setSubcategories] = useState(undefined)



  useEffect(() => {

    if (category) {
      mainApi.getExactCategory({ translit_name: category })
        .then((res) => {
          console.log(res)
          setSelectedCategory(res)
        })
        .catch((err) => {
          console.log(err)
        })

      mainApi.getSubcategoriesByCategory({
        category_translit_name: category,
        limit: 25,
      })
        .then((res) => {
          console.log(res.data)
          setSubcategories(res.data)

        })
        .catch((err) => {
          console.log(err)
        })
    }

  }, [category])

  // React.useEffect(() => {
  //   console.log(url)
  // }, [url])

  return (
    <div className="category">
      {selectedCategory ?
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
              {subcategories ?
                subcategories.length > 0 ? subcategories.map((sub_category, i) => (

                  <Link className="category__sub-category" to={`${url}/${sub_category.translit_name}`} key={`sub_category.name${i}`}>
                    <h3 className="category__sub-category-name">{sub_category.name}</h3>
                    <div className="category__sub-category-gradient"></div>
                    <img className="category__sub-category-img" src={`${MAIN_URL}/get-file/${sub_category.photo}`} alt={sub_category.photo} key={sub_category._id} />
                  </Link>
                ))

                  :
                  <p key={'sub_category_empty'}>Пусто</p>
                : <></>}
            </div>

          </Route>
          <Route path={`${url}/:sub_category`}>
            <SubCategory handleColorPopupOpen={props.handleColorPopupOpen} handleLikeBtn={props.handleLikeBtn} favouritesProducts={props.favouritesProducts} handlePreloaderVisible={props.handlePreloaderVisible} setCartPopupOpen={props.setCartPopupOpen} cart={props.cart} handleToCartBtn={props.handleToCartBtn} subcategoryPreloaderVisible={props.subcategoryPreloaderVisible} setFilterPopupOpen={props.setFilterPopupOpen} filtersUpd={props.filtersUpd} setFiltersUpd={props.setFiltersUpd} filters={props.filters} setFilterProducts={props.setFilterProducts} filterProducts={props.filterProducts} products={props.products} category={selectedCategory} />
          </Route>
        </Switch>
        : <></>}


    </div>
  );
}

export default Category;
