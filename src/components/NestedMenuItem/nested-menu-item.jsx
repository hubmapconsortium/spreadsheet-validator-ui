import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Collapse, List, ListItemButton, ListItemText, ListSubheader, styled } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { REPAIR_COMPLETED, REPAIR_NOT_COMPLETED } from '../../constants/Status';
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

// eslint-disable-next-line max-len
const NestedMenuItem = ({ icon, title, navigateTo, subMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedMenuItem } = location.state;

  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const [parentMenuSelected, setParentMenuSelected] = useState(true);

  const openSubMenus = () => {
    navigate(navigateTo, {
      state: {
        selectedMenuItem: title,
      },
    });
    if (parentMenuSelected) {
      setSubMenuVisible(!subMenuVisible);
    }
    setParentMenuSelected(true);
  };

  return (
    <>
      <MenuItem
        key={title}
        selected={title === selectedMenuItem}
        onClick={openSubMenus}
      >
        {icon}
        <MenuItemText primary={title} />
        {subMenu && (subMenuVisible ? <ExpandLess /> : <ExpandMore />)}
      </MenuItem>
      {subMenu && (
        <Collapse in={subMenuVisible} timeout="auto" unmountOnExit>
          <SubMenu
            disablePadding
            subheader={<SubMenuTitle>{subMenu.title}</SubMenuTitle>}
          >
            {subMenu.items.map((subMenuItem) => {
              const subMenuTitle = subMenuItem.title;
              return (
                <SubMenuItem
                  key={subMenuTitle}
                  selected={subMenuTitle === selectedMenuItem}
                  onClick={() => {
                    navigate(subMenuItem.navigateTo, {
                      state: {
                        errorId: subMenuItem.errorId,
                        selectedMenuItem: subMenuTitle,
                      },
                    });
                    setParentMenuSelected(false);
                  }}
                >
                  <SubMenuItemText primary={subMenuTitle} />
                  {subMenuItem.status === REPAIR_NOT_COMPLETED && <ErrorStatusIcon fontSize="large" />}
                  {subMenuItem.status === REPAIR_COMPLETED && <NoErrorStatusIcon fontSize="large" />}
                </SubMenuItem>
              );
            })}
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
        errorId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        navigateTo: PropTypes.string.isRequired,
        status: PropTypes.oneOf([REPAIR_NOT_COMPLETED, REPAIR_COMPLETED]),
      }),
    ),
  }),
};

NestedMenuItem.defaultProps = {
  icon: null,
  subMenu: null,
};

export default NestedMenuItem;
