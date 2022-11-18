import { OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME, URL } from '../../../constants/ValueType';
import { WHITE } from '../../../constants/Color';

const InputField = (
  { key, value, type, placeholder, inputRef, onChange, onKeyPress, colorOnEmpty, endAdornment },
) => (
  <OutlinedInput
    key={key}
    size="small"
    value={value}
    type={type}
    placeholder={placeholder}
    inputRef={inputRef}
    onChange={onChange}
    onKeyPress={onKeyPress}
    sx={{ backgroundColor: value === '' ? colorOnEmpty : WHITE }}
    endAdornment={endAdornment}
  />
);

InputField.propTypes = {
  key: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]).isRequired,
  placeholder: PropTypes.string,
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  colorOnEmpty: PropTypes.string,
  endAdornment: PropTypes.element,
};

InputField.defaultProps = {
  key: undefined,
  value: undefined,
  placeholder: undefined,
  inputRef: undefined,
  onChange: undefined,
  onKeyPress: undefined,
  colorOnEmpty: WHITE,
  endAdornment: undefined,
};

export default InputField;
