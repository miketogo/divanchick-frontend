import React from 'react'
import { Link } from 'react-router-dom';

import validator from 'validator'

import './UserData.css';





function UserData(props) {

    const [nameValue, setNameValue] = React.useState('');
    const [nameValidity, setNameValidity] = React.useState({
        errorMassage: '',
        validState: false
    });

    const [surnameValue, setSurnameValue] = React.useState('');
    const [surnameValidity, setSurnameValidity] = React.useState({
        errorMassage: '',
        validState: false
    });

    const [phoneValue, setPhoneValue] = React.useState('');
    const [phoneValidity, setPhoneValidity] = React.useState({
        errorMassage: '',
        validState: false
    });

    const [emailValue, setEmailValue] = React.useState('');
    const [emailValidity, setEmailValidity] = React.useState({
        errorMassage: '',
        validState: false
    });

    React.useEffect(() => {
        if (props.currentUser) {
            console.log(props.currentUser)
            setNameValue(props.currentUser.firstname)
            setNameValidity({
                errorMassage: (''),
                validState: true
            })
            setSurnameValue(props.currentUser.surname)
            setSurnameValidity({
                errorMassage: (''),
                validState: true
            })
            setPhoneValue(props.currentUser.formatedPhoneNumber)
            setPhoneValidity({
                errorMassage: '',
                validState: true
            });
            setEmailValue(props.currentUser.email)
            setEmailValidity({
                errorMassage: '',
                validState: true
            })
        }

    }, [props.currentUser])



    function handleNameChange(e) {
        let inputValue = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '')

        setNameValue(inputValue)
        if (inputValue.length < 1) {
            setNameValidity({
                errorMassage: 'Заполните поле',
                validState: false
            })
        } else {
            setNameValidity({
                errorMassage: (''),
                validState: true
            })
        }
    }

    function handleSurnameChange(e) {
        let inputValue = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '')
        setSurnameValue(inputValue)
        if (inputValue.length < 1) {
            setSurnameValidity({
                errorMassage: 'Заполните поле',
                validState: false
            })
        } else {
            setSurnameValidity({
                errorMassage: (''),
                validState: true
            })
        }
    }

    function handlePhoneChange(e) {

        let inputValue = e.target.value.replace(/\D/g, '')
        let formattedInputValue = '';
        if (!inputValue) {
            setPhoneValue('')
            setPhoneValidity({
                errorMassage: 'Можно вводить только цифры',
                validState: false
            })
        }
        else {
            if (['7', '8', '9'].indexOf(inputValue[0]) > -1) {
                setPhoneValidity({
                    errorMassage: '',
                    validState: false
                })
                if (inputValue[0] === '9') inputValue = '7' + inputValue;

                let firstSimbols = (inputValue[0] === '8') ? '8' : '+7';
                formattedInputValue = firstSimbols + ' '

                if (inputValue.length > 1) {
                    formattedInputValue += '(' + inputValue.substring(1, 4)
                }
                if (inputValue.length >= 5) {
                    formattedInputValue += ') ' + inputValue.substring(4, 7)
                }
                if (inputValue.length >= 8) {
                    formattedInputValue += '-' + inputValue.substring(7, 9)
                }
                if (inputValue.length >= 10) {
                    formattedInputValue += '-' + inputValue.substring(9, 11)
                }
                if (inputValue.length >= 11) {
                    setPhoneValidity({
                        errorMassage: '',
                        validState: true
                    });
                } else {
                    setPhoneValidity({
                        errorMassage: '',
                        validState: false
                    });
                }
            } else {
                formattedInputValue = '+' + inputValue.substring(0, 16)
                if (inputValue.length >= 11) {
                    setPhoneValidity({
                        errorMassage: 'Только номера РФ',
                        validState: false
                    });
                } else {
                    setPhoneValidity({
                        errorMassage: 'Только номера РФ',
                        validState: false
                    });
                }
            }

            setPhoneValue(formattedInputValue)
        }

    }

    function handlePhoneDelite(e) {
        if (e.keyCode === 8 && e.target.value.replace(/\D/g, '').length === 1) {
            setPhoneValue('')
        }
        if (e.keyCode === 8 && e.target.value.replace(/\D/g, '').length < 11) {
            setPhoneValidity({
                errorMassage: '',
                validState: false
            });
        }

    }


    function handleEmailChange(e) {
        let inputValue = e.target.value
        setEmailValue(inputValue);
        if (!inputValue) {
            setEmailValidity({
                errorMassage: '',
                validState: false
            })
        }
        if (inputValue.length >= 2) {
            if (validator.isEmail(inputValue)) {
                setEmailValidity({
                    errorMassage: '',
                    validState: true
                })
            } else {
                setEmailValidity({
                    errorMassage: (!e.target.validity.valid ? e.target.validationMessage : 'Введите валидный email'),
                    validState: false
                })
            }
        }
    }

    React.useEffect(() => {

        if (nameValidity.validState && surnameValidity.validState && phoneValidity.validState && emailValidity.validState) {
            props.setUserDataValid(true)
        } else {
            props.setUserDataValid(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameValidity, surnameValidity, phoneValidity, emailValidity])


    return (
        <section className="cart-user-data">
            {!props.loggedIn ?
                <Link to='/login/cart' className="cart-user-data__login-btn">
                    <p className="cart-user-data__login-btn-text">Войти</p>
                </Link> : <></>}
            <div className="cart-user-data__inputs">
                <div className="cart-user-data__name-inputs">
                    <div className="cart-user-data__input-container-box">
                        <div className={`cart-user-data__input-container ${!nameValidity.validState && nameValidity.errorMassage ? 'cart-user-data__input-container_error' : ''} ${nameValidity.validState ? 'cart-user-data__input-container_valid' : ''}`}>
                            <input placeholder='Иван' className="cart-user-data__input" name="text" type="text" value={nameValue} onChange={handleNameChange} maxLength="250"></input>
                            <p className="cart-user-data__input-title">Имя <span className="cart-user-data__input-reqiered">*</span></p>
                        </div>
                        {!nameValidity.validState && nameValidity.errorMassage && <p className="cart-user-data__input-error">{nameValidity.errorMassage}</p>}
                    </div>
                    <div className="cart-user-data__input-container-box">
                        <div className={`cart-user-data__input-container ${!surnameValidity.validState && surnameValidity.errorMassage ? 'cart-user-data__input-container_error' : ''} ${surnameValidity.validState ? 'cart-user-data__input-container_valid' : ''}`}>
                            <input placeholder='Иванов' className="cart-user-data__input" name="text" type="text" value={surnameValue} onChange={handleSurnameChange} maxLength="250"></input>
                            <p className="cart-user-data__input-title">Фамилия <span className="cart-user-data__input-reqiered">*</span></p>
                        </div>
                        {!surnameValidity.validState && surnameValidity.errorMassage && <p className="cart-user-data__input-error">{surnameValidity.errorMassage}</p>}
                    </div>
                </div>

                <div className="cart-user-data__contact-inputs">
                    <div className="cart-user-data__input-container-box">
                        <div className={`cart-user-data__input-container ${!phoneValidity.validState && phoneValidity.errorMassage ? 'cart-user-data__input-container_error' : ''} ${phoneValidity.validState ? 'cart-user-data__input-container_valid' : ''}`}>
                            <input onKeyDown={(e) => handlePhoneDelite(e)} placeholder='+7 (___) ___ __ __' className="cart-user-data__input" name="text" type="phone" value={phoneValue} onChange={handlePhoneChange} maxLength="250"></input>
                            <p className="cart-user-data__input-title">Контактный телефон <span className="cart-user-data__input-reqiered">*</span></p>
                        </div>
                        {!phoneValidity.validState && phoneValidity.errorMassage && <p className="cart-user-data__input-error">{phoneValidity.errorMassage}</p>}
                    </div>
                    <div className="cart-user-data__input-container-box">
                        <div className={`cart-user-data__input-container ${!emailValidity.validState && emailValidity.errorMassage ? 'cart-user-data__input-container_error' : ''} ${emailValidity.validState ? 'cart-user-data__input-container_valid' : ''}`}>
                            <input placeholder='test@example.ru' className="cart-user-data__input" name="text" type="email" value={emailValue} onChange={handleEmailChange} maxLength="250"></input>
                            <p className="cart-user-data__input-title">Электронная почта <span className="cart-user-data__input-reqiered">*</span></p>
                        </div>
                        {!emailValidity.validState && emailValidity.errorMassage && <p className="cart-user-data__input-error">{emailValidity.errorMassage}</p>}
                    </div>

                </div>

            </div>
        </section>
    );
}

export default UserData;
