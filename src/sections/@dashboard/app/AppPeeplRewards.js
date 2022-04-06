// material
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { useState } from '@hookstate/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import analyticsState from '../../../hooks/analyticsState';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

// ----------------------------------------------------------------------

export default function AppItemOrders() {
  const state = useState(analyticsState);
  return (
    <RootStyle>
      <Typography variant="h3">{fShortenNumber(state.get().peeplIssued)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Peepl Rewards Issued
      </Typography>
    </RootStyle>
  );
}
