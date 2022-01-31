import React from 'react'
import './Orders.css';

import { testOrders } from '../../../utils/utils'


function Orders(props) {

    const [selectedStatus, setSelectedStatus] = React.useState('все');
    const [isSelectorOpen, setSelectorOpen] = React.useState(false);

    const [orderNumberOpen, setOrderNumberOpen] = React.useState('');


    return (
        <section className="order">
            {/* <p className="order__title">Отслеживание<br />и управление заказом</p> */}
            <div className="order__seloctors">
                <div className="order__selected-row" onClick={() => { setSelectorOpen(!isSelectorOpen) }}>
                    {selectedStatus.toLowerCase() === 'все' ? <p className="order__selected-row-text">Все</p> : <></>}
                    {selectedStatus.toLowerCase() === 'в работе' ? <p className="order__selected-row-text">В работе</p> : <></>}
                    {selectedStatus.toLowerCase() === 'доставлен' ? <p className="order__selected-row-text">Доставлен</p> : <></>}
                    {selectedStatus.toLowerCase() === 'отмененный' ? <p className="order__selected-row-text">Отмененный</p> : <></>}
                    <svg className={`order__selected-row-arrow ${isSelectorOpen ? 'order__selected-row-arrow_active' : ''}`} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 11.5L8.70711 6.20711C8.31658 5.81658 7.68342 5.81658 7.29289 6.20711L2 11.5" stroke="black" strokeLinecap="round" />
                    </svg>
                </div>
                {
                    isSelectorOpen ?
                        <div className="order__select-dropdown">
                            {selectedStatus.toLowerCase() === 'все' ? <></> : <p onClick={() => {
                                setSelectedStatus('все')
                                setSelectorOpen(!isSelectorOpen)
                            }} className="order__select-dropdown-item">Все</p>}
                            {selectedStatus.toLowerCase() === 'в работе' ? <></> : <p onClick={() => {
                                setSelectedStatus('в работе')
                                setSelectorOpen(!isSelectorOpen)
                            }} className="order__select-dropdown-item">В работе</p>}
                            {selectedStatus.toLowerCase() === 'доставлен' ? <></> : <p onClick={() => {
                                setSelectedStatus('доставлен')
                                setSelectorOpen(!isSelectorOpen)
                            }} className="order__select-dropdown-item">Доставлен</p>}
                            {selectedStatus.toLowerCase() === 'отмененный' ? <></> : <p onClick={() => {
                                setSelectedStatus('отмененный')
                                setSelectorOpen(!isSelectorOpen)
                            }} className="order__select-dropdown-item">Отмененный</p>}




                        </div>
                        : <></>
                }
            </div>
            <div className="order__items">
                {testOrders.filter((item) => {
                    if (selectedStatus.toLowerCase() === 'все') return true
                    else {
                        if(selectedStatus.toLowerCase() === item.status.toLowerCase()) return true
                        else return false
                    }
                }).map((item, i) => (
                        <div className="order__item" key={`order__item${i}`}>
                            <div className="order__item-title">
                                <p className="order__item-number">Заказ №{item.order_number}</p>
                                <div className={`order__item-status ${item.status.toLowerCase() === 'в работе' ? 'order__item-status_type_in-work' : ''} ${item.status.toLowerCase() === 'отмененный' ? 'order__item-status_type_cancelled' : ''} ${item.status.toLowerCase() === 'доставлен' ? 'order__item-status_type_delivered' : ''}`}>
                                    <p className={`order__item-status-text ${item.status.toLowerCase() === 'в работе' ? 'order__item-status-text_type_in-work' : ''} ${item.status.toLowerCase() === 'отмененный' ? 'order__item-status-text_type_cancelled' : ''} ${item.status.toLowerCase() === 'доставлен' ? 'order__item-status-text_type_delivered' : ''}`}>{item.status.toLowerCase()[0].toUpperCase()}{item.status.toLowerCase().slice(1)}</p>
                                </div>
                            </div>
                            <p className="order__item-fullprice">Стоимость заказа: <span className="order__item-fullprice-value">{item.full_price.toLocaleString('ru')} руб.</span></p>
                            <p className="order__item-address">{item.isDelivery ? `Адрес доставки: ${item.address}` : `Самовывоз: ${item.address}`}</p>
                            {orderNumberOpen === item.order_number ? <></> : <p className="order__item-show-products" onClick={() => { setOrderNumberOpen(item.order_number) }}>Посмотреть состав заказа</p>}
                            {orderNumberOpen === item.order_number ?
                                <div className="order__item-products">
                                    {item.order_items.map((product, product_i) => (
                                        <div className="order__item-product" key={`order__item-product${product_i}`}>
                                            <img className="order__item-product-img" src={product.photos[0]} alt={product.name} />
                                            <div className="order__item-product-names">
                                                <p className="order__item-product-article">Артикул: {product.article}</p>
                                                <p className="order__item-product-name">{product.name}</p>
                                            </div>
                                            <div className="order__item-product-info">
                                                <p className="order__item-product-count">{product.count} шт.</p>
                                                <p className="order__item-product-price">{product.discount && product.discount > 0 ? ((product.price - (product.price / 100 * product.discount)) * product.count).toLocaleString('ru') : (product.count * product.price).toLocaleString('ru')}&nbsp;₽</p>
                                            </div>
                                        </div>
                                    ))}
                                    <p className="order__item-hide-products" onClick={() => { setOrderNumberOpen('') }}>Скрыть</p>
                                </div>
                                :
                                <></>}


                        </div>
                    ))}
            </div>
        </section>


    );
}

export default Orders;
