import { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, List, ListItemButton, ListItemText, ListSubheader, styled } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ERROR_FOUND, ERROR_NOT_FOUND } from '../../constants/Status';

const MenuItem = styled(ListItemButton)({
  paddingLeft: '30px',
  paddingRight: '30px',
  width: '380px',
  height: '5vw',
  '&:hover': {
    backgroundColor: '#f2f2f2',
  },
  '&:active': {
    backgroundColor: '#f2f2f2',
  },
  '&.Mui-selected': {
    backgroundColor: '#f2f2f2',
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
    backgroundColor: '#f2f2f2',
  },
  '&:active': {
    backgroundColor: '#f2f2f2',
  },
  '&.Mui-selected': {
    backgroundColor: '#f2f2f2',
  },
});

const SubMenuItemText = styled(ListItemText)({
  span: {
    fontSize: '12pt',
  },
});

const ErrorStatusIcon = styled(ErrorIcon)({
  verticalAlign: 'middle',
  color: '#da0e4b',
});

const NoErrorStatusIcon = styled(CheckCircleIcon)({
  verticalAlign: 'middle',
  color: '#7cd32f',
});

const NestedMenuItem = ({ icon, title, onClick, subMenu }) => {
  const [open, setOpen] = useState(false);
  const openSubMenus = () => {
    setOpen(!open);
  };
  return (
    <>
      <MenuItem onClick={() => { onClick(); openSubMenus(); }}>
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
              <SubMenuItem onClick={subMenuItem.onClick}>
                <SubMenuItemText primary={subMenuItem.title} />
                {subMenuItem.status === ERROR_FOUND ? <ErrorStatusIcon /> : <NoErrorStatusIcon />}
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
  onClick: PropTypes.func.isRequired,
  subMenu: PropTypes.shape({
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
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
