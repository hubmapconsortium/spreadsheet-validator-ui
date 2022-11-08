import { FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import DropDownSelector from '../DataSheet/DropDownSelector';
import InputField from '../DataSheet/InputField';
import SheetCell from '../DataSheet/SheetCell';
import { LIGHT_RED } from '../../constants/Color';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME } from '../../constants/ValueType';

const EditableCell = ({ row, type, permissibleValues, userInput, setUserInput }) => {
  const handleUserInput = (event) => {
    setUserInput((currentUserInput) => {
      // eslint-disable-next-line no-param-reassign
      currentUserInput[row] = event.target.value;
    });
  };
  return (
    <SheetCell sx={{ zIndex: 998 }} sticky>
      <FormControl fullWidth>
        {permissibleValues
          ? (
            <DropDownSelector
              value={userInput[row] || ''}
              options={permissibleValues}
              onChange={handleUserInput}
              colorOnEmpty={LIGHT_RED}
            />
          )
          : (
            <InputField
              value={userInput[row] || ''}
              type={type}
              onChange={handleUserInput}
              colorOnEmpty={LIGHT_RED}
            />
          )}
      </FormControl>
    </SheetCell>
  );
};

EditableCell.propTypes = {
  row: PropTypes.number.isRequired,
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]),
  permissibleValues: PropTypes.arrayOf(PropTypes.string),
  userInput: PropTypes.objectOf(PropTypes.string).isRequired,
  setUserInput: PropTypes.func.isRequired,
};

EditableCell.defaultProps = {
  type: TEXT,
  permissibleValues: undefined,
};

export default EditableCell;
