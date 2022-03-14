/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';

import {
  Container,
  Box,
} from '@mui/material';
import { FooterStyle } from '../style/Styled';

const Footer: React.FC = () => (
  <FooterStyle>
    <Box
      px={{ xs: 1, sm: 2 }}
      py={{ xs: 2, sm: 2 }}
      bgcolor="text.secondary"
      color="white"
    >
      <Container maxWidth="lg">
        <Box
          textAlign="center"
          pt={{ xs: 1, sm: 2 }}
          pb={{ xs: 2, sm: 2 }}
        >
          Danil &reg; {new Date().getFullYear()}
        </Box>
      </Container>
    </Box>
  </FooterStyle>
);

export default Footer;
