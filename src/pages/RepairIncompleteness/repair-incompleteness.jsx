import { useContext, useMemo } from 'react';
import { Grid, styled } from '@mui/material';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairBadge from '../../components/RepairBadge';
import Section from '../../styles/Section';
import { getTotalMissingRequired } from '../../helpers/data-utils';
import { buildRepairIncompletenessBadges } from '../../helpers/app-utils';
import { REPAIR_INCOMPLETENESS } from '../../constants/PageTitle';

const RepairBadgeSection = styled(Section)({
  width: '800px',
  padding: '10px 0 0 50px',
});

const RepairIncompleteness = () => {
  const { appData, patches } = useContext(AppContext);
  const { reporting } = appData;
  const totalMissingRequired = useMemo(
    () => getTotalMissingRequired(reporting),
    [reporting],
  );
  const badges = useMemo(
    () => buildRepairIncompletenessBadges(reporting, patches),
    [patches],
  );
  return (
    <>
      <Section>
        <PageTitle
          title={REPAIR_INCOMPLETENESS}
          subtitle={`${totalMissingRequired} required values are missing from the metadata records.`}
        />
      </Section>
      <DefaultInfoSection />
      <RepairBadgeSection>
        <Grid container spacing={3}>
          {badges.map((badge) => (
            <Grid item xs={3}>
              <RepairBadge data={badge} />
            </Grid>
          ))}
        </Grid>
      </RepairBadgeSection>
    </>
  );
};

export default RepairIncompleteness;
