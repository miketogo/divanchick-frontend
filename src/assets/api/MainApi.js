import { MAIN_URL } from "../utils/constants";

class MainApi {
  // constructor({ baseUrl }) {
  //   MAIN_URL = baseUrl;
  // }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      const statusCode = res.status;
      return res.json().then((res) => {
        return Promise.reject({
          statusCode: statusCode,
          message: res.msg,
          detail: res.detail,
        });
      });
    }
  }

  _checkResponseWithCookies({ res, func, params }) {
    if (res.ok) {
      return res.json();
    } else {
      const statusCode = res.status;
      return res.json().then((res) => {
        if (statusCode === 422 && res.detail === "Signature has expired") {
          console.log("ss");
          return mainApi
            .refreshJWT()
            .then((res) => {
              return func(params);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        } else {
          return Promise.reject({
            statusCode: statusCode,
            message: res.msg,
            detail: res.detail,
          });
        }
      });
    }
  }

  refreshJWT() {
    return fetch(`${MAIN_URL}/users/refresh-jwt`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }



  getExactCategory({ translit_name }) {
    let params = {
      translit_name: translit_name
    }

    return fetch(`${MAIN_URL}/categories/get-exact?` + new URLSearchParams(params), {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

    }).then(this._checkResponse);
  }

  getSubcategoriesByCategory({ category_translit_name, last_id, limit }) {
    let params = {}
    if (category_translit_name) params.category_translit_name = category_translit_name
    if (last_id) params.last_id = last_id
    if (limit) params.limit = limit

    return fetch(`${MAIN_URL}/sub-categories/get-all?` + new URLSearchParams(params), {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

    }).then(this._checkResponse);
  }


  getItemsBySubAndCategory({ data }) {
    let params = {}
    if (data) params.data = data

    return fetch(`${MAIN_URL}/items/get-all?` + new URLSearchParams(params), {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

    }).then(this._checkResponse);
  }

  getSubcategory({ category_translit_name, translit_name }) {
    let params = {}
    if (category_translit_name) params.category_translit_name = category_translit_name
    if (translit_name) params.translit_name = translit_name

    return fetch(`${MAIN_URL}/sub-categories/get-exact?` + new URLSearchParams(params), {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

    }).then(this._checkResponse);
  }

  getExactItem({ category_translit_name, sub_category_translit_name, _id }) {
    let params = {}
    if (category_translit_name) params.category_translit_name = category_translit_name
    if (sub_category_translit_name) params.sub_category_translit_name = sub_category_translit_name
    if (_id) params._id = _id

    return fetch(`${MAIN_URL}/items/get-exact?` + new URLSearchParams(params), {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

    }).then(this._checkResponse);
  }



  searchItems({ text, limit }) {
    let params = {}
    if (text) params.text = text
    if (limit) params.limit = limit

    return fetch(`${MAIN_URL}/search/items?` + new URLSearchParams(params), {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

    }).then(this._checkResponse);
  }




  getRandomSub() {
    return fetch(`${MAIN_URL}/sub-categories/get-random`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

    }).then(this._checkResponse);
  }

  register({ email, password, firstname, surname, phone_number }) {
    return fetch(`${MAIN_URL}/users/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "first_name": firstname,
        "last_name": surname,
        "phone": phone_number,
      }
      )
    }).then(this._checkResponse)
  };

  getUser() {
    return fetch(`${MAIN_URL}/users/get-me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

    }).then((res) => mainApi._checkResponseWithCookies({
      res: res,
      func: mainApi.getRandomSub,
      params: {}
    }))
  }

}


const mainApi = new MainApi({
  baseUrl: MAIN_URL,
});

export default mainApi;
