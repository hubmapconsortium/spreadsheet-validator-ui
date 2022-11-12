import { styled, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CellValue = styled(Typography)({
  fontSize: '17px',
});

const WrappedText = ({ text, color }) => (
  <Tooltip
    arrow
    title={<Typography fontSize={16}>{text}</Typography>}
    placement="right"
    enterDelay={1000}
  >
    <CellValue color={color} noWrap>{text}</CellValue>
  </Tooltip>
);

WrappedText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

WrappedText.defaultProps = {
  text: '',
  color: undefined,
};

export default WrappedText;
