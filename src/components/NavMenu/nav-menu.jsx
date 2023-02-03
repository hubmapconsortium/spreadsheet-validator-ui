import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Badge, Menu, MenuItem, Chip, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Panel from '../../styles/Panel';
import { add } from '../../helpers/array-utils';
import { REPAIR_COMPLETED, REPAIR_NOT_COMPLETED } from '../../constants/Status';
import { GREEN, RED } from '../../constants/Color';

const NavMenu = ({ id, title, navigateTo, subMenus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalErrorRemaining = subMenus
    .map((subMenu) => subMenu.errorRemaining)
    .reduce(add, 0);

  return (
    <>
      <IconButton
        id={id}
        size="small"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ marginRight: '10px' }}
      >
        <Badge badgeContent={totalErrorRemaining} color="error">
          {title}
        </Badge>
      </IconButton>
      <Menu
        id="repair-incompleteness-menu-item"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          key={id}
          onClick={() => {
            navigate(navigateTo);
          }}
        >
          Overview
        </MenuItem>
        <Divider />
        {subMenus.map((subMenu) => {
          const {
            id: subMenuId,
            title: subMenuTitle,
            navigateTo: subMenuNavigateTo,
            errorId,
            errorRemaining,
          } = subMenu;
          return (
            <MenuItem
              key={subMenuId}
              onClick={() => {
                navigate(subMenuNavigateTo, {
                  state: {
                    errorId,
                  },
                });
              }}
            >
              <Panel sx={{ minWidth: '275px', justifyContent: 'space-between' }}>
                <Typography>
                  {subMenuTitle}
                </Typography>
                <Chip
                  label={errorRemaining}
                  color="primary"
                  size="small"
                  sx={{ bgcolor: errorRemaining === 0 ? GREEN : RED }}
                />
              </Panel>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

NavMenu.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  navigateTo: PropTypes.string.isRequired,
  subMenus: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      navigateTo: PropTypes.string.isRequired,
      errorId: PropTypes.string.isRequired,
      status: PropTypes.oneOf([REPAIR_NOT_COMPLETED, REPAIR_COMPLETED]),
      errorRemaining: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default NavMenu;
