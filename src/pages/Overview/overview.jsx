// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import CompletenessAndAdherenceChart from '../../components/CompletenessAndAdherenceChart';
import Section from '../../styles/Section';
import { VALIDATION_RESULT } from '../../constants/PageTitle';

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
    </>
  );
};

export default Overview;
