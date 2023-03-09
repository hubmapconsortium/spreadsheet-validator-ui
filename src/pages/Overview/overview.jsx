import { useContext, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import EvaluationSummaryChart from '../../components/EvaluationSummaryChart/evaluation-summary-chart';
import ErrorAnalysisChart from '../../components/ErrorAnalysisChart';
import InfoBox from '../../components/InfoBox/info-box';
import Container from '../../styles/Container';
import Section from '../../styles/Section';
import { generateErrorSummaryReport, generateEvaluationSummaryData, generateInvalidValueTypeAnalysisChartData, generateMissingValueAnalysisChartData } from '../../helpers/app-utils';
import { getValidationResultTitle } from '../../helpers/title-utils';
import { CEDAR_TEMPLATE_IRI, CEDAR_TEMPLATE_NAME, CEDAR_TEMPLATE_VERSION } from '../../constants/Sheet';

const Overview = () => {
  const { appData } = useContext(AppContext);
  const { data, reporting, otherProps } = appData;
  const { fileMetadata, templateMetadata } = otherProps;
  const inputFileName = fileMetadata.name;
  const templateName = `${templateMetadata[CEDAR_TEMPLATE_NAME]} ${templateMetadata[CEDAR_TEMPLATE_VERSION]}`;
  const templateUrl = `https://openview.metadatacenter.org/templates/${encodeURIComponent(templateMetadata[CEDAR_TEMPLATE_IRI])}`;

  const evaluationSummaryData = useMemo(
    () => generateEvaluationSummaryData(data, reporting),
    [reporting],
  );
  const errorSummaryData = useMemo(
    () => generateErrorSummaryReport(reporting),
    [reporting],
  );
  const missingValueAnalysisChartData = useMemo(
    () => generateMissingValueAnalysisChartData(data, errorSummaryData),
    [errorSummaryData],
  );
  const invalidValueTypeAnalysisChartData = useMemo(
    () => generateInvalidValueTypeAnalysisChartData(data, errorSummaryData),
    [errorSummaryData],
  );
  return (
    <Container>
      <Section>
        <PageTitle
          title={getValidationResultTitle()}
          subtitle={`${data.length} metadata records were found in the spreadsheet.`}
        />
      </Section>
      <Section>
        <EvaluationSummaryChart evaluationSummaryData={evaluationSummaryData} />
      </Section>
      <Section>
        <InfoBox
          inputFileName={inputFileName}
          templateName={templateName}
          templateUrl={templateUrl}
        />
      </Section>
      <Section>
        <ErrorAnalysisChart
          title="Completeness Error Analysis"
          subtitle={`Evaluating ${data.length} metadata records for detecting missing values in the spreadsheet.`}
          analysisData={missingValueAnalysisChartData}
        />
      </Section>
      <Section>
        <ErrorAnalysisChart
          title="Adherence Error Analysis"
          subtitle={`Evaluating ${data.length} metadata records for detecting invalid value types in the spreadsheet.`}
          analysisData={invalidValueTypeAnalysisChartData}
        />
      </Section>
    </Container>
  );
};

export default Overview;
