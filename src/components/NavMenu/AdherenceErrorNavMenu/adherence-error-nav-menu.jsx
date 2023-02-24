import { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Badge, Menu, MenuItem, Chip, Divider, Typography } from '@mui/material';
import AppContext from '../../../pages/AppContext';
import Panel from '../../../styles/Panel';
import { add } from '../../../helpers/array-utils';
import { getAdherenceErrorRepairTitle, getNavigationSubMenuTitle } from '../../../helpers/title-utils';
import { GREEN, RED } from '../../../constants/Color';
import { ADHERENCE_ERROR_PATH } from '../../../constants/Router';
import { generateAdherenceErrorStatusList, generateErrorSummaryReport } from '../../../helpers/app-utils';

const AdherenceErrorNavMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { appData, patches } = useContext(AppContext);
  const { schema, reporting } = appData;

  const errorSummaryData = useMemo(
    () => generateErrorSummaryReport(reporting, schema),
    [reporting],
  );
  const adherenceErrorStatusList = useMemo(
    () => generateAdherenceErrorStatusList(errorSummaryData, patches),
    [errorSummaryData, patches],
  );

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalErrorRemaining = adherenceErrorStatusList
    .map((errorStatus) => errorStatus.errorCount)
    .reduce(add, 0);

  return (
    <>
      <IconButton
        key="icon-button-adherence-error"
        size="small"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ marginRight: '10px' }}
      >
        <Badge badgeContent={totalErrorRemaining} color="error">
          {getAdherenceErrorRepairTitle()}
        </Badge>
      </IconButton>
      <Menu
        id="adherence-error-overview-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          key="adherence-error-overview-item"
          onClick={() => {
            navigate(ADHERENCE_ERROR_PATH);
          }}
        >
          <Typography>Overview</Typography>
        </MenuItem>
        <Divider />
        {adherenceErrorStatusList.map((errorStatus) => {
          const { errorId, errorType, errorCount } = errorStatus;
          return (
            <MenuItem
              key={errorId}
              onClick={() => navigate(`${ADHERENCE_ERROR_PATH}/${errorType}`)}
            >
              <Panel sx={{ minWidth: '275px', justifyContent: 'space-between' }}>
                <Typography>{getNavigationSubMenuTitle(errorType)}</Typography>
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

export default AdherenceErrorNavMenu;
