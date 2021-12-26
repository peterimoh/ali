/* eslint-disable */
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { styled } from '@mui/material/styles';
import { Card, Button, Typography, Box, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Label from '../../Label';
import Paypal from './Paypal';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

PricingPlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object
};

export default function PricingPlanCard() {
  const { subscription } = useSelector((state) => state.product);

  const transactionSuccess = (data) => {
    console.log(data);
  };
  const transactionFail = () => {};
  const transactionCancel = () => {};
  return (
    <RootStyle>
      {/* {index === 1 && (
        <Label
          color="info"
          sx={{
            top: 16,
            right: 16,
            position: 'absolute'
          }}
        >
          POPULAR
        </Label>
      )} */}

      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        {subscription && subscription.Name}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          $
        </Typography>

        <Typography variant="h2" sx={{ mx: 1 }}>
          {subscription && subscription.Sale_price}
        </Typography>

        <Typography
          gutterBottom
          component="span"
          variant="subtitle2"
          sx={{
            alignSelf: 'flex-end',
            color: 'text.secondary'
          }}
        >
          /year
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize'
        }}
      >
        {/* {caption} */}
      </Typography>

      {/* <Box sx={{ width: 80, height: 80, mt: 3 }}>{icon}</Box> */}

      <Stack component="ul" spacing={2} sx={{ my: 5, width: 1 }}>
        <Stack component="li" direction="row" alignItems="center" spacing={1.5}>
          <Box component={Icon} icon={checkmarkFill} sx={{ width: 20, height: 20 }} />
          <Typography variant="body2">{subscription && subscription.Discount}</Typography>
        </Stack>
        <Stack component="li" direction="row" alignItems="center" spacing={1.5}>
          <Box component={Icon} icon={checkmarkFill} sx={{ width: 20, height: 20 }} />
          <Typography variant="body2">Bandwidth: {subscription && subscription.BandWidth}</Typography>
        </Stack>
        <Stack component="li" direction="row" alignItems="center" spacing={1.5}>
          <Box component={Icon} icon={checkmarkFill} sx={{ width: 20, height: 20 }} />
          <Typography variant="body2">CPU: {subscription && subscription.CPU}</Typography>
        </Stack>
        <Stack component="li" direction="row" alignItems="center" spacing={1.5}>
          <Box component={Icon} icon={checkmarkFill} sx={{ width: 20, height: 20 }} />
          <Typography variant="body2">TLD: {subscription && subscription.TLD}</Typography>
        </Stack>
        <Stack component="li" direction="row" alignItems="center" spacing={1.5}>
          <Box component={Icon} icon={checkmarkFill} sx={{ width: 20, height: 20 }} />
          <Typography variant="body2">Email: {subscription && subscription.Email}</Typography>
        </Stack>
        <Stack component="li" direction="row" alignItems="center" spacing={1.5}>
          <Box component={Icon} icon={checkmarkFill} sx={{ width: 20, height: 20 }} />
          <Typography variant="body2">Free SSL: {subscription && subscription.Free_ssl}</Typography>
        </Stack>
        <Stack component="li" direction="row" alignItems="center" spacing={1.5}>
          <Box component={Icon} icon={checkmarkFill} sx={{ width: 20, height: 20 }} />
          <Typography variant="body2">SQL Database: {subscription && subscription.My_sql_db}</Typography>
        </Stack>
        <Stack component="li" direction="row" alignItems="center" spacing={1.5}>
          <Box component={Icon} icon={checkmarkFill} sx={{ width: 20, height: 20 }} />
          <Typography variant="body2">Duration: {subscription && subscription.Durattion}</Typography>
        </Stack>
      </Stack>

      {/* <Button
        to={PATH_DASHBOARD.root}
        fullWidth
        size="large"
        variant="contained"
        // disabled={index === 0}
        component={RouterLink}
      >
       Pay Now
      </Button> */}
      <Paypal
        toPay={subscription && subscription.Sale_price}
        onSuccess={transactionSuccess}
        onFail={transactionFail}
        onCancel={transactionCancel}
      />
    </RootStyle>
  );
}
