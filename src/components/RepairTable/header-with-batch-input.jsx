import { FormControl, InputAdornment, Stack } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PropTypes from 'prop-types';
import InputField from '../DataSheet/InputField';
import SearchableSelector from '../DataSheet/SearchableSelector';
import InfoTooltip from './info-tooltip';
import { HeaderCell, HeaderLabel } from './styled';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME } from '../../constants/ValueType';

// eslint-disable-next-line max-len
const HeaderWithBatchInput = ({ id, label, description, type, permissibleValues, setBatchInput, setStaleBatch }) => {
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
              placeholder="Enter batch value..."
              options={permissibleValues}
              onKeyPress={handleKeyPress}
              endAdornment={(
                <InputAdornment position="end">
                  <KeyboardReturnIcon />
                </InputAdornment>
              )}
            />
          )
          : (
            <InputField
              id={`${id}-input-batch-field`}
              type={type}
              placeholder="Enter batch value..."
              onKeyPress={handleKeyPress}
              endAdornment={(
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
  permissibleValues: PropTypes.arrayOf(PropTypes.string),
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
