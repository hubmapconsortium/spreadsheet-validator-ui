import { OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import { TEXT } from '../../../constants/ValueType';

const FilterInputField = ({ id, type, onChange, endAdornment }) => (
  <OutlinedInput
    key={id}
    type={type}
    size="small"
    placeholder="Filter text..."
    onChange={onChange}
    endAdornment={endAdornment}
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
