import { useState } from 'react';
import { FormControl, InputAdornment } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PropTypes from 'prop-types';
import InputField from '../DataSheet/InputField';
import SearchableSelector from '../DataSheet/SearchableSelector';
import SheetCell from '../DataSheet/SheetCell';
import { HeaderLabel } from './styled';
import { getColumnLabel, getDataTypeForColumn, getPermissibleValues } from '../../helpers/data-utils';

const HeaderWithBatchInput = ({ column, schema, setBatchInput, setStaleBatch }) => {
  const [userTyping, setUserTyping] = useState(false);
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
              onChange={(e) => setUserTyping(e.target.value !== '')}
              onKeyPress={handleKeyPress}
              endAdornment={userTyping && (
                <InputAdornment position="end">
                  <KeyboardReturnIcon />
                </InputAdornment>
              )}
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
