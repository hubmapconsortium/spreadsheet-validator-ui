import { Box, List, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ConstructionIcon from '@mui/icons-material/Construction';
import NestedMenuItem from '../NestedMenuItem';
import logo from '../../logo.svg';
import Container from '../../styles/Container';
import { ERROR_FOUND, ERROR_NOT_FOUND } from '../../constants/Status';

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
  const navigate = useNavigate();
  const overviewMenu = {
    icon: <OverviewIcon />,
    title: 'Overview',
    onClick: () => navigate('overview'),
  };
  const repairIncompletenessMenu = {
    icon: <RepairIcon />,
    title: 'Repair Incompleteness',
    onClick: () => navigate('repair-incompleteness'),
    subMenu: {
      title: 'Types of Error',
      items: [{
        title: 'Missing Sample_ID',
        status: ERROR_FOUND,
        onClick: () => navigate('overview'),
      },
      {
        title: 'Missing storage_medium',
        status: ERROR_NOT_FOUND,
        onClick: () => navigate('overview'),
      },
      {
        title: 'Missing storage_temperature',
        status: ERROR_FOUND,
        onClick: () => navigate('overview'),
      },
      {
        title: 'Missing section_index_number',
        status: ERROR_FOUND,
        onClick: () => navigate('overview'),
      },
      {
        title: 'Missing section_thickness_unit',
        status: ERROR_FOUND,
        onClick: () => navigate('overview'),
      }],
    },
  };
  const repairInconsistencyMenu = {
    icon: <RepairIcon />,
    title: 'Repair Inconsistency',
    onClick: () => navigate('repair-inconsistency'),
    subMenu: {
      title: 'Types of Error',
      items: [{
        title: 'Value not number type',
        status: ERROR_FOUND,
        onClick: () => navigate('overview'),
      },
      {
        title: 'Value not standard term',
        status: ERROR_NOT_FOUND,
        onClick: () => navigate('overview'),
      }],
    },
  };
  return (
    <Container>
      <LogoSection>
        <img src={logo} alt="spreadsheet-validator-logo" />
      </LogoSection>
      <MenuSection>
        <NestedMenu>
          <NestedMenuItem
            icon={overviewMenu.icon}
            title={overviewMenu.title}
            onClick={overviewMenu.onClick}
          />
          <NestedMenuItem
            icon={repairIncompletenessMenu.icon}
            title={repairIncompletenessMenu.title}
            onClick={repairIncompletenessMenu.onClick}
            subMenu={repairIncompletenessMenu.subMenu}
          />
          <NestedMenuItem
            icon={repairInconsistencyMenu.icon}
            title={repairInconsistencyMenu.title}
            onClick={repairInconsistencyMenu.onClick}
            subMenu={repairInconsistencyMenu.subMenu}
          />
        </NestedMenu>
      </MenuSection>
    </Container>
  );
};

export default SideBar;
