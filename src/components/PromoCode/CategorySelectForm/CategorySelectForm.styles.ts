import { createSx } from 'themes';

export const sx = createSx({
  subCategoryGrid: {
    marginLeft: '15px',
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
  },
  arrow: {
    color: 'primary.main',
  },
  rotatedArrow: {
    transform: 'rotate(180deg)',
  },
});

export default sx;
