import { useContext, useMemo } from 'react';
import { Box, List, styled } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ConstructionIcon from '@mui/icons-material/Construction';
import NestedMenuItem from '../NestedMenuItem';
import logo from '../../logo.svg';
import Container from '../../styles/Container';
import { OVERVIEW, REPAIR_INCOMPLETENESS, REPAIR_INCONSISTENCY } from '../../constants/PageTitle';
import { REPAIR_INCONSISTENCY_SUBMENU_DATA } from '../../constants/TestData';
import AppContext from '../../pages/AppContext';
import { ERROR_FOUND } from '../../constants/Status';

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

const buildRepairIncompletenessSubMenu = (errorReport) => {
  const subMenuItems = Object.keys(errorReport.missingRequired).map((column) => (
    {
      title: `Missing ${column}`,
      status: ERROR_FOUND,
      navigateTo: `repair-incompleteness/${column}`,
    }
  ));
  return {
    title: 'Types of Error',
    items: subMenuItems,
  };
};

const SideBar = () => {
  const { errorReport } = useContext(AppContext);
  const getRepairIncompletenessSubMenu = useMemo(
    () => buildRepairIncompletenessSubMenu(errorReport),
    [errorReport],
  );
  return (
    <Container>
      <LogoSection>
        <img src={logo} alt="spreadsheet-validator-logo" />
      </LogoSection>
      <MenuSection>
        <NestedMenu>
          <NestedMenuItem
            icon={<OverviewIcon />}
            title={OVERVIEW}
            navigateTo="overview"
          />
          <NestedMenuItem
            icon={<RepairIcon />}
            title={REPAIR_INCOMPLETENESS}
            navigateTo="repair-incompleteness"
            subMenu={getRepairIncompletenessSubMenu}
          />
          <NestedMenuItem
            icon={<RepairIcon />}
            title={REPAIR_INCONSISTENCY}
            navigateTo="repair-inconsistency"
            subMenu={REPAIR_INCONSISTENCY_SUBMENU_DATA}
          />
        </NestedMenu>
      </MenuSection>
    </Container>
  );
};

export default SideBar;
