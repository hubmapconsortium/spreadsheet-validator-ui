import { useContext, useMemo } from 'react';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import ActionButton from '../../components/ActionButton';
import Container from '../../styles/Container';
import Card from '../../styles/Card';
import Block from '../../styles/Block';
import Section from '../../styles/Section';
import { generateErrorSummaryReport, generateCompletenessErrorStatusList } from '../../helpers/app-utils';
import { getColumnLabel, getCompletenessErrorReport } from '../../helpers/data-utils';
import { getActionButtonTitle } from '../../helpers/title-utils';
import { REPAIR_INCOMPLETENESS } from '../../constants/PageTitle';
import Paragraph from '../../styles/Paragraph';

const CompletenessErrorOverview = () => {
  const { appData, patches } = useContext(AppContext);
  const { schema, reporting } = appData;
  const completenessErrorReport = useMemo(
    () => getCompletenessErrorReport(reporting),
    [reporting],
  );
  const errorSummaryReport = useMemo(
    () => generateErrorSummaryReport(completenessErrorReport),
    [completenessErrorReport],
  );
  const errorStatusList = useMemo(
    () => generateCompletenessErrorStatusList(errorSummaryReport, patches),
    [patches],
  );
  const errorSize = completenessErrorReport.length;
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
        <Block sx={{ width: '30%', padding: '20px 40px 20px 20px' }}>
          <Paragraph>
            <b>INSTRUCTION: </b>
            Select the following action item and fill out the missing values on the
            given column name.
          </Paragraph>
        </Block>
        <Block sx={{ width: '80%', padding: '20px 20px 20px 20px' }}>
          {errorStatusList.map((data) => (
            <ActionButton
              title={getActionButtonTitle(data.errorType, getColumnLabel(data.column, schema))}
              errorCount={data.errorCount}
              errorStatus={data.errorStatus}
              navigateTo={data.column}
            />
          ))}
        </Block>
      </Card>
    </Container>
  );
};

export default CompletenessErrorOverview;
