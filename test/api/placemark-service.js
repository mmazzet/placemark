import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async createCountry(country) {
    const res = await axios.post(`${this.placemarkUrl}/api/countries`, country);
    return res.data;
  },

  async deleteAllCountries() {
    const response = await axios.delete(`${this.placemarkUrl}/api/countries`);
    return response.data;
  },

  async deleteCountry(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/countries/${id}`);
    return response;
  },

  async getAllCountries() {
    const res = await axios.get(`${this.placemarkUrl}/api/countries`);
    return res.data;
  },

  async getCountry(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/countries/${id}`);
    return res.data;
  },

  async getAllMarkets() {
    const res = await axios.get(`${this.placemarkUrl}/api/markets`);
    return res.data;
  },

  async createMarket(id, market) {
    const res = await axios.post(`${this.placemarkUrl}/api/countries/${id}/markets`, market);
    return res.data;
  },

  async deleteAllMarkets() {
    const res = await axios.delete(`${this.placemarkUrl}/api/markets`);
    return res.data;
  },

  async getMarket(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/markets/${id}`);
    return res.data;
  },

  async deleteMarket(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/markets/${id}`);
    return res.data;
  },

};
