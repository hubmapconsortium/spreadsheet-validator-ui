import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import AdherenceErrorRepairTable from '../../components/RepairTable/AdherenceErrorRepairTable';
import Container from '../../styles/Container';
import Section from '../../styles/Section';
import { getAdherenceErrorReportByType } from '../../helpers/data-utils';
import { getAdherenceErrorRepairTitle, getTotalErrorCountTitle } from '../../helpers/title-utils';
import { generateAdherenceErrorTableData } from '../../helpers/app-utils';

const AdherenceErrorRepair = () => {
  const { appData, patches } = useContext(AppContext);
  const { data, reporting } = appData;
  const { errorType } = useParams();

  const errorReport = useMemo(
    () => getAdherenceErrorReportByType(reporting, errorType),
    [reporting, errorType],
  );
  const tableData = useMemo(
    () => generateAdherenceErrorTableData(errorReport, data, patches),
    [errorReport, patches],
  );

  return (
    <SnackbarProvider maxSnack={1}>
      <Container>
        <Section>
          <PageTitle
            title={getAdherenceErrorRepairTitle()}
            subtitle={getTotalErrorCountTitle(
              errorReport,
              errorType,
            )}
          />
        </Section>
        <AdherenceErrorRepairTable
          errorType={errorType}
          tableData={tableData}
        />
      </Container>
    </SnackbarProvider>
  );
};

export default AdherenceErrorRepair;
