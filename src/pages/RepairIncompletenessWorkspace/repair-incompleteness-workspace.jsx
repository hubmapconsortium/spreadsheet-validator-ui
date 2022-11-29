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
            subtitle={`${errorSize} rows were missing the ${targetColumn} value.`}
          />
        </Section>
        <DefaultInfoSection />
        <Section sx={{ fontSize: '14pt', width: '90%' }}>
          <b>INSTRUCTION: </b>
          The table below shows all the metadata records with missing values on
          {' '}
          <i>{targetColumn}</i>
          {' '}
          values which is a mandatory entry. Please fill out the missing value
          using the input field on each metadata record, or using the table header
          input field to enter in a batch mode.
        </Section>
        <RepairIncompletnessTable
          targetColumn={targetColumn}
          incompletenessReporting={incompletenessReporting}
        />
      </WorkspaceArea>
    </SnackbarProvider>
  );
};

export default RepairIncompletenessWorkspace;
