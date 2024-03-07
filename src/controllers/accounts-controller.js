import { UserSpec, UserCredentialsSpec, } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Flea Markets" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Flea Markets" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Flea Markets" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },

  showAccountDetails: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "Account Details",
        user: user,
      };
      return h.view("update-account-view", viewData);
    },
  },

  updateAccountDetails: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("update-account-view", { title: "Error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const updatedUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };
      try {
        await db.userStore.updateUser(loggedInUser._id, updatedUser);
      } catch (error) {
        console.log(error);
      }
      return h.view("dashboard-view");
    },
  },

  deleteAccount: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let userCountries = [];
      userCountries = await db.countryStore.getUserCountries(loggedInUser._id);
      for (let i = 0; i < userCountries.length; i += 1) {
        let userMarkets = [];
        // eslint-disable-next-line no-await-in-loop
        userMarkets = await db.marketStore.getMarketsByCountryId(userCountries[i]._id);
        for (let j = 0; j < userMarkets.length; j += 1) {
          // eslint-disable-next-line no-await-in-loop
          await db.marketStore.deleteMarket(userMarkets[j]._id);
        }
        // eslint-disable-next-line no-await-in-loop
        await db.countryStore.deleteCountryById(userCountries[i]._id);
      }
      await db.userStore.deleteUserById(loggedInUser._id);
      return h.redirect("/");
    },
  },
};

