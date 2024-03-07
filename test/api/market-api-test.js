import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, sampleCountry, testCountries, testMarkets, sampleMarket } from "../fixtures.js";

suite("Market API tests", () => {
  let user = null;
  let milanMarkets = null;

  setup(async () => {
    await placemarkService.deleteAllCountries();
    await placemarkService.deleteAllUsers();
    await placemarkService.deleteAllMarkets();
    user = await placemarkService.createUser(maggie);
    sampleCountry.userid = user._id;
    milanMarkets = await placemarkService.createCountry(sampleCountry);
  });

  teardown(async () => {});

  test("create market", async () => {
    const returnedMarket = await placemarkService.createMarket(milanMarkets._id, sampleMarket);
    assertSubset(sampleMarket, returnedMarket);
  });

  test("create Multiple markets", async () => {
    for (let i = 0; i < testMarkets.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createMarket(milanMarkets._id, testMarkets[i]);
    }
    const returnedMarkets = await placemarkService.getAllMarkets();
    assert.equal(returnedMarkets.length, testMarkets.length);
    for (let i = 0; i < returnedMarkets.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const market = await placemarkService.getMarket(returnedMarkets[i]._id);
      assertSubset(market, returnedMarkets[i]);
    }
  });

  test("Delete MarketApi", async () => {
    for (let i = 0; i < testMarkets.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createMarket(milanMarkets._id, testMarkets[i]);
    }
    let returnedMarkets = await placemarkService.getAllMarkets();
    assert.equal(returnedMarkets.length, testMarkets.length);
    for (let i = 0; i < returnedMarkets.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const market = await placemarkService.deleteMarket(returnedMarkets[i]._id);
    }
    returnedMarkets = await placemarkService.getAllMarkets();
    assert.equal(returnedMarkets.length, 0);
  });

  test("denormalised country", async () => {
    for (let i = 0; i < testMarkets.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createMarket(milanMarkets._id, testMarkets[i]);
    }
    const returnedCountry = await placemarkService.getCountry(milanMarkets._id);
    assert.equal(returnedCountry.markets.length, testMarkets.length);
    for (let i = 0; i < testMarkets.length; i += 1) {
      assertSubset(testMarkets[i], returnedCountry.markets[i]);
    }
  });
});