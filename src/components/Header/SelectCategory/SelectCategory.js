import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import mainApi from '../../../assets/api/MainApi';
import { MAIN_CATEGORIES, MAIN_URL } from '../../../assets/utils/constants';

import './SelectCategory.css';





function SelectCategory(props) {

  const [previewSub, setPreviewSub] = useState(undefined)


  const ref = React.useRef()
  const [categoryIndexes, setCategoryIndexes] = React.useState({
    categoryIndex: 0,
    subCategoryIndex: 0,
  });
  const [subCategoryHoverd, setSubCategoryHoverd] = React.useState({});
  React.useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (props.isSelectCategoryOpened && ref.current && !ref.current.contains(e.target)) {

        props.handleSelectCategoryClose()
        setTimeout(() => {
          setCategoryIndexes({
            categoryIndex: 0,
            subCategoryIndex: 0,
          })
          props.setSelectedCategory({})
        }, 100);
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [props, props.isSelectCategoryOpened])

  React.useEffect(() => {
    let filteredCategories = props.categories.filter((item) => {
      if (item.sub_catigories && item.sub_catigories.length > 0) return true
      else return false
    })
    console.log(filteredCategories)
    let randomCategoryIndex = Math.floor(Math.random() * filteredCategories.length)
    let randomSubCategoryIndex = Math.floor(Math.random() * filteredCategories[randomCategoryIndex].sub_catigories.length)
    console.log({
      categoryIndex: randomCategoryIndex,
      subCategoryIndex: randomSubCategoryIndex,
    })
    setCategoryIndexes({
      categoryIndex: randomCategoryIndex,
      subCategoryIndex: randomSubCategoryIndex,
    })
  }, [props.categories, props.isSelectCategoryOpened])

  React.useEffect(() => {
    setSubCategoryHoverd({})
  }, [props.selectedCategory])

  const [subCats, setSubCats] = useState([])

  function handleSelectCategoryClick(category) {
    console.log(category)
    mainApi.getSubcategoriesByCategory({ category_translit_name: category.translit_name, limit: 9 })
      .then((res) => {
        console.log(res.data)
        setSubCats(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (props.isSelectCategoryOpened) {
      mainApi.getRandomSub()
        .then((res) => {
          setPreviewSub(res)
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } else{
      setPreviewSub(undefined)
      setSubCats([])
    }

  }, [props.isSelectCategoryOpened])

  return (

    <div ref={ref} className={`select-category ${props.isSelectCategoryOpened ? 'select-category_active' : ''}`}>

      <div className='select-category_pc'>
        <div className='select-category__categories'>
          {MAIN_CATEGORIES.slice(0, 9).map((category, i) => (
            <p onClick={() => {
              props.setSelectedCategory(category)
              handleSelectCategoryClick(category)
            }} className={`select-category__category ${props.selectedCategory.name === category.name ? 'select-category__category_active' : ''}`} key={`select-category__category${i}`}>{category.name}</p>
          ))}
        </div>
        <div className='select-category__sub-categories'>

          {subCats && subCats.length > 0 ? subCats.map((sub_category, i) => (
            <Link onClick={() => {
              props.handleSelectCategoryClose()
              setTimeout(() => {
                setCategoryIndexes({
                  categoryIndex: 0,
                  subCategoryIndex: 0,
                })
                props.setSelectedCategory({})
              }, 100);
            }} onMouseEnter={() => { setSubCategoryHoverd(sub_category) }} to={`/categories/${props.selectedCategory.translit_name}/${sub_category.translit_name}`} className='select-category__sub-category' key={`select-category__sub-category${i}`}>{sub_category.name}</Link>
          )) : <p className='select-category__help-text'>Выберите категорию</p>}
        </div>
        {Object.keys(props.selectedCategory).length !== 0 ?
          Object.keys(subCategoryHoverd).length !== 0 ?
            <Link onClick={() => {
              props.handleSelectCategoryClose()
              setTimeout(() => {
                setCategoryIndexes({
                  categoryIndex: 0,
                  subCategoryIndex: 0,
                })
                props.setSelectedCategory({})
              }, 100);
            }} to={`/categories/${props.selectedCategory.translit_name}/${subCategoryHoverd && subCategoryHoverd.translit_name}`} className="select-category__preview">
              <p className="select-category__preview-name">{subCategoryHoverd && subCategoryHoverd.name}</p>
              <div className="select-category__preview-gradient"></div>
              <img className="select-category__preview-img" src={subCategoryHoverd && `${MAIN_URL}/get-file/${subCategoryHoverd.photo}`} alt={subCategoryHoverd && subCategoryHoverd.name} key={subCategoryHoverd && subCategoryHoverd._id} />
            </Link>
            :

            <Link onClick={() => {
              props.handleSelectCategoryClose()
              setTimeout(() => {
                setCategoryIndexes({
                  categoryIndex: 0,
                  subCategoryIndex: 0,
                })
                props.setSelectedCategory({})
              }, 100);
            }} to={`/categories/${subCats && subCats.length > 0 ? subCats[0].category.translit_name : ''}/${subCats && subCats.length > 0 ? subCats[0].translit_name : ''}`} className="select-category__preview">
              <p className="select-category__preview-name">{subCats && subCats.length > 0 ? subCats[0].name : ''}</p>
              <div className="select-category__preview-gradient"></div>
              <img className="select-category__preview-img" src={subCats ? `${MAIN_URL}/get-file/${subCats && subCats.length > 0 ? subCats[0].photo : ''}` : null} alt={subCats && subCats.length > 0 ? subCats[0].name : ''} key={subCats && subCats.length > 0 ? subCats[0]._id : ''} />
            </Link>
          :
          previewSub &&
          <Link onClick={() => {
            props.handleSelectCategoryClose()
            setTimeout(() => {
              setCategoryIndexes({
                categoryIndex: 0,
                subCategoryIndex: 0,
              })
              props.setSelectedCategory({})
            }, 100);
          }} to={`/categories/${previewSub.category.translit_name}/${previewSub.translit_name}`} className="select-category__preview" key={previewSub && previewSub._id}>
            <p className="select-category__preview-name">{previewSub.name}</p>
            <div className="select-category__preview-gradient"></div>
            <img className="select-category__preview-img" src={previewSub ? `${MAIN_URL}/get-file/${previewSub.photo}` : null} alt={previewSub ? previewSub.name : ''} />
          </Link>
        }


      </div>

      {/* MOBILE */}
      <div className='select-category_mobile'>
        <div className='select-category_container'>
          {Object.keys(props.selectedCategory).length !== 0 && subCats ? <></> : <div className='select-category__categories'>
            {MAIN_CATEGORIES.slice(0, 9).map((category, i) => (
              <p onClick={() => {
                handleSelectCategoryClick(category)
                props.setSelectedCategory(category)
              }} className={`select-category__category ${props.selectedCategory.name === category.name ? 'select-category__category_active' : ''}`} key={`select-category__category${i}`}>{category.name}</p>
            ))}
          </div>}
          {Object.keys(props.selectedCategory).length !== 0 && subCats ?
            <div className='select-category__sub-categories'>

              {subCats && subCats.length > 0 ? subCats.map((sub_category, i) => (
                <Link onClick={() => {
                  props.handleSelectCategoryClose()
                  setTimeout(() => {
                    setCategoryIndexes({
                      categoryIndex: 0,
                      subCategoryIndex: 0,
                    })
                    props.setSelectedCategory({})
                  }, 100);
                }} onMouseEnter={() => { setSubCategoryHoverd(sub_category) }} to={`/categories/${props.selectedCategory.translit_name}/${sub_category.translit_name}`} className='select-category__sub-category' key={`select-category__sub-category${i}`}>{sub_category.name}</Link>
              )) : <p className='select-category__help-text'>Выберите категорию</p>}
            </div> : <></>}
          {Object.keys(props.selectedCategory).length !== 0 ?
            Object.keys(subCategoryHoverd).length !== 0 ?
              <Link onClick={() => {
                props.handleSelectCategoryClose()
                setTimeout(() => {
                  setCategoryIndexes({
                    categoryIndex: 0,
                    subCategoryIndex: 0,
                  })
                  props.setSelectedCategory({})
                }, 100);
              }} to={`/categories/${props.selectedCategory.translit_name}/${subCategoryHoverd && subCategoryHoverd.translit_name}`} className="select-category__preview">
                <p className="select-category__preview-name">{subCategoryHoverd && subCategoryHoverd.name}</p>
                <div className="select-category__preview-gradient"></div>
                <img className="select-category__preview-img" src={subCategoryHoverd && `${MAIN_URL}/get-file/${subCategoryHoverd.photo}`} alt={subCategoryHoverd && subCategoryHoverd.name} key={subCategoryHoverd && subCategoryHoverd._id} />
              </Link>
              :

              <Link onClick={() => {
                props.handleSelectCategoryClose()
                setTimeout(() => {
                  setCategoryIndexes({
                    categoryIndex: 0,
                    subCategoryIndex: 0,
                  })
                  props.setSelectedCategory({})
                }, 100);
              }} to={`/categories/${subCats && subCats.length > 0 ? subCats[0].category.translit_name : ''}/${subCats && subCats.length > 0 ? subCats[0].translit_name : ''}`} className="select-category__preview">
                <p className="select-category__preview-name">{subCats && subCats.length > 0 ? subCats[0].name : ''}</p>
                <div className="select-category__preview-gradient"></div>
                <img className="select-category__preview-img" src={subCats ? `${MAIN_URL}/get-file/${subCats && subCats.length > 0 ? subCats[0].photo : ''}` : null} alt={subCats && subCats.length > 0 ? subCats[0].name : ''} key={subCats && subCats.length > 0 ? subCats[0]._id : ''} />
              </Link>
            :
            previewSub &&
            <Link onClick={() => {
              props.handleSelectCategoryClose()
              setTimeout(() => {
                setCategoryIndexes({
                  categoryIndex: 0,
                  subCategoryIndex: 0,
                })
                props.setSelectedCategory({})
              }, 100);
            }} to={`/categories/${previewSub.category.translit_name}/${previewSub.translit_name}`} className="select-category__preview" key={previewSub && previewSub._id}>
              <p className="select-category__preview-name">{previewSub.name}</p>
              <div className="select-category__preview-gradient"></div>
              <img className="select-category__preview-img" src={previewSub ? `${MAIN_URL}/get-file/${previewSub.photo}` : null} alt={previewSub ? previewSub.name : ''} />
            </Link>
          }

          <svg onClick={() => {
            if (Object.keys(props.selectedCategory).length !== 0) {
              console.log('dsd')
              console.log(props.selectedCategory)
              props.setSelectedCategory({})
            } else {
              props.handleSelectCategoryClose()
              setTimeout(() => {
                setCategoryIndexes({
                  categoryIndex: 0,
                  subCategoryIndex: 0,
                })
                props.setSelectedCategory({})
              }, 100);
            }

          }} className='select-category__close' width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            {props.selectedCategory ?
              <>
                <rect x="22.1416" y="3.55615" width="2.62835" height="14.4601" transform="rotate(45 22.1416 3.55615)" fill="#121212" />
                <rect x="24" y="22.1414" width="2.62835" height="14.4511" transform="rotate(135 24 22.1414)" fill="#121212" />
              </>
              :
              <>
                <rect x="22.1416" y="3.55615" width="2.62835" height="26.2835" transform="rotate(45 22.1416 3.55615)" fill="#121212" />
                <rect x="24" y="22.1414" width="2.62835" height="26.2835" transform="rotate(135 24 22.1414)" fill="#121212" />
              </>}

          </svg>

        </div>
        <div className={`select-category__background ${props.isSelectCategoryOpened ? 'select-category__background_active' : ''}`} onClick={() => {
          props.handleSelectCategoryClose()
          setTimeout(() => {
            setCategoryIndexes({
              categoryIndex: 0,
              subCategoryIndex: 0,
            })
            props.setSelectedCategory({})
          }, 100);
        }}>

        </div>
      </div>
    </div >

  );
}

export default SelectCategory;
