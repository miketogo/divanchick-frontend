import React, { useState } from 'react'
import { Switch, useParams, useRouteMatch } from 'react-router';
import { Route } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import ProductCard from '../ProductCard/ProductCard';
import ProductPage from '../ProductPage/ProductPage';
import Crumbs from '../Сrumbs/Сrumbs'
import Filters from './Filters/Filters';
import './SubCategory.css';




function SubCategory(props) {
  let divRef = React.createRef();
  const { url } = useRouteMatch();

  let { sub_category } = useParams();


  const [subCategory, setSubCategory] = useState({});
  const [filterdProducts, setFilterdProduct] = useState([]);



  React.useEffect(() => {


    setFilterdProduct(props.products.filter((product) => {
      if (product.category.link === props.category.link && product.sub_category.link === sub_category) return true
      else return false
    }))
    props.setFilterProducts(props.products.filter((product) => {
      if (product.category.link === props.category.link && product.sub_category.link === sub_category) return true
      else return false
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sub_category, props.products, props.category])



  React.useEffect(() => {
    if (props.category && props.category.sub_catigories) {

      setSubCategory(props.category.sub_catigories.filter((item, i) => {
        if (item.sub_category_id.link === sub_category) return true
        else return false
      })[0].sub_category_id)
    }
  }, [props.category, sub_category])


  const [filteredProd, setFilteredProd] = useState({});



  React.useEffect(() => {
    setFilteredProd(filterdProducts.filter((item) => {
      //IN STOCK//
      if (props.filtersUpd.inStock) {
        if (item.amount > 0) return true
        else return false
      } else {
        return true
      }
    }).filter((item) => {
      //PRICE MIN-MAX//
      if (Object.keys(props.filtersUpd).length !== 0) {
        if (item.discount > 0) {
          if (item.price - (item.price / 100 * item.discount) >= props.filtersUpd.price.min) {
            if (item.price - (item.price / 100 * item.discount) <= props.filtersUpd.price.max) return true
            else return false
          }
          else return false
        }
        if (item.discount === 0) {
          if (item.price >= props.filtersUpd.price.min) {
            if (item.price <= props.filtersUpd.price.max) return true
            else return false
          }
          else return false
        }
        else return false
      } else {
        return true
      }
    }).filter((item) => {
      //WIDTH MIN-MAX//
      if (Object.keys(props.filtersUpd).length !== 0) {
        if (item.specifications.width >= props.filtersUpd.width.min) {
          if (item.specifications.width <= props.filtersUpd.width.max) return true
          else return false
        }
        else return false
      } else {
        return true
      }
    }).filter((item) => {
      //HEIGHT MIN-MAX//
      if (Object.keys(props.filtersUpd).length !== 0) {
        if (item.specifications.height >= props.filtersUpd.height.min) {
          if (item.specifications.height <= props.filtersUpd.height.max) return true
          else return false
        }
        else return false
      } else {
        return true
      }
    }).filter((item) => {
      //DEPTH MIN-MAX//
      if (Object.keys(props.filtersUpd).length !== 0) {
        if (item.specifications.length >= props.filtersUpd.depth.min) {
          if (item.specifications.length <= props.filtersUpd.depth.max) return true
          else return false
        }
        else return false
      } else {
        return true
      }
    }).filter((item) => {
      //BRANDS MIN-MAX//
      if (Object.keys(props.filtersUpd).length !== 0 && props.filtersUpd.brands.length !== 0) {
        // if(item.manufacturer.toLowerCase() === )
        if (props.filtersUpd.brands.filter((brand) => {
          if (brand.toLowerCase() === item.manufacturer.toLowerCase()) return true
          else return false
        }).length > 0) return true
        else return false
      } else {
        return true
      }
    }))

  }, [filterdProducts, props.filtersUpd])


  const [priceSortByDecrease, setPriceSortByDecrease] = useState(false);




  return (
    <div className="sub-category" ref={divRef}>

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
          <p className="sub-category__products-length">{filteredProd && filteredProd.length} {filteredProd && filteredProd.length % 10 === 1 && 'модель'}{filteredProd && (filteredProd.length % 10 >= 2 && filteredProd.length % 10 <= 4) && 'модели'}{filteredProd && ((filteredProd.length % 10 >= 5 && filteredProd.length % 10 <= 9) || filteredProd.length % 10 === 0) && 'моделей'}</p>
          <h2 className="sub-category__name">{subCategory && subCategory.name && subCategory.name}</h2>
          <div className="sub-category__products-and-filters">
            <div className='sub-category__filters'>
              <Filters divRef={divRef} setFiltersUpd={props.setFiltersUpd} filters={props.filters} />
            </div>


            <div className="sub-category__products-with-btn">
              <div className="sub-category__btns">
                <div className="sub-category__filters-btn" onClick={() => { props.setFilterPopupOpen(true) }}>
                  <svg className="sub-category__filters-btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.8 12.6676C0.358217 12.6676 0 12.3094 0 11.8676C0 11.4573 0.308846 11.1192 0.706697 11.0729L0.8 11.0676H9.6C9.6 9.74213 10.6746 8.66757 12 8.66757H13.6C14.9254 8.66757 16 9.74213 16 11.0676V12.6676C16 13.993 14.9254 15.0676 13.6 15.0676H12C10.6746 15.0676 9.6 13.993 9.6 12.6676L0.8 12.6676ZM13.6 10.2676H12C11.5897 10.2676 11.2516 10.5764 11.2053 10.9743L11.2 11.0676V12.6676C11.2 13.0778 11.5088 13.416 11.9067 13.4622L12 13.4676H13.6C14.0103 13.4676 14.3484 13.1587 14.3946 12.7609L14.4 12.6676V11.0676C14.4 10.6573 14.0912 10.3192 13.6933 10.2729L13.6 10.2676ZM4 2.26758C5.32544 2.26758 6.4 3.34214 6.4 4.66758H15.2C15.6418 4.66758 16 5.0258 16 5.46758C16 5.87784 15.6912 6.21597 15.2933 6.26223L15.2 6.26759H6.4C6.4 7.59303 5.32544 8.66759 4 8.66759H2.4C1.07456 8.66759 0 7.59303 0 6.26759V4.66759C0 3.34215 1.07456 2.26759 2.4 2.26759L4 2.26758ZM4 3.86758H2.4C1.98974 3.86758 1.65161 4.17642 1.60535 4.57428L1.59999 4.66758V6.26758C1.59999 6.67784 1.90884 7.01597 2.30669 7.06223L2.39999 7.06759H3.99999C4.41025 7.06759 4.74838 6.75874 4.79464 6.36089L4.8 6.26759V4.66759C4.8 4.25732 4.49115 3.9192 4.0933 3.87294L4 3.86758Z" fill="#686868" />
                  </svg>
                  <p className="sub-category__filters-btn-text">фильтры</p>
                  {Object.keys(props.filtersUpd).length !== 0 && props.filtersUpd.brands.length !== 0 ?
                    <div className="sub-category__filters-btn-count">
                      <p className="sub-category__filters-btn-count-text">{props.filtersUpd.brands.length}</p>
                    </div>
                    : <></>}

                </div>
                <div className="sub-category__price-btn" onClick={() => { setPriceSortByDecrease(!priceSortByDecrease) }}>
                  <svg className={`sub-category__price-btn-icon ${priceSortByDecrease ? 'sub-category__price-btn-icon_decrease' : ''}`} width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14 18.1232C14 18.6226 13.594 19.0273 13.0995 19.0273L1.33791 19.0273C0.840677 19.0273 0.437604 18.6261 0.437605 18.1232C0.437605 17.6239 0.843428 17.2191 1.33791 17.2191L13.0995 17.2191C13.5969 17.2191 14 17.6204 14 18.1232ZM14 12.6983C14 13.1977 13.5954 13.6024 13.0971 13.6024L3.14895 13.6024C2.65036 13.6024 2.24605 13.2012 2.24605 12.6983C2.24605 12.1989 2.65063 11.7942 3.14895 11.7942L13.0971 11.7942C13.5957 11.7942 14 12.1955 14 12.6983ZM14 7.27339C14 7.77275 13.5978 8.17749 13.0999 8.17749L4.95432 8.17749C4.45724 8.17749 4.05417 7.77624 4.05417 7.27338C4.05417 6.77402 4.45635 6.36928 4.95432 6.36928L13.0999 6.36928C13.5969 6.36928 14 6.77053 14 7.27339ZM14 1.84846C14 2.34782 13.5955 2.75256 13.0985 2.75256L7.6681 2.75256C7.1701 2.75256 6.76656 2.35131 6.76656 1.84846C6.76656 1.34909 7.17103 0.944355 7.6681 0.944355L13.0985 0.944355C13.5963 0.944355 14 1.34561 14 1.84846Z" fill="#686868" />
                  </svg>
                  <p className="sub-category__price-btn-text">{priceSortByDecrease ? 'Убыванию цены' : 'Увеличению цены'}</p>
                </div>
              </div>
              {filteredProd && filteredProd.length > 0 ? <></> : props.subcategoryPreloaderVisible ? <></> : <p className='sub-category__no-products-text'>Товары по указанным фильтрам не найдены</p>}
              {props.subcategoryPreloaderVisible ?
                <Preloader />
                :
                <div className="sub-category__products">

                  {filteredProd && filteredProd.length > 0 ?

                    filteredProd.sort(function (a, b) {
                      if (priceSortByDecrease) {
                        if (a.discount === 0 && b.discount === 0) {
                          if (a.price < b.price) return 1;
                          if (b.price < a.price) return -1;
                          return 0;
                        } else if (a.discount > 0 && b.discount === 0) {
                          if (a.price - (a.price / 100 * a.discount) < b.price) return 1;
                          if (b.price < a.price - (a.price / 100 * a.discount)) return -1;
                          return 0;
                        } else if (a.discount === 0 && b.discount > 0) {
                          if (a.price < b.price - (b.price / 100 * b.discount)) return 1;
                          if (b.price - (b.price / 100 * b.discount) < a.price) return -1;
                          return 0;
                        } else {
                          if (a.price - (a.price / 100 * a.discount) < b.price - (b.price / 100 * b.discount)) return 1;
                          if (b.price - (b.price / 100 * b.discount) < a.price - (a.price / 100 * a.discount)) return -1;
                          return 0;
                        }
                      } else {
                        if (a.discount === 0 && b.discount === 0) {
                          if (a.price < b.price) return -1;
                          if (b.price < a.price) return 1;
                          return 0;
                        } else if (a.discount > 0 && b.discount === 0) {
                          if (a.price - (a.price / 100 * a.discount) < b.price) return -1;
                          if (b.price < a.price - (a.price / 100 * a.discount)) return 1;
                          return 0;
                        } else if (a.discount === 0 && b.discount > 0) {
                          if (a.price < b.price - (b.price / 100 * b.discount)) return -1;
                          if (b.price - (b.price / 100 * b.discount) < a.price) return 1;
                          return 0;
                        } else {
                          if (a.price - (a.price / 100 * a.discount) < b.price - (b.price / 100 * b.discount)) return -1;
                          if (b.price - (b.price / 100 * b.discount) < a.price - (a.price / 100 * a.discount)) return 1;
                          return 0;
                        }
                      }
                    })
                     .map((product, i) => (
                        <ProductCard link={`${url}/${product.link}`} product={product} key={`ProductCard${i}`} />
                      )) : <></>}
                </div>
              }


            </div>


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
