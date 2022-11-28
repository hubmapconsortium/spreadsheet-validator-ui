import { useContext, useMemo } from 'react';
import { Grid, styled } from '@mui/material';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairBadge from '../../components/RepairBadge';
import Section from '../../styles/Section';
import { generateErrorSummaryData, generateRepairIncompletenessButtonData } from '../../helpers/app-utils';
import { getIncompletenessReporting } from '../../helpers/data-utils';
import { REPAIR_INCOMPLETENESS } from '../../constants/PageTitle';

const RepairBadgeSection = styled(Section)({
  width: '800px',
  padding: '10px 0 0 50px',
});

const RepairIncompleteness = () => {
  const { appData, patches } = useContext(AppContext);
  const { reporting } = appData;
  const incompletenessReporting = useMemo(
    () => getIncompletenessReporting(reporting),
    [reporting],
  );
  const errorSummaryData = useMemo(
    () => generateErrorSummaryData(incompletenessReporting),
    [incompletenessReporting],
  );
  const buttonData = useMemo(
    () => generateRepairIncompletenessButtonData(errorSummaryData, patches),
    [errorSummaryData, patches],
  );
  const errorSize = incompletenessReporting.length;
  return (
    <>
      <Section>
        <PageTitle
          title={REPAIR_INCOMPLETENESS}
          subtitle={`${errorSize} required values are missing from the metadata records.`}
        />
      </Section>
      <DefaultInfoSection />
      <RepairBadgeSection>
        <Grid container spacing={3}>
          {buttonData.map((data) => (
            <Grid item key={data.errorId} xs={3}>
              <RepairBadge data={data} />
            </Grid>
          ))}
        </Grid>
      </RepairBadgeSection>
    </>
  );
};

export default RepairIncompleteness;
