import React from 'react'
import Header from '../Header/Header';
import './App.css';
import mainApi from '../../assets/api/MainApi';
import { Switch, Route, Redirect } from 'react-router-dom';
import CityPopup from '../CityPopup/CityPopup';
import Footer from '../Footer/Footer';
import Category from '../Category/Category';
// import AdminProducts from '../AdminProducts/AdminProducts';

import { products, categories, cities } from '../../utils/utils';
import FiltersPopup from '../FiltersPopup/FiltersPopup';
import CartPopup from '../CartPopup/CartPopup';
import CartPage from '../CartPage/CartPage';
import SubmitActionPopup from '../SubmitActionPopup/SubmitActionPopup';
import Requisites from '../Requisites/Requisites';
import Profile from '../Profile/Profile';
import Favourites from '../Favourites/Favourites';
import Refund from '../Refund/Refund';
import Login from '../Login/Login';
import Recovery from '../Recovery/Recovery';
import Register from '../Register/Register';
import ColorPopup from '../ColorPopup/ColorPopup';
// import Preloader from '../Preloader/Preloader';
import MainPreloader from '../MainPreloader/MainPreloader';
import Main from '../Main/Main';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import useScrollPosition from '../../utils/useScrollPosition';





function App() {
  // const scrollPosition = useScrollPosition();

  const [loggedIn, setLoggedIn] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState(undefined);

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isCityPopupOpen, setCityPopupOpen] = React.useState(false);

  const [isSubmitActionPopupOpen, setSubmitActionPopupOpen] = React.useState(false);
  const [isCartPopupOpen, setCartPopupOpen] = React.useState(false);
  const [isColorPopupOpen, setColorPopupOpen] = React.useState(false);

  const [allProducts,] = React.useState(products);
  const [allCategories,] = React.useState(categories);

  // const [allProducts, setAllProducts] = React.useState(products);
  // const [allCategories, setAllCategories] = React.useState(categories);

  const [cityValue, setCityValue] = React.useState('Тобольск');
  React.useEffect(() => {
    // mainApi.getBarcode(id)
    // mainApi.getCategories()
    //   .then((res) => {
    //     console.log(res.categories)
    //     setAllCategories(res.categories)
    //     mainApi.getProducts()
    //       .then((response) => {
    //         setAllProducts(response.products)

    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

  }, [])

  const history = useHistory()

  React.useEffect(() => {
    setLoggedIn(false)
    // mainApi.getUser()
    //   .then((res) => {
    //     console.log(res)

    //     setCurrentUser(res)
    //     if (!res.phone) {
    //       history.push(`/signup`)
    //       setLoggedIn(false)
    //     } else {
    //       setLoggedIn(true)
    //     }
    //   })
    //   .catch((err) => {
    //     setLoggedIn(false)
    //   })

  }, [])

  React.useEffect(() => {
    let city = localStorage.getItem('city')
    if (city) setCityValue(city)
  }, [isCityPopupOpen]);

  function handleResize() {
    setScreenWidth(window.innerWidth)
    window.removeEventListener('resize', handleResize);
  }
  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function handleCityPopupOpen() {
    setCityPopupOpen(true)
  }
  function handleCityPopupClose() {
    setCityPopupOpen(false)
  }

  // function handleFilterPopupClose() {
  //   setFilterPopupOpen(false)
  // }

  function handleColorPopupClose() {
    setColorPopupOpen(false)
  }

  function handleSubmitActionPopupClose() {
    setSubmitActionPopupOpen(false)
  }

  function handleSubmitActionPopupSubmit() {
    let cartArray = []
    setCart(cartArray)
    localStorage.setItem("cart", JSON.stringify(cartArray));
    setSubmitActionPopupOpen(false)
  }


  function handleCartPopupClose() {
    setCartPopupOpen(false)
  }

  const [filterProducts, setFilterProducts] = React.useState([]);
  const [subcategoryPreloaderVisible, setSubcategoryPreloaderVisible] = React.useState(false);
  function handlePreloaderVisible() {
    setSubcategoryPreloaderVisible(true)
    setTimeout(() => {
      setSubcategoryPreloaderVisible(false)
      // window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1000);
  }

  const [filters, setFilters] = React.useState({});
  const [filtersUpd, setFiltersUpd] = React.useState({});

  React.useEffect(() => {
    if (Object.keys(filtersUpd).length !== 0 && filterProducts.length > 0) {
      handlePreloaderVisible()
    }


  }, [filtersUpd, filterProducts]);

  React.useEffect(() => {

    if (filterProducts && filterProducts.length > 0) {
      let filters = {
        inStock: true,
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
      }
      filterProducts.forEach((item, i) => {
        if (i === 0) {
          filters.price.max = item.price
          filters.price.min = item.price
          filters.width.max = item.specifications.width
          filters.width.min = item.specifications.width
          filters.height.max = item.specifications.height
          filters.height.min = item.specifications.height
          filters.depth.max = item.specifications.depth
          filters.depth.min = item.specifications.depth
          filters.brands = [item.manufacturer]
        }
        if (filters.brands.filter((brand) => {
          if (brand.toLowerCase() === item.manufacturer.toLowerCase()) return true
          else return false
        }).length === 0) filters.brands = [...filters.brands, item.manufacturer]
        if (item.price > filters.price.max) filters.price.max = Math.floor(item.price)
        if (item.price < filters.price.min) filters.price.min = Math.floor(item.price)
        if (item.discount > 0 && item.price - (item.price / 100 * item.discount) < filters.price.min) filters.price.min = Math.floor(item.price - (item.price / 100 * item.discount))
        if (item.discount > 0 && item.price - (item.price / 100 * item.discount) > filters.price.max) filters.price.max = Math.floor(item.price - (item.price / 100 * item.discount))
        if (item.specifications.width > filters.width.max) filters.width.max = Math.floor(item.specifications.width)
        if (item.specifications.width < filters.width.min) filters.width.min = Math.floor(item.specifications.width)
        if (item.specifications.height > filters.height.max) filters.height.max = Math.floor(item.specifications.height)
        if (item.specifications.height < filters.height.min) filters.height.min = Math.floor(item.specifications.height)
        if (item.specifications.depth > filters.depth.max) filters.depth.max = Math.floor(item.specifications.depth)
        if (item.specifications.depth < filters.depth.min) filters.depth.min = Math.floor(item.specifications.depth)
      })
      setFilters(filters)

    } else setFilters({})

  }, [filterProducts]);

  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    let cartArray = JSON.parse(localStorage.getItem("cart"));
    if (!cartArray || cartArray === []) {
      cartArray = []
      setCart(cartArray)
      localStorage.setItem("cart", JSON.stringify(cartArray));
    } else {
      setCart(cartArray)
    }

  }, []);

  const [allCartProductsCount, setCartAllProductsCount] = React.useState({
    count: 0,
    totalPrice: 0
  });

  React.useEffect(() => {
    let counter = {
      count: 0,
      totalPrice: 0
    }
    if (cart) {
      cart.forEach(item => {
        counter.count = counter.count + item.count
        if (item.discount && item.discount > 0) {
          counter.totalPrice = counter.totalPrice + ((item.price - (item.price / 100 * item.discount)) * item.count)
        } else {
          counter.totalPrice = counter.totalPrice + (item.price * item.count)
        }


      });
    }
    setCartAllProductsCount(counter)

  }, [cart]);

  // React.useEffect(() => {
  //   console.log(cart)

  // }, [cart]);

  function handleToCartBtn(item) {

    let cartArray = JSON.parse(localStorage.getItem("cart"));
    item.count = 1
    if (!cartArray || cartArray === []) {
      cartArray = [item]
      // let cartJson = JSON.stringify(cartArray)
      // console.log(cartJson)
      setCart(cartArray)
      localStorage.setItem("cart", JSON.stringify(cartArray));
    }
    else if (cartArray && cartArray.filter((cart_item) => {
      if (cart_item._id === item._id) return true
      else return false
    }).length > 0) {
      cartArray = cartArray.filter((cart_item) => {
        if (cart_item._id === item._id) return false
        else return true
      })
      setCart(cartArray)
      localStorage.setItem("cart", JSON.stringify(cartArray));
    } else {
      cartArray = [...cartArray, item]
      setCart(cartArray)
      localStorage.setItem("cart", JSON.stringify(cartArray));
    }

  }


  const [favouritesProducts, setFavouritesProducts] = React.useState([]);

  React.useEffect(() => {
    let liked = JSON.parse(localStorage.getItem("favourites"));
    if (!liked || liked === []) {
      liked = []
      setFavouritesProducts(liked)
      localStorage.setItem("favourites", JSON.stringify(liked));
    } else {
      setFavouritesProducts(liked)
    }

  }, []);

  function handleLikeBtn(item) {

    let liked = JSON.parse(localStorage.getItem("favourites"));
    if (!liked || liked === []) {
      liked = [item]
      // let cartJson = JSON.stringify(cartArray)
      // console.log(cartJson)
      setFavouritesProducts(liked)
      localStorage.setItem("favourites", JSON.stringify(liked));
    }
    else if (liked && liked.filter((liked_item) => {
      if (liked_item._id === item._id) return true
      else return false
    }).length > 0) {
      liked = liked.filter((liked_item) => {
        if (liked_item._id === item._id) return false
        else return true
      })
      setFavouritesProducts(liked)
      localStorage.setItem("favourites", JSON.stringify(liked));
    } else {
      liked = [...liked, item]
      setFavouritesProducts(liked)
      localStorage.setItem("favourites", JSON.stringify(liked));
    }

  }


  const [selectedColor, setSelectedColor] = React.useState('');
  const [availibleColors, setAvailibleColors] = React.useState([]);

  function handleColorPopupOpen({ product, active_color }) {
    console.log(product, active_color)
    let colors = [{ name: product.specifications.colour, link: `/categories/${product.category.link}/${product.sub_category.link}/${product.link}` }]
    if (product.variations) {
      product.variations.forEach((item) => {
        colors = [...colors, { name: item.product_id.specifications.colour, link: `/categories/${product.category.link}/${product.sub_category.link}/${product.link}/${item.product_id.specifications.colour}` }]
      })
    }
    console.log(colors)


    setSelectedColor(active_color)
    setAvailibleColors(colors)
    setColorPopupOpen(true)
  }

  // console.log(scrollPosition)
  return (
    // ${isCartPopupOpen ? 'app-stop-scrol' : ''}
    <div className={`app `} >
      {loggedIn !== undefined ?
        <>
          <ColorPopup selectedColor={selectedColor} availibleColors={availibleColors} isColorPopupOpen={isColorPopupOpen} handleColorPopupClose={handleColorPopupClose} />
          <SubmitActionPopup handleSubmitActionPopupSubmit={handleSubmitActionPopupSubmit} isSubmitActionPopupOpen={isSubmitActionPopupOpen} handleSubmitActionPopupClose={handleSubmitActionPopupClose} />
          <CartPopup handleLikeBtn={handleLikeBtn} favouritesProducts={favouritesProducts} allCartProductsCount={allCartProductsCount} setCart={setCart} cart={cart} isCartPopupOpen={isCartPopupOpen} handleCartPopupClose={handleCartPopupClose} />

          <CityPopup isCityPopupOpen={isCityPopupOpen} handleCityPopupClose={handleCityPopupClose} cityValue={cityValue} setCityValue={setCityValue} cities={cities} />
          <Header currentUser={currentUser} loggedIn={loggedIn} favouritesProducts={favouritesProducts} allCartProductsCount={allCartProductsCount} categories={allCategories} screenWidth={screenWidth} handleCityPopupOpen={handleCityPopupOpen} cityValue={cityValue} products={allProducts} />
          <Switch>
            <Route exact path={`/`}>
              <Main />
            </Route>
            <Route path={`/categories/:category`}>
              <Category handleColorPopupOpen={handleColorPopupOpen} handleLikeBtn={handleLikeBtn} favouritesProducts={favouritesProducts} handlePreloaderVisible={handlePreloaderVisible} setCartPopupOpen={setCartPopupOpen} cart={cart} handleToCartBtn={handleToCartBtn} subcategoryPreloaderVisible={subcategoryPreloaderVisible} setFilterPopupOpen={undefined} filtersUpd={filtersUpd} setFiltersUpd={setFiltersUpd} filters={filters} setFilterProducts={setFilterProducts} filterProducts={filterProducts} products={allProducts} categories={allCategories} />
            </Route>
            <Route path={`/cart`}>
              <CartPage currentUser={currentUser} loggedIn={loggedIn} handleLikeBtn={handleLikeBtn} favouritesProducts={favouritesProducts} setSubmitActionPopupOpen={setSubmitActionPopupOpen} allCartProductsCount={allCartProductsCount} setCart={setCart} cart={cart} />
            </Route>
            <Route path={`/requisites`}>
              <Requisites />
            </Route>
            <Route path={`/refund`}>
              <Refund />
            </Route>
            <Route path={`/login/:from`}>
              <Login setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
            </Route>
            <Route path={`/login`}>
              <Login setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
            </Route>
            <Route path={`/recovery`}>
              <Recovery setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
            </Route>
            <Route path={`/signup`}>
              <Register setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} />
            </Route>
            <Route path={`/favourites`}>
              <Favourites handleLikeBtn={handleLikeBtn} favouritesProducts={favouritesProducts} setCartPopupOpen={setCartPopupOpen} cart={cart} handleToCartBtn={handleToCartBtn} />
            </Route>
            <Route path={`/profile/:page`}>
              {loggedIn ?
                <Profile currentUser={currentUser} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
                :
                <Redirect to='/login' />
              }

            </Route>
            <Route exact path={`/profile/`}>
              <Redirect to='/profile/account' />
            </Route>
            {/* <Route path={`/adm-products`}>
          <AdminProducts products={allProducts} />
        </Route> */}
          </Switch>
          <Footer />
        </>
        : <MainPreloader />}

    </div>
  );
}

export default App;
