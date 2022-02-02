import React from 'react'
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Recovery.css';




function Recovery(props) {

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
                setStep(2)
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
        <div className="recovery">
            <div className="recovery__container">
                <div className="recovery__text-container">
                    <h2 className="recovery__title">Восстановление пароля</h2>
                    <p className="recovery__text">Используйте номер телефона, указанный при регистрации</p>
                </div>
                <div className="recovery__form-container">
                    {step === 0 ? <p className="recovery__form-title">Номер телефона</p> : <></>}
                    {step === 1 ? <p className="recovery__form-title">Код из СМС</p> : <></>}
                    {step === 2 ? <p className="recovery__form-title">Новый пароль</p> : <></>}

                    {step === 0 ? <p className="recovery__form-subtitle">Введите ваш номер телефона для восстановления пароля</p> : <></>}
                    {step === 1 ? <p className="recovery__form-subtitle">Мы выслали код на номер<br/>{phoneValue}</p> : <></>}
                    {step === 2 ? <p className="recovery__form-subtitle">Введите ваш новый пароль</p> : <></>}

                    {step === 0 ?
                        <div className="recovery__inputs">
                            <div className="recovery__input-container-box">
                                <div className={`recovery__input-container ${!phoneValidity.validState && phoneValidity.errorMassage ? 'recovery__input-container_error' : ''} ${phoneValidity.validState ? 'recovery__input-container_valid' : ''}`}>
                                    <input onKeyDown={(e) => handlePhoneDelite(e)} placeholder='+7 (___) ___-__-__' className="recovery__input" name="text" type="phone" value={phoneValue} onChange={handlePhoneChange} maxLength="250"></input>
                                    <p className="recovery__input-title">Телефон <span className="recovery__input-reqiered">*</span></p>
                                </div>
                                {!phoneValidity.validState && phoneValidity.errorMassage && <p className="recovery__input-error">{phoneValidity.errorMassage}</p>}
                            </div>
                            {/* <div className="recovery__input-container-box">
                            <div className={`recovery__input-container ${!passValidity.validState && passValidity.errorMassage ? 'recovery__input-container_error' : ''} ${passValidity.validState ? 'recovery__input-container_valid' : ''}`}>
                                <input placeholder='********' className="recovery__input" name="text" type="password" value={passValue} onChange={handlePassChange} maxLength="250"></input>
                                <p className="recovery__input-title">Пароль <span className="recovery__input-reqiered">*</span></p>
                            </div>
                            {!passValidity.validState && passValidity.errorMassage && <p className="recovery__input-error">{passValidity.errorMassage}</p>}
                        </div> */}
                        </div> : <></>}
                    {step === 1 ?
                        <div className="recovery__inputs">
                            <div className="recovery__input-container-box">
                                <div className={`recovery__input-container ${!codeValidity.validState && codeValidity.errorMassage ? 'recovery__input-container_error' : ''} ${codeValidity.validState ? 'recovery__input-container_valid' : ''}`}>
                                    <input placeholder='____' className="recovery__input" name="text" type="phone" value={codeValue} onChange={handleCodeChange} maxLength="250"></input>
                                    <p className="recovery__input-title">Код подтверждения <span className="recovery__input-reqiered">*</span></p>
                                </div>
                                {!codeValidity.validState && codeValidity.errorMassage && <p className="recovery__input-error">{codeValidity.errorMassage}</p>}
                            </div>
                        </div> : <></>}

                    {step === 2 ?
                        <div className="recovery__inputs">

                            <div className="recovery__input-container-box">
                                <div className={`recovery__input-container ${!passValidity.validState && passValidity.errorMassage ? 'recovery__input-container_error' : ''} ${passValidity.validState ? 'recovery__input-container_valid' : ''}`}>
                                    <input placeholder='********' className="recovery__input" name="text" type="password" value={passValue} onChange={handlePassChange} maxLength="250"></input>
                                    <p className="recovery__input-title">Придумайте новый пароль <span className="recovery__input-reqiered">*</span></p>
                                </div>
                                {!passValidity.validState && passValidity.errorMassage && <p className="recovery__input-error">{passValidity.errorMassage}</p>}
                            </div>
                            <div className="recovery__input-container-box">
                                <div className={`recovery__input-container ${!passCheckValidity.validState && passCheckValidity.errorMassage ? 'recovery__input-container_error' : ''} ${passCheckValidity.validState ? 'recovery__input-container_valid' : ''}`}>
                                    <input placeholder='********' className="recovery__input" name="text" type="password" value={passCheckValue} onChange={handlePassCheckChange} maxLength="250"></input>
                                    <p className="recovery__input-title">Повторите пароль <span className="recovery__input-reqiered">*</span></p>
                                </div>
                                {!passCheckValidity.validState && passCheckValidity.errorMassage && <p className="recovery__input-error">{passCheckValidity.errorMassage}</p>}
                            </div>
                        </div> : <></>}
                    {step === 0 ?
                        <div onClick={() => {
                            if (step === 0 && phoneValidity.validState) {
                                handleNextStep()
                            }

                        }} className={`recovery__btn recovery__btn_login ${phoneValidity.validState ? '' : 'recovery__btn_inactive'}`}>
                            <p className="recovery__btn-text recovery__btn-text_login">Восстановить</p>
                        </div> : <></>}

                    {step === 1 ? 
                    <p onClick={() => {
                        if (sendAgainAvailible) {
                            setSendAgainAvailible(false)
                            handleSendCodeAgain()
                        }
                    }} className={`recovery__code-timeout ${sendAgainAvailible ? sendCounter === 2 ? '' : 'recovery__code-timeout_active' : ''}`}>
                        {sendAgainAvailible ? sendCounter === 2 ? 'Если смс все еще не пришла, обратитесь в службу поддержки: +7 (919) 940-12-08' :
                            'Выслать код повторно' : sendCounter === 2 ? 'Если смс все еще не пришла, обратитесь в службу поддержки: +7 (919) 940-12-08' : `Выслать код повторно: ${timerValue}`
                        }</p>

                        : <></>}
                    {step === 2 ?
                        <div onClick={() => {
                            if (step === 2 && passValidity.validState && passCheckValidity.validState) {
                                handleSubmit()
                            }

                        }} className={`recovery__btn recovery__btn_login ${passValidity.validState && passCheckValidity.validState ? '' : 'recovery__btn_inactive'}`}>
                            <p className="recovery__btn-text recovery__btn-text_login">Сохранить пароль</p>
                        </div> : <></>}

                </div>
            </div>
        </div>
    );
}

export default Recovery;
