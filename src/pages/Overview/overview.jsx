import { useContext, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import ErrorOverviewChart from '../../components/ErrorOverviewChart';
import ErrorAnalysisChart from '../../components/ErrorAnalysisChart';
import Section from '../../styles/Section';
import { generateCompletenessChartData, generateCorrectnessChartData, generateErrorSummaryData, generateInvalidValueTypeAnalysisChartData, generateMissingValueAnalysisChartData } from '../../helpers/app-utils';
import { VALIDATION_RESULT } from '../../constants/PageTitle';

const Overview = () => {
  const { appData } = useContext(AppContext);
  const { data, reporting } = appData;
  const completenessChartData = useMemo(
    () => generateCompletenessChartData(data, reporting),
    [reporting],
  );
  const correctnessChartData = useMemo(
    () => generateCorrectnessChartData(data, reporting),
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
      <ErrorOverviewChart
        completenessData={completenessChartData}
        correctnessData={correctnessChartData}
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
