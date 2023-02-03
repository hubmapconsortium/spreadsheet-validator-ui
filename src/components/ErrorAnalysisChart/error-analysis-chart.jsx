import { styled } from '@mui/material';
import Card from '../../styles/Card';
import Block from '../../styles/Block';
import Title from '../../styles/Title';
import SubTitle from '../../styles/SubTitle';
import TableStackedBar from '../TableStackedBar';

const TitleBlock = styled(Block)({
  width: '400px',
  padding: '10px 30px 0px 30px',
});

const ChartBlock = styled(Block)({
  width: '100%',
  padding: '10px 30px 20px 20px',
});

// eslint-disable-next-line react/prop-types
const ErrorAnalysisChart = ({ title, subtitle, analysisData }) => (
  <Card>
    <TitleBlock>
      <Title variant="h2">{title}</Title>
      <SubTitle variant="p">{subtitle}</SubTitle>
    </TitleBlock>
    <ChartBlock>
      <TableStackedBar data={analysisData} />
    </ChartBlock>
  </Card>
);

export default ErrorAnalysisChart;
