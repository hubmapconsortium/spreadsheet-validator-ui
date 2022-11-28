import { useState } from 'react';
import { FormControl, InputAdornment } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PropTypes from 'prop-types';
import InputField from '../DataSheet/InputField';
import SearchableSelector from '../DataSheet/SearchableSelector';
import SheetCell from '../DataSheet/SheetCell';
import { HeaderLabel } from './styled';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME } from '../../constants/ValueType';

// eslint-disable-next-line max-len
const HeaderWithBatchInput = ({ id, label, type, permissibleValues, setBatchInput, setStaleBatch }) => {
  const [userTyping, setUserTyping] = useState(false);
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setBatchInput(event.target.value);
      setStaleBatch(false);
      event.preventDefault();
    }
  };
  return (
    <SheetCell align="center" sticky>
      <HeaderLabel>{label}</HeaderLabel>
      <FormControl fullWidth>
        {permissibleValues
          ? (
            <SearchableSelector
              id={`${id}-selector-batch-field`}
              options={permissibleValues}
              onKeyPress={handleKeyPress}
            />
          )
          : (
            <InputField
              id={`${id}-input-batch-field`}
              type={type}
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
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]),
  permissibleValues: PropTypes.arrayOf(PropTypes.string),
  setBatchInput: PropTypes.func.isRequired,
  setStaleBatch: PropTypes.func.isRequired,
};

HeaderWithBatchInput.defaultProps = {
  id: undefined,
  type: TEXT,
  permissibleValues: undefined,
};

export default HeaderWithBatchInput;
