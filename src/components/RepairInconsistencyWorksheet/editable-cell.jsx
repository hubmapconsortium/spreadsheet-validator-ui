import { FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import DropDownSelector from '../DataSheet/DropDownSelector';
import InputField from '../DataSheet/InputField';
import { LIGHT_RED } from '../../constants/Color';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME } from '../../constants/ValueType';

const EditableCell = ({ value, type, permissibleValues, handleInputChange }) => (
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
          onChange={handleInputChange}
          colorOnEmpty={LIGHT_RED}
        />
      )}
  </FormControl>
);

EditableCell.propTypes = {
  value: PropTypes.string,
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]),
  permissibleValues: PropTypes.arrayOf(PropTypes.string),
  handleInputChange: PropTypes.func.isRequired,
};

EditableCell.defaultProps = {
  value: '',
  type: TEXT,
  permissibleValues: undefined,
};

export default EditableCell;
