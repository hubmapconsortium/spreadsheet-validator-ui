import { Box, styled } from '@mui/material';
import { WHITE } from '../constants/Color';

const Card = styled(Box)({
  display: 'flex',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  borderRadius: '16px',
  backgroundColor: WHITE,
  padding: '40px',
});

export default Card;
