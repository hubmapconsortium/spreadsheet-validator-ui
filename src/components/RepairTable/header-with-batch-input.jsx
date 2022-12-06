import { useState } from 'react';
import { FormControl, InputAdornment, Stack } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import InputField from '../DataSheet/InputField';
import SearchableSelector from '../DataSheet/SearchableSelector';
import InfoTooltip from './info-tooltip';
import { HeaderCell, HeaderLabel } from './styled';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME } from '../../constants/ValueType';

// eslint-disable-next-line max-len
const HeaderWithBatchInput = ({ id, label, description, type, permissibleValues, setBatchInput, setStaleBatch }) => {
  const [userTyping, setUserTyping] = useState(false);
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setBatchInput(event.target.value);
      setStaleBatch(false);
      event.preventDefault();
    }
  };
  return (
    <HeaderCell sticky>
      <Stack direction="row" gap={1}>
        <HeaderLabel>{label}</HeaderLabel>
        <InfoTooltip title={description}>
          <InfoOutlinedIcon fontSize="small" />
        </InfoTooltip>
      </Stack>
      <FormControl fullWidth>
        {permissibleValues
          ? (
            <SearchableSelector
              id={`${id}-selector-batch-field`}
              options={permissibleValues}
              onKeyPress={handleKeyPress}
              startAdornment={(
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )}
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
    </HeaderCell>
  );
};

HeaderWithBatchInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]),
  description: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  permissibleValues: PropTypes.arrayOf(PropTypes.object),
  setBatchInput: PropTypes.func.isRequired,
  setStaleBatch: PropTypes.func.isRequired,
};

HeaderWithBatchInput.defaultProps = {
  id: undefined,
  type: TEXT,
  description: undefined,
  permissibleValues: undefined,
};

export default HeaderWithBatchInput;
