import { styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Section from '../../styles/Section';

const Title = styled(Typography)({
  fontSize: '27pt',
  fontWeight: 'bold',
});

const SubTitle = styled(Typography)({
  fontSize: '16pt',
});

const PageTitle = ({ title, subtitle }) => (
  <Section>
    <Title variant="h3">{title}</Title>
    <SubTitle variant="h4">{subtitle}</SubTitle>
  </Section>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PageTitle;
