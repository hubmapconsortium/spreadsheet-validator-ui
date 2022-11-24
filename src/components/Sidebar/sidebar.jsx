import { useContext, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, List, styled } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useHotkeys } from 'react-hotkeys-hook';
import AppContext from '../../pages/AppContext';
import NestedMenuItem from '../NestedMenuItem';
import logo from '../../logo.svg';
import Container from '../../styles/Container';
import { determineOverallRepairStatus, generateErrorSummaryData, generateNewSpreadsheet, generateRepairIncompletenessSubMenuData, generateRepairIncorrectnessSubMenuData } from '../../helpers/app-utils';
import { OVERVIEW, REPAIR_INCOMPLETENESS, REPAIR_INCORRECTNESS } from '../../constants/PageTitle';
import { OVERVIEW_PATH, REPAIR_INCOMPLENESS_PATH, REPAIR_INCORRECTNESS_PATH } from '../../constants/Router';
import { REPAIR_NOT_COMPLETED } from '../../constants/Status';

const SideBarContainer = styled(Container)({
  width: '380px',
});

const LogoSection = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
  width: '340px',
  img: {
    width: '300px',
    marginTop: 'auto',
  },
});

const MenuSection = styled(Box)({
  display: 'flex',
  padding: '0px',
  width: '340px',
});

const ButtonSection = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
  width: '340px',
});

const NestedMenu = styled(List)({
  color: 'rgb(0, 0, 0, 0.60)',
});

const OverviewIcon = styled(VisibilityIcon)({
  verticalAlign: 'middle',
  fontSize: '24pt',
});

const RepairIcon = styled(ConstructionIcon)({
  verticalAlign: 'middle',
  fontSize: '24pt',
});

const SideBar = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const { appData, patches } = useContext(AppContext);
  const { data, reporting } = appData;
  const errorSummaryData = useMemo(
    () => generateErrorSummaryData(reporting),
    [reporting],
  );
  const repairIncompletenessSubMenu = useMemo(
    () => generateRepairIncompletenessSubMenuData(errorSummaryData, patches),
    [errorSummaryData, patches],
  );
  const repairIncorrectnessSubMenu = useMemo(
    () => generateRepairIncorrectnessSubMenuData(errorSummaryData, patches),
    [errorSummaryData, patches],
  );
  useEffect(
    () => {
      const status = determineOverallRepairStatus(reporting, patches);
      setDisabled(status === REPAIR_NOT_COMPLETED);
    },
    [patches],
  );
  useHotkeys(
    ['ctrl+1', 'meta+1'],
    () => {
      navigate(OVERVIEW_PATH, {
        state: {
          selectedMenuItem: OVERVIEW,
        },
      });
    },
    { preventDefault: true },
  );
  useHotkeys(
    ['ctrl+2', 'meta+2'],
    () => {
      navigate(REPAIR_INCOMPLENESS_PATH, {
        state: {
          selectedMenuItem: REPAIR_INCOMPLETENESS,
        },
      });
    },
    { preventDefault: true },
  );
  useHotkeys(
    ['ctrl+3', 'meta+3'],
    () => {
      navigate(REPAIR_INCORRECTNESS_PATH, {
        state: {
          selectedMenuItem: REPAIR_INCORRECTNESS,
        },
      });
    },
    { preventDefault: true },
  );
  return (
    <SideBarContainer>
      <LogoSection>
        <img src={logo} alt="spreadsheet-validator-logo" />
      </LogoSection>
      <MenuSection>
        <NestedMenu>
          <NestedMenuItem
            icon={<OverviewIcon />}
            title={OVERVIEW}
            navigateTo={OVERVIEW_PATH}
          />
          <NestedMenuItem
            icon={<RepairIcon />}
            title={REPAIR_INCOMPLETENESS}
            navigateTo={REPAIR_INCOMPLENESS_PATH}
            subMenu={repairIncompletenessSubMenu}
          />
          <NestedMenuItem
            icon={<RepairIcon />}
            title={REPAIR_INCORRECTNESS}
            navigateTo={REPAIR_INCORRECTNESS_PATH}
            subMenu={repairIncorrectnessSubMenu}
          />
        </NestedMenu>
      </MenuSection>
      <ButtonSection>
        <Button
          variant="contained"
          size="large"
          disabled={disabled}
          onClick={() => {
            const jsonString = generateNewSpreadsheet(data, patches);
            const link = document.createElement('a');
            link.href = jsonString;
            link.download = 'patched.json';
            link.click();
          }}
        >
          Generate New Spreadsheet
        </Button>
      </ButtonSection>
    </SideBarContainer>
  );
};

export default SideBar;
