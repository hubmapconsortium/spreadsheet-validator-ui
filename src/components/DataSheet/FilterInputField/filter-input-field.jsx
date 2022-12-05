import { OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import { WHITE } from '../../../constants/Color';
import { TEXT } from '../../../constants/ValueType';

const FilterInputField = ({ id, type, onChange, endAdornment }) => (
  <OutlinedInput
    fullWidth
    key={id}
    type={type}
    size="small"
    placeholder="Filter text..."
    onChange={onChange}
    endAdornment={endAdornment}
    sx={{ minWidth: '150px', backgroundColor: WHITE }}
  />
);

FilterInputField.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  endAdornment: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.element]),
};

FilterInputField.defaultProps = {
  id: undefined,
  type: TEXT,
  onChange: undefined,
  endAdornment: undefined,
};

export default FilterInputField;
