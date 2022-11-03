import { FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import DropDownSelector from '../DataSheet/DropDownSelector';
import InputField from '../DataSheet/InputField';
import SheetCell from '../DataSheet/SheetCell';
import { getDataTypeForColumn, getPermissibleValues } from '../../helpers/data-utils';
import { LIGHT_RED } from '../../constants/Color';

const EditableCell = ({ row, column, schema, userInput, setUserInput }) => {
  // eslint-disable-next-line dot-notation
  const permissibleValues = getPermissibleValues(column, schema);
  const columnType = getDataTypeForColumn(column, schema);
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
          && (
            <DropDownSelector
              value={userInput[row] || ''}
              options={permissibleValues}
              onChange={handleUserInput}
              colorOnEmpty={LIGHT_RED}
            />
          )}
        {!permissibleValues
          && (
            <InputField
              value={userInput[row] || ''}
              type={columnType}
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
  column: PropTypes.string.isRequired,
  schema: PropTypes.shape({
    title: PropTypes.string.isRequired,
    columns: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  userInput: PropTypes.objectOf().isRequired,
  setUserInput: PropTypes.func.isRequired,
};

export default EditableCell;
