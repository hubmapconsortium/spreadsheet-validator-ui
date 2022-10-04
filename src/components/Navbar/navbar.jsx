import { Stack, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { BLACK } from '../../constants/Color';

const NavLink = styled(Link)({
  fontSize: '14pt',
  fontStyle: 'normal',
  '&:link': {
    textDecoration: 'none',
    color: BLACK,
  },
  '&:visited': {
    textDecoration: 'none',
    color: BLACK,
  },
  '&:hover': {
    textDecoration: 'none',
  },
  '&:active': {
    textDecoration: 'none',
    color: BLACK,
  },
});

const Navbar = () => (
  <nav>
    <Stack direction="row" spacing={4} sx={{ padding: '30px' }}>
      <NavLink to="about">About</NavLink>
      <NavLink to="help">Help</NavLink>
    </Stack>
  </nav>
);

export default Navbar;
