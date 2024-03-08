import Mongoose from "mongoose";

const { Schema } = Mongoose;

const marketSchema = new Schema({
  title: String,
  description: String,
  latitude: Number,
  longitude: Number,
  category: String,
  countryid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Market = Mongoose.model("Market", marketSchema);