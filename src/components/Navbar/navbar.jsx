import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';
import CompletenessErrorNavMenu from '../NavMenu/CompletenessErrorNavMenu';
import AdherenceErrorNavMenu from '../NavMenu/AdherenceErrorNavMenu';
import OverviewNavMenu from '../NavMenu/OverviewNavMenu';

const Navbar = () => (
  <AppBar component="nav" position="sticky">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Metadata Spreadsheet Validator
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <OverviewNavMenu />
          <CompletenessErrorNavMenu />
          <AdherenceErrorNavMenu />
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Navbar;
