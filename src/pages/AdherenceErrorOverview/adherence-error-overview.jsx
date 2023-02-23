import { useContext, useMemo } from 'react';
import { Grid } from '@mui/material';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairBadge from '../../components/RepairBadge';
import Container from '../../styles/Container';
import Card from '../../styles/Card';
import Section from '../../styles/Section';
import Block from '../../styles/Block';
import Paragraph from '../../styles/Paragraph';
import { getIncorrectnessReporting } from '../../helpers/data-utils';
import { generateErrorSummaryReport, generateRepairIncorrectnessButtonData } from '../../helpers/app-utils';
import { REPAIR_INCORRECTNESS } from '../../constants/PageTitle';

const AdherenceErrorOverview = () => {
  const { appData, patches } = useContext(AppContext);
  const { reporting } = appData;
  const incorrectnessReporting = useMemo(
    () => getIncorrectnessReporting(reporting),
    [reporting],
  );
  const errorSummaryData = useMemo(
    () => generateErrorSummaryReport(incorrectnessReporting),
    [incorrectnessReporting],
  );
  const buttonData = useMemo(
    () => generateRepairIncorrectnessButtonData(errorSummaryData, patches),
    [errorSummaryData, patches],
  );
  const errorSize = incorrectnessReporting.length;
  return (
    <Container>
      <Section>
        <PageTitle
          title={REPAIR_INCORRECTNESS}
          subtitle={`${errorSize} values are not in accordance with the metadata specification.`}
        />
      </Section>
      <DefaultInfoSection />
      <Card>
        <Block sx={{ width: '300px', padding: '20px 60px 20px 20px' }}>
          <Paragraph>
            <b>INSTRUCTION: </b>
            Select the following issue name and fix the data type error on the given metadata
            records. A table will appear once you make the selection to perform the repair.
          </Paragraph>
        </Block>
        <Block>
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="left"
            width="900px"
          >
            {buttonData.map((data) => (
              <Grid item key={data.errorId} xs={3}>
                <RepairBadge data={data} />
              </Grid>
            ))}
          </Grid>
        </Block>
      </Card>
    </Container>
  );
};

export default AdherenceErrorOverview;
