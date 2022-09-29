import { styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Title = styled(Typography)({
  fontFamily: 'Roboto',
  fontSize: '32pt',
  fontWeight: 'bold',
});

const SubTitle = styled(Typography)({
  fontFamily: 'Roboto',
  fontSize: '17pt',
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
