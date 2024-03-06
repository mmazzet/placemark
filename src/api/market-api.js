import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const marketApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const markets = await db.marketStore.getAllMarkets();
        return markets;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const market = await db.marketStore.getMarketById(request.params.id);
        if (!market) {
          return Boom.notFound("No market with this id");
        }
        return market;
      } catch (err) {
        return Boom.serverUnavailable("No market with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const market = await db.marketStore.addMarket(request.params.id, request.payload);
        if (market) {
          return h.response(market).code(201);
        }
        return Boom.badImplementation("error creating market");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.marketStore.deleteAllMarkets();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const market = await db.marketStore.getMarketById(request.params.id);
        if (!market) {
          return Boom.notFound("No Market with this id");
        }
        await db.marketStore.deleteMarket(market._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Market with this id");
      }
    },
  },
};