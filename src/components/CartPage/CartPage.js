import React, { useState } from 'react'
// import { Route, Link } from 'react-router-dom';
import Cart from './Cart/Cart';
import { useHistory } from 'react-router-dom';


import './CartPage.css';
import DeliveryMethod from './DeliveryMethod/DeliveryMethod';

import { deliveryMethods } from '../../utils/utils';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import UserData from './UserData/UserData';


import emptyIcon from '../../assets/images/empry-cart.png'
import { getCorrectWordForm, getPrice, sendMetriс } from '../../assets/utils/utils';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import { getCityId } from '../../assets/utils/constants';
import mainApi from '../../assets/api/MainApi';
import MiniPreloader from '../MiniPreloader/MiniPreloader';
import { Helmet } from 'react-helmet';
// import { copyText } from '../../assets/utils/utils';



function CartPage({
  allCartProductsCount,
  setSubmitActionPopupOpen,
  handleLikeBtn,
  favouritesProducts,
  setCart,
  cart,
  currentUser,
  loggedIn,

}) {

  const history = useHistory();
  const [userDataValid, setUserDataValid] = useState(false);



  const [personalValues, setPersonalValues] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });


  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false)
  function handleCloseSuccessPopup() {
    setSuccessPopupOpen(false)
    history.goBack()
  }
  const [isPreloaderVisible, setPreloaderVisible] = useState(false)
  const [createdOrder, setCreatedOrder] = useState(undefined)
  function handleCreateOrder() {
    if (isPreloaderVisible) return
    let cartPrevArray = JSON.parse(localStorage.getItem("cart"));
    setPreloaderVisible(true)
    let cart_to_api = cart.map((item) => {
      return {
        item_id: item._id,
        amount: item.count.toString(),
      }
    })
    let city_id = localStorage.getItem('city') ? getCityId(localStorage.getItem('city')) : '63777e74c505252a8fc59c0b'
    console.log(cart_to_api, city_id, personalValues)

    mainApi.createOrder({
      data: cart_to_api,
      city_id: city_id,
      first_name: personalValues.first_name,
      last_name: personalValues.last_name,
      phone: personalValues.phone.replace(/\D/g, ''),
      email: personalValues.email,
    })
      .then((res) => {
        console.log(res)
        setCreatedOrder(res)
        setSuccessPopupOpen(true)
        let cartArray = []
        setCart(cartArray)
        localStorage.setItem("cart", JSON.stringify(cartArray));
        sendMetriс('reachGoal', 'CREATE_ORDER_2')
        window.dataLayer.push({
          ecommerce: {
            currencyCode: "RUB",
            purchase: {
              products: cartPrevArray.map((product, i) => {
                return {
                  id: product?._id,
                  name: product?.name,
                  category: product ? `${product.category.name}/${product.sub_category.name}` : '',
                  price: getPrice(product),
                  quantity: product.count,
                }
              }),
              actionField: {
                id: `№${('00000000' + res.ai_id).slice(-8)}`,
                goal_id: 291857837,
              }
            },
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setPreloaderVisible(false)
      })

  }

  const [step, setStep] = useState(0)

  return (
    <div className={`cart-page ${step === 1 ? 'cart-page_step-1' : ''}`}>
      <Helmet>
        <title>Диванчик - Корзина</title>
      </Helmet>
      <SuccessPopup ai_id={createdOrder ? `№${('00000000' + createdOrder.ai_id).slice(-8)}` : ''} isOpen={isSuccessPopupOpen} handleClose={handleCloseSuccessPopup} />
      {allCartProductsCount.count && allCartProductsCount.count > 0 ?
        <>
          <div className="cart-page__main">
            <div className="cart-page__section-go-back" onClick={() => {
              if (step === 0) {
                history.goBack()

                sendMetriс('reachGoal', 'CREATE_ORDER_GO_BACK_TO_GOODS')

              } else {
                sendMetriс('reachGoal', 'CREATE_ORDER_RETURN_TO_1')
                setStep(0)
              }
            }}>
              <svg className="cart-page__section-go-back-arrow" width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.30926 4.5L4.77722 7.86484L4.12259 8.5L0 4.5L4.12259 0.5L4.77723 1.13516L1.30926 4.5Z" fill="var(--contrast-color)" />
                <path fillRule="evenodd" clipRule="evenodd" d="M0.633865 4.94907H10V4.05082H0.633865V4.94907Z" fill="var(--contrast-color)" />
              </svg>
              <p className="cart-page__section-go-back-text">{step === 0 ? 'Вернуться к покупкам' : 'Вернуться к товарам'}</p>
            </div>
            {step === 0 ?
              <>
                <div className="cart-page__section-heading">

                  <h2 className="cart-page__section-heading-title">Корзина</h2>
                  <div className="cart-page__section-reset-cart" onClick={() => { setSubmitActionPopupOpen(true) }}>
                    <p className="cart-page__section-reset-cart-text">Очистить корзину</p>
                  </div>

                </div>
                <Cart
                  handleLikeBtn={handleLikeBtn}
                  favouritesProducts={favouritesProducts}
                  allCartProductsCount={allCartProductsCount}
                  setCart={setCart}
                  cart={cart}
                />
              </>

              : null}
            {/* <div className="cart-page__section-heading">
              <h2 className="cart-page__section-heading-title">2 Способ и дата получения</h2>
            </div>
            <DeliveryMethod
              setDeliveryMethodValid={setDeliveryMethodValid}
              setFullAdressValue={setFullAdressValue}
              handleDeliveryMethodSelect={handleDeliveryMethodSelect}
              deliveryMethod={deliveryMethod}
            />
            <div className="cart-page__section-heading">
              <h2 className="cart-page__section-heading-title">3 Способ Оплаты</h2>
            </div>
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            /> */}
            {step === 1 ?
              <>
                <div className="cart-page__section-heading">
                  <h2 className="cart-page__section-heading-title">Контакты</h2>

                </div>
                <UserData
                  setUserDataValid={setUserDataValid}
                  currentUser={currentUser}
                  loggedIn={loggedIn}
                  personalValues={personalValues}
                  setPersonalValues={setPersonalValues}
                />
              </>
              : null}

          </div>
          <div className="cart-page__summary">
            <div className="cart-page__summary-info">
              <p className="cart-page__summary-title">В корзине</p>
              <p className="cart-page__summary-count">{allCartProductsCount.count} {getCorrectWordForm(allCartProductsCount.count)}</p>
              <p className="cart-page__summary-total">{allCartProductsCount.totalPrice.toLocaleString('us')}&nbsp;₽</p>
              {/* <p className="cart-page__summary-delivery">{deliveryMethod[0].toUpperCase() + deliveryMethod.slice(1)}: <span className="cart-page__summary-delivery-method"></span></p> */}
              {/* <p className="cart-page__summary-delivery-adress">{deliveryMethod === 'Самовывоз'.toLowerCase() ? 'Магазин Диванчик по адресу: 7-й микрорайон, 2А, Тобольск, Тюменская область' : fullAdressValue ? fullAdressValue : 'Укажите адрес'}</p> */}
              {/* <p className="cart-page__summary-date">Дата: <span className="cart-page__summary-date-period">{deliveryMethod === 'Самовывоз'.toLowerCase() ? 'Завтра после 17:00' : '2 Октября - 16 Ноября'}</span></p> */}
              {/* <p className="cart-page__summary-payment">Оплата: <span className="cart-page__summary-payment-method">{paymentMethod}</span></p> */}
              <button className={`cart-page__summary-pay-btn ${step === 0 ? '' : userDataValid ? '' : 'cart-page__summary-pay-btn_inactive'}`} type="button" onClick={() => {
                if (step === 0) {
                  sendMetriс('reachGoal', 'CREATE_ORDER_2')
                  setStep(1)
                  window.scrollTo(0, 0);
                }
                else {
                  handleCreateOrder()
                }
              }}>
                {
                  isPreloaderVisible ?
                    <MiniPreloader isLinkColor={true} />
                    :
                    <p className="cart-page__summary-pay-btn-text">{step === 0 ? 'Оформить заказ' : 'Подтвердить заказ'}</p>
                }
              </button>
            </div>
            {/* <button type='button' className="cart-page__summary-share" onClick={() => {
              let parms = {
                cart: JSON.stringify(cart)
              }
              copyText({ text: `${window.location.protocol}//${window.location.host}/share-cart?` + new URLSearchParams(parms), setCopied: setCartCopied })
            }}>{isCartCopied? 'Ссылка скопирована' : 'Поделиться корзиной'}</button> */}
          </div>
        </>
        :
        <div className="cart-page__empty">
          {/* <img  src={emptyIcon} alt='Пустая корзина' /> */}
          <svg className="cart-page__empty-icon" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.5201 76.1583C36.2594 76.1583 38.4801 73.9376 38.4801 71.1983C38.4801 68.4589 36.2594 66.2383 33.5201 66.2383C30.7807 66.2383 28.5601 68.4589 28.5601 71.1983C28.5601 73.9376 30.7807 76.1583 33.5201 76.1583Z" fill="#E11C23" />
            <path d="M56.4001 76.1583C59.1394 76.1583 61.3601 73.9376 61.3601 71.1983C61.3601 68.4589 59.1394 66.2383 56.4001 66.2383C53.6607 66.2383 51.4401 68.4589 51.4401 71.1983C51.4401 73.9376 53.6607 76.1583 56.4001 76.1583Z" fill="#E11C23" />
            <path d="M68.08 30.5605H66.24C65.52 30.5605 64.72 30.5605 64 30.5605H28.56L28 28.8005C26.88 25.0405 23.44 22.4805 19.52 22.4805H8.08003C5.68003 22.4805 3.84003 24.5605 4.08003 26.9605C4.32003 29.0405 6.16003 30.5605 8.32003 30.5605H14.8C16.8 30.5605 18.64 31.9205 19.2 33.8405L20.56 38.4005C20.56 38.4805 20.56 38.5605 20.56 38.5605L26.32 57.6005C27.28 60.7205 30.16 62.8805 33.44 62.8805H58.24C61.6 62.8805 64.56 60.6405 65.36 57.3605L69.36 38.4005C70.8 37.9205 72 36.6405 72.16 35.0405C72.32 32.6405 70.4 30.5605 68.08 30.5605ZM46 56.6405C40.56 56.6405 36.08 52.2405 36.08 46.7205C36.08 41.2805 40.48 36.8005 46 36.8005C51.44 36.8005 55.92 41.2005 55.92 46.7205C55.92 52.2405 51.52 56.6405 46 56.6405Z" fill="#E11C23" />
            <path d="M48.32 46.7205L50.88 44.1605C51.36 43.6805 51.36 42.8805 50.88 42.4005L50.4 41.8405C49.92 41.3605 49.12 41.3605 48.64 41.8405L46.16 44.3205L43.68 41.8405C43.2 41.3605 42.4 41.3605 41.92 41.8405L41.2 42.4005C40.72 42.8805 40.72 43.6805 41.2 44.1605L43.68 46.6405L41.12 49.2005C40.64 49.6805 40.64 50.4805 41.12 50.9605L41.6 51.4405C42.08 51.9205 42.88 51.9205 43.36 51.4405L45.92 48.8805L48.48 51.4405C48.96 51.9205 49.76 51.9205 50.24 51.4405L50.72 50.9605C51.2 50.4805 51.2 49.6805 50.72 49.2005L48.32 46.7205Z" fill="#E11C23" />
          </svg>

          <p className="cart-page__empty-title">В вашей корзине пусто</p>
          <p className="cart-page__empty-text">Вам надо выбрать товар, который Вас интересует, чтобы оформить покупку. </p>
          <div className="cart-page__section-go-back cart-page__section-go-back_empty" onClick={() => history.goBack()}>
            <svg className="cart-page__section-go-back-arrow" width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.30926 4.5L4.77722 7.86484L4.12259 8.5L0 4.5L4.12259 0.5L4.77723 1.13516L1.30926 4.5Z" fill="var(--contrast-color)" />
              <path fillRule="evenodd" clipRule="evenodd" d="M0.633865 4.94907H10V4.05082H0.633865V4.94907Z" fill="var(--contrast-color)" />
            </svg>
            <p className="cart-page__section-go-back-text">Вернуться к покупкам</p>
          </div>
        </div>}

    </div>
  );
}

export default CartPage;
