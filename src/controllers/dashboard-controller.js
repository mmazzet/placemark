import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const countries = await db.countryStore.getAllCountries();
      const viewData = {
        title: "Placemark Dashboard",
        countries: countries,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCountry: {
    handler: async function (request, h) {
      const newCountry = {
        title: request.payload.title,
      };
      await db.countryStore.addCountry(newCountry);
      return h.redirect("/dashboard");
    },
  },
};