import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch, useHistory } from 'react-router';
import moment from 'moment-timezone';
import 'moment/locale/ru'

import Crumbs from '../Сrumbs/Сrumbs'

import './ProductPage.css';
import mainApi from '../../assets/api/MainApi';
import { getAmountByCity, MAIN_URL } from '../../assets/utils/constants';

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


function ProductPage(props) {
  const { url } = useRouteMatch();
  const history = useHistory();
  let { product_name, color } = useParams();


  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const [selectedByColorProduct, setSelectedByColorProduct] = useState(null);

  useEffect(() => {
    if (props.category, props.sub_category, product_name) {

      console.log(props.category, props.sub_category, product_name)
      mainApi.getExactItem({
        category_translit_name: props.category.translit_name,
        sub_category_translit_name: props.sub_category.translit_name,
        _id: product_name
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


    }
  }, [props.category, props.sub_category, product_name])

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

  function addToCart() {
    if (selectedByColorProduct) {
      props.handleToCartBtn(selectedByColorProduct)
      if (props.cart && props.cart.filter((item) => {
        if (selectedByColorProduct._id === item._id) return true
        else return false
      }).length === 0) {
        history.push('/cart')
        // props.setCartPopupOpen(true)
      }
    } else {
      props.handleToCartBtn(selectedProduct)
      if (props.cart && props.cart.filter((item) => {
        if (selectedProduct._id === item._id) return true
        else return false
      }).length === 0) {
        history.push('/cart')
        // props.setCartPopupOpen(true)
      }

    }

  }

  function handleColorOpen() {
    console.log(color)
    if (!color) {
      props.handleColorPopupOpen({ product: selectedProduct, active_color: selectedProduct.specifications.colour })
    } else {
      props.handleColorPopupOpen({ product: selectedProduct, active_color: color })
    }

  }

  React.useEffect(() => {
    setSelectedPhotoId(1)
  }, [color])



  return (
    <div className="product-page">
      <Crumbs links={[
        {
          name: 'Главная',
          to: '/',
        },
        {
          name: props.category && props.category.name,
          to: `/categories/${props.category.translit_name}`,
        },
        {
          name: props.sub_category && props.sub_category.name,
          to: `/categories/${props.category.translit_name}/${props.sub_category.translit_name}`,
        },
        {
          name: selectedProduct && selectedProduct.name,
          to: `${url}`,
        },

      ]} />
      {selectedProduct &&
        <div className="product-page__container">
          <div className="product-page__favorite-container product-page__favorite-container_mobile" onClick={() => {
            if (selectedByColorProduct) {
              props.handleLikeBtn(selectedByColorProduct)
            }
            else {
              props.handleLikeBtn(selectedProduct)
            }
          }}>
            <svg className="product-page__favorite-icon" width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className={`product-page__favorite-icon-path ${props.favouritesProducts && props.favouritesProducts.filter((item) => {
                if (item._id === selectedProduct._id) return true
                else return false
              }).length > 0 ? 'product-page__favorite-icon-path_selected' : ''}`} fillRule="evenodd" clipRule="evenodd" d="M1 6.41942C1 3.35052 3.67497 1 6.79822 1C8.31068 1 9.77606 1.55263 10.8686 2.55887L11.5 3.14046L12.1314 2.55887C13.2239 1.55263 14.6893 1 16.2018 1C19.325 1 22 3.35052 22 6.41942C22 7.88451 21.3674 9.27117 20.2721 10.28L12.1775 17.7355C11.7946 18.0882 11.2054 18.0882 10.8225 17.7355L2.72789 10.28C1.63263 9.27117 1 7.88451 1 6.41942Z" fill="#9B38DC" stroke="#B3B3B3" />
            </svg>
            <p className={`product-page__favorite-text ${props.favouritesProducts && props.favouritesProducts.filter((item) => {
              if (item._id === selectedProduct._id) return true
              else return false
            }).length > 0 ? 'product-page__favorite-text_selected' : ''}`}>{props.favouritesProducts && props.favouritesProducts.filter((item) => {
              if (item._id === selectedProduct._id) return true
              else return false
            }).length > 0 ? 'В избранном' : 'В избранное'}</p>
          </div>
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
                          <path d="M20.7848 40.4688C9.7391 40.4688 0.78479 31.5144 0.78479 20.4688V20.4688C0.78479 9.42306 9.7391 0.46875 20.7848 0.46875V0.46875C31.8305 0.46875 40.7848 9.42306 40.7848 20.4688V20.4688C40.7848 31.5144 31.8305 40.4688 20.7848 40.4688V40.4688Z" fill="#9B38DC" />
                          <path d="M23.7848 14.4688L18.4919 19.7616C18.1014 20.1522 18.1014 20.7853 18.4919 21.1759L23.7848 26.4688" stroke="white" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div onClick={handleNextFotoClick} className="product-page__big-photo-controller-area">
                        <svg className="product-page__big-photo-controller product-page__big-photo-controller_right" width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.2152 0.46875C31.2609 0.46875 40.2152 9.42306 40.2152 20.4688V20.4688C40.2152 31.5144 31.2609 40.4688 20.2152 40.4688V40.4688C9.16952 40.4687 0.21521 31.5144 0.21521 20.4687V20.4687C0.21521 9.42306 9.16952 0.46875 20.2152 0.46875V0.46875Z" fill="#9B38DC" />
                          <path d="M17.2152 26.4688L22.5081 21.1759C22.8986 20.7853 22.8986 20.1522 22.5081 19.7616L17.2152 14.4687" stroke="white" strokeLinecap="round" />
                        </svg>
                      </div>
                    </>
                    : <></>}

                </div>


                <img className="product-page__big-photo-img" src={selectedProduct.photos && `${MAIN_URL}/get-file/${selectedProduct.photos[selectedPhotoId - 1]}`} alt={`${selectedProduct.name} фото №${selectedPhotoId}`}></img>
              </div>
            </div>
            <div className="product-page__info-container">
              <div className="product-page__firts-info-row">
                <div className="product-page__favorite-container product-page__favorite-container_pc" onClick={() => {
                  if (selectedByColorProduct) {
                    props.handleLikeBtn(selectedByColorProduct)
                  }
                  else {
                    props.handleLikeBtn(selectedProduct)
                  }
                }}>
                  <svg className="product-page__favorite-icon" width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={`product-page__favorite-icon-path ${props.favouritesProducts && props.favouritesProducts.filter((item) => {
                      if (selectedByColorProduct ? item._id === selectedByColorProduct._id : item._id === selectedProduct._id) return true
                      else return false
                    }).length > 0 ? 'product-page__favorite-icon-path_selected' : ''}`} fillRule="evenodd" clipRule="evenodd" d="M1 6.41942C1 3.35052 3.67497 1 6.79822 1C8.31068 1 9.77606 1.55263 10.8686 2.55887L11.5 3.14046L12.1314 2.55887C13.2239 1.55263 14.6893 1 16.2018 1C19.325 1 22 3.35052 22 6.41942C22 7.88451 21.3674 9.27117 20.2721 10.28L12.1775 17.7355C11.7946 18.0882 11.2054 18.0882 10.8225 17.7355L2.72789 10.28C1.63263 9.27117 1 7.88451 1 6.41942Z" fill="#9B38DC" stroke="#B3B3B3" />
                  </svg>
                  <p className={`product-page__favorite-text ${props.favouritesProducts && props.favouritesProducts.filter((item) => {
                    if (selectedByColorProduct ? item._id === selectedByColorProduct._id : item._id === selectedProduct._id) return true
                    else return false
                  }).length > 0 ? 'product-page__favorite-text_selected' : ''}`}>{props.favouritesProducts && props.favouritesProducts.filter((item) => {
                    if (selectedByColorProduct ? item._id === selectedByColorProduct._id : item._id === selectedProduct._id) return true
                    else return false
                  }).length > 0 ? 'В избранном' : 'В избранное'}</p>
                </div>
                <p className="product-page__article">Артикул<span className="product-page__article-value">{selectedProduct.firstc_data.barcode}</span></p>
                <a href={url + '#specifications'} className="product-page__specifications-link">Все характеристики</a>
              </div>
              <div className="product-page__second-info-row">
                <p className="product-page__price">{selectedByColorProduct ? selectedByColorProduct && selectedByColorProduct.price ? selectedByColorProduct.discount && selectedByColorProduct.discount > 0 ? (selectedByColorProduct.price - (selectedByColorProduct.price / 100 * selectedByColorProduct.discount)).toLocaleString('us') : selectedByColorProduct.price.toLocaleString('us') : '' : selectedProduct && Number(selectedProduct.firstc_data.price) ? selectedProduct.discount && selectedProduct.discount > 0 ? (Number(selectedProduct.firstc_data.price) - (Number(selectedProduct.firstc_data.price) / 100 * selectedProduct.discount)).toLocaleString('us') : Number(selectedProduct.firstc_data.price).toLocaleString('us') : '0'}&nbsp;₽</p>
                {selectedProduct && Number(selectedProduct.firstc_data.price) && selectedProduct.discount > 0 ?
                  <div className="product-page__discount-container">
                    <p className="product-page__discount">-{selectedProduct.discount}% <span className="product-page__discount-last-price">{Number(selectedProduct.firstc_data.price).toLocaleString('us')}&nbsp;₽</span></p>
                  </div>
                  : <></>}
                <div className={`product-page__buy-btn ${props.cart && props.cart.filter((item) => {
                  if (selectedByColorProduct ? item._id === selectedByColorProduct._id : selectedProduct._id === item._id) return true
                  else return false
                }).length > 0 ? 'product-page__buy-btn_in-cart' : ''}`} onClick={addToCart}>
                  <p className={`product-page__buy-btn-text ${props.cart && props.cart.filter((item) => {
                    if (selectedByColorProduct ? item._id === selectedByColorProduct._id : selectedProduct._id === item._id) return true
                    else return false
                  }).length > 0 ? 'product-page__buy-btn-text_in-cart' : ''}`}>{props.cart && props.cart.filter((item) => {
                    if (selectedByColorProduct ? item._id === selectedByColorProduct._id : selectedProduct._id === item._id) return true
                    else return false
                  }).length > 0 ? 'Убрать из корзины' : selectedByColorProduct ? selectedByColorProduct.amount > 0 ? 'Купить' : 'Предзаказ' : selectedProduct.amount > 0 ? 'Купить' : 'Предзаказ'}</p>
                </div>
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

              <div className="product-page__delivery">
                <div className="product-page__delivery-icon-container">
                  <svg className="product-page__delivery-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.84496 3.83984C1.49364 3.87667 1.19807 4.2066 1.19996 4.55984V17.0398C1.2 17.4168 1.54298 17.7598 1.91996 17.7598H3.20246C3.52882 19.1327 4.77163 20.1598 6.23996 20.1598C7.70829 20.1598 8.9511 19.1327 9.27746 17.7598H14.7225C15.0488 19.1327 16.2916 20.1598 17.76 20.1598C19.2283 20.1598 20.4711 19.1327 20.7975 17.7598H22.08C22.4569 17.7598 22.7999 17.4168 22.8 17.0398V11.7598C22.8006 11.6596 22.78 11.5592 22.74 11.4673L21.06 7.62734C20.9473 7.37398 20.6772 7.19906 20.4 7.19984H16.56V4.55984C16.5599 4.18286 16.2169 3.83988 15.84 3.83984C11.1768 3.83984 6.5027 3.83984 1.84496 3.83984ZM2.63996 5.27984H15.12V15.3898C14.9415 15.6728 14.8103 15.9864 14.73 16.3198H9.26996C8.94036 14.9514 7.70512 13.9198 6.23996 13.9198C4.7748 13.9198 3.53956 14.9514 3.20996 16.3198H2.63996V5.27984ZM16.56 8.63984H19.9275L20.9775 11.0398H16.56V8.63984ZM16.56 12.4798H21.36V16.3198H20.79C20.4604 14.9514 19.2251 13.9198 17.76 13.9198C17.3338 13.9198 16.9311 14.0105 16.56 14.1673V12.4798ZM6.23996 15.3598C7.17632 15.3598 7.91996 16.1035 7.91996 17.0398C7.91996 17.9762 7.17633 18.7198 6.23996 18.7198C5.30359 18.7198 4.55996 17.9762 4.55996 17.0398C4.55996 16.1035 5.3036 15.3598 6.23996 15.3598ZM17.76 15.3598C18.6963 15.3598 19.44 16.1035 19.44 17.0398C19.44 17.9762 18.6963 18.7198 17.76 18.7198C16.8236 18.7198 16.08 17.9762 16.08 17.0398C16.08 16.1035 16.8236 15.3598 17.76 15.3598Z" fill="#9B38DC" />
                  </svg>
                </div>
                <div className="product-page__delivery-info-container">
                  <p className="product-page__delivery-info">Доставка —  от 1 500 ₽</p>
                  <p className="product-page__delivery-info-date">{`${moment().add('days', 7).tz("Europe/Moscow").format('D')} ${moment().add('days', 7).tz("Europe/Moscow").format('DD MMMM').split(' ')[1].slice(0, 1).toUpperCase()}${moment().add('days', 7).tz("Europe/Moscow").format('DD MMMM').split(' ')[1].slice(1)}`}</p>
                </div>
              </div>
              <p className={`product-page__amount ${selectedProduct.amount > 0 ? '' : 'product-page__amount_zero'}`}>{selectedProduct.amount > 0 ? `Доступно ${selectedProduct.amount} шт.` : `Нет в наличии`}</p>
            </div>
          </div>
          <div className="product-page__specifications" id='specifications'>
            {selectedProduct.description ?
              <>
                <p className="product-page__specifications-title">Описание</p>
                <p className="product-page__description">{selectedProduct.description}</p>
              </> : <></>}

            <div className="product-page__specification-items">

              {selectedProduct && selectedProduct.firstc_data.brand_name ?
                <div className="product-page__specification-item">
                  <p className="product-page__specification-name">Бренд</p>
                  <div className="product-page__specification-line"></div>
                  <p className={`product-page__specification-value ${selectedProduct.firstc_data.brand_name.length <= 36 ? 'product-page__specification-value_nowrap' : ''}`}>{selectedProduct.firstc_data.brand_name}</p>
                </div>
                : <></>}
              {/*
              {selectedProduct && selectedProduct.specifications && selectedProduct.specifications.width && selectedProduct.specifications.width !== 'Не указано' ?
                <div className="product-page__specification-item">
                  <p className="product-page__specification-name">Ширина</p>
                  <div className="product-page__specification-line"></div>
                  <p className={`product-page__specification-value`}>{selectedProduct.specifications.width}&nbsp;мм.</p>
                </div>
                : <></>}
              {selectedProduct && selectedProduct.specifications && selectedProduct.specifications.height && selectedProduct.specifications.height !== 'Не указано' ?
                <div className="product-page__specification-item">
                  <p className="product-page__specification-name">Высота</p>
                  <div className="product-page__specification-line"></div>
                  <p className={`product-page__specification-value`}>{selectedProduct.specifications.height}&nbsp;мм.</p>
                </div>
                : <></>}
              {selectedProduct && selectedProduct.specifications && selectedProduct.specifications.depth && selectedProduct.specifications.depth !== 'Не указано' ?
                <div className="product-page__specification-item">
                  <p className="product-page__specification-name">Глубина</p>
                  <div className="product-page__specification-line"></div>
                  <p className={`product-page__specification-value`}>{selectedProduct.specifications.depth}&nbsp;мм.</p>
                </div>
                : <></>}
              {selectedProduct && selectedProduct.specifications && selectedProduct.specifications.weight && selectedProduct.specifications.weight !== 'Не указано' ?
                <div className="product-page__specification-item">
                  <p className="product-page__specification-name">Вес</p>
                  <div className="product-page__specification-line"></div>
                  <p className={`product-page__specification-value`}>{selectedProduct.specifications.weight}&nbsp;кг.</p>
                </div>
                : <></>}
              {selectedProduct && selectedProduct.specifications && selectedProduct.specifications.material && selectedProduct.specifications.material !== 'Не указано' ?
                <div className="product-page__specification-item">
                  <p className="product-page__specification-name">Материалы</p>
                  <div className="product-page__specification-line"></div>
                  <p className={`product-page__specification-value ${selectedByColorProduct ? selectedByColorProduct.specifications.material.length <= 20 ? 'product-page__specification-value_nowrap' : '' : selectedProduct.specifications.material.length <= 20 ? 'product-page__specification-value_nowrap' : ''}`}>{selectedByColorProduct ? selectedByColorProduct.specifications.material : selectedProduct.specifications.material}</p>
                </div>
                : <></>} */}

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
      }

    </div >
  );
}

export default ProductPage;
