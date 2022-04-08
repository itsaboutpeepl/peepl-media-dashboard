import PropTypes from 'prop-types';
import { formatDistance, formatDistanceStrict } from 'date-fns';
import { useState, createState } from '@hookstate/core';
// material
import { Box, Stack, Card, Typography, CardHeader, IconButton } from '@mui/material';
//
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import { fShortenNumber } from '../../../utils/formatNumber';
import { getData } from '../../../global/apiTemplate';

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

const latestVideosState = createState([]);

const latestVideosEndpoint =
  'https://media.itsaboutpeepl.com/api/v1/partners/52841587-623b-4ffa-9a26-420a19fbb6f8/videos';

const fetchResource = () =>
  getData(latestVideosEndpoint).then((data) => latestVideosState.set(data.videos));

fetchResource();

function NewsItem({ news }) {
  const {
    thumbnail,
    name,
    description,
    createdAt,
    url,
    ctaLink,
    rewardsEndDate,
    rewardsPerView,
    totalRewardsBudget
  } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={name}
        src={thumbnail}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <Typography variant="body2" noWrap>
          Rewards Per View
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap align="center">
          {rewardsPerView}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" noWrap>
          Budget
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap align="center">
          {fShortenNumber(totalRewardsBudget)}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" noWrap align="center">
          End Date
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap align="center">
          {formatDistanceStrict(rewardsEndDate, new Date(), { addSuffix: true })}
        </Typography>
      </Box>

      {/* <IconButton>
        <Iconify icon="eva:edit-outline" width={20} height={20} />
      </IconButton> */}
      <IconButton href={url} target="_blank">
        <Iconify icon="eva:play-circle-outline" width={20} height={20} />
      </IconButton>
      <IconButton href={ctaLink} target="_blank">
        <Iconify icon="eva:paper-plane-outline" width={20} height={20} />
      </IconButton>
      <Box minWidth={125}>
        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
          {formatDistance(createdAt, new Date(), { addSuffix: true })}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function AppNewsUpdate() {
  const videosState = useState(latestVideosState);

  const test = (
    <IconButton onClick={fetchResource}>
      <Iconify icon="eva:refresh-outline" width={20} height={20} />
    </IconButton>
  );

  return (
    <Card>
      <CardHeader title="Latest Videos" action={test} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {videosState.get().map((news) => (
            <NewsItem key={news.publicId} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      {/* <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View all
        </Button>
      </Box> */}
    </Card>
  );
}
