import { styled } from '@mui/material';
import Section from './Section';
import { WHITE } from '../constants/Color';

const Card = styled(Section)({
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  borderRadius: '16px',
  backgroundColor: WHITE,
  marginBottom: '50px',
});

export default Card;
