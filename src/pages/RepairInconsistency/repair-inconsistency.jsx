import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import Section from '../../styles/Section';
import './repair-inconsistency.css';

const RepairInconsistency = () => {
  const title = 'Repair Inconsistency';
  const subtitle = '48 out of 99 metadata rows were inconsistent.';
  return (
    <>
      <Section>
        <PageTitle title={title} subtitle={subtitle} />
      </Section>
      <DefaultInfoSection />
    </>
  );
};

export default RepairInconsistency;
