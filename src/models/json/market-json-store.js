import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const marketJsonStore = {
  async getAllMarkets() {
    await db.read();
    return db.data.markets;
  },

  async addMarket(countryId, market) {
    await db.read();
    market._id = v4();
    market.countryid = countryId;
    db.data.markets.push(market);
    await db.write();
    return market;
  },

  async getMarketsByCountryId(id) {
    await db.read();
    let foundMarkets = db.data.markets.filter((market) => market.countryid === id);
    if (!foundMarkets) {
      foundMarkets = null;
    }
    return foundMarkets;
  },

  async getMarketById(id) {
    await db.read();
    let foundMarket = db.data.markets.find((market) => market._id === id);
    if (!foundMarket) {
      foundMarket = null;
    }
    return foundMarket;
  },

  async getCountryMarkets(countryId) {
    await db.read();
    let foundMarkets = markets.filter((market) => market.countryid === countryId);
    if (!foundMarkets) {
      foundMarkets = null;
    }
    return foundMarkets;
  },

  async deleteMarket(id) {
    await db.read();
    const index = db.data.markets.findIndex((market) => market._id === id);
    if (index !== -1) db.data.markets.splice(index, 1);
    await db.write();
  },

  async deleteAllMarkets() {
    db.data.markets = [];
    await db.write();
  },

  async updateMarket(market, updatedMarket) {
    market.title = updatedMarket.title;
    market.description = updatedMarket.description;
    market.latitude = updatedMarket.latitude;
    market.longitude = updatedMarket.longitude;
    market.category = updatedMarket.category;
    await db.write();
  },
};