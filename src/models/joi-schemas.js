import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// export const UserSpec = Joi.object()
//   .keys({
//     firstName: Joi.string().example("Homer").required(),
//     lastName: Joi.string().example("Simpson").required(),
//     email: Joi.string().email().example("homer@simpson.com").required(),
//     password: Joi.string().example("secret").required(),
//     _id: IdSpec,
//     __v: Joi.number(),
//   })
//   .label("UserDetails");

// export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");
  
export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const MarketSpec = Joi.object()
  .keys({
    title: Joi.string().example("East Market Milano").required(),
    description: Joi.string().example("Renowned market held in Milan").required(),
    latitude: Joi.number().allow("").optional().example("45.4551"),
    longitude: Joi.number().allow("").optional().example("9.1805"),
    countryid: IdSpec,
  })
  .label("Market");

export const MarketSpecPlus = MarketSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("MarketPlus");

export const MarketArraySpec = Joi.array().items(MarketSpecPlus).label("MarketArray");

export const CountrySpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Milan Markets"),
    userid: IdSpec,
    markets: MarketArraySpec,
  })
  .label("Country");

export const CountrySpecPlus = CountrySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CountryPlus");

export const CountryArraySpec = Joi.array().items(CountrySpecPlus).label("CountryArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
