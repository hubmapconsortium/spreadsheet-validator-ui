import { useState } from 'react';
import { FormControl, InputAdornment } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PropTypes from 'prop-types';
import InputField from '../DataSheet/InputField';
import SearchableSelector from '../DataSheet/SearchableSelector';
import SheetCell from '../DataSheet/SheetCell';
import { HeaderLabel } from './styled';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME } from '../../constants/ValueType';

const HeaderWithBatchInput = ({ label, type, permissibleValues, setBatchInput, setStaleBatch }) => {
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
              options={permissibleValues}
              onKeyPress={handleKeyPress}
            />
          )
          : (
            <InputField
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
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]),
  permissibleValues: PropTypes.arrayOf(PropTypes.string),
  setBatchInput: PropTypes.func.isRequired,
  setStaleBatch: PropTypes.func.isRequired,
};

HeaderWithBatchInput.defaultProps = {
  type: TEXT,
  permissibleValues: undefined,
};

export default HeaderWithBatchInput;
