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
          subtitle={`${errorSize} values are found inconsistent with the metadata specification.`}
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

export default RepairIncorrectness;
