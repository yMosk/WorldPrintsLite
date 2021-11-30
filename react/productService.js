import axios from "axios";
import debug from "sabio-debug";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";

const _logger = debug.extend("productService");

var productServices = {
  endpoint: `${API_HOST_PREFIX}/api/product`,
  headers: { "Content-Type": "application/json" },
};

const search = (pageIndex, pageSize, query) => {
  _logger("search is firing");
  const settings = {
    method: "GET",
    url: `${productServices.endpoint}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    headers: productServices.headers,
    withCredentials: true,
    crossdomain: true,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

const paginate = (pageIndex, pageSize) => {
  _logger("paginate is firing");
  const settings = {
    method: "GET",
    url: `${productServices.endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    headers: productServices.headers,
    withCredentials: true,
    crossdomain: true,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

const add = (payload) => {
  _logger("add is firing");
  const settings = {
    method: "POST",
    url: productServices.endpoint,
    headers: productServices.headers,
    data: payload,
    withCredentials: true,
    crossdomain: true,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

const update = (payload) => {
  _logger("update is firing");
  const settings = {
    method: "PUT",
    url: `${productServices.endpoint}/${payload.id}`,
    headers: productServices.headers,
    data: payload,
    withCredentials: true,
    crossdomain: true,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

const remove = (id) => {
  _logger("delete is firing");
  const settings = {
    method: "DELETE",
    url: `${productServices.endpoint}/${id}`,
    headers: productServices.headers,
    withCredentials: true,
    crossdomain: true,
  };
  return axios(settings)
    .then(function () {
      return id;
    })
    .catch(onGlobalError);
};

export { search, paginate, add, update, remove };
