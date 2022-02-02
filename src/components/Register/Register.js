import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import validator from 'validator'


import './Register.css';




function Register(props) {

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

    const [emailValue, setEmailValue] = React.useState('');
    const [emailValidity, setEmailValidity] = React.useState({
        errorMassage: '',
        validState: false
    });


    const [phoneValue, setPhoneValue] = React.useState('');
    const [phoneValidity, setPhoneValidity] = React.useState({
        errorMassage: '',
        validState: false
    });
    const [codeValue, setCodeValue] = React.useState('');
    const [codeValidity, setCodeValidity] = React.useState({
        errorMassage: '',
        validState: false
    });

    const [passValue, setPassValue] = React.useState('');
    const [passValidity, setPassValidity] = React.useState({
        errorMassage: '',
        validState: false
    });


    const [passCheckValue, setPassCheckValue] = React.useState('');
    const [passCheckValidity, setPassCheckValidity] = React.useState({
        errorMassage: '',
        validState: false
    });

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



    const [step, setStep] = React.useState(0);
    function handleNextStep() {
        setStep(step + 1)
    }

    function handleCodeChange(e) {
        let inputValue = e.target.value.replace(/\D/g, '')
        if (!inputValue) {
            setCodeValue('')
            setCodeValidity({
                errorMassage: '',
                validState: false
            })
        }
        else {
            setCodeValue(inputValue.slice(0, 4))
            if (inputValue.length >= 4) {
                setCodeValidity({
                    errorMassage: '',
                    validState: true
                })
            }
        }
    }

    function handlePassChange(e) {
        let inputValue = e.target.value
        if (!inputValue) {
            setPassValue('')
            setPassValidity({
                errorMassage: '',
                validState: false
            })
        }
        else {
            setPassValue(inputValue)
            if (inputValue.length >= 8) {
                setPassValidity({
                    errorMassage: '',
                    validState: true
                })
            }
        }
    }
    function handlePassCheckChange(e) {
        let inputValue = e.target.value
        if (!inputValue) {
            setPassCheckValue('')
            setPassCheckValidity({
                errorMassage: '',
                validState: false
            })
        }
        else {
            setPassCheckValue(inputValue)
            if (inputValue.length >= 8) {
                // setPassCheckValidity({
                //     errorMassage: '',
                //     validState: true
                // })
            }
        }
    }

    React.useEffect(() => {
        if (codeValidity.validState) {
            setTimeout(() => {
                handleSubmit()
            }, 300);
        }

    }, [codeValidity.validState])

    React.useEffect(() => {
        if (passValue && passValue.length >= 8 && passCheckValue.length >= 8) {
            if (passCheckValue === passValue) {
                setPassCheckValidity({
                    errorMassage: '',
                    validState: true
                })
                setPassValidity({
                    errorMassage: '',
                    validState: true
                })
            } else {
                setPassCheckValidity({
                    errorMassage: 'Пароли не совпадают',
                    validState: false
                })
            }
        }

    }, [passValue, passCheckValue])


    function handleSubmit() {

    }

    const timerDefValue = 60
    const [timerValue, setTimerValue] = React.useState(timerDefValue);
    const [sendCounter, setSendCounter] = React.useState(0);
    const [sendAgainAvailible, setSendAgainAvailible] = React.useState(false);


    React.useEffect(() => {

        if (step === 1) {
            if (!sendAgainAvailible) {
                if (timerValue === 0) {
                    setSendAgainAvailible(true)
                    setTimerValue(timerDefValue)
                } else {
                    const timer = setInterval(() => {
                        setTimerValue(timerValue - 1)
                        clearInterval(timer)
                    }, 1000);
                }

            }

        }

    }, [step, timerValue, sendAgainAvailible])

    function handleSendCodeAgain() {
        if (sendCounter < 2) {
            setSendCounter(sendCounter + 1)
        }


    }

    return (
        <div className="register">
            <div className="register__container">
                <div className="register__text-container">
                    <h2 className="register__title">Зарегестрируйте свой аккаунт Диванчик</h2>
                    <p className="register__text">Используйте телефон для регистрации и входа в аккаунт</p>
                </div>
                <div className="register__form-container">

                    {step === 1 ? <p className="register__form-title">Код из СМС</p> : <></>}


                    {step === 1 ? <p className="register__form-subtitle">Мы выслали код на номер<br />{phoneValue}</p> : <></>}


                    {step === 0 ?
                        <>
                            <p className="register__form-title">Ваши имя и фамилия</p>
                            <div className="register__inputs">
                                <div className="register__input-container-box">
                                    <div className={`register__input-container ${!nameValidity.validState && nameValidity.errorMassage ? 'register__input-container_error' : ''} ${nameValidity.validState ? 'register__input-container_valid' : ''}`}>
                                        <input placeholder='Иван' className="register__input" name="text" type="text" value={nameValue} onChange={handleNameChange} maxLength="250"></input>
                                        <p className="register__input-title">Имя <span className="register__input-reqiered">*</span></p>
                                    </div>
                                    {!nameValidity.validState && nameValidity.errorMassage && <p className="register__input-error">{nameValidity.errorMassage}</p>}
                                </div>
                                <div className="register__input-container-box">
                                    <div className={`register__input-container ${!surnameValidity.validState && surnameValidity.errorMassage ? 'register__input-container_error' : ''} ${surnameValidity.validState ? 'register__input-container_valid' : ''}`}>
                                        <input placeholder='Иванов' className="register__input" name="text" type="text" value={surnameValue} onChange={handleSurnameChange} maxLength="250"></input>
                                        <p className="register__input-title">Фамилия <span className="register__input-reqiered">*</span></p>
                                    </div>
                                    {!surnameValidity.validState && surnameValidity.errorMassage && <p className="register__input-error">{surnameValidity.errorMassage}</p>}
                                </div>
                            </div>
                            <p className="register__form-title">Ваши конактные данныея</p>
                            <div className="register__inputs">
                                <div className="register__input-container-box">
                                    <div className={`register__input-container ${!phoneValidity.validState && phoneValidity.errorMassage ? 'register__input-container_error' : ''} ${phoneValidity.validState ? 'register__input-container_valid' : ''}`}>
                                        <input onKeyDown={(e) => handlePhoneDelite(e)} placeholder='+7 (___) ___-__-__' className="register__input" name="text" type="phone" value={phoneValue} onChange={handlePhoneChange} maxLength="250"></input>
                                        <p className="register__input-title">Телефон <span className="register__input-reqiered">*</span></p>
                                    </div>
                                    {!phoneValidity.validState && phoneValidity.errorMassage && <p className="register__input-error">{phoneValidity.errorMassage}</p>}
                                </div>
                                <div className="register__input-container-box">
                                    <div className={`register__input-container ${!emailValidity.validState && emailValidity.errorMassage ? 'register__input-container_error' : ''} ${emailValidity.validState ? 'register__input-container_valid' : ''}`}>
                                        <input placeholder='test@example.ru' className="register__input" name="text" type="email" value={emailValue} onChange={handleEmailChange} maxLength="250"></input>
                                        <p className="register__input-title">Email <span className="register__input-reqiered">*</span></p>
                                    </div>
                                    {!emailValidity.validState && emailValidity.errorMassage && <p className="register__input-error">{emailValidity.errorMassage}</p>}
                                </div>
                            </div>
                            <p className="register__form-title">Ваши конактные данныея</p>
                            <div className="register__inputs">
                                <div className="register__input-container-box">
                                    <div className={`register__input-container ${!passValidity.validState && passValidity.errorMassage ? 'register__input-container_error' : ''} ${passValidity.validState ? 'register__input-container_valid' : ''}`}>
                                        <input placeholder='********' className="register__input" name="text" type="password" value={passValue} onChange={handlePassChange} maxLength="250"></input>
                                        <p className="register__input-title">Пароль <span className="register__input-reqiered">*</span></p>
                                    </div>
                                    {!passValidity.validState && passValidity.errorMassage && <p className="register__input-error">{passValidity.errorMassage}</p>}
                                </div>
                                <div className="register__input-container-box">
                                    <div className={`register__input-container ${!passCheckValidity.validState && passCheckValidity.errorMassage ? 'register__input-container_error' : ''} ${passCheckValidity.validState ? 'register__input-container_valid' : ''}`}>
                                        <input placeholder='********' className="register__input" name="text" type="password" value={passCheckValue} onChange={handlePassCheckChange} maxLength="250"></input>
                                        <p className="register__input-title">Повторите пароль <span className="register__input-reqiered">*</span></p>
                                    </div>
                                    {!passCheckValidity.validState && passCheckValidity.errorMassage && <p className="register__input-error">{passCheckValidity.errorMassage}</p>}
                                </div>
                            </div>
                            <Link to="/login" className="register__login-link">Есть аккаунт? Войти</Link>
                        </>
                        : <></>}
                    {step === 1 ?
                        <div className="register__inputs">
                            <div className="register__input-container-box">
                                <div className={`register__input-container ${!codeValidity.validState && codeValidity.errorMassage ? 'register__input-container_error' : ''} ${codeValidity.validState ? 'register__input-container_valid' : ''}`}>
                                    <input placeholder='____' className="register__input" name="text" type="phone" value={codeValue} onChange={handleCodeChange} maxLength="250"></input>
                                    <p className="register__input-title">Код подтверждения <span className="register__input-reqiered">*</span></p>
                                </div>
                                {!codeValidity.validState && codeValidity.errorMassage && <p className="register__input-error">{codeValidity.errorMassage}</p>}
                            </div>
                        </div> : <></>}


                    {step === 0 ?
                        <div onClick={() => {
                            if (step === 0 && phoneValidity.validState) {
                                handleNextStep()
                            }

                        }} className={`register__btn register__btn_login ${nameValidity.validState && surnameValidity.validState && emailValidity.validState && phoneValidity.validState && passValidity.validState && passCheckValidity.validState ? '' : 'register__btn_inactive'}`}>
                            <p className="register__btn-text register__btn-text_login">Зарегестрироваться</p>
                        </div> : <></>}

                    {step === 1 ?
                        <p onClick={() => {
                            if (sendAgainAvailible) {
                                setSendAgainAvailible(false)
                                handleSendCodeAgain()
                            }
                        }} className={`register__code-timeout ${sendAgainAvailible ? sendCounter === 2 ? '' : 'register__code-timeout_active' : ''}`}>
                            {sendAgainAvailible ? sendCounter === 2 ? 'Если смс все еще не пришла, обратитесь в службу поддержки: +7 (919) 940-12-08' :
                                'Выслать код повторно' : sendCounter === 2 ? 'Если смс все еще не пришла, обратитесь в службу поддержки: +7 (919) 940-12-08' : `Выслать код повторно: ${timerValue}`
                            }</p>

                        : <></>}


                </div>
            </div>
        </div>
    );
}

export default Register;
