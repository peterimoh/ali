// material
import { Container, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  AppWelcome,
  AppWidgets1,
  AppWidgets2,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppTotalDownloads,
  AppTotalInstalled,
  AppCurrentDownload,
  AppTotalActiveUsers,
  AppTopInstalledCountries
} from '../../components/_dashboard/general-app';
import { getPlan } from '../../redux/slices/user';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getPlan());
  }, []);

  return (
    <Page title="General: App | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome displayName={user.last_name} />
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid> */}

          <Grid item xs={12} md={6}>
            <AppTotalActiveUsers />
          </Grid>

          <Grid item xs={12} md={6}>
            <AppTotalInstalled />
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <AppTotalDownloads />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid> */}

          <Grid item xs={12} lg={12}>
            <AppNewInvoice />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidgets1 />
              <AppWidgets2 />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
