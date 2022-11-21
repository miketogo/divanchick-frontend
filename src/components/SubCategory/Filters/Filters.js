import React, { useEffect, useState } from 'react'
import './Filters.css';




function Filters({ handleUpdateByFilters, filters, divRef, handleResetFilters }) {
  const [allBrands, setAllBrands] = useState([])
  const [filtersValue, setFiltersValue] = useState({
    inStock: false,
    price: {
      min: '',
      max: '',
    },
    width: {
      min: '',
      max: '',
    },
    height: {
      min: '',
      max: '',
    },
    depth: {
      min: '',
      max: '',
    },
    brands: [],


  })

  const [openedFilter, setOpendFilter] = useState(undefined)
  const [filtersValues, setFiltersValues] = useState(undefined)

  // React.useEffect(() => {
  //     if (Object.keys( filters).length !== 0) {
  //         setFiltersValue({
  //             inStock: false,
  //             price: {
  //                 min:  filters.price.min,
  //                 max:  filters.price.max,
  //             },
  //             width: {
  //                 min:  filters.width.min,
  //                 max:  filters.width.max,
  //             },
  //             height: {
  //                 min:  filters.height.min,
  //                 max:  filters.height.max,
  //             },
  //             depth: {
  //                 min:  filters.depth.min,
  //                 max:  filters.depth.max,
  //             },
  //             brands: [],
  //         })
  //         setAllBrands( filters.brands)
  //     }
  // }, [ filters])


  function handleStockSelect() {
    setFiltersValue({
      ...filtersValue,
      inStock: !filtersValue.inStock
    })
  }

  // function handleCloseAll() {
  //     setPriceOpen(false)
  //     setWidthOpen(false)
  //     setHeightOpen(false)
  //     setDepthOpen(false)
  //     setBrandsOpen(false)
  // }

  const [isPriceOpen, setPriceOpen] = useState(false)

  function handlePriceOpen() {
    setPriceOpen(!isPriceOpen)
    setWidthOpen(false)
    setHeightOpen(false)
    setDepthOpen(false)
    setBrandsOpen(false)
  }


  function handlePriceMinChange(e) {
    let inputValue = e.target.value.replace(/\D/g, '')

    setFiltersValue({
      ...filtersValue,
      price: {
        min: inputValue,
        max: filtersValue.price.max
      }
    })
  }

  function handlePriceMaxChange(e) {
    let inputValue = e.target.value.replace(/\D/g, '')
    setFiltersValue({
      ...filtersValue,
      price: {
        min: filtersValue.price.min,
        max: inputValue
      }
    })
  }

  const [isWidthOpen, setWidthOpen] = useState(false)

  function handleWidthOpen() {
    setWidthOpen(!isWidthOpen)
    setPriceOpen(false)
    setHeightOpen(false)
    setDepthOpen(false)
    setBrandsOpen(false)
  }

  function handleWidthMinChange(e) {
    let inputValue = e.target.value.replace(/\D/g, '')
    setFiltersValue({
      ...filtersValue,
      width: {
        min: inputValue,
        max: filtersValue.width.max

      }
    })
  }

  function handleWidthMaxChange(e) {
    let inputValue = e.target.value.replace(/\D/g, '')
    setFiltersValue({
      ...filtersValue,
      width: {
        min: filtersValue.width.min,
        max: inputValue
      }
    })
  }

  const [isHeightOpen, setHeightOpen] = useState(false)

  function handleHeightOpen() {
    setHeightOpen(!isHeightOpen)
    setPriceOpen(false)
    setWidthOpen(false)
    setDepthOpen(false)
    setBrandsOpen(false)
  }



  function handleHeightMinChange(e) {
    let inputValue = e.target.value.replace(/\D/g, '')
    setFiltersValue({
      ...filtersValue,
      height: {
        min: inputValue,
        max: filtersValue.height.max
      }
    })
  }

  function handleHeightMaxChange(e) {
    let inputValue = e.target.value.replace(/\D/g, '')
    setFiltersValue({
      ...filtersValue,
      height: {
        min: filtersValue.height.min,
        max: inputValue

      }
    })
  }


  const [isDepthOpen, setDepthOpen] = useState(false)

  function handleDepthOpen() {
    setDepthOpen(!isDepthOpen)
    setPriceOpen(false)
    setWidthOpen(false)
    setHeightOpen(false)
    setBrandsOpen(false)
  }



  function handleDepthMinChange(e) {
    let inputValue = e.target.value.replace(/\D/g, '')
    setFiltersValue({
      ...filtersValue,
      depth: {
        min: inputValue,
        max: filtersValue.depth.max
      }
    })
  }

  function handleDepthMaxChange(e) {
    let inputValue = e.target.value.replace(/\D/g, '')
    setFiltersValue({
      ...filtersValue,
      depth: {
        min: filtersValue.depth.min,
        max: inputValue

      }
    })
  }


  const [isBrandsOpen, setBrandsOpen] = useState(false)

  const [brandsValue, setBrandsValue] = useState('')

  function handleBrandsOpen() {
    setBrandsOpen(!isBrandsOpen)
    setPriceOpen(false)
    setWidthOpen(false)
    setHeightOpen(false)
    setDepthOpen(false)
  }

  function handleBrandsChange(e) {
    let inputValue = e.target.value
    setBrandsValue(inputValue)
  }




  const [isReseting, setReseting] = useState(false)


  function handleReset() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    handleResetFilters()
    setFiltersValues(undefined)
    setOpendFilter(undefined)
    // setFiltersValue({
    //     inStock: false,
    //     price: {
    //         min:  filters.price.min,
    //         max:  filters.price.max,
    //     },
    //     width: {
    //         min:  filters.width.min,
    //         max:  filters.width.max,
    //     },
    //     height: {
    //         min:  filters.height.min,
    //         max:  filters.height.max,
    //     },
    //     depth: {
    //         min:  filters.depth.min,
    //         max:  filters.depth.max,
    //     },
    //     brands: [],
    // })
  }





  function handleFilterOpen(item) {
    if (openedFilter && openedFilter.translit_name === item.translit_name) {
      setOpendFilter('')
    } else {
      setOpendFilter(item)
    }

  }

  function handleMinChange(e) {
    let inputValue = e.target.value.replace(/\D/g, '')
    if (filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].max && Number(inputValue) > Number(filtersValues[openedFilter.translit_name].max)) {
      setFiltersValues({
        ...filtersValues,
        [openedFilter.translit_name]: {
          min: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].max ? filtersValues[openedFilter.translit_name].max : '',
          max: inputValue,
          translit_name: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].translit_name ? filtersValues[openedFilter.translit_name].translit_name : openedFilter.translit_name,
          type: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].type ? filtersValues[openedFilter.translit_name].type : openedFilter.type,
        }
      })
    } else {
      setFiltersValues({
        ...filtersValues,
        [openedFilter.translit_name]: {
          min: inputValue,
          max: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].max ? filtersValues[openedFilter.translit_name].max : '',
          translit_name: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].translit_name ? filtersValues[openedFilter.translit_name].translit_name : openedFilter.translit_name,
          type: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].type ? filtersValues[openedFilter.translit_name].type : openedFilter.type,
        }
      })
    }

  }

  function handleBrandSelect(brand) {


    if (filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].criterions.indexOf(brand) !== -1) {
      let newBrands = filtersValues[openedFilter.translit_name].criterions.filter((item) => {
        if (item === brand) return false
        else return true
      })
      setFiltersValues({
        ...filtersValues,
        [openedFilter.translit_name]: {
          criterions: newBrands,

          translit_name: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].translit_name ? filtersValues[openedFilter.translit_name].translit_name : openedFilter.translit_name,
          type: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].type ? filtersValues[openedFilter.translit_name].type : openedFilter.type,
        }
      })
    } else {
      setFiltersValues({
        ...filtersValues,
        [openedFilter.translit_name]: {
          criterions: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].criterions ? [...filtersValues[openedFilter.translit_name].criterions, brand] : [brand],

          translit_name: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].translit_name ? filtersValues[openedFilter.translit_name].translit_name : openedFilter.translit_name,
          type: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].type ? filtersValues[openedFilter.translit_name].type : openedFilter.type,
        }
      })
    }

  }

  function handleMaxChange(e) {
    let inputValue = e.target.value.replace(/\D/g, '')
    if (filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].min && Number(inputValue) < Number(filtersValues[openedFilter.translit_name].min)) {
      setFiltersValues({
        ...filtersValues,
        [openedFilter.translit_name]: {
          min: inputValue,
          max: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].min ? filtersValues[openedFilter.translit_name].min : '',
          translit_name: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].translit_name ? filtersValues[openedFilter.translit_name].translit_name : openedFilter.translit_name,
          type: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].type ? filtersValues[openedFilter.translit_name].type : openedFilter.type,
        }
      })
    } else {
      setFiltersValues({
        ...filtersValues,
        [openedFilter.translit_name]: {
          min: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].min ? filtersValues[openedFilter.translit_name].min : '',
          max: inputValue,
          translit_name: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].translit_name ? filtersValues[openedFilter.translit_name].translit_name : openedFilter.translit_name,
          type: filtersValues && filtersValues[openedFilter.translit_name] && filtersValues[openedFilter.translit_name].type ? filtersValues[openedFilter.translit_name].type : openedFilter.type,
        }
      })
    }

  }

  useEffect(() => {
    console.log(filtersValues)
    //  setItems()
    // //  setItemsCount()
    if (filtersValues) {
      handleUpdateByFilters({ filters: filtersValues, inStock: filtersValue.inStock })
    } else {
      handleUpdateByFilters({ filters: [], inStock: filtersValue.inStock })
    }

  }, [filtersValues, filtersValue])

  return (
    <div className="filters">

      <div className="filters__in-stock">
        <p className="filters__in-stock-text">Только&nbsp;в&nbsp;наличии</p>
        <div className={`filters__in-stock-selector ${filtersValue.inStock ? 'filters__in-stock-selector_active' : ''}`} onClick={handleStockSelect}>
          <div className={`filters__in-stock-selector-item ${filtersValue.inStock ? 'filters__in-stock-selector-item_active' : ''}`}></div>
        </div>
      </div>
      {filters && filters.length > 0 && filters.map((item, i) => (
        <>
          {item.type === "min_max" ?
            <div className="filters__item">
              <div className="filters__item-row" onClick={() => {
                handleFilterOpen(item)
              }}>
                <svg className={`filters__arrow ${isPriceOpen ? 'filters__arrow_active' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6.25L9.29289 13.0429C9.68342 13.4334 10.3166 13.4334 10.7071 13.0429L17.5 6.25" stroke="black" strokeLinecap="round" />
                </svg>
                <p className="filters__item-name">{item.name}</p>
              </div>
              {openedFilter && openedFilter.translit_name === item.translit_name ?
                <div className="filters__item-dropdown">
                  <p className="filters__item-dropdown-text">от</p>
                  <input placeholder={item.criterions[0].value} className="filters__input" type="text" value={filtersValues && filtersValues[item.translit_name] ? filtersValues[item.translit_name].min : ''} onChange={handleMinChange} ></input>
                  <div className="filters__item-dropdown-line"></div>
                  <p className="filters__item-dropdown-text">до</p>
                  <input placeholder={item.criterions[1].value} className="filters__input filters__input_second" type="text" value={filtersValues && filtersValues[item.translit_name] ? filtersValues[item.translit_name].max : ''} onChange={handleMaxChange} maxLength="50"></input>
                </div>
                : <></>}
            </div>
            : <></>}
          {item.type === "array_choose" ?
            <div className="filters__item">
              <div className="filters__item-row" onClick={() => {
                handleFilterOpen(item)
              }}>
                <svg className={`filters__arrow ${isBrandsOpen ? 'filters__arrow_active' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6.25L9.29289 13.0429C9.68342 13.4334 10.3166 13.4334 10.7071 13.0429L17.5 6.25" stroke="black" strokeLinecap="round" />
                </svg>
                <p className="filters__item-name">Бренд</p>
              </div>
              {openedFilter && openedFilter.translit_name === item.translit_name ?
                <div className="filters__item-dropdown filters__item-dropdown_brand">
                  <div className="filters__input-container">
                    <input placeholder='поиск' className="filters__input filters__input_brands" type="text" value={brandsValue} onChange={handleBrandsChange} maxLength="50"></input>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_885_15307)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 15.0412C11.6819 15.0412 14.6667 12.082 14.6667 8.43156C14.6667 4.78116 11.6819 1.82193 8 1.82193C4.3181 1.82193 1.33333 4.78116 1.33333 8.43156C1.33333 12.082 4.3181 15.0412 8 15.0412ZM8 16.3631C12.4183 16.3631 16 12.812 16 8.43156C16 4.05108 12.4183 0.5 8 0.5C3.58172 0.5 0 4.05108 0 8.43156C0 12.812 3.58172 16.3631 8 16.3631Z" fill="#9B38DC" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.195272 15.5653L2.52861 13.2519L3.47141 14.1866L1.13808 16.5L0.195272 15.5653Z" fill="#9B38DC" />
                      </g>
                      <defs>
                        <clipPath id="clip0_885_15307">
                          <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                      </defs>
                    </svg>

                  </div>
                  <div className="filters__dropdown-hints">
                    {item.criterions ?
                      <>
                        {item.criterions.filter((item) => {
                          if (item.name.toLowerCase().includes(brandsValue.toLowerCase())) return true
                          else return false
                        }).length > 0 ? item.criterions.filter((item) => {
                          if (item.name.toLowerCase().includes(brandsValue.toLowerCase())) return true
                          else return false
                        }).map((criteriy, i) => (
                          <div key={`filters__dropdown-hint${i}`} className="filters__dropdown-hint" onClick={() => handleBrandSelect(criteriy)}>
                            <div className={`filters__dropdown-hint-checkbox ${filtersValues && filtersValues[item.translit_name] ? filtersValues[item.translit_name].criterions.indexOf(criteriy) !== -1 ? 'filters__dropdown-hint-checkbox_active' : '' : ''}`}>
                              <svg className={`filters__dropdown-hint-checkbox-tick ${filtersValues && filtersValues[item.translit_name] ? filtersValues[item.translit_name].criterions.indexOf(criteriy) !== -1 ? 'filters__dropdown-hint-checkbox-tick_active' : '' : ''}`} width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.66447 7.01968L4.0314 7.4161L4.39834 7.01968L9.74191 1.2468L9.83514 1.32639L4.0314 7.59641L1.27619 4.61983L1.36942 4.54024L3.66447 7.01968Z" stroke="#9B38DC" />
                              </svg>
                            </div>
                            <p className="filters__dropdown-hint-text">{criteriy.name}</p>
                          </div>
                        )) : <p className="filters__dropdown-hint-text">Такого бренда нет</p>}
                      </> : <></>}


                  </div>
                </div>
                : <></>}
            </div>
            : <></>}
        </>

      ))}




      {/* <div className="filters__item">
                <div className="filters__item-row" onClick={handleBrandsOpen}>
                    <svg className={`filters__arrow ${isBrandsOpen ? 'filters__arrow_active' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 6.25L9.29289 13.0429C9.68342 13.4334 10.3166 13.4334 10.7071 13.0429L17.5 6.25" stroke="black" strokeLinecap="round" />
                    </svg>
                    <p className="filters__item-name">Бренд</p>
                </div>
                {isBrandsOpen ?
                    <div className="filters__item-dropdown filters__item-dropdown_brand">
                        <div className="filters__input-container">
                            <input placeholder='поиск' className="filters__input filters__input_brands" type="text" value={brandsValue} onChange={handleBrandsChange} maxLength="50"></input>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_885_15307)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8 15.0412C11.6819 15.0412 14.6667 12.082 14.6667 8.43156C14.6667 4.78116 11.6819 1.82193 8 1.82193C4.3181 1.82193 1.33333 4.78116 1.33333 8.43156C1.33333 12.082 4.3181 15.0412 8 15.0412ZM8 16.3631C12.4183 16.3631 16 12.812 16 8.43156C16 4.05108 12.4183 0.5 8 0.5C3.58172 0.5 0 4.05108 0 8.43156C0 12.812 3.58172 16.3631 8 16.3631Z" fill="#9B38DC" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.195272 15.5653L2.52861 13.2519L3.47141 14.1866L1.13808 16.5L0.195272 15.5653Z" fill="#9B38DC" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_885_15307">
                                        <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                        <div className="filters__dropdown-hints">
                            {allBrands ?
                                <>
                                    {allBrands.filter((item) => {
                                        if (item.toLowerCase().includes(brandsValue.toLowerCase())) return true
                                        else return false
                                    }).length > 0 ? allBrands.filter((item) => {
                                        if (item.toLowerCase().includes(brandsValue.toLowerCase())) return true
                                        else return false
                                    }).map((item, i) => (
                                        <div key={`filters__dropdown-hint${i}`} className="filters__dropdown-hint" onClick={() => handleBrandSelect(item)}>
                                            <div className={`filters__dropdown-hint-checkbox ${filtersValue.brands.indexOf(item) !== -1 ? 'filters__dropdown-hint-checkbox_active' : ''}`}>
                                                <svg className={`filters__dropdown-hint-checkbox-tick ${filtersValue.brands.indexOf(item) !== -1 ? 'filters__dropdown-hint-checkbox-tick_active' : ''}`} width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.66447 7.01968L4.0314 7.4161L4.39834 7.01968L9.74191 1.2468L9.83514 1.32639L4.0314 7.59641L1.27619 4.61983L1.36942 4.54024L3.66447 7.01968Z" stroke="#9B38DC" />
                                                </svg>
                                            </div>
                                            <p className="filters__dropdown-hint-text">{item}</p>
                                        </div>
                                    )) : <p className="filters__dropdown-hint-text">Такого бренда нет</p>}
                                </> : <></>}


                        </div>
                    </div>
                    : <></>}
            </div> */}
      <div className="filters__reset-btn" onClick={handleReset}>
        <p className="filters__reset-btn-text">очистить фильтры</p>
        {/* <svg  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.615 8.27501C28.5919 8.45484 28.504 8.62008 28.3678 8.73974C28.2315 8.8594 28.0563 8.92527 27.875 8.92501H27.775L25.45 8.62001C27.1188 10.7597 28.0132 13.4017 27.9871 16.1151C27.9611 18.8284 27.0162 21.4529 25.3067 23.5601C23.5972 25.6674 21.224 27.133 18.5743 27.7179C15.9246 28.3028 13.1549 27.9724 10.7172 26.7806C8.27942 25.5888 6.31756 23.606 5.15172 21.1558C3.98588 18.7055 3.6849 15.9325 4.29789 13.2891C4.91089 10.6458 6.40166 8.28825 8.52694 6.60121C10.6522 4.91416 13.2865 3.99722 16 4.00001C16.1989 4.00001 16.3897 4.07902 16.5303 4.21968C16.671 4.36033 16.75 4.55109 16.75 4.75001C16.75 4.94892 16.671 5.13968 16.5303 5.28034C16.3897 5.42099 16.1989 5.50001 16 5.50001C13.6174 5.49904 11.3053 6.30846 9.44346 7.7953C7.58166 9.28213 6.2809 11.358 5.75487 13.6818C5.22883 16.0057 5.50878 18.4393 6.54875 20.583C7.58872 22.7267 9.32685 24.453 11.4776 25.4782C13.6284 26.5035 16.0639 26.7667 18.3841 26.2248C20.7043 25.6828 22.7712 24.3679 24.2452 22.4959C25.7192 20.624 26.5128 18.3064 26.4955 15.9238C26.4782 13.5412 25.6511 11.2354 24.15 9.38501L24.025 12.285C24.016 12.4769 23.9338 12.6581 23.7952 12.7911C23.6565 12.9242 23.4721 12.9989 23.28 13H23.245C23.1465 12.9968 23.0496 12.974 22.96 12.9329C22.8705 12.8917 22.79 12.8331 22.7234 12.7604C22.6568 12.6878 22.6054 12.6025 22.5722 12.5097C22.539 12.4169 22.5246 12.3184 22.53 12.22L22.73 7.56501C22.7273 7.5535 22.7273 7.54151 22.73 7.53001C22.7276 7.50507 22.7276 7.47995 22.73 7.45501V7.38001V7.35001C22.7278 7.34012 22.7278 7.32989 22.73 7.32001C22.743 7.28904 22.758 7.25897 22.775 7.23001C22.7955 7.19633 22.8189 7.16454 22.845 7.13501C22.89 7.08287 22.9422 7.03742 23 7.00001C23.0333 6.97708 23.0684 6.95701 23.105 6.94001L23.205 6.90501H23.235H23.32H23.5L27.895 7.49001C27.994 7.49386 28.0912 7.51727 28.181 7.55888C28.2709 7.6005 28.3516 7.6595 28.4186 7.73249C28.4855 7.80547 28.5373 7.89099 28.5711 7.9841C28.6048 8.07722 28.6197 8.17609 28.615 8.27501Z" fill="#DB2A70" />
                </svg> */}
        <svg className={`filters__reset-btn-icon ${isReseting ? 'filters__reset-btn-icon_active' : ''}`} width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.6149 4.27501C25.5918 4.45485 25.5039 4.62008 25.3676 4.73974C25.2314 4.8594 25.0562 4.92527 24.8749 4.92501H24.7749L22.4499 4.62001C24.1187 6.75966 25.013 9.40173 24.987 12.1151C24.961 14.8284 24.0161 17.4529 22.3066 19.5601C20.5971 21.6674 18.2239 23.133 15.5742 23.7179C12.9245 24.3028 10.1548 23.9724 7.71704 22.7806C5.27929 21.5888 3.31743 19.606 2.1516 17.1558C0.98576 14.7055 0.68478 11.9325 1.29777 9.28912C1.91076 6.64579 3.40153 4.28825 5.52682 2.60121C7.6521 0.914161 10.2864 -0.00278181 12.9999 6.33969e-06C13.1988 6.33969e-06 13.3896 0.0790239 13.5302 0.219676C13.6709 0.360328 13.7499 0.551094 13.7499 0.750006C13.7499 0.948919 13.6709 1.13968 13.5302 1.28034C13.3896 1.42099 13.1988 1.50001 12.9999 1.50001C10.6173 1.49904 8.30513 2.30846 6.44333 3.7953C4.58154 5.28213 3.28078 7.35797 2.75474 9.68181C2.2287 12.0057 2.50866 14.4393 3.54863 16.583C4.58859 18.7267 6.32672 20.453 8.4775 21.4782C10.6283 22.5035 13.0638 22.7667 15.384 22.2248C17.7042 21.6828 19.771 20.3679 21.2451 18.4959C22.7191 16.624 23.5127 14.3064 23.4954 11.9238C23.4781 9.5412 22.651 7.23535 21.1499 5.38501L21.0249 8.28501C21.0159 8.47693 20.9336 8.65809 20.795 8.79113C20.6564 8.92417 20.472 8.99894 20.2799 9.00001H20.2449C20.1464 8.99682 20.0495 8.97399 19.9599 8.93285C19.8703 8.89171 19.7899 8.83309 19.7233 8.76043C19.6567 8.68777 19.6053 8.60254 19.5721 8.50973C19.5388 8.41693 19.5245 8.31843 19.5299 8.22001L19.7299 3.56501C19.7271 3.5535 19.7271 3.54151 19.7299 3.53001C19.7274 3.50507 19.7274 3.47995 19.7299 3.45501V3.38001V3.35001C19.7277 3.34012 19.7277 3.32989 19.7299 3.32001C19.7429 3.28904 19.7579 3.25897 19.7749 3.23001C19.7749 3.23001 19.7749 3.23001 19.7749 3.23001C19.7954 3.19633 19.8188 3.16454 19.8449 3.13501V3.13501C19.8899 3.08287 19.9421 3.03742 19.9999 3.00001V3.00001C20.0331 2.97708 20.0683 2.95701 20.1049 2.94001V2.94001L20.2049 2.90501H20.2349H20.3199H20.4999L24.8949 3.49001C24.9938 3.49386 25.0911 3.51727 25.1809 3.55888C25.2708 3.6005 25.3515 3.6595 25.4185 3.73249C25.4854 3.80547 25.5372 3.89099 25.5709 3.9841C25.6046 4.07722 25.6196 4.17609 25.6149 4.27501V4.27501Z" fill="#DB2A70" />
        </svg>

      </div>

    </div>
  );
}

export default Filters;
