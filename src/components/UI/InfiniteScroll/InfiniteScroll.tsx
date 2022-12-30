import React, { ReactNode, memo, useRef } from 'react';

import { SxProps } from '@mui/material';

import useInterSectionObserver from 'hooks/useInterSectionObserver';

import { Box } from '../Box/Box';
import { ProgressLinear } from '../ProgressLinear/ProgressLinear';

export type InfiniteScrollProps = {
  children: ReactNode;
  hasMore?: boolean;
  isLoading?: boolean;
  root?: IntersectionObserverInit['root'];
  rootMargin?: IntersectionObserverInit['rootMargin'];
  threshold?: IntersectionObserverInit['threshold'];
  sx?: SxProps;
  onUpload(): void;
};

const cleanFn = () => undefined;

export const InfiniteScroll = memo(
  ({ children, hasMore = true, isLoading = false, root, rootMargin, threshold, sx, onUpload }: InfiniteScrollProps) => {
    const lastChildRef = useRef<HTMLDivElement | null>(null);

    useInterSectionObserver(lastChildRef, {
      isIntersectingCallback: hasMore && !isLoading ? onUpload : cleanFn,
      root,
      rootMargin,
      threshold,
    });

    return (
      <Box sx={sx}>
        {children}

        <div ref={lastChildRef} />

        {isLoading && <ProgressLinear />}
      </Box>
    );
  },
);
