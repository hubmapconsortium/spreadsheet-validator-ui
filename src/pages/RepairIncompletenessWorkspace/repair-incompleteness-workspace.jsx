import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairIncompletnessTable from '../../components/RepairIncompletenessTable';
import Section from '../../styles/Section';
import { REPAIR_INCOMPLETENESS } from '../../constants/PageTitle';

const WorkspaceArea = styled(Box)({
  display: 'block',
});

const RepairIncompletenessWorkspace = () => {
  const { appData } = useContext(AppContext);
  const { reporting } = appData;
  const { incompleteColumn } = useParams();
  const totalBadRows = reporting.missingRequired[incompleteColumn]?.length;
  const subtitle = `${totalBadRows} rows were missing the ${incompleteColumn} value.`;
  return (
    <SnackbarProvider maxSnack={1}>
      <WorkspaceArea>
        <Section>
          <PageTitle
            title={REPAIR_INCOMPLETENESS}
            subtitle={subtitle}
          />
        </Section>
        <DefaultInfoSection />
        <RepairIncompletnessTable incompleteColumn={incompleteColumn} />
      </WorkspaceArea>
    </SnackbarProvider>
  );
};

export default RepairIncompletenessWorkspace;
