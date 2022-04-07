import { createState } from '@hookstate/core';
import { getData } from '../global/apiTemplate';

const generalVideoSettingsState = createState({
  walletAddress: '',
  name: '',
  monthlyTokenCap: 0,
  weeklyUserTokenCap: 0,
  publicId: ''
});

const generalVideoSettingsEndpoint = 'http://localhost:1337/api/v1/partners/settings';

const fetchResource = () => {
  getData(generalVideoSettingsEndpoint).then((data) => {
    generalVideoSettingsState.set({
      walletAddress: data.walletAddress,
      name: data.name,
      monthlyTokenCap: data.monthlyTokenCap,
      weeklyUserTokenCap: data.weeklyUserTokenCap,
      publicId: data.publicId
    });
    console.log(data.publicId);
  });
};

fetchResource();
setInterval(fetchResource, 20000);

export default generalVideoSettingsState;
