import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairIncompletnessTable from '../../components/RepairTable/RepairIncompletenessTable';
import Section from '../../styles/Section';
import { REPAIR_INCOMPLETENESS } from '../../constants/PageTitle';
import { getIncompletenessReporting } from '../../helpers/data-utils';

const WorkspaceArea = styled(Box)({
  display: 'block',
});

const RepairIncompletenessWorkspace = () => {
  const { appData } = useContext(AppContext);
  const { reporting } = appData;
  const { targetColumn } = useParams();
  const incompletenessReporting = useMemo(
    () => getIncompletenessReporting(reporting).filter(
      (reportItem) => reportItem.column === targetColumn,
    ),
    [reporting, targetColumn],
  );
  const errorSize = incompletenessReporting.length;
  return (
    <SnackbarProvider maxSnack={1}>
      <WorkspaceArea>
        <Section>
          <PageTitle
            title={REPAIR_INCOMPLETENESS}
            subtitle={`${errorSize} issues were found.`}
          />
        </Section>
        <DefaultInfoSection />
        <RepairIncompletnessTable
          targetColumn={targetColumn}
          incompletenessReporting={incompletenessReporting}
        />
      </WorkspaceArea>
    </SnackbarProvider>
  );
};

export default RepairIncompletenessWorkspace;
