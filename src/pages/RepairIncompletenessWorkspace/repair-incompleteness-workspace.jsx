import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairIncompletnessEditor from '../../components/RepairIncompletenessEditor';
import Section from '../../styles/Section';
import { REPAIR_INCOMPLETENESS } from '../../constants/PageTitle';

const countBadRows = (errorReport, inColumn) => (
  errorReport.missingRequired[inColumn]?.length
);

const RepairIncompletenessWorkspace = () => {
  const { errorReport } = useContext(AppContext);
  const { column } = useParams();

  const getBadRows = useMemo(
    () => countBadRows(errorReport, column),
    [errorReport, column],
  );

  const subtitle = `${getBadRows} rows were missing the ${column} value.`;
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
