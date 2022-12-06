import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { WHITE } from '../../../constants/Color';

const SearchableSelector = (
  { id, placeholder, value, options, onChange, onKeyPress, colorOnEmpty, startAdornment },
) => (
  <Autocomplete
    key={id}
    value={value}
    forcePopupIcon={false}
    autoHighlight
    options={options}
    onChange={onChange}
    onKeyPress={onKeyPress}
    sx={{ height: '40px', backgroundColor: value === '' ? colorOnEmpty : WHITE }}
    renderInput={(params) => (
      <TextField
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...params}
        size="small"
        disableunderline="true"
        placeholder={placeholder}
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
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object]),
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  colorOnEmpty: PropTypes.string,
  startAdornment: PropTypes.element,
};

SearchableSelector.defaultProps = {
  id: undefined,
  placeholder: undefined,
  value: undefined,
  onChange: undefined,
  onKeyPress: undefined,
  colorOnEmpty: WHITE,
  startAdornment: undefined,
};

export default SearchableSelector;
