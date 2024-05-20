const express = require("express");
const router = express.Router();
const addressesController = require("../controllers/addresses.controller");

router.get("/cities-by-tag", addressesController.getCitiesByTag);
router.get("/distance", addressesController.getDistanceBetweenTwoCities);
router.get("/area", addressesController.initiateSearch);
router.get("/area-result/:searchId", addressesController.getSearchResult);
router.get("/all-cities", addressesController.getAllCitites);

module.exports = router;
