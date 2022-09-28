import { Box, List, ListItem, ListItemButton, ListItemText, styled } from '@mui/material';
import logo from '../../logo.svg';
import Container from '../../styles/Container';
import './sidebar.css';

const LogoBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
  img: {
    width: '300px',
    marginTop: 'auto',
  },
});

const MenuItemBox = styled(Box)({
  display: 'flex',
  padding: '20px',
});

const SideBar = () => (
  <Container>
    <LogoBox>
      <img src={logo} alt="spreadsheet-validator-logo" />
    </LogoBox>
    <MenuItemBox>
      <List>
        <ListItem>
          <ListItemButton component="a" href="overview">
            <ListItemText primary="Overview" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component="a" href="repair-incompleteness">
            <ListItemText primary="Repair Incompleteness" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component="a" href="repair-inconsistency">
            <ListItemText primary="Repair Inconsistency" />
          </ListItemButton>
        </ListItem>
      </List>
    </MenuItemBox>
  </Container>
);

export default SideBar;
