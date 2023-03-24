import React from 'react'
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import ProductCard from '../ProductCard/ProductCard';

import './Favourites.css';





function Favourites({
    favouritesProducts,
    handleLikeBtn,
    setCartPopupOpen,
    cart,
    handleToCartBtn,
}) {

    const history = useHistory();
    return (
        <div className="favourites">
          <Helmet>
            <title>Диванчик - Избранное</title>
          </Helmet>
            <h2 className="favourites__title">Избранное</h2>
            {favouritesProducts && favouritesProducts.length > 0 ?
                <div className="favourites__products">
                    {
                        favouritesProducts.map((product, i) => (
                            <ProductCard
                                handleLikeBtn={handleLikeBtn}
                                favouritesProducts={favouritesProducts}
                                setCartPopupOpen={setCartPopupOpen}
                                cart={cart}
                                handleToCartBtn={handleToCartBtn}
                                link={`/item/${product.category.translit_name}/${product.sub_category.translit_name}/${product._id}`}
                                product={product}
                                key={`FavoriteProductCard${i}`} />
                        ))

                    }
                </div>
                :
                <div className="favourites__empty">
                    <svg className="favourites__empty-icon" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1777 40.1777L40 70L69.8223 40.1777C73.1375 36.8625 75 32.3661 75 27.6777C75 17.9146 67.0854 10 57.3223 10C52.6339 10 48.1375 11.8625 44.8223 15.1777L40 20L35.1777 15.1777C31.8625 11.8625 27.3661 10 22.6777 10C12.9146 10 5 17.9146 5 27.6777C5 32.3661 6.86246 36.8625 10.1777 40.1777Z" fill="var(--contrast-color)" />
                        <path d="M40 70L39.6464 70.3536C39.8417 70.5488 40.1583 70.5488 40.3536 70.3536L40 70ZM10.1777 40.1777L9.82411 40.5312L9.82411 40.5312L10.1777 40.1777ZM35.1777 15.1777L34.8241 15.5312L34.8241 15.5312L35.1777 15.1777ZM40 20L39.6464 20.3536C39.8417 20.5488 40.1583 20.5488 40.3536 20.3536L40 20ZM44.8223 15.1777L44.4688 14.8241L44.4688 14.8241L44.8223 15.1777ZM40.3536 69.6464L10.5312 39.8241L9.82411 40.5312L39.6464 70.3536L40.3536 69.6464ZM69.4688 39.8241L39.6464 69.6464L40.3536 70.3536L70.1759 40.5312L69.4688 39.8241ZM34.8241 15.5312L39.6464 20.3536L40.3536 19.6464L35.5312 14.8241L34.8241 15.5312ZM40.3536 20.3536L45.1759 15.5312L44.4688 14.8241L39.6464 19.6464L40.3536 20.3536ZM57.3223 9.5C52.5013 9.5 47.8778 11.4151 44.4688 14.8241L45.1759 15.5312C48.3973 12.3098 52.7665 10.5 57.3223 10.5V9.5ZM74.5 27.6777C74.5 32.2335 72.6902 36.6027 69.4688 39.8241L70.1759 40.5312C73.5849 37.1222 75.5 32.4987 75.5 27.6777H74.5ZM75.5 27.6777C75.5 17.6384 67.3616 9.5 57.3223 9.5V10.5C66.8093 10.5 74.5 18.1907 74.5 27.6777H75.5ZM22.6777 10.5C27.2335 10.5 31.6027 12.3098 34.8241 15.5312L35.5312 14.8241C32.1222 11.4151 27.4987 9.5 22.6777 9.5V10.5ZM5.5 27.6777C5.5 18.1907 13.1907 10.5 22.6777 10.5V9.5C12.6384 9.5 4.5 17.6384 4.5 27.6777H5.5ZM10.5312 39.8241C7.30978 36.6027 5.5 32.2335 5.5 27.6777H4.5C4.5 32.4987 6.41514 37.1222 9.82411 40.5312L10.5312 39.8241Z" fill="var(--contrast-color)" />
                    </svg>
                    <p className='favourites__empty-text'>В избранном пусто</p>
                    <p className='favourites__empty-subtext'>Вам надо выбрать интересующий Вас товар</p>
                    <div className="favourites__section-go-back favourites__section-go-back_empty" onClick={() => history.goBack()}>
                        <svg className="favourites__section-go-back-arrow" width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.30926 4.5L4.77722 7.86484L4.12259 8.5L0 4.5L4.12259 0.5L4.77723 1.13516L1.30926 4.5Z" fill="var(--contrast-color)" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.633865 4.94907H10V4.05082H0.633865V4.94907Z" fill="var(--contrast-color)" />
                        </svg>
                        <p className="favourites__section-go-back-text">Вернуться к покупкам</p>
                    </div>
                </div>}
        </div>
    );
}

export default Favourites;
