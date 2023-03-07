import { FormControl, InputAdornment, Stack } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PropTypes from 'prop-types';
import InputField from '../DataSheet/InputField';
import SearchableSelector from '../DataSheet/SearchableSelector';
import InfoTooltip from './info-tooltip';
import { HeaderCell, HeaderLabel } from './styled';
import { DATE, EMAIL, NUMBER, PHONE, STRING, TIME } from '../../constants/ValueType';
import { RED } from '../../constants/Color';

// eslint-disable-next-line max-len
const HeaderWithBatchInput = ({ id, label, description, required, type, permissibleValues, setBatchInput, setStaleBatch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setBatchInput(event.target.value);
      setStaleBatch(false);
      event.preventDefault();
    }
  };
  return (
    <HeaderCell sx={{ minWidth: '220px' }} sticky>
      <Stack direction="row" gap={1}>
        <HeaderLabel>
          {label}
          {required ? <span style={{ color: RED }}>*</span> : ''}
        </HeaderLabel>
        <InfoTooltip title={description}>
          <InfoOutlinedIcon fontSize="small" />
        </InfoTooltip>
      </Stack>
      <FormControl fullWidth>
        {permissibleValues && permissibleValues.length > 0
          ? (
            <SearchableSelector
              key={`${id}-searchable-selector`}
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
              key={`${id}-input-field`}
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
  type: PropTypes.oneOf([STRING, NUMBER, DATE, TIME, EMAIL, URL, PHONE]),
  description: PropTypes.string,
  required: PropTypes.bool,
  permissibleValues: PropTypes.arrayOf(PropTypes.string),
  setBatchInput: PropTypes.func.isRequired,
  setStaleBatch: PropTypes.func.isRequired,
};

HeaderWithBatchInput.defaultProps = {
  id: undefined,
  type: STRING,
  description: undefined,
  required: false,
  permissibleValues: undefined,
};

export default HeaderWithBatchInput;
