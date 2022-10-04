import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import Section from '../../styles/Section';

const RepairIncompleteness = () => {
  const title = 'Repair Incompleteness';
  const subtitle = '12 out of 99 metadata rows were incomplete.';
  return (
    <>
      <Section>
        <PageTitle title={title} subtitle={subtitle} />
      </Section>
      <DefaultInfoSection />
    </>
  );
};

export default RepairIncompleteness;
