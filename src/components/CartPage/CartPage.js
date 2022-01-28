import React from 'react'
// import { Route, Link } from 'react-router-dom';
import Cart from './Cart/Cart';

import './CartPage.css';
import DeliveryMethod from './DeliveryMethod/DeliveryMethod';

import { deliveryMethods } from '../../utils/utils';
import PaymentMethod from './PaymentMethod/PaymentMethod';




function CartPage(props) {

  const [deliveryMethod, setDeliveryMethod] = React.useState(deliveryMethods[0].name);

  const [fullAdressValue, setFullAdressValue] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('Наличными или картой (переводом) при получении');

  function handleDeliveryMethodSelect(method) {
    setDeliveryMethod(method.toLowerCase())
  }

  return (
    <div className="cart-page">
      <div className="cart-page__main">
        <Cart allCartProductsCount={props.allCartProductsCount} setCart={props.setCart} cart={props.cart} />
        <DeliveryMethod setFullAdressValue={setFullAdressValue} handleDeliveryMethodSelect={handleDeliveryMethodSelect} deliveryMethod={deliveryMethod} />
        <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
      </div>
      <div className="cart-page__summary">
        <div className="cart-page__summary-info">
          <p className="cart-page__summary-title">В корзине</p>
          <p className="cart-page__summary-count">{props.allCartProductsCount.count} {props.allCartProductsCount.count % 10 === 1 && 'товар'}{(props.allCartProductsCount.count % 10 >= 2 && props.allCartProductsCount.count % 10 <= 4) && 'товара'}{((props.allCartProductsCount.count % 10 >= 5 && props.allCartProductsCount.count % 10 <= 9) || props.allCartProductsCount.count % 10 === 0) && 'товаров'}</p>
          <p className="cart-page__summary-total">{props.allCartProductsCount.totalPrice.toLocaleString('ru')}&nbsp;₽</p>
          <p className="cart-page__summary-delivery">{deliveryMethod[0].toUpperCase() + deliveryMethod.slice(1)}: <span className="cart-page__summary-delivery-method"></span></p>
          <p className="cart-page__summary-delivery-adress">{deliveryMethod === 'самовывоз' ? '7-й микрорайон, 2А, Тобольск, Тюменская область' : fullAdressValue ? fullAdressValue : 'Укажите адрес'}</p>
          <p className="cart-page__summary-date">Дата: <span className="cart-page__summary-date-period">{deliveryMethod === 'самовывоз' ? 'Завтра после 17:00' : '2 Октября - 16 Ноября'}</span></p>
          <p className="cart-page__summary-payment">Оплата: <span className="cart-page__summary-payment-method">{paymentMethod}</span></p>
          <div className="cart-page__summary-pay-btn cart-page__summary-pay-btn_inactive">
            <p className="cart-page__summary-pay-btn-text">Оплатить заказ</p>
          </div>
        </div>
        <p className="cart-page__summary-share">Поделиться корзиной</p>
      </div>
    </div>
  );
}

export default CartPage;
