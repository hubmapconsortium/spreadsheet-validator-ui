import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Card from '../../styles/Card';
import Block from '../../styles/Block';
import Title from '../../styles/Title';
import Paragraph from '../../styles/Paragraph';
import BaseButton from '../../styles/BaseButton';
import { COMPLETENESS_ERROR_PATH, ADHERENCE_ERROR_PATH } from '../../constants/Router';

const ChartBlock = styled(Block)({
  width: '420px',
  height: '420px',
  padding: '10px 20px 10px 40px',
});

const DescriptionBlock = styled(Block)({
  fontSize: '13pt',
  padding: '10px 40px 10px 40px',
  minWidth: '200px',
});

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const generatePlugins = (data) => [{
  beforeDraw(chart) {
    const { width, height, ctx } = chart;
    const fontSize = (height / 200).toFixed(2);
    ctx.restore();
    ctx.font = `${1.1 * fontSize}em Helvetica`; // Title font
    const textTitle = numberWithCommas(data.innerTextTitle);
    const textTitleX = Math.round((width - ctx.measureText(textTitle).width) / 2);
    const textTitleY = (height / 2) - 45;
    ctx.fillText(textTitle, textTitleX, textTitleY);
    ctx.font = `${0.70 * fontSize}em Helvetica`; // Subtitle font
    const textSubtitle = data.innerTextSubtitle;
    const textSubtitleX = Math.round((width - ctx.measureText(textSubtitle).width) / 2);
    const textSubtitleY = (height / 2);
    ctx.fillText(textSubtitle, textSubtitleX, textSubtitleY);
    ctx.save();
  },
}];

const chartOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { size: 15 },
      },
      title: {
        display: true,
        padding: 0,
      },
    },
  },
  cutout: '65%',
};

const EvaluationSummaryChart = ({ evaluationSummaryData }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <ChartBlock>
        <Doughnut
          data={evaluationSummaryData}
          plugins={generatePlugins(evaluationSummaryData)}
          options={chartOptions}
          width={400}
          height={400}
        />
      </ChartBlock>
      <DescriptionBlock>
        <Block>
          <Title variant="h2" sx={{ paddingBottom: '40px' }}>Validation Summary</Title>
          <Paragraph>
            The validity of a metadata record is measured by two metrics:
            {' '}
            <i>completeness</i>
            {' '}
            and
            {' '}
            <i>adherence.</i>
          </Paragraph>
          <Paragraph>
            <b>Completeness</b>
            {' '}
            measures the presence of all required values in the
            metadata record defined by the metadata specification.
          </Paragraph>
          <Paragraph>
            <b>Adherence</b>
            {' '}
            measures the conformance of the stated value in the
            metadata field to the data type defined by the metadata
            specification.
          </Paragraph>
          <Paragraph>
            A metadata record is called invalid when errors were found
            in its value using these two metrics.
          </Paragraph>
        </Block>
        <Block textAlign="center" sx={{ paddingTop: '30px' }}>
          <BaseButton
            sx={{ width: '310px' }}
            variant="contained"
            disabled={!evaluationSummaryData.hasCompletenessErrors}
            onClick={() => navigate(`../${COMPLETENESS_ERROR_PATH}`, {
              state: {
                selectedMenuItem: 'repair-missing-values',
              },
            })}
          >
            Repair Completeness Errors
          </BaseButton>
          <BaseButton
            sx={{ width: '310px' }}
            variant="contained"
            disabled={!evaluationSummaryData.hasAdherenceErrors}
            onClick={() => navigate(`../${ADHERENCE_ERROR_PATH}`, {
              state: {
                selectedMenuItem: 'repair-invalid-value-types',
              },
            })}
          >
            Repair Adherence Errors
          </BaseButton>
        </Block>
      </DescriptionBlock>
    </Card>
  );
};

EvaluationSummaryChart.propTypes = {
  evaluationSummaryData: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    innerTextTitle: PropTypes.string.isRequired,
    innerTextSubtitle: PropTypes.string.isRequired,
    datasets: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
      backgroundColor: PropTypes.arrayOf(PropTypes.string).isRequired,
    })),
    hasCompletenessErrors: PropTypes.bool.isRequired,
    hasAdherenceErrors: PropTypes.bool.isRequired,
  }).isRequired,
};

export default EvaluationSummaryChart;
