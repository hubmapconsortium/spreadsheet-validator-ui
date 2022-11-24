import { FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import DropDownSelector from '../DataSheet/DropDownSelector';
import InputField from '../DataSheet/InputField';
import { LIGHT_RED } from '../../constants/Color';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME } from '../../constants/ValueType';

const EditableCell = (
  { value, type, required, permissibleValues, inputRef, handleInputChange },
) => (
  <FormControl fullWidth>
    {permissibleValues
      ? (
        <DropDownSelector
          value={value}
          options={permissibleValues}
          onChange={handleInputChange}
          colorOnEmpty={LIGHT_RED}
        />
      )
      : (
        <InputField
          value={value}
          type={type}
          required={required}
          inputRef={inputRef}
          onChange={handleInputChange}
          colorOnEmpty={LIGHT_RED}
        />
      )}
  </FormControl>
);

EditableCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]),
  required: PropTypes.bool,
  permissibleValues: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/forbid-prop-types
  inputRef: PropTypes.object,
  handleInputChange: PropTypes.func.isRequired,
};

EditableCell.defaultProps = {
  value: '',
  type: TEXT,
  required: false,
  permissibleValues: undefined,
  inputRef: undefined,
};

export default EditableCell;
