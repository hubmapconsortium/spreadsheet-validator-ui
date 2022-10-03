import React from 'react';
import { styled } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Section from '../../styles/Section';
import Card from '../../styles/Card';

const ChartCard = styled(Card)({
  display: 'flex',
  width: '75%',
  justifyContent: 'center',
});

const ChartSection = styled(Section)({
  width: '50%',
  padding: '50px 40px 0 40px',
});

const DescriptionSection = styled(Section)({
  fontSize: '13pt',
  textAlign: 'center',
  width: '100%',
  paddingTop: '10px',
  paddingBottom: '10px',
});

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const generatePlugins = (data) => [{
  beforeDraw(chart) {
    const { width } = chart;
    const { height } = chart;
    const { ctx } = chart;
    const fontSize = (height / 200).toFixed(2);
    ctx.restore();
    ctx.font = `${0.85 * fontSize}em Helvetica`; // Title font
    const textTitle = numberWithCommas(data.innerTextTitle);
    const textTitleX = Math.round((width - ctx.measureText(textTitle).width) / 2);
    const textTitleY = (height / 2) - 55;
    ctx.fillText(textTitle, textTitleX, textTitleY);
    ctx.font = `${0.70 * fontSize}em Roboto`; // Subtitle font
    const textSubtitle = data.innerTextSubtitle;
    const textSubtitleX = Math.round((width - ctx.measureText(textSubtitle).width) / 2);
    const textSubtitleY = (height / 2) - 10;
    ctx.fillText(textSubtitle, textSubtitleX, textSubtitleY);
    ctx.save();
  },
}];

const chartOptions = {
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { size: 14 },
      },
      title: {
        display: true,
        padding: 0,
      },
    },
  },
  cutout: '65%',
};

const CompletenessAndAdherenceChart = ({ completenessData, adherenceData }) => (
  <ChartCard>
    <ChartSection>
      <Doughnut
        data={completenessData}
        plugins={generatePlugins(completenessData)}
        options={chartOptions}
      />
      <DescriptionSection>
        <b>Completeness</b>
        {' '}
        measures the presence of required values in the
        metadata fields defined in the metadata schema.
      </DescriptionSection>
    </ChartSection>
    <ChartSection>
      <Doughnut
        data={adherenceData}
        plugins={generatePlugins(adherenceData)}
        options={chartOptions}
      />
      <DescriptionSection>
        <b>Adherence</b>
        {' '}
        measures the conformance of the stated value in the
        metadata field to the data type defined in the metadata
        schema.
      </DescriptionSection>
    </ChartSection>
  </ChartCard>
);

CompletenessAndAdherenceChart.propTypes = {
  completenessData: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
    })),
  }).isRequired,
  adherenceData: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
    })),
  }).isRequired,
};

export default CompletenessAndAdherenceChart;
