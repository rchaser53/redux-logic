import { createLogic } from 'redux-logic';
import { USERS_FETCH, USERS_FETCH_CANCEL, usersFetchFulfilled,
         usersFetchRejected } from './actions';

const delay = 2; // 2s delay for interactive use of cancel/take latest

export const usersFetchLogic = createLogic({
  type: USERS_FETCH,
  cancelType: USERS_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    successType: usersFetchFulfilled,
    failType: usersFetchRejected
  },

  // use axios injected as httpClient from configureStore logic deps
  // we also have access to getState and action in the first argument
  // but they were not needed for this particular code
  process({ httpClient }) {
    async function fetchUsers() {
      // the delay query param adds arbitrary delay to the response
      const users =
        await httpClient.get(`http://reqres.in/api/users?delay=${delay}`)
                        .then(resp => resp.data.data); // use data property of payload
      return users;
    }

    // now run it
    return fetchUsers();
  }
});

export default [
  usersFetchLogic
];
