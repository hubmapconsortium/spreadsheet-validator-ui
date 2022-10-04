// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import CompletenessAndAdherenceChart from '../../components/CompletenessAndAdherenceChart';
import RequiredFieldAnalysisChart from '../../components/RequiredFieldAnalysisChart';
import ValueTypeAnalysisChart from '../../components/ValueTypeAnalysisChart';
import Section from '../../styles/Section';
import { VALIDATION_RESULT } from '../../constants/PageTitle';
import { ADHERENCE_CHART_DATA, COMPLETENESS_CHART_DATA, REQUIRED_FIELD_ANALYSIS_CHART_DATA, VALUE_TYPE_ANALYSIS_CHART_DATA } from '../../constants/TestData';

const Overview = () => {
  const subtitle = '99 metadata rows were found and validated.';
  return (
    <>
      <Section>
        <PageTitle
          title={VALIDATION_RESULT}
          subtitle={subtitle}
        />
      </Section>
      <DefaultInfoSection />
      <CompletenessAndAdherenceChart
        completenessData={COMPLETENESS_CHART_DATA}
        adherenceData={ADHERENCE_CHART_DATA}
      />
      <RequiredFieldAnalysisChart
        analysisData={REQUIRED_FIELD_ANALYSIS_CHART_DATA}
      />
      <ValueTypeAnalysisChart
        analysisData={VALUE_TYPE_ANALYSIS_CHART_DATA}
      />
    </>
  );
};

export default Overview;
