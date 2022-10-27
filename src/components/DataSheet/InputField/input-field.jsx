import { OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME, URL } from '../../../constants/ValueType';
import { WHITE } from '../../../constants/Color';

const InputField = ({ value, type, placeholder, onChange, onKeyPress, colorOnEmpty }) => (
  <OutlinedInput
    hiddenLabel
    size="small"
    value={value}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    onKeyPress={onKeyPress}
    sx={{ backgroundColor: value === '' ? colorOnEmpty : WHITE }}
  />
);

InputField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  colorOnEmpty: PropTypes.string,
};

InputField.defaultProps = {
  value: undefined,
  placeholder: undefined,
  onChange: undefined,
  onKeyPress: undefined,
  colorOnEmpty: WHITE,
};

export default InputField;
