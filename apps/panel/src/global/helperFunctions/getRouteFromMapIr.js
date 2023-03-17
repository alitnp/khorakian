import axios from 'axios';
import { MAP_IR_TOKEN } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';

export const getRouteFromMapIr = async (data, onSuccess, onFail) => {
  const latLng = data.map((item) => `${item.longitude},${item.latitude}`).join(';');

  await axios
    .get(endpointUrls.mapIrGetRouteBylatLng + latLng + '?geometries=geojson', { headers: { 'x-api-key': MAP_IR_TOKEN } })
    .then((res) => onSuccess(res))
    .catch((res) => {
      onFail && onFail(res);
    });
};
