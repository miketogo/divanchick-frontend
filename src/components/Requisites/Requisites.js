import React from 'react'
import { Helmet } from 'react-helmet';
import './Requisites.css';

const requisites = [
    {
        title: 'ИП Халиуллина Наталья Владимировна',
        ogrn: '304720628800023',
        inn: '720603954640',
        legal_address: '629303, ЯНАО, г. Новый Уренгой, мкр. Мирный, д. 2, корпус 4, кв. 139',
        postal_address: '626157, Тюменская область, г.Тобольск, 7 микрорайон, строение 2А',
        actual_address: '626157, Тюменская область, г.Тобольск, 7 микрорайон, строение 2А (м/с «Диванчик»)',
        phone: '8 (3456) 24-06-30',
        fax: '34-40-42',
        email: 'Ola.0802@mail.ru - бухгалтерия',
        work_time: 'Пн.- Сб. 9:30 - 20:00/ Вс. 9.30 -19.00'
    },
    // {
    //     title: 'ИП Пенкина Ольга Николаевна',
    //     ogrn: '312890324200015',
    //     inn: '661200610507',
    //     legal_address: '629730, ЯНАО, г. Надым, ул.Ямальская, дом 7, кв.11',
    //     postal_address: '626157, Тюменская область, г.Тобольск, 7 микрорайон, строение 2А',
    //     actual_address: '626157, Тюменская область, г.Тобольск, 7 микрорайон, строение 2А (м/с «Диванчик»)',
    //     phone: '8 (3456) 24-06-30',
    //     fax: '34-40-42',
    //     email: 'Ola.0802@mail.ru - бухгалтерия',
    //     work_time: 'Пн.- Сб. 9:30 - 20:00/ Вс. 9.30 -19.00'
    // },
    // {
    //     title: 'ИП Мазарак Юлия Борисовна',
    //     ogrn: '313890311600018',
    //     inn: '450206494229',
    //     legal_address: '629730, ЯНАО, г. Надым, пр. Ленинградский, дом 20, кв.24',
    //     postal_address: '626157, Тюменская область, г.Тобольск, 7 микрорайон, строение 2А',
    //     actual_address: '626157, Тюменская область, г.Тобольск, 7 микрорайон, строение 2А (м/с «Диванчик»)',
    //     phone: '8 (3456) 24-06-30',
    //     fax: '34-40-42',
    //     email: 'Ola.0802@mail.ru - бухгалтерия',
    //     work_time: 'Пн.- Сб. 9:30 - 20:00/ Вс. 9.30 -19.00'
    // },
]



function Requisites(props) {


    return (
        <div className="requisites">
          <Helmet>
            <title>Диванчик - Реквизиты</title>
          </Helmet>
            {requisites.map((item, i) => (
                <div className="requisites__card" key={`requisites__card${i}`}>
                    <p className="requisites__title">{item.title}</p>
                    <div className="requisites__info">
                        <p className="requisites__info-text">ОГРН/ИНН {item.ogrn}/{item.inn}</p>
                        <p className="requisites__info-text">Юридический адрес: {item.legal_address}</p>
                        <p className="requisites__info-text">Почтовый адрес: {item.postal_address}</p>
                        <p className="requisites__info-text">Фактический адрес: {item.actual_address}</p>
                        <p className="requisites__info-text">Телефон/факс {item.phone}/{item.fax}</p>
                        <p className="requisites__info-text">Электронная почта: {item.email}</p>
                        <p className="requisites__info-text">Режим работы: {item.work_time}</p>
                    </div>

                </div>
            ))}

        </div>
    );
}

export default Requisites;
