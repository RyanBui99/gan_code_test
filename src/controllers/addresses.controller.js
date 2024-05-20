const addresses = require("../services/addresses.service");

const getCitiesByTag = async (req, res) => {
  try {
    const cities = await addresses.findCitiesByTag(req.query);
    res.json(cities);
  } catch (error) {
    return res.status(500).send(e.message);
  }
};

const getDistanceBetweenTwoCities = async (req, res) => {
  try {
    const distance = await addresses.findDistanceBetweenTwoCities(req.query);
    res.json(distance);
  } catch (error) {
    return res.status(404).send(e.message);
  }
};

const initiateSearch = async (req, res) => {
  try {
    const result = await addresses.initiateSearch(req.query);
    res.status(202).send({
      resultsUrl: `http://${req.headers.host}/${result}`,
    });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const getSearchResult = async (req, res) => {
  const { searchId } = req.params;

  try {
    const search = addresses.getPollSearchResult(searchId);
    if (search.status == "pending") {
      res.status(202).send({ status: "pending" });
      return;
    }

    res.send({ status: "completed", cities: search.cities });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const getAllCitites = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="all-cities.json"'
    );

    res.send(addresses.getAllCities());
  } catch (error) {
    return res.status(500).send(e.message);
  }
};

module.exports = {
  getCitiesByTag,
  getDistanceBetweenTwoCities,
  initiateSearch,
  getSearchResult,
  getAllCitites,
};
