import React from 'react'


import './PaymentMethod.css';

// const methods = [
//     'Наличными или картой (переводом) при получении',
//     'Картой онлайн',
//     'Безналичный расчет для юр. лиц'
// ]



function PaymentMethod(props) {

    return (
        <section className="payment-method">
            <div className="payment-method__selectors">
                <div className="payment-method__selector" onClick={() => { props.setPaymentMethod('Наличными или картой (переводом) при получении') }}>
                    <div className={`payment-method__selector-circle ${props.paymentMethod === 'Наличными или картой (переводом) при получении' ? 'payment-method__selector-circle_active' : ''}`}>
                        <div className={`payment-method__selector-inside-circle ${props.paymentMethod === 'Наличными или картой (переводом) при получении' ? 'payment-method__selector-inside-circle_active' : ''}`}></div>
                    </div>
                    <p className="payment-method__selector-text">Наличными или картой (переводом) при получении</p>
                </div>
                <div className="payment-method__selector payment-method__selector_icactive" onClick={() => {
                    return
                    // props.setPaymentMethod('Картой онлайн')
                }}>
                    <div className={`payment-method__selector-circle ${props.paymentMethod === 'Картой онлайн' ? 'payment-method__selector-circle_active' : ''}`}>
                        <div className={`payment-method__selector-inside-circle ${props.paymentMethod === 'Картой онлайн' ? 'payment-method__selector-inside-circle_active' : ''}`}></div>
                    </div>
                    <p className="payment-method__selector-text">Картой онлайн</p>
                </div>
                <div className="payment-method__selector payment-method__selector_icactive" onClick={() => {
                    return
                    // props.setPaymentMethod('Безналичный расчет для юр. лиц')
                }}>
                    <div className={`payment-method__selector-circle ${props.paymentMethod === 'Безналичный расчет для юр. лиц' ? 'payment-method__selector-circle_active' : ''}`}>
                        <div className={`payment-method__selector-inside-circle ${props.paymentMethod === 'Безналичный расчет для юр. лиц' ? 'payment-method__selector-inside-circle_active' : ''}`}></div>
                    </div>
                    <p className="payment-method__selector-text">Безналичный расчет для юр. лиц</p>
                </div>

            </div>
        </section>
    );
}

export default PaymentMethod;
