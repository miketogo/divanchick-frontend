import React from 'react'
// import { Route, Link } from 'react-router-dom';
import Cart from './Cart/Cart';
import { useHistory } from 'react-router-dom';


import './CartPage.css';
import DeliveryMethod from './DeliveryMethod/DeliveryMethod';

import { deliveryMethods } from '../../utils/utils';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import UserData from './UserData/UserData';




function CartPage(props) {

  const history = useHistory();

  const [deliveryMethod, setDeliveryMethod] = React.useState(deliveryMethods[0].name.toLowerCase());

  const [fullAdressValue, setFullAdressValue] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('Наличными или картой (переводом) при получении');

  const [userDataValid, setUserDataValid] = React.useState(false);
  const [deliveryMethodValid, setDeliveryMethodValid] = React.useState(false);

  function handleDeliveryMethodSelect(method) {
    setDeliveryMethod(method.toLowerCase())
  }

  return (
    <div className="cart-page">
      <div className="cart-page__main">
        <div className="cart-page__section-heading">
          <h2 className="cart-page__section-heading-numeral">1</h2>
          <h2 className="cart-page__section-heading-title">Корзина</h2>
          <div className="cart-page__section-reset-cart">
            <p className="cart-page__section-reset-cart-text">очистить корзину</p>
          </div>
          <div className="cart-page__section-go-back" onClick={() => history.goBack()}>
            <svg className="cart-page__section-go-back-arrow" width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.30926 4.5L4.77722 7.86484L4.12259 8.5L0 4.5L4.12259 0.5L4.77723 1.13516L1.30926 4.5Z" fill="#9B38DC" />
              <path fillRule="evenodd" clipRule="evenodd" d="M0.633865 4.94907H10V4.05082H0.633865V4.94907Z" fill="#9B38DC" />
            </svg>
            <p className="cart-page__section-go-back-text">Вернуться к покупкам</p>
          </div>
        </div>
        <Cart allCartProductsCount={props.allCartProductsCount} setCart={props.setCart} cart={props.cart} />
        <div className="cart-page__section-heading">
          <h2 className="cart-page__section-heading-numeral">2</h2>
          <h2 className="cart-page__section-heading-title">Способ и дата получения</h2>
        </div>
        <DeliveryMethod setDeliveryMethodValid={setDeliveryMethodValid} setFullAdressValue={setFullAdressValue} handleDeliveryMethodSelect={handleDeliveryMethodSelect} deliveryMethod={deliveryMethod} />
        <div className="cart-page__section-heading">
          <h2 className="cart-page__section-heading-numeral">3</h2>
          <h2 className="cart-page__section-heading-title">Способ Оплаты</h2>
        </div>
        <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        <div className="cart-page__section-heading">
          <h2 className="cart-page__section-heading-numeral">4</h2>
          <h2 className="cart-page__section-heading-title">Ваши данные</h2>
        </div>
        <UserData setUserDataValid={setUserDataValid} />
      </div>
      <div className="cart-page__summary">
        <div className="cart-page__summary-info">
          <p className="cart-page__summary-title">В корзине</p>
          <p className="cart-page__summary-count">{props.allCartProductsCount.count} {props.allCartProductsCount.count % 10 === 1 && 'товар'}{(props.allCartProductsCount.count % 10 >= 2 && props.allCartProductsCount.count % 10 <= 4) && 'товара'}{((props.allCartProductsCount.count % 10 >= 5 && props.allCartProductsCount.count % 10 <= 9) || props.allCartProductsCount.count % 10 === 0) && 'товаров'}</p>
          <p className="cart-page__summary-total">{props.allCartProductsCount.totalPrice.toLocaleString('ru')}&nbsp;₽</p>
          <p className="cart-page__summary-delivery">{deliveryMethod[0].toUpperCase() + deliveryMethod.slice(1)}: <span className="cart-page__summary-delivery-method"></span></p>
          <p className="cart-page__summary-delivery-adress">{deliveryMethod === 'Самовывоз'.toLowerCase() ? '7-й микрорайон, 2А, Тобольск, Тюменская область' : fullAdressValue ? fullAdressValue : 'Укажите адрес'}</p>
          <p className="cart-page__summary-date">Дата: <span className="cart-page__summary-date-period">{deliveryMethod === 'Самовывоз'.toLowerCase() ? 'Завтра после 17:00' : '2 Октября - 16 Ноября'}</span></p>
          <p className="cart-page__summary-payment">Оплата: <span className="cart-page__summary-payment-method">{paymentMethod}</span></p>
          <div className={`cart-page__summary-pay-btn ${userDataValid && deliveryMethodValid ? '' : 'cart-page__summary-pay-btn_inactive'}`}>
            <p className="cart-page__summary-pay-btn-text">Оплатить заказ</p>
          </div>
        </div>
        <p className="cart-page__summary-share">Поделиться корзиной</p>
      </div>
    </div>
  );
}

export default CartPage;
