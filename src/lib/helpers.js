/**
 * Calculates the distance between two cities using their latitude and longitude coordinates.
 *
 * @param {Object} cityFrom - City object of the first city.
 * @param {Object} cityTo - City object of the second city.
 * @returns {number} The distance between the two cities in kilometers.
 */
function calculateDistanceBetweenCities(cityFrom, cityTo) {
  const EARTH_RADIUS_IN_KM = 6371;

  const lat1 = cityFrom.latitude;
  const lon1 = cityFrom.longitude;
  const lat2 = cityTo.latitude;
  const lon2 = cityTo.longitude;

  const distanceLat = degreesToRadians(lat2 - lat1);
  const distanceLon = degreesToRadians(lon2 - lon1);

  const halfChordLength =
    Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(distanceLon / 2) *
      Math.sin(distanceLon / 2);

  const angularDistance =
    2 * Math.atan2(Math.sqrt(halfChordLength), Math.sqrt(1 - halfChordLength));

  const distance = EARTH_RADIUS_IN_KM * angularDistance;

  return Math.round(distance * 100) / 100;
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

module.exports = {
  calculateDistanceBetweenCities,
};
