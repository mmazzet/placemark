import { userApi } from "./api/user-api.js";
import { countryApi } from "./api/country-api.js";
import { marketApi } from "./api/market-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/countries", config: countryApi.create },
  { method: "DELETE", path: "/api/countries", config: countryApi.deleteAll },
  { method: "GET", path: "/api/countries", config: countryApi.find },
  { method: "GET", path: "/api/countries/{id}", config: countryApi.findOne },
  { method: "DELETE", path: "/api/countries/{id}", config: countryApi.deleteOne },

  { method: "GET", path: "/api/markets", config: marketApi.find },
  { method: "GET", path: "/api/markets/{id}", config: marketApi.findOne },
  { method: "POST", path: "/api/countries/{id}/markets", config: marketApi.create },
  { method: "DELETE", path: "/api/markets", config: marketApi.deleteAll },
  { method: "DELETE", path: "/api/markets/{id}", config: marketApi.deleteOne },
];