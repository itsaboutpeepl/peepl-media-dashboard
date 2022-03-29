import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/">
      <Box
        component="img"
        src="/static/logo.svg"
        sx={{
          width: 100,
          height: 100,
          ...sx
        }}
      />
    </RouterLink>
  );
}