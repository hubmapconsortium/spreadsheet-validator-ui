import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import Section from '../../styles/Section';
import { REPAIR_INCONSISTENCY } from '../../constants/PageTitle';

const RepairInconsistency = () => {
  const subtitle = '48 out of 99 metadata rows were inconsistent.';
  return (
    <>
      <Section>
        <PageTitle
          title={REPAIR_INCONSISTENCY}
          subtitle={subtitle}
        />
      </Section>
      <DefaultInfoSection />
    </>
  );
};

export default RepairInconsistency;
