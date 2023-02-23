import { useContext, useMemo } from 'react';
import { Grid } from '@mui/material';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairBadge from '../../components/RepairBadge';
import Container from '../../styles/Container';
import Card from '../../styles/Card';
import Block from '../../styles/Block';
import Section from '../../styles/Section';
import { generateErrorSummaryReport, generateRepairIncompletenessButtonData } from '../../helpers/app-utils';
import { getIncompletenessReporting } from '../../helpers/data-utils';
import { REPAIR_INCOMPLETENESS } from '../../constants/PageTitle';
import Paragraph from '../../styles/Paragraph';

const RepairIncompleteness = () => {
  const { appData, patches } = useContext(AppContext);
  const { reporting } = appData;
  const incompletenessReporting = useMemo(
    () => getIncompletenessReporting(reporting),
    [reporting],
  );
  const errorSummaryReport = useMemo(
    () => generateErrorSummaryReport(incompletenessReporting),
    [incompletenessReporting],
  );
  const buttonData = useMemo(
    () => generateRepairIncompletenessButtonData(errorSummaryReport, patches),
    [errorSummaryReport, patches],
  );
  const errorSize = incompletenessReporting.length;
  return (
    <Container>
      <Section>
        <PageTitle
          title={REPAIR_INCOMPLETENESS}
          subtitle={`${errorSize} required values are missing from the metadata records.`}
        />
      </Section>
      <DefaultInfoSection />
      <Card>
        <Block sx={{ width: '300px', padding: '20px 60px 20px 20px' }}>
          <Paragraph>
            <b>INSTRUCTION: </b>
            Select the following column name and fill out the missing values on the
            given metadata records. A table will appear once you make the selection to perform
            the repair.
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

export default RepairIncompleteness;
