import { Box, Skeleton, Stack, useMediaQuery } from '@mui/material';
import React from 'react';

export default function MoviesSkeleton() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box mt={2} mb={2}>
      {new Array(5).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            height="32px"
            width="200px"
          />
          <Stack direction="row" justifyContent="center" flexWrap="wrap">
            {new Array(5).fill(null).map((_, index) => (
              <Skeleton
                key={index}
                animation="wave"
                variant="rectangular"
                height={isMobile ? '520px' : '352px'}
                width={isMobile ? '100%' : '230px'}
              />
            ))}
          </Stack>
        </React.Fragment>
      ))}
    </Box>
  );
}
