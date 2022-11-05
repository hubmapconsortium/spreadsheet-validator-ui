import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairInconsistencyWorksheet from '../../components/RepairInconsistencyWorksheet';
import Section from '../../styles/Section';
import { REPAIR_INCONSISTENCY } from '../../constants/PageTitle';

const WorkspaceArea = styled(Box)({
  display: 'block',
});

const unCamelCase = (str) => str
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
  .toLowerCase();

const RepairInconsistencyWorkspace = () => {
  const { appData } = useContext(AppContext);
  const { reporting } = appData;
  const { inconsistencyType } = useParams();
  const badColumns = Object.keys(reporting[inconsistencyType]);
  const badRows = badColumns.map((column) => reporting[inconsistencyType][column]);
  const totalBadCells = badRows.flat(1).length;
  const subtitle = `${totalBadCells} cells contains a value that is ${unCamelCase(inconsistencyType)}.`;
  return (
    <WorkspaceArea>
      <Section>
        <PageTitle
          title={REPAIR_INCONSISTENCY}
          subtitle={subtitle}
        />
      </Section>
      <DefaultInfoSection />
      <RepairInconsistencyWorksheet />
    </WorkspaceArea>
  );
};

export default RepairInconsistencyWorkspace;
