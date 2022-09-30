import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import Section from '../../styles/Section';
import './overview.css';

const Overview = () => {
  const title = 'Validation Result';
  const subtitle = '99 metadata rows were found and validated.';
  return (
    <>
      <Section>
        <PageTitle title={title} subtitle={subtitle} />
      </Section>
      <DefaultInfoSection />
    </>
  );
};

export default Overview;
