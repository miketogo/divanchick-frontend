import React from 'react'
import './Addresses.css';

const addresses = [
    {
        _id: '00001',
        formated_address: 'Тобольск, Тюменьская область, улица Панфиловцев, 65, кв 3, подъезд 1 , этаж 2',
        address: 'Тобольск, Тюменьская область, улица Панфиловцев, 65',
        flat: '3',
        entrance: '1',
        floor: '2',
        isPrivateHouse: false,
    },
    {
        _id: '00002',
        formated_address: 'Тобольск, Тюменьская область, улица Панфиловцев, 65, кв 5, подъезд 1 , этаж 2',
        address: 'Тобольск, Тюменьская область, улица Панфиловцев, 65',
        flat: '5',
        entrance: '1',
        floor: '2',
        isPrivateHouse: false,
    },
    {
        _id: '00003',
        formated_address: 'Тобольск, Тюменьская область, улица Панфиловцев, 65, кв 5, подъезд 1 , этаж 2',
        address: 'Тобольск, Тюменьская область, улица Панфиловцев, 65',
        isPrivateHouse: true,
    },
]


function Addresses(props) {

    const [idChangeOpen, setIdChangeOpen] = React.useState('');
    const [addAddressOpen, setAddAddressOpen] = React.useState(false);

    const [privateHouseSelected, setPrivateHouseSelected] = React.useState(false);
    const [adressValue, setAdressValue] = React.useState('');
    // eslint-disable-next-line no-unused-vars
    const [adressValidity, setAdressValidity] = React.useState({
        errorMassage: '',
        validState: false
    });

    const [flatValue, setFlatValue] = React.useState('');
    // eslint-disable-next-line no-unused-vars
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


    function handleChangeOpen(item) {
        setAddAddressOpen(false)
        if (item.isPrivateHouse) {
            setPrivateHouseSelected(item.isPrivateHouse)
            setAdressValue(item.address)
            setAdressValidity({
                errorMassage: (''),
                validState: true
            })

            setFlatValue('')
            setEntranceValue('')
            setFloorValue('')
            setIdChangeOpen(item._id)
        }
        else {
            setPrivateHouseSelected(item.isPrivateHouse)
            setAdressValue(item.address)
            setAdressValidity({
                errorMassage: (''),
                validState: true
            })
            setFlatValue(item.flat)
            setFlatValidity({
                errorMassage: (''),
                validState: true
            })
            if (item.floor) setFloorValue(item.floor)
            if (item.entrance) setEntranceValue(item.entrance)
            setIdChangeOpen(item._id)
        }

    }

    function handleAddAdressOpen() {
        setPrivateHouseSelected(false)
        setIdChangeOpen('')
        setEntranceValue('')
        setFloorValue('')
        setAdressValue('')
        setAdressValidity({
            errorMassage: (''),
            validState: false
        })
        setFlatValue('')
        setFlatValidity({
            errorMassage: (''),
            validState: false
        })
        setAddAddressOpen(true)
    }

    function handleChangeAddress(item) {

    }

    function handleAddAddress() {

    }

    return (
        <section className="addresses">
            {addresses.map((item, i) => (
                <div className="addresses__item" key={`addresses__item${i}`}>
                    <p className="addresses__item-name">{item.formated_address}</p>
                    {idChangeOpen === item._id ? <></> :
                        <div className="addresses__item-controls">

                            <p onClick={() => { handleChangeOpen(item) }} className="addresses__item-controls-change">Изменить</p>
                            <p className="addresses__item-controls-remove">Удалить</p>
                        </div>}

                    {idChangeOpen === item._id ?
                        <div className="addresses__delivery">
                            <div className="addresses__delivery-cheekbox" onClick={() => setPrivateHouseSelected(!privateHouseSelected)}>
                                <div className={`addresses__delivery-cheekbox-selector ${privateHouseSelected ? 'addresses__delivery-cheekbox-selector_active' : ''}`} >
                                    <svg className={`addresses__delivery-cheekbox-selector-tick ${privateHouseSelected ? 'addresses__delivery-cheekbox-selector-tick_active' : ''}`} width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.39821 7.01968L9.74179 1.2468L9.83502 1.32639L4.03128 7.59641L1.27606 4.61983L1.3693 4.54024L3.66435 7.01968L4.03128 7.4161L4.39821 7.01968Z" stroke="var(--contrast-color)" />
                                    </svg>
                                </div>
                                <p className="addresses__delivery-cheekbox-text">Частный дом</p>
                            </div>
                            <div className="addresses__delivery-adress">
                                <textarea placeholder='-' className="addresses__delivery-textarea" name="text" type="text" value={adressValue} onChange={handleAdressChange} maxLength="250"></textarea>
                                <p className="addresses__delivery-textarea-title">Город, улица, дом <span className="addresses__delivery-textarea-reqiered">*</span></p>
                            </div>
                            {
                                privateHouseSelected ? <></>
                                    :
                                    <div className="addresses__delivery-adress-inputs">
                                        <div className="addresses__delivery-adress-input-container">
                                            <input placeholder='-' className="addresses__delivery-adress-input" name="text" type="text" value={flatValue} onChange={handleFlatChange} maxLength="250"></input>
                                            <p className="addresses__delivery-input-title">Квартира <span className="addresses__delivery-input-reqiered">*</span></p>
                                        </div>
                                        <div className="addresses__delivery-adress-input-container">
                                            <input placeholder='-' className="addresses__delivery-adress-input" name="text" type="text" value={entranceValue} onChange={handleEntranceChange} maxLength="250"></input>
                                            <p className="addresses__delivery-input-title">Подъезд</p>
                                        </div>
                                        <div className="addresses__delivery-adress-input-container">
                                            <input placeholder='-' className="addresses__delivery-adress-input" name="text" type="text" value={floorValue} onChange={handleFloorChange} maxLength="250"></input>
                                            <p className="addresses__delivery-input-title">Этаж</p>
                                        </div>
                                    </div>
                            }
                            <div className="addresses__delivery-btns">
                                <div className="addresses__btn addresses__btn_return" onClick={() => { setIdChangeOpen('') }}>
                                    <p className="addresses__btn-txt addresses__btn-txt_return">Отмена</p>
                                </div>
                                <div className="addresses__btn addresses__btn_save">
                                    <p className="addresses__btn-txt addresses__btn-txt_save" onClick={() => { handleChangeAddress(item) }}>Сохранить</p>
                                </div>
                            </div>
                        </div>

                        :
                        <></>}

                </div>
            ))}

            {addAddressOpen ?
                <div className="addresses__delivery">
                    <div className="addresses__delivery-cheekbox" onClick={() => setPrivateHouseSelected(!privateHouseSelected)}>
                        <div className={`addresses__delivery-cheekbox-selector ${privateHouseSelected ? 'addresses__delivery-cheekbox-selector_active' : ''}`} >
                            <svg className={`addresses__delivery-cheekbox-selector-tick ${privateHouseSelected ? 'addresses__delivery-cheekbox-selector-tick_active' : ''}`} width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.39821 7.01968L9.74179 1.2468L9.83502 1.32639L4.03128 7.59641L1.27606 4.61983L1.3693 4.54024L3.66435 7.01968L4.03128 7.4161L4.39821 7.01968Z" stroke="var(--contrast-color)" />
                            </svg>
                        </div>
                        <p className="addresses__delivery-cheekbox-text">Частный дом</p>
                    </div>
                    <div className="addresses__delivery-adress">
                        <textarea placeholder='-' className="addresses__delivery-textarea" name="text" type="text" value={adressValue} onChange={handleAdressChange} maxLength="250"></textarea>
                        <p className="addresses__delivery-textarea-title">Город, улица, дом <span className="addresses__delivery-textarea-reqiered">*</span></p>
                    </div>
                    {
                        privateHouseSelected ? <></>
                            :
                            <div className="addresses__delivery-adress-inputs">
                                <div className="addresses__delivery-adress-input-container">
                                    <input placeholder='-' className="addresses__delivery-adress-input" name="text" type="text" value={flatValue} onChange={handleFlatChange} maxLength="250"></input>
                                    <p className="addresses__delivery-input-title">Квартира <span className="addresses__delivery-input-reqiered">*</span></p>
                                </div>
                                <div className="addresses__delivery-adress-input-container">
                                    <input placeholder='-' className="addresses__delivery-adress-input" name="text" type="text" value={entranceValue} onChange={handleEntranceChange} maxLength="250"></input>
                                    <p className="addresses__delivery-input-title">Подъезд</p>
                                </div>
                                <div className="addresses__delivery-adress-input-container">
                                    <input placeholder='-' className="addresses__delivery-adress-input" name="text" type="text" value={floorValue} onChange={handleFloorChange} maxLength="250"></input>
                                    <p className="addresses__delivery-input-title">Этаж</p>
                                </div>
                            </div>
                    }
                    <div className="addresses__delivery-btns">
                        <div className="addresses__btn addresses__btn_return" onClick={() => { setAddAddressOpen(false) }}>
                            <p className="addresses__btn-txt addresses__btn-txt_return">Отмена</p>
                        </div>
                        <div className="addresses__btn addresses__btn_save">
                            <p className="addresses__btn-txt addresses__btn-txt_save">Сохранить</p>
                        </div>
                    </div>
                </div>

                :
                <></>}
            {
                addAddressOpen ? <></> :
                    <div className="addresses__add-btn" onClick={() => { handleAddAdressOpen() }}>
                        <p className="addresses__add-btn-text" onClick={() => { handleAddAddress() }}>Добавить адрес</p>
                    </div>
            }


        </section>


    );
}

export default Addresses;
