
class MainApi {
  constructor({ baseUrl }) {
    this._BASE_URL = baseUrl
  }

  getBarcode(product_id) {
    return fetch(`${this._BASE_URL}/products/get-barcode`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "product_id": product_id
      }
      )
    }).then(this._checkResponse)
  };

  getProducts() {
    return fetch(`${this._BASE_URL}/products/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      
    }).then(this._checkResponse)
  };
  getCategories() {
    return fetch(`${this._BASE_URL}/categories`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      
    }).then(this._checkResponse)
  };


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
  baseUrl: 'http://51.250.18.104/api'
  // baseUrl: 'http://localhost:3003'
});
export default mainApi
