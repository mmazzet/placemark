import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, MarketSpec, MarketSpecPlus, MarketArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const marketApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const markets = await db.marketStore.getAllMarkets();
        return markets;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: MarketArraySpec, failAction: validationError },
    description: "Get all marketApi",
    notes: "Returns all marketApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Find a Market",
    notes: "Returns a market",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: MarketSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Create a market",
    notes: "Returns the newly created market",
    validate: { payload: MarketSpec },
    response: { schema: MarketSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.marketStore.deleteAllMarkets();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all marketApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Delete a market",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};