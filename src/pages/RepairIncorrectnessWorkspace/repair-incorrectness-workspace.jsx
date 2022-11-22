import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairIncorrectnessTable from '../../components/RepairIncorrectnessTable';
import Section from '../../styles/Section';
import { REPAIR_INCORRECTNESS } from '../../constants/PageTitle';

const WorkspaceArea = styled(Box)({
  display: 'block',
});

const unCamelCase = (str) => str
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
  .toLowerCase();

const RepairIncorrectnessWorkspace = () => {
  const { appData } = useContext(AppContext);
  const { reporting } = appData;
  const { incorrectnessType } = useParams();
  const badColumns = Object.keys(reporting[incorrectnessType]);
  const badRows = badColumns.map((column) => reporting[incorrectnessType][column]);
  const totalBadCells = badRows.flat(1).length;
  const subtitle = `${totalBadCells} cells contains a value that is ${unCamelCase(incorrectnessType)}.`;
  return (
    <SnackbarProvider maxSnack={1}>
      <WorkspaceArea>
        <Section>
          <PageTitle
            title={REPAIR_INCORRECTNESS}
            subtitle={subtitle}
          />
        </Section>
        <DefaultInfoSection />
        <RepairIncorrectnessTable incorrectnessType={incorrectnessType} />
      </WorkspaceArea>
    </SnackbarProvider>
  );
};

export default RepairIncorrectnessWorkspace;
