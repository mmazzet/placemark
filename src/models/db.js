import { userMemStore } from "./mem/user-mem-store.js";
import { countryMemStore } from "./mem/country-mem-store.js";
import { marketMemStore } from "./mem/market-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { countryJsonStore } from "./json/country-json-store.js";
import { marketJsonStore } from "./json/market-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { countryMongoStore } from "./mongo/country-mongo-store.js";
import { marketMongoStore } from "./mongo/market-mongo-store.js";

export const db = {
  userStore: null,
  countryStore: null,
  marketStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.countryStore = countryJsonStore;
        this.marketStore = marketJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.countryStore = countryMongoStore;
        this.marketStore = marketMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.countryStore = countryMemStore;
        this.marketStore = marketMemStore;
    }
  },
};