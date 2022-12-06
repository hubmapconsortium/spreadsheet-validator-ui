import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { WHITE } from '../../../constants/Color';

const SearchableSelector = ({ id, options, onChange, onKeyPress, startAdornment }) => (
  <Autocomplete
    key={id}
    forcePopupIcon={false}
    autoHighlight
    options={options}
    onChange={onChange}
    onKeyPress={onKeyPress}
    sx={{ height: '40px', backgroundColor: WHITE }}
    getOptionLabel={(option) => option.label}
    renderInput={(params) => (
      <TextField
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...params}
        size="small"
        disableunderline="true"
        InputProps={{
          ...params.InputProps,
          startAdornment,
        }}
      />
    )}
    noOptionsText="Please contact admin@iec.org to propose a new categorical value."
  />
);

SearchableSelector.propTypes = {
  id: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  startAdornment: PropTypes.element,
};

SearchableSelector.defaultProps = {
  id: undefined,
  onChange: undefined,
  onKeyPress: undefined,
  startAdornment: undefined,
};

export default SearchableSelector;
