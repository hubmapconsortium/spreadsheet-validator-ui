import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairIncompletnessEditor from '../../components/RepairIncompletenessEditor';
import Section from '../../styles/Section';
import { REPAIR_INCOMPLETENESS } from '../../constants/PageTitle';

const RepairIncompletenessWorkspace = () => {
  const subtitle = '17 rows were missing sample_ID.';
  return (
    <>
      <Section>
        <PageTitle
          title={REPAIR_INCOMPLETENESS}
          subtitle={subtitle}
        />
      </Section>
      <DefaultInfoSection />
      <RepairIncompletnessEditor />
    </>
  );
};

export default RepairIncompletenessWorkspace;
