export const getMinMaxXYFromBounding = (boundings) => ({
  minY: boundings._southWest.lat,
  minX: boundings._southWest.lng,
  maxY: boundings._northEast.lat,
  maxX: boundings._northEast.lng,
});
