const cities = require("../../addresses.json");
const { calculateDistanceBetweenCities } = require("../lib/helpers");

const memoryCache = {}; // Stores operation results in memoery

const findCitiesByTag = async (query) => {
  const { tag, isActive } = query;
  const isActiveAsBoolean = isActive === "true";

  const citiesByTag = cities.filter(
    (city) => city.tags.includes(tag) && city.isActive === isActiveAsBoolean
  );

  return { cities: citiesByTag };
};

const findDistanceBetweenTwoCities = async (query) => {
  const { from, to } = query;

  const cityFrom = cities.find((city) => city.guid === from);
  const cityTo = cities.find((city) => city.guid === to);

  if (!cityFrom || !cityTo) {
    throw new Error("cityFrom or cityTo could not be found.");
  }

  const distance = calculateDistanceBetweenCities(cityFrom, cityTo);

  return {
    from: cityFrom,
    to: cityTo,
    unit: "km",
    distance,
  };
};

const findCitiesWithinAreaRequest = async (cityFrom, distance, searchId) => {
  setTimeout(() => {
    const results = cities.filter((city) => {
      if (city.guid == cityFrom.guid) return false;
      const dist = calculateDistanceBetweenCities(cityFrom, city);
      return dist <= distance;
    });

    memoryCache[searchId] = { status: "completed", cities: results };
  }, 500);
};

const initiateSearch = async (query) => {
  const searchId = "2152f96f-50c7-4d76-9e18-f7033bd14428";
  const { from, distance } = query;

  const cityFrom = cities.find((city) => city.guid === from);
  if (!cityFrom) {
    throw new Error("City not found");
  }
  memoryCache[searchId] = { status: "pending", cities: [] };

  await findCitiesWithinAreaRequest(cityFrom, distance, searchId);

  return `area-result/${searchId}`;
};

const getPollSearchResult = (searchId) => {
  const search = memoryCache[searchId];

  if (!search) {
    throw new Error("Search not found");
  }
  return search;
};

const getAllCities = () => {
  return JSON.stringify(cities);
};

module.exports = {
  findCitiesByTag,
  findDistanceBetweenTwoCities,
  initiateSearch,
  getPollSearchResult,
  getAllCities,
};
