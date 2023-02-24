import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import AdherenceErrorRepairTable from '../../components/RepairTable/AdherenceErrorRepairTable';
import Container from '../../styles/Container';
import Section from '../../styles/Section';
import { getAdherenceErrorReportByType } from '../../helpers/data-utils';
import { getAdherenceErrorRepairTitle } from '../../helpers/title-utils';

const AdherenceErrorRepair = () => {
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
            title={getAdherenceErrorRepairTitle()}
            subtitle={`${errorSize} issues were found.`}
          />
        </Section>
        <DefaultInfoSection />
        <AdherenceErrorRepairTable
          errorType={errorType}
          errorReport={adherenceErrorReport}
        />
      </Container>
    </SnackbarProvider>
  );
};

export default AdherenceErrorRepair;
