import { MarketSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const marketController = {
  index: {
    handler: async function (request, h) {
      const country = await db.countryStore.getCountryById(request.params.id);
      const market = await db.marketStore.getMarketById(request.params.marketid);
      const viewData = {
        title: "Edit Market",
        country: country,
        market: market,
      };
      return h.view("update-market-view", viewData);
    },
  },

  update: {
    validate: {
      payload: MarketSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("market-view", { title: "Edit market error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const market = await db.marketStore.getMarketById(request.params.marketid);
      const newMarket = {
        title: request.payload.title,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        category: request.payload.category,
      };
      await db.marketStore.updateMarket(market, newMarket);
      return h.redirect(`/country/${request.params.id}`);
    },
  },
};