import { useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Container } from '@mui/material';
import AppContext from '../../pages/AppContext';
import NavMenu from '../NavMenu/nav-menu';
import { generateErrorSummaryReport, generateRepairIncompletenessSubMenuData, generateRepairIncorrectnessSubMenuData } from '../../helpers/app-utils';
import { OVERVIEW, REPAIR_INCOMPLETENESS, REPAIR_INCORRECTNESS } from '../../constants/PageTitle';
import { ADHERENCE_ERROR_OVERVIEW_PATH, COMPLETENESS_ERROR_OVERVIEW_PATH, OVERVIEW_PATH, REPAIR_INCOMPLETENESS_OVERVIEW_PATH, REPAIR_INCORRECTNESS_PATH } from '../../constants/Router';

const Navbar = () => {
  const { appData, patches } = useContext(AppContext);
  const navigate = useNavigate();
  const { schema, reporting } = appData;
  const errorSummaryData = useMemo(
    () => generateErrorSummaryReport(reporting, schema),
    [reporting],
  );
  const repairIncompletenessSubMenus = useMemo(
    () => generateRepairIncompletenessSubMenuData(errorSummaryData, patches),
    [errorSummaryData, patches],
  );
  const repairIncorrectnessSubMenus = useMemo(
    () => generateRepairIncorrectnessSubMenuData(errorSummaryData, patches),
    [errorSummaryData, patches],
  );

  return (
    <AppBar component="nav" position="static">
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
            HuBMAP Metadata Spreadsheet Validator
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="small"
              color="inherit"
              sx={{ marginRight: '10px' }}
              onClick={() => {
                navigate(OVERVIEW_PATH);
              }}
            >
              {OVERVIEW}
            </IconButton>
            <NavMenu
              id="repair-incompleteness-menu"
              title={REPAIR_INCOMPLETENESS}
              navigateTo={COMPLETENESS_ERROR_OVERVIEW_PATH}
              subMenus={repairIncompletenessSubMenus}
            />
            <NavMenu
              id="repair-incorrectness-menu"
              title={REPAIR_INCORRECTNESS}
              navigateTo={ADHERENCE_ERROR_OVERVIEW_PATH}
              subMenus={repairIncorrectnessSubMenus}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
