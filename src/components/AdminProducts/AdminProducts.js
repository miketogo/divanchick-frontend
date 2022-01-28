import React from 'react'
import mainApi from '../../utils/MainApi';

import './AdminProducts.css';


function translit(word) {
    var answer = '';
    var converter = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
        'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya',

        'А': 'a', 'Б': 'b', 'В': 'v', 'Г': 'g', 'Д': 'd',
        'Е': 'e', 'Ё': 'e', 'Ж': 'zh', 'З': 'z', 'И': 'i',
        'Й': 'y', 'К': 'k', 'Л': 'l', 'М': 'm', 'Н': 'n',
        'О': 'o', 'П': 'p', 'Р': 'r', 'С': 's', 'Т': 't',
        'У': 'u', 'Ф': 'f', 'Х': 'h', 'Ц': 'c', 'Ч': 'ch',
        'Ш': 'sh', 'Щ': 'sch', 'Ь': '', 'Ы': 'y', 'Ъ': '',
        'Э': 'e', 'Ю': 'yu', 'Я': 'ya', '-': '_', ' ': '_'
    };

    for (var i = 0; i < word.length; ++i) {
        if (converter[word[i]] === undefined) {
            answer += word[i].toLowerCase();
        } else {
            answer += converter[word[i]];
        }
    }

    return answer;
}



