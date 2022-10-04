import { styled, Typography } from '@mui/material';
import { LIGHT_GRAY } from '../../constants/Color';
import Card from '../../styles/Card';
import Section from '../../styles/Section';
import TableStackedBar from '../TableStackedBar';

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
  fontFamily: 'Roboto',
  fontSize: '24pt',
  fontWeight: 'bold',
});

const SubTitle = styled(Typography)({
  fontFamily: 'Roboto',
  fontSize: '17pt',
  color: LIGHT_GRAY,
});

// eslint-disable-next-line react/prop-types
const ValueTypeAnalysisChart = ({ analysisData }) => (
  <ChartCard>
    <TitleSection>
      <Title variant="h4">Value Type Analysis</Title>
      <SubTitle variant="h5">Evaluating 99 metadata rows in the spreadsheet</SubTitle>
    </TitleSection>
    <ChartSection>
      <TableStackedBar data={analysisData} />
    </ChartSection>
  </ChartCard>
);

export default ValueTypeAnalysisChart;
