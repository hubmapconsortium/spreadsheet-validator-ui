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
  const { schema, data, reporting } = appData;
  const evaluationSummaryData = useMemo(
    () => generateEvaluationSummaryData(data, reporting),
    [reporting],
  );
  const errorSummaryData = useMemo(
    () => generateErrorSummaryData(reporting, schema),
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
          subtitle={`${data.length} metadata records were found in the spreadsheet.`}
        />
      </Section>
      <DefaultInfoSection />
      <EvaluationSummaryChart
        evaluationSummaryData={evaluationSummaryData}
      />
      <ErrorAnalysisChart
        title="Analysis: Missing Values"
        subtitle={`Evaluating ${data.length} metadata records for missing values in the spreadsheet.`}
        analysisData={missingValueAnalysisChartData}
      />
      <ErrorAnalysisChart
        title="Analysis: Invalid Value Types"
        subtitle={`Evaluating ${data.length} metadata records for invalid value types in the spreadsheet.`}
        analysisData={invalidValueTypeAnalysisChartData}
      />
    </>
  );
};

export default Overview;
