
class MainApi {
  constructor({ baseUrl }) {
    this._BASE_URL = baseUrl
  }
  register({ email, password, firstname, surname, phone_number }) {
    return fetch(`${this._BASE_URL}/users/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "firstname": firstname,
        "surname": surname,
        "phone_number": phone_number,
      }
      )
    }).then(this._checkResponse)
  };

  registerCheckCode({ token, code }) {
    return fetch(`${this._BASE_URL}/users/signup-code`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "code": code
      }
      )
    }).then(this._checkResponse)
  };

  registerGetNewCode({ token }) {
    return fetch(`${this._BASE_URL}/users/signup-new-code`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(this._checkResponse)
  };


  checkJwt({ token }) {
    return fetch(`${this._BASE_URL}/users/check-jwt`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(this._checkResponse)
  };

  login({ password, phone_number }) {
    return fetch(`${this._BASE_URL}/users/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "phone_number": phone_number,
      }
      )
    }).then(this._checkResponse)
  };

  recoveryStep1({ phone_number }) {
    return fetch(`${this._BASE_URL}/users/recovery-pass-stage-1`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "phone_number": phone_number,
      }
      )
    }).then(this._checkResponse)
  };

  recoveryCheckCode({ code, token }) {
    return fetch(`${this._BASE_URL}/users/recovery-code`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "code": code,
      }
      )
    }).then(this._checkResponse)
  };

  recoverySendCodeAgian({ token }) {
    return fetch(`${this._BASE_URL}/users/recovery-new-code`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(this._checkResponse)
  };


  recoverySetPass({ password, token }) {
    return fetch(`${this._BASE_URL}/users/recovery-set-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "password": password,
      }
      )
    }).then(this._checkResponse)
  };

  // getBarcode(product_id) {
  //   return fetch(`${this._BASE_URL}/products/get-barcode`, {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       "product_id": product_id
  //     }
  //     )
  //   }).then(this._checkResponse)
  // };

  // getProducts() {
  //   return fetch(`${this._BASE_URL}/products/all`, {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },

  //   }).then(this._checkResponse)
  // };
  // getCategories() {
  //   return fetch(`${this._BASE_URL}/categories`, {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },

  //   }).then(this._checkResponse)
  // };


  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    else {
      var statusCode = res.status
      return res.json().then((res) => {
        return Promise.reject({
          statusCode: statusCode,
          message: res.message
        })
      })
    }
    ;
  }

}

const mainApi = new MainApi({
  baseUrl: 'http://62.84.114.207/api'
  // baseUrl: 'http://localhost:3003'
});
export default mainApi
