import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Collapse, List, ListItemButton, ListItemText, ListSubheader, styled } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ERROR_FOUND, ERROR_NOT_FOUND } from '../../constants/Status';
import { GREEN, LIGHTER_GRAY, RED } from '../../constants/Color';

const MenuItem = styled(ListItemButton)({
  paddingLeft: '30px',
  paddingRight: '30px',
  width: '380px',
  height: '5vw',
  '&:hover': {
    backgroundColor: LIGHTER_GRAY,
  },
  '&:active': {
    backgroundColor: LIGHTER_GRAY,
  },
  '&.Mui-selected': {
    backgroundColor: LIGHTER_GRAY,
  },
});

const MenuItemText = styled(ListItemText)({
  span: {
    fontSize: '14pt',
    paddingLeft: '14px',
  },
});

const SubMenu = styled(List)({});

const SubMenuTitle = styled(ListSubheader)({
  paddingLeft: '35px',
});

const SubMenuItem = styled(ListItemButton)({
  paddingLeft: '50px',
  paddingRight: '30px',
  '&:hover': {
    backgroundColor: LIGHTER_GRAY,
  },
  '&:active': {
    backgroundColor: LIGHTER_GRAY,
  },
  '&.Mui-selected': {
    backgroundColor: LIGHTER_GRAY,
  },
});

const SubMenuItemText = styled(ListItemText)({
  span: {
    fontSize: '12pt',
  },
});

const ErrorStatusIcon = styled(ErrorIcon)({
  verticalAlign: 'middle',
  color: RED,
});

const NoErrorStatusIcon = styled(CheckCircleIcon)({
  verticalAlign: 'middle',
  color: GREEN,
});

const NestedMenuItem = ({ icon, title, navigateTo, subMenu }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const openSubMenus = () => {
    setOpen(!open);
  };
  return (
    <>
      <MenuItem onClick={() => { navigate(navigateTo); openSubMenus(); }}>
        {icon}
        <MenuItemText primary={title} />
        {subMenu && (open ? <ExpandLess /> : <ExpandMore />)}
      </MenuItem>
      {subMenu && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <SubMenu
            disablePadding
            subheader={<SubMenuTitle>{subMenu.title}</SubMenuTitle>}
          >
            {subMenu.items.map((subMenuItem) => (
              <SubMenuItem onClick={() => navigate(subMenuItem.navigateTo)}>
                <SubMenuItemText primary={subMenuItem.title} />
                {subMenuItem.status === ERROR_FOUND && <ErrorStatusIcon />}
                {subMenuItem.status === ERROR_NOT_FOUND && <NoErrorStatusIcon />}
              </SubMenuItem>
            ))}
          </SubMenu>
        </Collapse>
      )}
    </>
  );
};

NestedMenuItem.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  navigateTo: PropTypes.string.isRequired,
  subMenu: PropTypes.shape({
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        navigateTo: PropTypes.string.isRequired,
        status: PropTypes.oneOf([ERROR_NOT_FOUND, ERROR_FOUND]),
      }),
    ),
  }),
};

NestedMenuItem.defaultProps = {
  icon: null,
  subMenu: null,
};

export default NestedMenuItem;
