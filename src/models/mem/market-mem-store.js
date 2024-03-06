import { v4 } from "uuid";

let markets = [];

export const marketMemStore = {
  async getAllMarkets() {
    return markets;
  },

  async addMarket(countryId, market) {
    market._id = v4();
    market.countryid = countryId;
    markets.push(market);
    return market;
  },

  async getMarketsByCountryId(id) {
    return markets.filter((market) => market.countryid === id);
  },

  async getMarketById(id) {
    let foundMarket = markets.find((market) => market._id === id);
    if (!foundMarket) {
      foundMarket = null;
    }
    return foundMarket;
  },

  async getCountryMarkets(countryId) {
    let foundMarkets = markets.filter((market) => market.countryid === countryId);
    if (!foundMarkets) {
      foundMarkets = null;
    }
    return foundMarkets;
  },

  async deleteMarket(id) {
    const index = markets.findIndex((market) => market._id === id);
    if (index !== -1) markets.splice(index, 1);
  },

  async deleteAllMarkets() {
    markets = [];
  },

  async updateMarket(market, updatedMarket) {
    market.title = updatedMarket.title;
    market.description = updatedMarket.description;
    market.latitude = updatedMarket.latitude;
    market.longitude = updatedMarket.longitude;
  },
};