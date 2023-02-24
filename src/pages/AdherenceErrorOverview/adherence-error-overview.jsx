import { useContext, useMemo } from 'react';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import ActionButton from '../../components/ActionButton';
import Container from '../../styles/Container';
import Card from '../../styles/Card';
import Section from '../../styles/Section';
import Block from '../../styles/Block';
import Paragraph from '../../styles/Paragraph';
import { getAdherenceErrorReport } from '../../helpers/data-utils';
import { generateErrorSummaryReport, generateAdherenceErrorStatusList } from '../../helpers/app-utils';
import { getActionButtonTitle, getAdherenceErrorRepairTitle } from '../../helpers/title-utils';

const AdherenceErrorOverview = () => {
  const { appData, patches } = useContext(AppContext);
  const { reporting } = appData;
  const adherenceErrorReport = useMemo(
    () => getAdherenceErrorReport(reporting),
    [reporting],
  );
  const errorSummaryReport = useMemo(
    () => generateErrorSummaryReport(adherenceErrorReport),
    [adherenceErrorReport],
  );
  const errorStatusList = useMemo(
    () => generateAdherenceErrorStatusList(errorSummaryReport, patches),
    [patches],
  );
  const errorSize = adherenceErrorReport.length;
  return (
    <Container>
      <Section>
        <PageTitle
          title={getAdherenceErrorRepairTitle()}
          subtitle={`${errorSize} values are not in accordance with the metadata specification.`}
        />
      </Section>
      <DefaultInfoSection />
      <Card>
        <Block sx={{ width: '30%', padding: '20px 40px 20px 20px' }}>
          <Paragraph>
            <b>INSTRUCTION: </b>
            Select the following action item and fix the data input error on the given metadata
            records.
          </Paragraph>
        </Block>
        <Block sx={{ width: '80%', padding: '20px 20px 20px 20px' }}>
          {errorStatusList.map((data) => (
            <ActionButton
              key={`action-button-${data.errorId}`}
              title={getActionButtonTitle(data.errorType)}
              errorCount={data.errorCount}
              navigateTo={data.errorType}
            />
          ))}
        </Block>
      </Card>
    </Container>
  );
};

export default AdherenceErrorOverview;
