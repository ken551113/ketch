import utils from "./Utils";
import bodyProcess from "./bodyProcess";

class Fetch {
  constructor(config = {}) {
    const {
      cache = "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials = "same-origin", // include, same-origin, *omit
      headers = {},
      mode = "cors", // no-cors, cors, *same-origin
      redirect = "follow", // manual, *follow, error
      referrer = "no-referrer", // *client, no-referrer
      timeOut = 5000,
      BASE_URL = "",
      requestType = "JSON",
    } = config;

    this.fetchConfig = {
      cache,
      credentials,
      headers,
      mode,
      redirect,
      referrer,
    };

    this.config = {
      timeOut,
      BASE_URL,
      requestType,
    };
  }

  send({ url, params, method = "GET", headers }) {
    const { BASE_URL, timeOut } = this.config;
    const request = new Promise(async (resolve, reject) => {
      fetch(BASE_URL ? `${BASE_URL}/${url}` : url, {
        ...this.fetchConfig,
        headers,
        method,
        body: params,
      })
        .then((res) => {
          if (res.ok) return res.json();
          return reject({ status: res.status, message: res.statusText });
        })
        .then((data) => {
          return resolve(data);
        })
        .catch((err) => {
          return reject({ status: err.status, message: err.statusText });
        });
    });

    const time = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({ status: 408, message: "連線逾時" });
      }, timeOut);
    });
    return Promise.race([request, time]);
  }

  preSend({ url, params, headers, method }) {
    const { requestType } = this.config;
    const FetchConfig = {
      ...this.FetchConfig,
      method,
      headers: {
        ...bodyProcess[requestType].headers,
        ...headers,
      },
    };
    if (params) FetchConfig.body = bodyProcess[requestType].formatting(params);
    return this.send({
      url,
      FetchConfig,
    });
  }

  get({ url, query, headers }) {
    const key = query ? `${url}?${utils.queryStringify(query)}` : url;
    return this.preSend({ url: key, headers, method: "GET" });
  }

  post({ url, query, params = {}, headers }) {
    const key = query ? `${url}?${utils.queryStringify(query)}` : url;
    return this.preSend({
      url: key,
      params,
      headers,
      method: "POST",
    });
  }
}

export default Fetch;
