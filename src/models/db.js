// import { userMemStore } from "./mem/user-mem-store.js";
// import { countryMemStore } from "./mem/country-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { countryJsonStore } from "./json/country-json-store.js";
// import { trackJsonStore } from "./json/track-json-store.js";

export const db = {
  userStore: null,
  countryStore: null,

  init() {
    this.userStore = userJsonStore;
    this.countryStore = countryJsonStore;
  },
};