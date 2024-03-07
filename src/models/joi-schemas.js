import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const MarketSpec = {
  title: Joi.string().example("East Market Milano").required(),
  description: Joi.string().example("Renowned market held in Milan").required(),
  latitude: Joi.number().allow("").optional().example("45.4551"),
  longitude: Joi.number().allow("").optional().example("9.1805"),
  countryid: IdSpec,
  _id: IdSpec,
  __v: Joi.number(),
}; 

export const MarketArraySpec = Joi.array().items(MarketSpec).label("MarketArray");

export const CountrySpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Milan Markets"),
    userid: IdSpec,
    markets: MarketArraySpec,
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("Country");

  export const CountryArraySpec = Joi.array().items(CountrySpec).label("CountryArray");
