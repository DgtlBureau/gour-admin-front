import { createSx } from 'themes';

const sx = createSx({
  card: {
    display: 'flex',
    alignItems: 'center',

    paddingRight: '34px',
    margin: '10px 0',
  },

  image: {
    height: '52px',
    width: '52px',

    marginRight: '10px',

    borderRadius: '2px',

    objectFit: 'cover',
  },

  title: {
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: 'text.secondary',
  },

  price: {},
  count: {},
  priceText: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  countText: {
    color: 'text.muted',
    textAlign: 'center',
  },

  docket: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',

    padding: 0,

    button: {
      textTransform: 'none',

      padding: 0,

      color: 'text.secondary',
    },
  },

  leftActions: {
    'button:first-of-type': {
      marginRight: '20px',
    },
  },

  edit: {
    display: 'flex',
    alignItems: 'center',

    padding: '4px',

    backgroundColor: 'secondary.main',
    color: 'text.secondary',

    borderRadius: '99px',

    button: {
      minWidth: '16px',
      padding: 'none',

      img: {
        height: '16px',
        width: '16px',
      },
    },
  },

  weight: {
    margin: '0 8px',
  },
});

export default sx;
