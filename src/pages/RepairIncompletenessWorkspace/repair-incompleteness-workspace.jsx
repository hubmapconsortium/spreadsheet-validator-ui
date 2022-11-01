import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairIncompletnessWorksheet from '../../components/RepairIncompletenessWorksheet';
import Section from '../../styles/Section';
import { REPAIR_INCOMPLETENESS } from '../../constants/PageTitle';

const WorkspaceArea = styled(Box)({
  display: 'block',
});

const RepairIncompletenessWorkspace = () => {
  const { appData } = useContext(AppContext);
  const { reporting } = appData;
  const { column } = useParams();
  const totalBadRows = reporting.missingRequired[column]?.length;
  const subtitle = `${totalBadRows} rows were missing the ${column} value.`;
  return (
    <WorkspaceArea>
      <Section>
        <PageTitle
          title={REPAIR_INCOMPLETENESS}
          subtitle={subtitle}
        />
      </Section>
      <DefaultInfoSection />
      <RepairIncompletnessWorksheet />
    </WorkspaceArea>
  );
};

export default RepairIncompletenessWorkspace;
