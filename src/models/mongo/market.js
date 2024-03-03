import Mongoose from "mongoose";

const { Schema } = Mongoose;

const marketSchema = new Schema({
  title: String,
  description: String,
  location: Number,
  countryid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Market = Mongoose.model("Market", marketSchema);