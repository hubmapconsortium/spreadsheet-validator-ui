import { Typography, styled } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PropTypes from 'prop-types';
import { BLUE } from '../../constants/Color';

const InfoText = styled(Typography)({
  fontFamily: 'Roboto',
  fontSize: '14pt',
});

const InfoIcon = styled(InfoOutlinedIcon)({
  verticalAlign: 'middle',
  color: BLUE,
  minWidth: '35px',
});

const InfoBox = ({ children }) => (
  <InfoText>
    <InfoIcon />
    {children}
  </InfoText>
);

InfoBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InfoBox;
