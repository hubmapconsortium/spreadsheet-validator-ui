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
  const { schema, reporting } = appData;
  const incompletenessReporting = useMemo(
    () => getIncompletenessReporting(reporting),
    [reporting],
  );
  const errorSummaryData = useMemo(
    () => generateErrorSummaryData(incompletenessReporting, schema),
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
      <Section sx={{ fontSize: '14pt', width: '65%' }}>
        <b>INSTRUCTION: </b>
        Select a column below and fill out the missing values on the given
        metadata records. A table will appear once you make the selection to perform the repair.
      </Section>
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
