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

  const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethods[0].name.toLowerCase());

  const [fullAdressValue, setFullAdressValue] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Наличными или картой (переводом) при получении');

  const [userDataValid, setUserDataValid] = useState(false);
  const [deliveryMethodValid, setDeliveryMethodValid] = useState(false);

  function handleDeliveryMethodSelect(method) {
    setDeliveryMethod(method.toLowerCase())
  }

  const [isCartCopied, setCartCopied] = useState('')



  return (
    <div className="cart-page">
      {allCartProductsCount.count && allCartProductsCount.count > 0 ?
        <>
          <div className="cart-page__main">
            <div className="cart-page__section-heading">

              <h2 className="cart-page__section-heading-title">Корзина</h2>
              <div className="cart-page__section-reset-cart" onClick={() => { setSubmitActionPopupOpen(true) }}>
                <p className="cart-page__section-reset-cart-text">очистить корзину</p>
              </div>
              <div className="cart-page__section-go-back" onClick={() => history.goBack()}>
                <svg className="cart-page__section-go-back-arrow" width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.30926 4.5L4.77722 7.86484L4.12259 8.5L0 4.5L4.12259 0.5L4.77723 1.13516L1.30926 4.5Z" fill="var(--contrast-color)" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.633865 4.94907H10V4.05082H0.633865V4.94907Z" fill="var(--contrast-color)" />
                </svg>
                <p className="cart-page__section-go-back-text">Вернуться к покупкам</p>
              </div>
            </div>
            <Cart
              handleLikeBtn={handleLikeBtn}
              favouritesProducts={favouritesProducts}
              allCartProductsCount={allCartProductsCount}
              setCart={setCart}
              cart={cart}
            />
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
            <div className="cart-page__section-heading">
              <h2 className="cart-page__section-heading-title">Ваши данные</h2>
            </div>
            <UserData
              setUserDataValid={setUserDataValid}
              currentUser={currentUser}
              loggedIn={loggedIn} />
          </div>
          <div className="cart-page__summary">
            <div className="cart-page__summary-info">
              <p className="cart-page__summary-title">В корзине</p>
              <p className="cart-page__summary-count">{allCartProductsCount.count} {allCartProductsCount.count % 10 === 1 && 'товар'}{(allCartProductsCount.count % 10 >= 2 && allCartProductsCount.count % 10 <= 4) && 'товара'}{((allCartProductsCount.count % 10 >= 5 && allCartProductsCount.count % 10 <= 9) || allCartProductsCount.count % 10 === 0) && 'товаров'}</p>
              <p className="cart-page__summary-total">{allCartProductsCount.totalPrice.toLocaleString('us')}&nbsp;₽</p>
              {/* <p className="cart-page__summary-delivery">{deliveryMethod[0].toUpperCase() + deliveryMethod.slice(1)}: <span className="cart-page__summary-delivery-method"></span></p> */}
              {/* <p className="cart-page__summary-delivery-adress">{deliveryMethod === 'Самовывоз'.toLowerCase() ? 'Магазин Диванчик по адресу: 7-й микрорайон, 2А, Тобольск, Тюменская область' : fullAdressValue ? fullAdressValue : 'Укажите адрес'}</p> */}
              {/* <p className="cart-page__summary-date">Дата: <span className="cart-page__summary-date-period">{deliveryMethod === 'Самовывоз'.toLowerCase() ? 'Завтра после 17:00' : '2 Октября - 16 Ноября'}</span></p> */}
              {/* <p className="cart-page__summary-payment">Оплата: <span className="cart-page__summary-payment-method">{paymentMethod}</span></p> */}
              <div className={`cart-page__summary-pay-btn ${userDataValid && deliveryMethodValid ? '' : 'cart-page__summary-pay-btn_inactive'}`}>
                <p className="cart-page__summary-pay-btn-text">{deliveryMethod === 'Самовывоз'.toLowerCase() ? 'Оформить заказ' : 'Оформить заказ'}</p>
              </div>
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
          <img className="cart-page__empty-icon" src={emptyIcon} alt='Пустая корзина' />
          <p className="cart-page__empty-title">В вашей корзине пусто</p>
          <p className="cart-page__empty-text">Вам надо выбрать интересующий Вас товар что бы оформить покупку</p>
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
