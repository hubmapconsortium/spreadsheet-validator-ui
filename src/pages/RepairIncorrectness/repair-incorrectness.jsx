import { useContext, useMemo } from 'react';
import { Grid, styled } from '@mui/material';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairBadge from '../../components/RepairBadge';
import Section from '../../styles/Section';
import { getIncorrectnessReporting } from '../../helpers/data-utils';
import { generateErrorSummaryData, generateRepairIncorrectnessButtonData } from '../../helpers/app-utils';
import { REPAIR_INCORRECTNESS } from '../../constants/PageTitle';

const RepairBadgeSection = styled(Section)({
  width: '800px',
  padding: '10px 0 0 50px',
});

const RepairIncorrectness = () => {
  const { appData, patches } = useContext(AppContext);
  const { reporting } = appData;
  const incorrectnessReporting = useMemo(
    () => getIncorrectnessReporting(reporting),
    [reporting],
  );
  const errorSummaryData = useMemo(
    () => generateErrorSummaryData(incorrectnessReporting),
    [incorrectnessReporting],
  );
  const buttonData = useMemo(
    () => generateRepairIncorrectnessButtonData(errorSummaryData, patches),
    [errorSummaryData, patches],
  );
  const errorSize = incorrectnessReporting.length;
  return (
    <>
      <Section>
        <PageTitle
          title={REPAIR_INCORRECTNESS}
          subtitle={`${errorSize} values are not in accordance with the metadata specification.`}
        />
      </Section>
      <DefaultInfoSection />
      <Section sx={{ fontSize: '14pt', width: '65%' }}>
        <b>INSTRUCTION: </b>
        Select an issue below and fix the data type error on the given metadata records.
        A table will appear once you make the selection to perform the repair.
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

export default RepairIncorrectness;
