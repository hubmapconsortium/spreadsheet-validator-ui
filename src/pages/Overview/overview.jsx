import { useContext, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import EvaluationSummaryChart from '../../components/EvaluationSummaryChart/evaluation-summary-chart';
import ErrorAnalysisChart from '../../components/ErrorAnalysisChart';
import Container from '../../styles/Container';
import Section from '../../styles/Section';
import { generateErrorSummaryReport, generateEvaluationSummaryData, generateInvalidValueTypeAnalysisChartData, generateMissingValueAnalysisChartData } from '../../helpers/app-utils';
import { getValidationResultTitle } from '../../helpers/title-utils';

const Overview = () => {
  const { appData } = useContext(AppContext);
  const { data, reporting } = appData;
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
      <DefaultInfoSection />
      <Section>
        <EvaluationSummaryChart evaluationSummaryData={evaluationSummaryData} />
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
