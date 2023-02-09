import React, { useEffect, useState } from 'react'
import mainApi from '../../../assets/api/MainApi';
import useWindowSize from '../../../assets/hooks/useWindowSize';
import MiniPreloader from '../../MiniPreloader/MiniPreloader';
import ProductCard from '../../ProductCard/ProductCard';


import './Products.css';


function Products({
    type,
    handleLikeBtn,
    favouritesProducts,
    setCartPopupOpen,
    cart,
    handleToCartBtn,
}) {

    const windowSize = useWindowSize()
    const [products, setProducts] = useState(undefined)
    const [isPreloaderVisible, setPreloaderVisible] = useState(true)
    useEffect(() => {
        if (!type) return
        setPreloaderVisible(true)
        mainApi.getHitsOrNews({ type: type })
            .then((res) => {
                console.log(res.data)
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setPreloaderVisible(false)
            })
    }, [type])

    const productsByWindowSize = products && products.length > 0 ?
        windowSize.width <= 1300 ?
            windowSize.width <= 970 ?
                windowSize.width <= 550 ?
                    products.slice(0, 4)
                    :
                    products.slice(0, 3)


                :
                products.slice(0, 4)
            :
            products

        : undefined
    return (
        <div className={`products`}>
            {type === 'hits' ?
                <div className='products__title-with-star'>
                    <svg className='products__start' width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className='products__start-fill' d="M16 0.5L19.4717 8.11857L27.3137 5.18629L24.3814 13.0283L32 16.5L24.3814 19.9717L27.3137 27.8137L19.4717 24.8814L16 32.5L12.5283 24.8814L4.68629 27.8137L7.61857 19.9717L0 16.5L7.61857 13.0283L4.68629 5.18629L12.5283 8.11857L16 0.5Z" fill="#D4171E" />
                    </svg>
                    <p className='products__title'>Хиты продаж</p>
                </div>
                :
                <p className='products__title'>Новинки</p>
            }
            {isPreloaderVisible ?
                <div className='products__preloader'>
                    <MiniPreloader />
                </div>
                :
                <div className='products__cards'>
                    {productsByWindowSize && productsByWindowSize.length > 0 ? productsByWindowSize.map((item, i) => (
                        <ProductCard
                            handleLikeBtn={handleLikeBtn}
                            favouritesProducts={favouritesProducts}
                            setCartPopupOpen={setCartPopupOpen}
                            cart={cart}
                            handleToCartBtn={handleToCartBtn}
                            link={`/item/${item.category.translit_name}/${item.sub_category.translit_name}/${item._id}`}
                            product={item}

                            key={`Main-ProductCard${type}${i}`}
                        />
                    )) : null}
                </div>
            }


        </div>
    );
}

export default Products;
