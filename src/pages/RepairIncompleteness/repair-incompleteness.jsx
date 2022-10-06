import { Grid, styled } from '@mui/material';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairBadge from '../../components/RepairBadge';
import Section from '../../styles/Section';
import { REPAIR_INCOMPLETENESS } from '../../constants/PageTitle';
import { REPAIR_INCOMPLETENESS_BADGE_DATA } from '../../constants/TestData';

const RepairBadgeSection = styled(Section)({
  width: '800px',
  padding: '10px 0 0 50px',
});

const provideData = () => (REPAIR_INCOMPLETENESS_BADGE_DATA);

const RepairIncompleteness = () => {
  const subtitle = '12 out of 99 metadata rows were incomplete.';
  const badgeData = provideData();
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
          {badgeData.items.map((data) => (
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
