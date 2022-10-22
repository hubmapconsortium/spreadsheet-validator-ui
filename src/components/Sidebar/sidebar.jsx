import { useContext, useMemo, useState } from 'react';
import { Box, List, styled } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ConstructionIcon from '@mui/icons-material/Construction';
import NestedMenuItem from '../NestedMenuItem';
import logo from '../../logo.svg';
import Container from '../../styles/Container';
import { OVERVIEW, REPAIR_INCOMPLETENESS, REPAIR_INCONSISTENCY } from '../../constants/PageTitle';
import { REPAIR_INCONSISTENCY_SUBMENU_DATA } from '../../constants/TestData';
import AppContext from '../../pages/AppContext';
import { buildRepairIncompletenessSubMenu } from '../../helpers/data-utils';

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
  const [selectedMenuItem, setSelectedMenuItem] = useState({ OVERVIEW });
  const { errorReport } = useContext(AppContext);
  const getRepairIncompletenessSubMenu = useMemo(
    () => buildRepairIncompletenessSubMenu(errorReport),
    [errorReport],
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
            navigateTo="overview"
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <NestedMenuItem
            icon={<RepairIcon />}
            title={REPAIR_INCOMPLETENESS}
            navigateTo="repair-incompleteness"
            subMenu={getRepairIncompletenessSubMenu}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <NestedMenuItem
            icon={<RepairIcon />}
            title={REPAIR_INCONSISTENCY}
            navigateTo="repair-inconsistency"
            subMenu={REPAIR_INCONSISTENCY_SUBMENU_DATA}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        </NestedMenu>
      </MenuSection>
    </SideBarContainer>
  );
};

export default SideBar;
