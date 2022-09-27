import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => (
  <nav>
    <Stack direction="row" spacing={4} sx={{ padding: '30px' }}>
      <Link to="about" class="link">About</Link>
      <Link to="help" class="link">Help</Link>
    </Stack>

  </nav>
);

export default Navbar;
