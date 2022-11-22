import { FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import DropDownSelector from '../DataSheet/DropDownSelector';
import InputField from '../DataSheet/InputField';
import SheetCell from '../DataSheet/SheetCell';
import { LIGHT_RED } from '../../constants/Color';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME } from '../../constants/ValueType';

const EditableCell = ({ value, type, inputRef, permissibleValues, handleInputChange }) => (
  <SheetCell sx={{ zIndex: 998 }} sticky>
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
            inputRef={inputRef}
            onChange={handleInputChange}
            colorOnEmpty={LIGHT_RED}
          />
        )}
    </FormControl>
  </SheetCell>
);

EditableCell.propTypes = {
  value: PropTypes.string,
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]),
  inputRef: PropTypes.func,
  permissibleValues: PropTypes.arrayOf(PropTypes.string),
  handleInputChange: PropTypes.func.isRequired,
};

EditableCell.defaultProps = {
  value: '',
  type: TEXT,
  inputRef: undefined,
  permissibleValues: undefined,
};

export default EditableCell;