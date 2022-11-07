import { FormControl, OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import { TEXT } from '../../../constants/ValueType';

const FilterInputField = ({ key, type, onChange, endAdornment }) => (
  <FormControl fullWidth>
    <OutlinedInput
      key={key}
      type={type}
      size="small"
      placeholder="Filter text..."
      onChange={onChange}
      endAdornment={endAdornment}
    />
  </FormControl>
);

FilterInputField.propTypes = {
  key: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  endAdornment: PropTypes.func,
};

FilterInputField.defaultProps = {
  key: undefined,
  type: TEXT,
  onChange: undefined,
  endAdornment: undefined,
};

export default FilterInputField;
