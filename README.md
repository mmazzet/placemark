<h1 align="center">Welcome to Placemark 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.10-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D16-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Placemark: a Hapi/node application for managing Flea Markets as Placemarks. Create lists of flea markets you want to visit around the world and save information for each of them.

## Tools used
- node.js
- JavaScript
- Bulma
- Handlebars
- Hapi
- Joi
- Chai
- Mocha
- Cloudinary
- Mongo Cloud Atlas
- Swagger

## Deployment
- Glitch: https://placemark-a1-mmazzet.glitch.me/ 
- Render: https://placemark-a1-mmazzet.onrender.com

## Features
- Users can create an account, modify details and delete the account.
- Users can add and delete countries and view them in their dashboard. 
- Users can add and delete flea markets. For each flea market they can add the name, the description, latitude, longitude and category information.
- Users can update their profile and delete the account.

- Validation: Joi Schemas used for Sign Up, Log in, Add Country and Add Market
- Unit Tests: Mocha used for tests on user, country and market
- Storage: MongoDB and Studio 3T. Mongoose seeder for preloaded objects
- Image storage: Cloudinary 
- API documentation: HapiSwagger to document users, countries and markets endpoints
- API security: hapi authentication strategies JWT



## Prerequisites

- node >=16

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_