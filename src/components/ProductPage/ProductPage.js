import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch, useHistory } from 'react-router';
import moment from 'moment-timezone';
import 'moment/locale/ru'

import Crumbs from '../Сrumbs/Сrumbs'

import './ProductPage.css';
import mainApi from '../../assets/api/MainApi';
import { getAmountByCity, MAIN_URL } from '../../assets/utils/constants';
import SofaPreloader from '../SofaPreloader/SofaPreloader';

function parseFeatureKey(item) {
  switch (item.key) {
    case 'height':
      return 'Высота'

    case 'width':
      return 'Ширина'

    case 'depth':
      return 'Глубина'

    case 'weight':
      return 'Вес'

    case 'colour':
      return 'Цвет'

    case 'material':
      return 'Материал'


    default:
      return item.key
  }
}

function parseFeatureValue(item) {
  switch (item.key) {
    case 'height':
    case 'width':
    case 'depth':
      return `${item.value} мм`

    case 'weight':
      return `${item.value} кг`



    default:
      return `${item.value}`
  }
}

moment.locale('ru')


function BuyInfo({ selectedByColorProduct, handleLikeBtn, isInFavorite, isInCart, price, selectedProduct, handleColorOpen, addToCart, isMobile }) {
  return (
    <div className={`product-page__info-container ${isMobile ? 'product-page__info-container_mobile' : 'product-page__info-container_pc'}`}>
      <div className="product-page__firts-info-row">
        <div className="product-page__favorite-container product-page__favorite-container_pc" onClick={() => {
          if (selectedByColorProduct) {
            handleLikeBtn(selectedByColorProduct)
          }
          else {
            handleLikeBtn(selectedProduct)
          }
        }}>
          <svg className="product-page__favorite-icon" width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={`product-page__favorite-icon-path ${isInFavorite ? 'product-page__favorite-icon-path_selected' : ''}`} fillRule="evenodd" clipRule="evenodd" d="M1 6.41942C1 3.35052 3.67497 1 6.79822 1C8.31068 1 9.77606 1.55263 10.8686 2.55887L11.5 3.14046L12.1314 2.55887C13.2239 1.55263 14.6893 1 16.2018 1C19.325 1 22 3.35052 22 6.41942C22 7.88451 21.3674 9.27117 20.2721 10.28L12.1775 17.7355C11.7946 18.0882 11.2054 18.0882 10.8225 17.7355L2.72789 10.28C1.63263 9.27117 1 7.88451 1 6.41942Z" fill="var(--contrast-color)" stroke="#B3B3B3" />
          </svg>
          <p className={`product-page__favorite-text ${isInFavorite ? 'product-page__favorite-text_selected' : ''}`}>{isInFavorite ? 'В избранном' : 'В избранное'}</p>
        </div>

      </div>

      <div className="product-page__second-info-row">
        {price > 0 ? <p className="product-page__price">{price.toLocaleString('us')}&nbsp;₽</p> : null}

        {selectedProduct.amount > 0 ?
          <div className={`product-page__buy-btn ${isInCart ? 'product-page__buy-btn_in-cart' : ''}`} onClick={addToCart}>
            <p className={`product-page__buy-btn-text ${isInCart ? 'product-page__buy-btn-text_in-cart' : ''}`}>{isInCart ? 'Убрать из корзины' : 'Купить'}</p>
          </div>
          :
          <a className={`product-page__buy-btn`} href="tel:+79199401208">
            <p className={`product-page__buy-btn-text`}>Звонок менеджеру</p>
          </a>
        }

      </div>
      {selectedProduct.variations && selectedProduct.variations.length > 0 ?
        <div className="product-page__change-color-btn" onClick={handleColorOpen}>
          <div className="product-page__change-color-data">
            <p className="product-page__change-color-name">{selectedByColorProduct ? selectedByColorProduct.specifications.colour : selectedProduct && selectedProduct.specifications.colour}</p>
            <p className="product-page__change-color-title">Цвет</p>
          </div>
          <svg className="product-page__change-color-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L13.2929 10.7071C13.6834 10.3166 13.6834 9.68342 13.2929 9.29289L6 2" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        : <></>}


      <p className={`product-page__amount ${selectedProduct.amount > 0 ? '' : 'product-page__amount_zero'}`}>{selectedProduct.amount > 0 ? `Доступно ${selectedProduct.amount} шт.` : `Нет в наличии`}</p>
    </div>
  )
}

