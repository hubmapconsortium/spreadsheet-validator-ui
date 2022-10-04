// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import CompletenessAndAdherenceChart from '../../components/CompletenessAndAdherenceChart';
import Section from '../../styles/Section';
import { VALIDATION_RESULT } from '../../constants/PageTitle';
import RequiredFieldAnalysisChart from '../../components/RequiredFieldAnalysisChart';
import { GREEN, RED } from '../../constants/Color';
import ValueTypeAnalysisChart from '../../components/ValueTypeAnalysisChart';

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
        completenessData={{
          labels: ['Row has all required value', 'Row missing some required value'],
          innerTextTitle: '70 / 99',
          innerTextSubtitle: 'Completeness',
          datasets: [{
            label: '',
            data: [70, 29],
            backgroundColor: ['#7cd32f', '#da0e4b'],
          }],
        }}
        adherenceData={{
          labels: ['Row has no data type errors', 'Row has some data type error'],
          innerTextTitle: '79 / 99',
          innerTextSubtitle: 'Adherence',
          datasets: [{
            label: '',
            data: [79, 20],
            backgroundColor: ['#7cd32f', '#da0e4b'],
          }],
        }}
      />
      <RequiredFieldAnalysisChart
        analysisData={{
          columns: ['Required field', 'Frequency of error'],
          rows: [
            ['sample_ID', [{ value: 17, color: RED }, { value: 82, color: GREEN }]],
            ['storage_medium', [{ value: 10, color: RED }, { value: 89, color: GREEN }]],
            ['storage_temperature', [{ value: 8, color: RED }, { value: 91, color: GREEN }]],
            ['section_index_number', [{ value: 5, color: RED }, { value: 94, color: GREEN }]],
            ['section_thickness_unit', [{ value: 5, color: RED }, { value: 94, color: GREEN }]],
          ],
        }}
      />
      <ValueTypeAnalysisChart
        analysisData={{
          columns: ['Field name', 'Error flag', 'Frequency of error'],
          rows: [
            ['preparation_medium', 'Value not standard term', [{ value: 23, color: RED }, { value: 76, color: GREEN }]],
            ['processing_time_value', 'Value not number type', [{ value: 20, color: RED }, { value: 79, color: GREEN }]],
            ['storage_medium', 'Value not standard term', [{ value: 10, color: RED }, { value: 89, color: GREEN }]],
            ['section_thickness_unit', 'Value not number type', [{ value: 4, color: RED }, { value: 95, color: GREEN }]],
            ['area_value', 'Value not number type', [{ value: 3, color: RED }, { value: 96, color: GREEN }]],
          ],
        }}
      />
    </>
  );
};

export default Overview;
