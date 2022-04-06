import { createState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';

const globalState = createState({
  isLoggedIn: false,
  userEmail: '',
  authToken: ''
});

globalState.attach(Persistence('saved-global-state'));

export default globalState;
