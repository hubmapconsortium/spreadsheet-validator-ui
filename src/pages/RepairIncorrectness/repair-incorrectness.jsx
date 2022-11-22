import { useContext, useMemo } from 'react';
import { Grid, styled } from '@mui/material';
import AppContext from '../AppContext';
import PageTitle from '../../components/PageTitle';
import DefaultInfoSection from '../../components/DefaultInfoSection';
import RepairBadge from '../../components/RepairBadge';
import Section from '../../styles/Section';
import { getTotalIncorrectness } from '../../helpers/data-utils';
import { buildRepairIncorrectnessBadges } from '../../helpers/app-utils';
import { REPAIR_INCORRECTNESS } from '../../constants/PageTitle';

const RepairBadgeSection = styled(Section)({
  width: '800px',
  padding: '10px 0 0 50px',
});

const RepairIncorrectness = () => {
  const { appData, patches } = useContext(AppContext);
  const { reporting } = appData;
  const totalIncorrectness = useMemo(
    () => getTotalIncorrectness(reporting),
    [reporting],
  );
  const badgeData = useMemo(
    () => buildRepairIncorrectnessBadges(reporting, patches),
    [patches],
  );
  return (
    <>
      <Section>
        <PageTitle
          title={REPAIR_INCORRECTNESS}
          subtitle={`${totalIncorrectness} values are found inconsistent with the metadata specification.`}
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

export default RepairIncorrectness;
