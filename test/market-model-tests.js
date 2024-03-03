import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testCountries, testMarkets, sampleCountry, sampleMarket, portugal, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Market Model tests", () => {

  let sampleCountryList = null;

  setup(async () => {
    db.init("mongo");
    await db.countryStore.deleteAllCountries();
    await db.marketStore.deleteAllMarkets();
    sampleCountryList = await db.countryStore.addCountry(sampleCountry);
    for (let i = 0; i < testMarkets.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testMarkets[i] = await db.marketStore.addMarket(sampleCountryList._id, testMarkets[i]);
    }
  });

  test("create single market", async () => {
    const portugalList = await db.countryStore.addCountry(portugal);
    const market = await db.marketStore.addMarket(portugalList._id, sampleMarket)
    assert.isNotNull(market._id);
    assertSubset (sampleMarket, market);
  });

  test("get multiple markets", async () => {
    const markets = await db.marketStore.getMarketsByCountryId(sampleCountryList._id);
    assert.equal(markets.length, testMarkets.length)
  });

  test("delete all markets", async () => {
    const markets = await db.marketStore.getAllMarkets();
    assert.equal(testMarkets.length, markets.length);
    await db.marketStore.deleteAllMarkets();
    const newMarkets = await db.marketStore.getAllMarkets();
    assert.equal(0, newMarkets.length);
  });

  test("get a market - success", async () => {
    const portugalList = await db.countryStore.addCountry(portugal);
    const market = await db.marketStore.addMarket(portugalList._id, sampleMarket)
    const newMarket = await db.marketStore.getMarketById(market._id);
    assertSubset (sampleMarket, newMarket);
  });

  test("delete One Market - success", async () => {
    await db.marketStore.deleteMarket(testMarkets[0]._id);
    const markets = await db.marketStore.getAllMarkets();
    assert.equal(markets.length, testCountries.length - 1);
    const deletedMarket = await db.marketStore.getMarketById(testMarkets[0]._id);
    assert.isNull(deletedMarket);
  });

  test("get a market - bad params", async () => {
    assert.isNull(await db.marketStore.getMarketById(""));
    assert.isNull(await db.marketStore.getMarketById());
  });

  test("delete one market - fail", async () => {
    await db.marketStore.deleteMarket("bad-id");
    const markets = await db.marketStore.getAllMarkets();
    assert.equal(markets.length, testCountries.length);
  });
});