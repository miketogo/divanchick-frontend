import React from 'react'
// import { Route, Link } from 'react-router-dom';


import './DeliveryMethod.css';

import { deliveryMethods } from '../../../utils/utils';




function DeliveryMethod(props) {



    const [privateHouseSelected, setPrivateHouseSelected] = React.useState(false);
    const [adressValue, setAdressValue] = React.useState('');
    const [adressValidity, setAdressValidity] = React.useState({
        errorMassage: '',
        validState: false
    });

    const [flatValue, setFlatValue] = React.useState('');
    const [flatValidity, setFlatValidity] = React.useState({
        errorMassage: '',
        validState: false
    });


    const [entranceValue, setEntranceValue] = React.useState('');
    const [floorValue, setFloorValue] = React.useState('');


    function handleAdressChange(e) {
        let inputValue = e.target.value
        setAdressValue(inputValue)
        if (inputValue.length < 1) {
            setAdressValidity({
                errorMassage: 'Заполните поле',
                validState: false
            })
        } else {
            setAdressValidity({
                errorMassage: (''),
                validState: true
            })
        }
    }

    function handleFlatChange(e) {
        let inputValue = e.target.value
        setFlatValue(inputValue)
        if (inputValue.length < 1) {
            setFlatValidity({
                errorMassage: 'Заполните поле',
                validState: false
            })
        } else {
            setFlatValidity({
                errorMassage: (''),
                validState: true
            })
        }
    }

    function handleEntranceChange(e) {
        let inputValue = e.target.value.replace(/\D/g, '')
        setEntranceValue(inputValue)
    }

    function handleFloorChange(e) {
        let inputValue = e.target.value.replace(/\D/g, '')
        setFloorValue(inputValue)
    }

    React.useEffect(() => {
        if (privateHouseSelected) {
            props.setFullAdressValue(`${privateHouseSelected ? 'Частный дом по адресу: ' : ''}${adressValue ? adressValue : ''}`)
        } else {
            props.setFullAdressValue(`${adressValue ? adressValue : ''}${flatValue ? `, кв ${flatValue}` : ''}${entranceValue ? `, подъезд ${entranceValue}` : ''}${floorValue ? `, этаж ${floorValue}` : ''}`)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [privateHouseSelected, adressValue, flatValue, entranceValue, floorValue])

    React.useEffect(() => {
        if(props.deliveryMethod.toLowerCase() === 'Самовывоз'.toLowerCase()){
            props.setDeliveryMethodValid(true)
        } else if (privateHouseSelected) {
            if (adressValidity.validState) {
                props.setDeliveryMethodValid(true)
            } else{
                props.setDeliveryMethodValid(false)
            }
        } else {
            if (adressValidity.validState && flatValidity.validState) {
                props.setDeliveryMethodValid(true)
            } else{
                props.setDeliveryMethodValid(false)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [privateHouseSelected, adressValidity, flatValidity, props.deliveryMethod])

    return (
        <section className="delivery-method">

            <div className="delivery-method__btns">
                {deliveryMethods.map((item, i) => (
                    <div className={`delivery-method__btn ${props.deliveryMethod.toLowerCase() === item.name.toLowerCase() ? 'delivery-method__btn_active' : ''}`} onClick={() => {
                        if (props.deliveryMethod.toLowerCase() !== item.name.toLowerCase()) {
                            props.handleDeliveryMethodSelect(item.name.toLowerCase())
                        }
                    }}>
                        <p className={`delivery-method__btn-text ${props.deliveryMethod.toLowerCase() === item.name.toLowerCase() ? 'delivery-method__btn-text_active' : ''}`}>{item.name}{item.price && item.price > 0 ? ` - ${item.price.toLocaleString('ru')} ₽` : ''}</p>
                    </div>
                ))}
            </div>
            {
                props.deliveryMethod.toLowerCase() === 'Самовывоз'.toLowerCase() ?
                    <div className="delivery-method__to-go">
                        <p className="delivery-method__to-go-adress">{deliveryMethods[0].adresses[0].name}</p>
                        <p className="delivery-method__to-go-date">Можно забрать завтра после 17:00</p>
                        <p className="delivery-method__to-go-work-time">Время работы</p>
                        <p className="delivery-method__to-go-work-time-value">10:00 – 22:00</p>
                        <p className="delivery-method__to-go-storage-life">Срок хранения</p>
                        <p className="delivery-method__to-go-storage-life-value">{deliveryMethods[0].storageLife}</p>
                    </div>
                    :
                    <></>
            }
            {
                props.deliveryMethod.toLowerCase() === 'Доставка'.toLowerCase() ?
                    <div className="delivery-method__delivery">
                        <div className="delivery-method__delivery-cheekbox" onClick={() => setPrivateHouseSelected(!privateHouseSelected)}>
                            <div className={`delivery-method__delivery-cheekbox-selector ${privateHouseSelected ? 'delivery-method__delivery-cheekbox-selector_active' : ''}`} >
                                <svg className={`delivery-method__delivery-cheekbox-selector-tick ${privateHouseSelected ? 'delivery-method__delivery-cheekbox-selector-tick_active' : ''}`} width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.39821 7.01968L9.74179 1.2468L9.83502 1.32639L4.03128 7.59641L1.27606 4.61983L1.3693 4.54024L3.66435 7.01968L4.03128 7.4161L4.39821 7.01968Z" stroke="#9B38DC" />
                                </svg>
                            </div>
                            <p className="delivery-method__delivery-cheekbox-text">Частный дом</p>
                        </div>
                        <div className="delivery-method__delivery-adress">
                            <textarea placeholder='-' className="delivery-method__delivery-textarea" name="text" type="text" value={adressValue} onChange={handleAdressChange} maxLength="250"></textarea>
                            <p className="delivery-method__delivery-textarea-title">Город, улица, дом <span className="delivery-method__delivery-textarea-reqiered">*</span></p>
                        </div>
                        {
                            privateHouseSelected ? <></>
                                :
                                <div className="delivery-method__delivery-adress-inputs">
                                    <div className="delivery-method__delivery-adress-input-container">
                                        <input placeholder='-' className="delivery-method__delivery-adress-input" name="text" type="text" value={flatValue} onChange={handleFlatChange} maxLength="250"></input>
                                        <p className="delivery-method__delivery-input-title">Квартира <span className="delivery-method__delivery-input-reqiered">*</span></p>
                                    </div>
                                    <div className="delivery-method__delivery-adress-input-container">
                                        <input placeholder='-' className="delivery-method__delivery-adress-input" name="text" type="text" value={entranceValue} onChange={handleEntranceChange} maxLength="250"></input>
                                        <p className="delivery-method__delivery-input-title">Подъезд</p>
                                    </div>
                                    <div className="delivery-method__delivery-adress-input-container">
                                        <input placeholder='-' className="delivery-method__delivery-adress-input" name="text" type="text" value={floorValue} onChange={handleFloorChange} maxLength="250"></input>
                                        <p className="delivery-method__delivery-input-title">Этаж</p>
                                    </div>
                                </div>
                        }

                    </div>
                    :
                    <></>
            }
            <div>

            </div>
        </section>
    );
}

export default DeliveryMethod;
