import React from 'react'
import { Link } from 'react-router-dom';

import './SelectCategory.css';





function SelectCategory(props) {
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


  return (

    <div ref={ref} className={`select-category ${props.isSelectCategoryOpened ? 'select-category_active' : ''}`}>

      <div className='select-category_pc'>
        <div className='select-category__categories'>
          {props.categories && props.categories.map((category, i) => (
            <p onClick={() => { props.setSelectedCategory(category) }} className={`select-category__category ${props.selectedCategory.name === category.name ? 'select-category__category_active' : ''}`} key={`select-category__category${i}`}>{category.name}</p>
          ))}
        </div>
        <div className='select-category__sub-categories'>

          {props.selectedCategory && props.selectedCategory.sub_catigories ? props.selectedCategory.sub_catigories.map((sub_category, i) => (
            <Link onClick={() => {
              props.handleSelectCategoryClose()
              setTimeout(() => {
                setCategoryIndexes({
                  categoryIndex: 0,
                  subCategoryIndex: 0,
                })
                props.setSelectedCategory({})
              }, 100);
            }} onMouseEnter={() => { setSubCategoryHoverd(sub_category.sub_category_id) }} to={`/categories/${props.selectedCategory.link}/${sub_category.sub_category_id.link}`} className='select-category__sub-category' key={`select-category__sub-category${i}`}>{sub_category.sub_category_id.name}</Link>
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
            }} to={`/categories/${props.selectedCategory.link}/${subCategoryHoverd && subCategoryHoverd.link}`} className="select-category__preview">
              <p className="select-category__preview-name">{subCategoryHoverd && subCategoryHoverd.name}</p>
              <div className="select-category__preview-gradient"></div>
              <img className="select-category__preview-img" src={subCategoryHoverd && subCategoryHoverd.photo} alt={subCategoryHoverd && subCategoryHoverd.name} />
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
            }} to={`/categories/${props.selectedCategory.link}/${props.selectedCategory.sub_catigories && props.selectedCategory.sub_catigories[0].sub_category_id.link}`} className="select-category__preview">
              <p className="select-category__preview-name">{props.selectedCategory && props.selectedCategory.sub_catigories && props.selectedCategory.sub_catigories[0].sub_category_id.name}</p>
              <div className="select-category__preview-gradient"></div>
              <img className="select-category__preview-img" src={props.selectedCategory && props.selectedCategory.sub_catigories && props.selectedCategory.sub_catigories[0].sub_category_id.photo} alt={props.selectedCategory && props.selectedCategory.sub_catigories && props.selectedCategory.sub_catigories[0].sub_category_id.name} />
            </Link>
          :
          props.categories && props.categories[categoryIndexes.categoryIndex].sub_catigories && props.categories[categoryIndexes.categoryIndex].sub_catigories[categoryIndexes.subCategoryIndex] &&
          <Link onClick={() => {
            props.handleSelectCategoryClose()
            setTimeout(() => {
              setCategoryIndexes({
                categoryIndex: 0,
                subCategoryIndex: 0,
              })
              props.setSelectedCategory({})
            }, 100);
          }} to={`/categories/${props.categories[categoryIndexes.categoryIndex].link}/${props.categories[categoryIndexes.categoryIndex].sub_catigories && props.categories[categoryIndexes.categoryIndex].sub_catigories[categoryIndexes.subCategoryIndex].sub_category_id.link}`} className="select-category__preview">
            <p className="select-category__preview-name">{props.categories[categoryIndexes.categoryIndex] && props.categories[categoryIndexes.categoryIndex].sub_catigories && props.categories[categoryIndexes.categoryIndex].sub_catigories[categoryIndexes.subCategoryIndex].sub_category_id.name}</p>
            <div className="select-category__preview-gradient"></div>
            <img className="select-category__preview-img" src={props.categories[categoryIndexes.categoryIndex] && props.categories[categoryIndexes.categoryIndex].sub_catigories && props.categories[categoryIndexes.categoryIndex].sub_catigories[categoryIndexes.subCategoryIndex].sub_category_id.photo} alt={props.categories[categoryIndexes.categoryIndex] && props.categories[categoryIndexes.categoryIndex].sub_catigories && props.categories[categoryIndexes.categoryIndex].sub_catigories[categoryIndexes.subCategoryIndex].sub_category_id.name} />
          </Link>
        }


      </div>

      {/* MOBILE */}
      <div className='select-category_mobile'>
        <div className='select-category_container'>
          {props.selectedCategory && props.selectedCategory.sub_catigories ? <></> : <div className='select-category__categories'>
            {props.categories && props.categories.map((category, i) => (
              <p onClick={() => { props.setSelectedCategory(category) }} className={`select-category__category ${props.selectedCategory.name === category.name ? 'select-category__category_active' : ''}`} key={`select-category__category${i}`}>{category.name}</p>
            ))}
          </div>}
          {props.selectedCategory && props.selectedCategory.sub_catigories ?
            <div className='select-category__sub-categories'>

              {props.selectedCategory && props.selectedCategory.sub_catigories ? props.selectedCategory.sub_catigories.map((sub_category, i) => (
                <Link onClick={() => {
                  props.handleSelectCategoryClose()
                  setTimeout(() => {
                    setCategoryIndexes({
                      categoryIndex: 0,
                      subCategoryIndex: 0,
                    })
                    props.setSelectedCategory({})
                  }, 100);
                }} onMouseEnter={() => { setSubCategoryHoverd(sub_category.sub_category_id) }} to={`/categories/${props.selectedCategory.link}/${sub_category.sub_category_id.link}`} className='select-category__sub-category' key={`select-category__sub-category${i}`}>{sub_category.sub_category_id.name}</Link>
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
              }} to={`/categories/${props.selectedCategory.link}/${subCategoryHoverd && subCategoryHoverd.link}`} className="select-category__preview">
                <p className="select-category__preview-name">{subCategoryHoverd && subCategoryHoverd.name}</p>
                <div className="select-category__preview-gradient"></div>
                <img className="select-category__preview-img" src={subCategoryHoverd && subCategoryHoverd.photo} alt={subCategoryHoverd && subCategoryHoverd.name} />
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
              }} to={`/categories/${props.selectedCategory.link}/${props.selectedCategory.sub_catigories && props.selectedCategory.sub_catigories[0].sub_category_id.link}`} className="select-category__preview">
                <p className="select-category__preview-name">{props.selectedCategory && props.selectedCategory.sub_catigories && props.selectedCategory.sub_catigories[0].sub_category_id.name}</p>
                <div className="select-category__preview-gradient"></div>
                <img className="select-category__preview-img" src={props.selectedCategory && props.selectedCategory.sub_catigories && props.selectedCategory.sub_catigories[0].sub_category_id.photo} alt={props.selectedCategory && props.selectedCategory.sub_catigories && props.selectedCategory.sub_catigories[0].sub_category_id.name} />
              </Link>
            :
            props.categories && props.categories[categoryIndexes.categoryIndex].sub_catigories && props.categories[categoryIndexes.categoryIndex].sub_catigories[categoryIndexes.subCategoryIndex] &&
            <Link onClick={() => {
              props.handleSelectCategoryClose()
              setTimeout(() => {
                setCategoryIndexes({
                  categoryIndex: 0,
                  subCategoryIndex: 0,
                })
                props.setSelectedCategory({})
              }, 100);
            }} to={`/categories/${props.categories[categoryIndexes.categoryIndex].link}/${props.categories[categoryIndexes.categoryIndex].sub_catigories && props.categories[categoryIndexes.categoryIndex].sub_catigories[categoryIndexes.subCategoryIndex].sub_category_id.link}`} className="select-category__preview">
              <p className="select-category__preview-name">{props.categories[categoryIndexes.categoryIndex] && props.categories[categoryIndexes.categoryIndex].sub_catigories && props.categories[categoryIndexes.categoryIndex].sub_catigories[categoryIndexes.subCategoryIndex].sub_category_id.name}</p>
              <div className="select-category__preview-gradient"></div>
              <img className="select-category__preview-img" src={props.categories[categoryIndexes.categoryIndex] && props.categories[categoryIndexes.categoryIndex].sub_catigories && props.categories[categoryIndexes.categoryIndex].sub_catigories[categoryIndexes.subCategoryIndex].sub_category_id.photo} alt={props.categories[categoryIndexes.categoryIndex] && props.categories[categoryIndexes.categoryIndex].sub_catigories && props.categories[categoryIndexes.categoryIndex].sub_catigories[categoryIndexes.subCategoryIndex].sub_category_id.name} />
            </Link>
          }

          <svg onClick={() => {
            if (props.selectedCategory && props.selectedCategory.sub_catigories) {
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
            {props.selectedCategory && props.selectedCategory.sub_catigories ?
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
