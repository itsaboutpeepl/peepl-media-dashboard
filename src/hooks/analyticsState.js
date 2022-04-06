import { createState } from '@hookstate/core';
import { getData } from '../global/apiTemplate';

const analyticsState = createState({
  weekViews: 0,
  currentLive: 0,
  peeplIssued: 0,
  totalViews: 0
});

const analyticsEndpoint = 'http://localhost:1337/api/v1/partners/analytics';

const fetchResource = () =>
  getData(analyticsEndpoint).then((data) =>
    analyticsState.set({
      weekViews: data.viewsThisWeek,
      currentLive: data.liveVideos,
      peeplIssued: data.tokensIssued,
      totalViews: data.totalViews
    })
  );

fetchResource();
setInterval(fetchResource, 10000);

export default analyticsState;
