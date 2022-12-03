import { useContext, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import EvaluationSummaryChart from '../../components/EvaluationSummaryChart/evaluation-summary-chart';
import ErrorAnalysisChart from '../../components/ErrorAnalysisChart';
import Section from '../../styles/Section';
import { generateErrorSummaryData, generateEvaluationSummaryData, generateInvalidValueTypeAnalysisChartData, generateMissingValueAnalysisChartData } from '../../helpers/app-utils';
import { VALIDATION_RESULT } from '../../constants/PageTitle';

const Overview = () => {
  const { appData } = useContext(AppContext);
  const { data, reporting } = appData;
  const evaluationSummaryData = useMemo(
    () => generateEvaluationSummaryData(data, reporting),
    [reporting],
  );
  const errorSummaryData = useMemo(
    () => generateErrorSummaryData(reporting),
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
    <>
      <Section>
        <PageTitle
          title={VALIDATION_RESULT}
          subtitle={`${data.length} metadata records were found and validated.`}
        />
      </Section>
      <DefaultInfoSection />
      <EvaluationSummaryChart
        evaluationSummaryData={evaluationSummaryData}
      />
      <ErrorAnalysisChart
        title="Missing Value Analysis"
        subtitle={`Evaluating ${data.length} metadata records in the spreadsheet`}
        analysisData={missingValueAnalysisChartData}
      />
      <ErrorAnalysisChart
        title="Invalid Value Type Analysis"
        subtitle={`Evaluating ${data.length} metadata records in the spreadsheet`}
        analysisData={invalidValueTypeAnalysisChartData}
      />
    </>
  );
};

export default Overview;
