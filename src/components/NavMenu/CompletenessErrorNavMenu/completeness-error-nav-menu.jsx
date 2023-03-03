import { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Badge, Menu, MenuItem, Chip, Divider, Typography } from '@mui/material';
import AppContext from '../../../pages/AppContext';
import Panel from '../../../styles/Panel';
import { add } from '../../../helpers/array-utils';
import { getCompletenessErrorRepairTitle, getNavigationSubMenuTitle } from '../../../helpers/title-utils';
import { GREEN, RED } from '../../../constants/Color';
import { COMPLETENESS_ERROR_PATH } from '../../../constants/Router';
import { generateCompletenessErrorStatusList, generateErrorSummaryReport } from '../../../helpers/app-utils';
import { getColumnLabel } from '../../../helpers/data-utils';

const CompletenessErrorNavMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { appData, patches } = useContext(AppContext);
  const { schema, reporting } = appData;

  const errorSummaryData = useMemo(
    () => generateErrorSummaryReport(reporting, schema),
    [reporting],
  );
  const completenessErrorStatusList = useMemo(
    () => generateCompletenessErrorStatusList(errorSummaryData, patches),
    [errorSummaryData, patches],
  );

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalErrorRemaining = completenessErrorStatusList
    .map((errorStatus) => errorStatus.errorCount)
    .reduce(add, 0);

  return (
    <>
      <IconButton
        key="completeness-error-icon-button"
        size="small"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ marginRight: '10px' }}
      >
        <Badge badgeContent={totalErrorRemaining} color="error">
          {getCompletenessErrorRepairTitle()}
        </Badge>
      </IconButton>
      <Menu
        id="completeness-error-overview-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          key="completeness-error-overview-menu-item"
          onClick={() => {
            navigate(COMPLETENESS_ERROR_PATH);
            handleClose();
          }}
        >
          <Typography>Overview</Typography>
        </MenuItem>
        <Divider />
        {completenessErrorStatusList.map((errorStatus) => {
          const { errorId, errorType, errorCount, errorLocation } = errorStatus;
          return (
            <MenuItem
              key={errorId}
              onClick={() => {
                navigate(`${COMPLETENESS_ERROR_PATH}/${errorLocation}`);
                handleClose();
              }}
            >
              <Panel sx={{ minWidth: '360px', justifyContent: 'space-between' }}>
                <Typography>
                  {getNavigationSubMenuTitle(errorType, getColumnLabel(errorLocation, schema))}
                </Typography>
                <Chip
                  label={errorCount}
                  color="primary"
                  size="small"
                  sx={{ bgcolor: errorCount === 0 ? GREEN : RED }}
                />
              </Panel>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default CompletenessErrorNavMenu;