function AdminProducts(props) {
    const [searchValue, setSearchValue] = React.useState('');
    const [products, setProducts] = React.useState([]);
    const [filteredProducts, setFIlteredProducts] = React.useState([]);
    const [barcodeLink, setBarcodeLink] = React.useState('');

    React.useEffect(() => {
        setProducts(props.products)
        setFIlteredProducts(props.products)
    }, [props.products]);

    React.useEffect(() => {
        let wordsArray = searchValue.split(/\s/im)
        let filtered = products.filter((product) => {
            if (wordsArray.filter((word) => {
                if (product.key_words.filter((product_key) => {
                    if (product_key.toLowerCase().includes(word.toLowerCase()) || translit(product_key.toLowerCase()).includes(word.toLowerCase())) return true
                    else return false
                }).length > 0) return true
                else return false
            }).length > 0) return true
            else return false
        })
        filtered = filtered.map((item) => {
            return {
                ...item,
                search_points: wordsArray.filter((word) => {
                    if (item.key_words.filter((product_key) => {
                        if (product_key.toLowerCase().includes(word.toLowerCase()) || translit(product_key.toLowerCase()).includes(word.toLowerCase())) return true
                        else return false
                    }).length > 0) return true
                    else return false
                }).length
            }

        })
        filtered = filtered.sort(function (a, b) {

            if (a.search_points < b.search_points) return 1;
            if (b.search_points < a.search_points) return -1;

            return 0;
        })
        setFIlteredProducts(filtered)
    }, [searchValue ,products]);

    function handleSearchChange(e) {

        if (e.target.value === '') {
            setSearchValue(e.target.value)
            setFIlteredProducts(products)
        }
        else {

            setSearchValue(e.target.value)
            

        }

    }
    React.useEffect(() => {
        if (barcodeLink !== '') {
            console.log(barcodeLink.toString())
            window.open(barcodeLink.toString(), '_blank');
        }

    }, [barcodeLink]);
    function getBarCode(product_id) {
        console.log(product_id)
        mainApi.getBarcode(product_id)
            .then((res) => {
                console.log(res)
                let link = `http://51.250.18.104${res.link}`
                setBarcodeLink(link)

            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (

        <div className='admin-products'>

            <div className="admin-products__input-container">
                <input placeholder="Поиск товаров" className="admin-products__input" name="search" type="text" value={searchValue} onChange={handleSearchChange} maxLength="50"></input>
            </div>
            <div className='admin-products__product-container'>
                <div className='admin-products__table-item admin-products__table-item_first' >
                    <p className='admin-products__heading-text'>Название</p>
                </div>
                <div className='admin-products__table-item admin-products__table-item_second'>
                    <p className='admin-products__heading-text'>Категория</p>
                </div>
                <div className='admin-products__table-item admin-products__table-item_third'>
                    <p className='admin-products__heading-text'>Субкатегория</p>
                </div>
                <div className='admin-products__table-item admin-products__table-item_fourth'>
                    <p className='admin-products__heading-text'>Артикул</p>
                </div>
                <div className='admin-products__table-item admin-products__table-item_fifth'>
                    <p className='admin-products__heading-text'>Цвет</p>
                </div>
                <div className='admin-products__table-item admin-products__table-item_sixth'>
                    <p className='admin-products__heading-text'>Размер</p>
                </div>
                <div className='admin-products__table-item admin-products__table-item_seventh'>
                    <p className='admin-products__heading-text'>На складе (Резерв)</p>
                </div>
                <div className='admin-products__table-item admin-products__table-item_eighth'>
                    <p className='admin-products__heading-text'>Видимость</p>
                </div>
                <div className='admin-products__table-item admin-products__table-item_nineth'>
                    <p className='admin-products__heading-text'>Скачать шрих код</p>
                </div>
            </div>
            <div className='admin-products__table'>
                {filteredProducts && filteredProducts !== [] && filteredProducts.length > 0 ?
                    filteredProducts.map((item, i) => (
                        <div className='admin-products__product-container'>
                            <div className='admin-products__table-item admin-products__table-item_first' >
                                <div className='admin-products__selector-circle'>
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 2L4 6L7 2" stroke="white" stroke-linecap="round" />
                                    </svg>
                                </div>
                                <div className='admin-products__name-texts'>
                                    {item.isModuleParent ?
                                        <p className='admin-products__module-text'>Модульный товар</p>
                                        :
                                        <></>
                                    }
                                    {item.isVariationParent ?
                                        <p className='admin-products__module-text'>Товар с вариациями</p>
                                        :
                                        <></>
                                    }
                                    <p className='admin-products__table-text'>{item.name}</p>
                                </div>

                            </div>
                            <div className='admin-products__table-item admin-products__table-item_second'>
                                <p className='admin-products__table-text'>{item.category.name}</p>
                            </div>
                            <div className='admin-products__table-item admin-products__table-item_third'>
                                <p className='admin-products__table-text'>{item.sub_category.name}</p>
                            </div>
                            <div className='admin-products__table-item admin-products__table-item_fourth'>
                                <p className='admin-products__table-text'>{item.article}</p>
                            </div>
                            <div className='admin-products__table-item admin-products__table-item_fifth'>
                                <p className='admin-products__table-text'>{item.specifications.colour}</p>
                            </div>
                            <div className='admin-products__table-item admin-products__table-item_sixth'>
                                <p className='admin-products__table-text'>{item.specifications.width}x{item.specifications.length}x{item.specifications.height}</p>
                            </div>
                            <div className='admin-products__table-item admin-products__table-item_seventh'>
                                <p className='admin-products__table-text'>{item.stockBalance} ({item.itemsInReserve})</p>
                            </div>
                            <div className='admin-products__table-item admin-products__table-item_eighth'>
                                <p className='admin-products__table-text'>{item.visibleToUsers ? 'Видно' : 'Не видно'}</p>
                                <svg className='admin-products__visible-icon' width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.7216 3.84156L7.59662 10.9666L4.84755 8.19968C4.4713 7.83688 3.96899 7.63415 3.4463 7.63415C2.92362 7.63415 2.42131 7.83688 2.04505 8.19968C1.67522 8.57227 1.46768 9.07596 1.46768 9.60093C1.46768 10.1259 1.67522 10.6296 2.04505 11.0022L6.2013 15.1584C6.57313 15.5297 7.0771 15.7382 7.60255 15.7382C8.12801 15.7382 8.63198 15.5297 9.0038 15.1584L17.5004 6.64406C17.8684 6.27172 18.0748 5.7693 18.0748 5.24578C18.0748 4.72225 17.8684 4.21983 17.5004 3.8475C17.1247 3.49353 16.6283 3.29591 16.1122 3.2948C15.596 3.2937 15.0988 3.4892 14.7216 3.84156Z" fill="#EEEEEE" />
                                </svg>
                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.25674 10.95L12.3817 3.82496C12.7589 3.4726 13.2561 3.2771 13.7723 3.2782C14.2884 3.27931 14.7848 3.47693 15.1605 3.83089C15.5285 4.20323 15.7349 4.70565 15.7349 5.22918C15.7349 5.7527 15.5285 6.25512 15.1605 6.62746L6.66392 15.1418C6.2921 15.5131 5.78813 15.7216 5.26267 15.7216C4.73722 15.7216 4.23325 15.5131 3.86142 15.1418C2.99718 14.2776 3.20116 13.1771 3.6643 12.6661L5.25674 10.95Z" fill="#FF7272" />
                                    <path d="M5.25674 10.95L12.3817 3.82496C12.7589 3.4726 13.2561 3.2771 13.7723 3.2782C14.2884 3.27931 14.7848 3.47693 15.1605 3.83089C15.5285 4.20323 15.7349 4.70565 15.7349 5.22918C15.7349 5.7527 15.5285 6.25512 15.1605 6.62746L6.66392 15.1418C6.2921 15.5131 5.78813 15.7216 5.26267 15.7216C4.73722 15.7216 4.23325 15.5131 3.86142 15.1418C2.99718 14.2776 3.20116 13.1771 3.6643 12.6661L5.25674 10.95Z" fill="#FF7272" />
                                    <path d="M8.04997 5.25666L15.175 12.3817C15.5273 12.7588 15.7228 13.2561 15.7217 13.7722C15.7206 14.2884 15.523 14.7847 15.169 15.1604C14.7967 15.5284 14.2943 15.7348 13.7707 15.7348C13.2472 15.7348 12.7448 15.5284 12.3725 15.1604L3.85809 6.66385C3.48681 6.29202 3.27828 5.78805 3.27828 5.2626C3.27828 4.73714 3.48681 4.23317 3.85809 3.86135C4.72234 2.9971 5.82281 3.20109 6.33385 3.66423L8.04997 5.25666Z" fill="#FF7272" />
                                    <path d="M8.04997 5.25666L15.175 12.3817C15.5273 12.7588 15.7228 13.2561 15.7217 13.7722C15.7206 14.2884 15.523 14.7847 15.169 15.1604C14.7967 15.5284 14.2943 15.7348 13.7707 15.7348C13.2472 15.7348 12.7448 15.5284 12.3725 15.1604L3.85809 6.66385C3.48681 6.29202 3.27828 5.78805 3.27828 5.2626C3.27828 4.73714 3.48681 4.23317 3.85809 3.86135C4.72234 2.9971 5.82281 3.20109 6.33385 3.66423L8.04997 5.25666Z" fill="#FF7272" />
                                </svg>

                            </div>
                            <div className='admin-products__table-item admin-products__table-item_nineth' onClick={() => {
                                getBarCode(item._id)
                            }}>
                                <p className='admin-products__table-text admin-products__table-text_type_download'>скачать</p>
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.5 9C14.5 8.72386 14.2761 8.5 14 8.5C13.7239 8.5 13.5 8.72386 13.5 9L14.5 9ZM13.6464 20.3536C13.8417 20.5488 14.1583 20.5488 14.3536 20.3536L17.5355 17.1716C17.7308 16.9763 17.7308 16.6597 17.5355 16.4645C17.3403 16.2692 17.0237 16.2692 16.8284 16.4645L14 19.2929L11.1716 16.4645C10.9763 16.2692 10.6597 16.2692 10.4645 16.4645C10.2692 16.6597 10.2692 16.9763 10.4645 17.1716L13.6464 20.3536ZM13.5 9L13.5 20L14.5 20L14.5 9L13.5 9Z" fill="#0085FF" />
                                    <path d="M10.5 21L17.5 21" stroke="#0085FF" stroke-linecap="round" />
                                </svg>
                            </div>
                        </div>
                    ))
                    :
                    <>
                    </>}

            </div>

        </div>

    );
}

export default AdminProducts;
