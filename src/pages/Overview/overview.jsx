// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import ErrorOverviewChart from '../../components/ErrorOverviewChart';
import MissingValueAnalysisChart from '../../components/MissingValueAnalysisChart';
import InvalidValueAnalysisChart from '../../components/InvalidValueAnaysisChart';
import Section from '../../styles/Section';
import { VALIDATION_RESULT } from '../../constants/PageTitle';
import { ADHERENCE_CHART_DATA, COMPLETENESS_CHART_DATA, REQUIRED_FIELD_ANALYSIS_CHART_DATA, VALUE_TYPE_ANALYSIS_CHART_DATA } from '../../constants/TestData';

const Overview = () => {
  const subtitle = '99 metadata records were found and validated.';
  return (
    <>
      <Section>
        <PageTitle
          title={VALIDATION_RESULT}
          subtitle={subtitle}
        />
      </Section>
      <DefaultInfoSection />
      <ErrorOverviewChart
        completenessData={COMPLETENESS_CHART_DATA}
        correctnessData={ADHERENCE_CHART_DATA}
      />
      <MissingValueAnalysisChart
        analysisData={REQUIRED_FIELD_ANALYSIS_CHART_DATA}
      />
      <InvalidValueAnalysisChart
        analysisData={VALUE_TYPE_ANALYSIS_CHART_DATA}
      />
    </>
  );
};

export default Overview;
