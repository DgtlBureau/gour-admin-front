import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from 'components/UI/Box/Box';

const sx = {
  transform: 'translateY(-50%) translateX(-50%)',
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 'fit-content',
};

function AuthLayout() {
  return (
    <Box sx={sx}>
      <Outlet />
    </Box>
  );
}

export default AuthLayout;
