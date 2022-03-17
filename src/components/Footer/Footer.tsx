import React, { Fragment } from 'react';
import NextLink from 'next/link';
import { Divider } from '@mui/material';

import { Link as CustomLink } from '../UI/Link/Link';
import { Box } from '../UI/Box/Box';

import logo from '../../assets/images/logo.png';
import fbIcon from '../../assets/icons/social/fb.svg';
import instIcon from '../../assets/icons/social/inst.svg';
import vkIcon from '../../assets/icons/social/vk.svg';

const sx = {
  contactsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contacts: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
  },
  contactsLink: {
    whiteSpace: 'nowrap',
    marginRight: '40px',
    fontSize: '24px',
    fontWeight: 700,
    color: '#25262D',
  },
  social: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  socialLink: {
    marginLeft: '20px',
    '&:first-child': {
      marginLeft: 0,
    },
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoLink: {
    fontSize: '13px',
    textDecoration: 'none',
    color: '#25262D',
  },
  divider: {
    marginTop: 0,
    marginBottom: 0,
    margin: '0 15px',
  },
  logo: {
    maxHeight: '113px',
    maxWidth: '126px',
    marginBottom: '20px',
  },
};

const links = {
  contacts: [
    {
      label: '+7 812 602-52-61',
      path: 'tel:+78126025261',
    },
    {
      label: '+372 880-45-21',
      path: 'tel:+3728804521',
    },
    {
      label: 'rk@gour-food.com',
      path: 'mailto:rk@gour-food.com',
    },
  ],
  social: [
    {
      icon: fbIcon,
      path: 'https://www.facebook.com/',
    },
    {
      icon: instIcon,
      path: 'https://www.instagram.com/',
    },
    {
      icon: vkIcon,
      path: 'https://vk.com/',
    },
  ],
  info: [
    {
      label: '© GOUR FOOD, 2022г.',
      path: 'https://gour-food.com/',
    },
    {
      label: 'Правила покупки и возврата',
      path: 'https://gour-food.com/',
    },
    {
      label: 'Политика конфиденциальности',
      path: 'https://gour-food.com/',
    },
    {
      label: 'Соглашение об использовании cookie-файлов',
      path: 'https://gour-food.com/',
    },
    {
      label: 'Условия и соглашения для физических лиц',
      path: 'https://gour-food.com/',
    },
  ],
};

export function Footer() {
  return (
    <Box>
      <Box sx={sx.contactsWrapper}>
        <CustomLink path="/">
          <img src={logo} alt="" style={sx.logo} />
        </CustomLink>

        <Box sx={sx.contacts}>
          {
            links.contacts.map(link => (
              <CustomLink
                key={link.path}
                path={link.path}
                underline="none"
                sx={sx.contactsLink}
              >
                {link.label}
              </CustomLink>
            ))
          }
          <Box sx={sx.social}>
            {
              links.social.map(link => (
                <a
                  key={link.path}
                  href={link.path}
                  rel="noreferrer"
                  target="_blank"
                  style={sx.socialLink}
                >
                  <img src={link.icon} alt="" />
                </a>
              ))
            }
          </Box>
        </Box>
      </Box>
      <Box sx={sx.info}>
        {
          links.info.map((link, i) => (
            <Fragment key={link.path}>
              <NextLink href={link.path} passHref>
                <a
                  href="replace"
                  rel="noreferrer"
                  target="_blank"
                  style={sx.infoLink}
                >
                  {link.label}
                </a>
              </NextLink>
              {
                (i + 1 !== links.info.length) && (
                  <Divider
                    sx={sx.divider}
                    orientation="vertical"
                    variant="middle"
                    flexItem
                  />
                )
              }
            </Fragment>
          ))
        }
      </Box>
    </Box>
  );
}
