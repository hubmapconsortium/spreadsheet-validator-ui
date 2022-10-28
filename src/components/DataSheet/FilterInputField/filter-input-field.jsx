import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PropTypes from 'prop-types';
import { TEXT } from '../../../constants/ValueType';

const FilterInputField = ({ key, type, onChange }) => (
  <FormControl fullWidth>
    <OutlinedInput
      hiddenLabel
      key={key}
      type={type}
      size="small"
      placeholder="Filter text..."
      onChange={onChange}
      endAdornment={(
        <InputAdornment position="end">
          <IconButton edge="end">
            <FilterAltIcon />
          </IconButton>
        </InputAdornment>
      )}
    />
  </FormControl>
);

FilterInputField.propTypes = {
  key: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

FilterInputField.defaultProps = {
  key: undefined,
  type: TEXT,
  onChange: undefined,
};

export default FilterInputField;
