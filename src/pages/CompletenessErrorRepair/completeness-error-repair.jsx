import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import CompletenessErrorRepairTable from '../../components/RepairTable/CompletenessErrorRepairTable';
import Container from '../../styles/Container';
import Section from '../../styles/Section';
import { getColumnLabel, getCompletenessErrorReportByColumn } from '../../helpers/data-utils';
import { generateCompletenessErrorTableData } from '../../helpers/app-utils';
import { getCompletenessErrorRepairTitle, getTotalErrorCountTitle } from '../../helpers/title-utils';

const CompletenessErrorRepair = () => {
  const { appData, patches } = useContext(AppContext);
  const { schema, data, reporting } = appData;
  const { targetColumn } = useParams();
  const errorReport = useMemo(
    () => getCompletenessErrorReportByColumn(reporting, targetColumn),
    [reporting, targetColumn],
  );
  const tableData = useMemo(
    () => generateCompletenessErrorTableData(errorReport, data, patches),
    [errorReport, data, patches],
  );
  return (
    <SnackbarProvider maxSnack={1}>
      <Container>
        <Section>
          <PageTitle
            title={getCompletenessErrorRepairTitle()}
            subtitle={getTotalErrorCountTitle(
              errorReport,
              'missingRequired',
              getColumnLabel(targetColumn, schema),
            )}
          />
        </Section>
        <CompletenessErrorRepairTable
          targetColumn={targetColumn}
          tableData={tableData}
        />
      </Container>
    </SnackbarProvider>
  );
};

export default CompletenessErrorRepair;
