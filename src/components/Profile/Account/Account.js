import React from 'react'
import './Account.css';
import validator from 'validator'




function Account(props) {


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

    return (
        <section className="account">
            <div className="account__inputs">
                <div className="account__name-inputs">
                    <div className="account__input-container-box">
                        <div className={`account__input-container ${!nameValidity.validState && nameValidity.errorMassage ? 'account__input-container_error' : ''} ${nameValidity.validState ? 'account__input-container_valid' : ''}`}>
                            <input placeholder='Иван' className="account__input" name="text" type="text" value={nameValue} onChange={handleNameChange} maxLength="250"></input>
                            <p className="account__input-title">Имя <span className="account__input-reqiered">*</span></p>
                        </div>
                        {!nameValidity.validState && nameValidity.errorMassage && <p className="account__input-error">{nameValidity.errorMassage}</p>}
                    </div>
                    <div className="account__input-container-box">
                        <div className={`account__input-container ${!surnameValidity.validState && surnameValidity.errorMassage ? 'account__input-container_error' : ''} ${surnameValidity.validState ? 'account__input-container_valid' : ''}`}>
                            <input placeholder='Иванов' className="account__input" name="text" type="text" value={surnameValue} onChange={handleSurnameChange} maxLength="250"></input>
                            <p className="account__input-title">Фамилия <span className="account__input-reqiered">*</span></p>
                        </div>
                        {!surnameValidity.validState && surnameValidity.errorMassage && <p className="account__input-error">{surnameValidity.errorMassage}</p>}
                    </div>
                </div>

                <div className="account__contact-inputs">
                    <div className="account__input-container-box">
                        <div className={`account__input-container ${!phoneValidity.validState && phoneValidity.errorMassage ? 'account__input-container_error' : ''} ${phoneValidity.validState ? 'account__input-container_valid' : ''}`}>
                            <input onKeyDown={(e) => handlePhoneDelite(e)} placeholder='+7 (___) ___ __ __' className="account__input" name="text" type="phone" value={phoneValue} onChange={handlePhoneChange} maxLength="250"></input>
                            <p className="account__input-title">Контактный телефон <span className="account__input-reqiered">*</span></p>
                        </div>
                        {!phoneValidity.validState && phoneValidity.errorMassage && <p className="account__input-error">{phoneValidity.errorMassage}</p>}
                    </div>
                    <div className="account__input-container-box">
                        <div className={`account__input-container ${!emailValidity.validState && emailValidity.errorMassage ? 'account__input-container_error' : ''} ${emailValidity.validState ? 'account__input-container_valid' : ''}`}>
                            <input placeholder='test@example.ru' className="account__input" name="text" type="email" value={emailValue} onChange={handleEmailChange} maxLength="250"></input>
                            <p className="account__input-title">Электронная почта <span className="account__input-reqiered">*</span></p>
                        </div>
                        {!emailValidity.validState && emailValidity.errorMassage && <p className="account__input-error">{emailValidity.errorMassage}</p>}
                    </div>

                </div>

            </div>
            <div onClick={()=>{
                if((phoneValue !== props.currentUser.formatedPhoneNumber || emailValue !== props.currentUser.email || surnameValue !== props.currentUser.surname || nameValue !== props.currentUser.firstname) && phoneValidity.validState && emailValidity.validState && nameValidity.validState && surnameValidity.validState){
                    console.log('change')
                }
            }} className={`account__submit-btn ${(phoneValue === props.currentUser.formatedPhoneNumber && emailValue === props.currentUser.email && surnameValue === props.currentUser.surname && nameValue === props.currentUser.firstname) || (!phoneValidity.validState || !emailValidity.validState || !nameValidity.validState || !surnameValidity.validState)? 'account__submit-btn_inactive' : ''}`}>
                <p className="account__submit-btn-text">Сохранить изменения</p>
            </div>
        </section>


    );
}

export default Account;
