import ApiService from '../ApiService';
const baseUrl = '/v1/Provinces';

function provinces() {
  return {
    getProvinces: () => {
      const url = baseUrl;
      return ApiService.get(url, { pageSize: 50 });
    },
  };
}

export default provinces();
