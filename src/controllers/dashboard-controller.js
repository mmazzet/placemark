import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const countries = await db.countryStore.getUserCountries(loggedInUser._id);
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        countries: countries,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCountry: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCountry = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.countryStore.addCountry(newCountry);
      return h.redirect("/dashboard");
    },
  },
};