import { v4 } from "uuid";
import { marketMemStore } from "./market-mem-store.js";

let countries = [];

export const countryMemStore = {
  async getAllCountries() {
    return countries;
  },

  async addCountry(country) {
    country._id = v4();
    countries.push(country);
    return country;
  },

  async getCountryById(id) {
    const list = countries.find((country) => country._id === id);
    list.markets = await marketMemStore.getMarketsByCountryId(list._id);
    return list;
  },

  async getUserCountries(userid) {
    return countries.filter((country) => country.userid === userid);
  },

  async deleteCountryById(id) {
    const index = countries.findIndex((country) => country._id === id);
    countries.splice(index, 1);
  },

  async deleteAllCountries() {
    countries = [];
  },
};