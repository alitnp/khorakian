import ApiService from '../API/ApiService';
const baseUrl = '/v2/Group';

function roles() {
  return {
    getGroupById: ({ payload, data }) => {
      const url = baseUrl + `/${data}`;
      return ApiService.get(url, payload, {});
    },
    deleteGroup: ({ payload, data }) => {
      const url = baseUrl + `/${data}`;
      return ApiService.delete(url, payload, {});
    },
    createGroup: ({ payload }) => {
      return ApiService.post(baseUrl, payload, {});
    },
    editGroup: ({ payload }) => {
      return ApiService.put(baseUrl, payload, {});
    },
    allGroup: ({ payload }) => {
      const url = baseUrl + '/Search';
      return ApiService.post(url, payload, {});
    },
    addUserToThisGroup: ({ payload }) => {
      const url = baseUrl + '/AddUserToGroup';
      return ApiService.post(url, payload, {});
    },
    removeUserFromThisGroup: ({ payload }) => {
      const url = baseUrl + '/RemoveUserFromGroup';
      return ApiService.post(url, payload, {});
    },
  };
}

export default roles();
