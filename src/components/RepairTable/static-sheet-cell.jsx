import PropTypes from 'prop-types';
import SheetCell from '../DataSheet/SheetCell';
import WrappedText from '../DataSheet/WrappedText';
import { BLACK, WHITE } from '../../constants/Color';

const StaticSheetCell = ({ value, color, backgroundColor, textAlign, minWidth, sticky }) => (
  <SheetCell
    sx={{
      zIndex: sticky ? 998 : 0,
      backgroundColor,
      textAlign,
      minWidth,
    }}
    sticky={sticky}
  >
    <WrappedText text={value} color={color} />
  </SheetCell>
);

StaticSheetCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  textAlign: PropTypes.string,
  minWidth: PropTypes.string,
  sticky: PropTypes.bool,
};

StaticSheetCell.defaultProps = {
  sticky: false,
  color: BLACK,
  backgroundColor: WHITE,
  textAlign: undefined,
  minWidth: undefined,
};

export default StaticSheetCell;
