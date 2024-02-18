import { v4 } from "uuid";
import { db } from "./store-utils.js";
// import { trackJsonStore } from "./track-json-store.js";

export const countryJsonStore = {
  async getAllCountries() {
    await db.read();
    return db.data.countries;
  },

  async addCountry(country) {
    await db.read();
    country._id = v4();
    db.data.countries.push(country);
    await db.write();
    return country;
  },

  async getCountryById(id) {
    await db.read();
    const list = db.data.countries.find((country) => country._id === id);
    // list.tracks = await trackJsonStore.getTracksByPlaylistId(list._id);
    return list;
  },

  async getUserCountries(userid) {
    await db.read();
    return db.data.countries.filter((country) => country.userid === userid);
  },

  async deleteCountryById(id) {
    await db.read();
    const index = db.data.countries.findIndex((country) => country._id === id);
    db.data.countries.splice(index, 1);
    await db.write();
  },

  async deleteAllCountries() {
    db.data.countries = [];
    await db.write();
  },
};