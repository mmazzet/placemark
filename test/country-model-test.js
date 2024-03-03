import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../src/models/db.js";
import { testCountries, portugal } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

EventEmitter.setMaxListeners(25);

suite("Country Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.countryStore.deleteAllCountries();
    for (let i = 0; i < testCountries.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCountries[i] = await db.countryStore.addCountry(testCountries[i]);
    }
  });

  test("create a country", async () => {
    const country = await db.countryStore.addCountry(portugal);
    assertSubset(portugal, country);
    assert.isDefined(country._id);
  });

  test("delete all countries", async () => {
    let returnedCountries = await db.countryStore.getAllCountries();
    assert.equal(returnedCountries.length, 3);
    await db.countryStore.deleteAllCountries();
    returnedCountries = await db.countryStore.getAllCountries();
    assert.equal(returnedCountries.length, 0);
  });

  test("get a country - success", async () => {
    const country = await db.countryStore.addCountry(portugal);
    const returnedCountry = await db.countryStore.getCountryById(country._id);
    assertSubset(portugal, country);
  });

  test("delete One Country - success", async () => {
    const id = testCountries[0]._id;
    await db.countryStore.deleteCountryById(id);
    const returnedCountries = await db.countryStore.getAllCountries();
    assert.equal(returnedCountries.length, testCountries.length - 1);
    const deletedCountry = await db.countryStore.getCountryById(id);
    assert.isNull(deletedCountry);
  });

  test("get a country - bad params", async () => {
    assert.isNull(await db.countryStore.getCountryById(""));
    assert.isNull(await db.countryStore.getCountryById());
  });

  test("delete One Country - fail", async () => {
    await db.countryStore.deleteCountryById("bad-id");
    const allCountries = await db.countryStore.getAllCountries();
    assert.equal(testCountries.length, allCountries.length);
  });
});