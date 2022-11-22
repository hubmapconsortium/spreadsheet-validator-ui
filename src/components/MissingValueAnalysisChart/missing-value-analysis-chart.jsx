import { styled, Typography } from '@mui/material';
import Card from '../../styles/Card';
import Section from '../../styles/Section';
import TableStackedBar from '../TableStackedBar';
import { DARK_GRAY } from '../../constants/Color';

const ChartCard = styled(Card)({
  width: '75%',
  justifyContent: 'center',
});

const TitleSection = styled(Section)({
  width: '90%',
  padding: '50px',
});

const ChartSection = styled(Section)({
  width: '90%',
  padding: '0 50px 50px 50px',
});

const Title = styled(Typography)({
  fontSize: '24pt',
  fontWeight: 'bold',
});

const SubTitle = styled(Typography)({
  fontSize: '17pt',
  color: DARK_GRAY,
});

// eslint-disable-next-line react/prop-types
const MissingValueAnalysisChart = ({ analysisData }) => (
  <ChartCard>
    <TitleSection>
      <Title variant="h4">Missing Value Analysis</Title>
      <SubTitle variant="h5">Evaluating 99 metadata rows in the spreadsheet</SubTitle>
    </TitleSection>
    <ChartSection>
      <TableStackedBar data={analysisData} />
    </ChartSection>
  </ChartCard>
);

export default MissingValueAnalysisChart;
