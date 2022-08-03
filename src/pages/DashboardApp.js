// material
import { Box, Grid, Container, Typography } from '@mui/material';
import account from '../_mocks_/account';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppCreateNewVideos,
  AppGeneralVideoSettings
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Peepl Media">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi {account.firstName}, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppCreateNewVideos />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppGeneralVideoSettings />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

/* <Grid container spacing={3}>
          <Grid container item xs={12} sm={6} md={6} lg={6}>
            <Grid item xs={12} sm={6} md={6}>
              <AppGeneralVideoSettings />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales />
              <Box sx={{ my: 5 }} />
              <AppItemOrders />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppNewUsers />
              <Box sx={{ my: 5 }} />
              <AppBugReports />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppCreateNewVideos />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppNewsUpdate />
          </Grid>
        </Grid> */
