import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import CompletenessErrorRepairTable from '../../components/RepairTable/CompletenessErrorRepairTable';
import Container from '../../styles/Container';
import Section from '../../styles/Section';
import { getCompletenessErrorReportByColumn } from '../../helpers/data-utils';
import { getCompletenessErrorRepairTitle, getTotalErrorCountTitle } from '../../helpers/title-utils';

const CompletenessErrorRepair = () => {
  const { appData } = useContext(AppContext);
  const { reporting } = appData;
  const { targetColumn } = useParams();
  const completenessErrorReport = useMemo(
    () => getCompletenessErrorReportByColumn(reporting, targetColumn),
    [reporting, targetColumn],
  );
  return (
    <SnackbarProvider maxSnack={1}>
      <Container>
        <Section>
          <PageTitle
            title={getCompletenessErrorRepairTitle()}
            subtitle={getTotalErrorCountTitle(completenessErrorReport)}
          />
        </Section>
        <DefaultInfoSection />
        <CompletenessErrorRepairTable
          targetColumn={targetColumn}
          errorReport={completenessErrorReport}
        />
      </Container>
    </SnackbarProvider>
  );
};

export default CompletenessErrorRepair;
