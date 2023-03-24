import React, { createRef, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams, useRouteMatch } from 'react-router';
// import { Route } from 'react-router-dom';
import mainApi from '../../assets/api/MainApi';
import { getCityId } from '../../assets/utils/constants';
import FiltersPopup from '../FiltersPopup/FiltersPopup';
import MiniPreloader from '../MiniPreloader/MiniPreloader';
// import Preloader from '../Preloader/Preloader';
import ProductCard from '../ProductCard/ProductCard';
// import ProductPage from '../ProductPage/ProductPage';
import SofaPreloader from '../SofaPreloader/SofaPreloader';
import Crumbs from '../Сrumbs/Сrumbs'
import Filters from './Filters/Filters';
import './SubCategory.css';

const product_limit = 12




function SubCategory({

  setFiltersUpd,
  handleLikeBtn,
  favouritesProducts,
  setCartPopupOpen,
  cart,
  handleToCartBtn,
  handleColorPopupOpen
}) {
  let divRef = createRef();
  const { url } = useRouteMatch();
  // const history = useHistory();
  const [isPreloaderVisible, setPreloaderVisible] = useState(true)
  let { sub_category, category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(undefined)
  const [isFilterPopupOpen, setFilterPopupOpen] = useState(false);

  function handleFilterPopupClose() {
    setFilterPopupOpen(false)
  }

  const listRef = useRef()
  const [pageValue, setPageValue] = useState(0);
  const [prevScrollPosition, setPrevScrollPosition] = useState(-1);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [scrollTraking, setScrollTraking] = useState(true);

  const [subcategory, setSubcategory] = useState(undefined)
  const [items, setItems] = useState(undefined)
  const [itemsCount, setItemsCount] = useState(undefined)


  const [isItemPreloaderVisible, setItemPreloaderVisible] = useState(true)
  useEffect(() => {
    if (sub_category && category) {
      setItemPreloaderVisible(true)
      setPreloaderVisible(true)
      setItems(undefined)
      setPageValue(0)
      setPrevScrollPosition(0)
      setScrollPosition(0)

      let data = {}
      data.category_translit_name = category
      data.city_id = localStorage.getItem('city') ? getCityId(localStorage.getItem('city')) : '63777e74c505252a8fc59c0b'
      data.sub_category_translit_name = sub_category
      data.price_sort = true
      data.filters = [
        {
          translit_name: 'ROOT.amount',
          type: 'slider_bool',
          translit_value: '0'
        }
      ]
      data.last_id = null
      data.last_price = null
      data.limit = product_limit
      console.log(data)


      mainApi.getSubcategory({
        translit_name: sub_category,
        category_translit_name: category
      })
        .then((res) => {
          console.log(res)

          setSubcategory(res)
          mainApi.getItemsBySubAndCategory({ data: JSON.stringify(data) })
            .then((res2) => {
              console.log(res2)
              setItemsCount(res2.count)
              setItems(res2.data)
            })
            .catch((err) => {
              console.log(err)
            })
            .finally(() => {

              setItemPreloaderVisible(false)
              setPreloaderVisible(false)
            })
        })
        .catch((err) => {
          console.log(err)
          setPreloaderVisible(false)
        })




    }
  }, [sub_category, category])

  const [priceSortByDecrease, setPriceSortByDecrease] = useState(true);

  function handleResetFilters() {
    setItemPreloaderVisible(true)
    setFilterPopupOpen(false)
    let data = {}
    data.category_translit_name = category
    data.sub_category_translit_name = sub_category
    data.price_sort = priceSortByDecrease
    data.filters = [
      {
        translit_name: 'ROOT.amount',
        type: 'slider_bool',
        translit_value: '0'
      }
    ]
    data.last_id = null
    data.last_price = null
    data.city_id = localStorage.getItem('city') ? getCityId(localStorage.getItem('city')) : '63777e74c505252a8fc59c0b'
    data.limit = product_limit
    console.log(data)

    setItems(undefined)
    setPageValue(0)
    setPrevScrollPosition(0)
    setScrollPosition(0)

    mainApi.getItemsBySubAndCategory({ data: JSON.stringify(data) })
      .then((res) => {
        console.log(res)
        setItemsCount(res.count)
        setItems(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setItemPreloaderVisible(false)
      })
  }

  const [filters, setFilters] = useState([])
  function handleUpdateByFilters({ filters, inStock }) {
    setItemPreloaderVisible(true)
    const defMaxValue = '999999999'
    const defMinValue = '0'
    let array = Object.values(filters)
    array = array.map((item) => {

      if (item.type === 'min_max') {
        return {
          translit_name: item.translit_name,
          type: item.type,
          translit_value: item.max ? item.min ? `${item.min}-${item.max}` : `${defMinValue}-${item.max}` : item.min ? `${item.min}-${defMaxValue}` : `${defMinValue}-${defMaxValue}`
        }
      }
      else if (item.type === 'array_choose' && item.criterions.length > 0) {
        return {
          translit_name: item.translit_name,
          type: item.type,
          translit_value: item.criterions.map((item) => item.translit_value).join(',')
        }
      }
      else return null

    })
    array = array.filter((item) => item !== null)
    array = [...array, {
      translit_name: 'ROOT.amount',
      type: 'slider_bool',
      translit_value: inStock ? '1' : '0'
    }]
    console.log(array)
    setFilters(array)
    let data = {}
    data.category_translit_name = category
    data.city_id = localStorage.getItem('city') ? getCityId(localStorage.getItem('city')) : '63777e74c505252a8fc59c0b'
    data.sub_category_translit_name = sub_category
    data.price_sort = priceSortByDecrease
    data.filters = array
    data.last_id = null
    data.last_price = null
    data.limit = product_limit

    setItems(undefined)
    setPageValue(0)
    setPrevScrollPosition(0)
    setScrollPosition(0)

    mainApi.getItemsBySubAndCategory({ data: JSON.stringify(data) })
      .then((res) => {
        console.log(res)
        setItemsCount(res.count)
        setItems(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setItemPreloaderVisible(false)
      })


  }


  function handleSortChange(value) {
    setPriceSortByDecrease(value)
    setItemPreloaderVisible(true)
    let data = {}
    data.category_translit_name = category
    data.sub_category_translit_name = sub_category
    data.city_id = localStorage.getItem('city') ? getCityId(localStorage.getItem('city')) : '63777e74c505252a8fc59c0b'
    data.price_sort = value
    data.filters = filters.length > 0 ? filters : [
      {
        translit_name: 'ROOT.amount',
        type: 'slider_bool',
        translit_value: '0'
      }
    ]
    data.last_id = null
    data.last_price = null
    data.limit = product_limit

    setItems(undefined)
    setPageValue(0)
    setPrevScrollPosition(0)
    setScrollPosition(0)

    mainApi.getItemsBySubAndCategory({ data: JSON.stringify(data) })
      .then((res) => {
        console.log(res)
        setItemsCount(res.count)
        setItems(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setItemPreloaderVisible(false)
      })
  }






  const handleScroll = () => {
    const position = window.pageYOffset;

    setScrollPosition(position);
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // console.log(scrollPosition, prevScrollPosition)
    if (listRef.current && scrollTraking && scrollPosition > prevScrollPosition && items && items.length > 0) {
      // console.log(listRef.current)
      setPrevScrollPosition(scrollPosition)
      const { scrollHeight } = listRef.current;
      if (scrollHeight < scrollPosition + 1000) {
        setScrollTraking(false)
        setPageValue(pageValue + 1)
        setTimeout(() => {
          setScrollTraking(true)
        }, 500);
      }
    }
  }, [scrollPosition, scrollTraking, prevScrollPosition, pageValue, items]);

  useEffect(() => {

    if (pageValue > 0 && items && items.length > 0 && items.length === product_limit * pageValue) {
      let last_id = items[items.length - 1]._id

      const name = localStorage.getItem('city') ? localStorage.getItem('city') : 'Тобольск'
      let cityMap = {
        "Новый Уренгой": "63777e52c505252a8fc59c09",
        "Надым": "63777e62c505252a8fc59c0a",
        "Тобольск": "63777e74c505252a8fc59c0b",
      }
      let id = cityMap[name] ? cityMap[name] : "63777e74c505252a8fc59c0b"
      let last_price = items[items.length - 1].firstc_data.price[id]

      console.log(last_id)
      console.log('ss')

      let data = {}
      data.category_translit_name = category
      data.city_id = localStorage.getItem('city') ? getCityId(localStorage.getItem('city')) : '63777e74c505252a8fc59c0b'
      data.sub_category_translit_name = sub_category
      data.price_sort = priceSortByDecrease
      data.filters = filters.length > 0 ? filters : [
        {
          translit_name: 'ROOT.amount',
          type: 'slider_bool',
          translit_value: '1'
        }
      ]
      data.last_id = last_id
      data.last_price = last_price
      data.limit = product_limit
      console.log(data)
      mainApi.getItemsBySubAndCategory({ data: JSON.stringify(data) })
        .then((res) => {
          console.log(res)
          setItems(prevList => prevList.concat(res.data))
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          // setItemPreloaderVisible(false)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue, items])

  return (
    <div className="sub-category" ref={divRef}>
      {subcategory ?
        <Helmet>
          <title>Диванчик - {`${subcategory.category.name} / ${subcategory.name}`}</title>
        </Helmet>
        : null}
      {
        isPreloaderVisible ?
          <div className='sub-category__preloader'>
            <SofaPreloader />
          </div>
          :
          <>
            {subcategory ?
              <>
                <Crumbs links={[
                  {
                    name: 'Главная',
                    to: '/',
                  },
                  {
                    name: subcategory.category.name,
                    to: `/categories/${subcategory.category.translit_name}`,
                  },
                  {
                    name: subcategory.name,
                    to: `${url}`,
                  },
                ]} />
                <FiltersPopup
                  handleResetFilters={handleResetFilters}
                  setFiltersUpd={setFiltersUpd}
                  filters={subcategory.filters}
                  handleUpdateByFilters={handleUpdateByFilters}
                  handleFilterPopupClose={handleFilterPopupClose}
                  isFilterPopupOpen={isFilterPopupOpen} />
                <p className="sub-category__products-length">{itemsCount} {itemsCount % 10 === 1 && 'модель'}{itemsCount % 10 >= 2 && itemsCount % 10 <= 4 && 'модели'}{((itemsCount % 10 >= 5 && itemsCount % 10 <= 9) || (itemsCount % 10 === 0)) && 'моделей'}</p>
                <h2 className="sub-category__name">{subcategory.name}</h2>

                <div className="sub-category__products-and-filters" key={subcategory.category.translit_name}>
                  <div className='sub-category__filters'>
                    <Filters handleResetFilters={handleResetFilters} divRef={divRef} setFiltersUpd={setFiltersUpd} filters={subcategory.filters} handleUpdateByFilters={handleUpdateByFilters} />
                  </div>
                  <div className="sub-category__products-with-btn">
                    <div className="sub-category__btns">
                      <div className="sub-category__filters-btn" onClick={() => { setFilterPopupOpen(true) }}>
                        <svg className="sub-category__filters-btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.8 12.6676C0.358217 12.6676 0 12.3094 0 11.8676C0 11.4573 0.308846 11.1192 0.706697 11.0729L0.8 11.0676H9.6C9.6 9.74213 10.6746 8.66757 12 8.66757H13.6C14.9254 8.66757 16 9.74213 16 11.0676V12.6676C16 13.993 14.9254 15.0676 13.6 15.0676H12C10.6746 15.0676 9.6 13.993 9.6 12.6676L0.8 12.6676ZM13.6 10.2676H12C11.5897 10.2676 11.2516 10.5764 11.2053 10.9743L11.2 11.0676V12.6676C11.2 13.0778 11.5088 13.416 11.9067 13.4622L12 13.4676H13.6C14.0103 13.4676 14.3484 13.1587 14.3946 12.7609L14.4 12.6676V11.0676C14.4 10.6573 14.0912 10.3192 13.6933 10.2729L13.6 10.2676ZM4 2.26758C5.32544 2.26758 6.4 3.34214 6.4 4.66758H15.2C15.6418 4.66758 16 5.0258 16 5.46758C16 5.87784 15.6912 6.21597 15.2933 6.26223L15.2 6.26759H6.4C6.4 7.59303 5.32544 8.66759 4 8.66759H2.4C1.07456 8.66759 0 7.59303 0 6.26759V4.66759C0 3.34215 1.07456 2.26759 2.4 2.26759L4 2.26758ZM4 3.86758H2.4C1.98974 3.86758 1.65161 4.17642 1.60535 4.57428L1.59999 4.66758V6.26758C1.59999 6.67784 1.90884 7.01597 2.30669 7.06223L2.39999 7.06759H3.99999C4.41025 7.06759 4.74838 6.75874 4.79464 6.36089L4.8 6.26759V4.66759C4.8 4.25732 4.49115 3.9192 4.0933 3.87294L4 3.86758Z" fill="#686868" />
                        </svg>
                        <p className="sub-category__filters-btn-text">Фильтры</p>
                      </div>
                      <div className="sub-category__price-btn" onClick={() => { handleSortChange(!priceSortByDecrease) }}>
                        <svg className={`sub-category__price-btn-icon ${!priceSortByDecrease ? 'sub-category__price-btn-icon_decrease' : ''}`} width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M14 18.1232C14 18.6226 13.594 19.0273 13.0995 19.0273L1.33791 19.0273C0.840677 19.0273 0.437604 18.6261 0.437605 18.1232C0.437605 17.6239 0.843428 17.2191 1.33791 17.2191L13.0995 17.2191C13.5969 17.2191 14 17.6204 14 18.1232ZM14 12.6983C14 13.1977 13.5954 13.6024 13.0971 13.6024L3.14895 13.6024C2.65036 13.6024 2.24605 13.2012 2.24605 12.6983C2.24605 12.1989 2.65063 11.7942 3.14895 11.7942L13.0971 11.7942C13.5957 11.7942 14 12.1955 14 12.6983ZM14 7.27339C14 7.77275 13.5978 8.17749 13.0999 8.17749L4.95432 8.17749C4.45724 8.17749 4.05417 7.77624 4.05417 7.27338C4.05417 6.77402 4.45635 6.36928 4.95432 6.36928L13.0999 6.36928C13.5969 6.36928 14 6.77053 14 7.27339ZM14 1.84846C14 2.34782 13.5955 2.75256 13.0985 2.75256L7.6681 2.75256C7.1701 2.75256 6.76656 2.35131 6.76656 1.84846C6.76656 1.34909 7.17103 0.944355 7.6681 0.944355L13.0985 0.944355C13.5963 0.944355 14 1.34561 14 1.84846Z" fill="#686868" />
                        </svg>
                        <p className="sub-category__price-btn-text">{!priceSortByDecrease ? 'Убывание цены' : 'Увеличение цены'}</p>
                      </div>
                    </div>
                    {isItemPreloaderVisible ?
                      <div className='sub-category__item-preloader'>
                        <MiniPreloader />
                      </div>
                      : items && items.length > 0 ? <>
                        <div className="sub-category__products" ref={listRef}>
                          {items.map((product, i) => (
                            <ProductCard
                              handleLikeBtn={handleLikeBtn}
                              favouritesProducts={favouritesProducts}
                              setCartPopupOpen={setCartPopupOpen}
                              cart={cart}
                              handleToCartBtn={handleToCartBtn}
                              link={`/item/${category}/${sub_category}/${product._id}`}
                              product={product}
                              key={`ProductCard${i}`} />
                          ))}
                        </div>
                      </> : <p className='sub-category__no-products-text'>Товары по указанным фильтрам не найдены</p>}
                  </div>
                </div>
              </>

              : <></>}
          </>
      }





    </div>
  );
}

export default SubCategory;
