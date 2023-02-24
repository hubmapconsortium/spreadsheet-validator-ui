import { styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Title = styled(Typography)({
  fontSize: '27pt',
  fontWeight: 'bold',
});

const SubTitle = styled(Typography)({
  fontSize: '16pt',
});

const PageTitle = ({ title, subtitle }) => (
  <>
    <Title variant="h3">{title}</Title>
    <SubTitle variant="h4">{subtitle}</SubTitle>
  </>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PageTitle;
