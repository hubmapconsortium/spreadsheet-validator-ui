import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Section from '../../styles/Section';
import Card from '../../styles/Card';
import BaseButton from '../../styles/BaseButton';
import { REPAIR_INCOMPLENESS_PATH, REPAIR_INCORRECTNESS_PATH } from '../../constants/Router';

const ChartCard = styled(Card)({
  display: 'flex',
  width: '75%',
  justifyContent: 'center',
});

const ChartSection = styled(Section)({
  width: '75%',
  padding: '50px 40px 0 50px',
});

const DescriptionSection = styled(Section)({
  fontSize: '13pt',
  alignContent: 'end',
  padding: '50px 50px 0 0',
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
    <ChartCard>
      <ChartSection>
        <Doughnut
          data={evaluationSummaryData}
          plugins={generatePlugins(evaluationSummaryData)}
          options={chartOptions}
          width={400}
          height={400}
        />
      </ChartSection>
      <DescriptionSection>
        <h2>Validation Summary</h2>
        <p>
          The validity of a metadata record is measured by two metrics:
          {' '}
          <i>completeness</i>
          {' '}
          and
          {' '}
          <i>adherence.</i>
        </p>
        <p>
          <b>Completeness</b>
          {' '}
          measures the presence of all required values in the
          metadata record defined by the metadata specification.
        </p>
        <p>
          <b>Adherence</b>
          {' '}
          measures the conformance of the stated value in the
          metadata field to the data type defined by the metadata
          specification.
        </p>
        <p>
          A metadata record is called invalid when errors were found
          in its value using these two metrics.
        </p>
        <Box textAlign="center">
          <BaseButton
            variant="contained"
            disabled={!evaluationSummaryData.hasCompletenessErrors}
            onClick={() => navigate(`../${REPAIR_INCOMPLENESS_PATH}`, {
              state: {
                selectedMenuItem: 'repair-missing-values',
              },
            })}
          >
            Repair Missing Values
          </BaseButton>
          <BaseButton
            variant="contained"
            disabled={!evaluationSummaryData.hasAdherenceErrors}
            onClick={() => navigate(`../${REPAIR_INCORRECTNESS_PATH}`, {
              state: {
                selectedMenuItem: 'repair-missing-values',
              },
            })}
          >
            Repair Invalid Value Types
          </BaseButton>
        </Box>
      </DescriptionSection>
    </ChartCard>
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
