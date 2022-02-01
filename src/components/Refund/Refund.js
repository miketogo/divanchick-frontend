import React from 'react'
import './Refund.css';


const list = [
    'Потребитель вправе отказаться от товара в любое время до его передачи, а после передачи товара - в течение семи дней;',
    'Возврат товара надлежащего качества возможен в случае, если сохранены его товарный вид, потребительские свойства, а также документ, подтверждающий факт и условия покупки указанного товара;',
    'Потребитель не вправе отказаться от товара надлежащего качества, имеющего индивидуально-определенные свойства, если указанный товар может быть использован исключительно приобретающим его человеком;',
    'При отказе потребителя от товара продавец должен возвратить ему денежную сумму, уплаченную потребителем по договору, за исключением расходов продавца на доставку от потребителя возвращенного товара, не позднее чем через десять дней со дня предъявления потребителем соответствующего требования;',
]

function Refund(props) {



    return (
        <div className="refund">
            <h2 className="refund__title">Как вернуть товар?</h2>
            <p className="refund__text">Процедура возврата товара регламентируется статьей 26.1 федерального закона «О защите прав потребителей».</p>
            <div className="refund__list-items">
                {list.map((item, i) => (
                    <div className="refund__list-item" key={`refund__list-item${i}`}>
                        <svg className="refund__list-item-circle" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="2" fill="#686868" />
                        </svg>
                        <p className="refund__list-item-text">{item}</p>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Refund;
