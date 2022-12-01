import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairIncorrectnessTable from '../../components/RepairTable/RepairIncorrectnessTable';
import Section from '../../styles/Section';
import { getIncorrectnessReporting } from '../../helpers/data-utils';
import { unCamelCase } from '../../helpers/string-utils';
import { REPAIR_INCORRECTNESS } from '../../constants/PageTitle';

const WorkspaceArea = styled(Box)({
  display: 'block',
});

const RepairIncorrectnessWorkspace = () => {
  const { appData } = useContext(AppContext);
  const { reporting } = appData;
  const { incorrectnessType } = useParams();

  const incorrectnessReporting = useMemo(
    () => getIncorrectnessReporting(reporting).filter(
      (reportItem) => reportItem.errorType === incorrectnessType,
    ),
    [reporting, incorrectnessType],
  );
  const errorType = unCamelCase(incorrectnessType);
  const errorSize = incorrectnessReporting.length;
  return (
    <SnackbarProvider maxSnack={1}>
      <WorkspaceArea>
        <Section>
          <PageTitle
            title={REPAIR_INCORRECTNESS}
            subtitle={`${errorSize} cells contains a value that is ${errorType}.`}
          />
        </Section>
        <DefaultInfoSection />
        <Section sx={{ fontSize: '14pt', width: '90%' }}>
          <b>INSTRUCTION: </b>
          The table below shows all the metadata records that contain values that are
          not according to the metadata specification. Please correct those values using
          the available input field, or using the check box to approve the suggested
          value given by the application.
        </Section>
        <RepairIncorrectnessTable
          incorrectnessType={incorrectnessType}
          incorrectnessReporting={incorrectnessReporting}
        />
      </WorkspaceArea>
    </SnackbarProvider>
  );
};

export default RepairIncorrectnessWorkspace;
