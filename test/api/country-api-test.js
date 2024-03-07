import { EventEmitter } from "events";
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, sampleCountry, testCountries } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Country API tests", () => {
  let user = null;

  setup(async () => {
    await placemarkService.deleteAllCountries();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    sampleCountry.userid = user._id;
  });

  teardown(async () => {});

  test("create country", async () => {
    const returnedCountry = await placemarkService.createCountry(sampleCountry);
    assert.isNotNull(returnedCountry);
    assertSubset(sampleCountry, returnedCountry);
  });

  test("delete a country", async () => {
    const country = await placemarkService.createCountry(sampleCountry);
    const response = await placemarkService.deleteCountry(country._id);
    assert.equal(response.status, 204);
    try {
      const returnedCountry = await placemarkService.getCountry(country.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Country with this id", "Incorrect Response Message");
    }
  });

  test("create multiple countries", async () => {
    for (let i = 0; i < testCountries.length; i += 1) {
      testCountries[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createCountry(testCountries[i]);
    }
    let returnedLists = await placemarkService.getAllCountries();
    assert.equal(returnedLists.length, testCountries.length);
    await placemarkService.deleteAllCountries();
    returnedLists = await placemarkService.getAllCountries();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existent country", async () => {
    try {
      const response = await placemarkService.deleteCountry("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Country with this id", "Incorrect Response Message");
    }
  });
});