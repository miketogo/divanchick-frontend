import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Switch, useParams, useRouteMatch } from 'react-router';
import { Route, Link } from 'react-router-dom';
import mainApi from '../../assets/api/MainApi';
import { MAIN_URL } from '../../assets/utils/constants';
import SofaPreloader from '../SofaPreloader/SofaPreloader';


import SubCategory from '../SubCategory/SubCategory';
import Crumbs from '../Сrumbs/Сrumbs'
import './Category.css';
import CategoryCard from './CategoryCard/CategoryCard';





function Category() {
  const { url } = useRouteMatch();

  let { category } = useParams();

  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [subcategories, setSubcategories] = useState(undefined)


  const [isPreloaderVisible, setPreloaderVisible] = useState(true)
  useEffect(() => {

    if (category) {
      setPreloaderVisible(true)
      mainApi.getSubcategoriesByCategory({
        category_translit_name: category,
        limit: 25,
      })
        .then((res2) => {
          console.log(res2.data)
          setSubcategories(res2.data)
          setSelectedCategory(res2.category)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setPreloaderVisible(false)
        })


    }

  }, [category])



  return (
    <>
      {selectedCategory ?
        <Helmet>
          <title>Диванчик - {selectedCategory.name}</title>
        </Helmet>
        : null}
      {isPreloaderVisible ?
        <div className='category__preloader'>
          <SofaPreloader />

        </div>
        :
        <div className="category" key={category}>
          {selectedCategory ?
            <>
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
                  subcategories.length > 0 ? subcategories.map((item, i) => (
                    <CategoryCard item={item} key={`${item._id}${i}`} url={url} category={selectedCategory.translit_name} />
                  ))

                    :
                    <p key={'sub_category_empty'}>Пусто</p>
                  : <></>}
              </div>
            </>
            : <></>}


        </div>
      }
    </>

  );
}

export default Category;
