import React from 'react'
import { Link } from 'react-router-dom';

import './Main.css';

import divanImg from '../../assets/images/main/divany.png'

import kuhniaImg from '../../assets/images/main/kuhnia.png'
import spalniaImg from '../../assets/images/main/spalnia.png'
import detskayaImg from '../../assets/images/main/detskaya.png'
import ofisImg from '../../assets/images/main/ofis.png'




function Main() {



    return (

        <section className='main'>
            <div className='main__cards'>
                <Link className='main__card main__card_divani-kresla' to={'/categories/divany'}>
                    <div className='main__card-texts'>
                        <p className='main__card-title'>
                            {`Диваны и кресла
                            в каждый дом`}
                        </p>
                        <div className='main__card-links'>
                            <Link className='main__card-link' to={'/categories/divany/divany-prjamye'}>
                                Прямые диваны
                            </Link>
                            <Link className='main__card-link' to={'/categories/divany/divany-p-obraznoj-formy'}>
                                Диваны п-образной формы
                            </Link>
                            <Link className='main__card-link' to={'/categories/divany/divany-uglovye'}>
                                Угловые диваны
                            </Link>
                            <Link className='main__card-link' to={'/categories/kresla-i-stulja/stulja'}>
                                Стулья
                            </Link>
                        </div>
                    </div>
                    <img className='main__card-img main__card-img_divani-kresla' src={divanImg} alt='' ></img>
                </Link>
                <Link className='main__card main__card_kuhnia' to={'/categories/kuhni'}>
                    <div className='main__card-texts'>
                        <p className='main__card-title'>
                            {`Кухонная 
зона`}
                        </p>
                        <div className='main__card-links'>
                            <Link className='main__card-link' to={'/categories/kuhni/fartuki'}>
                                Фартуки
                            </Link>
                            <Link className='main__card-link' to={'/categories/kuhni/kuhonnye-garnitury'}>
                                Кухонные гарнитуры
                            </Link>
                            <Link className='main__card-link' to={'/categories/kuhni/kuhonnye-skami'}>
                                Скамьи
                            </Link>
                            <Link className='main__card-link' to={'/categories/kuhni/stoleshnitsy'}>
                                Столешницы
                            </Link>
                        </div>
                    </div>
                    <img className='main__card-img main__card-img_kuhnia' src={kuhniaImg} alt='' ></img>
                </Link>
                <Link className='main__card main__card_spalnia' to={'/categories/krovati'}>
                    <div className='main__card-texts'>
                        <p className='main__card-title'>
                            {`Спальня`}
                        </p>
                        <div className='main__card-links'>
                            <Link className='main__card-link' to={'/categories/krovati/polutorospalnye-shirina-ot-120-sm'}>
                                Полутороспальные
                            </Link>
                            <Link className='main__card-link' to={'/categories/krovati/odnospalnye-shirina-ot-80-sm'}>
                                Односпальные
                            </Link>
                            <Link className='main__card-link' to={'/categories/krovati/dvuspalnye-shirina-ot-160-sm'}>
                                Двуспальные
                            </Link>
                            <Link className='main__card-link' to={'/categories/krovati/karkasy'}>
                                Каркасы
                            </Link>
                        </div>
                    </div>
                    <img className='main__card-img main__card-img_spalnia' src={spalniaImg} alt='' ></img>
                </Link>
                <Link className='main__card main__card_detskaya' to={'/categories/tumby-i-komody'}>
                    <div className='main__card-texts'>
                        <p className='main__card-title'>
                            {`Гостиная`}
                        </p>
                        <div className='main__card-links'>
                            <Link className='main__card-link' to={'/categories/tumby-i-komody/tumby-dlja-tv'}>
                                Тумбы для ТВ
                            </Link>
                            <Link className='main__card-link' to={'/categories/stoly/zhurnalnye-stoly'}>
                                Журнальные столы
                            </Link>
                            <Link className='main__card-link' to={'/categories/shkafy/stellazhi'}>
                                Стеллажи
                            </Link>
                            <Link className='main__card-link' to={'/categories/dekor-dlja-doma/kovry'}>
                                Ковры
                            </Link>

                        </div>
                    </div>
                    <img className='main__card-img main__card-img_detskaya' src={detskayaImg} alt='' ></img>
                </Link>
                <Link className='main__card main__card_ofis' to={'/categories/kresla-i-stulja'}>
                    <div className='main__card-texts'>
                        <p className='main__card-title'>
                            {`Офис`}
                        </p>
                        <div className='main__card-links'>
                            <Link className='main__card-link' to={'/categories/kresla-i-stulja/ofisnye-kresla'}>
                                Офисные кресла
                            </Link>
                            <Link className='main__card-link' to={'/categories/stoly/stoly-dlja-raboty'}>
                                Столы для работы
                            </Link>
                        </div>
                    </div>
                    <img className='main__card-img main__card-img_ofis' src={ofisImg} alt='' ></img>
                </Link>
            </div>
        </section>

    );
}

export default Main;
