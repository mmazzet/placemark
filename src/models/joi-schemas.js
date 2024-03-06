import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const MarketSpec = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  latitude: Joi.number().allow("").optional(),
  longitude: Joi.number().allow("").optional(),
}; 

export const CountrySpec = {
  title: Joi.string().required(),
};