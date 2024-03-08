import { MarketSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

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
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        category: request.payload.category,
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

  uploadImage: {
    handler: async function (request, h) {
      try {
        const country = await db.countryStore.getCountryById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          country.img = url;
          await db.countryStore.updateCountry(country);
        }
        return h.redirect(`/country/${country._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/country/${country._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};