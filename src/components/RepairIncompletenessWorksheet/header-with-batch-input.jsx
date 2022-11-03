import { FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import InputField from '../DataSheet/InputField';
import SearchableSelector from '../DataSheet/SearchableSelector';
import SheetCell from '../DataSheet/SheetCell';
import { HeaderLabel } from './styled';
import { getColumnLabel, getDataTypeForColumn, getPermissibleValues } from '../../helpers/data-utils';

const HeaderWithBatchInput = ({ column, schema, setBatchInput, setStaleBatch }) => {
  const columnLabel = getColumnLabel(column, schema);
  const columnType = getDataTypeForColumn(column, schema);
  const permissibleValues = getPermissibleValues(column, schema);
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setBatchInput(event.target.value);
      setStaleBatch(false);
      event.preventDefault();
    }
  };
  return (
    <SheetCell align="center" sticky>
      <HeaderLabel>{columnLabel}</HeaderLabel>
      <FormControl fullWidth>
        {permissibleValues
          && (
            <SearchableSelector
              options={permissibleValues}
              onKeyPress={handleKeyPress}
            />
          )}
        {!permissibleValues
          && (
            <InputField
              type={columnType}
              placeholder="Enter value..."
              onKeyPress={handleKeyPress}
            />
          )}
      </FormControl>
    </SheetCell>
  );
};

HeaderWithBatchInput.propTypes = {
  column: PropTypes.string.isRequired,
  schema: PropTypes.shape({
    title: PropTypes.string.isRequired,
    columns: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  setBatchInput: PropTypes.func.isRequired,
  setStaleBatch: PropTypes.func.isRequired,
};

export default HeaderWithBatchInput;
