import { MarketSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const countryController = {
  index: {
    handler: async function (request, h) {
      const country = await db.countryStore.getCountryById(request.params.id);
      const viewData = {
        title: "Country",
        country: country,
      };
      return h.view("country-view", viewData);
    },
  },

  addMarket: {
    validate: {
      payload: MarketSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("country-view", { title: "Add market error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const country = await db.countryStore.getCountryById(request.params.id);
      const newMarket = {
        title: request.payload.title,
        description: request.payload.description,
        location: Number(request.payload.location),
      };
      await db.marketStore.addMarket(country._id, newMarket);
      return h.redirect(`/country/${country._id}`);
    },
  },

  deleteMarket: {
    handler: async function (request, h) {
      const country = await db.countryStore.getCountryById(request.params.id);
      await db.marketStore.deleteMarket(request.params.marketid);
      return h.redirect(`/country/${country._id}`);
    },
  },
};