function ProductPage({ handleToCartBtn, cart, handleColorPopupOpen, handleLikeBtn, favouritesProducts }) {
  const { url } = useRouteMatch();
  const history = useHistory();
  let { id, color, category, sub_category } = useParams();

  const [isPreloaderVisible, setPreloaderVisible] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const [selectedByColorProduct, setSelectedByColorProduct] = useState(null);

  useEffect(() => {
    if (category && sub_category && id) {
      setPreloaderVisible(true)
      console.log(category, sub_category, id)
      mainApi.getExactItem({
        category_translit_name: category,
        sub_category_translit_name: sub_category,
        _id: id
      })
        .then((res) => {
          console.log(res)
          setSelectedProduct({
            ...res,
            amount: getAmountByCity(res.seller_cities)
          })
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setPreloaderVisible(false)
        })


    }
  }, [category, sub_category, id])

  const [selectedPhotoId, setSelectedPhotoId] = useState(1);

  function handleNextFotoClick() {
    var items = document.getElementById("mini-photos");
    if (selectedByColorProduct) {
      if (selectedPhotoId + 1 > selectedByColorProduct.photos.slice(0, 5).length) {
        setSelectedPhotoId(1)

        items.scrollTo({ left: 0, behavior: 'smooth' });
      }
      else {
        setSelectedPhotoId(selectedPhotoId + 1)
        items.scrollTo({ left: ((items.scrollWidth / selectedByColorProduct.photos.slice(0, 5).length) * selectedPhotoId), behavior: 'smooth' });
      }


    } else {
      if (selectedPhotoId + 1 > selectedProduct.photos.slice(0, 5).length) {
        setSelectedPhotoId(1)

        items.scrollTo({ left: 0, behavior: 'smooth' });
      }
      else {
        setSelectedPhotoId(selectedPhotoId + 1)
        items.scrollTo({ left: ((items.scrollWidth / selectedProduct.photos.slice(0, 5).length) * selectedPhotoId), behavior: 'smooth' });
      }
    }

  }

  function handlePrevFotoClick() {
    var items = document.getElementById("mini-photos");
    if (selectedPhotoId === 1) {

      setSelectedPhotoId(selectedProduct.photos.slice(0, 5).length)
      items.scrollTo({ left: items.scrollWidth, behavior: 'smooth' });
    }
    else {
      setSelectedPhotoId(selectedPhotoId - 1)
      items.scrollTo({ left: ((items.scrollWidth / selectedProduct.photos.slice(0, 5).length) * (selectedPhotoId - 2)), behavior: 'smooth' });
    }
  }



  function handleColorOpen() {
    console.log(color)
    if (!color) {
      handleColorPopupOpen({ product: selectedProduct, active_color: selectedProduct.specifications.colour })
    } else {
      handleColorPopupOpen({ product: selectedProduct, active_color: color })
    }

  }

  useEffect(() => {
    setSelectedPhotoId(1)
  }, [color])

  const price = () => {

    const name = localStorage.getItem('city') ? localStorage.getItem('city') : 'Тобольск'
    let cityMap = {
      "Новый Уренгой": "63777e52c505252a8fc59c09",
      "Надым": "63777e62c505252a8fc59c0a",
      "Тобольск": "63777e74c505252a8fc59c0b",
    }
    let id = cityMap[name] ? cityMap[name] : "63777e74c505252a8fc59c0b"
    let value = selectedProduct.firstc_data.price[id]
    return Number(value)
  }

  const isInFavorite = selectedProduct && favouritesProducts && favouritesProducts.filter((item) => {
    if (item && item._id === selectedProduct._id) return true
    else return false
  }).length > 0

  const isInCart = selectedProduct && cart && cart.filter((item) => {
    if (selectedProduct._id === item._id) return true
    else return false
  }).length > 0

  function addToCart() {
    handleToCartBtn(selectedProduct)
    if (isInCart) {
      // history.push('/cart')

    }

  }

  const priceValue = selectedProduct ? price() : 0

  return (
    <div className="product-page">
      {isPreloaderVisible ?
        <div className='product-page__preloader'>
          <SofaPreloader />
        </div>
        :
        <>
          <Crumbs links={[
            {
              name: 'Главная',
              to: '/',
            },
            {
              name: selectedProduct && selectedProduct.category.name,
              to: `/categories/${selectedProduct.category.translit_name}`,
            },
            {
              name: selectedProduct && selectedProduct.sub_category.name,
              to: `/sub-category/${selectedProduct.category.translit_name}/${selectedProduct.sub_category.translit_name}`,
            },
            {
              name: selectedProduct && selectedProduct.name,
              to: `${url}`,
            },

          ]} />
          {selectedProduct &&
            <div className="product-page__container">
              <div className='product-page__content-container'>
                <h2 className="product-page__title">{selectedProduct.name}</h2>
                <div className="product-page__photo-and-info">
                  <div className="product-page__photos">
                    <div className="product-page__photos-mini" id="mini-photos">
                      {selectedProduct.photos && selectedProduct.photos.slice(0, 5).map((item, i) => (
                        <div className={`product-page__photo-mini ${selectedPhotoId === i + 1 ? 'product-page__photo-mini_selected' : ''}`} key={`product-page__photo-mini${i}`} onClick={() => { setSelectedPhotoId(i + 1) }}>
                          <img className="product-page__photo-mini-img" src={`${MAIN_URL}/get-file/${item}`} alt={`${selectedProduct.name} фото №${i + 1}`}></img>
                        </div>
                      ))}
                    </div>

                    <div className="product-page__big-photo-container" unselectable='true'>

                      <div className="product-page__big-photo-controllers">
                        {selectedProduct.photos.length > 1 ?
                          <>
                            <div onClick={handlePrevFotoClick} className="product-page__big-photo-controller-area">
                              <svg className="product-page__big-photo-controller product-page__big-photo-controller_left" width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.7848 40.4688C9.7391 40.4688 0.78479 31.5144 0.78479 20.4688V20.4688C0.78479 9.42306 9.7391 0.46875 20.7848 0.46875V0.46875C31.8305 0.46875 40.7848 9.42306 40.7848 20.4688V20.4688C40.7848 31.5144 31.8305 40.4688 20.7848 40.4688V40.4688Z" fill="var(--contrast-color)" />
                                <path d="M23.7848 14.4688L18.4919 19.7616C18.1014 20.1522 18.1014 20.7853 18.4919 21.1759L23.7848 26.4688" stroke="white" strokeLinecap="round" />
                              </svg>
                            </div>
                            <div onClick={handleNextFotoClick} className="product-page__big-photo-controller-area">
                              <svg className="product-page__big-photo-controller product-page__big-photo-controller_right" width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.2152 0.46875C31.2609 0.46875 40.2152 9.42306 40.2152 20.4688V20.4688C40.2152 31.5144 31.2609 40.4688 20.2152 40.4688V40.4688C9.16952 40.4687 0.21521 31.5144 0.21521 20.4687V20.4687C0.21521 9.42306 9.16952 0.46875 20.2152 0.46875V0.46875Z" fill="var(--contrast-color)" />
                                <path d="M17.2152 26.4688L22.5081 21.1759C22.8986 20.7853 22.8986 20.1522 22.5081 19.7616L17.2152 14.4687" stroke="white" strokeLinecap="round" />
                              </svg>
                            </div>
                          </>
                          : <></>}

                      </div>


                      <img className="product-page__big-photo-img" src={selectedProduct.photos && `${MAIN_URL}/get-file/${selectedProduct.photos[selectedPhotoId - 1]}`} key={`${selectedProduct._id}${selectedPhotoId}`} alt={`${selectedProduct.name} фото №${selectedPhotoId}`}></img>
                    </div>
                  </div>

                </div>
                <BuyInfo
                  selectedByColorProduct={selectedByColorProduct}
                  handleLikeBtn={handleLikeBtn}
                  isInFavorite={isInFavorite}
                  isInCart={isInCart}
                  price={priceValue}
                  selectedProduct={selectedProduct}
                  handleColorOpen={handleColorOpen}
                  addToCart={addToCart}
                  isMobile={true}
                />

                <div className="product-page__specifications" id='specifications'>
                  {selectedProduct.description ?
                    <>
                      <p className="product-page__specifications-title">Описание</p>
                      <p className="product-page__description">{selectedProduct.description}</p>
                    </> : <></>}

                  <div className="product-page__specification-items">

                    {selectedProduct && selectedProduct.firstc_data.brand_name ?
                      <div className="product-page__specification-item">
                        <p className="product-page__specification-name">Производитель</p>
                        <div className="product-page__specification-line"></div>
                        <p className={`product-page__specification-value ${selectedProduct.firstc_data.brand_name.length <= 36 ? 'product-page__specification-value_nowrap' : ''}`}>{selectedProduct.firstc_data.brand_name}</p>
                      </div>
                      : <></>}

                    <div className="product-page__specification-item">
                      <p className="product-page__specification-name">Артикул</p>
                      <div className="product-page__specification-line"></div>
                      <p className={`product-page__specification-value ${selectedProduct.firstc_data.barcode <= 36 ? 'product-page__specification-value_nowrap' : ''}`}>{selectedProduct.firstc_data.barcode}</p>
                    </div>


                    {selectedProduct.features && selectedProduct.features.length > 0 ?
                      selectedProduct.features.map((item) => (
                        <div className="product-page__specification-item">
                          <p className="product-page__specification-name">
                            {parseFeatureKey(item)}
                          </p>
                          <div className="product-page__specification-line"></div>
                          <p className={`product-page__specification-value ${parseFeatureValue(item).length <= 20 ? 'product-page__specification-value_nowrap' : ''}`}>{parseFeatureValue(item)}</p>
                        </div>
                      ))
                      : <></>}

                  </div>

                </div>

              </div>

              <div className='product-page__infos'>
                <BuyInfo
                  selectedByColorProduct={selectedByColorProduct}
                  handleLikeBtn={handleLikeBtn}
                  isInFavorite={isInFavorite}
                  isInCart={isInCart}
                  price={priceValue}
                  selectedProduct={selectedProduct}
                  handleColorOpen={handleColorOpen}
                  addToCart={addToCart}
                  isMobile={false}
                />

              </div>



            </div>
          }
        </>
      }

    </div >


  );
}

export default ProductPage;
