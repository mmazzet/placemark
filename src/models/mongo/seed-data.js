export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  countries: {
    _model: "Country",
    country_1: {
      title: "Spain",
      userid: "->users.bart"
    },
    country_2: {
      title: "Italy",
      userid: "->users.marge"
    },
    country_3: {
      title: "France",
      userid: "->users.homer"
    },
    country_4: {
      title: "Portugal",
      userid: "->users.bart"
    },
    country_5: {
      title: "Germany",
      userid: "->users.marge"
    },
    country_6: {
      title: "Belgium",
      userid: "->users.homer"
    }
  },
  
  markets: {
    _model : "Market",
    market_1 : {
      title: "El Rastro",
      description: "Popular open-air flea market in Madrid",
      latitude: 40.408623,
      longitude: -3.707338,
      countryid: "->countries.country_1"
    },
    market_2 : {
      title: "Fiera di Sinigaglia",
      description: "The oldest flea market in Milan",
      latitude: 45.45033,
      longitude: 9.16827,
      countryid: "->countries.country_2"
    },
    market_3 : {
      title: "Les Puces de Saint-Ouen",
      description: "The largest of its kind in Paris",
      latitude: 48.901472,
      longitude: 2.343795,
      countryid: "->countries.country_3"
    },
    market_4 : {
      title: "Feira da Ladra",
      description: "Lisbon's most iconic market",
      latitude: 38.71539,
      longitude: -9.12593,
      countryid: "->countries.country_4"
    },
    market_5 : {
      title: "Arkonaplatz Flohmarkt",
      description: "One of the most historical flea markets in Berlin",
      latitude: 52.51667,
      longitude: 13.4,
      countryid: "->countries.country_5"
    },
    market_6 : {
      title: "Antiekmarkt Tongeren",
      description: "One of the largest weekly flea market in Belgium.",
      latitude: 50.78192324831175,
      longitude:  5.469787913493849,
      countryid: "->countries.country_6"
    },
  },
  
};