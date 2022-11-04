import { useContext, useMemo } from 'react';
import { Grid, styled } from '@mui/material';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairBadge from '../../components/RepairBadge';
import Section from '../../styles/Section';
import { buildRepairIncompletenessBadges } from '../../helpers/app-utils';
import { REPAIR_INCOMPLETENESS } from '../../constants/PageTitle';

const RepairBadgeSection = styled(Section)({
  width: '800px',
  padding: '10px 0 0 50px',
});

const RepairIncompleteness = () => {
  const { appData, patches } = useContext(AppContext);
  const { reporting } = appData;
  const subtitle = '12 out of 99 metadata rows were incomplete.';
  const badgeData = useMemo(
    () => buildRepairIncompletenessBadges(reporting, patches),
    [reporting],
  );
  return (
    <>
      <Section>
        <PageTitle
          title={REPAIR_INCOMPLETENESS}
          subtitle={subtitle}
        />
      </Section>
      <DefaultInfoSection />
      <RepairBadgeSection>
        <Grid container spacing={3}>
          {badgeData.map((data) => (
            <Grid item xs={3}>
              <RepairBadge data={data} />
            </Grid>
          ))}
        </Grid>
      </RepairBadgeSection>
    </>
  );
};

export default RepairIncompleteness;
