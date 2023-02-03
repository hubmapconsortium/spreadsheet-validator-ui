import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairIncorrectnessTable from '../../components/RepairTable/RepairIncorrectnessTable';
import Container from '../../styles/Container';
import Section from '../../styles/Section';
import { getIncorrectnessReporting } from '../../helpers/data-utils';
import { REPAIR_INCORRECTNESS } from '../../constants/PageTitle';

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
  const errorSize = incorrectnessReporting.length;
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
          incorrectnessType={incorrectnessType}
          incorrectnessReporting={incorrectnessReporting}
        />
      </Container>
    </SnackbarProvider>
  );
};

export default RepairIncorrectnessWorkspace;
