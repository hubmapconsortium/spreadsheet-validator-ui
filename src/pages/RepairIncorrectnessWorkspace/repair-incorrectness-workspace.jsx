import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairIncorrectnessTable from '../../components/RepairTable/RepairIncorrectnessTable';
import Container from '../../styles/Container';
import Section from '../../styles/Section';
import { getAdherenceErrorReportByType } from '../../helpers/data-utils';
import { REPAIR_INCORRECTNESS } from '../../constants/PageTitle';

const RepairIncorrectnessWorkspace = () => {
  const { appData } = useContext(AppContext);
  const { reporting } = appData;
  const { errorType } = useParams();

  const adherenceErrorReport = useMemo(
    () => getAdherenceErrorReportByType(reporting, errorType),
    [reporting, errorType],
  );
  const errorSize = adherenceErrorReport.length;
  return (
    <SnackbarProvider maxSnack={1}>
      <Container>
        <Section>
          <PageTitle
            title={REPAIR_INCORRECTNESS}
            subtitle={`${errorSize} issues were found.`}
          />
        </Section>
        <DefaultInfoSection />
        <RepairIncorrectnessTable
          incorrectnessType={errorType}
          incorrectnessReporting={adherenceErrorReport}
        />
      </Container>
    </SnackbarProvider>
  );
};

export default RepairIncorrectnessWorkspace;
