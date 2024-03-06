import { Market } from "./market.js";
import { Country } from "./country.js";

export const marketMongoStore = {
  async getAllMarkets() {
    const markets = await Market.find().lean();
    return markets;
  },

  async addMarket(countryId, market) {
    market.countryid = countryId;
    const newMarket = new Market(market);
    const marketObj = await newMarket.save();
    return this.getMarketById(marketObj._id);
  },

  async getMarketsByCountryId(id) {
    const markets = await Market.find({ countryid: id }).lean();
    return markets;
  },

  async getMarketById(id) {
    if (id) {
      const market = await Market.findOne({ _id: id }).lean();
      return market;
    }
    return null;
  },

  async deleteMarket(id) {
    try {
      await Market.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllMarkets() {
    await Market.deleteMany({});
  },

  async updateMarket(market, updatedMarket) {
    const marketDoc = await Market.findOne({ _id: market._id });
    marketDoc.title = updatedMarket.title;
    marketDoc.description = updatedMarket.description;
    marketDoc.latitude = updatedMarket.latitude;
    marketDoc.longitude = updatedMarket.longitude;
    await marketDoc.save();
  },
};