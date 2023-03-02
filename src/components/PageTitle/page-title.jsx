import { styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Section from '../../styles/Section';
import { BLUE } from '../../constants/Color';

const Title = styled(Typography)({
  fontSize: '27pt',
  fontWeight: 'bold',
  lineHeight: '50px',
});

const SubTitle = styled(Typography)({
  fontSize: '16pt',
});

const InfoIcon = styled(InfoOutlinedIcon)({
  verticalAlign: 'middle',
  color: BLUE,
  minWidth: '35px',
});

const PageTitle = ({ title, subtitle }) => (
  <Section>
    <Title variant="h3">{title}</Title>
    <SubTitle variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
      <InfoIcon />
      {subtitle}
    </SubTitle>
  </Section>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PageTitle;
