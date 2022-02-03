import React from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './Login.css';
import mainApi from '../../utils/MainApi';
import { useHistory } from 'react-router-dom';




function Login(props) {
    let { from } = useParams();

    const history = useHistory()
    const [phoneValue, setPhoneValue] = React.useState('');
    const [phoneValidity, setPhoneValidity] = React.useState({
        errorMassage: '',
        validState: false
    });

    const [passValue, setPassValue] = React.useState('');
    const [passValidity, setPassValidity] = React.useState({
        errorMassage: '',
        validState: false
    });

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

    const [submitError, setSubmitError] = React.useState('');

    function handleSubmit() {
        setSubmitError('')
        if (phoneValidity.validState && passValidity.validState) {
            mainApi.login({ phone_number: phoneValue, password: passValue })
                .then((res) => {
                    localStorage.setItem('jwt', res.token);
                    mainApi.checkJwt({ token: res.token })
                        .then((data) => {
                            console.log(data)
                            props.setLoggedIn(true)
                            props.setCurrentUser(data.user)
                            if (from ) {
                                if(from === 'cart'){
                                    history.push('/cart')
                                }
                                
                            } else {
                                history.push('/')
                            }

                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    setSubmitError(err.message)
                    setTimeout(() => {
                        setSubmitError('')
                    }, 6000);
                })
        }
    }



    return (
        <div className="login">
            <div className="login__container">
                <div className="login__text-container">
                    <h2 className="login__title">Войдите в свой аккаунт Диванчик</h2>
                    <p className="login__text">Используйте телефон для регистрации и входа в аккаунт</p>
                </div>
                <div className="login__form-container">
                    <p className="login__form-title">Войти в кабинет</p>
                    <div className="login__inputs">
                        <div className="login__input-container-box">
                            <div className={`login__input-container ${!phoneValidity.validState && phoneValidity.errorMassage ? 'login__input-container_error' : ''} ${phoneValidity.validState ? 'login__input-container_valid' : ''}`}>
                                <input onKeyDown={(e) => handlePhoneDelite(e)} placeholder='+7 (___) ___-__-__' className="login__input" name="text" type="phone" value={phoneValue} onChange={handlePhoneChange} maxLength="250"></input>
                                <p className="login__input-title">Телефон <span className="login__input-reqiered">*</span></p>
                            </div>
                            {!phoneValidity.validState && phoneValidity.errorMassage && <p className="login__input-error">{phoneValidity.errorMassage}</p>}
                        </div>
                        <div className="login__input-container-box">
                            <div className={`login__input-container ${!passValidity.validState && passValidity.errorMassage ? 'login__input-container_error' : ''} ${passValidity.validState ? 'login__input-container_valid' : ''}`}>
                                <input placeholder='********' className="login__input" name="text" type="password" value={passValue} onChange={handlePassChange} maxLength="250"></input>
                                <p className="login__input-title">Пароль <span className="login__input-reqiered">*</span></p>
                            </div>
                            {!passValidity.validState && passValidity.errorMassage && <p className="login__input-error">{passValidity.errorMassage}</p>}
                        </div>
                    </div>
                    <Link className="login__recover-pass" to='/recovery'>Забыли пароль?</Link>
                    <div className={`login__btn login__btn_login ${phoneValidity.validState && passValidity.validState ? '' : 'login__btn_inactive'}`} onClick={() => {
                        if (phoneValidity.validState && passValidity.validState) {
                            handleSubmit()
                        }
                    }}>
                        <p className="login__btn-text login__btn-text_login">Войти</p>
                    </div>
                    {submitError ? <p className="login__submit-error">{submitError}</p> : <></>}

                    <Link className="login__btn login__btn_signup" to='/signup'>
                        <p className="login__btn-text login__btn-text_signup">Регистрация</p>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Login;
