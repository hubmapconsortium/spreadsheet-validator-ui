import { MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { WHITE } from '../../../constants/Color';

const DropDownSelector = ({ value, options, onChange, colorOnEmpty }) => (
  <Select
    id="test"
    value={value}
    sx={{
      height: '40px',
      backgroundColor: value === '' ? colorOnEmpty : WHITE,
    }}
    onChange={onChange}
  >
    {options.map((option) => (
      <MenuItem key={option.label} value={option.label}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
);

DropDownSelector.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ).isRequired,
  onChange: PropTypes.func,
  colorOnEmpty: PropTypes.string,
};

DropDownSelector.defaultProps = {
  value: '',
  onChange: undefined,
  colorOnEmpty: WHITE,
};

export default DropDownSelector;
