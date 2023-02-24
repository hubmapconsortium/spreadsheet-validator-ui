import PropTypes from 'prop-types';
import SheetCell from '../DataSheet/SheetCell';
import WrappedText from '../DataSheet/WrappedText';

const StaticSheetCell = ({ value, sticky }) => (
  <SheetCell align="right" sx={{ zIndex: sticky ? 998 : 0 }} sticky={sticky}>
    <WrappedText text={value} />
  </SheetCell>
);

StaticSheetCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  sticky: PropTypes.bool,
};

StaticSheetCell.defaultProps = {
  sticky: false,
};

export default StaticSheetCell;
